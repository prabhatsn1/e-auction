import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    })
  );

  return response;
}
