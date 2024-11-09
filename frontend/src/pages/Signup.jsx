import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function Signup() {
  return (
    <>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="relative bg-primary-50 px-10 py-10 md:px-36">
        <div
          className="absolute left-0 top-0 h-full w-2/3 bg-primary-800"
          style={{ clipPath: "polygon(0 0, 100% 0, 10% 100%, 0% 100%)" }}
        ></div>

        <div className="flex min-h-[33rem] overflow-hidden rounded-lg shadow-xl">
          <div className="z-30 hidden w-0 flex-1 bg-primary-50 lg:block">
            <img
              className="inset-0 h-full w-full scale-x-[-1] object-cover"
              src="/public/illustration-3.png"
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
                  <span className="self-center whitespace-nowrap text-xl font-bold italic text-primary-500">
                    Artisanal bread
                  </span>
                </Link>
                {/* <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-primary-600.svg"
                  alt="Workflow"
                /> */}
                <h2 className="mt-6 text-center text-3xl font-bold text-secondary-800">
                  Create an account
                </h2>
              </div>

              <div className="mt-8 font-roboto">
                <div className="mt-6">
                  <form className="">
                    {/*  full name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-7">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        Log in
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
