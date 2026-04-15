import { NextRequest, NextResponse } from "next/server";
import { mockDB } from "@/lib/mock-db";
import { successResponse, errorHandler, errors } from "@/lib/api-error";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const auction = mockDB.auctions.getById(id);

    if (!auction) {
      throw errors.notFound("Auction");
    }

    return successResponse(auction);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedAuction = mockDB.auctions.update(id, body);

    if (!updatedAuction) {
      throw errors.notFound("Auction");
    }

    return successResponse(updatedAuction);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = mockDB.auctions.delete(id);

    if (!deleted) {
      throw errors.notFound("Auction");
    }

    return successResponse({ message: "Auction deleted successfully" });
  } catch (error) {
    return errorHandler(error);
  }
}
