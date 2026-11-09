import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <section
      aria-labelledby="empty-title"
      className="mt-10 flex flex-col items-center border-2 border-dashed p-5 py-24"
    >
      <h2 id="empty-title">You don&apos;t have any short videos yet</h2>
      <Button asChild className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
        <Link href="/dashboard/create-new">Create a short video</Link>
      </Button>
    </section>
  );
}
