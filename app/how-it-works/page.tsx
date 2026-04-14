"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import {
  Search,
  Gavel,
  CreditCard,
  Package,
  UserPlus,
  Camera,
  Clock,
  DollarSign,
} from "lucide-react";
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
        <section className="bg-gradient-to-b from-secondary/40 to-background py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <FadeIn>
              <h1 className="mb-6 font-display text-5xl font-bold tracking-tight">
                How <span className="gradient-text">E-Auction</span> Works
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Whether you're buying or selling, our platform makes auctions simple, secure, and
                transparent.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* For Buyers */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FadeIn className="mb-12 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold">For Buyers</h2>
              <p className="text-muted-foreground">Start bidding in 4 simple steps</p>
            </FadeIn>

            <StaggerContainer
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              staggerDelay={0.1}
            >
              {buyerSteps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn className="mt-8 text-center">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/30"
                >
                  Start Bidding
                </motion.button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* For Sellers */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FadeIn className="mb-12 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold">For Sellers</h2>
              <p className="text-muted-foreground">List your items in 4 easy steps</p>
            </FadeIn>

            <StaggerContainer
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              staggerDelay={0.1}
            >
              {sellerSteps.map((step, i) => (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <step.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn className="mt-8 text-center">
              <Link href="/auctions/create">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30"
                >
                  Start Selling
                </motion.button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <FadeIn>
              <h2 className="mb-4 font-display text-3xl font-bold">Still have questions?</h2>
              <p className="mb-8 text-muted-foreground">Check out our FAQ or contact support</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/faq">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full border border-border bg-white px-6 py-3 font-semibold transition-colors hover:bg-secondary"
                  >
                    View FAQ
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full bg-primary px-6 py-3 font-semibold text-white"
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
