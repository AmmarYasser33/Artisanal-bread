import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestOrders } from "../util/Http";
import Spinner from "./Spinner";
import OrderStatus from "./OrderStatus";
import { IconChevronLeft } from "../Icons";

export default function AdminLatestOrders() {
  const token = JSON.parse(localStorage.getItem("token"));

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestOrders", token],
    queryFn: () => getLatestOrders(token, 5),
    enabled: !!token,
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <div className="my-10 overflow-x-scroll rounded-lg bg-white px-4 py-8 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="bg-white text-left text-xl font-semibold text-gray-900">
          Latest Orders
        </h2>

        <Link
          to="/admin/orders"
          className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-6 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:gap-1 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-primary-100"
        >
          <IconChevronLeft className="h-3 w-3" />
          <span>All Orders</span>
        </Link>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <h3 className="text-center text-xl font-semibold text-red-600">
          Error getting orders!
        </h3>
      )}

      {!isLoading && !isError && orders && (
        <table className="w-full text-left text-sm shadow-sm">
          <thead className="border-b border-slate-200 bg-gray-50 text-xs uppercase text-gray-700">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-3 py-3">
                Customer
              </th>
              <th scope="col" className="px-3 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {/* <tr className="border-b bg-white hover:bg-gray-50">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                #52H31
              </th>
              <td className="px-3 py-4">
                <span className="font-semibold">Ammar Yasser</span>
              </td>
              <td className="px-6 py-4 text-gray-500">2023-09-01</td>
              <td className="px-6 py-4">
                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  <IconTruckDeliveryOutline className="me-1 h-3 w-3" />
                  In transit
                </dd>
              </td>
            </tr> */}
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b bg-white hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="hover:underline"
                  >
                    #{order._id}
                  </Link>
                </th>
                <td className="px-3 py-4">
                  <span className="font-semibold">{order.orderName}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="font-semibold">{order.totalPrice}</span> L.E
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <OrderStatus status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
