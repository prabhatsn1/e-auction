import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token" + error);
  }
};
