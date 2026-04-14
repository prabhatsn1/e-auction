"use client";

import { track } from "@vercel/analytics";

// Custom hook for analytics tracking
export const useAnalytics = () => {
  // User events
  const trackUserRegistered = (method: "email" | "google" | "facebook") => {
    track("User Registered", { method });
  };

  const trackUserLoggedIn = (method: "email" | "google" | "facebook") => {
    track("User Logged In", { method });
  };

  const trackUserLoggedOut = () => {
    track("User Logged Out");
  };

  // Auction events
  const trackAuctionViewed = (auctionId: string, title: string, category: string[]) => {
    track("Auction Viewed", { auctionId, title, category: category.join(", ") });
  };

  const trackAuctionCreated = (category: string[], startingPrice: number) => {
    track("Auction Created", {
      category: category.join(", "),
      startingPrice,
      priceRange: getPriceRange(startingPrice),
    });
  };

  // Bidding events
  const trackBidPlaced = (auctionId: string, bidAmount: number, auctionTitle: string) => {
    track("Bid Placed", {
      auctionId,
      bidAmount,
      auctionTitle,
      priceRange: getPriceRange(bidAmount),
    });
  };

  const trackWatchlistAdded = (auctionId: string, title: string) => {
    track("Watchlist Added", { auctionId, title });
  };

  const trackWatchlistRemoved = (auctionId: string) => {
    track("Watchlist Removed", { auctionId });
  };

  // Search & Filter events
  const trackSearchPerformed = (query: string, resultsCount: number) => {
    track("Search Performed", { query, resultsCount });
  };

  const trackFilterApplied = (filterType: string, filterValue: string) => {
    track("Filter Applied", { filterType, filterValue });
  };

  const trackCategorySelected = (category: string) => {
    track("Category Selected", { category });
  };

  // Navigation events
  const trackPageView = (pageName: string, path: string) => {
    track("Page View", { pageName, path });
  };

  // Helper function to categorize prices
  const getPriceRange = (price: number): string => {
    if (price < 10000) return "Under 10K";
    if (price < 50000) return "10K-50K";
    if (price < 100000) return "50K-100K";
    if (price < 500000) return "100K-500K";
    if (price < 1000000) return "500K-1M";
    return "Above 1M";
  };

  return {
    trackUserRegistered,
    trackUserLoggedIn,
    trackUserLoggedOut,
    trackAuctionViewed,
    trackAuctionCreated,
    trackBidPlaced,
    trackWatchlistAdded,
    trackWatchlistRemoved,
    trackSearchPerformed,
    trackFilterApplied,
    trackCategorySelected,
    trackPageView,
  };
};

// Direct export for non-hook usage
export const analytics = {
  trackUserRegistered: (method: "email" | "google" | "facebook") => {
    track("User Registered", { method });
  },
  trackBidPlaced: (auctionId: string, bidAmount: number, auctionTitle: string) => {
    track("Bid Placed", { auctionId, bidAmount, auctionTitle });
  },
  trackAuctionCreated: (category: string[], startingPrice: number) => {
    track("Auction Created", { category: category.join(", "), startingPrice });
  },
};
