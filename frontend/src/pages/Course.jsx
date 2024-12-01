import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../util/Http";
import ReactPlayer from "react-player/youtube";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
const CourseRequirements = React.lazy(
  () => import("../components/CourseRequirements"),
);
const CourseContent = React.lazy(() => import("../components/CourseContent"));
const Footer = React.lazy(() => import("../components/Footer"));

export default function Course() {
  const { id } = useParams();
  const user = useSelector((state) => state.userInfo.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourse(id),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <div>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      {isLoading && <Spinner />}

      {isError && (
        <p className="mt-10 text-center font-roboto text-2xl font-bold text-red-600">
          Error getting course!
        </p>
      )}

      {!isLoading && !isError && course && (
        <>
          <div className="flex flex-col items-center justify-between gap-x-2 gap-y-8 bg-primary-100 shadow-lg lg:flex-row">
            <div className="px-6 pt-10 text-center lg:px-12 lg:text-start">
              <h1 className="text-3xl font-bold text-secondary-500 md:text-4xl">
                {course.title}
              </h1>
              <p className="mt-6 font-roboto text-lg text-gray-700">
                {course.description}
              </p>
              <p className="mt-3 font-roboto text-lg text-gray-700">
                Duration:
                <span className="font-bold"> {course.duration}</span>
              </p>
              <p className="mt-1 font-roboto text-lg text-gray-700">
                Price:
                <span className="font-bold"> {course.price} L.E</span>
              </p>
              <button className="mt-8 rounded-md bg-primary-600 px-4 py-2 font-roboto text-lg text-white shadow-md duration-150 ease-in-out hover:bg-primary-700 focus:outline-none md:mt-11">
                {user?.courses?.includes(course._id) ? (
                  <Link to={`/course/${course._id}`}>Watch Course</Link>
                ) : (
                  <a
                    href={`https://api.whatsapp.com/send?phone=201069262663&text=I want to request the course "${course.title}"
                I am '${user?.firstName} ${user?.lastName ? user?.lastName : ""}' and my email is ${user?.email}`}
                    target="_blank"
                    className="focus:outline-none"
                  >
                    Request Course
                  </a>
                )}
              </button>
            </div>

            <img
              src={`http://localhost:3001/${course.image}`}
              alt={`${course.title} image`}
              className="h-auto max-h-96 w-full object-cover object-center lg:h-96 lg:w-auto"
            />
          </div>

          <div className="mx-auto mt-24 max-w-4xl px-4 sm:px-6 md:pb-16 lg:max-w-7xl lg:px-8">
            <h2 className="relative mt-10 text-center text-2xl font-bold text-secondary-500 md:text-3xl">
              About this Course
              <span className="absolute -bottom-3 left-1/2 h-2 w-28 -translate-x-1/2 transform bg-primary-500 md:w-40"></span>
            </h2>

            <div className="relative mx-auto mt-12 h-72 max-w-3xl rounded-lg shadow-lg sm:h-96 md:h-[28rem]">
              <ReactPlayer
                url={course.video}
                loop={true}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          </div>

          <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
            <CourseRequirements requirements={course.requirements} />
          </Suspense>

          <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
            <CourseContent content={course.content} />
          </Suspense>

          <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
            <div className="">
              <Footer />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
}
