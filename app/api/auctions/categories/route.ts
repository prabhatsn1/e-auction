import connectDB from "@/lib/mongodb";
import { Auction } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const categories = await Auction.distinct("category");

    return NextResponse.json({
      status: "success",
      data: categories.sort(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Internal server error" + error },
      { status: 500 }
    );
  }
}
