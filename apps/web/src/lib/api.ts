// API Client for fetching data

const getApiUrl = (endpoint: string) => {
  if (typeof window !== 'undefined') {
    // If endpoint is /news, /emergency, /community, or /system, it's not under classifieds
    if (endpoint.startsWith('/news') || endpoint.startsWith('/emergency') || endpoint.startsWith('/community') || endpoint.startsWith('/system')) {
      return `/api/proxy${endpoint}`;
    }
    // Default to classifieds
    return `/api/proxy/classifieds${endpoint}`;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  if (endpoint.startsWith('/news') || endpoint.startsWith('/emergency') || endpoint.startsWith('/community') || endpoint.startsWith('/system')) {
    return `${baseUrl}/api${endpoint}`;
  }
  return `${baseUrl}/api/classifieds${endpoint}`;
};

import { tokenStorage } from './auth';

// Helper to get auth token
const getAuthToken = async () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return tokenStorage.getAccess();
  } else {
    // Server-side
    try {
      const { auth } = await import('@/auth');
      const session = await auth();
      return (session as any)?.accessToken || null;
    } catch (e) {
      return null;
    }
  }
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
  
  const token = await getAuthToken();
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
      // Return empty array/object to prevent whole page crash
      return [] as unknown as T;
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      
      // Check if it's a paginated response
      if (result && typeof result === 'object' && 'results' in result) {
        return result.results as T;
      }
      
      return result as T;
    } else {
      // If not JSON (e.g. 404 HTML page), return empty
      console.error('API Error: Non-JSON response received');
      return [] as unknown as T;
    }
  } catch (error) {
    console.warn(`Fetch to ${endpoint} failed.`, error);
    return [] as unknown as T;
  }
}

// Jobs API
export async function getJobs(filters?: { city?: string; type?: string; limit?: number; search?: string; sort?: string; page?: string }) {
  const params: Record<string, string> = {};
  if (filters?.city) params.city = filters.city;
  if (filters?.type) params.type = filters.type;
  if (filters?.limit) params.page_size = filters.limit.toString();
  if (filters?.search) params.search = filters.search;
  if (filters?.sort) params.ordering = filters.sort;
  if (filters?.page) params.page = filters.page;
  return fetchApi<any>('/jobs/', params);
}

export async function getFeaturedJobs(limit = 6) {
  return fetchApi<any[]>('/jobs/', { page_size: limit.toString() }, { cache: 'no-store' });
}

// Properties API
export async function getProperties(filters?: { city?: string; purpose?: string; limit?: number; search?: string; sort?: string; page?: string }) {
  const params: Record<string, string> = {};
  if (filters?.city) params.city = filters.city;
  if (filters?.purpose) params.purpose = filters.purpose;
  if (filters?.limit) params.page_size = filters.limit.toString();
  if (filters?.search) params.search = filters.search;
  if (filters?.sort) params.ordering = filters.sort;
  if (filters?.page) params.page = filters.page;
  return fetchApi<any>('/properties/', params);
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
  return fetchApi<any>('/vehicles/', params);
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
  
  return fetchApi<any>('/news', params);
}

export async function getFeaturedNews(limit = 4) {
  return fetchApi<any[]>('/news/articles/', { page_size: limit.toString() }, { cache: 'no-store' });
}

// Hero Sliders API
export async function getHeroSliders() {
  return fetchApi<any[]>('/system/sliders/', {}, { cache: 'no-store' });
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

export async function getServiceById(id: string) {
  return fetchApi<any>(`/service-providers/${id}/`, {}, { cache: 'no-store' });
}

export async function getCommunityPosts(filters?: { limit?: number; search?: string; category?: string; sort?: string; page?: string }) {
  const params: Record<string, string> = {};
  if (filters?.limit) params.page_size = filters.limit.toString();
  if (filters?.search) params.search = filters.search;
  if (filters?.category) params.category = filters.category;
  if (filters?.sort) params.ordering = filters.sort;
  if (filters?.page) params.page = filters.page;
  return fetchApi<any>('/community/forum/posts/', params);
}

export async function getForumCategories() {
  return fetchApi<any[]>('/community/forum/categories/');
}

export async function getForumComments(postId: string | number) {
  return fetchApi<any[]>(`/community/forum/posts/${postId}/comments/`);
}

export async function createForumComment(postId: string | number, content: string) {
  return fetchApi<any>(`/community/forum/posts/${postId}/comments/`, {}, {
    method: 'POST',
    body: JSON.stringify({ content })
  });
}

export async function likeForumPost(postId: string | number) {
  return fetchApi<any>(`/community/forum/posts/${postId}/like/`, {}, {
    method: 'POST'
  });
}

export async function getFeaturedForumPosts(limit = 3) {
  return fetchApi<any[]>('/community/forum/posts/', { page_size: limit.toString() }, { cache: 'no-store' });
}

export async function getFeaturedCommunityPosts(limit = 3) {
  return fetchApi<any[]>('/community/posts/', { page_size: limit.toString() }, { cache: 'no-store' });
}

export async function getClassifieds(filters?: { limit?: number; search?: string; category?: string; sort?: string }) {
  const params: Record<string, string> = {};
  if (filters?.limit) params.page_size = filters.limit.toString();
  if (filters?.search) params.search = filters.search;
  if (filters?.category) params.category = filters.category;
  if (filters?.sort) params.ordering = filters.sort;
  
  return fetchApi<any>('/community/classifieds/', params);
}

export async function getFeaturedClassifieds(limit = 4) {
  return fetchApi<any[]>('/community/classifieds/', { page_size: limit.toString() }, { cache: 'no-store' });
}

export async function getNewsById(id: string) {
  return fetchApi<any>(`/news/${id}/`, {}, { cache: 'no-store' });
}

export async function getCommunityPostById(id: string) {
  return fetchApi<any>(`/community/posts/${id}/`, {}, { cache: 'no-store' });
}

export async function getClassifiedById(id: string) {
  return fetchApi<any>(`/community/classifieds/${id}/`, {}, { cache: 'no-store' });
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

export async function createService(data: any) {
  return fetchApi<any>('/services/', {}, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createCommunityPost(formData: FormData) {
  const COMMUNITY_BASE = typeof window !== 'undefined'
    ? '/api/proxy/community'
    : (process.env.NEXT_PUBLIC_BACKEND_URL 
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/community`
      : 'http://localhost:8000/api/community');
  
  const token = await getAuthToken();
  const response = await fetch(`${COMMUNITY_BASE}/forum/posts/`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // No Content-Type header so browser sets multipart/form-data with boundary
    },
    body: formData,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create post: ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}

export async function createClassified(data: any) {
  // Classifieds go through community API
  const COMMUNITY_BASE = typeof window !== 'undefined'
    ? '/api/proxy/community'
    : (process.env.NEXT_PUBLIC_BACKEND_URL 
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/community`
      : 'http://localhost:8000/api/community');
  
  const token = await getAuthToken();
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
  const apiUrl = getApiUrl('/images');
  const url = typeof window !== 'undefined' && apiUrl.startsWith('/') 
    ? new URL(apiUrl, window.location.origin)
    : new URL(apiUrl);
    
  const formData = new FormData();
  formData.append('image', file);
  formData.append('content_type', contentType);
  formData.append('content_id', contentId.toString());
  formData.append('is_primary', isPrimary.toString());

  const token = await getAuthToken();
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
