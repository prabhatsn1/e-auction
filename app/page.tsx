"use client";

import React from "react";
import { Flame, Award, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Header from "@/components/Header/Header";
import FeatureAuction from "@/components/FeatureAuction";
import { Auction } from "@/types/Auction";
import wp from "@/media/images/wallpaper1.jpg";

export default function Home() {
  // Sample featured auctions data
  const featuredAuctions: Auction[] = [
    {
      id: "1",
      title: "Vintage Watch",
      description: "A beautiful vintage watch from the 1950s.",
      sellerId: "seller1",
      startingPrice: 100,
      reservePrice: 150,
      currentPrice: 120,
      startTime: new Date("2025-10-01T10:00:00Z"),
      endTime: new Date("2025-10-10T10:00:00Z"),
      status: "ACTIVE",
      images: [
        "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038646/samples/breakfast.jpg",
        "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038648/cld-sample-4.jpg",
      ],
      category: ["Watches", "Vintage"],
      createdAt: new Date("2025-09-01T10:00:00Z"),
      updatedAt: new Date("2025-09-15T10:00:00Z"),
    },
    {
      id: "2",
      title: "Antique Vase",
      description: "An exquisite antique vase from the Ming dynasty.",
      sellerId: "seller2",
      startingPrice: 500,
      reservePrice: 700,
      currentPrice: 550,
      startTime: new Date("2025-10-05T10:00:00Z"),
      endTime: new Date("2025-10-15T10:00:00Z"),
      status: "ACTIVE",
      images: [
        "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/cup-on-a-table.jpg",
        "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/coffee.jpg",
      ],
      category: ["Antiques", "Vases"],
      createdAt: new Date("2025-09-05T10:00:00Z"),
      updatedAt: new Date("2025-09-20T10:00:00Z"),
    },
    // Add more dummy auctions as needed
  ];

  const categories = [
    { name: "Electronics", count: 245 },
    { name: "Collectibles", count: 189 },
    { name: "Art", count: 156 },
    { name: "Vehicles", count: 98 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Discover Unique Auctions
              </h2>
              <p className="text-xl mb-6">
                Bid on exclusive items from verified sellers worldwide
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                Explore Auctions
              </button>
            </div>
            <div className="hidden md:block">
              <Image
                src={wp}
                alt="Featured auctions"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <FeatureAuction featuredAuctions={featuredAuctions} />

      {/* Categories */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">{category.name}</h4>
                  <p className="text-gray-600">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Verified Sellers</h4>
              <p className="text-gray-600">
                All our sellers are thoroughly verified for your safety
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Flame className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Live Bidding</h4>
              <p className="text-gray-600">
                Real-time updates and instant bidding functionality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Best Deals</h4>
              <p className="text-gray-600">
                Competitive pricing and unique items
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
