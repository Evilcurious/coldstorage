import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ice-400">
          404
        </p>
        <h1 className="heading-display mt-3 text-3xl">This route is off the campus map.</h1>
        <p className="mt-3 text-sm text-slate-400">
          The page you requested does not exist. Return to the Tahseen Jaber Cold Storage homepage.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
