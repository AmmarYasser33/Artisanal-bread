import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTrendingProducts, addToCart } from "../util/Http";
import fetchCartCounter from "../Store/cartCounter-actions";
import { IconBagPlusFill } from "../Icons";
import Spinner from "../components/Spinner";

export default function TrendingProducts() {
  const token = useSelector((state) => state.userInfo.token);
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  const role = useSelector((state) => state.userInfo.role);
  const isArLang = localStorage.getItem("i18nextLng") === "ar";
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trendingProducts", i18n.language],
    queryFn: getTrendingProducts,
    staleTime: 0,
    select: (res) => res.data,
  });

  const { mutate: addProductToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: (productId) => addToCart(token, productId),
    onSuccess: (data) => {
      if (data?.status === "success") {
        notifySuccess(t("cart.add.success"));
        dispatch(fetchCartCounter(token));
      } else {
        notifyError(data?.response?.data?.message || t("cart.add.error"));
      }
    },
    onError: () => {
      notifyError(t("cart.add.error"));
    },
  });

  return (
    <div className="bg-primary-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl text-gray-900 ltr:font-sans ltr:font-extrabold ltr:tracking-tight rtl:font-roboto rtl:font-bold rtl:tracking-normal">
            {t("trending.heading")}
          </h2>

          <Link
            to="/products"
            className="rounded-md border border-transparent bg-primary-400 px-4 py-2 font-roboto text-base font-medium text-secondary-800 shadow-md hover:bg-primary-300"
          >
            {t("trending.allProducts")}
          </Link>
        </div>

        {isLoading && (
          <div className="py-24">
            <Spinner />
          </div>
        )}

        {isError && (
          <div className="py-20">
            <p className="text-center font-roboto text-2xl font-semibold text-red-600">
              {t("products.fetch.error")}
            </p>
          </div>
        )}

        {!isLoading && !isError && products && (
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-0 lg:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                {/* <Link to="/product"> */}
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={`http://localhost:3001/${product.image}`}
                    alt="product image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                {/* </Link> */}

                <h3 className="mt-4 text-base font-bold tracking-wide text-gray-800 drop-shadow-sm">
                  <div className="group-hover:text-primary-800">
                    {/* <Link to="/product" className="group-hover:text-primary-800"> */}
                    <span className="absolute inset-0" />
                    {isArLang ? product.arName : product.enName}
                    {/* </Link> */}
                  </div>
                </h3>

                <div className="flex items-center justify-between px-1">
                  <p className="text-center font-roboto text-lg font-medium text-gray-900">
                    {product.price} {t("currency")}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (isLogin && role === "admin") {
                        notifyError(t("products.order.admin"));
                      } else if (isLogin) {
                        addProductToCart(product._id);
                      } else {
                        notifyError(t("products.order.login"));
                      }
                    }}
                    disabled={isAddingToCart}
                    className="inline-flex items-center justify-center rounded-full p-2 text-primary-700 duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IconBagPlusFill className="inline-block h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
