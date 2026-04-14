import { NextRequest, NextResponse } from "next/server";
import { mockDB } from "@/lib/mock-db";
import { successResponse, errorHandler, errors } from "@/lib/api-error";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    let auctions = mockDB.auctions.getAll();

    // Apply filters
    if (category) {
      auctions = mockDB.auctions.filterByCategory(category);
    }

    if (status) {
      auctions = mockDB.auctions.filterByStatus(status as any);
    }

    if (query) {
      auctions = mockDB.auctions.search(query);
    }

    // Sort by most recent
    auctions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return successResponse(auctions);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.startingPrice || !body.endTime) {
      throw errors.badRequest("Missing required fields");
    }

    const newAuction = mockDB.auctions.create({
      title: body.title,
      description: body.description || "",
      sellerId: body.sellerId || "demo-seller",
      startingPrice: Number(body.startingPrice),
      reservePrice: body.reservePrice ? Number(body.reservePrice) : undefined,
      currentPrice: Number(body.startingPrice),
      startTime: body.startTime ? new Date(body.startTime) : new Date(),
      endTime: new Date(body.endTime),
      status: body.status || "DRAFT",
      images: body.images || [],
      category: body.category || [],
    });

    return successResponse(newAuction, 201);
  } catch (error) {
    return errorHandler(error);
  }
}
