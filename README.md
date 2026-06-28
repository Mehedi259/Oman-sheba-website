# Hello Oman Sheba
## ওমান বাংলাদেশীদের বিশ্বস্ত সেবা প্ল্যাটফর্ম

**Hello Oman Sheba** হলো ওমানে বসবাসরত বাংলাদেশীদের জন্য একটি সম্পূর্ণ ডিজিটাল সেবা প্ল্যাটফর্ম। এই প্ল্যাটফর্মে আপনি পাবেন চাকরি, বাসা ভাড়া, গাড়ি, স্বাস্থ্যসেবা, আইনগত সহায়তা এবং আরো অনেক কিছু - সবকিছু এক জায়গায়।

## 🎯 লক্ষ্য

ওমানে বসবাসরত ৫ লক্ষ+ বাংলাদেশীদের জন্য #1 ডিজিটাল সেবা প্ল্যাটফর্ম হওয়া।

## ✨ Key Features

### Core Modules
- 🏢 **Job Portal** - Complete recruitment platform with CV builder, applications, and recruiter dashboard
- 🏠 **Property Listings** - Rent/buy houses, flats, rooms, bed spaces with maps and filters
- 🚗 **Vehicle Marketplace** - Buy, sell, rent cars and motorcycles
- 🛂 **Passport & Visa Services** - Document tracking, appointments, renewal guides
- 🏥 **Healthcare Directory** - Hospitals, doctors, clinics, emergency services
- 🛡️ **Insurance Hub** - Compare medical, travel, life, and vehicle insurance
- ✈️ **Travel Services** - Flights, hotels, visa packages, travel agencies
- ⚖️ **Legal Services** - Lawyers, documentation, translation, notary
- 🎓 **Education** - Schools, training centers, online courses
- 👥 **Community Forum** - Q&A, events, announcements, networking
- 🛒 **Classifieds** - Buy/sell electronics, furniture, and more
- 📰 **News Portal** - Latest Oman, Bangladesh, Embassy updates
- 🚨 **Emergency Services** - Quick access to police, embassy, ambulance

### Advanced Features
- 🤖 AI Chat Assistant with smart search and recommendations
- 🔍 Powerful global search with dynamic filtering
- 📱 Progressive Web App (PWA) with offline support
- 🌐 Multilingual ready (Bengali primary, English/Arabic future)
- 💳 Payment gateway integration (Stripe, SSLCommerz, Oman gateways)
- 🔔 Multi-channel notifications (Email, SMS, WhatsApp, Push)
- 📊 Enterprise analytics and reporting
- ✅ Service provider verification system
- ⭐ Ratings and reviews
- 🗺️ Google Maps integration
- 💬 Real-time messaging with Socket.io

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animation**: Framer Motion
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide Icons

#### Backend
- **Framework**: Next.js API Routes + tRPC
- **Runtime**: Node.js
- **API Type**: RESTful + tRPC

#### Database
- **Primary DB**: PostgreSQL
- **ORM**: Prisma
- **Cache**: Redis
- **Search**: Meilisearch

#### Authentication
- **Auth Provider**: Better Auth / Auth.js
- **Strategy**: JWT + OAuth
- **Features**: Role-based access control (RBAC)

#### Storage & Media
- **File Storage**: Cloudflare R2 / AWS S3
- **Image Optimization**: Next.js Image + Sharp
- **CDN**: Cloudflare

#### Real-time & Notifications
- **WebSocket**: Socket.io
- **Email**: Resend / SendGrid
- **SMS**: Twilio
- **WhatsApp**: WhatsApp Business API
- **Push**: Firebase Cloud Messaging

#### Payment
- **International**: Stripe
- **Bangladesh**: SSLCommerz
- **Oman**: Thawani / OmanNet (future)

#### DevOps & Deployment
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Railway/AWS (Backend)
- **Monitoring**: Sentry + LogRocket
- **Analytics**: Google Analytics + Microsoft Clarity

#### SEO & Performance
- **Meta Framework**: Next.js SEO
- **Schema**: JSON-LD structured data
- **Lighthouse Score**: 95+
- **Core Web Vitals**: Optimized

