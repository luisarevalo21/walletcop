import axios from "axios";
import supabase from "../supabaseClient";
export const useAxiosWithAuth = () => {
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  //may cause overhead as get token is called everytime
  // Set up an Axios request interceptor
  api.interceptors.request.use(
    async config => {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return api;
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};
export const logout = async () => {
  await supabase.auth.signOut();
};
