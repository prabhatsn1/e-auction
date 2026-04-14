"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-12">
            <h1 className="mb-4 font-display text-5xl font-bold tracking-tight">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">1. Acceptance of Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  By accessing and using E-Auction, you accept and agree to be bound by these Terms
                  of Service. If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">2. User Accounts</h2>
                <p className="mb-3 leading-relaxed text-muted-foreground">
                  To participate in auctions, you must create an account. You agree to:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">3. Bidding Rules</h2>
                <p className="mb-3 leading-relaxed text-muted-foreground">
                  All bids placed on E-Auction are legally binding. By placing a bid, you agree to:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Complete the purchase if you win the auction</li>
                  <li>Pay the final bid amount plus applicable fees</li>
                  <li>Not retract bids except in exceptional circumstances</li>
                  <li>Comply with payment deadlines (48 hours after auction end)</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">4. Seller Obligations</h2>
                <p className="mb-3 leading-relaxed text-muted-foreground">Sellers must:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Provide accurate descriptions and authentic photos</li>
                  <li>Honor all winning bids that meet reserve prices</li>
                  <li>Ship items within 3 business days of payment</li>
                  <li>Pay the 5% commission fee on successful sales</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">5. Prohibited Activities</h2>
                <p className="mb-3 leading-relaxed text-muted-foreground">Users may not:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>List counterfeit, stolen, or illegal items</li>
                  <li>Engage in shill bidding or bid manipulation</li>
                  <li>Harass other users or sellers</li>
                  <li>Circumvent platform fees</li>
                  <li>Use automated tools to place bids</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">6. Fees and Payments</h2>
                <p className="leading-relaxed text-muted-foreground">
                  E-Auction charges a 5% commission on successful sales. Buyers pay the final bid
                  amount. All payments are processed securely through our payment partners in Indian
                  Rupees (₹). Refunds are subject to our dispute resolution process.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">7. Limitation of Liability</h2>
                <p className="leading-relaxed text-muted-foreground">
                  E-Auction acts as a marketplace platform. We are not responsible for the quality,
                  safety, or legality of items listed. Disputes between buyers and sellers should be
                  resolved through our dispute resolution process.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">8. Changes to Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of the
                  platform after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">9. Contact</h2>
                <p className="leading-relaxed text-muted-foreground">
                  For questions about these terms, contact us at legal@e-auction.com
                </p>
              </section>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
