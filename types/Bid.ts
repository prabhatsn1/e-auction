export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  amount: number;
  maxAmount?: number; // for proxy bidding
  status: "ACTIVE" | "OUTBID" | "WINNING";
  createdAt: Date;
}
