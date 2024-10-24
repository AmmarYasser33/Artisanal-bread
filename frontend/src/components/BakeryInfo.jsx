import {
  IconBreadSlice,
  IconCartPlus,
  IconCakeCandles,
  IconTruckDelivery,
} from "../Icons";

export default function BakeryInfo() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-40 sm:px-6 lg:flex-row lg:px-8">
      <div>
        <h2 className="mb-4 font-roboto text-xl font-extrabold uppercase text-primary-500">
          Our Services
        </h2>
        <h3 className="mb-8 text-[2.6rem] font-bold leading-10 text-secondary-500">
          What Do We Offer For You?
        </h3>

        <p className="mb-16 max-w-lg font-roboto text-base text-gray-600">
          Our bakery offers a wide range of products, from bread to cakes, and
          pastries to cookies. We guarantee the quality of our products and
          ensure that they are fresh and delicious.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary-500 p-2">
                <IconBreadSlice className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500">
                Quality Products
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              Producing the best quality products is our top priority.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary-500 p-2">
                <IconCakeCandles className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500">
                Custom Products
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              We offer custom products to meet your specific needs.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary-500 p-2">
                <IconCartPlus className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500">
                Online Order
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              You can order our products online and have them delivered to you.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary-500 p-2">
                <IconTruckDelivery className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-secondary-500">
                Home Delivery
              </h4>
            </div>
            <p className="max-w-60 font-roboto text-base text-gray-600">
              We offer this service to make it easier for you to get our
              products.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto my-32 h-48 w-40 border-[1rem] border-primary-50 bg-primary-500 md:h-96 md:w-[21rem] md:border-[1.57rem] lg:h-[28rem] lg:w-60 xl:h-96 xl:w-[21rem]">
        <img
          src="/service-1.jpg"
          alt="bakery service 1"
          className="absolute -top-14 left-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-top-20 sm:h-80 sm:w-64 md:left-[9.5rem] lg:left-24 lg:h-64 lg:w-52 xl:left-[9.5rem] xl:h-80 xl:w-64"
        />

        <img
          src="/service-2.jpg"
          alt="bakery service  2"
          className="absolute -bottom-10 right-20 z-10 h-64 w-52 max-w-[100rem] rounded-lg sm:-bottom-20 sm:h-80 sm:w-64 md:right-[9.5rem] lg:right-24 lg:h-64 lg:w-52 xl:right-[9.5rem] xl:h-80 xl:w-64"
        />
      </div>
    </div>
  );
}
