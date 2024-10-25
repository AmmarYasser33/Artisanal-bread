import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Raspberry Chocolate Cake",
    price: "75 L.E",
    imageSrc: "/product-1.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 2,
    name: "Eggless Chocolate Cake",
    price: "33 L.E",
    imageSrc: "/product-2.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 3,
    name: "Vanilla Cake",
    price: "50 L.E",
    imageSrc: "/product-3.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
  {
    id: 4,
    name: "Strawberry Cake",
    price: "60 L.E",
    imageSrc: "/product-2.jpg",
    imageAlt: "Hand stitched, orange leather long wallet.",
  },
];

export default function TrendingProducts() {
  return (
    <div className="bg-primary-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Trending Products
          </h2>

          <Link
            to="/products"
            className="rounded-md border border-transparent bg-primary-400 px-4 py-2 font-roboto text-base font-medium text-secondary-800 shadow-md hover:bg-primary-300"
          >
            All Products
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-0 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link to="/product">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 shadow-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </Link>

              <h3 className="mt-4 text-center text-base font-bold tracking-wide text-gray-800 drop-shadow-sm">
                <Link to="/product" className="group-hover:text-primary-800">
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>

              <p className="mt-1 text-center font-roboto text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
