"use client";

import { motion } from "framer-motion";
import { Loader2, Gavel, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md"
    >
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center"
      >
        <Gavel className="w-10 h-10 text-violet-600" />
      </motion.div>
      <h1 className="font-display text-5xl font-bold mb-3">404</h1>
      <p className="text-xl font-semibold mb-2">Lot Not Found</p>
      <p className="text-muted-foreground mb-8">
        This auction lot seems to have been sold or doesn&apos;t exist. Going once, going twice… gone!
      </p>
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25"
        >
          Return to Auction House
        </motion.button>
      </Link>
    </motion.div>
  </div>
);

export const LoadingPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="w-10 h-10 text-primary" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-muted-foreground font-medium"
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
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-50 flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-amber-500" />
      </div>
      <h1 className="font-display text-3xl font-bold mb-2">Auction Interrupted</h1>
      <p className="text-muted-foreground mb-2">An unexpected error occurred during the auction process.</p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-6">Error: {error.digest}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={reset}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/25"
        >
          Try Again
        </motion.button>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-secondary border border-border text-foreground font-semibold"
          >
            Go Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  </div>
);
