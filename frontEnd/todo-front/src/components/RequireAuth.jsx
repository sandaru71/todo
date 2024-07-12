import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

export default function RequireAuth() {
  const { auth } = useAuth();

  if (auth?.token) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
