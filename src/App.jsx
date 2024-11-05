import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import CardDetails from "./components/Card/CardDetails";
import Wallet from "./pages/WalletPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RootLayout from "./components/RootLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<SignUpPage />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
