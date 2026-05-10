import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem("mentoraUser");

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // LOGGED IN
  return children;
}