## 📁 Project Structure

```
hello-oman-sheba/
├── apps/
│   ├── web/                    # Next.js frontend application
│   ├── admin/                  # Admin dashboard
│   └── api/                    # Backend API (if separate)
├── packages/
│   ├── ui/                     # Shared UI components (Shadcn)
│   ├── database/               # Prisma schema and migrations
│   ├── auth/                   # Authentication logic
│   ├── config/                 # Shared configuration
│   └── types/                  # Shared TypeScript types
├── docs/                       # Documentation
├── docker/                     # Docker configurations
└── scripts/                    # Utility scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/hello-oman-sheba.git
cd hello-oman-sheba

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm db:migrate

# Seed the database
pnpm db:seed

# Start development server
pnpm dev
```

### Docker Setup

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec web pnpm db:migrate

# View logs
docker-compose logs -f
```

## 🔧 Development

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Run linting
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format
```

## 📊 Database Schema

See [Database Schema Documentation](./docs/database-schema.md) for complete ER diagrams and table structures.

## 🔐 Security Features

- JWT-based authentication
- OAuth 2.0 integration
- CSRF protection
- XSS prevention
- Rate limiting
- SQL injection prevention via Prisma
- File upload validation
- Role-based access control (RBAC)
- Audit logging
- Data encryption at rest and in transit

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- ARIA labels
- Screen reader support
- High contrast mode
- RTL support (for Arabic)

## 🌍 Internationalization

Primary language is **Bengali (বাংলা)**, with architecture supporting:
- English (planned)
- Arabic (planned)

All text uses i18n keys for easy translation.

## 📈 Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Server-side rendering (SSR)
- Static generation where applicable
- Edge caching with Cloudflare

## 🧪 Testing Strategy

- Unit Tests: Jest + React Testing Library
- Integration Tests: Playwright
- E2E Tests: Cypress
- API Tests: Supertest
- Load Tests: k6
- Coverage Target: 80%+

## 📱 Mobile Experience

- Mobile-first responsive design
- Progressive Web App (PWA)
- Installable on mobile devices
- Offline functionality
- Fast load times
- Touch-optimized interactions

## 🗺️ Roadmap

### Phase 1 (Current) - Core Platform
- ✅ Project setup and architecture
- ✅ Database design
- ⏳ Authentication system
- ⏳ Core modules (Jobs, Property, Vehicles)
- ⏳ Homepage and navigation
- ⏳ Search functionality

### Phase 2 - Service Expansion
- 📋 Passport/Visa services
- 📋 Healthcare directory
- 📋 Insurance hub
- 📋 Travel services
- 📋 Legal services
- 📋 Education directory

### Phase 3 - Community & Content
- 📋 Community forum
- 📋 News portal
- 📋 Classifieds marketplace
- 📋 Events calendar
- 📋 Service provider profiles

### Phase 4 - Advanced Features
- 📋 AI chat assistant
- 📋 Mobile apps (Flutter)
- 📋 Payment integration
- 📋 Appointment booking
- 📋 Video consultation
- 📋 Digital wallet

### Phase 5 - Scale & Monetization
- 📋 Subscription tiers
- 📋 Advertisement system
- 📋 Affiliate program
- 📋 Referral system
- 📋 Loyalty points
- 📋 API marketplace

## 👥 Team Roles

- Product Owner
- Senior Software Architect
- Full Stack Engineers
- UI/UX Designer
- DevOps Engineer
- QA Engineers
- Content Manager
- Community Manager

## 📞 Support

- **Email**: support@helloomansheba.com
- **WhatsApp**: +968 1234 5678
- **Emergency**: 9999 (Oman)
- **Embassy**: 8007 (Bangladesh Embassy)

## 📄 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

Built with modern best practices inspired by:
- Google's Material Design
- Vercel's design system
- Linear's UI excellence
- Airbnb's architecture
- Stripe's developer experience
- Notion's user experience

---

**Built with ❤️ for the Bangladeshi community in Oman**

🇧🇩 Made for Bangladesh | 🇴🇲 Serving Oman
