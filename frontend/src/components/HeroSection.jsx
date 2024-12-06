import { useState } from "react";
import { useTranslation } from "react-i18next";
import VideoModal from "../components/VideoModal";
import Nav from "../components/Nav";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

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

        <div className="container mx-auto px-12 pt-7 md:px-16 md:pt-16 rtl:font-cairo">
          <p className="mt-20 text-lg font-extrabold uppercase text-primary-500 rtl:font-bold">
            #{t("home.main.hashtag")}
          </p>

          <h1 className="my-10 max-w-md text-6xl font-bold italic tracking-wide text-white md:text-7xl md:ltr:max-w-xl rtl:text-5xl lg:rtl:max-w-xl">
            {t("home.main.title")}
          </h1>

          <p className="text-xl text-white">{t("home.main.description")}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="play-btn absolute top-full translate-x-1/2 md:top-[60%] md:translate-x-0 ltr:right-1/2 md:ltr:right-[15%] rtl:left-1/3 md:rtl:left-[15%]"
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
