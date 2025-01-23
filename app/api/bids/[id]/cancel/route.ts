import connectDB from "@/lib/mongodb";
import { Bid, Auction } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const bid = await Bid.findOne({
      _id: params.id,
      bidderId: req.headers.get("userId"),
      status: { $in: ["WINNING", "ACTIVE"] },
    });

    if (!bid) {
      return NextResponse.json(
        { status: "error", message: "Bid not found or cannot be cancelled" },
        { status: 404 }
      );
    }

    const auction = await Auction.findById(bid.auctionId);
    if (auction.status !== "ACTIVE") {
      return NextResponse.json(
        { status: "error", message: "Auction is no longer active" },
        { status: 400 }
      );
    }

    // Find the next highest bid
    const nextBid = await Bid.findOne({
      auctionId: bid.auctionId,
      _id: { $ne: bid._id },
      status: "OUTBID",
    }).sort({ amount: -1 });

    if (nextBid) {
      nextBid.status = "WINNING";
      await nextBid.save();

      // Update auction price
      await Auction.findByIdAndUpdate(bid.auctionId, {
        currentPrice: nextBid.amount,
      });
    }

    bid.status = "OUTBID";
    await bid.save();

    return NextResponse.json({
      status: "success",
      message: "Bid cancelled successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server error" + error },
      { status: 500 }
    );
  }
}
