import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminRoute({ children }) {
  const { t } = useTranslation();
  const role = JSON.parse(localStorage.getItem("role"));

  if (role === "admin") {
    return children;
  } else {
    toast.dismiss();
    toast.error(t("auth.error"));
    return <Navigate to={"/login"} />;
  }
}
