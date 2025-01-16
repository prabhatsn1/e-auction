// app/error.tsx
"use client";

import { ErrorPage } from "@/components/error-pages";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
