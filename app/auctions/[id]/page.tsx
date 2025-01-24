import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Clock, Tag, UserCircle, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Auction } from "@/types/Auction";

const AuctionDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [auction, setAuction] = useState<Auction>();
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    if (id) {
      const fetchAuction = async () => {
        try {
          const response = await fetch(`/api/auctions/${id}`);
          const data = await response.json();
          setAuction(data);
          setCurrentBid(data.currentPrice);
        } catch (error) {
          console.error("Failed to fetch auction", error);
        }
      };
      fetchAuction();
    }
  }, [id]);

  const placeBid = async () => {
    const bidValue = parseFloat(bidAmount);
    if (bidValue > currentBid) {
      try {
        const response = await fetch(`/api/auctions/${id}/bid`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bidAmount: bidValue }),
        });

        if (response.ok) {
          setCurrentBid(bidValue);
          setBidAmount("");
        }
      } catch (error) {
        console.error("Bid placement failed", error);
      }
    }
  };

  const timeRemaining = () => {
    if (!auction?.endTime) return "";
    const diff = new Date(auction.endTime).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  if (!auction) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-square">
          <Image
            src={auction.images?.[0] || "/placeholder.jpg"}
            alt={auction.title}
            fill
            priority
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <Card className="p-4">
          <CardHeader>
            <h1 className="text-2xl font-bold">{auction.title}</h1>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">{auction.description}</p>

              <div className="flex items-center space-x-2">
                <Tag />
                <span>Categories: {auction.category?.join(", ")}</span>
              </div>

              <div className="flex items-center space-x-2">
                <UserCircle />
                <span>Seller: {auction.sellerId}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock />
                <span>Time Left: {timeRemaining()}</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-lg flex items-center">
                  <Hammer className="mr-2" /> Current Bid
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  ${currentBid}
                </p>
              </div>

              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={currentBid + 1}
                />
                <Button
                  onClick={placeBid}
                  disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                >
                  Place Bid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
