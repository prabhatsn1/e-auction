"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Hammer, Timer, Eye } from "lucide-react";
import { Auction } from "@/types/Auction";
import { AuctionTimer } from "./AuctionTimer";

interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard = ({ auction }: AuctionCardProps) => (
  <motion.article
    whileHover={{ y: -6, rotateX: 2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <Image
        src={auction.images[0]}
        alt={auction.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={80}
      />

      {/* Status badge */}
      <div className="absolute left-3 top-3 z-20">
        <Badge
          className={`rounded-full px-2.5 text-xs font-semibold ${
            auction.status === "ACTIVE"
              ? "border-0 bg-emerald-500/90 text-white"
              : "border-0 bg-red-500/90 text-white"
          }`}
        >
          {auction.status === "ACTIVE" ? "● Live" : auction.status}
        </Badge>
      </div>

      {/* Watchers / bids */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs text-white/90 backdrop-blur-sm">
          <Eye className="h-3 w-3" />
          {Math.floor(Math.random() * 100) + 10} watching
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs text-white/90 backdrop-blur-sm">
          <Hammer className="h-3 w-3" />
          {Math.floor(Math.random() * 20) + 1} bids
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col gap-3 p-4">
      <div>
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug">{auction.title}</h3>
        <div className="flex flex-wrap gap-1">
          {auction.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Current Bid</p>
          <p className="gradient-text text-xl font-bold">
            ₹{auction.currentPrice.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Reserve</p>
          <p className="text-sm font-semibold">
            ₹{(auction.reservePrice ?? auction.startingPrice).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Timer className="h-3.5 w-3.5 shrink-0" />
        <AuctionTimer endTime={auction.endTime} />
      </div>
    </div>

    {/* Footer CTA */}
    <div className="px-4 pb-4">
      <Link href={`/auctions/${auction.id}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition-shadow hover:shadow-violet-500/40"
        >
          Place Bid
        </motion.button>
      </Link>
    </div>
  </motion.article>
);
