export default function Stat({ icon, title, value, color }) {
  return (
    <div className="grid grid-cols-[4.2rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1">
      <div
        className={`flex items-center justify-center rounded-full bg-${color} row-span-full aspect-1`}
      >
        {icon}
      </div>
      <h5 className="self-end text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </h5>
      <p className="text-2xl font-medium leading-none">{value}</p>
    </div>
  );
}
