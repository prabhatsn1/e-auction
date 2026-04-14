// Mock database using localStorage for client-side persistence
// This is a free alternative to MongoDB for development/demo purposes

import { Auction } from "@/types/Auction";
import { User } from "@/types/User";

const STORAGE_KEYS = {
  AUCTIONS: "e-auction-auctions",
  USERS: "e-auction-users",
  BIDS: "e-auction-bids",
  WATCHLIST: "e-auction-watchlist",
};

// Helper to safely access localStorage
const isBrowser = typeof window !== "undefined";

// Initialize with sample data
const SAMPLE_AUCTIONS: Auction[] = [
  {
    id: "1",
    title: "Vintage Rolex Watch",
    description: "A beautiful vintage Rolex watch from the 1950s in excellent condition.",
    sellerId: "seller1",
    startingPrice: 80000,
    reservePrice: 120000,
    currentPrice: 95000,
    startTime: new Date("2025-01-20T10:00:00Z"),
    endTime: new Date("2025-02-10T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038646/samples/breakfast.jpg",
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038648/cld-sample-4.jpg",
    ],
    category: ["Watches", "Vintage"],
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-15T10:00:00Z"),
  },
  {
    id: "2",
    title: "Ming Dynasty Antique Vase",
    description: "An exquisite antique vase from the Ming dynasty, authenticated by experts.",
    sellerId: "seller2",
    startingPrice: 400000,
    reservePrice: 560000,
    currentPrice: 520000,
    startTime: new Date("2025-01-18T10:00:00Z"),
    endTime: new Date("2025-02-15T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/cup-on-a-table.jpg",
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/coffee.jpg",
    ],
    category: ["Antiques", "Vases"],
    createdAt: new Date("2025-01-05T10:00:00Z"),
    updatedAt: new Date("2025-01-20T10:00:00Z"),
  },
  {
    id: "3",
    title: "Classic Vintage Car - 1967 Mustang",
    description: "Fully restored 1967 Ford Mustang in pristine condition. Original parts maintained.",
    sellerId: "seller3",
    startingPrice: 2500000,
    reservePrice: 3500000,
    currentPrice: 3200000,
    startTime: new Date("2025-01-15T10:00:00Z"),
    endTime: new Date("2025-02-20T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038648/cld-sample-4.jpg",
    ],
    category: ["Vehicles", "Classic Cars"],
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-01-18T10:00:00Z"),
  },
  {
    id: "4",
    title: "Rare Abstract Painting by Modern Artist",
    description: "Original abstract painting, signed and authenticated. Limited edition piece.",
    sellerId: "seller4",
    startingPrice: 150000,
    reservePrice: 250000,
    currentPrice: 180000,
    startTime: new Date("2025-01-22T10:00:00Z"),
    endTime: new Date("2025-02-12T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "https://res.cloudinary.com/dwapqaaya/image/upload/v1737038647/samples/coffee.jpg",
    ],
    category: ["Art", "Paintings"],
    createdAt: new Date("2025-01-12T10:00:00Z"),
    updatedAt: new Date("2025-01-22T10:00:00Z"),
  },
];

// Database operations
export const mockDB = {
  // Auctions
  auctions: {
    getAll: (): Auction[] => {
      if (!isBrowser) return SAMPLE_AUCTIONS;
      const stored = localStorage.getItem(STORAGE_KEYS.AUCTIONS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(SAMPLE_AUCTIONS));
        return SAMPLE_AUCTIONS;
      }
      return JSON.parse(stored).map((a: any) => ({
        ...a,
        startTime: new Date(a.startTime),
        endTime: new Date(a.endTime),
        createdAt: new Date(a.createdAt),
        updatedAt: new Date(a.updatedAt),
      }));
    },

    getById: (id: string): Auction | null => {
      const auctions = mockDB.auctions.getAll();
      return auctions.find((a) => a.id === id) || null;
    },

    create: (auction: Omit<Auction, "id" | "createdAt" | "updatedAt">): Auction => {
      const auctions = mockDB.auctions.getAll();
      const newAuction: Auction = {
        ...auction,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      auctions.push(newAuction);
      if (isBrowser) {
        localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(auctions));
      }
      return newAuction;
    },

    update: (id: string, updates: Partial<Auction>): Auction | null => {
      const auctions = mockDB.auctions.getAll();
      const index = auctions.findIndex((a) => a.id === id);
      if (index === -1) return null;
      
      auctions[index] = {
        ...auctions[index],
        ...updates,
        updatedAt: new Date(),
      };
      
      if (isBrowser) {
        localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(auctions));
      }
      return auctions[index];
    },

    delete: (id: string): boolean => {
      const auctions = mockDB.auctions.getAll();
      const filtered = auctions.filter((a) => a.id !== id);
      if (filtered.length === auctions.length) return false;
      
      if (isBrowser) {
        localStorage.setItem(STORAGE_KEYS.AUCTIONS, JSON.stringify(filtered));
      }
      return true;
    },

    search: (query: string): Auction[] => {
      const auctions = mockDB.auctions.getAll();
      const lowerQuery = query.toLowerCase();
      return auctions.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerQuery) ||
          a.description.toLowerCase().includes(lowerQuery) ||
          a.category.some((c) => c.toLowerCase().includes(lowerQuery))
      );
    },

    filterByCategory: (category: string): Auction[] => {
      const auctions = mockDB.auctions.getAll();
      return auctions.filter((a) =>
        a.category.some((c) => c.toLowerCase() === category.toLowerCase())
      );
    },

    filterByStatus: (status: Auction["status"]): Auction[] => {
      const auctions = mockDB.auctions.getAll();
      return auctions.filter((a) => a.status === status);
    },
  },

  // Bids
  bids: {
    getByAuction: (auctionId: string) => {
      if (!isBrowser) return [];
      const stored = localStorage.getItem(STORAGE_KEYS.BIDS);
      if (!stored) return [];
      const allBids = JSON.parse(stored);
      return allBids.filter((b: any) => b.auctionId === auctionId);
    },

    create: (bid: { auctionId: string; userId: string; amount: number }) => {
      if (!isBrowser) return null;
      const stored = localStorage.getItem(STORAGE_KEYS.BIDS);
      const bids = stored ? JSON.parse(stored) : [];
      const newBid = {
        ...bid,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      bids.push(newBid);
      localStorage.setItem(STORAGE_KEYS.BIDS, JSON.stringify(bids));
      
      // Update auction current price
      mockDB.auctions.update(bid.auctionId, { currentPrice: bid.amount });
      
      return newBid;
    },
  },

  // Watchlist
  watchlist: {
    get: (userId: string) => {
      if (!isBrowser) return [];
      const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      if (!stored) return [];
      const allWatchlist = JSON.parse(stored);
      return allWatchlist.filter((w: any) => w.userId === userId);
    },

    add: (userId: string, auctionId: string) => {
      if (!isBrowser) return false;
      const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      const watchlist = stored ? JSON.parse(stored) : [];
      
      // Check if already exists
      if (watchlist.some((w: any) => w.userId === userId && w.auctionId === auctionId)) {
        return false;
      }
      
      watchlist.push({ userId, auctionId, addedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
      return true;
    },

    remove: (userId: string, auctionId: string) => {
      if (!isBrowser) return false;
      const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      if (!stored) return false;
      
      const watchlist = JSON.parse(stored);
      const filtered = watchlist.filter(
        (w: any) => !(w.userId === userId && w.auctionId === auctionId)
      );
      
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(filtered));
      return true;
    },
  },

  // Clear all data (for testing)
  clearAll: () => {
    if (!isBrowser) return;
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
