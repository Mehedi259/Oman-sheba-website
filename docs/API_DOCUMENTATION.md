# API Documentation

## Overview

Hello Oman Sheba uses a hybrid API approach:
- **tRPC** for type-safe internal APIs
- **REST** for webhooks and external integrations

Base URL: `https://api.helloomansheba.com` (Production)
Base URL: `http://localhost:3000/api` (Development)

## Authentication

### JWT Token Authentication

All authenticated requests require a Bearer token:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

**POST** `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Refreshing Token

**POST** `/api/auth/refresh`

```json
{
  "refreshToken": "your_refresh_token"
}
```

## API Endpoints

### Jobs API

#### List Jobs

**GET** `/api/jobs`

Query Parameters:
- `page` (number, default: 1)
- `limit` (number, default: 10, max: 100)
- `category` (string, optional)
- `city` (string, optional)
- `type` (enum, optional): FULL_TIME, PART_TIME, CONTRACT
- `search` (string, optional)
- `sortBy` (string, optional): createdAt, salary, title
- `order` (string, optional): asc, desc

Response:
```json
{
  "jobs": [
    {
      "id": "job_id",
      "title": "Software Engineer",
      "titleBn": "সফটওয়্যার ইঞ্জিনিয়ার",
      "slug": "software-engineer-tech-solutions",
      "company": {
        "id": "company_id",
        "name": "Tech Solutions",
        "logo": "https://...",
        "verified": true
      },
      "category": {
        "id": "cat_id",
        "name": "Engineering",
        "nameBn": "প্রকৌশল"
      },
      "type": "FULL_TIME",
      "city": "Muscat",
      "salaryMin": 800,
      "salaryMax": 1200,
      "salaryCurrency": "OMR",
      "featured": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

#### Get Job Details

**GET** `/api/jobs/:id`

Response:
```json
{
  "id": "job_id",
  "title": "Software Engineer",
  "titleBn": "সফটওয়্যার ইঞ্জিনিয়ার",
  "slug": "software-engineer",
  "description": "Full job description...",
  "descriptionBn": "সম্পূর্ণ চাকরির বিবরণ...",
  "company": {
    "id": "company_id",
    "name": "Tech Solutions",
    "nameBn": "টেক সলিউশনস",
    "logo": "https://...",
    "description": "Company description...",
    "verified": true
  },
  "category": {
    "id": "cat_id",
    "name": "Engineering",
    "nameBn": "প্রকৌশল"
  },
  "type": "FULL_TIME",
  "experience": "3-5 years",
  "education": "Bachelor in Computer Science",
  "vacancy": 2,
  "city": "Muscat",
  "area": "Ruwi",
  "salaryMin": 800,
  "salaryMax": 1200,
  "salaryCurrency": "OMR",
  "skills": ["JavaScript", "React", "Node.js"],
  "benefits": ["Health Insurance", "Paid Leave"],
  "applicationDeadline": "2024-12-31T23:59:59Z",
  "applicationEmail": "hr@techsolutions.om",
  "status": "PUBLISHED",
  "featured": true,
  "views": 150,
  "createdAt": "2024-01-01T00:00:00Z",
  "publishedAt": "2024-01-01T00:00:00Z"
}
```

#### Create Job (Authenticated - Recruiter)

**POST** `/api/jobs`

Request:
```json
{
  "title": "Software Engineer",
  "titleBn": "সফটওয়্যার ইঞ্জিনিয়ার",
  "description": "Job description...",
  "descriptionBn": "চাকরির বিবরণ...",
  "companyId": "company_id",
  "categoryId": "category_id",
  "type": "FULL_TIME",
  "experience": "3-5 years",
  "education": "Bachelor degree",
  "vacancy": 2,
  "city": "Muscat",
  "area": "Ruwi",
  "salaryMin": 800,
  "salaryMax": 1200,
  "salaryCurrency": "OMR",
  "skills": ["JavaScript", "React"],
  "benefits": ["Health Insurance"],
  "applicationEmail": "hr@company.com"
}
```

Response: Created job object

#### Apply to Job (Authenticated)

**POST** `/api/jobs/:id/apply`

Request:
```json
{
  "coverLetter": "I am interested in this position...",
  "cvUrl": "https://storage.../cv.pdf"
}
```

Response:
```json
{
  "id": "application_id",
  "jobId": "job_id",
  "userId": "user_id",
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Properties API

#### List Properties

**GET** `/api/properties`

Query Parameters:
- `page`, `limit`
- `type` (enum): RESIDENTIAL, COMMERCIAL, LAND
- `category` (enum): HOUSE, FLAT, ROOM, BED_SPACE, etc.
- `purpose` (enum): RENT, SALE, BOTH
- `city`, `area`
- `priceMin`, `priceMax`
- `bedrooms`, `bathrooms`
- `furnished` (enum): FURNISHED, SEMI_FURNISHED, UNFURNISHED

Response: Similar structure to jobs

#### Get Property Details

**GET** `/api/properties/:id`

Response: Complete property details with images, location, amenities

#### Create Property (Authenticated)

**POST** `/api/properties`

Request: Property creation payload

### Vehicles API

#### List Vehicles

**GET** `/api/vehicles`

Query Parameters:
- Standard pagination
- `type` (enum): CAR, MOTORCYCLE, TRUCK, etc.
- `make`, `model`, `year`
- `purpose` (enum): SALE, RENT
- `priceMin`, `priceMax`
- `condition` (enum)

#### Get Vehicle Details

**GET** `/api/vehicles/:id`

### Service Providers API

#### List Service Providers

**GET** `/api/service-providers`

Query Parameters:
- Pagination
- `categoryId`
- `city`, `area`
- `verified` (boolean)
- `rating` (min rating)

#### Get Provider Details

**GET** `/api/service-providers/:id`

#### Book Service (Authenticated)

**POST** `/api/service-providers/:id/book`

Request:
```json
{
  "serviceType": "Consultation",
  "date": "2024-01-15",
  "time": "10:00",
  "notes": "Additional information..."
}
```

### User API

#### Get Profile (Authenticated)

**GET** `/api/user/profile`

Response: User profile data

#### Update Profile (Authenticated)

**PUT** `/api/user/profile`

Request: Updated profile fields

#### Get Applications (Authenticated)

**GET** `/api/user/applications`

Response: List of job applications

#### Get Saved Items (Authenticated)

**GET** `/api/user/saved`

Query: `type` (jobs, properties, vehicles)

### Community API

#### Forum Posts

**GET** `/api/forum/posts`

Query: `categoryId`, pagination, sorting

**POST** `/api/forum/posts` (Authenticated)

**GET** `/api/forum/posts/:id`

**POST** `/api/forum/posts/:id/comments` (Authenticated)

#### Classifieds

**GET** `/api/classifieds`

**POST** `/api/classifieds` (Authenticated)

**GET** `/api/classifieds/:id`

### Search API

#### Global Search

**GET** `/api/search`

Query Parameters:
- `q` (string, required): Search query
- `type` (array, optional): Filter by types (jobs, properties, vehicles, services)
- `limit` (number, default: 20)

Response:
```json
{
  "results": [
    {
      "type": "job",
      "id": "job_id",
      "title": "Software Engineer",
      "highlight": "Highlighted matching text...",
      "url": "/jobs/software-engineer",
      "image": "https://..."
    },
    {
      "type": "property",
      "id": "prop_id",
      "title": "2BHK Flat in Ruwi",
      "highlight": "...",
      "url": "/properties/...",
      "image": "https://..."
    }
  ],
  "total": 45,
  "query": "engineer"
}
```

### Admin API

All admin endpoints require `ADMIN` or `SUPER_ADMIN` role.

#### Users Management

**GET** `/api/admin/users`

**GET** `/api/admin/users/:id`

**PUT** `/api/admin/users/:id`

**DELETE** `/api/admin/users/:id`

#### Content Moderation

**GET** `/api/admin/jobs` (All jobs including pending)

**PUT** `/api/admin/jobs/:id/approve`

**PUT** `/api/admin/jobs/:id/reject`

Similar endpoints for properties, vehicles, service providers

#### Analytics

**GET** `/api/admin/analytics/overview`

Response:
```json
{
  "users": {
    "total": 10000,
    "active": 5000,
    "new": 150
  },
  "jobs": {
    "total": 500,
    "active": 300,
    "applications": 2000
  },
  "properties": {
    "total": 300,
    "active": 200
  },
  "revenue": {
    "total": 50000,
    "monthly": 5000
  }
}
```

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Field-specific errors"
    }
  }
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

- **Unauthenticated**: 100 requests per 15 minutes
- **Authenticated**: 500 requests per 15 minutes
- **Premium**: 2000 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 450
X-RateLimit-Reset: 1640000000
```

## Pagination

All list endpoints support pagination:

Query Parameters:
- `page` (number, default: 1)
- `limit` (number, default: 10, max: 100)

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Webhooks

### Stripe Webhook

**POST** `/api/webhooks/stripe`

Handles Stripe payment events.

### SMS Webhook

**POST** `/api/webhooks/sms`

Handles SMS delivery status.

## SDKs and Libraries

### JavaScript/TypeScript

```typescript
import { createClient } from '@hello-oman-sheba/client'

const client = createClient({
  baseUrl: 'https://api.helloomansheba.com',
  apiKey: 'your_api_key',
})

// Get jobs
const jobs = await client.jobs.list({
  city: 'Muscat',
  category: 'engineering',
})

// Apply to job
await client.jobs.apply(jobId, {
  coverLetter: '...',
  cvUrl: '...',
})
```

## Testing

### Test Environment

Base URL: `https://api-staging.helloomansheba.com`

### Test Credentials

```
Email: test@example.com
Password: Test@123
```

### Postman Collection

Download: [Postman Collection](https://api.helloomansheba.com/docs/postman.json)

## Support

- Documentation: https://docs.helloomansheba.com
- API Status: https://status.helloomansheba.com
- Contact: api@helloomansheba.com
