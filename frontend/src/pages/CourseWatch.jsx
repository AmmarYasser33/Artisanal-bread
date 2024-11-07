import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/vimeo";
import { IconPlayButtonO } from "../Icons";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
const Footer = React.lazy(() => import("../components/Footer"));

const course = {
  id: 1,
  name: "Mastering the Art of Baking",
  description:
    "Learn essential baking techniques and create delicious pastries, breads, and cakes from scratch with this comprehensive course.",
  image: "/baking-cake.jpg",
  overviewVideo: "https://vimeo.com/315108135?share=copy",
  duration: "15 hours",
  requirements: [
    "Basic kitchen tools and baking ingredients.",
    "A clean workspace for baking.",
    "An oven, measuring cups, and mixing bowls.",
    "Passion for creating delicious baked goods!",
  ],
  lessons: [
    {
      id: 1,
      title: "Introduction to Baking Essentials",
      video: "https://vimeo.com/315108135?share=copy",
    },
    {
      id: 2,
      title: "Perfecting Dough: Techniques for Bread and Pastry",
      video: "https://vimeo.com/205646704?share=copy",
    },
    {
      id: 3,
      title: "Cake Baking 101: From Sponge to Layer Cakes",
      video: "https://vimeo.com/315108135?share=copy",
    },
    {
      id: 4,
      title: "Pastry Arts: Creating Pies, Tarts, and Puff Pastry",
      video: "https://vimeo.com/315108135?share=copy",
    },
    {
      id: 5,
      title: "Chocolate and Confections",
      video: "https://vimeo.com/315108135?share=copy",
    },
    {
      id: 6,
      title: "Decorating Techniques: Frosting, Glazing, and Garnishing",
      video: "https://vimeo.com/315108135?share=copy",
    },
    {
      id: 7,
      title: "Final Project: Create Your Signature Baked Good",
      video: "https://vimeo.com/315108135?share=copy",
    },
  ],
};

export default function CourseWatch() {
  const { id } = useParams();
  const [lessonIndex, setLessonIndex] = useState(0);

  return (
    <div>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      {/* <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8"> */}
      <div className="">
        <div className="bg-primary-900 shadow-lg">
          <div className="mx-auto h-[31rem] max-w-5xl">
            <ReactPlayer
              key={lessonIndex}
              url={course?.lessons[lessonIndex]?.video || course?.overviewVideo}
              controls
              width="100%"
              height="100%"
              light={true}
              fallback={<Spinner color={"primary-500"} size={10} />}
            />
          </div>
        </div>

        <div className="bg-white py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
            <h2 className="relative text-center text-2xl font-bold text-secondary-500 md:text-3xl">
              Course Units
              <span className="absolute -bottom-3 left-1/2 h-2 w-20 -translate-x-1/2 transform bg-primary-500 md:w-28"></span>
            </h2>

            <div className="mt-10 border-b border-t border-gray-300">
              {course.lessons?.map((lesson, index) => (
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

      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <div className="mt-20">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
