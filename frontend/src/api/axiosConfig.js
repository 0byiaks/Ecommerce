import axios from "axios";

// Production API configuration - Hardcoded for production
const API_URL = "https://ecommerce-backend-kwkg.onrender.com/api";
console.log("🔗 API URL:", API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL, // backend URL - Hardcoded for production
});

// Add JWT token automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
