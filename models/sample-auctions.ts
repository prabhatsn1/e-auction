// sample-auctions.ts
import { Types } from "mongoose";
import { Auction } from ".";

const sampleSellers = [
  new Types.ObjectId(), // Seller 1
  new Types.ObjectId(), // Seller 2
  new Types.ObjectId(), // Seller 3
];

export const sampleAuctions = [
  {
    title: "Vintage 1960s Rolex Submariner",
    description:
      "Rare vintage Rolex Submariner in excellent condition. Original parts, comes with box and papers.",
    sellerId: sampleSellers[0],
    startingPrice: 15000,
    reservePrice: 20000,
    currentPrice: 16500,
    startTime: new Date("2025-01-25T10:00:00Z"),
    endTime: new Date("2025-02-25T10:00:00Z"),
    status: "ACTIVE",
    images: [
      "rolex-submariner-1.jpg",
      "rolex-submariner-2.jpg",
      "rolex-submariner-3.jpg",
    ],
    category: ["Luxury", "Watches", "Vintage"],
  },
  {
    title: "2022 Tesla Model S Plaid",
    description:
      "Like-new Tesla Model S Plaid, only 5,000 miles. Full self-driving capability included.",
    sellerId: sampleSellers[1],
    startingPrice: 80000,
    reservePrice: 90000,
    currentPrice: 85000,
    startTime: new Date("2025-01-22T15:00:00Z"),
    endTime: new Date("2025-02-22T15:00:00Z"),
    status: "ACTIVE",
    images: ["tesla-plaid-1.jpg", "tesla-plaid-2.jpg"],
    category: ["Vehicles", "Electric Cars", "Luxury"],
  },
  {
    title: "Beachfront Villa in Maldives - 1 Week Stay",
    description:
      "Luxury overwater villa with private pool, valid for stay between March-December 2025.",
    sellerId: sampleSellers[2],
    startingPrice: 12000,
    reservePrice: 15000,
    currentPrice: 12800,
    startTime: new Date("2025-02-01T00:00:00Z"),
    endTime: new Date("2025-03-01T00:00:00Z"),
    status: "SCHEDULED",
    images: [
      "maldives-villa-1.jpg",
      "maldives-villa-2.jpg",
      "maldives-villa-3.jpg",
      "maldives-villa-4.jpg",
    ],
    category: ["Travel", "Luxury", "Accommodation"],
  },
  {
    title: "First Edition Harry Potter Complete Collection",
    description:
      "Complete set of first edition Harry Potter books, all in pristine condition with original dust jackets.",
    sellerId: sampleSellers[0],
    startingPrice: 25000,
    reservePrice: 30000,
    currentPrice: 27500,
    startTime: new Date("2025-01-15T12:00:00Z"),
    endTime: new Date("2025-02-15T12:00:00Z"),
    status: "ACTIVE",
    images: ["harry-potter-set-1.jpg", "harry-potter-set-2.jpg"],
    category: ["Books", "Collectibles", "Rare"],
  },
  {
    title: "Antique Persian Silk Carpet - 17th Century",
    description:
      "Exceptional 17th century Persian silk carpet with certificate of authenticity. Size: 12x15 feet.",
    sellerId: sampleSellers[1],
    startingPrice: 50000,
    currentPrice: 50000,
    startTime: new Date("2025-03-01T10:00:00Z"),
    endTime: new Date("2025-04-01T10:00:00Z"),
    status: "DRAFT",
    images: ["persian-carpet-1.jpg", "persian-carpet-2.jpg"],
    category: ["Antiques", "Home Decor", "Art"],
  },
  {
    title: "Gaming PC Setup - RTX 4090 Build",
    description:
      "Complete high-end gaming setup with RTX 4090, i9-13900K, 64GB RAM, and 4K monitors.",
    sellerId: sampleSellers[2],
    startingPrice: 5000,
    reservePrice: 6000,
    currentPrice: 5500,
    startTime: new Date("2025-01-20T08:00:00Z"),
    endTime: new Date("2025-02-20T08:00:00Z"),
    status: "ACTIVE",
    images: ["gaming-pc-1.jpg", "gaming-pc-2.jpg", "gaming-pc-3.jpg"],
    category: ["Electronics", "Gaming", "Computers"],
  },
  {
    title: "Signed Michael Jordan Jersey - 1998 Finals",
    description:
      "Authentic Michael Jordan Bulls jersey signed after the 1998 NBA Finals, with certificate.",
    sellerId: sampleSellers[0],
    startingPrice: 20000,
    reservePrice: 25000,
    currentPrice: 22000,
    startTime: new Date("2025-02-10T14:00:00Z"),
    endTime: new Date("2025-03-10T14:00:00Z"),
    status: "SCHEDULED",
    images: ["jordan-jersey-1.jpg", "jordan-jersey-2.jpg"],
    category: ["Sports", "Collectibles", "Memorabilia"],
  },
  {
    title: "Vintage 1959 Gibson Les Paul Standard",
    description:
      "Rare 1959 Gibson Les Paul Standard in Sunburst finish. Excellent condition with original case.",
    sellerId: sampleSellers[1],
    startingPrice: 300000,
    reservePrice: 350000,
    currentPrice: 300000,
    startTime: new Date("2025-01-18T16:00:00Z"),
    endTime: new Date("2025-02-18T16:00:00Z"),
    status: "ENDED",
    images: [
      "gibson-les-paul-1.jpg",
      "gibson-les-paul-2.jpg",
      "gibson-les-paul-3.jpg",
    ],
    category: ["Musical Instruments", "Vintage", "Collectibles"],
  },
  {
    title: "Diamond Engagement Ring - 3.5 Carat",
    description:
      "GIA certified 3.5 carat diamond engagement ring, VVS1 clarity, D color, excellent cut.",
    sellerId: sampleSellers[2],
    startingPrice: 45000,
    reservePrice: 50000,
    currentPrice: 47500,
    startTime: new Date("2025-01-30T09:00:00Z"),
    endTime: new Date("2025-03-02T09:00:00Z"),
    status: "ACTIVE",
    images: ["diamond-ring-1.jpg", "diamond-ring-2.jpg"],
    category: ["Jewelry", "Luxury", "Wedding"],
  },
  {
    title: "Rare Andy Warhol Original Print",
    description:
      "Original Andy Warhol screen print from the Campbell's Soup series, signed and numbered.",
    sellerId: sampleSellers[0],
    startingPrice: 70000,
    reservePrice: 80000,
    currentPrice: 75000,
    startTime: new Date("2025-02-05T11:00:00Z"),
    endTime: new Date("2025-03-05T11:00:00Z"),
    status: "SCHEDULED",
    images: ["warhol-print-1.jpg", "warhol-print-2.jpg"],
    category: ["Art", "Collectibles", "Prints"],
  },
];

// MongoDB insertion script
export async function insertSampleAuctions() {
  try {
    await Auction.insertMany(sampleAuctions);
    console.log("Sample auctions inserted successfully");
  } catch (error) {
    console.error("Error inserting sample auctions:", error);
  }
}
