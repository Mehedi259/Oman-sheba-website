import { NextResponse } from 'next/server';
import { getProperties } from '@hello-oman-sheba/database/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters = {
    city: searchParams.get('city') || undefined,
    purpose: searchParams.get('purpose') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
  };
  
  const properties = getProperties(filters);
  
  return NextResponse.json({
    success: true,
    data: properties,
    count: properties.length,
  });
}
