# 🗄️ Mock Database Setup Guide

## Overview

This project uses a **free, client-side mock database** using browser `localStorage` for data persistence. This eliminates the need for MongoDB or any external database during development and demo.

## Features

✅ **Zero Cost** - No database subscription needed
✅ **No Setup Required** - Works out of the box
✅ **Persistent Data** - Data survives page refreshes
✅ **Full CRUD Operations** - Create, Read, Update, Delete
✅ **Search & Filters** - Category, status, and text search
✅ **Sample Data** - Pre-loaded with 4 sample auctions

## How It Works

### Storage Keys
```typescript
AUCTIONS: "e-auction-auctions"
USERS: "e-auction-users"
BIDS: "e-auction-bids"
WATCHLIST: "e-auction-watchlist"
```

### Sample Data Included

1. **Vintage Rolex Watch** - ₹80,000 starting price
2. **Ming Dynasty Vase** - ₹4,00,000 starting price
3. **1967 Mustang Classic Car** - ₹25,00,000 starting price
4. **Rare Abstract Painting** - ₹1,50,000 starting price

## API Endpoints

### Auctions

#### Get All Auctions
```
GET /api/auctions
Query params: ?category=watches&status=ACTIVE&q=vintage
```

#### Get Single Auction
```
GET /api/auctions/[id]
```

#### Create Auction
```
POST /api/auctions
Body: {
  title: string,
  description: string,
  startingPrice: number,
  reservePrice?: number,
  endTime: Date,
  images: string[],
  category: string[]
}
```

#### Update Auction
```
PUT /api/auctions/[id]
Body: Partial<Auction>
```

#### Delete Auction
```
DELETE /api/auctions/[id]
```

### Bids

#### Place Bid
```
POST /api/auctions/[id]/bid
Body: { bidAmount: number }
```

## Usage in Components

### Fetching Auctions
```typescript
const response = await fetch('/api/auctions');
const { data } = await response.json();
```

### Creating Auction
```typescript
const response = await fetch('/api/auctions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(auctionData),
});
```

### Placing Bid
```typescript
const response = await fetch(`/api/auctions/${id}/bid`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ bidAmount: 10000 }),
});
```

## Direct Database Access

You can also use the mock database directly:

```typescript
import { mockDB } from '@/lib/mock-db';

// Get all auctions
const auctions = mockDB.auctions.getAll();

// Search auctions
const results = mockDB.auctions.search('vintage');

// Filter by category
const watches = mockDB.auctions.filterByCategory('watches');

// Create auction
const newAuction = mockDB.auctions.create({
  title: 'New Item',
  // ... other fields
});

// Update auction
mockDB.auctions.update('auction-id', { currentPrice: 15000 });

// Delete auction
mockDB.auctions.delete('auction-id');
```

## Data Persistence

- Data is stored in browser `localStorage`
- Survives page refreshes
- Cleared when browser cache is cleared
- Separate per domain/origin

## Clearing Data

### From Browser Console
```javascript
localStorage.clear();
// or
localStorage.removeItem('e-auction-auctions');
```

### Programmatically
```typescript
import { mockDB } from '@/lib/mock-db';
mockDB.clearAll();
```

## Limitations

⚠️ **Storage Limit**: ~5-10MB per domain (browser dependent)
⚠️ **Client-Side Only**: Data not shared between users
⚠️ **No Server Persistence**: Data lost if localStorage cleared
⚠️ **No Real-Time Sync**: No WebSocket support

## Migration to Real Database

When ready for production, replace `mockDB` calls with real database:

### Option 1: MongoDB Atlas (Free Tier)
- 512MB storage free
- Shared cluster
- Sign up at: https://www.mongodb.com/cloud/atlas

### Option 2: Supabase (Free Tier)
- PostgreSQL database
- 500MB storage free
- Real-time subscriptions
- Sign up at: https://supabase.com

### Option 3: PlanetScale (Free Tier)
- MySQL database
- 5GB storage free
- Serverless
- Sign up at: https://planetscale.com

### Option 4: Firebase Firestore (Free Tier)
- NoSQL database
- 1GB storage free
- Real-time updates
- Sign up at: https://firebase.google.com

## Testing

The mock database is perfect for:
- ✅ Development
- ✅ Demos
- ✅ Prototyping
- ✅ Testing UI/UX
- ✅ Learning

## Notes

- All dates are automatically converted to Date objects
- IDs are generated using timestamps
- Sample data is auto-loaded on first access
- Type-safe with TypeScript interfaces

## Support

For issues or questions about the mock database, check:
- `lib/mock-db.ts` - Database implementation
- `app/api/auctions/route.ts` - API examples
- `types/Auction.ts` - Data structure

---

**Built for E-Auction Platform** 🎯
