# 🌟 Hello Oman Sheba

**বাংলাদেশী প্রবাসীদের জন্য ওমানের সবচেয়ে বড় ডিজিটাল সেবা প্ল্যাটফর্ম**

একটি সম্পূর্ণ enterprise-level, high-performance, fully responsive ওয়েব অ্যাপ্লিকেশন যা বাংলাদেশী প্রবাসীদের ওমানে সকল প্রয়োজনীয় সেবা এক জায়গায় প্রদান করে।

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## ✨ মূল বৈশিষ্ট্য

### 🎯 সম্পূর্ণ বাংলা ভাষায়
- ১০০% বাংলা UI/UX
- সম্পূর্ণ RTL support ready
- Multilingual capability (English & Arabic coming soon)

### 🚀 Core Modules

#### 1. চাকরি পোর্টাল (Job Portal)
- Job posting এবং searching
- Company profiles
- CV upload
- Job application tracking
- Recruiter dashboard

#### 2. প্রপার্টি (Property)
- House rent / Flat rent
- Room sharing / Bed space
- Buy & Sell properties
- Property details with maps
- Owner contact system

#### 3. গাড়ি (Vehicles)
- Buy / Sell / Rent vehicles
- Detailed specifications
- Insurance tracking
- Condition verification

#### 4. সেবা প্রদানকারী (Service Providers)
- Medical services
- Visa services
- Travel agencies
- Legal services
- Educational institutions
- Verified providers with ratings

#### 5. কমিউনিটি ফোরাম (Community Forum)
- Q&A discussions
- Category-based topics
- Trending discussions
- Community statistics

#### 6. ক্লাসিফাইড (Classifieds)
- Buy & Sell anything
- Electronics, Furniture, Clothing
- Negotiable pricing
- Condition badges

#### 7. সংবাদ (News)
- Latest Oman & Bangladesh news
- Embassy updates
- Visa news
- Job market news

#### 8. ইউজার ফিচার (User Features)
- User profiles
- Favorites list
- Notifications system
- Search functionality
- Post creation

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **State Management:** React Query (TanStack Query)

### Backend
- **API:** Next.js API Routes
- **Database ORM:** Prisma
- **Database:** PostgreSQL 16 (ready)
- **Caching:** Redis (ready)
- **Search:** Meilisearch (ready)

### DevOps
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel (configured)
- **Package Manager:** pnpm
- **Monorepo:** Turborepo

---

## 📁 Project Structure

```
hello-oman-sheba/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   │   ├── page.tsx           # Homepage
│       │   │   ├── jobs/              # Jobs module
│       │   │   ├── properties/        # Properties module
│       │   │   ├── vehicles/          # Vehicles module
│       │   │   ├── services/          # Services module
│       │   │   ├── community/         # Community forum
│       │   │   ├── classifieds/       # Classifieds
│       │   │   ├── news/              # News portal
│       │   │   ├── profile/           # User profile
│       │   │   ├── notifications/     # Notifications
│       │   │   ├── search/            # Search page
│       │   │   ├── favorites/         # Favorites
│       │   │   └── post/create/       # Post creation
│       │   ├── components/    # React components
│       │   │   ├── layout/           # Header, Footer
│       │   │   ├── home/             # Homepage sections
│       │   │   └── ui/               # Shadcn UI components
│       │   ├── lib/           # Utilities
│       │   └── styles/        # Global styles
│       └── public/            # Static assets
├── packages/
│   ├── database/              # Prisma schema & migrations
│   ├── ui/                    # Shared UI components
│   ├── auth/                  # Authentication (ready)
│   ├── config/                # Shared configuration
│   └── types/                 # TypeScript types
├── docker/                    # Docker configurations
└── .github/workflows/         # CI/CD pipelines
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ (LTS recommended)
- **pnpm** 8+ (`npm install -g pnpm`)
- **Docker** (optional, for database)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Mehedi259/Oman-sheba-website.git
cd Oman-sheba-website
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example apps/web/.env.local
```

4. **Start development server:**
```bash
pnpm dev
```

5. **Open browser:**
```
http://localhost:3000
```

---

## 🐳 Docker Setup (Optional)

### Start all services:
```bash
docker-compose up -d
```

### Run database migrations:
```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### Stop services:
```bash
docker-compose down
```

---

## 📊 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript check

# Database
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio

# Docker
pnpm docker:up        # Start Docker services
pnpm docker:down      # Stop Docker services
pnpm docker:logs      # View Docker logs
```

---

## 🌐 Pages & Routes

### Main Pages
- `/` - Homepage
- `/jobs` - Job listings
- `/properties` - Property listings
- `/vehicles` - Vehicle listings
- `/services` - Service providers

### Community & Content
- `/community` - Community forum
- `/classifieds` - Classified ads
- `/news` - News portal

### User Features
- `/profile` - User profile
- `/notifications` - Notifications
- `/favorites` - Saved items
- `/search` - Global search
- `/post/create` - Create new post

---

## 🎨 Design System

### Colors
- **Primary:** Blue (`#3B82F6`)
- **Secondary:** Purple (`#8B5CF6`)
- **Accent:** Green (`#10B981`)
- **Error:** Red (`#EF4444`)

### Typography
- **Font:** Noto Sans Bengali
- **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)

### Components
- Glassmorphism effects
- Soft shadows
- Rounded corners (8px, 12px)
- Smooth animations (200-300ms)
- Gradient backgrounds

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1280px

---

## 🔒 Environment Variables

```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hello_oman_sheba"

# Redis
REDIS_URL="redis://localhost:6379"

# Search
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_MASTER_KEY="your-master-key"

# Auth
AUTH_SECRET="your-secret-key"

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"
```

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build production image
docker build -f docker/Dockerfile.prod -t hello-oman-sheba .

# Run container
docker run -p 3000:3000 hello-oman-sheba
```

---

## 🤝 Contributing

This is a proprietary project. For contribution guidelines, please contact the project maintainers.

---

## 📄 License

**Proprietary License** - All rights reserved.

This software and associated documentation files are proprietary and confidential. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited.

---

## 👨‍💻 Team

- **Developer:** Hello Oman Sheba Team
- **GitHub:** [@Mehedi259](https://github.com/Mehedi259)
- **Repository:** [Oman-sheba-website](https://github.com/Mehedi259/Oman-sheba-website)

---

## 📞 Support

For support, questions, or feedback:
- **Website:** http://localhost:3000 (Development)
- **Repository Issues:** [GitHub Issues](https://github.com/Mehedi259/Oman-sheba-website/issues)

---

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Core pages and modules
- [x] Responsive UI/UX
- [x] Mock data integration
- [x] Navigation system

### Phase 2 (Next)
- [ ] Authentication system
- [ ] Database integration
- [ ] File upload system
- [ ] Real-time notifications

### Phase 3 (Future)
- [ ] Mobile apps (Flutter)
- [ ] Payment integration
- [ ] AI features
- [ ] Multi-language support

---

## ⚡ Performance

- **Lighthouse Score:** 95+ (Target)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Core Web Vitals:** Optimized

---

## 🙏 Acknowledgments

Built with modern technologies and best practices to serve the Bangladeshi expatriate community in Oman.

---

**Made with ❤️ for Bangladeshi expatriates in Oman**

**🌟 একসাথে গড়ি, উন্নত ওমান প্রবাসী জীবন! 🌟**
