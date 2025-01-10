import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getTestimonials } from "../util/Http";
import { IconBxsEdit, IconPlusLg, IconTrashDelete } from "../Icons";
import AddTestimonialModal from "../components/AddTestimonialModal";
import DeleteTestimonialModal from "../components/DeleteTestimonialModal";
import EditTestimonialModal from "../components/EditTestimonialModal";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../util/Globals";

export default function AdminTestimonials() {
  const { i18n } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const {
    data: testimonials,
    isLoading: isTestimonialsLoading,
    isError: isTestimonialsError,
  } = useQuery({
    queryKey: ["testimonials", i18n.language],
    queryFn: () => getTestimonials(),
    staleTime: 0,
    select: (res) => res.data,
  });

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
              Testimonials
            </h2>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-4 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-primary-600 focus:outline-none"
            >
              <IconPlusLg className="mr-1 h-4 w-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="mt-6 overflow-x-scroll sm:mt-8">
            {isTestimonialsLoading && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isTestimonialsError && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-red-600">
                  Error fetching testimonials!
                </p>
              </div>
            )}
            {testimonials && testimonials.length === 0 && (
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-secondary-800">
                  No testimonials! Add a testimonial to display here.
                </p>
              </div>
            )}
            {testimonials && testimonials.length > 0 && (
              <table className="w-full text-left text-base shadow-sm rtl:text-right">
                <thead className="border-b border-t border-slate-100 bg-gray-50 text-xs uppercase">
                  <tr className="">
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Comment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials?.map((testimonial) => (
                    <tr
                      key={testimonial._id}
                      className="border-b bg-white hover:bg-gray-50"
                    >
                      <td className="w-4 p-4">
                        <div className="flex max-h-full w-8 max-w-full items-center drop-shadow-sm md:w-16">
                          <img
                            // src={`${BASE_URL}${testimonial.image}`}
                            src={`${BASE_URL}users/default.png`}
                            className="rounded-md"
                            alt="testimonial image"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-semibold"
                      >
                        {testimonial.name}
                      </th>
                      <td className="px-6 py-4">{testimonial.title}</td>
                      <td className="px-6 py-4">{testimonial.comment}</td>
                      <td className="px-6 py-4">
                        <button
                          className="inline-flex items-center justify-center rounded-lg bg-primary-300 px-2 py-1 text-sm text-secondary-700 hover:bg-primary-600"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <IconBxsEdit className="h-4 w-4" />
                          <span className="sr-only">Edit Testimonial</span>
                        </button>
                        <button
                          className="ml-2 inline-flex items-center justify-center rounded-lg bg-red-400 px-2 py-1 text-sm text-secondary-700 hover:bg-red-600"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <IconTrashDelete className="h-4 w-4" />
                          <span className="sr-only">Delete Testimonial</span>
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
        <AddTestimonialModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}

      {/* Delete modal */}
      {selectedTestimonial?._id && isDeleteModalOpen && (
        <DeleteTestimonialModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          testimonialId={selectedTestimonial?._id}
          setTestimonialId={setSelectedTestimonial}
        />
      )}

      {/* Edit modal */}
      {selectedTestimonial && isEditModalOpen && (
        <EditTestimonialModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          testimonial={selectedTestimonial}
          setTestimonial={setSelectedTestimonial}
        />
      )}
    </section>
  );
}
