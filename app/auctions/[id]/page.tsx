"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Tag, UserCircle, Hammer, ArrowLeft, Eye, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Auction } from "@/types/Auction";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { AuctionTimer } from "@/components/auctions/AuctionTimer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { trackAuctionViewed, trackBidPlaced } = useAnalytics();

  const [auction, setAuction] = useState<Auction>();
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;

    // Fetch from API
    fetch(`/api/auctions/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Auction not found");
        return r.json();
      })
      .then((response) => {
        const data = response.data;
        setAuction(data);
        setCurrentBid(data.currentPrice);

        // Track auction view
        trackAuctionViewed(data.id, data.title, data.category);
      })
      .catch((error) => {
        console.error("Error fetching auction:", error);
        // Fallback to mock data if API fails
        import("@/lib/mock-db").then(({ mockDB }) => {
          const auction = mockDB.auctions.getById(id);
          if (auction) {
            setAuction(auction);
            setCurrentBid(auction.currentPrice);
            trackAuctionViewed(auction.id, auction.title, auction.category);
          }
        });
      });
  }, [id, trackAuctionViewed]);

  const placeBid = async () => {
    setBidError("");
    const bidValue = parseFloat(bidAmount);
    if (!bidValue || bidValue <= currentBid) {
      setBidError(`Bid must be higher than ₹${currentBid.toLocaleString("en-IN")}`);
      return;
    }
    try {
      const res = await fetch(`/api/auctions/${id}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bidAmount: bidValue }),
      });

      if (res.ok) {
        const result = await res.json();
        setCurrentBid(result.data.newCurrentPrice);
        setBidAmount("");
        setBidSuccess(true);
        setTimeout(() => setBidSuccess(false), 3000);

        // Track bid placed
        if (auction) {
          trackBidPlaced(id, bidValue, auction.title);
        }
      } else {
        const error = await res.json();
        setBidError(error.error || "Failed to place bid");
      }
    } catch (error) {
      console.error("Bid error:", error);
      setBidError("Failed to place bid. Please try again.");
    }
  };

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-medium">Loading auction…</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <button
              onClick={() => router.push("/")}
              className="transition-colors hover:text-foreground"
            >
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5" />
            <button
              onClick={() => router.push("/auctions")}
              className="transition-colors hover:text-foreground"
            >
              Auctions
            </button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="line-clamp-1 max-w-[200px] font-medium text-foreground">
              {auction.title}
            </span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Image Gallery */}
            <FadeIn direction="right">
              <div className="sticky top-24 space-y-3">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-secondary"
                >
                  <Image
                    src={auction.images?.[activeImage] || "/placeholder.jpg"}
                    alt={auction.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge
                      className={`rounded-full border-0 px-3 text-xs font-semibold ${
                        auction.status === "ACTIVE"
                          ? "bg-emerald-500/90 text-white"
                          : "bg-red-500/90 text-white"
                      }`}
                    >
                      {auction.status === "ACTIVE" ? "● Live" : auction.status}
                    </Badge>
                  </div>
                </motion.div>

                {auction.images?.length > 1 && (
                  <div className="flex gap-2">
                    {auction.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                          activeImage === i
                            ? "border-primary shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`View ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Details & Bid Panel */}
            <FadeIn direction="left" delay={0.1}>
              <div className="space-y-6">
                {/* Title & Categories */}
                <div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {auction.category?.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="mb-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {auction.title}
                  </h1>
                  <p className="leading-relaxed text-muted-foreground">{auction.description}</p>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <UserCircle className="h-4 w-4" />
                    Seller: <span className="font-medium text-foreground">{auction.sellerId}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium text-foreground">47 watching</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Hammer className="h-4 w-4" />
                    <span className="font-medium text-foreground">12 bids</span>
                  </span>
                </div>

                {/* Timer */}
                <div className="rounded-2xl border border-border bg-secondary/60 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Time Remaining</span>
                  </div>
                  <AuctionTimer endTime={auction.endTime} compact={false} />
                </div>

                {/* Bid info */}
                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                        Current Bid
                      </p>
                      <p className="gradient-text font-display text-4xl font-bold">
                        ₹{currentBid.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                        Reserve
                      </p>
                      <p className="text-lg font-semibold">
                        ₹{(auction.reservePrice ?? auction.startingPrice).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Bid input */}
                  <div className="mb-3 flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        type="number"
                        placeholder={`Min. ${currentBid + 1}`}
                        value={bidAmount}
                        onChange={(e) => {
                          setBidAmount(e.target.value);
                          setBidError("");
                        }}
                        min={currentBid + 1}
                        className="rounded-xl pl-7"
                        aria-label="Bid amount"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={placeBid}
                        disabled={!bidAmount}
                        className="rounded-xl border-0 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-white shadow-md shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40"
                      >
                        Place Bid
                      </Button>
                    </motion.div>
                  </div>

                  {bidError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {bidError}
                    </motion.p>
                  )}
                  {bidSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-medium text-emerald-600"
                    >
                      ✓ Bid placed successfully!
                    </motion.p>
                  )}
                </div>

                {/* Trust badges */}
                <StaggerContainer className="grid grid-cols-3 gap-3" staggerDelay={0.08}>
                  {[
                    { icon: Shield, label: "Buyer Protection" },
                    { icon: Tag, label: "Best Price" },
                    { icon: Hammer, label: "Verified Seller" },
                  ].map(({ icon: Icon, label }) => (
                    <StaggerItem key={label}>
                      <div className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary/60 p-3 text-center">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">{label}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to auctions
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
