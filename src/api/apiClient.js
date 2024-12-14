// apiClient.js

import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
