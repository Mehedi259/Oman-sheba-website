# Database Schema Documentation

## Overview

The Hello Oman Sheba database is designed using PostgreSQL with Prisma ORM. The schema supports a complete digital service platform with the following core modules:

## Entity Relationship Diagram

```
Users (Authentication & Profiles)
  ├── Accounts (OAuth providers)
  ├── Sessions
  ├── Job Applications
  ├── Saved Jobs
  ├── Properties (Owner)
  ├── Vehicles (Owner)
  ├── Reviews
  ├── Messages
  ├── Notifications
  ├── Favorites
  ├── Bookings
  ├── Forum Posts
  ├── Forum Comments
  └── Classifieds

Jobs
  ├── Company
  ├── Job Category
  ├── Applications
  └── Saved By Users

Companies
  ├── Jobs
  └── Reviews

Properties
  ├── Owner (User)
  └── Favorites

Vehicles
  ├── Owner (User)
  └── Status

Service Providers
  ├── Service Category
  ├── Reviews
  └── Bookings

Forum
  ├── Forum Posts
  │   ├── Author (User)
  │   ├── Category
  │   └── Comments
  └── Forum Comments
      ├── Author (User)
      └── Parent Comment (Nested)

Articles (News/Blog/Pages)
  └── Article Category

Classifieds
  ├── Owner (User)
  └── Category
```

## Core Tables

### Users & Authentication
- **users**: User profiles and authentication
- **accounts**: OAuth provider accounts
- **sessions**: Active user sessions
- **verification_tokens**: Email/phone verification

### Job Portal
- **jobs**: Job listings
- **job_categories**: Job categories (hierarchical)
- **companies**: Employer profiles
- **job_applications**: Application tracking
- **saved_jobs**: User bookmarked jobs

### Property Listings
- **properties**: Real estate listings (rent/sale)
- Supports: Houses, Flats, Rooms, Bed Spaces, Commercial
- Includes: Location data, amenities, media

### Vehicles
- **vehicles**: Vehicle marketplace (buy/sell/rent)
- Includes: Car details, condition, price, media

### Service Directory
- **service_providers**: Business/service provider profiles
- **service_categories**: Service categories (hierarchical)
- **bookings**: Service appointments
- **reviews**: Ratings and reviews

### Community
- **forum_posts**: Community discussions
- **forum_comments**: Nested comments
- **forum_categories**: Discussion categories

### Classifieds
- **classifieds**: Buy/sell marketplace
- **classified_categories**: Product categories

### Content Management
- **articles**: News, blog posts, pages, guides
- **article_categories**: Content categories
- Supports multiple content types

### Emergency Services
- **emergency_contacts**: Quick access emergency numbers

### Messaging & Notifications
- **messages**: Private messaging
- **notifications**: User notifications

### Marketing & Monetization
- **advertisements**: Ad management
- Track impressions and clicks

### System & Analytics
- **page_views**: Analytics tracking
- **settings**: System configuration
- **audit_logs**: Action tracking

## Key Features

### 1. Multilingual Support
- All content tables have both English and Bengali fields
- Example: `title` and `titleBn`, `description` and `descriptionBn`
- Supports future expansion to Arabic

### 2. Hierarchical Categories
- Job categories and service categories support parent-child relationships
- Allows for nested category structures

### 3. Polymorphic Relationships
- Reviews can be attached to multiple entity types (companies, service providers)
- Favorites support multiple favoritable types
- Flexible and extensible

### 4. Status Management
- Jobs: DRAFT, PUBLISHED, CLOSED, EXPIRED
- Listings: DRAFT, PUBLISHED, EXPIRED, SOLD, REMOVED
- Applications: PENDING, REVIEWING, SHORTLISTED, etc.
- Service Providers: PENDING, APPROVED, REJECTED, SUSPENDED

### 5. Verification System
- Companies can be verified
- Service providers require approval
- Properties and vehicles can be verified

### 6. SEO Optimization
- All major content types include:
  - Unique slugs
  - Meta titles and descriptions
  - Structured for search engines

### 7. Audit & Analytics
- Page view tracking
- Audit logs for admin actions
- Statistics on listings (views, clicks, etc.)

## Indexes

Strategic indexes are placed on:
- Foreign keys
- Slug fields (for URL lookups)
- Status fields (for filtering)
- Location fields (city, area)
- User references
- Timestamps (for sorting)

## Data Types

- **String**: Text fields (names, titles, etc.)
- **Text (@db.Text)**: Long content (descriptions, articles)
- **Int**: Numbers (prices, counts, ratings)
- **Float**: Decimal numbers (coordinates, prices)
- **Boolean**: True/false flags
- **DateTime**: Timestamps
- **Json**: Structured data (business hours, settings)
- **String[]**: Arrays (tags, amenities, images)
- **Enum**: Predefined options (status, type, etc.)

## Best Practices Implemented

1. **Soft Deletes**: Consider using status fields instead of hard deletes
2. **Timestamps**: All tables have createdAt and updatedAt
3. **Unique Constraints**: Prevent duplicates (emails, slugs, etc.)
4. **Cascading**: Proper cascade rules for deletions
5. **Defaults**: Sensible default values
6. **Normalization**: Proper data normalization
7. **Relations**: Clear and efficient relationships

## Migration Strategy

```bash
# Generate Prisma Client
pnpm db:generate

# Create migration
pnpm db:migrate

# Apply in production
pnpm db:migrate:prod

# Reset database (dev only)
pnpm db:reset

# Open Prisma Studio
pnpm db:studio
```

## Future Enhancements

- Payment transactions table
- Subscription plans
- Wallet/credits system
- Chat messages (real-time)
- Video consultation bookings
- Educational courses
- Event management
- Referral system
- Loyalty points
