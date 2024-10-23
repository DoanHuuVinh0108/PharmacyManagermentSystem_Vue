import store from '@/store';  // Adjust path based on your project structure
import axios from 'axios';
import Vue from 'vue';

// Attach the access token to every request if available
axios.interceptors.request.use(
  (config) => {
    const accessToken = Vue.$cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors by logging out the user if the access token has expired
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, log out the user
      store.dispatch('logout');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axios;
