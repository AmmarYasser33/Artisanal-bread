import { useTranslation } from "react-i18next";
import {
  IconBreadSlice,
  IconCartPlus,
  IconCakeCandles,
  IconTruckDelivery,
} from "../Icons";

export default function BakeryInfo() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:flex-row lg:px-8 rtl:font-roboto rtl:tracking-wider">
      <div>
        <h2 className="mb-4 font-roboto text-xl font-extrabold uppercase text-primary-500 rtl:font-bold">
          {t("services.heading")}
        </h2>
        <h3 className="mb-8 text-[2.6rem] font-bold leading-10 text-secondary-500">
          {t("services.subheading")}
        </h3>

        <p className="mb-16 max-w-lg font-roboto text-base text-gray-600">
          {t("services.description")}
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="rounded-full bg-primary-500 p-2">
                <IconBreadSlice className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500">
                {t("services.service1.title")}
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              {t("services.service1.description")}
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="rounded-full bg-primary-500 p-2">
                <IconCakeCandles className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500 rtl:tracking-normal">
                {t("services.service2.title")}
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              {t("services.service2.description")}
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="rounded-full bg-primary-500 p-2">
                <IconCartPlus className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500 rtl:tracking-normal">
                {t("services.service3.title")}
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              {t("services.service3.description")}
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="rounded-full bg-primary-500 p-2">
                <IconTruckDelivery className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500 rtl:tracking-normal">
                {t("services.service4.title")}
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              {t("services.service4.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto my-32 h-48 w-40 border-[1rem] border-primary-50 bg-primary-500 md:h-96 md:w-[21rem] md:border-[1.57rem] lg:h-[28rem] lg:w-60 xl:h-96 xl:w-[21rem]">
        <img
          src="/service-1.jpg"
          alt="bakery service 1"
          className="absolute -top-14 left-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-top-20 sm:h-80 sm:w-64 md:left-[9.5rem] lg:left-24 lg:h-64 lg:w-52 xl:left-[9.5rem] xl:h-80 xl:w-64"
        />

        <img
          src="/service-2.jpg"
          alt="bakery service  2"
          className="absolute -bottom-10 right-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-bottom-20 sm:h-80 sm:w-64 md:right-[9.5rem] lg:right-24 lg:h-64 lg:w-52 xl:right-[9.5rem] xl:h-80 xl:w-64"
        />
      </div>
    </div>
  );
}
