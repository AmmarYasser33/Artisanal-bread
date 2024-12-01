import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return children;
  } else {
    toast.error("Please login to access this page");
    return <Navigate to={"/login"} />;
  }
}
