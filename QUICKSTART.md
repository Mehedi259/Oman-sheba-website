# Quick Start Guide

Get Hello Oman Sheba running locally in 5 minutes!

## Prerequisites

- [Node.js 20+](https://nodejs.org/en/download/)
- [PostgreSQL 16+](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)

## Option 1: Quick Start with Docker (Recommended)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/hello-oman-sheba.git
cd hello-oman-sheba
```

### 2. Install dependencies

```bash
# Install pnpm globally
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Start services with Docker

```bash
# Start PostgreSQL, Redis, and Meilisearch
docker-compose up -d

# This will start:
# - PostgreSQL on port 5432
# - Redis on port 6379
# - Meilisearch on port 7700
```

### 4. Setup environment

```bash
# Copy environment file
cp .env.example .env.local

# The default values should work with Docker setup
```

### 5. Setup database

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed with sample data
pnpm db:seed
```

### 6. Start development server

```bash
pnpm dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000)** in your browser!

## Option 2: Manual Setup (Without Docker)

### 1. Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql-16
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Install Redis

**macOS (Homebrew):**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis-server
```

**Windows:**
Download from [redis.io/download](https://redis.io/download)

### 3. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE hello_oman_sheba;
CREATE USER oman_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE hello_oman_sheba TO oman_user;
\q
```

### 4. Clone and Install

```bash
# Clone repository
git clone https://github.com/your-org/hello-oman-sheba.git
cd hello-oman-sheba

# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install
```

### 5. Configure Environment

```bash
# Copy environment file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

Update these values:
```bash
DATABASE_URL="postgresql://oman_user:your_password@localhost:5432/hello_oman_sheba?schema=public"
REDIS_URL="redis://localhost:6379"
```

### 6. Setup Database

```bash
# Generate Prisma Client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed
```

### 7. Start Development Server

```bash
pnpm dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000)**

## Verify Installation

### Check Services

```bash
# Check if Next.js is running
curl http://localhost:3000

# Check if PostgreSQL is running
psql -U oman_user -d hello_oman_sheba -c "SELECT 1"

# Check if Redis is running
redis-cli ping
# Should return: PONG
```

### Open Prisma Studio (Database GUI)

```bash
pnpm db:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

## Default Credentials

After seeding, you can login with:

**Admin User:**
- Email: admin@helloomansheba.com
- Password: Admin@123

**Test User:**
- Email: user@test.com
- Password: User@123

**Test Recruiter:**
- Email: recruiter@test.com
- Password: Recruiter@123

## Next Steps

### 1. Explore the Application

- Homepage: http://localhost:3000
- Jobs: http://localhost:3000/jobs
- Properties: http://localhost:3000/properties
- Admin: http://localhost:3000/admin

### 2. Read Documentation

- [Development Guide](docs/DEVELOPMENT_GUIDE.md) - Learn how to develop features
- [Architecture](docs/ARCHITECTURE.md) - Understand the system design
- [Database Schema](docs/DATABASE_SCHEMA.md) - Explore the data model
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Deploy to production

### 3. Start Building

```bash
# Create a new feature branch
git checkout -b feature/my-awesome-feature

# Make your changes
# ...

# Run tests
pnpm test

# Run linting
pnpm lint

# Commit and push
git add .
git commit -m "feat: add my awesome feature"
git push origin feature/my-awesome-feature
```

## Common Issues

### Issue: Port 3000 already in use

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Issue: Database connection failed

```bash
# Check PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Test connection
psql $DATABASE_URL
```

### Issue: Prisma Client not found

```bash
# Regenerate Prisma Client
pnpm db:generate
```

### Issue: Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

## Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- GitLens
- Error Lens

### Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database (dev only)

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript check
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests

# Docker
docker-compose up -d  # Start services
docker-compose down   # Stop services
docker-compose logs -f # View logs
```

## Getting Help

- 📚 [Documentation](docs/)
- 💬 [Discord Community](https://discord.gg/helloomansheba)
- 🐛 [Report Issues](https://github.com/your-org/hello-oman-sheba/issues)
- 📧 [Email Support](mailto:dev@helloomansheba.com)

## What's Next?

Now that you're up and running:

1. **Explore the codebase** - Check out `apps/web/src/app/` for pages
2. **Read the docs** - Understand the architecture and patterns
3. **Create your first feature** - Follow the development guide
4. **Join the community** - Connect with other developers
5. **Contribute** - Submit pull requests and help improve the platform

Happy coding! 🚀

---

**Made with ❤️ for the Bangladeshi community in Oman**
