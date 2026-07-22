export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
  avatar: string | null;
  avatar_url: string | null;
  bio: string;
  city: string;
  auth_provider: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
  created: boolean;
}

const getAuthUrl = (endpoint: string) => {
  let clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!clean.endsWith('/')) {
    clean = `${clean}/`;
  }
  if (typeof window !== 'undefined') {
    return `/api/proxy${clean}`;
  }
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://188.245.212.240';
  return `${baseUrl}/api${clean}`;
};

export async function googleLogin(idToken: string): Promise<AuthResponse> {
  const response = await fetch(getAuthUrl('/users/auth/google/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_token: idToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Google login failed');
  }

  return response.json();
}

export async function getCurrentUser(accessToken: string): Promise<User> {
  const response = await fetch(getAuthUrl('/users/auth/me/'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}

// Token management in local storage
export const tokenStorage = {
  getAccess: () => typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  getRefresh: () => typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null,
  setTokens: (access: string, refresh: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
};
