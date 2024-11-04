import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
const CourseRequirements = React.lazy(
  () => import("../components/CourseRequirements"),
);
const CourseContent = React.lazy(() => import("../components/CourseContent"));
const Footer = React.lazy(() => import("../components/Footer"));

/*
const course = {
  id: 2,
  name: "Mastering ReactJS and Redux",
  description:
    "Learn how to build and deploy robust Web applications using ReactJS and Redux. ",
  image:
    "https://media.istockphoto.com/id/942452228/photo/adding-raspberries-to-tasteful-blackberry-pie.jpg?s=612x612&w=0&k=20&c=WXzQf6E_txI_NBfW37MnS_f4R_9L7bB7fCr5R5Pr2UU=",
  overviewVideo: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
  duration: "12 hours",
  requirements: [
    "Basic knowledge of HTML, CSS, and JavaScript.",
    "A computer with an internet connection.",
    "A code editor like Visual Studio Code.",
    "Node.js and npm installed on your computer.",
  ],
  lessons: [
    {
      id: 1,
      title: "Introduction to ReactJS",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 2,
      title: "ReactJS Components",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 3,
      title: "Introduction to Redux",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 4,
      title: "Redux Middleware",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 5,
      title: "React-Redux",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 6,
      title: "Redux Toolkit",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 7,
      title: "Project",
      video: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
  ],
};
*/

const course = {
  id: 1,
  name: "Mastering the Art of Baking",
  description:
    "Learn essential baking techniques and create delicious pastries, breads, and cakes from scratch with this comprehensive course.",
  image: "/baking-cake.jpg",
  overviewVideo: "https://youtu.be/qtlhdIfojmc?si=i_qYQqGcbTU8O0fr",
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
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 2,
      title: "Perfecting Dough: Techniques for Bread and Pastry",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 3,
      title: "Cake Baking 101: From Sponge to Layer Cakes",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 4,
      title: "Pastry Arts: Creating Pies, Tarts, and Puff Pastry",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 5,
      title: "Chocolate and Confections",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 6,
      title: "Decorating Techniques: Frosting, Glazing, and Garnishing",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
    {
      id: 7,
      title: "Final Project: Create Your Signature Baked Good",
      video: "https://www.youtube.com/watch?v=COHqLxYkmcs",
    },
  ],
};

export default function Course() {
  const { id } = useParams();

  return (
    <div>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="flex flex-col items-center justify-between gap-x-2 gap-y-8 bg-primary-100 shadow-lg lg:flex-row">
        <div className="px-6 pt-10 text-center lg:px-12 lg:text-start">
          <h1 className="text-3xl font-bold text-secondary-500 md:text-4xl">
            {course.name}
          </h1>
          <p className="mt-6 font-roboto text-lg text-gray-700">
            {course.description}
          </p>
          <p className="mt-3 font-roboto text-lg text-gray-700">
            Duration:
            <span className="font-bold"> {course.duration}</span>
          </p>
          <button className="mt-8 rounded-md bg-primary-600 px-4 py-2 font-roboto text-lg text-white shadow-md duration-150 ease-in-out hover:bg-primary-700 focus:outline-none md:mt-11">
            Enroll Now
          </button>
        </div>

        <img
          src={course.image}
          alt={course.name}
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
            url={course.overviewVideo}
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
        <CourseContent lessons={course.lessons} />
      </Suspense>

      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <div className="">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
