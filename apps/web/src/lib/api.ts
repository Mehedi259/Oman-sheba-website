// API Client for fetching data
import * as mockData from '@hello-oman-sheba/database/mock-data';

const getApiUrl = (endpoint: string) => {
  if (typeof window !== 'undefined') {
    // If endpoint is /news or /emergency, it's not under classifieds
    if (endpoint.startsWith('/news') || endpoint.startsWith('/emergency')) {
      return `/api/proxy${endpoint}`;
    }
    // Default to classifieds
    return `/api/proxy/classifieds${endpoint}`;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  if (endpoint.startsWith('/news') || endpoint.startsWith('/emergency')) {
    return `${baseUrl}/api${endpoint}`;
  }
  return `${baseUrl}/api/classifieds${endpoint}`;
};

// Helper to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string, 
  params?: Record<string, string>,
  options?: RequestInit
): Promise<T> {
  const isClient = typeof window !== 'undefined';
  const apiUrl = getApiUrl(endpoint);
  
  // URL constructor requires a base if apiUrl is relative
  const url = isClient && apiUrl.startsWith('/') 
    ? new URL(apiUrl, window.location.origin)
    : new URL(apiUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }
  
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };
  
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers,
      signal: AbortSignal.timeout(10000), // 10 second timeout
    };

    if (!fetchOptions.cache && !fetchOptions.next) {
      fetchOptions.next = { revalidate: 60 }; // Cache for 60 seconds by default
    }

    const response = await fetch(url.toString(), fetchOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error ${response.status}:`, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    // Django REST Framework may return paginated response
    const result = await response.json();
    
    // Check if it's a paginated response
    if (result && typeof result === 'object' && 'results' in result) {
      return result.results as T;
    }
    
    return result as T;
  } catch (error) {
    console.warn(`Fetch to ${endpoint} failed.`, error);
    
    // Don't fallback to mock data for mutations
    if (options?.method && options.method !== 'GET') {
      throw error;
    }
    
    // Fallback based on endpoint using the same methods from mock-data
    if (endpoint === '/jobs' || endpoint === '/jobs/') {
      const city = params?.city || undefined;
      const type = params?.type || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getJobs({ city, type, limit }) as unknown as T;
    }
    if (endpoint === '/properties' || endpoint === '/properties/') {
      const city = params?.city || undefined;
      const purpose = params?.purpose || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getProperties({ city, purpose, limit }) as unknown as T;
    }
    if (endpoint === '/vehicles' || endpoint === '/vehicles/') {
      const city = params?.city || undefined;
      const type = params?.type || undefined;
      const limit = params?.limit ? parseInt(params.limit) : undefined;
      return mockData.getVehicles({ city, type, limit }) as unknown as T;
    }
    if (endpoint === '/services' || endpoint === '/service-providers/') {
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
  const params: Record<string, string> = {};
  if (filters?.city) params.city = filters.city;
  if (filters?.type) params.type = filters.type;
  if (filters?.limit) params.page_size = filters.limit.toString();
  return fetchApi<any[]>('/jobs/', params);
}

export async function getFeaturedJobs(limit = 6) {
  return fetchApi<any[]>('/jobs/', { page_size: limit.toString() }, { cache: 'no-store' });
}

// Properties API
export async function getProperties(filters?: { city?: string; purpose?: string; limit?: number }) {
  const params: Record<string, string> = {};
  if (filters?.city) params.city = filters.city;
  if (filters?.purpose) params.purpose = filters.purpose;
  if (filters?.limit) params.page_size = filters.limit.toString();
  return fetchApi<any[]>('/properties/', params);
}

export async function getFeaturedProperties(limit = 6) {
  return fetchApi<any[]>('/properties/', { page_size: limit.toString() }, { cache: 'no-store' });
}

// Vehicles API
export async function getVehicles(filters?: { city?: string; type?: string; limit?: number }) {
  const params: Record<string, string> = {};
  if (filters?.city) params.city = filters.city;
  if (filters?.type) params.type = filters.type;
  if (filters?.limit) params.page_size = filters.limit.toString();
  return fetchApi<any[]>('/vehicles/', params);
}

export async function getFeaturedVehicles(limit = 6) {
  return fetchApi<any[]>('/vehicles/', { page_size: limit.toString() }, { cache: 'no-store' });
}

// Services API
export async function getServices(filters?: { city?: string; category?: string; limit?: number }) {
  return fetchApi<any[]>('/services', filters as any);
}

export async function getFeaturedServices(limit = 6) {
  return fetchApi<any[]>('/services', { limit: limit.toString() }, { cache: 'no-store' });
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

// Single item APIs
export async function getJobById(id: string) {
  return fetchApi<any>(`/jobs/${id}/`, {}, { cache: 'no-store' });
}

export async function getPropertyById(id: string) {
  return fetchApi<any>(`/properties/${id}/`, {}, { cache: 'no-store' });
}

export async function getVehicleById(id: string) {
  return fetchApi<any>(`/vehicles/${id}/`, {}, { cache: 'no-store' });
}

export async function createJob(data: any) {
  return fetchApi<any>('/jobs/', {}, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createProperty(data: any) {
  return fetchApi<any>('/properties/', {}, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createVehicle(data: any) {
  return fetchApi<any>('/vehicles/', {}, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createClassified(data: any) {
  // Classifieds go through community API
  const COMMUNITY_BASE = typeof window !== 'undefined'
    ? '/api/proxy/community'
    : (process.env.NEXT_PUBLIC_BACKEND_URL 
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/community`
      : 'http://localhost:8000/api/community');
  
  const token = getAuthToken();
  const response = await fetch(`${COMMUNITY_BASE}/classifieds/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create classified: ${response.statusText}`);
  }
  
  return response.json();
}

export async function uploadClassifiedImage(file: File, contentType: string, contentId: number, isPrimary: boolean = false) {
  const apiUrl = getApiUrl('/images/');
  const url = typeof window !== 'undefined' && apiUrl.startsWith('/') 
    ? new URL(apiUrl, window.location.origin)
    : new URL(apiUrl);
    
  const formData = new FormData();
  formData.append('image', file);
  formData.append('content_type', contentType);
  formData.append('content_id', contentId.toString());
  formData.append('is_primary', isPrimary.toString());

  const token = getAuthToken();
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Do NOT set Content-Type header when sending FormData
      // The browser will automatically set it to multipart/form-data with the boundary
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  return response.json();
}
