import { useTranslation } from "react-i18next";

export default function CourseRequirements({ requirements }) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-24 max-w-3xl px-4 pb-14 sm:px-6 md:pb-16 lg:max-w-6xl lg:px-8">
      <h2 className="relative mt-10 text-center text-2xl font-bold text-secondary-500 md:text-3xl rtl:font-roboto">
        {t("course.requirements.heading")}
        <span className="absolute -bottom-3 left-1/2 h-2 w-40 -translate-x-1/2 transform bg-primary-500 md:w-52"></span>
      </h2>

      <div className="mt-12 space-y-6">
        {requirements?.map((requirement, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="h-3 w-3 bg-primary-600"></div>
            <p className="font-roboto text-lg text-gray-700">{requirement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
