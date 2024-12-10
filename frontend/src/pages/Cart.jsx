import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { cartActions } from "../Store/cartCounter-slice";
import { getCart, createOrder } from "../util/Http";
import CartIem from "../components/CartIem";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";

export default function Cart() {
  const token = useSelector((state) => state.userInfo.token);
  const user = useSelector((state) => state.profileInfo.data);
  const shippingPrice = useSelector((state) => state.configs.shippingPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCart(token),
    enabled: !!token,
  });

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: (orderData) =>
      createOrder(token, cartData?.data?._id, orderData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Order placed successfully!");
        navigate(`/dashboard/orders/${data.data._id}`);
        dispatch(cartActions.setCounter(0));
      } else {
        notifyError(
          data?.response?.data?.message || "Error creating order! Try again.",
        );
      }
    },
    onError: () => {
      notifyError("Error creating order!");
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    placeOrder(data);
  };

  useEffect(() => {
    reset({
      orderName: user?.firstName
        ? user?.firstName + " "
        : "" + (user?.lastName || ""),
      orderPhone: user?.phone || "",
      orderAddress: user?.address || "",
      orderDate: new Date(Date.now() + 27 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
    });
  }, [reset, user]);

  return (
    <>
      <div className="bg-secondary-500 shadow-md">
        <Nav />
      </div>

      <section className="after:contents-[''] relative z-10 font-roboto after:absolute after:right-0 after:top-0 after:z-0 after:h-full after:bg-primary-50 xl:after:w-1/3">
        <div className="lg-6 relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
          <div className="grid grid-cols-12">
            <div className="col-span-12 w-full pb-8 pt-14 max-xl:mx-auto max-xl:max-w-3xl lg:py-20 lg:pr-8 xl:col-span-8">
              {isError && (
                <h3 className="text-3xl font-bold text-red-600">
                  Error retrieving cart!
                </h3>
              )}
              {isLoading && <Spinner />}
              {!cartData && !isLoading && !isError && (
                <h3 className="text-3xl font-bold">Start shopping now!</h3>
              )}
              {cartData && cartData.data.cartItems.length === 0 && (
                <h3 className="text-3xl font-bold">Start shopping now!</h3>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex w-full pb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("orderName", { required: true })}
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>
                  {errors.orderName && (
                    <p className="mb-3 text-sm text-red-600">
                      Name is required
                    </p>
                  )}

                  <div className="flex w-full pb-4">
                    <input
                      type="tel"
                      placeholder="Phone"
                      {...register("orderPhone", {
                        required: true,
                        pattern: /^(010|011|012|015)\d{8}$/,
                      })}
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>
                  {errors.orderPhone && (
                    <p className="mb-3 text-sm text-red-600">
                      Enter a valid EGY phone number
                    </p>
                  )}

                  <div className="flex w-full pb-4">
                    <textarea
                      placeholder="Address"
                      {...register("orderAddress", { required: true })}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>
                  {errors.orderAddress && (
                    <p className="mb-3 text-sm text-red-600">
                      Address is required
                    </p>
                  )}

                  <div className="flex w-full items-center gap-4 pb-4">
                    <label
                      htmlFor="delivery-date"
                      className="text-base font-normal leading-6 text-gray-600"
                    >
                      Deliver At:
                    </label>
                    <input
                      type="datetime-local"
                      id="delivery-date"
                      {...register("orderDate", {
                        required: "Date is required",
                        validate: (value) => {
                          const inputDate = new Date(value);
                          const currentDate = new Date();
                          const diffInHours =
                            (inputDate - currentDate) / (1000 * 60 * 60);
                          return (
                            diffInHours >= 24 ||
                            "Date must be at least 24 hours from now"
                          );
                        },
                      })}
                      className="h-11 grow rounded-lg border border-gray-300 bg-white py-2.5 pl-5 text-base font-normal text-black placeholder-gray-500 outline-none focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
                    />
                  </div>
                  {errors.orderDate && (
                    <p className="mb-3 text-sm text-red-600">
                      {errors.orderDate.message}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-gray-200 py-8">
                    {isLoading ? (
                      <div className="flex w-full items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <p className="text-xl font-medium leading-8 text-black">
                          {cartData?.numberOfItems || 0} Products + Shipping
                        </p>
                        <p className="text-xl font-semibold leading-8 text-primary-700">
                          {cartData?.data?.totalPrice + +shippingPrice || 0} L.E
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-xl bg-primary-600 px-6 py-3 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? "Ordering..." : "Order Now"}
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
