// apiClient.js

import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
