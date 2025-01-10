import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTestimonial } from "../util/Http";
import { IconClipboardEdit } from "../Icons";
import ImageUploader from "./ImageUploader";
import Spinner from "./Spinner";
import { BASE_URL } from "../util/Globals";

export default function EditTestimonialModal({
  isModalOpen,
  setIsModalOpen,
  testimonial,
}) {
  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));
  const [images, setImages] = useState([]);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) =>
      updateTestimonial(token, testimonial._id, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Testimonial updated successfully");
        queryClient.invalidateQueries("testimonials");
        setIsModalOpen(false);
        reset();
        setImages([]);
      } else {
        notifyError(
          data?.response?.data?.message || "Error updated testimonial!",
        );
      }
    },
    onError: () => {
      notifyError("Error updated testimonial!");
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: testimonial.name,
      title: testimonial.title,
      comment: testimonial.comment,
    },
  });
  const onSubmit = (data) => {
    const formData = new FormData();

    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("comment", data.comment);

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
                            placeholder="Testimonial name"
                            className="mt-2 w-full transform rounded-md border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("name", {
                              required: "Testimonial name is required",
                              minLength: {
                                value: 2,
                                message: "Testimonial name is too short",
                              },
                            })}
                          />
                          {errors.name && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.name?.message}
                            </p>
                          )}

                          <input
                            type="text"
                            placeholder="Testimonial title"
                            className="mt-2 w-full transform rounded-md border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("title", {
                              required: "Testimonial title is required",
                              minLength: {
                                value: 2,
                                message: "Testimonial title is too short",
                              },
                            })}
                          />
                          {errors.title && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.title?.message}
                            </p>
                          )}

                          <textarea
                            placeholder="Testimonial content..."
                            rows="3"
                            className="mt-3 w-full transform rounded-lg border-gray-300 px-4 py-2 text-base text-black shadow-sm transition duration-500 ease-in-out focus:border-primary-500 focus:ring-primary-500"
                            {...register("comment", {
                              required: "Testimonial content is required",
                              minLength: {
                                value: 10,
                                message:
                                  "Testimonial content must be at least 10 characters",
                              },
                            })}
                          ></textarea>
                          {errors.comment && (
                            <p className="my-1 text-sm text-red-500">
                              {errors.comment?.message}
                            </p>
                          )}

                          <ImageUploader
                            onImagesChange={(images) => setImages(images)}
                            initialImages={[`${BASE_URL}${testimonial?.image}`]}
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
                          {isPending ? (
                            <Spinner size={5} />
                          ) : (
                            "Update testimonial"
                          )}
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
