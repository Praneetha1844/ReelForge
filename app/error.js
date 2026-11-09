"use client";

// Route-level error boundary. The message is generic on purpose: error details
// from the server must not be shown to visitors.
export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-10 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">An unexpected error occurred. You can try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  );
}
