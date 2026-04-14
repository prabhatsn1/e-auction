import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://e-auction.vercel.app"),
  title: {
    default: "E-Auction — Bid on Exclusive Items Worldwide",
    template: "%s | E-Auction",
  },
  description:
    "Discover and bid on unique, verified items from trusted sellers worldwide. Real-time auctions for art, collectibles, watches, and more.",
  keywords: ["online auction", "bid", "collectibles", "art", "watches", "antiques", "live bidding", "buy online", "sell items"],
  authors: [{ name: "E-Auction" }],
  creator: "E-Auction",
  publisher: "E-Auction",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://e-auction.vercel.app",
    siteName: "E-Auction",
    title: "E-Auction — Bid on Exclusive Items Worldwide",
    description: "Discover and bid on unique, verified items from trusted sellers worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "E-Auction" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Auction — Bid on Exclusive Items Worldwide",
    description: "Real-time auctions for art, collectibles, watches, and more.",
    images: ["/og-image.jpg"],
    creator: "@eauction",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://e-auction.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "E-Auction",
  url: "https://e-auction.vercel.app",
  description: "Online auction platform for exclusive items worldwide",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://e-auction.vercel.app/auctions?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "E-Auction",
    logo: {
      "@type": "ImageObject",
      url: "https://e-auction.vercel.app/logo.png",
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
