import { Link, useParams } from "react-router-dom";
import { IconChevronLeft } from "../Icons";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getOrder, orderAgain, cancelOrder } from "../util/Http";
import OrderStatus from "../components/OrderStatus";
import Spinner from "../components/Spinner";

export default function UserOrder() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["order", token, id],
    queryFn: () => getOrder(token, id),
    staleTime: 0,
    select: (res) => res.data,
  });

  const { mutate: cancelOrderMutation, isPending: isCanceling } = useMutation({
    mutationFn: (orderId) => cancelOrder(token, orderId),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Order cancelled successfully!");
        refetchOrder();
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
          notifySuccess("Order placed again.");
          refetchOrder();
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

  return (
    <section className="space-y-6 bg-white py-2 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-5 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {isOrderLoading ? (
          <div className="flex h-80 items-center justify-center">
            <Spinner />
          </div>
        ) : isOrderError ? (
          <div className="flex h-80 items-center justify-center">
            <p className="text-lg font-semibold text-red-500">
              Failed to load order!
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">
            <div className="flex justify-end">
              <Link
                to="/dashboard/orders"
                className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-6 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:gap-1 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-primary-100"
              >
                <IconChevronLeft className="h-3 w-3" />
                <span>All Orders</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-secondary-700 sm:text-2xl">
                Order{" "}
                <span className="text-gray-500">#{order.orderNumber}</span>
              </h2>
              <OrderStatus status={order.status} />
            </div>

            <div className="mt-4 sm:mt-6">
              <section className="bg-white antialiased">
                <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                  <div className="mx-auto">
                    <p className="text-end text-sm font-medium text-gray-500">
                      Placed at {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <div className="space-y-4 border-b border-t border-gray-200 py-8">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Delivery information
                      </h4>

                      <div className="space-y-2">
                        <dl className="flex items-center gap-4">
                          <dt className="text-gray-500">Name :</dt>
                          <dd className="text-base font-medium text-gray-900">
                            {order.orderName}
                          </dd>
                        </dl>
                        <dl className="flex items-center gap-4">
                          <dt className="text-gray-500">Phone :</dt>
                          <dd className="text-base font-medium text-gray-900">
                            {order.orderPhone}
                          </dd>
                        </dl>
                        <dl className="flex items-center gap-4">
                          <dt className="text-gray-500">Address :</dt>
                          <dd className="text-base font-medium text-gray-900">
                            {order.orderAddress}
                          </dd>
                        </dl>
                        <dl className="flex items-center gap-4">
                          <dt className="text-gray-500">Deliver on :</dt>
                          <dd className="text-base font-medium text-gray-900">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                      <div className="relative overflow-x-auto border-b border-gray-200">
                        <table className="w-full text-left font-medium text-gray-900 md:table-fixed">
                          <tbody className="divide-y divide-gray-200">
                            {order.cartItems.map((item) => (
                              <tr key={item._id}>
                                <td className="whitespace-nowrap py-2 md:w-[384px]">
                                  <div className="flex items-center gap-4">
                                    <div className="aspect-square flex h-14 w-14 shrink-0 items-center">
                                      <img
                                        className="h-auto max-h-full w-full"
                                        src={`http://localhost:3001/${item?.product?.image}`}
                                        alt={`${item?.product?.name} image`}
                                      />
                                    </div>
                                    {item?.product?.name}
                                  </div>
                                </td>

                                <td className="p-4 text-base font-normal text-gray-900">
                                  x {item.quantity}
                                </td>

                                <td className="p-4 text-right text-base font-bold text-gray-900">
                                  {item.price * item.quantity} L.E
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4 space-y-6">
                        <h4 className="text-xl font-semibold text-gray-900">
                          Order summary
                        </h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-gray-500">Original price</dt>
                              <dd className="text-base font-medium text-gray-900">
                                {order.totalPrice - +order.shippingPrice} L.E
                              </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-gray-500">Shipping</dt>
                              <dd className="text-base font-medium text-gray-900">
                                {order.shippingPrice} L.E
                              </dd>
                            </dl>
                          </div>
                          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                            <dt className="text-lg font-bold text-gray-900">
                              Total
                            </dt>
                            <dd className="text-lg font-bold text-gray-900">
                              {order.totalPrice} L.E
                            </dd>
                          </dl>
                        </div>

                        <div className="flex justify-center md:justify-end">
                          {order.status === "delivered" ||
                            (order.status === "cancelled" && (
                              <button
                                type="button"
                                className="mt-4 w-full max-w-xs rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0"
                                disabled={isOrderingAgain}
                                onClick={() => orderAgainMutation(order._id)}
                              >
                                Order again
                              </button>
                            ))}
                          {order.status === "pending" && (
                            <button
                              type="button"
                              className="mt-4 w-full max-w-xs rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:font-semibold hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0"
                              disabled={isCanceling}
                              onClick={() => cancelOrderMutation(order._id)}
                            >
                              Cancel order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
