import { NextRequest } from "next/server";
import { mockDB } from "@/lib/mock-db";
import { successResponse, errorHandler, errors } from "@/lib/api-error";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { bidAmount } = body;

    if (!bidAmount || bidAmount <= 0) {
      throw errors.badRequest("Invalid bid amount");
    }

    const auction = mockDB.auctions.getById(params.id);

    if (!auction) {
      throw errors.notFound("Auction");
    }

    if (auction.status !== "ACTIVE") {
      throw errors.badRequest("Auction is not active");
    }

    if (bidAmount <= auction.currentPrice) {
      throw errors.badRequest("Bid must be higher than current price");
    }

    // Create bid
    const newBid = mockDB.bids.create({
      auctionId: params.id,
      userId: "demo-user", // In real app, get from auth
      amount: bidAmount,
    });

    return successResponse({
      message: "Bid placed successfully",
      bid: newBid,
      newCurrentPrice: bidAmount,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
