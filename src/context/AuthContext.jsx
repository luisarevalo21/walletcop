import React, { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";
import { useAxiosWithAuth } from "../api/useAxiosWithAuth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const api = useAxiosWithAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [curUser, setCurUser] = useState(null);
  // Function to handle sign-in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/categories",
        },
      });
      if (error) {
        console.error("Error during sign-in:", error);
      }
    } catch (error) {
      console.error("Error during Google sign-in flow:", error);
    }
    setLoading(false);
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
        setLoading(false);
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
      const user = sessionData?.user || null;
      if (user) {
        try {
          const response = await api.post("/auth/callback");
          if (response.status === 200) {
            setCurUser(response.data); // Save to state
            setLoading(false);
          }
        } catch (err) {
          console.error("Error fetching user from backend:", err);
        }
      }
    };
    initializeUser();

    //   // Subscribe to session changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log("cur user", curUser);
      if (session) {
        const user = session?.user;

        // console.log("user", user);
        if (!curUser && !user) {
          console.log("send to backend called");
        } else {
          sendUserToBackend();
          console.log("cur user inside of auth xcontext", curUser);
        }
      } else {
        navigate("/");
        // setCurUser("test");
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
  // useEffect(() => {
  //   const initializeUser = async () => {
  //     console.log("initializing user");
  //     const { data: sessionData, error } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error("Error fetching session:", error);
  //       return;
  //     }
  // const user = sessionData?.session?.user || null;
  //   if (user) {
  //     try {
  //       const response = await api.post("/auth/callback", user);
  //       if (response.status === 200) {
  //         setCurUser(response.data); // Save to state
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user from backend:", err);
  //     }
  //   }
  // };

  //   initializeUser();

  return <AuthContext.Provider value={{ curUser, signInWithGoogle, sendUserToBackend, logout, loading }}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext };
