import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
}
