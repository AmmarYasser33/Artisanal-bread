import { useState } from "react";
import { IconScreenFull } from "../Icons";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "عمل كيكة الشوكولاتة",
      price: "75 L.E",
      imageSrc: "https://www.pithm.edu.pk/wp-content/uploads/2023/07/BAK.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
    {
      id: 2,
      name: "الكيكة الأساسية بالفانيليا والشوكولاتة",
      price: "33 L.E",
      imageSrc:
        "https://www.wikihow.com/images/thumb/7/7f/Bake-a-Cake-Step-14-Version-2.jpg/550px-nowatermark-Bake-a-Cake-Step-14-Version-2.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
    {
      id: 3,
      name: "Making a Chocolate Cake",
      price: "50 L.E",
      imageSrc: "https://i.ytimg.com/vi/2JDlrNTUxLw/maxresdefault.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
    },
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

  if (!courses) return <Spinner />;

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="mx-auto mt-14 max-w-2xl px-4 sm:px-6 md:pb-16 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-7 px-10 sm:gap-x-6 sm:px-24 md:grid-cols-2 md:gap-y-12 md:px-0 lg:grid-cols-3 lg:gap-x-8">
          {courses && courses.length > 0 ? (
            courses.map((course, i) => (
              <div key={course.id} className="group relative">
                <Link to={`/courses/${course.id}`}>
                  <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={course.imageSrc}
                      alt={course.imageAlt}
                      className="h-full w-full object-fill object-center"
                    />
                  </div>
                </Link>

                <h3 className="mt-4 text-lg font-bold tracking-wide text-gray-800 drop-shadow-md">
                  <div className="group-hover:text-primary-800">
                    <Link
                      to={`/courses/${course.id}`}
                      className="group-hover:text-primary-800"
                    >
                      <span className="absolute inset-0" />
                      {course.name}
                    </Link>
                  </div>
                </h3>

                <div className="flex items-center justify-between px-1">
                  <p className="text-center font-roboto text-xl font-medium text-gray-900">
                    {course.price}
                  </p>

                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center justify-center p-2 text-primary-800 duration-300 ease-in-out hover:bg-primary-800 hover:text-white focus:outline-none"
                  >
                    <IconScreenFull className="inline-block h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-10 text-center font-roboto text-2xl font-bold text-primary-700">
              No courses found!
            </p>
          )}
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
