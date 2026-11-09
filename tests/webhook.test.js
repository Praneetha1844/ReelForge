import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  verify: vi.fn(),
  upsertUser: vi.fn(),
  deleteUserByClerkId: vi.fn(),
  headers: new Headers(),
}));

vi.mock("svix", () => ({
  Webhook: class {
    verify(...args) {
      return mocks.verify(...args);
    }
  },
}));
vi.mock("next/headers", () => ({ headers: async () => mocks.headers }));
vi.mock("@/lib/users", () => ({
  upsertUser: mocks.upsertUser,
  deleteUserByClerkId: mocks.deleteUserByClerkId,
}));

const { POST } = await import("@/app/api/webhooks/clerk/route");

const request = () => new Request("http://localhost/api/webhooks/clerk", { method: "POST", body: "{}" });
const signedHeaders = () =>
  new Headers({ "svix-id": "i", "svix-timestamp": "1", "svix-signature": "s" });

const created = {
  type: "user.created",
  data: {
    id: "user_1",
    first_name: "Ann",
    last_name: "Lee",
    image_url: "http://img",
    primary_email_address_id: "e2",
    email_addresses: [
      { id: "e1", email_address: "old@x.io" },
      { id: "e2", email_address: "ann@x.io" },
    ],
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  mocks.verify.mockReset();
  mocks.upsertUser.mockReset();
  mocks.deleteUserByClerkId.mockReset();
  process.env.CLERK_WEBHOOK_SECRET = "whsec_test";
  mocks.headers = signedHeaders();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Clerk webhook", () => {
  it("fails closed when the secret is not configured", async () => {
    delete process.env.CLERK_WEBHOOK_SECRET;
    expect((await POST(request())).status).toBe(500);
  });

  it("rejects requests without svix headers", async () => {
    mocks.headers = new Headers();
    expect((await POST(request())).status).toBe(400);
  });

  it("rejects an invalid signature", async () => {
    mocks.verify.mockImplementation(() => {
      throw new Error("bad");
    });
    expect((await POST(request())).status).toBe(400);
    expect(mocks.upsertUser).not.toHaveBeenCalled();
  });

  it("maps user.created to the primary email", async () => {
    mocks.verify.mockReturnValue(created);
    expect((await POST(request())).status).toBe(200);
    expect(mocks.upsertUser).toHaveBeenCalledWith({
      clerkId: "user_1",
      email: "ann@x.io",
      name: "Ann Lee",
      imageUrl: "http://img",
    });
  });

  it("acknowledges a user without a primary email instead of triggering retries", async () => {
    mocks.verify.mockReturnValue({ type: "user.created", data: { id: "u", email_addresses: [] } });
    expect((await POST(request())).status).toBe(200);
    expect(mocks.upsertUser).not.toHaveBeenCalled();
  });

  it("deletes on user.deleted", async () => {
    mocks.verify.mockReturnValue({ type: "user.deleted", data: { id: "user_1" } });
    expect((await POST(request())).status).toBe(200);
    expect(mocks.deleteUserByClerkId).toHaveBeenCalledWith("user_1");
  });

  it("ignores unrelated event types", async () => {
    mocks.verify.mockReturnValue({ type: "session.created", data: {} });
    expect((await POST(request())).status).toBe(200);
    expect(mocks.upsertUser).not.toHaveBeenCalled();
  });

  it("returns 500 when the database write fails so Clerk retries", async () => {
    mocks.verify.mockReturnValue(created);
    mocks.upsertUser.mockRejectedValue(new Error("db down"));
    expect((await POST(request())).status).toBe(500);
  });
});
