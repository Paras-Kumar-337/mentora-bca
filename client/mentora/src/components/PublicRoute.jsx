import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("userInfo");

  // USER ALREADY LOGGED IN
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}