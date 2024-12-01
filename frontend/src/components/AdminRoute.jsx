import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminRoute({ children }) {
  const role = JSON.parse(localStorage.getItem("role"));

  if (role === "admin") {
    return children;
  } else {
    toast.dismiss();
    toast.error("Not authorized to access this page");
    return <Navigate to={"/login"} />;
  }
}
