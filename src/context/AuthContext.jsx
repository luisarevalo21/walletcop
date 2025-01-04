import React, { createContext, useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const api = useAxiosWithAuth();
  const navigate = useNavigate();

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
      console.log("response", response);
      if (response.status === 200) {
        setCurUser(response.data);
        // navigate("/dashboard"); // Uncomment this if needed
      }
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };

  // Fetch session from Supabase on initial load
  useEffect(() => {
    const initializeUser = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      console.log("session data", sessionData);

      const user = sessionData?.session?.user || null;
      console.log("user in session data", user);

      if (user) {
        try {
          const response = await api.post("/auth/callback", user);
          if (response.status === 200) {
            setCurUser(response.data); // Save to state
          }
        } catch (err) {
          console.error("Error fetching user from backend:", err);
        }
      }
    };

    initializeUser();

    // Subscribe to session changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("session in authstate change", session);
      if (session) {
        const user = session?.user;
        if (!curUser && !user) {
          sendUserToBackend();
        }
        // setCurUser(session.user);
      } else {
        setCurUser("test");
      }

      if (event === "SIGNED_OUT") {
        navigate("/");
        console.log("uesr logged out");
      }
    });

    return () => {
      data.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ curUser, signInWithGoogle, sendUserToBackend, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
