import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../util/Http";
import { Navigation, A11y, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "./Spinner";
import { BASE_URL } from "../util/Globals";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const isArLang = localStorage.getItem("i18nextLng") === "ar";

  const {
    data: testimonials,
    isLoading: isTestimonialsLoading,
    isError: isTestimonialsError,
  } = useQuery({
    queryKey: ["testimonials", i18n.language],
    queryFn: () => getTestimonials(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <div className="bg-[var(--color-primary-100)] rtl:font-roboto">
      <div className="mx-auto max-w-7xl items-center justify-center px-0 py-28 md:py-36 lg:px-8">
        <h3 className="mb-16 text-center text-4xl font-bold leading-10 text-secondary-700">
          {t("testimonials.heading")}
        </h3>

        <Swiper
          key={
            isArLang ? "ar" + testimonials?.length : "en" + testimonials?.length
          }
          dir={isArLang ? "rtl" : "ltr"}
          modules={[Navigation, A11y, EffectCoverflow]}
          effect="coverflow"
          // loop={true}
          initialSlide={testimonials?.length > 1 ? 1 : 0}
          slidesPerView={2}
          centeredSlides={true}
          navigation
          coverflowEffect={{
            slideShadows: false,
          }}
          breakpoints={{
            900: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {isTestimonialsLoading && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}

          {isTestimonialsError && (
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-red-600">
                {t("testimonials.fetch.error")}
              </p>
            </div>
          )}

          {testimonials &&
            testimonials.length > 0 &&
            testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                {({ isActive }) => (
                  <div
                    className={`rounded-lg p-5 shadow-lg max-[600px]:px-11 ${isActive ? "bg-[var(--color-primary-600)]" : "bg-white"}`}
                  >
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <img
                        src={`${BASE_URL}${testimonial.image}`}
                        className="h-14 w-14 rounded-full ring-2 ring-gray-100 ring-offset-2 ring-offset-[var(--color-primary-500)]"
                      />

                      <div className="flex flex-col space-y-1">
                        <h4
                          className={`mb-0 text-[1.35rem] font-semibold leading-7 tracking-wide ${isActive ? "text-white" : "text-secondary-500"}`}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className={`font-roboto text-sm ${isActive ? "text-white" : "text-gray-800"}`}
                        >
                          {testimonial.title}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`mt-5 font-roboto text-lg ${isActive ? "text-white" : "text-gray-900"}`}
                    >
                      {testimonial.comment}
                    </p>
                  </div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
