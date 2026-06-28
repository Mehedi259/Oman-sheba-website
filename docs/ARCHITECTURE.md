# System Architecture

## Overview

Hello Oman Sheba is built using a modern, scalable, microservice-inspired architecture with a monorepo structure. The system is designed to handle high traffic, provide excellent performance, and scale horizontally.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  Web Browser │ Mobile App │ Progressive Web App (PWA)       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                          CDN LAYER                           │
│            Cloudflare (Static Assets, Images)                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │  Admin       │  │   Socket.io  │      │
│  │   Frontend   │  │  Dashboard   │  │   Server     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  Next.js App Router + React Server Components                │
│  tRPC API Routes + REST API Endpoints                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                           │
│                                                               │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────────┐     │
│  │  Auth   │ │  Jobs   │ │ Property │ │   Payment   │     │
│  │ Service │ │ Service │ │ Service  │ │   Service   │     │
│  └─────────┘ └─────────┘ └──────────┘ └─────────────┘     │
│                                                               │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐    │
│  │ Vehicle │ │ Services │ │ Messaging│ │ Notification│    │
│  │ Service │ │ Service  │ │ Service  │ │  Service    │    │
│  └─────────┘ └──────────┘ └──────────┘ └─────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│                                                               │
│  ┌──────────────┐  ┌────────────┐  ┌──────────────┐        │
│  │  PostgreSQL  │  │   Redis    │  │ Meilisearch  │        │
│  │  (Primary)   │  │  (Cache)   │  │  (Search)    │        │
│  └──────────────┘  └────────────┘  └──────────────┘        │
│                                                               │
│  ┌──────────────┐  ┌────────────┐                           │
│  │ Cloudflare   │  │   Logs     │                           │
│  │ R2 (Storage) │  │  Database  │                           │
│  └──────────────┘  └────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│                                                               │
│  Auth Providers │ Payment Gateways │ Email/SMS │ Maps API   │
│  Google, FB     │ Stripe, SSL      │ Twilio    │ Google Maps│
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Architecture

**Framework: Next.js 15 with App Router**
- Server Components for optimal performance
- Client Components for interactivity
- Streaming and Suspense for progressive loading
- Middleware for auth and localization

**State Management:**
- React Query (TanStack Query) for server state
- React Context for global UI state
- URL state for filters and pagination
- Local storage for user preferences

**Styling:**
- Tailwind CSS for utility-first styling
- Shadcn UI for component primitives
- CSS Modules for component-specific styles
- Framer Motion for animations

**Form Handling:**
- React Hook Form for form state
- Zod for schema validation
- Type-safe form inputs
- Error handling and display

### Backend Architecture

**API Layer: tRPC + REST**
- tRPC for type-safe internal APIs
- REST endpoints for webhooks and external integrations
- API versioning (v1, v2, etc.)
- Request validation with Zod
- Rate limiting per endpoint

**Authentication:**
- Better Auth / Auth.js
- JWT tokens (short-lived)
- Refresh tokens (long-lived)
- Role-based access control (RBAC)
- Permission-based authorization
- OAuth 2.0 providers

**Business Logic:**
- Service layer pattern
- Repository pattern for data access
- Domain-driven design principles
- Clean architecture separation

### Database Architecture

**Primary Database: PostgreSQL**
- Relational data model
- ACID compliance
- JSON fields for flexible data
- Full-text search (pg_trgm)
- Partitioning for large tables
- Replication for read scaling

**ORM: Prisma**
- Type-safe database access
- Migration management
- Schema-first design
- Connection pooling
- Query optimization

**Caching: Redis**
- Session storage
- Cache frequently accessed data
- Real-time features (pub/sub)
- Rate limiting counters
- Job queue (Bull/BullMQ)

**Search: Meilisearch**
- Fast full-text search
- Typo-tolerant
- Instant search results
- Faceted search
- Multilingual support

### File Storage

**Cloudflare R2 / AWS S3**
- Images (original + thumbnails)
- Documents (CVs, PDFs)
- Videos
- Backups
- Organized by entity type

**Image Processing:**
- Next.js Image optimization
- Sharp for server-side processing
- WebP/AVIF conversion
- Responsive image sizes
- Lazy loading

### Real-time Features

**Socket.io**
- Real-time messaging
- Live notifications
- Online presence
- Typing indicators
- Connection management

### Notification System

**Multi-Channel:**
- Email (Resend/SendGrid)
- SMS (Twilio)
- WhatsApp (Business API)
- Push Notifications (Firebase)
- In-app notifications

**Queue System:**
- Background job processing
- Scheduled notifications
- Retry mechanism
- Dead letter queue

## Security Architecture

### Authentication & Authorization

