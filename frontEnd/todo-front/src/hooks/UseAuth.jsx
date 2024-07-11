import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
