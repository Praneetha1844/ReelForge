import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyState from "./_components/EmptyState";

export const metadata = { title: "Dashboard | ReelForge" };

// Saved videos are not implemented yet, so the list is always empty.
export default function Dashboard() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-700">Dashboard</h1>
        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
          <Link href="/dashboard/create-new">+ Create New</Link>
        </Button>
      </div>
      <EmptyState />
    </>
  );
}
