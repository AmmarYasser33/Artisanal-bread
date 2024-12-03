import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import { saveIsLoginState } from "../Store/userInfo-actions";
import { profileActions } from "../Store/profileInfo-slice";
import { cartActions } from "../Store/cartCounter-slice";
import { updateMe, updatePassword } from "../util/Http";

export default function AdminSettings() {
  const user = useSelector((state) => state.profileInfo.data);
  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate: updateUser, isPending: isUpdateUserPending } = useMutation({
    mutationFn: (formData) => updateMe(token, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Email updated successfully");
      } else {
        notifyError(
          data?.response?.data?.message || "Email update failed! Try again",
        );
      }
    },
    onError: () => {
      notifyError("Email update failed!");
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
      email: user?.email,
    });
  }, [user, resetData]);

  const { mutate: updateUserPassword, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: (formData) => updatePassword(token, formData),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess("Password updated successfully");

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
              "Password update failed! Try again",
          );
        }
      },
      onError: () => {
        notifyError("Password update failed!");
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
              Login Info.
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
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
                    Please enter a valid email address
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateUserPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateUserPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Passwords
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
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
                    Please enter your right current password
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
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
                    New password is required
                  </span>
                )}
                {passwordErrors.newPassword?.type === "minLength" && (
                  <span className="text-sm text-red-600">
                    Password must be at least 6 characters long
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="confirm-new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
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
                    Password confirm is required
                  </span>
                )}
                {passwordErrors.passwordConfirm?.type === "validate" && (
                  <span className="text-sm text-red-600">
                    Passwords do not match
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdatePasswordPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatePasswordPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
