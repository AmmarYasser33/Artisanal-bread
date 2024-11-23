import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../util/Http";
import CartIem from "../components/CartIem";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";

export default function Cart() {
  const token = useSelector((state) => state.userInfo.token);

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCart(token),
    enabled: !!token,
  });

  return (
    <>
      <div className="bg-secondary-500 shadow-md">
        <Nav />
      </div>

      <section className="after:contents-[''] relative z-10 font-roboto after:absolute after:right-0 after:top-0 after:z-0 after:h-full after:bg-primary-50 xl:after:w-1/3">
        <div className="lg-6 relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
          <div className="grid grid-cols-12">
            <div className="col-span-12 w-full pb-8 pt-14 max-xl:mx-auto max-xl:max-w-3xl lg:py-20 lg:pr-8 xl:col-span-8">
              {isError && <p>Error retrieving cart</p>}
              {isLoading && <Spinner />}
              {!cartData && !isLoading && !isError && <p>Your cart is empty</p>}
              {cartData && cartData.data.cartItems.length === 0 && (
                <p>Your cart is empty</p>
              )}
              {cartData && cartData.data.cartItems.length > 0 && (
                <>
                  <div className="flex items-center justify-between border-b border-gray-300 pb-8">
                    <h2 className="font-manrope text-3xl font-bold leading-10 text-black">
                      Shopping Bag
                    </h2>
                    <h2 className="font-manrope text-xl font-bold leading-8 text-gray-600">
                      {cartData?.numberOfItems || 0} Products
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

                  {cartData.data.cartItems.map((item) => (
                    <CartIem
                      key={item._id}
                      id={item._id}
                      name={item.product.name}
                      image={item.product.image}
                      price={item.product.price}
                      category={item.product.category.name}
                      quantity={item.quantity}
                    />
                  ))}
                </>
              )}
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
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>

                  <div className="flex w-full pb-4">
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>

                  <div className="flex w-full pb-4">
                    <textarea
                      placeholder="Address"
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>

                  <div className="flex w-full items-center gap-4 pb-4">
                    <label
                      htmlFor="delivery-date"
                      className="text-base font-normal leading-6 text-gray-600"
                    >
                      Deliver At:
                    </label>
                    <input
                      type="date"
                      id="delivery-date"
                      className="h-11 grow rounded-lg border border-gray-300 bg-white py-2.5 pl-5 pr-8 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-200 py-8">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <p className="text-xl font-medium leading-8 text-black">
                          {cartData?.numberOfItems || 0} Products + Shipping
                        </p>
                        <p className="text-xl font-semibold leading-8 text-primary-700">
                          {cartData?.data?.totalPrice || 0} L.E
                        </p>
                      </>
                    )}
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
