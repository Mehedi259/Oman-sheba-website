# Development Guide

## Getting Started

### Prerequisites

- Node.js 20+ ([download](https://nodejs.org))
- pnpm 8+ (`npm install -g pnpm`)
- PostgreSQL 16+ ([download](https://postgresql.org/download))
- Redis 7+ ([download](https://redis.io/download))
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/hello-oman-sheba.git
cd hello-oman-sheba

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

### Database Setup

```bash
# Start PostgreSQL and Redis (if using Docker)
docker-compose up -d postgres redis meilisearch

# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (optional - database GUI)
pnpm db:studio
```

### Development Server

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

## Project Structure

```
hello-oman-sheba/
├── apps/
│   ├── web/                    # Main Next.js application
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   │   ├── (auth)/    # Auth routes group
│   │   │   │   ├── (dashboard)/ # Dashboard routes
│   │   │   │   ├── jobs/      # Job portal pages
│   │   │   │   ├── properties/ # Property pages
│   │   │   │   ├── api/       # API routes
│   │   │   │   └── layout.tsx
│   │   │   ├── components/    # React components
│   │   │   │   ├── ui/        # Shadcn UI components
│   │   │   │   ├── layout/    # Layout components
│   │   │   │   ├── home/      # Homepage sections
│   │   │   │   └── forms/     # Form components
│   │   │   ├── lib/           # Utility functions
│   │   │   │   ├── api/       # API client
│   │   │   │   ├── utils.ts   # Helper functions
│   │   │   │   └── hooks.ts   # Custom hooks
│   │   │   ├── styles/        # Global styles
│   │   │   └── types/         # TypeScript types
│   │   ├── public/            # Static assets
│   │   ├── package.json
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── admin/                  # Admin dashboard (future)
│
├── packages/
│   ├── database/              # Prisma schema and client
│   │   ├── schema.prisma     # Database schema
│   │   ├── seed.ts           # Seed script
│   │   └── index.ts
│   ├── ui/                    # Shared UI components
│   ├── auth/                  # Authentication logic
│   ├── config/                # Shared configuration
│   └── types/                 # Shared TypeScript types
│
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DEVELOPMENT_GUIDE.md
│   └── IMPLEMENTATION_ROADMAP.md
│
├── docker/                     # Docker configurations
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── scripts/                    # Utility scripts
│
├── .github/                    # GitHub configurations
│   └── workflows/             # CI/CD workflows
│
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # Workspace configuration
├── turbo.json                 # Turborepo configuration
├── docker-compose.yml         # Docker Compose setup
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## Development Workflow

### 1. Creating New Features

#### Step 1: Create Feature Branch

```bash
git checkout -b feature/job-alerts
```

#### Step 2: Database Changes

If your feature requires database changes:

```bash
# Edit schema.prisma
nano packages/database/schema.prisma

# Create migration
pnpm db:migrate

# Generate Prisma Client
pnpm db:generate
```

#### Step 3: Implement Feature

Create necessary files:
- Pages in `apps/web/src/app/`
- Components in `apps/web/src/components/`
- API routes in `apps/web/src/app/api/`
- Types in `apps/web/src/types/`

#### Step 4: Test Locally

```bash
pnpm dev
```

#### Step 5: Commit Changes

```bash
git add .
git commit -m "feat: add job alerts functionality"
git push origin feature/job-alerts
```

#### Step 6: Create Pull Request

Create PR on GitHub for review.

### 2. Working with Database

#### Prisma Studio (GUI)

```bash
pnpm db:studio
# Opens at http://localhost:5555
```

#### Creating Migrations

```bash
# After editing schema.prisma
pnpm db:migrate

# Name your migration descriptively
# Example: "add_job_alerts_table"
```

#### Resetting Database (Development Only)

```bash
pnpm db:reset
# This will:
# 1. Drop database
# 2. Create database
# 3. Run migrations
# 4. Run seed
```

#### Seeding Data

Edit `packages/database/seed.ts` to add seed data:

```typescript
async function main() {
  // Create categories
  await prisma.jobCategory.createMany({
    data: [
      { name: 'Engineering', nameBn: 'প্রকৌশল', slug: 'engineering' },
      // Add more...
    ]
  })
}
```

Run seed:
```bash
pnpm db:seed
```

### 3. Creating Components

#### UI Components (Shadcn)

```bash
# Add new Shadcn component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

#### Custom Components

Create in `apps/web/src/components/`:

```typescript
// apps/web/src/components/job-card.tsx
import { Card } from '@/components/ui/card'

interface JobCardProps {
  title: string
  company: string
  location: string
}

export function JobCard({ title, company, location }: JobCardProps) {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
    </Card>
  )
}
```

### 4. API Development

#### tRPC Procedures

Create procedures in `apps/web/src/server/trpc/routers/`:

```typescript
// apps/web/src/server/trpc/routers/jobs.ts
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '@hello-oman-sheba/database'

export const jobsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input
      
      const jobs = await prisma.job.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          company: true,
          category: true,
        },
      })
      
      let nextCursor: string | undefined = undefined
      if (jobs.length > limit) {
        const nextItem = jobs.pop()
        nextCursor = nextItem!.id
      }
      
      return {
        jobs,
        nextCursor,
      }
    }),
    
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const job = await prisma.job.findUnique({
        where: { id: input },
        include: {
          company: true,
          category: true,
        },
      })
      
      if (!job) {
        throw new Error('Job not found')
      }
      
      return job
    }),
})
```

#### REST API Routes

For webhooks or external integrations:

```typescript
// apps/web/src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
    
    return NextResponse.json({ received: true })
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    )
  }
}
```

### 5. State Management

#### Server State (React Query)

```typescript
// apps/web/src/hooks/use-jobs.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.jobs.getAll(),
  })
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => api.jobs.getById(id),
    enabled: !!id,
  })
}

export function useCreateJob() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateJobInput) => api.jobs.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
  })
}
```

Usage in component:

```typescript
'use client'

import { useJobs } from '@/hooks/use-jobs'

export function JobList() {
  const { data, isLoading, error } = useJobs()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data?.jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  )
}
```

### 6. Form Handling

#### With React Hook Form + Zod

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const jobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  salary: z.number().min(0, 'Salary must be positive'),
})

type JobFormValues = z.infer<typeof jobSchema>

export function JobForm() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      salary: 0,
    },
  })
  
  async function onSubmit(data: JobFormValues) {
    try {
      await api.jobs.create(data)
      // Show success message
    } catch (error) {
      // Show error message
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
        <Button type="submit">Create Job</Button>
      </form>
    </Form>
  )
}
```

### 7. Authentication

Check user authentication:

```typescript
// apps/web/src/lib/auth.ts
import { auth } from '@/lib/auth-config'

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}
```

Usage in Server Component:

```typescript
import { requireAuth } from '@/lib/auth'

