// API Client for fetching data
import * as mockData from '@hello-oman-sheba/database/mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

async function fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }
  
  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown API error');
    }
    
    return result.data;
  } catch (error) {
    console.warn(`Fetch to ${endpoint} failed, falling back to local mock data.`, error);
    
    // Fallback based on endpoint using the same methods from mock-data
    if (endpoint === '/jobs') {
      const city = params?.city || undefined;
      const type = params?.type || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getJobs({ city, type, limit }) as unknown as T;
    }
    if (endpoint === '/properties') {
      const city = params?.city || undefined;
      const purpose = params?.purpose || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getProperties({ city, purpose, limit }) as unknown as T;
    }
    if (endpoint === '/vehicles') {
      const city = params?.city || undefined;
      const type = params?.type || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getVehicles({ city, type, limit }) as unknown as T;
    }
    if (endpoint === '/services') {
      const city = params?.city || undefined;
      const category = params?.category || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getServices({ city, category, limit }) as unknown as T;
    }
    if (endpoint === '/news') {
      const type = params?.type || undefined;
      const featured = params?.featured === 'true' ? true : params?.featured === 'false' ? false : undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getNews({ type, featured, limit }) as unknown as T;
    }
    if (endpoint === '/emergency') {
      return mockData.getEmergencyContacts() as unknown as T;
    }
    
    throw error;
  }
}

// Jobs API
export async function getJobs(filters?: { city?: string; type?: string; limit?: number }) {
  return fetchApi<any[]>('/jobs', filters as any);
}

export async function getFeaturedJobs(limit = 6) {
  return fetchApi<any[]>('/jobs', { limit: limit.toString() });
}

// Properties API
export async function getProperties(filters?: { city?: string; purpose?: string; limit?: number }) {
  return fetchApi<any[]>('/properties', filters as any);
}

export async function getFeaturedProperties(limit = 6) {
  return fetchApi<any[]>('/properties', { limit: limit.toString() });
}

// Vehicles API
export async function getVehicles(filters?: { city?: string; type?: string; limit?: number }) {
  return fetchApi<any[]>('/vehicles', filters as any);
}

export async function getFeaturedVehicles(limit = 6) {
  return fetchApi<any[]>('/vehicles', { limit: limit.toString() });
}

// Services API
export async function getServices(filters?: { city?: string; category?: string; limit?: number }) {
  return fetchApi<any[]>('/services', filters as any);
}

export async function getFeaturedServices(limit = 6) {
  return fetchApi<any[]>('/services', { limit: limit.toString() });
}

// News API
export async function getNews(filters?: { type?: string; featured?: boolean; limit?: number }) {
  const params: Record<string, string> = {};
  if (filters?.type) params.type = filters.type;
  if (filters?.featured !== undefined) params.featured = filters.featured.toString();
  if (filters?.limit) params.limit = filters.limit.toString();
  
  return fetchApi<any[]>('/news', params);
}

export async function getFeaturedNews(limit = 4) {
  return fetchApi<any[]>('/news', { featured: 'true', limit: limit.toString() });
}

// Emergency Contacts API
export async function getEmergencyContacts() {
  return fetchApi<any[]>('/emergency');
}
