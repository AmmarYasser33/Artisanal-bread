import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { getAllUsers } from "../util/Http";
import { IconAccountDetails, IconSearch } from "../Icons";
import Spinner from "../components/Spinner";

export default function AdminUsers() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const {
    data: allUsers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", token],
    queryFn: () => getAllUsers(token),
    staleTime: 0,
    enabled: !!token,
    select: (res) => res.data,
  });

  const filteredUsers = useMemo(() => {
    if (!debouncedQuery) return allUsers;
    return allUsers?.filter((user) =>
      ["name", "email", "phone"].some((key) =>
        user[key]?.toLowerCase().includes(debouncedQuery.toLowerCase()),
      ),
    );
  }, [allUsers, debouncedQuery]);

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              Users
            </h2>

            {/* search */}
            <form className="relative min-w-64 sm:mt-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IconSearch className="h-6 w-6 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Search users"
              />
            </form>
          </div>

          <div className="mt-6 overflow-x-scroll sm:mt-8">
            {isLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error getting users. Please try again.
                </p>
              </div>
            )}
            {allUsers && allUsers.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-secondary-800">
                  No users yet.
                </p>
              </div>
            )}
            {allUsers && allUsers.length > 0 && (
              <table className="mx-auto w-full text-left text-base shadow-sm rtl:text-right">
                <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
                  <tr className="">
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Courses
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        <Link
                          to={`/admin/users/${user._id}`}
                          className="hover:text-primary-600"
                        >
                          {user.firstName} {user.lastName || ""}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phone || "N/A"}</td>
                      <td className="px-6 py-4">{user.courses.length}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/users/${user._id}`}
                          className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary-300 px-2 py-1 text-secondary-700 hover:bg-primary-600"
                        >
                          <IconAccountDetails className="h-5 w-5" />
                          <span className="hidden text-xs md:inline">
                            Details
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
