import { Navigate } from "react-router-dom";

// `children` is the component you want to protect
export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // or any flag you set on login

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}
