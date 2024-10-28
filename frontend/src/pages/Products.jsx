import { useState } from "react";
import { IconBagPlusFill } from "../Icons";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";

const categories = ["All", "Bread", "Cakes", "Cookies", "Pastries"];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Raspberry Chocolate Cake",
      price: "75 L.E",
      imageSrc: "/product-1.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "cakes",
    },
    {
      id: 2,
      name: "Eggless Chocolate Cake",
      price: "33 L.E",
      imageSrc: "/product-2.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "cakes",
    },
    {
      id: 3,
      name: "Vanilla Cake",
      price: "50 L.E",
      imageSrc: "/product-3.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "bread",
    },
    {
      id: 4,
      name: "Strawberry Cake",
      price: "60 L.E",
      imageSrc: "/product-2.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "pastries",
    },
    {
      id: 5,
      name: "Raspberry Chocolate Cake",
      price: "75 L.E",
      imageSrc: "/product-1.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "cakes",
    },
    {
      id: 6,
      name: "Eggless Chocolate Cake",
      price: "33 L.E",
      imageSrc: "/product-2.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "cakes",
    },
    {
      id: 7,
      name: "Vanilla Cake",
      price: "50 L.E",
      imageSrc: "/product-3.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "bread",
    },
    {
      id: 8,
      name: "Strawberry Cake",
      price: "60 L.E",
      imageSrc: "/product-2.jpg",
      imageAlt: "Hand stitched, orange leather long wallet.",
      category: "pastries",
    },
  ]);

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === activeFilter,
        );

  if (!products) return <Spinner />;

  return (
    <div className="min-h-screen bg-primary-50">
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center space-x-0 px-1 font-roboto md:space-x-1">
        {categories.map((filter) => (
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
        ))}
      </div>

      <div className="mx-auto mt-9 max-w-2xl px-4 sm:px-6 md:pb-16 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                {/* <Link to="/product"> */}
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
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
                    onClick={() => console.log("Add to cart")}
                    className="inline-flex items-center justify-center rounded-full p-2 text-primary-700 duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none"
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
