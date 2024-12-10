import { useTranslation } from "react-i18next";
import { Navigation, A11y, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const data = [
  {
    id: 0,
    name: "Ammar Yasser",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "Excellent service, I am very happy with the company, they are very professional and always deliver on time.",
  },
  {
    id: 1,
    name: "Omar Yasser",
    title: "CEO",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    quote:
      "I am very happy with the service of the company, they are very professional and always deliver on time.",
  },
  {
    id: 2,
    name: "Ammar Yasser",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "Excellent service, I am very happy with the company, they are very professional and always deliver on time.",
  },
  {
    id: 3,
    name: "Tamer Yasser",
    title: "COO",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    quote:
      "I am very happy with the service of the company, they are very professional and always deliver on time.",
  },
  {
    id: 4,
    name: "Ammar Yasser",
    title: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "Excellent service, I am very happy with the company, they are very professional and always deliver on time.",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const isArLang = localStorage.getItem("i18nextLng") === "ar";

  return (
    <div className="bg-primary-100 rtl:font-roboto">
      <div className="mx-auto max-w-7xl items-center justify-center px-0 py-28 md:py-36 lg:px-8">
        <h3 className="mb-16 text-center text-4xl font-bold leading-10 text-secondary-700">
          {t("testimonials.heading")}
        </h3>

        <Swiper
          key={isArLang ? "ar" : "en"}
          dir={isArLang ? "rtl" : "ltr"}
          modules={[Navigation, A11y, EffectCoverflow]}
          effect="coverflow"
          // loop={true}
          initialSlide={data.length > 1 ? 1 : 0}
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
          {data.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              {({ isActive }) => (
                <div
                  className={`rounded-lg p-5 shadow-lg max-[600px]:px-11 ${isActive ? "bg-primary-600" : "bg-white"}`}
                >
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full ring-2 ring-gray-100 ring-offset-2 ring-offset-primary-500"
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
                    {testimonial.quote}
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