export default async function DashboardPage() {
  const user = await requireAuth()
  
  return <div>Welcome, {user.name}!</div>
}
```

Usage in Client Component:

```typescript
'use client'

import { useSession } from 'next-auth/react'

export function UserMenu() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <LoginButton />
  
  return <UserDropdown user={session.user} />
}
```

### 8. Internationalization

Create translation files:

```typescript
// apps/web/src/i18n/bn.ts
export const bn = {
  common: {
    home: 'হোম',
    jobs: 'চাকরি',
    properties: 'সম্পত্তি',
    vehicles: 'গাড়ি',
    search: 'অনুসন্ধান করুন',
  },
  jobs: {
    title: 'চাকরির তালিকা',
    apply: 'আবেদন করুন',
    save: 'সংরক্ষণ করুন',
  },
}

// apps/web/src/i18n/en.ts
export const en = {
  common: {
    home: 'Home',
    jobs: 'Jobs',
    properties: 'Properties',
    vehicles: 'Vehicles',
    search: 'Search',
  },
  jobs: {
    title: 'Job Listings',
    apply: 'Apply',
    save: 'Save',
  },
}
```

Use translations:

```typescript
import { useTranslation } from '@/hooks/use-translation'

export function JobCard() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h2>{t('jobs.title')}</h2>
      <button>{t('jobs.apply')}</button>
    </div>
  )
}
```

## Code Style & Best Practices

### TypeScript

- Use strict mode
- Define interfaces for all props
- Avoid `any` type
- Use type inference when possible
- Export types from dedicated files

### React Components

- Use functional components
- Prefer Server Components by default
- Add 'use client' only when needed
- Extract reusable logic into hooks
- Keep components small and focused

### Naming Conventions

- Components: PascalCase (e.g., `JobCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_URL`)
- Hooks: camelCase with 'use' prefix (e.g., `useJobs.ts`)

### File Organization

- Group by feature, not by type
- Colocate related files
- Use index.ts for exports
- Keep file size reasonable (<300 lines)

## Testing

### Unit Tests

```bash
pnpm test
```

Example test:

```typescript
// apps/web/src/lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../utils'

