import { NextResponse } from 'next/server';
import { getEmergencyContacts } from '@hello-oman-sheba/database/mock-data';

export async function GET() {
  const contacts = getEmergencyContacts();
  
  return NextResponse.json({
    success: true,
    data: contacts,
    count: contacts.length,
  });
}
