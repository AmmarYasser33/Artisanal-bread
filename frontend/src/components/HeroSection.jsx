import { useState } from "react";
import VideoModal from "../components/VideoModal";
import Nav from "../components/Nav";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      id="hero"
      className="relative min-h-screen bg-[url('/carousel-2.jpg')] bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <Nav />

        <div className="container mx-auto px-12 pt-7 md:px-16 md:pt-16">
          <p className="mt-20 font-roboto text-lg font-extrabold uppercase text-primary-500">
            #Best Bakery in Town
          </p>

          <h1 className="my-10 max-w-xl text-6xl font-bold italic tracking-wide text-white md:text-7xl">
            We Bake With Passion
          </h1>

          <p className="text-xl text-white">
            We are a small, family-owned bakery that specializes in artisan
            breads, pastries, and cakes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="play-btn absolute right-1/2 top-full translate-x-1/2 md:right-[15%] md:top-[60%] md:translate-x-0"
        ></button>

        {isModalOpen && (
          <VideoModal
            videoUrl={"https://youtu.be/b7Yl-ufPIrM?si=2gKQkfEpCtEProVF"}
            onClose={() => setIsModalOpen(false)}
            isPlaying={true}
          />
        )}
      </div>
    </div>
  );
}
