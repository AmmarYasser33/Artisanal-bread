import ReactPlayer from "react-player/youtube";
import Nav from "../components/Nav";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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

        <div className="container mx-auto px-12 pt-12 md:px-16 md:pt-16">
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

        {/* https://youtu.be/b7Yl-ufPIrM?si=2gKQkfEpCtEProVF */}
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="play-btn"
        ></button>

        {isModalOpen && <VideoModal modalRef={modalRef} />}
      </div>
    </div>
  );
}

function VideoModal({ modalRef }) {
  return (
    <div className="fixed inset-0 z-50 flex h-full max-h-full max-w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-60">
      <div
        ref={modalRef}
        className="relative max-h-full w-full max-w-xl md:max-w-4xl"
      >
        <div className="relative rounded-lg bg-gray-700 shadow">
          {/* Modal Content */}
          <div className="h-96 p-1 md:h-[30rem]">
            <ReactPlayer
              url="https://youtu.be/b7Yl-ufPIrM?si=2gKQkfEpCtEProVF"
              loop={true}
              playing={true}
              width="100%"
              height="100%"
              // controls={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
