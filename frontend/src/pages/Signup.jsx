import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authFormsHandler } from "../util/Http";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);

  const notifySuccess = () => toast.success(t("signup.success"));
  const notifyError = (msg) => toast.error(msg || t("signup.error"));

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
      if (response.data.status === "success") {
        notifySuccess();
        navigate("/login");
      } else {
        notifyError(
          response?.data?.response?.data?.message || t("signup.error"),
        );
      }
    },
    onError(error) {
      if (error.data.message.split(" ")[0] === "Duplicate") {
        notifyError(t("signup.invalid"));
      } else {
        notifyError();
      }
    },
  });

  const {
    register,
    // reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    mutate({ type: "signup", formData: data });
  };

  return (
    <>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="relative min-h-[95vh] bg-[var(--color-primary-50)] px-10 py-10 md:px-36">
        <div
          className="absolute left-0 top-0 h-full w-2/3 bg-[var(--color-primary-800)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 10% 100%, 0% 100%)" }}
        ></div>

        <div className="flex min-h-[33rem] overflow-hidden rounded-lg shadow-xl">
          <div className="z-30 hidden w-0 flex-1 bg-[var(--color-primary-50)] lg:block">
            <img
              className="inset-0 h-full w-full scale-x-[-1] object-cover"
              src="/illustration-3.png"
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
                  <span className="self-center whitespace-nowrap text-xl font-bold italic text-[var(--color-primary-500)]">
                    Artisanal bread
                  </span>
                </Link>
                {/* <h2 className="mt-6 text-center text-3xl font-bold text-secondary-800">
                  Create an account
                </h2> */}
              </div>

              <div className="mt-8 font-roboto">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/*  full name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t("input.name")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                          {...register("name", {
                            required: true,
                            minLength: 3,
                          })}
                        />
                        {errors.name && errors.name.type === "required" && (
                          <span className="text-sm text-red-600">
                            {t("validation.name")}
                          </span>
                        )}
                        {errors.name && errors.name.type === "minLength" && (
                          <span className="text-sm text-red-600">
                            {t("validation.name.min")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
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
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
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
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                        />
                        {errors.password &&
                          errors.password.type === "required" && (
                            <span className="text-sm text-red-600">
                              {t("validation.password.required")}
                            </span>
                          )}
                        {errors.password &&
                          errors.password.type === "minLength" && (
                            <span className="text-sm text-red-600">
                              {t("validation.password.min")}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* passwordConfirm */}
                    <div className="mt-5">
                      <label
                        htmlFor="passwordConfirm"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t("input.password.confirm")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                          {...register("passwordConfirm", {
                            required: true,
                            minLength: 6,
                            validate: (value) =>
                              value === watch("password") ||
                              t("validation.password.match"),
                          })}
                        />
                        {errors.passwordConfirm &&
                          errors.passwordConfirm.type === "required" && (
                            <span className="text-sm text-red-600">
                              {t("validation.password.confirm")}
                            </span>
                          )}
                        {errors.passwordConfirm &&
                          errors.passwordConfirm.type === "minLength" && (
                            <span className="text-sm text-red-600">
                              {t("validation.password.match")}
                            </span>
                          )}
                        {errors.passwordConfirm &&
                          errors.passwordConfirm.type === "validate" && (
                            <span className="text-sm text-red-600">
                              {errors.passwordConfirm.message}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="mt-7">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex w-full justify-center rounded-md border border-transparent bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isPending ? (
                          <Spinner size={5} />
                        ) : (
                          t("signup.btn.register")
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {t("signup.haveAccount")}{" "}
                      <Link
                        to="/login"
                        className="font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]"
                      >
                        {t("singup.login")}
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
