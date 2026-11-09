import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-10 text-center">
      <h1 className="text-5xl font-extrabold">ReelForge</h1>
      <p className="max-w-md text-gray-600">
        A workspace for creating short-form videos.
      </p>
      <Link
        href="/dashboard"
        className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Open dashboard
      </Link>
    </main>
  );
}
