"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import Link from "next/link";

const navLinks = [
  { label: "Auctions", href: "/auctions" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const user = {
  name: "John Doe",
  email: "john@example.com",
  image: "/api/placeholder/32/32",
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xs">
              <SearchBar />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative hidden md:flex" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
              <div className="hidden md:block">
                <UserMenu
                  user={user}
                  onLogin={() => {}}
                  onLogout={() => {}}
                />
              </div>
              <Link href="/auctions/create">
                <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-full px-5 shadow-md shadow-primary/25">
                  + List Item
                </Button>
              </Link>
              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-border shadow-lg md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              <SearchBar />
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/auctions/create" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2 bg-primary text-white rounded-full">
                  + List Item
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
