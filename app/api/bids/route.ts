import connectDB from "@/lib/mongodb";
import { Auction, Bid } from "@/models";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

const CreateBidSchema = z.object({
  auctionId: z.string(),
  amount: z.number().positive(),
  maxAmount: z.number().positive().optional(),
  automaticBidding: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = CreateBidSchema.parse(body);
    const bidderId = req.headers.get("userId");

    // Get auction details
    const auction = await Auction.findById(validatedData.auctionId);
    if (!auction) {
      return NextResponse.json(
        { status: "error", message: "Auction not found" },
        { status: 404 }
      );
    }

    // Validate auction status
    const now = new Date();
    if (
      now < auction.startTime ||
      now > auction.endTime ||
      auction.status !== "ACTIVE"
    ) {
      return NextResponse.json(
        {
          status: "error",
          message: "Auction is not active for bidding",
        },
        { status: 400 }
      );
    }

    // Validate bid amount
    const highestBid = await Bid.findOne({ auctionId: auction._id }).sort({
      amount: -1,
    });
    const minimumBid = highestBid
      ? highestBid.amount + auction.currentPrice * 0.05 // 5% increment
      : auction.startingPrice;

    if (validatedData.amount < minimumBid) {
      return NextResponse.json(
        {
          status: "error",
          message: `Bid must be at least ${minimumBid}`,
        },
        { status: 400 }
      );
    }

    // Create new bid
    const newBid = await Bid.create({
      ...validatedData,
      bidderId,
      status: "WINNING",
    });

    // Update previous bids
    await Bid.updateMany(
      {
        auctionId: validatedData.auctionId,
        _id: { $ne: newBid._id },
        status: { $in: ["WINNING", "ACTIVE"] },
      },
      { status: "OUTBID" }
    );

    // Update auction current price
    await Auction.findByIdAndUpdate(validatedData.auctionId, {
      currentPrice: validatedData.amount,
    });

    return NextResponse.json(
      { status: "success", data: newBid },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
