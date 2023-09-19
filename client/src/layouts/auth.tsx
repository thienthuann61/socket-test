import { Navigate, Outlet } from "react-router-dom";
import { useMemo } from "react";

const Auth = () => {
  const token = useMemo(() => localStorage.getItem("socket-test-token"), []);

  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-layout d-flex justify-content-center align-items-center min-vh-100">
      <Outlet />
    </div>
  );
};

export default Auth;
