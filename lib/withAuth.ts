// HOC for protected API routes
// utils/withAuth.ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authenticateToken } from "@/lib/auth";

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = await authenticateToken(req, res);
      req.userId = userId; // Add userId to request
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
