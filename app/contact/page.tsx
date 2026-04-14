"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", category: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out and we'll respond within 24 hours.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn direction="right">
              <div className="p-8 rounded-2xl bg-white border border-border shadow-sm">
                <h2 className="font-display text-2xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="seller">Seller Support</SelectItem>
                        <SelectItem value="report">Report Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full bg-primary text-white rounded-xl">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-emerald-600 font-medium text-center"
                    >
                      ✓ Message sent! We'll get back to you soon.
                    </motion.p>
                  )}
                </form>
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn direction="left" delay={0.1}>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">support@e-auction.com</p>
                      <p className="text-sm text-muted-foreground">sales@e-auction.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office</h3>
                      <p className="text-sm text-muted-foreground">123 Auction Street</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
