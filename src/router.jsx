// router.jsx (or where you define your router)
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WalletPage from "./pages/WalletPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import CardDetails from "./components/Card/CardDetails.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
// Wrap the root element with AuthProvider
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },

      {
        element: <ProtectedRoute />,
        path: "",
        children: [
          { path: "categories", element: <Dashboard /> },
          { path: "wallet", element: <WalletPage /> },
          { path: "favorites", element: <FavoritesPage /> },
          { path: "card/:id", element: <CardDetails /> },
          { path: "account", element: <AccountPage /> },
        ],
      },
    ],
  },
]);

export default router;
