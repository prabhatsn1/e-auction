// app/api/auctions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { Auction } from "@/models";

// Define query parameters schema
const QuerySchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
  status: z
    .enum(["DRAFT", "SCHEDULED", "ACTIVE", "ENDED", "CANCELLED"])
    .optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  searchTerm: z.string().optional(),
  sellerId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // Parse query parameters
    const url = new URL(req.url);
    const rawParams = Object.fromEntries(url.searchParams.entries());
    const queryParams = QuerySchema.parse(rawParams);

    // Build filter conditions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (queryParams.status) {
      filter.status = queryParams.status;
    }

    if (queryParams.category) {
      filter.category = queryParams.category;
    }

    if (queryParams.minPrice || queryParams.maxPrice) {
      filter.currentPrice = {};
      if (queryParams.minPrice) {
        filter.currentPrice.$gte = queryParams.minPrice;
      }
      if (queryParams.maxPrice) {
        filter.currentPrice.$lte = queryParams.maxPrice;
      }
    }

    if (queryParams.searchTerm) {
      filter.$or = [
        { title: { $regex: queryParams.searchTerm, $options: "i" } },
        { description: { $regex: queryParams.searchTerm, $options: "i" } },
      ];
    }

    if (queryParams.sellerId) {
      filter.sellerId = queryParams.sellerId;
    }

    // Calculate pagination
    const skip = (queryParams.page - 1) * queryParams.limit;

    // Execute query
    const [auctions, totalCount] = await Promise.all([
      Auction.find(filter)
        .skip(skip)
        .limit(queryParams.limit)
        .populate("sellerId", "name email")
        .sort({ createdAt: -1 })
        .lean(),
      Auction.countDocuments(filter),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / queryParams.limit);
    const hasNextPage = queryParams.page < totalPages;
    const hasPrevPage = queryParams.page > 1;

    return NextResponse.json({
      status: "success",
      data: {
        auctions,
        pagination: {
          currentPage: queryParams.page,
          totalPages,
          totalItems: totalCount,
          hasNextPage,
          hasPrevPage,
          itemsPerPage: queryParams.limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching auctions:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid query parameters",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Example API calls:
// Basic listing: /api/auctions
// With filters: /api/auctions?status=ACTIVE&minPrice=100&maxPrice=1000
// With search: /api/auctions?searchTerm=vintage&category=electronics
// With pagination: /api/auctions?page=2&limit=20
