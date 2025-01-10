import { Fragment } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTestimonial } from "../util/Http";
import { IconBxsErrorCircle } from "../Icons";
import Spinner from "./Spinner";

export default function DeleteTestimonialModal({
  isModalOpen,
  setIsModalOpen,
  testimonialId,
  setTestimonialId,
}) {
  const queryClient = useQueryClient();
  const token = JSON.parse(localStorage.getItem("token"));

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteTestimonial(token, id),
    onError: () => {
      console.log("error deleting");
      notifyError("Error deleting testimonial!");
    },
    onSuccess: () => {
      notifySuccess("Testimonial deleted successfully!");
      queryClient.invalidateQueries("testimonials");
      setIsModalOpen(false);
      setTestimonialId(null);
    },
  });

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
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <IconBxsErrorCircle
                    className="h-10 w-10 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <h3 className="text-xl font-medium text-secondary-800">
                      Delete Testimonial ?
                    </h3>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm transition duration-300 ease-in-out hover:bg-red-800 focus:scale-95 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:col-start-2 sm:text-sm"
                        disabled={isPending}
                        onClick={() => {
                          if (testimonialId) mutate(testimonialId);
                        }}
                      >
                        {isPending ? <Spinner size={5} /> : "Delete"}
                      </button>

                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 focus:scale-95 focus:outline-none sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
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
