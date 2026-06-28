import { NextResponse } from 'next/server';
import { getJobs } from '@hello-oman-sheba/database/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters = {
    city: searchParams.get('city') || undefined,
    type: searchParams.get('type') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
  };
  
  const jobs = getJobs(filters);
  
  return NextResponse.json({
    success: true,
    data: jobs,
    count: jobs.length,
  });
}
