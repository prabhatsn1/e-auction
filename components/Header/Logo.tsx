"use client";

import { motion } from "framer-motion";
import { Gavel } from "lucide-react";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="group flex items-center gap-2" aria-label="E-Auction home">
    <motion.div
      whileHover={{ rotate: -15, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md shadow-violet-500/30"
    >
      <Gavel className="h-4 w-4 text-white" />
    </motion.div>
    <span className="hidden font-display text-xl font-bold tracking-tight sm:block">
      E<span className="gradient-text">Auction</span>
    </span>
  </Link>
);
