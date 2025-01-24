import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 604800,
        path: "/",
      })
    );

    return res.json({ user: { ...user, password: undefined } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" + error });
  }
}
