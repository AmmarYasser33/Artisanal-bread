import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct, getCategories } from "../util/Http";
import { IconClipboardEdit } from "../Icons";
import CategorySelector from "./CategorySelector";
import ImageUploader from "./ImageUploader";
import Spinner from "./Spinner";

export default function EditProductModal({
  isModalOpen,
  setIsModalOpen,
  product,
}) {
  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const [selectedCategory, setSelectedCategory] = useState(product?.category);
  const [images, setImages] = useState([]);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

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

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => updateProduct(token, product._id, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Product updated successfully!");
        queryClient.invalidateQueries("products");
        setIsModalOpen(false);
        reset();
        setImages([]);
        setSelectedCategory(null);
      } else {
        notifyError(data?.response?.data?.message || "Error updating product!");
      }
    },
    onError: () => {
      notifyError("Error updating product!");
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      enName: product?.enName,
      arName: product?.arName,
      price: product?.price,
      isFeatured: product?.isFeatured,
      description: product?.description,
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();

    if (selectedCategory) {
      formData.append("category", selectedCategory._id);
    } else {
      notifyError("Please select a category");
      return;
    }

    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    formData.append("enName", data.enName);
    formData.append("arName", data.arName);
    formData.append("price", data.price);
    formData.append("isFeatured", data.isFeatured);
    formData.append("description", data.description);

    mutate(formData);
  };

  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center font-roboto sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
            <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <IconClipboardEdit
                    className="h-6 w-6 text-yellow-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-5 bg-white">
                        <div className="px-5 pb-5">
                          <input
                            type="text"
                            placeholder="Product name"
                            className="mt-2 w-full transform rounded-md border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("enName", {
                              required: "Product name is required",
                              minLength: {
                                value: 2,
                                message: "Product name is too short",
                              },
                            })}
                          />
                          {errors.enName && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.enName?.message}
                            </p>
                          )}

                          <input
                            type="text"
                            placeholder="اسم المنتج"
                            className="mt-2 w-full transform rounded-md border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("arName", {
                              required: "Product name is required",
                              minLength: {
                                value: 2,
                                message: "Product name is too short",
                              },
                            })}
                          />
                          {errors.arName && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.arName?.message}
                            </p>
                          )}

                          {isCategoriesLoading ? (
                            <div className="mt-3 flex items-center justify-center">
                              <Spinner />
                            </div>
                          ) : isCategoriesError ? (
                            <div className="mt-3 text-red-500">
                              Error loading categories!
                            </div>
                          ) : (
                            <CategorySelector
                              setSelectedCategory={setSelectedCategory}
                              selectedCategory={selectedCategory}
                              categories={categories}
                            />
                          )}

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="relative rounded-md text-base shadow-sm">
                              <input
                                type="number"
                                name="price"
                                step="0.01"
                                className="block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-primary-500 focus:ring-primary-500"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                {...register("price", {
                                  required: "Product price is required",
                                  min: {
                                    value: 0,
                                    message: "Product price must be positive",
                                  },
                                })}
                              />
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-500">L.E</span>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <input
                                id="in-home"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-400 text-primary-600 focus:ring-primary-500"
                                {...register("isFeatured")}
                              />
                              <label
                                htmlFor="in-home"
                                className="ml-2 block text-nowrap text-gray-900"
                              >
                                Show in home
                              </label>
                            </div>
                          </div>
                          {errors.price && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.price?.message}
                            </p>
                          )}

                          <textarea
                            placeholder="Product description..."
                            rows="3"
                            className="mt-3 w-full transform rounded-lg border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("description")}
                          ></textarea>

                          <ImageUploader
                            onImagesChange={(images) => setImages(images)}
                            initialImages={[
                              `http://localhost:3001/${product?.image}`,
                            ]}
                          />
                        </div>

                        <hr className="mt-4" />
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm transition duration-300 ease-in-out hover:bg-primary-700 focus:scale-95 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:col-start-2 sm:text-sm"
                          disabled={isPending}
                        >
                          {isPending ? <Spinner size={5} /> : "Update product"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 focus:scale-95 focus:outline-none sm:col-start-1 sm:mt-0 sm:text-sm"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
