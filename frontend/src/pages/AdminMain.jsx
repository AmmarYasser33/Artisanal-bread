import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getStatics } from "../util/Http";
import Stat from "../components/Stat";
import Spinner from "../components/Spinner";
const AdminLatestOrders = React.lazy(
  () => import("../components/AdminLatestOrders"),
);
import {
  IconCashCoin,
  IconTruckDeliveryOutline,
  IconVideo,
  IconUserGroup,
  IconBoxesPacking,
  IconBarChart,
} from "../Icons";

export default function AdminMain() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last") || 90;

  const {
    data: statics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statics", lastDays],
    queryFn: () => getStatics(token, lastDays),
    staleTime: 0,
    enabled: !!token,
    select: (res) => res.data,
  });

  const stats = [
    {
      title: "Sales",
      value: statics?.totalSales.toLocaleString() + " L.E",
      color: "green-100",
      icon: <IconCashCoin className="h-8 w-8 text-green-700" />,
    },
    {
      title: "AVG Order",
      value: statics?.avgOrderPrice.toLocaleString() + " L.E",
      color: "blue-100",
      icon: <IconBarChart className="h-8 w-8 text-blue-700" />,
    },
    {
      title: "Deliveries",
      value: statics?.deliveries.toLocaleString(),
      color: "red-100",
      icon: <IconTruckDeliveryOutline className="h-8 w-8 text-red-700" />,
    },
    {
      title: "Courses Sold",
      value: statics?.coursesSold.toLocaleString(),
      color: "red-100",
      icon: <IconVideo className="h-8 w-8 text-red-700" />,
    },
    {
      title: "Orders",
      value: statics?.ordersCount.toLocaleString(),
      color: "green-100",
      icon: <IconBoxesPacking className="h-8 w-8 text-green-700" />,
    },
    {
      title: "Users",
      value: statics?.totalUsers.toLocaleString(),
      color: "blue-100",
      icon: <IconUserGroup className="h-8 w-8 text-blue-700" />,
    },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 4,
    },
    markers: {
      size: 5,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.8,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      type: "datetime",
      categories: Array.from({ length: parseInt(lastDays) }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0] + " GMT";
      }),
      labels: {
        show: true,
        datetimeUTC: false,
        datetimeFormatter: {
          day: "dd",
        },
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "lg:text-base text-sm font-medium fill-gray-600 ",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "lg:text-base text-sm font-medium fill-gray-600 ",
        },
        // formatter: function (value) {
        //   return "L.E" + value;
        // },
      },
      stepSize: 250,
    },
    tooltip: {
      x: {
        format: "dd MMM",
      },
    },
    // theme: {
    //   mode: "light",
    //   palette: "palette10",
    // },
    series: [
      {
        name: "Revenue",
        // data: [1000, 1009, 420, 510, 280, 400, 301],
        data: statics?.dailySales.map((item) => item.sales).reverse() || [],
        color: "#b37526",
      },
    ],
  };

  return (
    <div className="space-y-10 bg-primary-100 shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 lg:col-span-9 lg:px-0">
      {isLoading && (
        <div className="py-24">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="py-24">
          <p className="text-center text-xl font-semibold text-red-600">
            Error getting data! Please try again later.
          </p>
        </div>
      )}

      {!isLoading && !isError && statics && (
        <main className="container mx-auto mt-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-end">
            <Filter
              filterField="last"
              options={[
                { value: "90", label: "Last 90 days" },
                { value: "30", label: "Last 30 days" },
                { value: "7", label: "Last 7 days" },
              ]}
            />
          </div>

          <div className="mb-8">
            <dl className="mt-5 grid grid-cols-1 divide-x divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow duration-200 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="px-4 py-5 hover:bg-gray-50 sm:p-6"
                >
                  <Stat
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    color={item.color}
                  />
                </div>
              ))}
            </dl>
          </div>

          <div className="w-full rounded-lg bg-white px-2.5 py-5 shadow">
            <ReactApexChart
              options={chartOptions}
              series={chartOptions.series}
              type="area"
              height={320}
            />
          </div>

          <Suspense fallback={<Spinner />}>
            <AdminLatestOrders />
          </Suspense>
        </main>
      )}
    </div>
  );
}

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-1 rounded-md border border-gray-100 bg-white p-1 shadow-sm">
      {options?.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`rounded-md px-3 py-1 text-base font-medium transition-all ${
            option.value === currentFilter
              ? "bg-primary-700 text-primary-50"
              : ""
          } hover:bg-primary-700 hover:text-primary-50`}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
