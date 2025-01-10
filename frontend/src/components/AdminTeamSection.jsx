import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChefs, updateChef } from "../util/Http";
import ImageUploader from "./ImageUploader";
import Spinner from "./Spinner";
import { BASE_URL } from "../util/Globals";

export default function AdminTeamSection() {
  const token = useSelector((state) => state.userInfo.token);
  const [chef1Id, setChef1Id] = useState(null);
  const [chef2Id, setChef2Id] = useState(null);
  const [chef1Image, setChef1Image] = useState(null);
  const [chef2Image, setChef2Image] = useState(null);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const {
    data: chefs,
    isLoading: isChefsLoading,
    isError: isChefsError,
  } = useQuery({
    queryKey: ["chefs"],
    queryFn: () => getChefs(),
    staleTime: 0,
    select: (res) => res.data,
  });

  const { mutate: updateChefData, isPending: isUpdatingChef } = useMutation({
    mutationFn: ({ formData, chefId }) => updateChef(token, chefId, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Chef updated successfully");
      } else {
        notifyError(
          data?.response?.data?.message || "Chef update failed! Try again",
        );
      }
    },
    onError: () => {
      notifyError("Chef update failed!");
    },
  });

  const {
    register: registerChef1,
    handleSubmit: handleChef1Submit,
    reset: resetChef1,
    formState: { errors: chef1Errors },
  } = useForm();
  const onSubmitChef1 = (data) => {
    if (!chef1Id) return;

    const formData = new FormData();

    if (chef1Image) {
      formData.append("image", chef1Image);
    }

    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    formData.append("whatsapp", data.whatsapp);

    updateChefData({ formData, chefId: chef1Id });
  };

  const {
    register: registerChef2,
    handleSubmit: handleChef2Submit,
    reset: resetChef2,
    formState: { errors: chef2Errors },
  } = useForm();
  const onSubmitChef2 = (data) => {
    if (!chef2Id) return;

    const formData = new FormData();

    if (chef2Image) {
      formData.append("image", chef2Image);
    }

    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    formData.append("whatsapp", data.whatsapp);

    updateChefData({ formData, chefId: chef2Id });
  };

  useEffect(() => {
    if (chefs) {
      setChef1Id(chefs[0]._id);
      setChef2Id(chefs[1]._id);

      resetChef1({
        name: chefs[0].name,
        title: chefs[0].title,
        facebook: chefs[0].facebook || "",
        instagram: chefs[0].instagram || "",
        twitter: chefs[0].twitter || "",
        whatsapp: chefs[0].whatsapp || "",
      });

      resetChef2({
        name: chefs[1].name,
        title: chefs[1].title,
        facebook: chefs[1].facebook || "",
        instagram: chefs[1].instagram || "",
        twitter: chefs[1].twitter || "",
        whatsapp: chefs[1].whatsapp || "",
      });
    }
  }, [chefs, resetChef1, resetChef2]);

  return (
    <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
      <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
        <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
          Team Section
        </h3>

        {isChefsLoading ? (
          <div className="flex items-center justify-center">
            <Spinner size={10} />
          </div>
        ) : isChefsError ? (
          <div className="text-center text-red-600">
            Error fetching chefs data
          </div>
        ) : chefs && chefs.length === 0 ? (
          <div className="text-center text-gray-600">No chefs found</div>
        ) : null}

        {!isChefsLoading && !isChefsError && chefs?.length > 0 && (
          <>
            <form
              onSubmit={handleChef1Submit(onSubmitChef1)}
              className="border-b"
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    chef name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...registerChef1("name", {
                      required: "name is required",
                      minLength: {
                        value: 3,
                        message: "name must be at least 3 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.name && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.name.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    chef title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...registerChef1("title", {
                      required: "title is required",
                      minLength: {
                        value: 2,
                        message: "title must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.title && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.title.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook Profile
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="https://facebook.com/..."
                    {...registerChef1("facebook", {
                      required: "facebook is required",
                      minLength: {
                        value: 2,
                        message: "facebook must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.facebook && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.facebook.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Instagram Profile
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    {...registerChef1("instagram", {
                      required: "instagram is required",
                      minLength: {
                        value: 2,
                        message: "instagram must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.instagram && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.instagram.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    placeholder="20xxxxxxxxxx"
                    {...registerChef1("whatsapp", {
                      required: "whatsapp is required",
                      minLength: {
                        value: 2,
                        message: "whatsapp must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.whatsapp && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.whatsapp.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Twitter Profile
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    placeholder="https://twitter.com/..."
                    {...registerChef1("twitter", {
                      required: "twitter is required",
                      minLength: {
                        value: 2,
                        message: "twitter must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef1Errors.twitter && (
                    <span className="text-sm text-red-600">
                      {chef1Errors.twitter.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <ImageUploader
                    onImagesChange={(images) => setChef1Image(images[0])}
                    initialImages={[`${BASE_URL}${chefs[0].image}`]}
                  />
                </div>
              </div>
              <div className="py-5 text-right">
                <button
                  type="submit"
                  disabled={isUpdatingChef}
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdatingChef ? <Spinner size={5} /> : "Save"}
                </button>
              </div>
            </form>

            <form
              onSubmit={handleChef2Submit(onSubmitChef2)}
              className="border-b"
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    chef name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...registerChef2("name", {
                      required: "name is required",
                      minLength: {
                        value: 3,
                        message: "name must be at least 3 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.name && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.name.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    chef title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...registerChef2("title", {
                      required: "title is required",
                      minLength: {
                        value: 2,
                        message: "title must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.title && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.title.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook Profile
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="https://facebook.com/..."
                    {...registerChef2("facebook", {
                      required: "facebook is required",
                      minLength: {
                        value: 2,
                        message: "facebook must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.facebook && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.facebook.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Instagram Profile
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    {...registerChef2("instagram", {
                      required: "instagram is required",
                      minLength: {
                        value: 2,
                        message: "instagram must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.instagram && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.instagram.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    placeholder="20xxxxxxxxxx"
                    {...registerChef2("whatsapp", {
                      required: "whatsapp is required",
                      minLength: {
                        value: 2,
                        message: "whatsapp must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.whatsapp && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.whatsapp.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Twitter Profile
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    placeholder="https://twitter.com/..."
                    {...registerChef2("twitter", {
                      required: "twitter is required",
                      minLength: {
                        value: 2,
                        message: "twitter must be at least 2 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {chef2Errors.twitter && (
                    <span className="text-sm text-red-600">
                      {chef2Errors.twitter.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <ImageUploader
                    onImagesChange={(images) => setChef2Image(images[0])}
                    initialImages={[`${BASE_URL}${chefs[1].image}`]}
                  />
                </div>
              </div>
              <div className="py-5 text-right">
                <button
                  type="submit"
                  disabled={isUpdatingChef}
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdatingChef ? <Spinner size={5} /> : "Save"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
