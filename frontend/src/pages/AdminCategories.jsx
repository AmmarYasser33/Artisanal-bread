import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../util/Http";
import { IconPlusLg, IconTrashDelete } from "../Icons";
import AddCategoryModal from "../components/AddCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";
import Spinner from "../components/Spinner";

export default function AdminCategories() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              Categories
            </h2>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-0 rounded-md border border-transparent bg-[var(--color-primary-300)] px-4 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-[var(--color-primary-600)] focus:outline-none"
            >
              <IconPlusLg className="mr-1 h-4 w-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="mt-6 overflow-x-scroll sm:mt-8">
            {isCategoriesLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isCategoriesError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error fetching categories!
                </p>
              </div>
            )}
            {categories && categories.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-secondary-800">
                  No categories! Add a category to get started.
                </p>
              </div>
            )}
            {categories && categories.length > 0 && (
              <table className="mx-auto w-full max-w-3xl text-left text-base shadow-sm rtl:text-right">
                <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
                  <tr className="">
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Arabic Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {category.enName}
                      </th>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {category.arName}
                      </th>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(category.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="ml-2 inline-flex items-center justify-center rounded-lg bg-red-400 px-2 py-1 text-sm text-secondary-700 hover:bg-red-600"
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <IconTrashDelete className="h-4 w-4" />
                          <span className="sr-only">Delete Category</span>
                          <span className="hidden text-xs sm:inline">
                            Delete
                          </span>
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
        <AddCategoryModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}

      {/* Delete modal */}
      {selectedCategory?._id && isDeleteModalOpen && (
        <DeleteCategoryModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          categoryId={selectedCategory?._id}
          setCategoryId={setSelectedCategory}
        />
      )}
    </section>
  );
}
