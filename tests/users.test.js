import { beforeEach, describe, expect, it, vi } from "vitest";

const m = vi.hoisted(() => {
  const onConflictDoUpdate = vi.fn().mockResolvedValue(undefined);
  const values = vi.fn(() => ({ onConflictDoUpdate }));
  const insert = vi.fn(() => ({ values }));
  const where = vi.fn().mockResolvedValue(undefined);
  const del = vi.fn(() => ({ where }));
  return { onConflictDoUpdate, values, insert, where, del };
});

vi.mock("@/configs/db", () => ({ db: { insert: m.insert, delete: m.del } }));

const { upsertUser, deleteUserByClerkId } = await import("@/lib/users");
const { users } = await import("@/configs/schema");

beforeEach(() => vi.clearAllMocks());

describe("upsertUser", () => {
  it("rejects a missing clerk id or email", async () => {
    await expect(upsertUser({ email: "a@b.c" })).rejects.toThrow(/required/);
    await expect(upsertUser({ clerkId: "u1" })).rejects.toThrow(/required/);
    expect(m.insert).not.toHaveBeenCalled();
  });

  it("falls back to the email when the name is empty", async () => {
    await upsertUser({ clerkId: "u1", email: "a@b.c", name: "" });
    expect(m.values).toHaveBeenCalledWith(expect.objectContaining({ name: "a@b.c" }));
  });

  it("updates on conflict using the clerk id as the target", async () => {
    await upsertUser({ clerkId: "u1", email: "a@b.c", name: "Ann", imageUrl: "x" });
    expect(m.onConflictDoUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        target: users.clerkId,
        set: { email: "a@b.c", name: "Ann", imageUrl: "x" },
      })
    );
  });
});

describe("deleteUserByClerkId", () => {
  it("requires an id", async () => {
    await expect(deleteUserByClerkId("")).rejects.toThrow(/required/);
  });

  it("deletes by clerk id", async () => {
    await deleteUserByClerkId("u1");
    expect(m.del).toHaveBeenCalledWith(users);
    expect(m.where).toHaveBeenCalledTimes(1);
  });
});
