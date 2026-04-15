import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // TODO: Implement with actual database
    return NextResponse.json({ message: "Reset password endpoint - database not configured" }, { status: 501 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
