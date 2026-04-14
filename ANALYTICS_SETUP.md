# 📊 Vercel Analytics Setup Guide

## Overview

Vercel Analytics and Speed Insights have been integrated into the E-Auction platform to track user behavior, performance metrics, and Core Web Vitals.

## Features Enabled

### 1. **Vercel Analytics**

- ✅ Page views tracking
- ✅ User sessions
- ✅ Traffic sources
- ✅ Geographic data
- ✅ Device & browser stats
- ✅ Custom events (ready to implement)

### 2. **Speed Insights**

- ✅ Core Web Vitals monitoring
- ✅ Real User Monitoring (RUM)
- ✅ Performance scores
- ✅ LCP, FID, CLS tracking
- ✅ TTFB measurements

## Installation

Already installed via:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

## Configuration

### Automatic Setup (Current)

Analytics are automatically enabled in `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Environment Variables (Optional)

No environment variables required for basic setup. Analytics work automatically when deployed to Vercel.

For development mode tracking (optional):

```env
# .env.local
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

## Custom Event Tracking

### Track Custom Events

```typescript
import { track } from "@vercel/analytics";

// Track auction bid
track("Bid Placed", {
  auctionId: "123",
  amount: 50000,
  category: "Watches",
});

// Track auction creation
track("Auction Created", {
  category: "Art",
  startingPrice: 100000,
});

// Track user registration
track("User Registered", {
  method: "email",
});
```

### Example Implementation

#### In Auction Detail Page:

```typescript
import { track } from "@vercel/analytics";

const placeBid = async () => {
  // ... bid logic

  if (res.ok) {
    track("Bid Placed", {
      auctionId: id,
      bidAmount: bidValue,
      auctionTitle: auction.title,
    });
  }
};
```

#### In Create Auction Form:

```typescript
import { track } from "@vercel/analytics";

const handleSubmit = async (e) => {
  // ... create logic

  if (response.ok) {
    track("Auction Created", {
      category: selectedCategories,
      startingPrice: auctionData.startingPrice,
    });
  }
};
```

## Viewing Analytics

### On Vercel Dashboard

1. Deploy your project to Vercel
2. Go to your project dashboard
3. Click on "Analytics" tab
4. View real-time and historical data

### Metrics Available

- **Page Views**: Total visits per page
- **Visitors**: Unique vs returning visitors
- **Top Pages**: Most visited pages
- **Referrers**: Traffic sources
- **Countries**: Geographic distribution
- **Devices**: Desktop vs mobile vs tablet
- **Browsers**: Browser usage stats

### Speed Insights Metrics

- **LCP** (Largest Contentful Paint): < 2.5s (good)
- **FID** (First Input Delay): < 100ms (good)
- **CLS** (Cumulative Layout Shift): < 0.1 (good)
- **TTFB** (Time to First Byte): < 800ms (good)
- **FCP** (First Contentful Paint): < 1.8s (good)

## Privacy & GDPR Compliance

Vercel Analytics is privacy-friendly:

- ✅ No cookies used
- ✅ No personal data collected
- ✅ GDPR compliant
- ✅ No consent banner needed
- ✅ Aggregated data only

## Development vs Production

### Development Mode

- Analytics disabled by default in `localhost`
- Can be enabled with environment variable
- Speed Insights shows local metrics

### Production Mode

- Automatically enabled on Vercel deployment
- Real-time data collection
- Dashboard updates every few minutes

## Advanced Configuration

### Custom Sampling Rate

```typescript
// app/layout.tsx
<Analytics
  beforeSend={(event) => {
    // Custom logic before sending
    return event;
  }}
/>
```

### Debug Mode

```typescript
<Analytics debug={true} />
```

### Disable in Development

```typescript
<Analytics mode={process.env.NODE_ENV === 'production' ? 'production' : 'development'} />
```

## Recommended Custom Events

For E-Auction platform, track these events:

1. **User Actions**
   - `User Registered`
   - `User Logged In`
   - `User Logged Out`

2. **Auction Actions**
   - `Auction Viewed`
   - `Auction Created`
   - `Auction Edited`
   - `Auction Deleted`

3. **Bidding Actions**
   - `Bid Placed`
   - `Bid Won`
   - `Bid Lost`
   - `Watchlist Added`
   - `Watchlist Removed`

4. **Search & Filter**
   - `Search Performed`
   - `Filter Applied`
   - `Category Selected`

5. **Conversion Events**
   - `Payment Completed`
   - `Item Shipped`
   - `Review Submitted`

## Performance Monitoring

### Core Web Vitals Targets

- **LCP**: < 2.5s (currently optimized with next/image)
- **FID**: < 100ms (React 19 + Next.js 15 optimizations)
- **CLS**: < 0.1 (fixed layouts, no layout shifts)

### Optimization Tips

1. Use `next/image` for all images ✅
2. Implement lazy loading ✅
3. Code splitting with dynamic imports ✅
4. Optimize fonts with next/font ✅
5. Minimize JavaScript bundle size ✅

## Troubleshooting

### Analytics Not Showing

1. Ensure deployed to Vercel
2. Wait 5-10 minutes for data to appear
3. Check browser console for errors
4. Verify Analytics component is in layout

### Speed Insights Not Working

1. Clear browser cache
2. Redeploy to Vercel
3. Check if SpeedInsights component is mounted
4. Verify no ad blockers interfering

## Cost

- **Free Tier**:
  - 100,000 events/month
  - 30 days data retention
  - Basic analytics

- **Pro Tier** ($20/month):
  - Unlimited events
  - 90 days retention
  - Advanced filtering
  - Custom events

## Resources

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Speed Insights Docs](https://vercel.com/docs/speed-insights)
- [Web Vitals Guide](https://web.dev/vitals/)

## Next Steps

1. ✅ Analytics installed and configured
2. ⏳ Deploy to Vercel to see data
3. ⏳ Implement custom event tracking
4. ⏳ Monitor Core Web Vitals
5. ⏳ Optimize based on insights

---

**Analytics Active** 📊 | **Speed Insights Enabled** ⚡
