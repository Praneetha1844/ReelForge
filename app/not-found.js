import Link from "next/link";

export const metadata = { title: "Page not found | ReelForge" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-10 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-gray-600">The page you asked for does not exist.</p>
      <Link href="/" className="text-blue-700 underline">
        Back to the home page
      </Link>
    </main>
  );
}
