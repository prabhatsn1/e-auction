import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, profile } = await request.json();

    // TODO: Implement with actual database
    return NextResponse.json({ message: "Register endpoint - database not configured" }, { status: 501 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
