# Deployment Guide

## Prerequisites

Before deploying Hello Oman Sheba, ensure you have:

- Node.js 20+ and pnpm installed
- PostgreSQL 16+ database
- Redis 7+
- Domain name configured
- SSL certificate
- Email service account (Resend/SendGrid)
- SMS service account (Twilio) - optional
- Cloud storage (Cloudflare R2 / AWS S3)
- Google Maps API key

## Environment Setup

### 1. Copy Environment Variables

```bash
cp .env.example .env.local
```

### 2. Configure Required Variables

```bash
# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# Redis
REDIS_URL=redis://host:6379
REDIS_PASSWORD=your_redis_password

# Authentication
AUTH_SECRET=generate-a-secure-random-string-here
AUTH_URL=https://yourdomain.com

# Email
EMAIL_FROM=noreply@yourdomain.com
RESEND_API_KEY=your_resend_api_key

# Storage
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET_NAME=your_bucket_name
CLOUDFLARE_PUBLIC_URL=https://pub-xxx.r2.dev

# Search
MEILISEARCH_HOST=https://your-meilisearch-host.com
MEILISEARCH_MASTER_KEY=your_master_key

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

## Deployment Options

### Option 1: Vercel (Recommended for Quick Start)

#### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

#### Step 2: Link Project

```bash
vercel link
```

#### Step 3: Set Environment Variables

```bash
# Set each environment variable
vercel env add DATABASE_URL production
vercel env add REDIS_URL production
# ... add all required variables
```

#### Step 4: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (automatic deployment)
git push origin main
```

#### Database Setup on Vercel

```bash
# Run migrations
vercel env pull .env.production
pnpm db:migrate:prod
pnpm db:seed
```

### Option 2: Docker Deployment

#### Step 1: Build Docker Image

```bash
docker build -f docker/Dockerfile.prod -t hello-oman-sheba:latest .
```

#### Step 2: Run with Docker Compose

```bash
# Production setup
docker-compose -f docker-compose.prod.yml up -d
```

#### Step 3: Run Migrations

```bash
docker-compose exec web pnpm db:migrate:prod
docker-compose exec web pnpm db:seed
```

### Option 3: VPS Deployment (DigitalOcean, Linode, AWS EC2)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Redis
sudo apt install redis-server -y
```

#### Step 2: Clone Repository

```bash
cd /var/www
git clone https://github.com/your-org/hello-oman-sheba.git
cd hello-oman-sheba
```

#### Step 3: Install Dependencies

```bash
pnpm install --frozen-lockfile
```

#### Step 4: Build Application

```bash
pnpm build
```

#### Step 5: Setup Database

```bash
# Create database
sudo -u postgres psql
CREATE DATABASE hello_oman_sheba;
CREATE USER oman_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE hello_oman_sheba TO oman_user;
\q

# Run migrations
pnpm db:migrate:prod
pnpm db:seed
```

#### Step 6: Configure PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'hello-oman-sheba',
      script: 'apps/web/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
```

Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 7: Configure Nginx

Create `/etc/nginx/sites-available/hello-oman-sheba`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Images caching
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

Enable site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/hello-oman-sheba /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 8: SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

#### Step 9: Setup Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Database Hosting Options

### Option 1: Supabase (Easiest)

1. Create account at supabase.com
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` in environment variables

### Option 2: Neon (Serverless PostgreSQL)

1. Create account at neon.tech
2. Create database
3. Copy connection string
4. Update environment variables

### Option 3: AWS RDS

1. Create RDS PostgreSQL instance
2. Configure security groups
3. Note connection details
4. Update environment variables

### Option 4: Self-Hosted PostgreSQL

Already covered in VPS deployment section above.

## Meilisearch Deployment

### Option 1: Meilisearch Cloud

1. Sign up at meilisearch.com
2. Create new instance
3. Copy host and master key
4. Update environment variables

### Option 2: Self-Hosted

```bash
# Install Meilisearch
curl -L https://install.meilisearch.com | sh

