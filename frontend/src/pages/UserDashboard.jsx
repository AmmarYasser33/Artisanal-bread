import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";
import Nav from "../components/Nav";
import {
  Icon277Exit,
  IconBoxesPacking,
  IconVideo,
  IconAccountEdit,
} from "../Icons";

export default function UserDashboard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="min-h-screen bg-gradient-to-tl from-primary-100 to-primary-300 p-10 font-roboto lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
          <nav className="space-y-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconAccountEdit
                className="h-6 w-6 flex-shrink-0 text-black ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3"
                aria-hidden="true"
              />
              <span className="truncate">{t("user.dashboard.profile")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconBoxesPacking
                className="h-6 w-6 flex-shrink-0 text-black ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3"
                aria-hidden="true"
              />
              <span className="truncate">{t("user.dashboard.orders")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/courses"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconVideo
                className="h-6 w-6 flex-shrink-0 text-black ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3"
                aria-hidden="true"
              />
              <span className="truncate">{t("user.dashboard.courses")}</span>
            </NavLink>

            <button
              className="group flex w-full items-center rounded-md px-3 py-2 font-medium text-black hover:bg-gray-50 max-lg:justify-center"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <Icon277Exit
                className="h-6 w-6 flex-shrink-0 text-black ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3"
                aria-hidden="true"
              />
              <span className="truncate">{t("user.dashboard.logout")}</span>
            </button>
          </nav>
        </aside>

        <Outlet />
      </div>

      <LogoutModal
        setIsModalOpen={setIsLogoutModalOpen}
        isModalOpen={isLogoutModalOpen}
      />
    </>
  );
}