describe('formatCurrency', () => {
  it('formats OMR currency correctly', () => {
    expect(formatCurrency(100, 'OMR')).toBe('OMR 100.00')
  })
})
```

### E2E Tests

```bash
pnpm test:e2e
```

Example E2E test:

```typescript
// tests/e2e/jobs.spec.ts
import { test, expect } from '@playwright/test'

test('user can search for jobs', async ({ page }) => {
  await page.goto('/')
  await page.fill('[placeholder="Search jobs"]', 'engineer')
  await page.click('button[type="submit"]')
  
  await expect(page.locator('.job-card')).toHaveCount(10)
})
```

## Debugging

### Development Tools

- React DevTools
- Redux DevTools (if using Redux)
- React Query DevTools (included)
- Prisma Studio for database

### Logging

```typescript
// Use structured logging
console.log('[JobService]', 'Creating job', { jobId, userId })

// In production, use proper logging library
import { logger } from '@/lib/logger'
logger.info('Job created', { jobId, userId })
```

### Error Handling

```typescript
try {
  await createJob(data)
} catch (error) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      // Handle unique constraint violation
    }
  }
  throw error
}
```

## Performance Optimization

### Images

```typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
/>
```

### Code Splitting

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

### Caching

```typescript
// Server Component with revalidation
export const revalidate = 3600 // 1 hour

export default async function Page() {
  const data = await fetch('...', { next: { revalidate: 3600 } })
  return <div>{data}</div>
}
```

## Common Tasks

### Adding a New Page

```bash
# Create page file
touch apps/web/src/app/about/page.tsx

# Add content
```

```typescript
export default function AboutPage() {
  return <div>About Us</div>
}
```

### Adding a New API Route

```bash
# Create API route
touch apps/web/src/app/api/hello/route.ts
```

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello!' })
}
```

### Adding Environment Variable

1. Add to `.env.example`
2. Add to `.env.local`
3. Add to deployment platform
4. Reference in code: `process.env.MY_VAR`

## Git Workflow

### Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(jobs): add job alert functionality

- Add job alert modal
- Implement email notifications
- Add user preferences

Closes #123
```

### Branch Naming

- `feature/job-alerts`
- `fix/login-redirect`
- `docs/api-documentation`
- `refactor/auth-service`

## Troubleshooting

### Common Issues

**Issue: Prisma Client not found**
```bash
pnpm db:generate
```

**Issue: Port 3000 already in use**
```bash
lsof -ti:3000 | xargs kill -9
```

**Issue: Database connection error**
- Check `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

**Issue: Module not found**
```bash
pnpm install
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)

## Getting Help

- Check existing issues on GitHub
- Join our Discord community
- Email: dev@helloomansheba.com
- Documentation: https://docs.helloomansheba.com
