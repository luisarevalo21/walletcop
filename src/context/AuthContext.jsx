import React, { createContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const api = useAxiosWithAuth();
  const [curUser, setCurUser] = useState(null);

  // Function to handle sign-in with Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        console.error("Error during sign-in:", error);
      }
    } catch (error) {
      console.error("Error during Google sign-in flow:", error);
    }
  };

  // Function to log out the user
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error during logout:", error);
    }
    setCurUser(null);
  };

  // Function to send user data to the backend
  const sendUserToBackend = async user => {
    try {
      const response = await api.post("/auth/callback");
      if (response.status === 200) {
        setCurUser(response.data);
        // navigate("/dashboard"); // Uncomment this if needed
      }
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  // Effect to track authentication state changes
  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      const user = sessionData?.session?.user || null;
      if (user) {
        setCurUser(user);
        await sendUserToBackend(user); // Call backend when session is fetched
      }
    };

    // Subscribe to auth state changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // console.log("Session event:", event);
        setCurUser(session.user);
      } else {
        setCurUser(null);
      }
    });

    // Initial session fetch
    fetchSession();

    // Cleanup subscription on unmount
    // return () => {
    //   subscription?.unsubscribe();
    // };
  }, []);

  return (
    <AuthContext.Provider value={{ curUser, signInWithGoogle, sendUserToBackend, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
