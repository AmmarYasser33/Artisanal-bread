import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/Http";
import { IconBxsEdit, IconPlusLg, IconTrashDelete } from "../Icons";
import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import EditProductModal from "../components/EditProductModal";
import Spinner from "../components/Spinner";

export default function AdminProducts() {
  const { i18n } = useTranslation();
  const isArLang = localStorage.getItem("i18nextLng") === "ar";
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products", i18n.language],
    queryFn: () => getProducts(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              Products
            </h2>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-4 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-primary-600 focus:outline-none"
            >
              <IconPlusLg className="mr-1 h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="mt-6 overflow-x-scroll sm:mt-8">
            {isProductsLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isProductsError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error fetching products!
                </p>
              </div>
            )}
            {products && products.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-secondary-800">
                  No products! Add a product to get started.
                </p>
              </div>
            )}
            {products && products.length > 0 && (
              <table className="w-full text-left text-base shadow-sm rtl:text-right">
                <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
                  <tr className="">
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      اسم المنتج
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <td className="w-4 p-4">
                        <div className="flex max-h-full w-16 max-w-full items-center drop-shadow-sm md:w-32">
                          <img
                            src={`http://localhost:3001/${product.image}`}
                            className="rounded-md"
                            alt="product image"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {product.enName}
                      </th>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {product.arName}
                      </th>
                      <td className="px-6 py-4">
                        {isArLang
                          ? product.category.arName
                          : product.category.enName}
                      </td>
                      <td className="px-6 py-4">{product.price} L.E</td>
                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center justify-center rounded-lg bg-primary-300 px-2 py-1 text-sm text-secondary-700 hover:bg-primary-600"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <IconBxsEdit className="h-4 w-4" />
                          <span className="sr-only">Edit Product</span>
                        </button>
                        <button
                          className="ml-2 inline-flex items-center justify-center rounded-lg bg-red-400 px-2 py-1 text-sm text-secondary-700 hover:bg-red-600"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <IconTrashDelete className="h-4 w-4" />
                          <span className="sr-only">Delete Product</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add modal */}
      {isAddModalOpen && (
        <AddProductModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}

      {/* Delete modal */}
      {selectedProduct?._id && isDeleteModalOpen && (
        <DeleteProductModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          productId={selectedProduct?._id}
          setProductId={setSelectedProduct}
        />
      )}

      {/* Edit modal */}
      {selectedProduct && isEditModalOpen && (
        <EditProductModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          product={selectedProduct}
          setProduct={setSelectedProduct}
        />
      )}
    </section>
  );
}
