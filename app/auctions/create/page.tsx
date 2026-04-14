"use client";

import CreateAuctionForm from "@/components/CreateAuctionForm";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function CreateAuction() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="border-b border-border bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <FadeIn>
              <h1 className="font-display text-3xl font-bold tracking-tight">Create New Auction</h1>
              <p className="text-muted-foreground mt-1">Fill in the details to list your item for auction</p>
            </FadeIn>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <FadeIn>
            <CreateAuctionForm />
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
