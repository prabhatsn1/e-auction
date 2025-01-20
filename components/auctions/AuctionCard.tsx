import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hammer, Timer, Eye } from "lucide-react";
import { Auction } from "@/types/Auction";
import { AuctionTimer } from "./AuctionTimer";

interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={auction.images[0]}
            alt={auction.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
          />
          <div className="absolute top-4 right-4 z-20">
            <Badge
              variant={auction.status === "ACTIVE" ? "default" : "destructive"}
              className="opacity-90"
            >
              {auction.status}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {auction.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="opacity-90">
                <Eye className="w-3 h-3 mr-1" />
                {Math.floor(Math.random() * 100)} watching
              </Badge>
              <Badge variant="secondary" className="opacity-90">
                <Hammer className="w-3 h-3 mr-1" />
                {Math.floor(Math.random() * 20)} bids
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Current Bid</p>
              <p className="text-2xl font-bold">
                ${auction.currentPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Reserve Price</p>
              <p className="text-lg font-semibold">
                $
                {(
                  auction.reservePrice || auction.startingPrice
                ).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Time Remaining
              </span>
            </div>
            <AuctionTimer endTime={auction.endTime} />
          </div>
          <div className="flex flex-wrap gap-1">
            {auction.category.map((cat) => (
              <Badge key={cat} variant="outline" className="bg-primary/5">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors">
          Place Bid
        </button>
      </CardFooter>
    </Card>
  );
};
