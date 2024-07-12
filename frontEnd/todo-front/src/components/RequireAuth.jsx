import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

export default function RequireAuth() {
  // const { auth } = useAuth();
  // const location = useLocation();

  // console.log("require auth", auth);

  // return auth?.token ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/signup" state={{ from: location }} replace />
  // );

  const { auth } = useAuth();

  if (auth?.token) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
