import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function RootLayout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
