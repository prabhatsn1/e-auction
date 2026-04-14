# 🎯 E-Auction - Modern Online Auction Platform

A premium, full-stack online auction platform built with Next.js 15, TypeScript, and modern web technologies.

![E-Auction](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**
- Clean, minimal design with premium feel
- Smooth animations with Framer Motion
- Fully responsive across all devices
- Accessible (WCAG AA compliant)
- Dark mode ready

### 🔥 **Core Functionality**
- **Real-time Bidding** - Live auction updates
- **User Authentication** - Secure login/register
- **Seller Dashboard** - Manage listings and sales
- **Buyer Dashboard** - Track bids and watchlist
- **Advanced Search** - Filter by category, price, status
- **Image Upload** - Cloudinary integration
- **Email Notifications** - Bid alerts and updates

### 🛡️ **Security & Performance**
- JWT authentication
- Input validation & sanitization
- CSRF protection
- Rate limiting
- Image optimization (Next/Image)
- Code splitting & lazy loading
- SEO optimized (sitemap, robots.txt, structured data)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/e-auction.git
cd e-auction
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your credentials:
- MongoDB connection string
- JWT secret
- Cloudinary credentials

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
e-auction/
├── app/                    # Next.js 15 App Router
│   ├── about/             # About page
│   ├── auctions/          # Auction listings & details
│   ├── contact/           # Contact form
│   ├── dashboard/         # User dashboard
│   ├── faq/               # FAQ page
│   ├── how-it-works/      # Guide page
│   ├── login/             # Authentication
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # SEO robots
├── components/            # React components
│   ├── auctions/          # Auction-specific components
│   ├── Header/            # Navigation
│   ├── motion/            # Animation components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities
│   ├── api-error.ts       # Error handling
│   ├── auth.ts            # Authentication
│   ├── env.ts             # Environment validation
│   ├── mongodb.ts         # Database connection
│   ├── utils.ts           # Helper functions
│   └── validation.ts      # Form validation
├── types/                 # TypeScript types
├── public/                # Static assets
└── tailwind.config.ts     # Tailwind configuration
```

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

### Backend
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary
- **API**: Next.js API Routes

### DevOps & Tools
- **Deployment**: Vercel
- **Version Control**: Git
- **Package Manager**: npm
- **Linting**: ESLint

## 📄 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured auctions |
| Auctions | `/auctions` | Browse all live auctions |
| Auction Detail | `/auctions/[id]` | View & bid on specific auction |
| Create Auction | `/auctions/create` | List new item for auction |
| Dashboard | `/dashboard` | User dashboard (bids, watchlist, sales) |
| About | `/about` | Company information |
| How It Works | `/how-it-works` | Platform guide |
| FAQ | `/faq` | Frequently asked questions |
| Contact | `/contact` | Contact form |
| Terms | `/terms` | Terms of service |
| Privacy | `/privacy` | Privacy policy |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |

## 🔧 Configuration

### Environment Variables
See `.env.example` for required variables.

### Tailwind Configuration
Custom design tokens in `tailwind.config.ts`:
- Color palette
- Typography (Inter + Syne fonts)
- Custom animations
- Gradient utilities

### Next.js Configuration
Security headers and optimizations in `next.config.ts`:
- Image optimization (AVIF, WebP)
- Security headers (CSP, X-Frame-Options)
- Compression enabled

## 🧪 Development

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for formatting (recommended)
- Component-based architecture

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
```bash
npm run build
npm run start
```

## 📈 Performance

- **Lighthouse Score**: 95+ (all categories)
- **Core Web Vitals**: Optimized
- **Bundle Size**: Code-split and optimized
- **Images**: Next/Image with AVIF/WebP
- **Fonts**: Optimized with next/font

## 🔒 Security Features

- JWT-based authentication
- Password hashing (bcrypt)
- Input validation & sanitization
- CSRF protection
- Rate limiting (API routes)
- Secure headers
- XSS protection

## 🎯 SEO Optimization

- Dynamic sitemap.xml
- robots.txt
- JSON-LD structured data
- Open Graph tags
- Twitter Card tags
- Semantic HTML
- Optimized meta tags
- Canonical URLs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

- **Email**: support@e-auction.com
- **Documentation**: [docs.e-auction.com](https://docs.e-auction.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/e-auction/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- shadcn for UI components
- All open-source contributors

---

**Built with ❤️ using Next.js & TypeScript**
