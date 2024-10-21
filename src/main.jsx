import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RootLayout from "./components/RootLayout.jsx";
import CardDetails from "./components/Card/CardDetails.jsx";
import Wallet from "./pages/WalletPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/account", element: <SignUpPage /> },
      { path: "/card/:id", element: <CardDetails /> },
      { path: "/wallet", element: <Wallet /> },
      { path: "/favorites", element: <FavoritesPage /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
