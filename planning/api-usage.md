Here's when and how to use each bid API:

1. **POST /api/bids** - Place a new bid

```typescript
// When user clicks "Place Bid" button
const placeBid = async () => {
  const response = await fetch("/api/bids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      userId: currentUser.id,
    },
    body: JSON.stringify({
      auctionId: auction._id,
      amount: 1500, // $1,500
      maxAmount: 2000, // Optional: Maximum amount for auto-bidding
      automaticBidding: true, // Optional: Enable auto-bidding
    }),
  });
};
```

2. **GET /api/bids/auction/{auctionId}** - View auction's bid history

```typescript
// When viewing auction details page
const getBidHistory = async (auctionId: string) => {
  const response = await fetch(`/api/bids/auction/${auctionId}`);
  const { bids, summary } = await response.json();

  console.log(summary.totalBids); // Total number of bids
  console.log(summary.highestBid); // Current highest bid
  console.log(summary.uniqueBidders); // Number of unique bidders
};
```

3. **GET /api/bids/user/{userId}** - View user's bidding activity

```typescript
// When viewing user profile or dashboard
const getUserBids = async (userId: string) => {
  const response = await fetch(`/api/bids/user/${userId}`);
  const { bids, summary } = await response.json();

  // Show active bids where user is winning
  const winningBids = bids.filter((bid) => bid.status === "WINNING");

  // Show auctions where user has been outbid
  const outbidAuctions = bids.filter((bid) => bid.status === "OUTBID");
};
```

4. **PUT /api/bids/{id}/cancel** - Cancel an active bid

```typescript
// When user wants to retract their bid
const cancelBid = async (bidId: string) => {
  const response = await fetch(`/api/bids/${bidId}/cancel`, {
    method: "PUT",
    headers: { userId: currentUser.id },
  });

  if (response.ok) {
    // Update UI to show bid cancelled
    // Show next highest bidder as winning
  }
};
```

Common use cases:

- Auction listing pages
- User dashboards
- Bid history components
- Real-time bidding interfaces
- Auto-bidding systems
- Notification systems
