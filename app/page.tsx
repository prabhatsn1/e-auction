"use client";

import React from "react";
import { Flame, Award, Tag, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header/Header";
import FeatureAuction from "@/components/FeatureAuction";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { Auction } from "@/types/Auction";

const featuredAuctions: Auction[] = [
  {
    id: "1",
    title: "Vintage Watch",
    description: "A beautiful vintage watch from the 1950s.",
    sellerId: "seller1",
    startingPrice: 8000,
    reservePrice: 12000,
    currentPrice: 10000,
    startTime: new Date("2025-10-01T10:00:00Z"),
    endTime: new Date("2025-10-10T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038646/samples/breakfast.jpg",
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038648/cld-sample-4.jpg",
    ],
    category: ["Watches", "Vintage"],
    createdAt: new Date("2025-09-01T10:00:00Z"),
    updatedAt: new Date("2025-09-15T10:00:00Z"),
  },
  {
    id: "2",
    title: "Antique Vase",
    description: "An exquisite antique vase from the Ming dynasty.",
    sellerId: "seller2",
    startingPrice: 40000,
    reservePrice: 56000,
    currentPrice: 44000,
    startTime: new Date("2025-10-05T10:00:00Z"),
    endTime: new Date("2025-10-15T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/cup-on-a-table.jpg",
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/coffee.jpg",
    ],
    category: ["Antiques", "Vases"],
    createdAt: new Date("2025-09-05T10:00:00Z"),
    updatedAt: new Date("2025-09-20T10:00:00Z"),
  },
];

const categories = [
  { name: "Electronics", count: 245, emoji: "💻", color: "from-blue-500/10 to-cyan-500/10 border-blue-200" },
  { name: "Collectibles", count: 189, emoji: "🏺", color: "from-amber-500/10 to-orange-500/10 border-amber-200" },
  { name: "Art", count: 156, emoji: "🎨", color: "from-pink-500/10 to-rose-500/10 border-pink-200" },
  { name: "Vehicles", count: 98, emoji: "🚗", color: "from-green-500/10 to-emerald-500/10 border-green-200" },
  { name: "Watches", count: 134, emoji: "⌚", color: "from-violet-500/10 to-purple-500/10 border-violet-200" },
  { name: "Jewelry", count: 211, emoji: "💎", color: "from-indigo-500/10 to-blue-500/10 border-indigo-200" },
  { name: "Fashion", count: 178, emoji: "👗", color: "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-200" },
  { name: "Sports", count: 92, emoji: "⚽", color: "from-teal-500/10 to-green-500/10 border-teal-200" },
];

const features = [
  {
    icon: Award,
    title: "Verified Sellers",
    description: "Every seller is thoroughly vetted and verified for your complete peace of mind.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Flame,
    title: "Live Bidding",
    description: "Real-time updates and instant bidding with zero latency across all devices.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Buyer Protection",
    description: "Full purchase protection on every transaction with our secure escrow system.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get notified the moment you're outbid or when a watched item goes live.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Price Insights",
    description: "AI-powered price history and market trends to help you bid smarter.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Tag,
    title: "Best Deals",
    description: "Competitive pricing on unique items you won't find anywhere else.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const stats = [
  { value: "50K+", label: "Active Auctions" },
  { value: "120K+", label: "Verified Sellers" },
  { value: "₹18Cr", label: "Sold This Month" },
  { value: "4.9★", label: "Avg. Rating" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden" aria-label="Hero">
        {/* Background blobs */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-slow" />
                Live auctions happening now
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              >
                Discover &amp;{" "}
                <span className="gradient-text">Win</span>{" "}
                Unique Auctions
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              >
                Bid on exclusive items from verified sellers worldwide. From rare
                collectibles to luxury watches — find your next treasure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/auctions">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
                  >
                    Explore Auctions
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-border text-foreground font-semibold hover:bg-secondary transition-colors shadow-sm"
                  >
                    Start Selling
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 rounded-3xl blur-2xl scale-95" />
                <Image
                  src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured auction items"
                  width={600}
                  height={420}
                  className="relative rounded-3xl shadow-2xl object-cover w-full"
                  priority
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current bid</p>
                    <p className="font-bold text-sm">₹3,50,000</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3"
                >
                  <p className="text-xs text-muted-foreground">Ends in</p>
                  <p className="font-bold text-sm text-orange-600">2h 14m 33s</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <FadeIn delay={0.4} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur border border-border/60 shadow-sm">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Auctions */}
      <FeatureAuction featuredAuctions={featuredAuctions} />

      {/* Categories */}
      <section className="py-20 bg-secondary/40" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Browse</p>
            <h2 id="categories-heading" className="font-display text-4xl font-bold tracking-tight">
              Popular Categories
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3" staggerDelay={0.06}>
            {categories.map((cat) => (
              <StaggerItem key={cat.name}>
                <Link href={`/auctions?category=${cat.name.toLowerCase()}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${cat.color} border cursor-pointer transition-shadow hover:shadow-md`}
                  >
                    <span className="text-2xl" role="img" aria-label={cat.name}>{cat.emoji}</span>
                    <p className="text-xs font-semibold text-center leading-tight">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count}</p>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-20" id="how-it-works" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why E-Auction</p>
            <h2 id="features-heading" className="font-display text-4xl font-bold tracking-tight">
              Built for serious bidders
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need to buy and sell with confidence, speed, and security.
            </p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6" aria-label="Call to action">
        <FadeIn>
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 text-center text-white shadow-2xl shadow-violet-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
            <h2 className="font-display text-4xl font-bold mb-4">Ready to start bidding?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
              Join over 120,000 verified sellers and millions of buyers on the world&apos;s most trusted auction platform.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-white text-violet-700 font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Create Free Account
                </motion.button>
              </Link>
              <Link href="/auctions">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Browse Auctions
                </motion.button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
