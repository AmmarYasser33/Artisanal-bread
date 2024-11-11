import { Link, useParams } from "react-router-dom";
import {
  IconChevronLeft,
  IconTruckDeliveryOutline,
  IconCheck2,
  IconClose,
} from "../Icons";

export default function UserOrder() {
  const { id } = useParams();

  return (
    <section className="space-y-6 bg-white py-2 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-5 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
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
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Order #{id}
            </h2>
            <span className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <IconCheck2 className="me-1 h-3 w-3" />
              Confirmed
            </span>
            {/* <span className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              <IconClose className="me-1 h-3 w-3" />
              Cancelled
            </span> */}
            {/* <span className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
              <IconTruckDeliveryOutline className="me-1 h-3 w-3" />
              In transit
            </span> */}
          </div>

          <div className="mt-4 sm:mt-6">
            <section className="bg-white antialiased">
              <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto">
                  <p className="text-end text-sm font-medium text-gray-500">
                    Placed at 2025-08-01
                  </p>

                  <div className="space-y-4 border-b border-t border-gray-200 py-8">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Delivery information
                    </h4>

                    {/* (name, phone, address) */}

                    <div className="space-y-2">
                      <dl className="flex items-center gap-4">
                        <dt className="text-gray-500">Name :</dt>
                        <dd className="text-base font-medium text-gray-900">
                          Ahmed Mohamed
                        </dd>
                      </dl>
                      <dl className="flex items-center gap-4">
                        <dt className="text-gray-500">Phone :</dt>
                        <dd className="text-base font-medium text-gray-900">
                          +201234567890
                        </dd>
                      </dl>
                      <dl className="flex items-center gap-4">
                        <dt className="text-gray-500">Address :</dt>
                        <dd className="text-base font-medium text-gray-900">
                          123 Street, City, Country
                        </dd>
                      </dl>
                      <dl className="flex items-center gap-4">
                        <dt className="text-gray-500">Deliver on :</dt>
                        <dd className="text-base font-medium text-gray-900">
                          2025-09-01
                        </dd>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <div className="relative overflow-x-auto border-b border-gray-200">
                      <table className="w-full text-left font-medium text-gray-900 md:table-fixed">
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="whitespace-nowrap py-2 md:w-[384px]">
                              <div className="flex items-center gap-4">
                                <div className="aspect-square flex h-14 w-14 shrink-0 items-center">
                                  <img
                                    className="h-auto max-h-full w-full"
                                    src="/product-1.jpg"
                                    alt="imac image"
                                  />
                                </div>
                                Apple iMac 27”
                              </div>
                            </td>

                            <td className="p-4 text-base font-normal text-gray-900">
                              x 1
                            </td>

                            <td className="p-4 text-right text-base font-bold text-gray-900">
                              1,499 L.E
                            </td>
                          </tr>

                          <tr>
                            <td className="whitespace-nowrap py-2 md:w-[384px]">
                              <div className="flex items-center gap-4">
                                <div className="aspect-square flex h-14 w-14 shrink-0 items-center">
                                  <img
                                    className="h-auto max-h-full w-full"
                                    src="/product-2.jpg"
                                    alt="imac image"
                                  />
                                </div>
                                Apple iMac 27”
                              </div>
                            </td>

                            <td className="p-4 text-base font-normal text-gray-900">
                              x 3
                            </td>

                            <td className="p-4 text-right text-base font-bold text-gray-900">
                              4,593 L.E
                            </td>
                          </tr>
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
                              6,592.00 L.E
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500">Shipping</dt>
                            <dd className="text-base font-medium text-gray-900">
                              599 L.E
                            </dd>
                          </dl>
                        </div>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                          <dt className="text-lg font-bold text-gray-900">
                            Total
                          </dt>
                          <dd className="text-lg font-bold text-gray-900">
                            7,191.00 L.E
                          </dd>
                        </dl>
                      </div>

                      <div className="flex justify-center md:justify-end">
                        <button
                          type="submit"
                          className="mt-4 w-full max-w-xs rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:mt-0"
                        >
                          Order again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
