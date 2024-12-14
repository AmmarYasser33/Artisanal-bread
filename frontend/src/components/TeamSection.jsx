import { useTranslation } from "react-i18next";
import {
  IconFacebookRounded,
  IconWhatsapp,
  IconTwitter,
  IconInstagram,
} from "../Icons";

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <div className="my-40 bg-primary-100 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 rtl:font-roboto">
        <div className="mb-14 text-center">
          <h2 className="mb-2 font-roboto text-lg font-extrabold uppercase text-gray-700 md:text-xl rtl:font-bold">
            {t("team.heading")}
          </h2>
          <h3 className="text-3xl font-bold text-secondary-700">
            {t("team.subheading")}
          </h3>
        </div>

        <div className="flex flex-col justify-center gap-8 px-14 sm:flex-row sm:px-0 md:px-14">
          <div className="group relative flex max-w-fit flex-col items-center gap-5 overflow-hidden rounded-lg bg-white pb-10 shadow-lg transition-all hover:scale-110 hover:shadow-xl">
            <div className="">
              <img src="/chefs-1.jpg" alt="chef 1 image" />
              <div className="align-center absolute -right-96 top-6 flex w-fit flex-col justify-center gap-3 rounded-lg bg-white bg-opacity-50 p-3 transition-all duration-300 group-hover:right-2">
                <a href="facebook.com" target="_blank">
                  <IconFacebookRounded className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="whatsapp.com" target="_blank">
                  <IconWhatsapp className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="twitter.com" target="_blank">
                  <IconTwitter className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="instagram.com" target="_blank">
                  <IconInstagram className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="mb-2 text-xl font-bold text-secondary-700 lg:text-2xl">
                Ammar Yasser
              </h4>
              <p className="font-roboto text-gray-600">Patissier</p>
            </div>
          </div>

          <div className="group relative flex max-w-fit flex-col items-center gap-5 overflow-hidden rounded-lg bg-white pb-10 shadow-lg transition-all hover:scale-110 hover:shadow-xl">
            <div className="">
              <img src="/chefs-2.jpg" alt="chef 2 image" />
              <div className="align-center absolute -right-96 top-6 flex w-fit flex-col justify-center gap-3 rounded-lg bg-white bg-opacity-50 p-3 transition-all duration-300 group-hover:right-2">
                <a href="facebook.com" target="_blank">
                  <IconFacebookRounded className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="whatsapp.com" target="_blank">
                  <IconWhatsapp className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="twitter.com" target="_blank">
                  <IconTwitter className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
                <a href="instagram.com" target="_blank">
                  <IconInstagram className="h-5 w-5 text-secondary-900 text-opacity-50 hover:text-opacity-100" />
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="mb-2 text-xl font-bold text-secondary-700 lg:text-2xl">
                Abdulrahman Qandel
              </h4>
              <p className="font-roboto text-gray-600">Master Chef</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
