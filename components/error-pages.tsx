"use client";

import { motion } from "framer-motion";
import { Loader2, Gavel, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md text-center"
    >
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100"
      >
        <Gavel className="h-10 w-10 text-violet-600" />
      </motion.div>
      <h1 className="mb-3 font-display text-5xl font-bold">404</h1>
      <p className="mb-2 text-xl font-semibold">Lot Not Found</p>
      <p className="mb-8 text-muted-foreground">
        This auction lot seems to have been sold or doesn&apos;t exist. Going once, going twice…
        gone!
      </p>
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25"
        >
          Return to Auction House
        </motion.button>
      </Link>
    </motion.div>
  </div>
);

export const LoadingPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="h-10 w-10 text-primary" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="font-medium text-muted-foreground"
    >
      Preparing auction items…
    </motion.p>
  </div>
);

export const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50">
        <AlertTriangle className="h-10 w-10 text-amber-500" />
      </div>
      <h1 className="mb-2 font-display text-3xl font-bold">Auction Interrupted</h1>
      <p className="mb-2 text-muted-foreground">
        An unexpected error occurred during the auction process.
      </p>
      {error.digest && <p className="mb-6 text-xs text-muted-foreground">Error: {error.digest}</p>}
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={reset}
          className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25"
        >
          Try Again
        </motion.button>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-border bg-secondary px-6 py-3 font-semibold text-foreground"
          >
            Go Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  </div>
);
