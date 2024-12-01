import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../util/Http";
import Spinner from "../components/Spinner";
// const UserEnrolledCourses = React.lazy(
//   () => import("../components/UserEnrolledCourses"),
// );

export default function AdminUser() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const {
    data: { user, totalOrders, totalPaid } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", token, id],
    queryFn: () => getUser(token, id),
    staleTime: 0,
    enabled: !!token,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              User Details
            </h2>
          </div>

          <div className="mt-6 sm:mt-8">
            {isLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error getting the user. Please try again.
                </p>
              </div>
            )}

            {user && (
              <>
                <div>
                  <div className="mt-5 grid grid-cols-2 gap-5 text-center md:grid-cols-7">
                    <div className="col-span-2 overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow-md sm:p-6 md:col-span-3">
                      <dt className="truncate font-medium text-gray-700">
                        Total Spent
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-secondary-900">
                        {totalPaid.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        <span className="text-lg text-gray-500">L.E</span>
                      </dd>
                    </div>
                    <div className="col-span-1 overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow-md sm:p-6 md:col-span-2">
                      <dt className="truncate font-medium text-gray-700">
                        Enrolled Courses
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-secondary-900">
                        {user.courses.length}
                      </dd>
                    </div>
                    <div className="col-span-1 overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow-md sm:p-6 md:col-span-2">
                      <dt className="truncate font-medium text-gray-700">
                        Total Orders
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-secondary-900">
                        {totalOrders}
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 font-bold text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.firstName} {user.lastName || ""}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.email}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="font-medium text-gray-500">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.phone || "N/A"}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                        {user.address || "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* <Suspense fallback={<Spinner />}>
                  <div className="mt-12">
                    <UserEnrolledCourses courses={user.courses} userId={id} />
                  </div>
                </Suspense> */}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
