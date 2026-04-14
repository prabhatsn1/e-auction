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

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

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
        if (!r.ok) throw new Error('Auction not found');
        return r.json();
      })
      .then((response) => {
        const data = response.data;
        setAuction(data);
        setCurrentBid(data.currentPrice);
      })
      .catch((error) => {
        console.error('Error fetching auction:', error);
        // Fallback to mock data if API fails
        import('@/lib/mock-db').then(({ mockDB }) => {
          const auction = mockDB.auctions.getById(id);
          if (auction) {
            setAuction(auction);
            setCurrentBid(auction.currentPrice);
          }
        });
      });
  }, [id]);

  const placeBid = async () => {
    setBidError("");
    const bidValue = parseFloat(bidAmount);
    if (!bidValue || bidValue <= currentBid) {
      setBidError(`Bid must be higher than ₹${currentBid.toLocaleString('en-IN')}`);
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
      } else {
        const error = await res.json();
        setBidError(error.error || "Failed to place bid");
      }
    } catch (error) {
      console.error('Bid error:', error);
      setBidError("Failed to place bid. Please try again.");
    }
  };

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <button onClick={() => router.push("/")} className="hover:text-foreground transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => router.push("/auctions")} className="hover:text-foreground transition-colors">Auctions</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">{auction.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Image Gallery */}
            <FadeIn direction="right">
              <div className="space-y-3 sticky top-24">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-secondary"
                >
                  <Image
                    src={auction.images?.[activeImage] || "/placeholder.jpg"}
                    alt={auction.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`rounded-full px-3 text-xs font-semibold border-0 ${
                      auction.status === "ACTIVE"
                        ? "bg-emerald-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}>
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
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === i ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="64px" />
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
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {auction.category?.map((cat) => (
                      <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                    {auction.title}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">{auction.description}</p>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <UserCircle className="w-4 h-4" />
                    Seller: <span className="text-foreground font-medium">{auction.sellerId}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span className="text-foreground font-medium">47 watching</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Hammer className="w-4 h-4" />
                    <span className="text-foreground font-medium">12 bids</span>
                  </span>
                </div>

                {/* Timer */}
                <div className="p-4 rounded-2xl bg-secondary/60 border border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Time Remaining</span>
                  </div>
                  <AuctionTimer endTime={auction.endTime} compact={false} />
                </div>

                {/* Bid info */}
                <div className="p-5 rounded-2xl border border-border bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Current Bid</p>
                      <p className="font-display text-4xl font-bold gradient-text">
                        ₹{currentBid.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Reserve</p>
                      <p className="text-lg font-semibold">
                        ₹{(auction.reservePrice ?? auction.startingPrice).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Bid input */}
                  <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                      <Input
                        type="number"
                        placeholder={`Min. ${currentBid + 1}`}
                        value={bidAmount}
                        onChange={(e) => { setBidAmount(e.target.value); setBidError(""); }}
                        min={currentBid + 1}
                        className="pl-7 rounded-xl"
                        aria-label="Bid amount"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        onClick={placeBid}
                        disabled={!bidAmount}
                        className="rounded-xl px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0 shadow-md shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
                      >
                        Place Bid
                      </Button>
                    </motion.div>
                  </div>

                  {bidError && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-destructive">
                      {bidError}
                    </motion.p>
                  )}
                  {bidSuccess && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-emerald-600 font-medium">
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
                      <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/60 text-center">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">{label}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
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