**Authentication Flow:**
1. User login (email/password or OAuth)
2. Server validates credentials
3. Generate access token (15 min) + refresh token (7 days)
4. Store refresh token in HTTP-only cookie
5. Access token in memory (client)
6. Auto-refresh on expiry

**Authorization:**
- Role-based access control (RBAC)
- Permission-based access
- Resource-level permissions
- API endpoint protection
- Route guards

### Security Measures

**Application Security:**
- CSRF protection
- XSS prevention (sanitization)
- SQL injection prevention (Prisma)
- Rate limiting (per IP, per user)
- Input validation (Zod)
- Output encoding
- Secure headers

**Data Security:**
- Encryption at rest (database)
- Encryption in transit (HTTPS)
- Password hashing (bcrypt/argon2)
- Sensitive data masking
- PII protection
- GDPR compliance

**File Upload Security:**
- File type validation
- File size limits
- Virus scanning
- Secure file names
- CDN signed URLs

## Performance Optimization

### Frontend Performance

**Code Optimization:**
- Code splitting
- Tree shaking
- Dynamic imports
- Bundle analysis
- Minimal dependencies

**Loading Strategies:**
- Critical CSS inlining
- Above-fold content priority
- Lazy loading images
- Prefetching (next/link)
- Preloading critical resources

**Rendering:**
- Server-side rendering (SSR)
- Static generation (SSG)
- Incremental static regeneration (ISR)
- Server components
- Streaming SSR

### Backend Performance

**Database Optimization:**
- Strategic indexing
- Query optimization
- Connection pooling
- Read replicas
- Query caching

**Caching Strategy:**
- Redis for session and cache
- API response caching
- Database query caching
- Static asset caching (CDN)
- Browser caching headers

**API Optimization:**
- GraphQL/tRPC batching
- Pagination (offset, cursor)
- Field selection
- N+1 query prevention
- Background jobs for heavy tasks

## Scalability

### Horizontal Scaling

**Application Servers:**
- Stateless application design
- Load balancer (Nginx/Cloudflare)
- Auto-scaling based on metrics
- Container orchestration (Docker/K8s)

**Database Scaling:**
- Read replicas
- Sharding (future)
- Connection pooling
- Query optimization

### Vertical Scaling

**Resource Optimization:**
- Efficient algorithms
- Memory management
- CPU optimization
- Database tuning

## Monitoring & Observability

### Application Monitoring

**Error Tracking:**
- Sentry for error monitoring
- Error rate alerts
- User impact tracking
- Stack traces

**Performance Monitoring:**
- Lighthouse CI
- Core Web Vitals
- API response times
- Database query performance

**Logging:**
- Structured logging (JSON)
- Log levels (debug, info, warn, error)
- Log aggregation
- Log retention policy

### Analytics

**User Analytics:**
- Google Analytics 4
- Microsoft Clarity
- User behavior tracking
- Conversion tracking

**Business Metrics:**
- Custom dashboards
- KPI tracking
- Revenue metrics
- User engagement

## Deployment Architecture

### Environments

1. **Development**: Local development
2. **Staging**: Pre-production testing
3. **Production**: Live environment

### CI/CD Pipeline

```
Code Push → GitHub
    ↓
Trigger GitHub Actions
    ↓
Run Tests (Unit, Integration, E2E)
    ↓
Build Docker Images
    ↓
Push to Registry
    ↓
Deploy to Environment
    ↓
Run Smoke Tests
    ↓
Health Checks
    ↓
Success/Rollback
```

### Infrastructure

**Hosting Options:**
- Vercel (Frontend + API Routes)
- Railway/Fly.io (Backend services)
- AWS (Full stack)
- DigitalOcean (VPS option)

**Database Hosting:**
- Supabase
- Neon
- AWS RDS
- DigitalOcean Managed Database

**Docker Setup:**
- Multi-stage builds
- Optimized images
- Docker Compose for local dev
- Kubernetes for production (optional)

## Backup & Disaster Recovery

### Backup Strategy

**Database Backups:**
- Daily automated backups
- Point-in-time recovery
- Geo-redundant storage
- Backup testing

**File Backups:**
- S3 versioning
- Cross-region replication
- 30-day retention

**Application State:**
- Redis persistence
- Configuration backups

### Disaster Recovery

**Recovery Time Objective (RTO): 1 hour**
**Recovery Point Objective (RPO): 15 minutes**

**Recovery Plan:**
1. Detect incident
2. Assess impact
3. Activate backup
4. Restore services
5. Verify functionality
6. Post-mortem analysis

## Future Architecture Considerations

### Microservices Migration
- API Gateway
- Service mesh
- Event-driven architecture
- Message queue (RabbitMQ/Kafka)

### Global Distribution
- Multi-region deployment
- Edge computing
- Global CDN
- Regional databases

### Advanced Features
- Machine learning integration
- Real-time analytics
- Video streaming
- GraphQL Federation
