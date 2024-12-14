import axios from "axios";
import { useAuth } from "@clerk/clerk-react"; // Adjust this path as needed

// Create a custom hook for an Axios instance with Clerk authentication
export const useAxiosWithAuth = () => {
  const { getToken } = useAuth();
  console.log("REACT_APP_API_BASE_URL", import.meta.env.REACT_APP_API_BASE_URL);

  const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  });

  //may cause overhead as get token is called everytime
  // Set up an Axios request interceptor
  api.interceptors.request.use(
    async config => {
      // Retrieve the token from Clerk
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return api;
};
