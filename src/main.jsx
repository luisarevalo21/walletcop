import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RootLayout from "./components/RootLayout.jsx";
import CardDetails from "./components/Card/CardDetails.jsx";
import Wallet from "./pages/WalletPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"} signInUrl="/dashboard">
      <App />
    </ClerkProvider>
  </StrictMode>
);
