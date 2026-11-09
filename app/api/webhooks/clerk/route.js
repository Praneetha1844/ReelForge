import { Webhook } from "svix";
import { headers } from "next/headers";
import { deleteUserByClerkId, upsertUser } from "@/lib/users";

function primaryEmail(data) {
  return data.email_addresses?.find((e) => e.id === data.primary_email_address_id)
    ?.email_address;
}

export async function POST(req) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const h = await headers();
  const svixHeaders = {
    "svix-id": h.get("svix-id"),
    "svix-timestamp": h.get("svix-timestamp"),
    "svix-signature": h.get("svix-signature"),
  };
  if (Object.values(svixHeaders).some((v) => !v)) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // Verify the raw body: re-serialising parsed JSON would break the signature.
  const body = await req.text();
  let evt;
  try {
    evt = new Webhook(secret).verify(body, svixHeaders);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const d = evt.data;
  try {
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const email = primaryEmail(d);
      if (!email) {
        // A permanent condition: answering with an error would make Clerk retry forever.
        console.warn("Webhook skipped: user has no primary email");
        return new Response(null, { status: 200 });
      }
      await upsertUser({
        clerkId: d.id,
        email,
        name: [d.first_name, d.last_name].filter(Boolean).join(" "),
        imageUrl: d.image_url,
      });
    } else if (evt.type === "user.deleted") {
      await deleteUserByClerkId(d.id);
    }
  } catch (error) {
    console.error("Webhook handling failed:", error.message);
    return new Response("Error saving user", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
