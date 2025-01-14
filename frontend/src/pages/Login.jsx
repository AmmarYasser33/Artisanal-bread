import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import saveUserInfoIntoLocalStorage, {
  saveIsLoginState,
  saveRoleState,
  saveTokenState,
} from "../Store/userInfo-actions";
import { authFormsHandler } from "../util/Http";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);

  const notifySuccess = () => toast.success(t("login.success"));
  const notifyError = (msg) => toast.error(msg || t("notification.error"));

  useEffect(() => {
    if (isLogin && role === "user") {
      navigate("/");
    } else if (isLogin && role === "admin") {
      navigate("/admin");
    }
  }, [isLogin, navigate, role]);

  const { mutate, isPending } = useMutation({
    mutationFn: authFormsHandler,
    onSuccess: (response) => {
      let res = response.data;
      if (res.status === "success") {
        dispatch(userActions.setUserInfo(res.data?.user));
        dispatch(userActions.setIsLogin(true));

        dispatch(userActions.setToken(res.token));
        dispatch(saveUserInfoIntoLocalStorage(res.data?.user));
        dispatch(saveIsLoginState(true));

        dispatch(saveTokenState(res.token));

        if (res.data?.user?.role === "user") {
          dispatch(userActions.setRole("user"));
          dispatch(saveRoleState("user"));
          navigate("/");
        } else if (res.data?.user?.role === "admin") {
          dispatch(saveRoleState("admin"));
          dispatch(userActions.setRole("admin"));
          navigate(`/admin`);
        }

        notifySuccess();
      } else {
        notifyError(res.data?.message || t("login.error"));
      }
    },
    onError: (error) => {
      if (error.status === 401) {
        notifyError(t("login.invalid"));
      } else {
        notifyError();
      }
    },
  });

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutate({ type: "login", formData: data });
  };

  return (
    <>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="relative bg-primary-50 px-10 py-10 md:px-36 rtl:font-roboto">
        <div
          className="absolute left-0 top-0 h-full w-2/3 bg-primary-800"
          style={{ clipPath: "polygon(0 0, 100% 0, 10% 100%, 0% 100%)" }}
        ></div>

        <div className="flex min-h-[33rem] overflow-hidden rounded-lg shadow-xl">
          <div className="hidden w-0 flex-1 lg:block">
            <img
              className="inset-0 h-full w-full scale-x-[-1] object-cover"
              src="/illustration-4.jpg"
              alt=""
            />
          </div>
          <div className="z-30 flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <Link
                  to="/"
                  className="flex items-center justify-center space-x-1 drop-shadow-2xl rtl:space-x-reverse"
                >
                  <img
                    src="/baker.png"
                    className="h-7"
                    alt="Artisanal bread logo"
                  />
                  <span className="self-center whitespace-nowrap font-sans text-xl font-bold italic text-primary-500">
                    Artisanal bread
                  </span>
                </Link>
                {/* <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-primary-600.svg"
                  alt="Workflow"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-bold text-secondary-800">
                  {t("login.heading")}
                </h2>
              </div>

              <div className="mt-8 font-roboto">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t("input.email")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                          {...register("email", {
                            required: true,
                            pattern: /\S+@\S+\.\S+/,
                          })}
                        />
                        {errors.email && (
                          <span className="text-sm text-red-600">
                            {t("validation.email")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t("input.password")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                        />
                        {errors.password && (
                          <span className="text-sm text-red-600">
                            {t("validation.currentPassword")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-1 flex items-center justify-end">
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          {t("login.forgot")}
                        </Link>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isPending ? (
                          <Spinner size={5} />
                        ) : (
                          t("login.btn.login")
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {t("login.noAccount")}{" "}
                      <Link
                        to="/signup"
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {t("login.register")}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
