import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../util/Http";
import { IconBxsEdit, IconPlusLg, IconTrashDelete } from "../Icons";
import DeleteCourseModal from "../components/DeleteCourseModal";
import Spinner from "../components/Spinner";

export default function AdminCourses() {
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              Courses
            </h2>

            <Link
              to="/admin/courses/add"
              // onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-4 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-primary-600 focus:outline-none"
            >
              <IconPlusLg className="mr-1 h-4 w-4" />
              <span>Add Course</span>
            </Link>
          </div>

          <div className="mt-6 overflow-x-scroll sm:mt-8">
            {isCoursesLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isCoursesError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error fetching courses!
                </p>
              </div>
            )}
            {courses && courses.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-secondary-800">
                  No courses! Add a course to get started.
                </p>
              </div>
            )}
            {courses && courses.length > 0 && (
              <table className="w-full text-left text-base shadow-sm rtl:text-right">
                <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
                  <tr className="">
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">
                      Course Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Lessons
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <td className="w-4 p-4">
                        <div className="flex max-h-full w-16 max-w-full items-center drop-shadow-sm md:w-32">
                          <img
                            src={`http://localhost:3001/${course.image}`}
                            className="rounded-sm"
                            alt={`${course.title} image`}
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {course.title}
                      </th>

                      <td className="px-6 py-4">{course.duration}</td>
                      <td className="px-6 py-4">{course.lessons.length}</td>
                      <td className="px-6 py-4">{course.price} L.E</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/courses/${course._id}`}
                          className="inline-flex items-center justify-center rounded-lg bg-primary-300 px-2 py-1 text-sm text-secondary-700 hover:bg-primary-600"
                        >
                          <IconBxsEdit className="h-4 w-4" />
                          <span className="sr-only">Edit Course</span>
                        </Link>
                        <button
                          className="ml-2 inline-flex items-center justify-center rounded-lg bg-red-400 px-2 py-1 text-sm text-secondary-700 hover:bg-red-600"
                          onClick={() => {
                            setSelectedId(course._id);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <IconTrashDelete className="h-4 w-4" />
                          <span className="sr-only">Delete Course</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {selectedId && (
        <DeleteCourseModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          courseId={selectedId}
          setCourseId={setSelectedId}
        />
      )}
    </section>
  );
}
