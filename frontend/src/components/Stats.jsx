import {
  IconBadge,
  IconUserGroup,
  IconBreadSlice,
  IconCartPlus,
} from "../Icons";

const stats = [
  {
    title: "Years Experience",
    number: 50,
    icon: (
      <IconBadge className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
    ),
  },
  {
    title: "Skilled Professionals",
    number: 175,
    icon: (
      <IconUserGroup className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
    ),
  },
  {
    title: "Total Products",
    number: 86,
    icon: (
      <IconBreadSlice className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
    ),
  },
  {
    title: "Orders Placed",
    number: 9357,
    icon: (
      <IconCartPlus className="mx-auto h-20 w-20 flex-shrink-0 text-primary-700" />
    ),
  },
];

export default function Stats() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-roboto text-xl font-extrabold uppercase text-primary-500">
          Baking the Numbers
        </h2>
        <p className="text-lg font-semibold text-gray-500">Our Achievements</p>
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

              <p className="text-6xl font-extrabold">{stat.number}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
