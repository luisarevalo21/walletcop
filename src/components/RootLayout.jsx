import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProtectedRoute from "../pages/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext.jsx";

export default function RootLayout() {
  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}
