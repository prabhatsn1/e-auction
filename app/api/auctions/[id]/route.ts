// app/api/auctions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import { Auction, IUser } from "@/models";

interface AuctionResponse extends IAuction {
  isEnded: boolean;
  isStarted: boolean;
  timeRemaining: number;
  biddingAllowed: boolean;
}

export interface IAuction {
  _id: Types.ObjectId;
  title: string;
  description: string;
  sellerId: IUser;
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid auction ID format",
        },
        { status: 400 }
      );
    }

    const auction = (await Auction.findById(params.id)
      .populate("sellerId", "name email profileImage")
      .lean()) as IAuction | null;

    if (!auction) {
      return NextResponse.json(
        {
          status: "error",
          message: "Auction not found",
        },
        { status: 404 }
      );
    }

    const now = new Date();
    const auctionData: AuctionResponse = {
      ...auction,
      isEnded: now > new Date(auction.endTime),
      isStarted: now >= new Date(auction.startTime),
      timeRemaining: new Date(auction.endTime).getTime() - now.getTime(),
      biddingAllowed:
        now >= new Date(auction.startTime) &&
        now < new Date(auction.endTime) &&
        auction.status === "ACTIVE",
    };

    return NextResponse.json({
      status: "success",
      data: auctionData,
    });
  } catch (error) {
    console.error("Error fetching auction:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
