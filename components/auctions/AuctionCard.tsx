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
    className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
      <Image
        src={auction.images[0]}
        alt={auction.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={80}
      />

      {/* Status badge */}
      <div className="absolute top-3 left-3 z-20">
        <Badge
          className={`text-xs font-semibold rounded-full px-2.5 ${
            auction.status === "ACTIVE"
              ? "bg-emerald-500/90 text-white border-0"
              : "bg-red-500/90 text-white border-0"
          }`}
        >
          {auction.status === "ACTIVE" ? "● Live" : auction.status}
        </Badge>
      </div>

      {/* Watchers / bids */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-2">
        <span className="inline-flex items-center gap-1 text-xs text-white/90 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
          <Eye className="w-3 h-3" />
          {Math.floor(Math.random() * 100) + 10} watching
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-white/90 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
          <Hammer className="w-3 h-3" />
          {Math.floor(Math.random() * 20) + 1} bids
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-4 gap-3">
      <div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">{auction.title}</h3>
        <div className="flex flex-wrap gap-1">
          {auction.category.map((cat) => (
            <span key={cat} className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Current Bid</p>
          <p className="text-xl font-bold gradient-text">₹{auction.currentPrice.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide">Reserve</p>
          <p className="text-sm font-semibold">₹{(auction.reservePrice ?? auction.startingPrice).toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Timer className="w-3.5 h-3.5 shrink-0" />
        <AuctionTimer endTime={auction.endTime} />
      </div>
    </div>

    {/* Footer CTA */}
    <div className="px-4 pb-4">
      <Link href={`/auctions/${auction.id}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow"
        >
          Place Bid
        </motion.button>
      </Link>
    </div>
  </motion.article>
);
