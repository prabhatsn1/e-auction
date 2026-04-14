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
    <footer className="border-t border-border bg-secondary/50" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600">
                <Gavel className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold">
                E<span className="gradient-text">Auction</span>
              </span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              The world&apos;s most trusted platform for buying and selling unique items through
              live auctions.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-4 text-sm font-semibold">{group}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} E-Auction. All rights reserved.</p>
          <p>Built with ❤️ using Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
