import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../util/Http";
import Spinner from "../components/Spinner";
import { IconPlayButtonO } from "../Icons";
import { BASE_URL } from "../util/Globals";

export default function UserCourses() {
  const token = JSON.parse(localStorage.getItem("token"));
  const { t } = useTranslation();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myCourses", token],
    queryFn: () => getMyCourses(token),
    staleTime: 0,
    enabled: !!token,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            {t("user.courses.heading")}
          </h2>

          <div className="mt-6 sm:mt-8">
            {isLoading && <Spinner />}
            {isError && (
              <p className="mt-10 text-center font-roboto text-2xl font-bold text-red-600">
                {t("user.courses.error")}
              </p>
            )}
            {courses && courses?.length === 0 && !isLoading && !isError && (
              <p className="mt-14 text-center font-roboto text-2xl font-bold text-primary-800">
                {t("user.courses.empty")}
              </p>
            )}

            {!isLoading && !isError && courses && courses?.length > 0 && (
              <div className="grid grid-cols-1 gap-x-4 gap-y-7 px-10 sm:gap-x-6 sm:px-24 md:grid-cols-2 md:gap-y-12 md:px-10 lg:gap-x-8 xl:px-24 2xl:grid-cols-3">
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div key={course._id} className="group relative px-1 pb-2">
                      <Link to={`/course/${course._id}`}>
                        <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                          <img
                            src={`${BASE_URL}${course.image}`}
                            alt={`${course.name} course image`}
                            className="h-full w-full object-fill object-center"
                          />
                        </div>
                      </Link>

                      <h3 className="mt-4 text-center text-lg font-bold tracking-wide text-gray-800 drop-shadow-md">
                        <div className="group-hover:text-primary-800">
                          <Link
                            to={`/course/${course._id}`}
                            className="group-hover:text-primary-800"
                          >
                            <span className="absolute inset-0" />
                            {course.title}
                          </Link>
                        </div>
                      </h3>

                      <Link
                        to={`/course/${course._id}`}
                        className="absolute inset-0 flex items-center justify-center rounded-md bg-primary-900 bg-opacity-50 opacity-0 shadow-md transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                      >
                        <IconPlayButtonO className="h-12 w-12 text-white" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="mt-10 text-center font-roboto text-2xl font-bold text-primary-700">
                    No courses found!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
