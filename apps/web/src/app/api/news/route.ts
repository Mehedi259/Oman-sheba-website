import { NextResponse } from 'next/server';
import { getNews } from '@hello-oman-sheba/database/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters = {
    type: searchParams.get('type') || undefined,
    featured: searchParams.get('featured') === 'true' ? true : undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
  };
  
  const news = getNews(filters);
  
  return NextResponse.json({
    success: true,
    data: news,
    count: news.length,
  });
}
