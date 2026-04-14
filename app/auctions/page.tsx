"use client";

import { useEffect, useState } from "react";
import { AuctionCard } from "@/components/auctions/AuctionCard";
import { FilterSidebar } from "@/components/auctions/FilterSidebar";
import { SortDropdown } from "@/components/auctions/SortDropdown";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { Auction } from "@/types/Auction";
import { Gavel } from "lucide-react";
import { AuctionCardSkeleton } from "@/components/ui/skeleton";

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auctions')
      .then((r) => r.json())
      .then((response) => {
        setAuctions(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching auctions:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Page header */}
        <div className="border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight">Live Auctions</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">{auctions.length} auctions available</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-8 items-start">
            {/* Sidebar */}
            <aside className="hidden md:block w-64 shrink-0">
              <FadeIn direction="right">
                <FilterSidebar onFilterChange={(f) => console.log(f)} />
              </FadeIn>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <FadeIn className="flex justify-between items-center mb-6 p-4 rounded-2xl bg-white border border-border shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{auctions.length}</span> results
                </p>
                <SortDropdown onSortChange={(v) => console.log(v)} />
              </FadeIn>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <AuctionCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
                  {auctions.map((auction) => (
                    <StaggerItem key={auction.id}>
                      <AuctionCard auction={auction} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
