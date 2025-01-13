import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCompletedCourse } from "../util/Http";
import ReactPlayer from "react-player/vimeo";
import { IconPlayButtonO } from "../Icons";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
const Footer = React.lazy(() => import("../components/Footer"));

export default function CourseWatch() {
  const { id } = useParams();
  const token = useSelector((state) => state.userInfo.token);
  const { t } = useTranslation();
  const [lessonIndex, setLessonIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id, token],
    queryFn: () => getCompletedCourse(token, id),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <div>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      {isLoading && (
        <div className="min-h-screen bg-primary-900 p-16">
          <Spinner size={12} />
        </div>
      )}

      {isError && (
        <p className="mt-10 text-center font-roboto text-2xl font-bold text-red-600">
          {t("user.course.error")}
        </p>
      )}

      {!isLoading && !isError && course && (
        <div className="rtl:font-roboto">
          <div className="bg-primary-900 shadow-lg">
            <div className="mx-auto h-[17rem] max-w-5xl sm:h-96 md:h-[31rem]">
              <ReactPlayer
                key={lessonIndex}
                url={course?.lessons[lessonIndex]?.video || course?.video}
                controls
                width="100%"
                height="100%"
                light={true}
                fallback={<Spinner />}
              />
            </div>
          </div>

          <div className="bg-white py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
              <h2 className="relative text-center text-2xl font-bold text-secondary-500 md:text-3xl">
                {t("user.course.units")}
                <span className="absolute -bottom-3 left-1/2 h-2 w-20 -translate-x-1/2 transform bg-primary-500 md:w-28"></span>
              </h2>

              <div className="mt-10 border-b border-t border-gray-300">
                {course?.lessons?.map((lesson, index) => (
                  <button
                    key={index}
                    className={`flex w-full items-center justify-between border-b border-black border-opacity-15 bg-primary-100 px-14 py-4 hover:bg-primary-200 md:px-20 ${
                      index === lessonIndex ? "bg-primary-200" : ""
                    }`}
                    onClick={() => setLessonIndex(index)}
                  >
                    <h3 className="font-roboto text-base font-medium text-secondary-500 md:text-lg">
                      {lesson.title}
                    </h3>

                    <IconPlayButtonO className="mx-2 h-6 w-6 text-secondary-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <div className="mt-20">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
