import { Webhook } from "svix";
import { headers } from "next/headers";
import { upsertUser } from "@/lib/users";

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

  if (evt.type === "user.created") {
    const d = evt.data;
    const email = d.email_addresses?.find(
      (e) => e.id === d.primary_email_address_id
    )?.email_address;
    try {
      await upsertUser({
        clerkId: d.id,
        email,
        name: [d.first_name, d.last_name].filter(Boolean).join(" "),
        imageUrl: d.image_url,
      });
    } catch (error) {
      console.error("Webhook user sync failed:", error.message);
      return new Response("Error saving user", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
