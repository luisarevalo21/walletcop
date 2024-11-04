import React from "react";
import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./components/RootLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CardDetails from "./components/Card/CardDetails";
import Wallet from "./pages/WalletPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./pages/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "*",
    element: <Root />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<SignUpPage />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}
