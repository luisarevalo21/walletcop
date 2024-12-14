import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RootLayout from "./components/RootLayout.jsx";
import CardDetails from "./components/Card/CardDetails.jsx";
import WalletPage from "./pages/WalletPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import AccountPage from "./pages/AccountPage.jsx";
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", index: true, element: <HomePage /> },

      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        element: <ProtectedRoute />,
        path: "",
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "wallet", element: <WalletPage /> },
          { path: "favorites", element: <FavoritesPage /> },
          { path: "card/:id", element: <CardDetails /> },
          { path: "account", element: <AccountPage /> },
        ],
      },
      // { element: <NotFound />, path: "*" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>
);
