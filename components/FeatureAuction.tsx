/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Timer } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { AuctionInterface } from "@/types/AuctionInterface";

interface FeatureAuctionProps {
  featuredAuctions: AuctionInterface[];
}

const FeatureAuction: React.FC<FeatureAuctionProps> = ({
  featuredAuctions,
}) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">Featured Auctions</h3>
          <button className="text-blue-600 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredAuctions.map((auction: any) => (
            <Card
              key={auction.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <Image
                  src={auction.imageUrl}
                  alt={auction.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{auction.title}</h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current Bid: ${auction.currentBid}</span>
                    <span className="flex items-center">
                      <Timer className="h-4 w-4 mr-1" />
                      {auction.timeLeft}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureAuction;
