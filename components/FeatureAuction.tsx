"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuctionCard } from "./auctions/AuctionCard";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion/FadeIn";
import { Auction } from "@/types/Auction";

interface FeatureAuctionProps {
  featuredAuctions: Auction[];
}

const FeatureAuction: React.FC<FeatureAuctionProps> = ({ featuredAuctions }) => (
  <section className="py-20" aria-labelledby="featured-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <FadeIn className="flex justify-between items-end mb-10">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Live Now</p>
          <h2 id="featured-heading" className="font-display text-4xl font-bold tracking-tight">
            Featured Auctions
          </h2>
        </div>
        <Link href="/auctions">
          <motion.span
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All <ChevronRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </FadeIn>

      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        staggerDelay={0.1}
      >
        {featuredAuctions.map((auction) => (
          <StaggerItem key={auction.id}>
            <AuctionCard auction={auction} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default FeatureAuction;
