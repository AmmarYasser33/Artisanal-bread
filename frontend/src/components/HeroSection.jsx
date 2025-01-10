import { useTranslation } from "react-i18next";
import Nav from "../components/Nav";
import { BASE_URL } from "../util/Globals";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div id="hero" className="relative min-h-[50vh]">
      {/* Background Image */}
      <img
        src={`${BASE_URL}designs/banner.png`}
        alt="Background Image"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <Nav />

        <div className="container mx-auto py-28 text-center rtl:font-cairo">
          <p className="mt-6 text-lg font-extrabold uppercase text-primary-500 rtl:font-bold">
            #{t("home.main.hashtag")}
          </p>

          <h1 className="mx-auto my-10 max-w-md text-6xl font-bold italic tracking-wide text-white md:text-7xl md:ltr:max-w-xl rtl:text-5xl lg:rtl:max-w-xl">
            {t("home.main.title")}
          </h1>

          <p className="text-xl text-white">{t("home.main.description")}</p>
        </div>
      </div>
    </div>
  );
}
