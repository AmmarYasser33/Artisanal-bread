import { Link } from "react-router-dom";
import { IconTruckDeliveryOutline, IconCheck2, IconClose } from "../Icons";

export default function UserOrders() {
  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              My orders
            </h2>
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900"
                >
                  Select order type
                </label>
                <select
                  id="order-type"
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option selected>All orders</option>
                  <option value="transit">In transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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
                  id="duration"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option selected>this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">the last 3 months</option>
                  <option value="last 6 months">the last 6 months</option>
                  <option value="this year">this year</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200">
              {/* Order #1 */}
              <div className="flex flex-wrap items-center gap-y-4 py-6">
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Order ID:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    <Link to="/dashboard/orders/1" className="hover:underline">
                      #FWB125467
                    </Link>
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">Date:</dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    11-12-2024
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Total:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    499 L.E
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Status:
                  </dt>
                  <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    <IconTruckDeliveryOutline className="me-1 h-3 w-3" />
                    In transit
                  </dd>
                </dl>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:font-semibold hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    Cancel order
                  </button>
                  <Link
                    to="/dashboard/orders/1"
                    className="inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:font-semibold hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    View details
                  </Link>
                </div>
              </div>
              {/* Order #2 */}
              <div className="flex flex-wrap items-center gap-y-4 py-6">
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Order ID:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    <Link to="/dashboard/orders/2" className="hover:underline">
                      #FWB139485
                    </Link>
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">Date:</dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    08-12-2024
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Total:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    85 L.E
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Status:
                  </dt>
                  <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    <IconCheck2 className="me-1 h-3 w-3" />
                    Delivered
                  </dd>
                </dl>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  >
                    Order again
                  </button>
                  <Link
                    to="/dashboard/orders/2"
                    className="inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:font-semibold hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    View details
                  </Link>
                </div>
              </div>
              {/* Order #3 */}
              <div className="flex flex-wrap items-center gap-y-4 py-6">
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Order ID:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    <Link to="/dashboard/orders/3" className="hover:underline">
                      #FWB139485
                    </Link>
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">Date:</dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    08-12-2024
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Total:
                  </dt>
                  <dd className="mt-1.5 text-base font-semibold text-gray-900">
                    85 L.E
                  </dd>
                </dl>
                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt className="text-base font-medium text-gray-500">
                    Status:
                  </dt>
                  <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    <IconClose className="me-1 h-3 w-3" />
                    Cancelled
                  </dd>
                </dl>
                <div className="grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                  >
                    Order again
                  </button>
                  <Link
                    to="/dashboard/orders/3"
                    className="inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:font-semibold hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
