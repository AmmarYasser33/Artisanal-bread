import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProducts, getCategories, addToCart } from "../util/Http";
import fetchCartCounter from "../Store/cartCounter-actions";
import { IconBagPlusFill } from "../Icons";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";

export default function Products() {
  const [categories, setCategories] = useState(["All"]);

  const token = useSelector((state) => state.userInfo.token);
  const dispatch = useDispatch();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate: addProductToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: (productId) => addToCart(token, productId),
    onSuccess: (data) => {
      if (data?.status === "success") {
        notifySuccess("Added to cart successfully");
        dispatch(fetchCartCounter(token));
      } else {
        notifyError("Failed to add to cart! Try again.");
      }
    },
    onError: () => {
      notifyError("Failed to add to cart!");
    },
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 0,
  });

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 0,
  });

  useEffect(() => {
    if (categoriesData && categoriesData.data) {
      setCategories([
        "All",
        ...new Set(
          categoriesData.data.map((category) => category.name.toLowerCase()),
        ),
      ]);
    }
  }, [categoriesData]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? productsData?.data
      : productsData?.data.filter(
          (product) => product.category.name.toLowerCase() === activeFilter,
        );

  if (isProductsError) return <p>Error retrieving products</p>;

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center space-x-0 px-1 font-roboto md:space-x-1">
        {isCategoriesLoading ? (
          <Spinner />
        ) : !isCategoriesError ? (
          categories?.map((filter) => (
            <button
              key={filter}
              className={`rounded-full px-6 py-2 font-medium hover:bg-primary-600 hover:text-white ${
                activeFilter === filter.toLowerCase()
                  ? "bg-primary-700 text-white"
                  : "text-secondary-700"
              }`}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </button>
          ))
        ) : (
          <button
            className={`rounded-full bg-primary-700 px-6 py-2 font-medium text-white hover:bg-primary-600 hover:text-white`}
          >
            All
          </button>
        )}
      </div>

      <div className="mx-auto mt-9 max-w-2xl px-4 sm:px-6 md:pb-16 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {isProductsLoading ? (
            <Spinner />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="group relative">
                {/* <Link to="/product"> */}
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={`http://localhost:3001/${product.image}`}
                    alt={`${product.name} image`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                {/* </Link> */}

                <h3 className="mt-4 text-base font-bold tracking-wide text-gray-800 drop-shadow-sm">
                  <div className="group-hover:text-primary-800">
                    {/* <Link to="/product" className="group-hover:text-primary-800"> */}
                    <span className="absolute inset-0" />
                    {product.name}
                    {/* </Link> */}
                  </div>
                </h3>

                <div className="flex items-center justify-between px-1">
                  <p className="text-center font-roboto text-lg font-medium text-gray-900">
                    {product.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => addProductToCart(product._id)}
                    disabled={isAddingToCart}
                    className="inline-flex items-center justify-center rounded-full p-2 text-primary-700 duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IconBagPlusFill className="inline-block h-6 w-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-10 text-center font-roboto text-2xl font-bold text-primary-700">
              No products found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
