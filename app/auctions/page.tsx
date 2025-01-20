"use client";

import { AuctionCard } from "@/components/auctions/AuctionCard";
import { FilterSidebar } from "@/components/auctions/FilterSidebar";
import { SortDropdown } from "@/components/auctions/SortDropdown";
import { Auction } from "@/types/Auction";
import { Gavel } from "lucide-react";

export default function AuctionsPage() {
  // In a real app, you would fetch this data from an API
  const auctions: Auction[] = [
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <Gavel className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Live Auctions</h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar
              onFilterChange={(filters) => {
                console.log("Filters changed:", filters);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 bg-card p-4 rounded-lg shadow-sm">
              <p className="text-muted-foreground">
                {auctions.length} auctions found
              </p>
              <SortDropdown
                onSortChange={(value) => {
                  console.log("Sort changed:", value);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
