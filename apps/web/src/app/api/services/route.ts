import { NextResponse } from 'next/server';
import { getServices } from '@hello-oman-sheba/database/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters = {
    city: searchParams.get('city') || undefined,
    category: searchParams.get('category') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
  };
  
  const services = getServices(filters);
  
  return NextResponse.json({
    success: true,
    data: services,
    count: services.length,
  });
}
