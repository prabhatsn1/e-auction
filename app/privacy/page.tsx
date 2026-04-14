"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="mb-12">
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Account information (name, email, password)</li>
                  <li>Profile details (address, phone number, payment methods)</li>
                  <li>Auction activity (bids, purchases, listings)</li>
                  <li>Communications with us and other users</li>
                  <li>Device and usage data (IP address, browser type, pages visited)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide and improve our auction services</li>
                  <li>Process transactions and send notifications</li>
                  <li>Verify seller identities and prevent fraud</li>
                  <li>Communicate updates, promotions, and support</li>
                  <li>Analyze usage patterns and optimize performance</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We share your information only in these circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>With buyers/sellers to complete transactions</li>
                  <li>With payment processors to handle payments</li>
                  <li>With service providers who assist our operations</li>
                  <li>When required by law or to protect rights</li>
                  <li>With your consent for specific purposes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  We never sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures including encryption, secure servers, 
                  and regular security audits. However, no method of transmission over the internet is 100% secure. 
                  We encourage you to use strong passwords and enable two-factor authentication.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and deliver personalized content. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access and download your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain data processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide services. 
                  Transaction records are kept for 7 years for legal and accounting purposes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  E-Auction is not intended for users under 18. We do not knowingly collect information from children. 
                  If you believe a child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">9. International Users</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place for international data transfers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this policy periodically. We'll notify you of significant changes via email 
                  or platform notification. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy-related questions or to exercise your rights, contact us at privacy@e-auction.com 
                  or use our contact form.
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
