"use client";

import { motion } from "framer-motion";
import { Gavel } from "lucide-react";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group" aria-label="E-Auction home">
    <motion.div
      whileHover={{ rotate: -15, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/30"
    >
      <Gavel className="w-4 h-4 text-white" />
    </motion.div>
    <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
      E<span className="gradient-text">Auction</span>
    </span>
  </Link>
);
