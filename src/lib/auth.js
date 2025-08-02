import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'https://profile-routes-backend.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth headers
api.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const auth = {
  // Login function
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      // Check if cookies are set
      if (response.data) {
        // Store user data in localStorage if needed
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },

  // Signup function
  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout function
  async logout() {
    try {
      await api.post('/auth/logout');
      // Clear local storage
      localStorage.removeItem('user');
      // Clear any other auth state
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if logout fails
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  },

  // Get user profile
  async getUserProfile() {
    try {
      const response = await api.get('/profile/userProfile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(profileData) {
    try {
      const response = await api.patch('/profile/updateUserProfile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    
    // Check if we have user data in localStorage
    const user = localStorage.getItem('user');
    return !!user;
  },

  // Get current user
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default api;
