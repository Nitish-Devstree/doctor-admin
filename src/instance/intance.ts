import axios from 'axios';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { getAccessToken } from './getAccessToken';

// Create the instance first
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

// Then add interceptors
instance.interceptors.request.use(
  async (config) => {
    const session = await getAccessToken();
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    }
    return config;
  },
  async (error) => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/forget-password' &&
        window.location.pathname !== '/reset-password' &&
        (error.response?.statusCode === 401 ||
          error.response?.statusCode === 403)
      ) {
        await signOut({ redirect: false });
        window.localStorage.clear();
        toast.error('Someone logged in on another system');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== 'undefined') {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/forget-password' &&
        window.location.pathname !== '/reset-password' &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        await signOut({ redirect: false });
        window.localStorage.clear();
        toast.error('Someone logged in on another system');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Export the instance
export default instance;
