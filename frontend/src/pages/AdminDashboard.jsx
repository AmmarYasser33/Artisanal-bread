import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import LogoutModal from "../components/LogoutModal";
import {
  Icon277Exit,
  IconBoxesPacking,
  IconVideo,
  IconSettingsSharp,
  IconChartPieFill,
  IconRestaurant,
  IconCubesStacked,
} from "../Icons";

export default function UserDashboard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="min-h-screen bg-gradient-to-tl from-primary-100 to-primary-300 p-10 font-roboto lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
          <nav className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconChartPieFill
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconBoxesPacking
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Orders</span>
            </NavLink>

            <NavLink
              to="/admin/categories"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconCubesStacked
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Categories</span>
            </NavLink>

            <NavLink
              to="/admin/products"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconRestaurant
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Products</span>
            </NavLink>

            <NavLink
              to="/admin/courses"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconVideo
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Courses</span>
            </NavLink>

            <NavLink
              to="/admin/settings"
              end
              className={({ isActive }) =>
                `${isActive ? "bg-gray-50 hover:bg-white" : "hover:bg-gray-50"} group flex items-center rounded-md px-3 py-2 font-medium text-black max-lg:justify-center`
              }
              aria-current="page"
            >
              <IconSettingsSharp
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Settings</span>
            </NavLink>

            <button
              className="group flex w-full items-center rounded-md px-3 py-2 font-medium text-black hover:bg-gray-50 max-lg:justify-center"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <Icon277Exit
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate">Logout</span>
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
