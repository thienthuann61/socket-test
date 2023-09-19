import { useMemo } from "react";
import Navbar from "../components/navbar";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const token = useMemo(() => localStorage.getItem("socket-test-token"), []);

  if (!token) {
    return <Navigate to={"auth/login"} />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="px-4 px-xxl-5 py-4 flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
