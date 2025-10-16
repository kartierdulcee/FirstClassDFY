import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">This page is off the flight path</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The resource you’re looking for doesn’t exist or has been re-routed. Head back to the
        main cabin to continue exploring First Class AI.
      </p>
      <Link href="/" className="rounded-full border border-border px-5 py-2 text-sm uppercase tracking-[0.18em]">
        Back to home
      </Link>
    </div>
  );
}
