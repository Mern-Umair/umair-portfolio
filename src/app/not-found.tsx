import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-32 sm:px-8">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-3 text-lg text-muted">The link may be old, or the address was typed incorrectly.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-accent-bg px-5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to the home page
      </Link>
    </div>
  );
}
