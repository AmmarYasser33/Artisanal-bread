import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../util/Http";
import { IconScreenFull } from "../Icons";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../util/Globals";

export default function Courses() {
  const { t, i18n } = useTranslation();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", i18n.language],
    queryFn: () => getCourses(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-4 sm:px-6 md:pb-16 lg:max-w-7xl lg:px-8">
        {isLoading && <Spinner />}
        {isError && (
          <p className="mt-10 text-center font-roboto text-2xl font-bold text-red-600">
            {t("courses.fetch.error")}
          </p>
        )}
        {courses && (
          <div className="grid grid-cols-1 gap-x-4 gap-y-7 px-10 sm:gap-x-6 sm:px-24 md:grid-cols-2 md:gap-y-12 md:px-0 lg:grid-cols-3 lg:gap-x-8">
            {courses.map((course) => (
              <div key={course._id} className="group relative">
                <Link to={`/courses/${course._id}`}>
                  <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={`${BASE_URL}${course.image}`}
                      alt={`${course.name} image`}
                      className="h-full w-full object-fill object-center"
                    />
                  </div>
                </Link>

                <h3 className="mt-4 text-lg font-bold tracking-wide text-gray-800 drop-shadow-md">
                  <div className="group-hover:text-primary-800">
                    <Link
                      to={`/courses/${course._id}`}
                      className="group-hover:text-primary-800"
                    >
                      <span className="absolute inset-0" />
                      {course.title}
                    </Link>
                  </div>
                </h3>

                <div className="flex items-center justify-between px-1">
                  <p className="text-center font-roboto text-xl font-medium text-gray-900">
                    {course.price} {t("currency")}
                  </p>

                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-flex items-center justify-center p-2 text-primary-800 duration-300 ease-in-out hover:bg-primary-800 hover:text-white focus:outline-none"
                  >
                    <IconScreenFull className="inline-block h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
