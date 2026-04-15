import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Implement with actual database
    // const user = await prisma.user.findUnique({ where: { email } });
    return NextResponse.json({ message: "Login endpoint - database not configured" }, { status: 501 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