# Run as service
sudo systemctl enable meilisearch
sudo systemctl start meilisearch
```

## Redis Deployment

### Option 1: Upstash (Serverless)

1. Create account at upstash.com
2. Create Redis database
3. Copy connection URL
4. Update environment variables

### Option 2: Redis Cloud

1. Sign up at redis.com
2. Create database
3. Copy connection details
4. Update environment variables

### Option 3: Self-Hosted

Already covered in VPS deployment section.

## File Storage Setup

### Cloudflare R2

1. Create Cloudflare account
2. Create R2 bucket
3. Generate API tokens
4. Configure CORS:

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

### AWS S3

1. Create S3 bucket
2. Configure bucket policy
3. Create IAM user with S3 access
4. Generate access keys
5. Update environment variables

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Build application
        run: pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Post-Deployment Checklist

### 1. Verify Application

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Search functionality works
- [ ] User registration works
- [ ] Email notifications work
- [ ] File uploads work
- [ ] Database connections are stable

### 2. Performance Check

- [ ] Run Lighthouse audit (target 95+ score)
- [ ] Check Core Web Vitals
- [ ] Test page load times
- [ ] Verify CDN is working
- [ ] Check image optimization

### 3. Security Check

- [ ] SSL certificate is valid
- [ ] Security headers are set
- [ ] Rate limiting is active
- [ ] Environment variables are secure
- [ ] Database backups are configured
- [ ] Monitoring is active

### 4. SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Verify ownership
- [ ] Add robots.txt
- [ ] Configure analytics
- [ ] Set up Google Business Profile

## Monitoring & Maintenance

### Setup Monitoring

**Sentry (Error Tracking):**
```bash
npm install @sentry/nextjs
```

**Uptime Monitoring:**
- UptimeRobot
- Pingdom
- Better Uptime

**Performance Monitoring:**
- Vercel Analytics
- Google Lighthouse CI

### Regular Maintenance

**Daily:**
- Monitor error logs
- Check server health
- Review user feedback

**Weekly:**
- Review analytics
- Update content
- Moderate user-generated content

**Monthly:**
- Update dependencies
- Review security patches
- Database optimization
- Backup verification

**Quarterly:**
- Performance audit
- Security audit
- User survey
- Feature planning

## Backup Strategy

### Database Backups

```bash
# Automated daily backup
0 2 * * * pg_dump hello_oman_sheba > /backups/db_$(date +\%Y\%m\%d).sql

# Retention: Keep 30 days
find /backups -name "db_*.sql" -mtime +30 -delete
```

### File Backups

Configure automatic backups in your storage provider (R2, S3).

## Rollback Procedure

If deployment fails:

```bash
# Vercel
vercel rollback

# PM2
pm2 list  # Note the ID
pm2 restart [id]  # Restart if needed

# Docker
docker-compose down
docker-compose up -d
```

## Scaling

### Horizontal Scaling

**Load Balancer Setup:**
- Use Nginx or Cloudflare Load Balancer
- Add more application servers
- Database read replicas

### Vertical Scaling

**Upgrade Resources:**
- Increase server CPU/RAM
- Upgrade database instance
- Increase Redis memory

## Troubleshooting

### Common Issues

**Issue: Database connection timeout**
- Check DATABASE_URL
- Verify network connectivity
- Check connection pool settings

**Issue: 502 Bad Gateway**
- Verify application is running
- Check PM2/Docker logs
- Verify Nginx configuration

**Issue: Slow page loads**
- Enable Redis caching
- Optimize database queries
- Check CDN configuration

**Issue: Email not sending**
- Verify email service credentials
- Check spam folder
- Review email logs

## Support

For deployment support:
- Email: devops@helloomansheba.com
- Documentation: https://docs.helloomansheba.com
- Discord: https://discord.gg/helloomansheba
