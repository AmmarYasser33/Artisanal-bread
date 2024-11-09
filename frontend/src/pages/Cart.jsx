import { IconMathMinus, IconPlusLg, IconTrashDelete } from "../Icons";
import Nav from "../components/Nav";
import NumberControl from "../components/NumberControl";

export default function Cart() {
  return (
    <>
      <div className="bg-secondary-500 shadow-md">
        <Nav />
      </div>

      <section className="after:contents-[''] relative z-10 font-roboto after:absolute after:right-0 after:top-0 after:z-0 after:h-full after:bg-primary-50 xl:after:w-1/3">
        <div className="lg-6 relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
          <div className="grid grid-cols-12">
            <div className="col-span-12 w-full pb-8 pt-14 max-xl:mx-auto max-xl:max-w-3xl lg:py-20 lg:pr-8 xl:col-span-8">
              <div className="flex items-center justify-between border-b border-gray-300 pb-8">
                <h2 className="font-manrope text-3xl font-bold leading-10 text-black">
                  Shopping Bag
                </h2>
                <h2 className="font-manrope text-xl font-bold leading-8 text-gray-600">
                  2 Products
                </h2>
              </div>
              <div className="mt-8 grid grid-cols-12 border-b border-gray-200 pb-6 max-md:hidden">
                <div className="col-span-12 md:col-span-7">
                  <p className="text-lg font-normal leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="text-center text-lg font-normal leading-8 text-gray-400">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-center text-lg font-normal leading-8 text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 border-b border-gray-200 py-6 min-[500px]:flex-row min-[500px]:items-center">
                <div className="w-full px-16 min-[500px]:px-0 md:max-w-32">
                  <img
                    src="/public/product-1.jpg"
                    alt="perfume bottle image"
                    className="mx-auto rounded-xl md:rounded-md"
                  />
                </div>
                <div className="grid w-full grid-cols-1 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-3 max-[500px]:items-center">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        Chocolate Cake
                      </h6>
                      <h6 className="text-base font-normal leading-7 text-gray-500">
                        Cakes
                      </h6>
                      <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300">
                        <span className="mr-1">40.00</span>
                        L.E
                      </h6>
                    </div>
                  </div>

                  <NumberControl value={1} min={1} max={500} />

                  <div className="flex h-full flex-col items-start gap-3 max-md:mt-3 max-[500px]:items-center max-[500px]:justify-center md:items-end md:justify-end">
                    <p className="text-center text-lg font-bold leading-8 text-gray-600 transition-all duration-300">
                      $40.00
                    </p>

                    <button className="group flex items-center justify-center rounded-full focus-within:outline-red-500">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 transition-all duration-200 group-hover:bg-red-400">
                        <span className="sr-only">Delete</span>
                        <IconTrashDelete className="h-6 w-6 text-red-500 group-hover:text-white md:h-5 md:w-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 border-b border-gray-200 py-6 min-[500px]:flex-row min-[500px]:items-center">
                <div className="w-full px-16 min-[500px]:px-0 md:max-w-32">
                  <img
                    src="/public/product-2.jpg"
                    alt="perfume bottle image"
                    className="mx-auto rounded-xl md:rounded-md"
                  />
                </div>
                <div className="grid w-full grid-cols-1 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-3 max-[500px]:items-center">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        Fresh Bread
                      </h6>
                      <h6 className="text-base font-normal leading-7 text-gray-500">
                        Bread
                      </h6>
                      <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300">
                        {/* $35.00 */}
                        <span className="mr-1">35.00</span>
                        L.E
                      </h6>
                    </div>
                  </div>

                  <NumberControl value={2} min={1} max={500} />

                  <div className="flex h-full flex-col items-start gap-3 max-md:mt-3 max-[500px]:items-center max-[500px]:justify-center md:items-end md:justify-end">
                    <p className="text-center text-lg font-bold leading-8 text-gray-600 transition-all duration-300">
                      $70.00
                    </p>

                    <button className="group flex items-center justify-center rounded-full focus-within:outline-red-500">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 transition-all duration-200 group-hover:bg-red-400">
                        <span className="sr-only">Delete</span>
                        <IconTrashDelete className="h-6 w-6 text-red-500 group-hover:text-white md:h-5 md:w-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 mx-auto w-full max-w-3xl bg-primary-50 py-20 max-xl:px-6 lg:pl-8 xl:col-span-4 xl:max-w-lg">
              <h2 className="font-manrope border-b border-gray-300 pb-8 text-3xl font-bold leading-10 text-black">
                Order Info.
              </h2>
              <div className="mt-8">
                <form>
                  <div className="flex w-full pb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-primary-700"
                    />
                  </div>

                  <div className="flex w-full pb-4">
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-primary-700"
                    />
                  </div>

                  <div className="flex w-full pb-4">
                    <textarea
                      placeholder="Address"
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:outline-none focus:ring-2 focus:ring-primary-700"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-200 py-8">
                    <p className="text-xl font-medium leading-8 text-black">
                      2 Products + Shipping
                    </p>
                    <p className="text-xl font-semibold leading-8 text-primary-700">
                      $114.00
                    </p>
                  </div>
                  <button className="w-full rounded-xl bg-primary-600 px-6 py-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-800">
                    Order Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
