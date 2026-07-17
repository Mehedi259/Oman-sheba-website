const NEXT_PUBLIC_BACKEND_URL = 'http://188.245.212.240';
const endpoint = '/users/auth/google/';

const getAuthUrlServer = (endpoint) => {
  const baseUrl = NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  return `${baseUrl}/api${endpoint}`;
};

const getAuthUrlClient = (endpoint) => {
  return `/api/proxy${endpoint}`;
};

console.log("Server:", getAuthUrlServer(endpoint));
console.log("Client:", getAuthUrlClient(endpoint));
