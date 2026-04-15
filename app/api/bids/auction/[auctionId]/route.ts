import connectDB from "@/lib/mongodb";
import { Bid } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ auctionId: string }> }) {
  try {
    await connectDB();
    const { auctionId } = await params;

    const bids = await Bid.find({ auctionId })
      .populate("bidderId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const summary = {
      totalBids: bids.length,
      highestBid: bids[0]?.amount || 0,
      uniqueBidders: new Set(bids.map((bid) => bid.bidderId._id.toString())).size,
    };

    return NextResponse.json({
      status: "success",
      data: { bids, summary },
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server error" + error },
      { status: 500 }
    );
  }
}
