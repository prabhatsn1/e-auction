export interface Auction {
  id: string;
  title: string;
  description: string;
  sellerId: string;
  startingPrice: number;
  reservePrice?: number;
  currentPrice: number;
  startTime: Date;
  endTime: Date;
  status: "DRAFT" | "SCHEDULED" | "ACTIVE" | "ENDED" | "CANCELLED";
  images: string[];
  category: string[];
  createdAt: Date;
  updatedAt: Date;
}
