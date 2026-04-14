"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Users,
    title: "Community First",
    desc: "Building trust between buyers and sellers worldwide",
  },
  { icon: Target, title: "Transparency", desc: "Clear processes, fair pricing, no hidden fees" },
  { icon: Award, title: "Quality", desc: "Verified items and authenticated sellers only" },
  { icon: TrendingUp, title: "Innovation", desc: "Cutting-edge technology for seamless auctions" },
];

const stats = [
  { value: "2019", label: "Founded" },
  { value: "120K+", label: "Active Users" },
  { value: "50K+", label: "Items Sold" },
  { value: "150+", label: "Countries" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary/40 to-background py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <FadeIn>
              <h1 className="mb-6 font-display text-5xl font-bold tracking-tight">
                About <span className="gradient-text">E-Auction</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We're on a mission to make online auctions transparent, secure, and accessible to
                everyone. Since 2019, we've connected millions of buyers with verified sellers
                worldwide.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4" staggerDelay={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <p className="gradient-text mb-2 font-display text-4xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FadeIn className="mb-12 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold">Our Values</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                These principles guide everything we do, from product development to customer
                support.
              </p>
            </FadeIn>

            <StaggerContainer
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              staggerDelay={0.08}
            >
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-border bg-white p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <v.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Story */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <FadeIn>
              <h2 className="mb-6 font-display text-3xl font-bold">Our Story</h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>
                  E-Auction was born from a simple frustration: online auctions were complicated,
                  opaque, and often felt risky. We knew there had to be a better way.
                </p>
                <p>
                  In 2019, our founders—collectors and tech enthusiasts—set out to build the auction
                  platform they wished existed. One that prioritized transparency, security, and
                  user experience above all else.
                </p>
                <p>
                  Today, E-Auction serves over 120,000 users across 150+ countries, facilitating
                  millions in transactions every month. But we're just getting started.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
