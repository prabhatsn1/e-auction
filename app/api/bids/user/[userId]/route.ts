import connectDB from "@/lib/mongodb";
import { Bid } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const bids = await Bid.find({ bidderId: params.userId })
      .populate("auctionId", "title currentPrice endTime status")
      .sort({ createdAt: -1 })
      .lean();

    const summary = {
      activeBids: bids.filter((bid) => bid.status === "WINNING").length,
      totalBids: bids.length,
      activeAuctions: new Set(
        bids
          .filter((bid) => bid.auctionId.status === "ACTIVE")
          .map((bid) => bid.auctionId._id.toString())
      ).size,
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
