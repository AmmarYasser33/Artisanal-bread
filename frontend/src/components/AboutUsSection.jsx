import { useState } from "react";
import VideoModal from "../components/VideoModal";

export default function AboutUsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto mt-24 flex max-w-7xl flex-col items-center justify-center space-y-24 px-4 sm:px-6 lg:mt-16 lg:flex-row lg:px-8">
      <div className="relative mx-auto h-48 w-40 border-[1rem] border-primary-50 bg-primary-500 md:h-96 md:w-[21rem] md:border-[1.57rem] lg:h-[28rem] lg:w-60 xl:h-96 xl:w-[21rem]">
        <img
          src="/service-1.jpg"
          alt="bakery service 1"
          className="absolute -top-14 right-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-top-20 sm:h-80 sm:w-64 md:right-[9.5rem] lg:right-24 lg:h-64 lg:w-52 xl:right-[9.5rem] xl:h-80 xl:w-64"
        />

        <img
          src="/service-2.jpg"
          alt="bakery service  2"
          className="absolute -bottom-10 left-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-bottom-20 sm:h-80 sm:w-64 md:left-[9.5rem] lg:left-24 lg:h-64 lg:w-52 xl:left-[9.5rem] xl:h-80 xl:w-64"
        />
      </div>

      <div>
        <h2 className="mb-4 font-roboto text-xl font-extrabold uppercase text-primary-500">
          About Us
        </h2>
        <h3 className="mb-8 text-[2.6rem] font-bold leading-10 text-secondary-500">
          Who We Are?
        </h3>

        <p className="mb-5 max-w-lg font-roboto text-base text-gray-700">
          Our bakery began as a dream to bring fresh, handcrafted baked goods to
          the community. From humble beginnings, we've grown into a beloved
          neighborhood bakery known for our commitment to quality and passion
          for baking.
        </p>
        <p className="mb-16 max-w-lg font-roboto text-base text-gray-700">
          We’re proud to be part of this community, using quality ingredients
          and age-old recipes with a modern twist. Watch as our skilled bakers
          mix, knead, and bake each item to perfection – every batch tells a
          story, and we can’t wait to share it with you.
        </p>

        <div className="relative flex items-center space-x-28">
          <h4 className="text-xl font-bold text-secondary-500">Our Story:</h4>

          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="play-btn absolute"
          ></button>
        </div>
        {isModalOpen && (
          <VideoModal
            videoUrl={"https://youtu.be/SieaFan7-N0?si=8MMMeVUsOegJxCN_"}
            onClose={() => setIsModalOpen(false)}
            isPlaying={true}
          />
        )}
      </div>
    </div>
  );
}
