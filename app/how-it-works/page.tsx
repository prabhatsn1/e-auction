"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { Search, Gavel, CreditCard, Package, UserPlus, Camera, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const buyerSteps = [
  { icon: UserPlus, title: "Create Account", desc: "Sign up for free in under 2 minutes" },
  { icon: Search, title: "Browse Auctions", desc: "Explore thousands of verified items" },
  { icon: Gavel, title: "Place Bids", desc: "Bid in real-time with instant updates" },
  { icon: CreditCard, title: "Win & Pay", desc: "Secure checkout with buyer protection" },
];

const sellerSteps = [
  { icon: UserPlus, title: "Get Verified", desc: "Complete seller verification process" },
  { icon: Camera, title: "List Your Item", desc: "Upload photos and set your reserve price" },
  { icon: Clock, title: "Go Live", desc: "Your auction starts at your chosen time" },
  { icon: DollarSign, title: "Get Paid", desc: "Receive payment securely after sale" },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-secondary/40 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <FadeIn>
              <h1 className="font-display text-5xl font-bold tracking-tight mb-6">
                How <span className="gradient-text">E-Auction</span> Works
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're buying or selling, our platform makes auctions simple, secure, and transparent.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* For Buyers */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-3">For Buyers</h2>
              <p className="text-muted-foreground">Start bidding in 4 simple steps</p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {buyerSteps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative p-6 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn className="text-center mt-8">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/30"
                >
                  Start Bidding
                </motion.button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* For Sellers */}
        <section className="py-20 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeIn className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-3">For Sellers</h2>
              <p className="text-muted-foreground">List your items in 4 easy steps</p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
              {sellerSteps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative p-6 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn className="text-center mt-8">
              <Link href="/auctions/create">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/30"
                >
                  Start Selling
                </motion.button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <FadeIn>
              <h2 className="font-display text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-8">Check out our FAQ or contact support</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/faq">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-full bg-white border border-border font-semibold hover:bg-secondary transition-colors"
                  >
                    View FAQ
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-full bg-primary text-white font-semibold"
                  >
                    Contact Support
                  </motion.button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
