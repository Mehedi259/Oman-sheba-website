#!/bin/bash

echo "🚀 Hello Oman Sheba - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please update it with your configuration."
else
    echo "✅ .env.local already exists"
fi

# Check if Docker is running
if command -v docker &> /dev/null && docker info &> /dev/null; then
    echo ""
    echo "🐳 Docker is running. Starting services..."
    docker-compose up -d postgres redis meilisearch
    echo "✅ Database services started"
    
    # Wait for PostgreSQL to be ready
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
    
    # Generate Prisma Client
    echo ""
    echo "🔨 Generating Prisma Client..."
    pnpm db:generate
    
    # Run migrations
    echo ""
    echo "🗄️  Running database migrations..."
    pnpm db:migrate
    
    # Seed database
    echo ""
    echo "🌱 Seeding database..."
    pnpm db:seed
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🎉 You can now run:"
    echo "   pnpm dev"
    echo ""
    echo "📊 To open Prisma Studio:"
    echo "   pnpm db:studio"
else
    echo ""
    echo "⚠️  Docker is not running. Please start Docker and run setup again."
    echo "   Or set up PostgreSQL, Redis, and Meilisearch manually."
fi
