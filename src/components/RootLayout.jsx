import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
