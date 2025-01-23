import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import {
  IconBadge,
  IconUserGroup,
  IconBreadSlice,
  IconCartPlus,
} from "../Icons";

export default function Stats() {
  const { t } = useTranslation();
  const achievementsExperience = useSelector(
    (state) => state.configs.achievementsExperience,
  );
  const achievementsProfessionals = useSelector(
    (state) => state.configs.achievementsProfessionals,
  );
  const achievementsProducts = useSelector(
    (state) => state.configs.achievementsProducts,
  );
  const achievementsOrders = useSelector(
    (state) => state.configs.achievementsOrders,
  );

  const stats = [
    {
      title: t("home.stats.experience"),
      number: achievementsExperience,
      icon: (
        <IconBadge className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
      ),
    },
    {
      title: t("home.stats.professionals"),
      number: achievementsProfessionals,
      icon: (
        <IconUserGroup className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
      ),
    },
    {
      title: t("home.stats.products"),
      number: achievementsProducts,
      icon: (
        <IconBreadSlice className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
      ),
    },
    {
      title: t("home.stats.orders"),
      number: achievementsOrders,
      icon: (
        <IconCartPlus className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
      <div className="mb-8 text-center tracking-wide ltr:font-roboto rtl:font-cairo">
        <h2 className="uppercase text-primary-500 ltr:text-xl ltr:font-extrabold rtl:mb-2 rtl:text-3xl rtl:font-bold">
          {t("home.stats.heading")}
        </h2>
        <p className="font-semibold text-gray-500 ltr:text-lg rtl:text-xl">
          {t("home.stats.subheading")}
        </p>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <li
            key={stat.title}
            className="col-span-1 flex transform flex-col divide-y divide-gray-200 rounded-lg bg-primary-100 text-center shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:bg-primary-50"
          >
            <div className="flex flex-1 flex-col p-8">
              {stat.icon}
              <h3 className="mt-6 font-roboto text-lg font-medium text-gray-600">
                {stat.title}
              </h3>

              <p className="text-6xl font-extrabold">
                <CountUp
                  end={stat.number}
                  duration={4}
                  enableScrollSpy={true}
                />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
