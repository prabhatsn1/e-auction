"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-12">
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using E-Auction, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">2. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  To participate in auctions, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">3. Bidding Rules</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  All bids placed on E-Auction are legally binding. By placing a bid, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Complete the purchase if you win the auction</li>
                  <li>Pay the final bid amount plus applicable fees</li>
                  <li>Not retract bids except in exceptional circumstances</li>
                  <li>Comply with payment deadlines (48 hours after auction end)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">4. Seller Obligations</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Sellers must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide accurate descriptions and authentic photos</li>
                  <li>Honor all winning bids that meet reserve prices</li>
                  <li>Ship items within 3 business days of payment</li>
                  <li>Pay the 5% commission fee on successful sales</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">5. Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Users may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>List counterfeit, stolen, or illegal items</li>
                  <li>Engage in shill bidding or bid manipulation</li>
                  <li>Harass other users or sellers</li>
                  <li>Circumvent platform fees</li>
                  <li>Use automated tools to place bids</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">6. Fees and Payments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-Auction charges a 5% commission on successful sales. Buyers pay the final bid amount. 
                  All payments are processed securely through our payment partners in Indian Rupees (₹). 
                  Refunds are subject to our dispute resolution process.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-Auction acts as a marketplace platform. We are not responsible for the quality, safety, 
                  or legality of items listed. Disputes between buyers and sellers should be resolved through 
                  our dispute resolution process.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the platform 
                  after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
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
