"use client";

import React from "react";
import { Loader2, Gavel, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-lg">
        <div className="relative">
          <Gavel className="w-24 h-24 mx-auto text-red-500 animate-bounce" />
          <div className="absolute -top-2 -right-2">
            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              !
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Lot Not Found</h1>
        <p className="text-gray-600 text-lg">
          Sorry! This auction lot seems to have been sold or doesn&apos;t exist.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Error Code: 404 - Going Once, Going Twice, Gone!
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Return to Auction House
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <Loader2 className="w-16 h-16 mx-auto text-red-500 animate-spin" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Preparing Auction Items...
        </h2>
        <p className="text-gray-600">
          Please wait while we gather the finest lots for your consideration.
        </p>
      </div>
    </div>
  );
};

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-lg">
        <div className="relative">
          <AlertTriangle className="w-24 h-24 mx-auto text-amber-500 animate-pulse" />
          <div className="absolute -top-2 -right-2">
            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              !
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          Auction Interrupted
        </h1>
        <p className="text-gray-600 text-lg">
          We&apos;ve encountered an unexpected issue during the auction process.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Error Code: {error.digest || "500"} - Bidding Temporarily Suspended
          </p>
          <div className="space-y-2">
            <button
              onClick={() => reset()}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition-colors duration-200 w-full"
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors duration-200 w-full"
            >
              Return to Auction House
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotFoundPage, LoadingPage, ErrorPage };
