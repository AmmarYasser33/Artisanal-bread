import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import { saveIsLoginState } from "../Store/userInfo-actions";
import { profileActions } from "../Store/profileInfo-slice";
import { cartActions } from "../Store/cartCounter-slice";
import { useMutation } from "@tanstack/react-query";
import { updateMe, updatePassword } from "../util/Http";
import Spinner from "../components/Spinner";

export default function UserProfile() {
  const user = useSelector((state) => state.profileInfo.data);
  const token = useSelector((state) => state.userInfo.token);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate: updateUser, isPending: isUpdateUserPending } = useMutation({
    mutationFn: (formData) => updateMe(token, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess(t("user.profile.info.update.success"));
      } else {
        notifyError(
          data?.response?.data?.message || t("user.profile.info.update.error"),
        );
      }
    },
    onError: () => {
      notifyError(t("user.profile.info.update.error"));
    },
  });

  const {
    register: registerData,
    reset: resetData,
    handleSubmit: handleDataSubmit,
    formState: { errors: dataErrors },
  } = useForm();
  const onSubmitData = (data) => {
    updateUser(data);
  };

  useEffect(() => {
    resetData({
      firstName: user?.firstName,
      lastName: user?.lastName || "",
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user, resetData]);

  const { mutate: updateUserPassword, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: (formData) => updatePassword(token, formData),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess(t("user.profile.passwords.update.success"));

          localStorage.removeItem("userData");
          dispatch(userActions.setRole(""));
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          dispatch(userActions.setIsLogin(false));
          dispatch(saveIsLoginState(false));
          dispatch(profileActions.setProfileInfo(null));
          dispatch(cartActions.setCounter(0));

          navigate("/login");
        } else {
          notifyError(
            data?.response?.data?.message ||
              t("user.profile.passwords.update.error"),
          );
        }
      },
      onError: () => {
        notifyError(t("user.profile.passwords.update.error"));
      },
    });

  const {
    register: registerPassword,
    watch: watchPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();
  const onSubmitPassword = (data) => {
    updateUserPassword(data);
  };

  return (
    <div className="space-y-10 sm:px-6 lg:col-span-9 lg:px-0">
      <form onSubmit={handleDataSubmit(onSubmitData)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              {t("user.profile.info.heading")}
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.info.fname")}
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  {...registerData("firstName", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {dataErrors.firstName && (
                  <span className="text-sm text-red-600">
                    {t("validation.name")}
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.info.lname")}
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  {...registerData("lastName")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.info.email")}
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  {...registerData("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {dataErrors.email && (
                  <span className="text-sm text-red-600">
                    {t("validation.email")}
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.info.phone")}
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  {...registerData("phone", {
                    required: true,
                    pattern: /^(010|011|012|015)\d{8}$/,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {dataErrors.phone && (
                  <span className="text-sm text-red-600">
                    {t("validation.phone")}
                  </span>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="delivery-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.info.address")}
                </label>
                <input
                  type="text"
                  name="delivery-address"
                  id="delivery-address"
                  autoComplete="delivery-address"
                  {...registerData("address", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {dataErrors.address && (
                  <span className="text-sm text-red-600">
                    {t("validation.address")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 ltr:text-right rtl:text-left">
            <button
              type="submit"
              disabled={isUpdateUserPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateUserPending ? (
                <Spinner size={5} />
              ) : (
                t("user.profile.btn.save")
              )}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              {t("user.profile.passwords.heading")}
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.passwords.current")}
                </label>
                <input
                  type="password"
                  name="current-password"
                  id="current-password"
                  autoComplete="current-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("currentPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.currentPassword && (
                  <span className="text-sm text-red-600">
                    {t("validation.currentPassword")}
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.passwords.new")}
                </label>
                <input
                  type="password"
                  name="new-password"
                  id="new-password"
                  autoComplete="new-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("newPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.newPassword?.type === "required" && (
                  <span className="text-sm text-red-600">
                    {t("validation.password.required")}
                  </span>
                )}
                {passwordErrors.newPassword?.type === "minLength" && (
                  <span className="text-sm text-red-600">
                    {t("validation.password.min")}
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="confirm-new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("user.profile.passwords.confirm")}
                </label>
                <input
                  type="password"
                  name="confirm-new-password"
                  id="confirm-new-password"
                  autoComplete="confirm-new-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("passwordConfirm", {
                    required: true,
                    validate: (value) => value === watchPassword("newPassword"),
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.passwordConfirm?.type === "required" && (
                  <span className="text-sm text-red-600">
                    {t("validation.password.confirm")}
                  </span>
                )}
                {passwordErrors.passwordConfirm?.type === "validate" && (
                  <span className="text-sm text-red-600">
                    {t("validation.password.match")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 ltr:text-right rtl:text-left">
            <button
              type="submit"
              disabled={isUpdatePasswordPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatePasswordPending ? (
                <Spinner size={5} />
              ) : (
                t("user.profile.btn.save")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
