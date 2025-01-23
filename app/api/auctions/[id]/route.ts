// app/api/auctions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import { Auction, IUser } from "@/models";
import { z } from "zod";

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

const CreateAuctionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startingPrice: z.number().positive(),
  reservePrice: z.number().positive().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  images: z.array(z.string()),
  category: z.array(z.string()),
});

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const validatedData = CreateAuctionSchema.partial().parse(body);

    const auction = await Auction.findOneAndUpdate(
      {
        _id: params.id,
        sellerId: req.headers.get("userId"),
        status: { $in: ["DRAFT", "SCHEDULED"] },
      },
      validatedData,
      { new: true }
    );

    if (!auction) {
      return NextResponse.json(
        { status: "error", message: "Auction not found or cannot be modified" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", data: auction });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const auction = await Auction.findOneAndDelete({
      _id: params.id,
      sellerId: req.headers.get("userId"),
      status: { $in: ["DRAFT", "SCHEDULED"] },
    });

    if (!auction) {
      return NextResponse.json(
        { status: "error", message: "Auction not found or cannot be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "Auction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}
