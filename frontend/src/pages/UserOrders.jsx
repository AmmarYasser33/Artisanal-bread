import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrders, orderAgain, cancelOrder } from "../util/Http";
import OrderStatus from "../components/OrderStatus";
import Spinner from "../components/Spinner";

export default function UserOrders() {
  const [orderType, setOrderType] = useState("all");
  const [duration, setDuration] = useState("all time");
  const token = JSON.parse(localStorage.getItem("token"));

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: allOrders = [],
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    refetch: refreshOrders,
  } = useQuery({
    queryKey: ["orders", token],
    queryFn: () => getOrders(token),
    staleTime: 0,
    select: (res) => res.data,
  });

  const { mutate: cancelOrderMutation, isPending: isCanceling } = useMutation({
    mutationFn: (orderId) => cancelOrder(token, orderId),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Order cancelled successfully!");
        refreshOrders();
      } else {
        notifyError(
          data?.response?.data?.message || "Failed to cancel order! Try again.",
        );
      }
    },
    onError: () => {
      notifyError("Error cancelling order!");
    },
  });

  const { mutate: orderAgainMutation, isPending: isOrderingAgain } =
    useMutation({
      mutationFn: (orderId) => orderAgain(token, orderId),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess("Order placed successfully!");
          refreshOrders();
        } else {
          notifyError(
            data?.response?.data?.message ||
              "Failed to place order! Try again.",
          );
        }
      },
      onError: () => {
        notifyError("Error placing order!");
      },
    });

  // Filter orders based on selected order type and duration
  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesType =
        orderType === "all" || order.status.toLowerCase() === orderType;
      const matchesDuration = isOrderWithinDuration(order.createdAt, duration);
      return matchesType && matchesDuration;
    });
  }, [allOrders, orderType, duration]);

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              My orders
            </h2>
            {isOrdersError && (
              <button
                onClick={() => refreshOrders()}
                className="inline-flex items-center rounded-lg border border-primary-100 bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Retry
              </button>
            )}
            {isOrdersLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size={8} />
              </div>
            ) : (
              <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label
                    htmlFor="order-type"
                    className="sr-only mb-2 block text-sm font-medium text-gray-900"
                  >
                    Select order type
                  </label>
                  <select
                    defaultValue={"all"}
                    id="order-type"
                    className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    onChange={(e) => setOrderType(e.target.value)} // Update order type
                  >
                    <option value="all">All orders</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
                <span className="inline-block text-gray-500"> from </span>
                <div>
                  <label
                    htmlFor="duration"
                    className="sr-only mb-2 block text-sm font-medium text-gray-900"
                  >
                    Select duration
                  </label>
                  <select
                    defaultValue={"all time"}
                    id="duration"
                    className="block w-full min-w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    onChange={(e) => setDuration(e.target.value)} // Update duration
                  >
                    <option value="all time">All time</option>
                    <option value="this week">this week</option>
                    <option value="this month">this month</option>
                    <option value="last 3 months">last 3 months</option>
                    <option value="last 6 months">last 6 months</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200">
              {isOrdersError && (
                <div className="py-6 text-center">
                  <h4 className="text-xl font-bold text-red-700">
                    Error loading orders!
                  </h4>
                </div>
              )}
              {isOrdersLoading && (
                <div className="py-6 text-center">
                  <Spinner />
                </div>
              )}
              {allOrders && allOrders.length === 0 && (
                <div className="py-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900">
                    Order history is empty!
                  </h4>
                </div>
              )}
              {filteredOrders && filteredOrders.length > 0 && (
                <>
                  {filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500">
                          Order NO.:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                          <Link
                            to={`/dashboard/orders/${order._id}`}
                            className="hover:underline"
                          >
                            #{order.orderNumber}
                          </Link>
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500">
                          Date:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500">
                          Total:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900">
                          {order.totalPrice} L.E
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500">
                          Status:
                        </dt>
                        <OrderStatus status={order.status} />
                      </dl>
                      <div className="grid w-full gap-4 sm:grid-cols-2 xl:flex xl:w-64 xl:items-center xl:justify-end">
                        {order.status === "pending" ? (
                          <button
                            type="button"
                            className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:font-semibold hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isCanceling}
                            onClick={() => cancelOrderMutation(order._id)}
                          >
                            {isCanceling ? (
                              <Spinner size={6} />
                            ) : (
                              "Cancel order"
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isOrderingAgain}
                            onClick={() => orderAgainMutation(order._id)}
                          >
                            {isOrderingAgain ? (
                              <Spinner size={6} />
                            ) : (
                              "Order again"
                            )}
                          </button>
                        )}
                        <Link
                          to={`/dashboard/orders/${order._id}`}
                          className="inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:font-semibold hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to check if order is within the selected duration
function isOrderWithinDuration(createdDate, duration) {
  const now = new Date();
  const orderTime = new Date(createdDate);

  switch (duration) {
    case "this week": {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Start of this week
      return orderTime >= startOfWeek;
    }
    case "this month": {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return orderTime >= startOfMonth;
    }
    case "last 3 months": {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return orderTime >= threeMonthsAgo;
    }
    case "last 6 months": {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return orderTime >= sixMonthsAgo;
    }
    default:
      return true;
  }
}
