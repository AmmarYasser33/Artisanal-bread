import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses, enrollUser } from "../util/Http";
import Spinner from "../components/Spinner";

export default function UserEnrolledCourses({ courses: userCourses, userId }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
    staleTime: 0,
    select: (res) => res.data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (courseId) => enrollUser(token, courseId, { userId }),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("User enrolled successfully");
        queryClient.invalidateQueries("user");
      } else {
        notifyError(
          data?.response?.data?.message || "Error enrolling user! try again",
        );
      }
    },
    onError: () => {
      notifyError("Error enrolling user!");
    },
  });

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center">
          <p className="text-xl font-bold text-red-600">
            Error getting enrolled courses. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !isError && courses && courses.length > 0 && (
        <>
          <h3 className="mb-3 text-lg font-semibold text-secondary-800 xl:ps-8">
            Enrolled Courses :
          </h3>

          <table className="mx-auto w-full max-w-3xl text-left text-base shadow-sm rtl:text-right">
            <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
              <tr className="">
                <th scope="col" className="px-6 py-3">
                  Course Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Enrolled ?
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    {course.title}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      disabled={isPending}
                      defaultChecked={userCourses.includes(course._id)}
                      onChange={() => mutate(course._id)}
                      className="h-5 w-5 rounded border-gray-400 text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
