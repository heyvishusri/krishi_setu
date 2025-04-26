// krishi_setu/src/services/api.js
import axios from "axios";

// Define the base URL of your backend API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; // Use environment variable or default

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Interceptor to add Auth Token to requests ---
// This runs BEFORE each request is sent
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("authToken");
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; // Continue with the request configuration
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// --- Authentication API Calls ---
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const getMe = () => api.get("/auth/me"); // Token is added automatically by interceptor

// --- User Profile API Calls ---
export const updateUserProfile = (profileData) =>
  api.put("/users/profile", profileData); // Token added by interceptor

// --- Post API Calls (Add later) ---
// export const createPost = (postData) => api.post('/posts', postData);
// export const fetchPosts = (category) => api.get(`/posts?category=${category}`);

// --- Error Handling Helper (Optional) ---
// You might want a helper to extract meaningful error messages
export const getErrorMessage = (error) => {
  if (error.response) {
    // Request made and server responded
    if (error.response.data && error.response.data.message) {
      // Use the message from backend if available
      return error.response.data.message;
    }
    return `Error ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Network Error:", error.request);
    return "Network Error: Could not connect to server.";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error:", error.message);
    return error.message;
  }
};

export default api; // Export the configured instance if needed elsewhere
