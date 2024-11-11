import { useState } from "react";
import { IconScreenFull, IconPlayButtonO } from "../Icons";
import { Link } from "react-router-dom";

export default function UserCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "عمل كيكة الشوكولاتة",
      price: "75 L.E",
      imageSrc:
        "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/300674650_434020582084083_4696978165148048421_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Q0iDhi52EzoQ7kNvgFwpDgD&_nc_zt=23&_nc_ht=scontent.fcai19-5.fna&_nc_gid=Ar6lx4hFRamwEcfY1WdDpd3&oh=00_AYAsly7gy5l8-fTWAvby4uigfTxOekcvcfHmYIyil_Ol6g&oe=672B09DD",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
    {
      id: 2,
      name: "الكيكة الأساسية بالفانيليا والشوكولاتة",
      price: "33 L.E",
      imageSrc:
        "https://culinarycraft.in/wp-content/uploads/2024/02/benefits_of_enrolling_baking_courses_540x.webp",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
    {
      id: 3,
      name: "Making a Chocolate Cake",
      price: "50 L.E",
      imageSrc:
        "https://media.istockphoto.com/id/942452228/photo/adding-raspberries-to-tasteful-blackberry-pie.jpg?s=612x612&w=0&k=20&c=WXzQf6E_txI_NBfW37MnS_f4R_9L7bB7fCr5R5Pr2UU=",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
  ]);

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            My Courses
          </h2>

          <div className="mt-6 sm:mt-8">
            {courses && courses?.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-4 gap-y-7 px-10 sm:gap-x-6 sm:px-24 md:grid-cols-2 md:gap-y-12 md:px-10 lg:gap-x-8 xl:px-24 2xl:grid-cols-3">
                {courses && courses.length > 0 ? (
                  courses.map((course, i) => (
                    <div key={course.id} className="group relative px-1 pb-2">
                      <Link to={`/course/${course.id}`}>
                        <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                          <img
                            src={course.imageSrc}
                            alt={course.imageAlt}
                            className="h-full w-full object-fill object-center"
                          />
                        </div>
                      </Link>

                      <h3 className="mt-4 text-center text-lg font-bold tracking-wide text-gray-800 drop-shadow-md">
                        <div className="group-hover:text-primary-800">
                          <Link
                            to={`/course/${course.id}`}
                            className="group-hover:text-primary-800"
                          >
                            <span className="absolute inset-0" />
                            {course.name}
                          </Link>
                        </div>
                      </h3>

                      <Link
                        to={`/course/${course.id}`}
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
            ) : (
              <p className="mt-14 text-center font-roboto text-2xl font-bold text-primary-800">
                You have not enrolled in any courses yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
