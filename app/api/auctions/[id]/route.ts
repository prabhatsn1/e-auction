import { NextRequest, NextResponse } from "next/server";
import { mockDB } from "@/lib/mock-db";
import { successResponse, errorHandler, errors } from "@/lib/api-error";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auction = mockDB.auctions.getById(params.id);

    if (!auction) {
      throw errors.notFound("Auction");
    }

    return successResponse(auction);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedAuction = mockDB.auctions.update(params.id, body);

    if (!updatedAuction) {
      throw errors.notFound("Auction");
    }

    return successResponse(updatedAuction);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = mockDB.auctions.delete(params.id);

    if (!deleted) {
      throw errors.notFound("Auction");
    }

    return successResponse({ message: "Auction deleted successfully" });
  } catch (error) {
    return errorHandler(error);
  }
}
