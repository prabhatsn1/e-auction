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

Here's how to use each API endpoint with examples:

1. Register a new user:
```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "user@example.com",
    password: "securepassword123",
    role: "BIDDER",
    profile: {
      name: "John Doe",
      address: "123 Main St",
      phone: "+1234567890"
    }
  })
});

const data = await response.json();
// Returns: { user: { id, email, role, profile, ... } }
```

2. Login:
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "user@example.com",
    password: "securepassword123"
  })
});

const data = await response.json();
// Returns: { user: { id, email, role, profile, ... } }
// Sets HTTP-only cookie with JWT token
```

3. Logout:
```typescript
await fetch('/api/auth/logout', {
  method: 'POST'
});
// Clears the auth cookie
```

4. Verify Email:
```typescript
// Usually accessed via email link
window.location.href = `/api/auth/verify-email?token=${verificationToken}`;
// or
await fetch(`/api/auth/verify-email?token=${verificationToken}`);
```

5. Reset Password:
```typescript
const response = await fetch('/api/auth/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    token: "reset-token-from-email",
    password: "newpassword123"
  })
});
```

Protected API route example:
```typescript
// pages/api/protected-route.ts
import { authenticateToken } from '@/lib/auth';

export default async function handler(req, res) {
  try {
    const userId = await authenticateToken(req, res);
    // User is authenticated, proceed with protected logic
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
```



```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

// Add protected routes here
const protectedRoutes = ['/dashboard', '/profile', '/admin']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Redirect auth routes to dashboard if logged in
  if (authRoutes.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Check protected routes
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      verify(token, process.env.JWT_SECRET!)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// HOC for protected API routes
// utils/withAuth.ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { authenticateToken } from '@/lib/auth'

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const userId = await authenticateToken(req, res)
      req.userId = userId // Add userId to request
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}

// Example protected API route
// pages/api/protected/user-data.ts
import { withAuth } from '@/utils/withAuth'

export default withAuth(async function handler(req, res) {
  // Access userId from request
  const { userId } = req
  // Your protected API logic here
})

// hooks/useAuth.ts
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useAuth() {
  const router = useRouter()
  
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check')
      if (!response.ok) {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])
}

// Example protected page
// pages/dashboard.tsx
import { useAuth } from '@/hooks/useAuth'

export default function Dashboard() {
  useAuth() // Will redirect to login if not authenticated

  return <div>Protected Dashboard Content</div>
}

```

Usage:

1. Protected Pages:
```typescript
// Any page that needs auth
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedPage() {
  useAuth()
  return <div>Protected Content</div>
}
```

2. Protected API:
```typescript
import { withAuth } from '@/utils/withAuth'

export default withAuth(function handler(req, res) {
  // Access authenticated userId via req.userId
  // Only authenticated users can reach this code
})
```

Add route patterns to `protectedRoutes` in middleware.ts to protect additional pages.
