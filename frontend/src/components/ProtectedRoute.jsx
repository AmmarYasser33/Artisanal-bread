import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return children;
  } else {
    toast.error(t("auth.login"));
    return <Navigate to={"/login"} />;
  }
}
