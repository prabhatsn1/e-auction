"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gavel, Twitter, Github, Instagram } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Browse Auctions", href: "/auctions" },
    { label: "Sell an Item", href: "/auctions/create" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Gavel className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">
                E<span className="gradient-text">Auction</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The world&apos;s most trusted platform for buying and selling unique items through live auctions.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-semibold text-sm mb-4">{group}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} E-Auction. All rights reserved.</p>
          <p>Built with ❤️ using Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
