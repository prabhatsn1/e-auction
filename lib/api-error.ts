import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const errorHandler = (error: unknown) => {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
};

export const successResponse = <T>(data: T, status = 200) => {
  return NextResponse.json({ success: true, data }, { status });
};

// Common error responses
export const errors = {
  unauthorized: () => new ApiError(401, "Unauthorized", "UNAUTHORIZED"),
  forbidden: () => new ApiError(403, "Forbidden", "FORBIDDEN"),
  notFound: (resource = "Resource") => new ApiError(404, `${resource} not found`, "NOT_FOUND"),
  badRequest: (message = "Bad request") => new ApiError(400, message, "BAD_REQUEST"),
  conflict: (message = "Resource already exists") => new ApiError(409, message, "CONFLICT"),
  tooManyRequests: () => new ApiError(429, "Too many requests", "RATE_LIMIT"),
  internal: (message = "Internal server error") => new ApiError(500, message, "INTERNAL_ERROR"),
};
