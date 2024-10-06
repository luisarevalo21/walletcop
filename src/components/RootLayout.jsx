import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Navbar from "./Navbar";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <ClerkProvider
      // routerPush={to => navigate(to)}
      // routerReplace={to => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      signInForceRedirectUrl="/dashboard"
    >
      <header className="header">
        {location.pathname.startsWith("/card") ? null : <Navbar />}
        {/* <div>
          <div>
            <p>Clerk + React + React Router App</p>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/login">Sign In</Link>
          </SignedOut>
        </div> */}
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
