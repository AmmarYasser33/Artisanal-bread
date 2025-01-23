import { useTranslation } from "react-i18next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ComponentBreadcrumbFilled } from "../Icons";

export default function Services() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative min-h-[30vh] md:min-h-[50vh]">
        {/* Background Image */}
        <img
          src={`https://whitecaps.in/storage/2023/04/IMG_0868-1.jpg`}
          alt="Background Image"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <Nav />

          <div className="container mx-auto py-14 text-center rtl:font-cairo">
            <h1 className="mx-auto max-w-2xl text-xl font-bold tracking-wide text-white md:my-10 md:max-w-5xl md:text-3xl">
              {t("services.heading")}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 font-roboto max-md:px-12">
        <div className="flex flex-col justify-around gap-12 md:flex-row">
          <div className="max-md:me-auto">
            <h4 className="mb-6 text-3xl font-bold uppercase text-secondary-500">
              {t("services.pastry")}
            </h4>

            <div className="flex flex-col space-y-5">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="rounded-full bg-primary-500 p-2">
                  <ComponentBreadcrumbFilled className="h-4 w-4 text-white rtl:scale-x-[-1]" />
                </div>
                <h4 className="text-xl text-secondary-500">
                  {t("services.readyToBake")}
                </h4>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="rounded-full bg-primary-500 p-2">
                  <ComponentBreadcrumbFilled className="h-4 w-4 text-white rtl:scale-x-[-1]" />
                </div>
                <h4 className="text-xl text-secondary-500">
                  {t("services.readyToProof")}
                </h4>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="rounded-full bg-primary-500 p-2">
                  <ComponentBreadcrumbFilled className="h-4 w-4 text-white rtl:scale-x-[-1]" />
                </div>
                <h4 className="text-xl text-secondary-500">
                  {t("services.readyBaked")}
                </h4>
              </div>
            </div>
          </div>

          <div className="max-md:ms-auto">
            <h4 className="mb-6 text-3xl font-bold uppercase text-secondary-500">
              {t("services.Bakery")}
            </h4>

            <div className="flex flex-col space-y-5">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="rounded-full bg-primary-500 p-2">
                  <ComponentBreadcrumbFilled className="h-4 w-4 text-white rtl:scale-x-[-1]" />
                </div>
                <h4 className="text-xl text-secondary-500">
                  {t("services.readyBaked")}
                </h4>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="rounded-full bg-primary-500 p-2">
                  <ComponentBreadcrumbFilled className="h-4 w-4 text-white rtl:scale-x-[-1]" />
                </div>
                <h4 className="text-xl text-secondary-500">
                  {t("services.halfBaked")}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </>
  );
}
