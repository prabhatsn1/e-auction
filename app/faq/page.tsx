"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' in the header, fill in your details, and verify your email. It takes less than 2 minutes.",
      },
      {
        q: "Is registration free?",
        a: "Yes! Creating an account is completely free. We only charge a small commission on successful sales.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and bank transfers for verified accounts.",
      },
    ],
  },
  {
    category: "Bidding",
    questions: [
      {
        q: "How does bidding work?",
        a: "Simply enter your bid amount in Indian Rupees (₹) - must be higher than current bid - and click 'Place Bid'. You'll be notified if you're outbid.",
      },
      {
        q: "Can I retract a bid?",
        a: "Bids are binding. You can only retract in exceptional circumstances (contact support).",
      },
      {
        q: "What happens if I win?",
        a: "You'll receive an email with payment instructions. Complete payment within 48 hours to secure your item.",
      },
    ],
  },
  {
    category: "Selling",
    questions: [
      {
        q: "How do I list an item?",
        a: "Go to 'List Item', upload photos, set your reserve price, and choose auction duration. Items are reviewed within 24 hours.",
      },
      {
        q: "What are the fees?",
        a: "We charge 5% commission on successful sales. All transactions are in Indian Rupees (₹). No listing fees or hidden charges.",
      },
      {
        q: "When do I get paid?",
        a: "Funds are released 3 days after the buyer confirms receipt, or 7 days after shipping confirmation.",
      },
    ],
  },
  {
    category: "Safety & Security",
    questions: [
      {
        q: "Is my payment secure?",
        a: "Yes. We use bank-level encryption and never store your full payment details.",
      },
      {
        q: "What if an item isn't as described?",
        a: "We offer full buyer protection. Open a dispute within 48 hours of receipt for a full refund.",
      },
      {
        q: "How are sellers verified?",
        a: "All sellers must provide ID, proof of address, and pass our background checks before listing items.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-12 text-center">
            <h1 className="mb-4 font-display text-5xl font-bold tracking-tight">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about E-Auction
            </p>
          </FadeIn>

          <div className="space-y-12">
            {faqs.map((section) => (
              <FadeIn key={section.category}>
                <h2 className="mb-6 font-display text-2xl font-bold">{section.category}</h2>
                <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                  {section.questions.map((faq, i) => {
                    const key = `${section.category}-${i}`;
                    const isOpen = openIndex === key;

                    return (
                      <StaggerItem key={key}>
                        <motion.div
                          className="overflow-hidden rounded-xl border border-border bg-white"
                          whileHover={{ borderColor: "hsl(var(--primary))" }}
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : key)}
                            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-secondary/50"
                          >
                            <span className="pr-4 font-semibold">{faq.q}</span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-6 pb-4 text-muted-foreground">{faq.a}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
