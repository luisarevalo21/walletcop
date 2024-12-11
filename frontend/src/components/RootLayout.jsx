import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={to => navigate(to)}
      routerReplace={to => navigate(to, { replace: true })}
      // signInFallbackRedirectUrl="/dashboard"
      // signUpFallbackRedirectUrl="/dashboard"
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}

// <>
//   <header className="header">
//     <Navbar />
//   </header>
//   <main>
//     <Outlet />
//   </main>
// </>
