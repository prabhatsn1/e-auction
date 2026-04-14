"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Gavel, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const myBids = [
  { id: "1", title: "Vintage Watch", currentBid: 95000, myBid: 95000, status: "winning", endTime: "2h 14m" },
  { id: "2", title: "Antique Vase", currentBid: 52000, myBid: 48000, status: "outbid", endTime: "5h 32m" },
];

const watchlist = [
  { id: "3", title: "Classic Car", currentBid: 3600000, watchers: 89, endTime: "1d 3h" },
  { id: "4", title: "Rare Painting", currentBid: 680000, watchers: 34, endTime: "12h 45m" },
];

const mySales = [
  { id: "5", title: "Designer Handbag", currentBid: 68000, bids: 12, status: "active", endTime: "3h 21m" },
  { id: "6", title: "Vintage Camera", finalPrice: 33600, status: "sold", soldDate: "2 days ago" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bids");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-8">
            <h1 className="font-display text-4xl font-bold tracking-tight mb-2">
              My <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage your bids, watchlist, and sales</p>
          </FadeIn>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" staggerDelay={0.05}>
            {[
              { icon: Gavel, label: "Active Bids", value: "2", color: "text-violet-600", bg: "bg-violet-50" },
              { icon: Eye, label: "Watching", value: "2", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Package, label: "Selling", value: "1", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: TrendingUp, label: "Won", value: "8", color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-white border border-border shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Tabs */}
          <FadeIn delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-white border border-border p-1 rounded-xl">
                <TabsTrigger value="bids" className="rounded-lg">My Bids</TabsTrigger>
                <TabsTrigger value="watchlist" className="rounded-lg">Watchlist</TabsTrigger>
                <TabsTrigger value="selling" className="rounded-lg">Selling</TabsTrigger>
              </TabsList>

              <TabsContent value="bids" className="space-y-4">
                {myBids.map((bid) => (
                  <motion.div
                    key={bid.id}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{bid.title}</h3>
                          <Badge className={bid.status === "winning" ? "bg-emerald-500" : "bg-orange-500"}>
                            {bid.status === "winning" ? "Winning" : "Outbid"}
                          </Badge>
                        </div>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>Your bid: <span className="font-semibold text-foreground">₹{bid.myBid.toLocaleString('en-IN')}</span></span>
                          <span>Current: <span className="font-semibold text-foreground">₹{bid.currentBid.toLocaleString('en-IN')}</span></span>
                          <span>Ends in: <span className="font-semibold text-orange-600">{bid.endTime}</span></span>
                        </div>
                      </div>
                      <Link href={`/auctions/${bid.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                        >
                          View
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="watchlist" className="space-y-4">
                {watchlist.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          <span>Current bid: <span className="font-semibold text-foreground">₹{item.currentBid.toLocaleString('en-IN')}</span></span>
                          <span>{item.watchers} watching</span>
                          <span>Ends in: <span className="font-semibold text-orange-600">{item.endTime}</span></span>
                        </div>
                      </div>
                      <Link href={`/auctions/${item.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold"
                        >
                          Bid Now
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="selling" className="space-y-4">
                {mySales.map((sale) => (
                  <motion.div
                    key={sale.id}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{sale.title}</h3>
                          <Badge className={sale.status === "active" ? "bg-emerald-500" : "bg-gray-500"}>
                            {sale.status}
                          </Badge>
                        </div>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                          {sale.status === "active" ? (
                            <>
                              <span>Current bid: <span className="font-semibold text-foreground">₹{sale.currentBid.toLocaleString('en-IN')}</span></span>
                              <span>{sale.bids} bids</span>
                              <span>Ends in: <span className="font-semibold text-orange-600">{sale.endTime}</span></span>
                            </>
                          ) : (
                            <>
                              <span>Sold for: <span className="font-semibold text-foreground">₹{sale.finalPrice.toLocaleString('en-IN')}</span></span>
                              <span>{sale.soldDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Link href={`/auctions/${sale.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2 rounded-xl bg-secondary text-foreground text-sm font-semibold border border-border"
                        >
                          Manage
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
