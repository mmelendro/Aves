"use client";
/** Recover the page without exposing raw errors or claiming a save succeeded. */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-xl px-6 py-20 text-gray-900"
    >
      <h1 className="text-3xl font-medium text-emerald-950">
        This page could not load
      </h1>
      <p role="alert" className="mt-4 leading-7">
        Try loading it again. If you were saving a trip, check My Trips before
        repeating the save.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg bg-emerald-700 px-5 font-medium text-white"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex min-h-11 items-center text-emerald-800 underline"
        >
          All destinations
        </a>
        <a
          href="/account"
          className="inline-flex min-h-11 items-center text-emerald-800 underline"
        >
          My Trips
        </a>
      </div>
    </main>
  );
}
