import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  IconClose,
  IconIconMenu,
  IconShoppingBag,
  IconProfile,
} from "../Icons";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);

  return (
    <nav className="border-gray-200">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 drop-shadow-2xl rtl:space-x-reverse"
        >
          <img src="/baker.png" className="h-9" alt="Artisanal bread logo" />
          <span className="self-center whitespace-nowrap text-xl font-bold italic text-primary-500 lg:text-3xl">
            Artisanal bread
          </span>
        </Link>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center justify-center space-x-1">
            {isLogin ? (
              <Link
                to={role === "admin" ? "/admin" : "/dashboard"}
                className="rounded-full text-center font-roboto text-base font-medium text-primary-500 hover:text-white focus:outline-none"
              >
                <IconProfile className="inline-block h-8 w-8" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="mr-1 rounded-lg bg-primary-600 px-4 py-2 text-center font-roboto text-base font-medium text-white hover:bg-primary-800 focus:outline-none"
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="group relative rounded-full p-2 text-center font-roboto text-base font-medium text-primary-500 hover:bg-primary-700 hover:text-white focus:outline-none"
            >
              <IconShoppingBag className="inline-block h-7 w-7" />
              <span className="absolute right-1 top-1 z-10 rounded-full bg-primary-600 px-1 text-xs font-semibold text-white group-hover:bg-white group-hover:text-secondary-900 group-focus:text-secondary-900">
                2
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-400 border-opacity-30 p-2 text-3xl text-gray-100 focus:outline-none md:hidden"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <IconClose className="" />
            ) : (
              <IconIconMenu className="" />
            )}
          </button>
        </div>
        <div
          className={`z-50 items-center justify-between ${isOpen ? "block" : "hidden"} fixed left-0 top-[4.3rem] w-full bg-secondary-500 md:static md:order-1 md:flex md:w-auto md:bg-transparent`}
          id="navbar-cta"
        >
          <ul className="mt-4 flex flex-col rounded-lg p-4 font-roboto text-lg font-medium md:mt-0 md:flex-row md:space-x-8 md:p-0 rtl:space-x-reverse">
            <li className="px-3 py-2 text-center hover:translate-y-[-0.1rem] md:p-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "text-primary-600" : "text-white"} rounded hover:text-primary-600`
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li className="px-3 py-2 text-center hover:translate-y-[-0.1rem] md:p-0">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${isActive ? "text-primary-600" : "text-white"} rounded hover:text-primary-600`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="px-3 py-2 text-center hover:translate-y-[-0.1rem] md:p-0">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `${isActive ? "text-primary-600" : "text-white"} rounded hover:text-primary-600`
                }
              >
                Courses
              </NavLink>
            </li>
            <li className="px-3 py-2 text-center hover:translate-y-[-0.1rem] md:p-0">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "text-primary-600" : "text-white"} rounded hover:text-primary-600`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
