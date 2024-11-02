import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Navbar from "./Navbar";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    // <ClerkProvider
    //   // routerPush={to => navigate(to)}
    //   // routerReplace={to => navigate(to, { replace: true })}
    //   publishableKey={PUBLISHABLE_KEY}
    //   signInForceRedirectUrl="/dashboard"
    // >
    <>
      <header className="header">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
    // </ClerkProvider>
  );
}
