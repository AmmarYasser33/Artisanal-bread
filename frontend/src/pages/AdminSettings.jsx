import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import { saveIsLoginState } from "../Store/userInfo-actions";
import { profileActions } from "../Store/profileInfo-slice";
import { cartActions } from "../Store/cartCounter-slice";
import {
  updateMe,
  updatePassword,
  updateConfigs,
  uploadBannerImage,
} from "../util/Http";
import ImageUploader from "../components/ImageUploader";
import Spinner from "../components/Spinner";

export default function AdminSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profileInfo.data);
  const token = useSelector((state) => state.userInfo.token);
  const [bannerImage, setBannerImage] = useState(null);
  const shippingPrice = useSelector((state) => state.configs.shippingPrice);
  const introVideo = useSelector((state) => state.configs.introVideo);
  const aboutVideo = useSelector((state) => state.configs.aboutVideo);
  const achievementsExperience = useSelector(
    (state) => state.configs.achievementsExperience,
  );
  const achievementsProfessionals = useSelector(
    (state) => state.configs.achievementsProfessionals,
  );
  const achievementsProducts = useSelector(
    (state) => state.configs.achievementsProducts,
  );
  const achievementsOrders = useSelector(
    (state) => state.configs.achievementsOrders,
  );
  const contactArAddress = useSelector((state) => state.configs.arAddress);
  const contactEnAddress = useSelector((state) => state.configs.enAddress);
  const contactArOpening = useSelector((state) => state.configs.arOpeningHours);
  const contactEnOpening = useSelector((state) => state.configs.enOpeningHours);
  const contactPhone = useSelector((state) => state.configs.phone);
  const contactLocation = useSelector((state) => state.configs.locationLink);
  const contactMapX = useSelector((state) => state.configs.xCoordinate);
  const contactMapY = useSelector((state) => state.configs.yCoordinate);
  const contactEmail = useSelector((state) => state.configs.email);
  const contactFacebook = useSelector((state) => state.configs.facebook);
  const contactWhatsapp = useSelector((state) => state.configs.whatsapp);
  const contactInstagram = useSelector((state) => state.configs.instagram);
  const contactTiktok = useSelector((state) => state.configs.tiktok);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate: updateUser, isPending: isUpdateUserPending } = useMutation({
    mutationFn: (formData) => updateMe(token, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Email updated successfully");
      } else {
        notifyError(
          data?.response?.data?.message || "Email update failed! Try again",
        );
      }
    },
    onError: () => {
      notifyError("Email update failed!");
    },
  });

  const {
    register: registerData,
    reset: resetData,
    handleSubmit: handleDataSubmit,
    formState: { errors: dataErrors },
  } = useForm();
  const onSubmitData = (data) => {
    updateUser(data);
  };

  useEffect(() => {
    resetData({
      email: user?.email,
    });
  }, [user, resetData]);

  const { mutate: updateUserPassword, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: (formData) => updatePassword(token, formData),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess("Password updated successfully");

          localStorage.removeItem("userData");
          dispatch(userActions.setRole(""));
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          dispatch(userActions.setIsLogin(false));
          dispatch(saveIsLoginState(false));
          dispatch(profileActions.setProfileInfo(null));
          dispatch(cartActions.setCounter(0));

          navigate("/login");
        } else {
          notifyError(
            data?.response?.data?.message ||
              "Password update failed! Try again",
          );
        }
      },
      onError: () => {
        notifyError("Password update failed!");
      },
    });

  const {
    register: registerPassword,
    watch: watchPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();
  const onSubmitPassword = (data) => {
    updateUserPassword(data);
  };

  const { mutate: updateBannerImage, isPending: isUpdatingBannerImage } =
    useMutation({
      mutationFn: (formData) => uploadBannerImage(token, formData),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess("Banner updated successfully");
        } else {
          notifyError(
            data?.response?.data?.message || "Banner update failed! Try again",
          );
        }
      },
      onError: () => {
        notifyError("Banner update failed!");
      },
    });

  const submitBannerImage = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (bannerImage) {
      formData.append("image", bannerImage);
    } else {
      notifyError("Please select an image");
      return;
    }

    updateBannerImage(formData);
  };

  const { mutate: updateConfigsData, isPending: isUpdateConfigsPending } =
    useMutation({
      mutationFn: (formData) => updateConfigs(token, formData),
      onSuccess: (data) => {
        if (data.status === "success") {
          notifySuccess("Updated successfully");
        } else {
          notifyError(
            data?.response?.data?.message || "Update failed! Try again",
          );
        }
      },
      onError: () => {
        notifyError("Update failed!");
      },
    });

  const {
    register: registerMainData,
    handleSubmit: handleMainDataSubmit,
    reset: resetMainData,
    formState: { errors: mainDataErrors },
  } = useForm();
  const onSubmitMainData = (data) => {
    const formData = {
      INTRO_VIDEO_URL: data.introVideoURL,
      ABOUT_VIDEO_URL: data.aboutVideoURL,
    };

    updateConfigsData(formData);
  };

  useEffect(() => {
    resetMainData({
      introVideoURL: introVideo,
      aboutVideoURL: aboutVideo,
    });
  }, [introVideo, aboutVideo, resetMainData]);

  const {
    register: registerAchievements,
    handleSubmit: handleAchievementsSubmit,
    reset: resetAchievements,
    formState: { errors: achievementsErrors },
  } = useForm();
  const onSubmitAchievements = (data) => {
    const formData = {
      ACHIEVEMENTS_EXPERIENCE: data.experience,
      ACHIEVEMENTS_PROFESSIONALS: data.professionals,
      ACHIEVEMENTS_PRODUCTS: data.totalProducts,
      ACHIEVEMENTS_ORDERS: data.ordersPlaced,
    };

    updateConfigsData(formData);
  };

  useEffect(() => {
    resetAchievements({
      experience: +achievementsExperience,
      professionals: +achievementsProfessionals,
      totalProducts: +achievementsProducts,
      ordersPlaced: +achievementsOrders,
    });
  }, [
    achievementsExperience,
    achievementsProfessionals,
    achievementsProducts,
    achievementsOrders,
    resetAchievements,
  ]);

  const {
    register: registerContactInfo,
    handleSubmit: handleContactInfoSubmit,
    reset: resetContactInfo,
    formState: { errors: contactInfoErrors },
  } = useForm();
  const onSubmitContactInfo = (data) => {
    const formData = {
      AR_ADDRESS: data.arAddress,
      EN_ADDRESS: data.enAddress,
      PHONE: data.phone,
      X_COORDINATE: data.mapX,
      Y_COORDINATE: data.mapY,
      LOCATION_LINK: data.location,
      EMAIL: data.contactEmail,
      FACEBOOK: data.facebook,
      WHATSAPP: data.whatsapp,
      INSTAGRAM: data.instagram,
      TIKTOK: data.tiktok,
    };

    updateConfigsData(formData);
  };

  useEffect(() => {
    resetContactInfo({
      arAddress: contactArAddress,
      enAddress: contactEnAddress,
      arOpening: contactArOpening,
      enOpening: contactEnOpening,
      phone: contactPhone,
      mapX: contactMapX,
      mapY: contactMapY,
      location: contactLocation,
      contactEmail: contactEmail,
      facebook: contactFacebook,
      whatsapp: contactWhatsapp,
      instagram: contactInstagram,
      tiktok: contactTiktok,
    });
  }, [
    contactArAddress,
    contactEnAddress,
    contactArOpening,
    contactEnOpening,
    contactPhone,
    contactMapX,
    contactMapY,
    contactLocation,
    contactEmail,
    contactFacebook,
    contactWhatsapp,
    contactInstagram,
    contactTiktok,
    resetContactInfo,
  ]);

  const {
    register: registerShippingPrice,
    handleSubmit: handleShippingPriceSubmit,
    reset: resetShippingPrice,
    formState: { errors: shippingPriceErrors },
  } = useForm();
  const onSubmitShippingPrice = (data) => {
    const formData = {
      SHIPPING_PRICE: data.shippingPrice,
    };

    updateConfigsData(formData);
  };

  useEffect(() => {
    resetShippingPrice({
      shippingPrice: shippingPrice,
    });
  }, [shippingPrice, resetShippingPrice]);

  return (
    <div className="space-y-10 sm:px-6 lg:col-span-9 lg:px-0">
      <form onSubmit={handleDataSubmit(onSubmitData)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Login Info.
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  {...registerData("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {dataErrors.email && (
                  <span className="text-sm text-red-600">
                    Please enter a valid email address
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateUserPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateUserPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Passwords
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  name="current-password"
                  id="current-password"
                  autoComplete="current-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("currentPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.currentPassword && (
                  <span className="text-sm text-red-600">
                    Please enter your right current password
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="new-password"
                  id="new-password"
                  autoComplete="new-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("newPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.newPassword?.type === "required" && (
                  <span className="text-sm text-red-600">
                    New password is required
                  </span>
                )}
                {passwordErrors.newPassword?.type === "minLength" && (
                  <span className="text-sm text-red-600">
                    Password must be at least 6 characters long
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="confirm-new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm-new-password"
                  id="confirm-new-password"
                  autoComplete="confirm-new-password"
                  placeholder="●●●●●●●●●"
                  {...registerPassword("passwordConfirm", {
                    required: true,
                    validate: (value) => value === watchPassword("newPassword"),
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {passwordErrors.passwordConfirm?.type === "required" && (
                  <span className="text-sm text-red-600">
                    Password confirm is required
                  </span>
                )}
                {passwordErrors.passwordConfirm?.type === "validate" && (
                  <span className="text-sm text-red-600">
                    Passwords do not match
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdatePasswordPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatePasswordPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleMainDataSubmit(onSubmitMainData)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Main Videos
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="intro-video"
                  className="block text-sm font-medium text-gray-700"
                >
                  Intro Video URL
                </label>
                <input
                  type="url"
                  name="intro-video"
                  id="intro-video"
                  placeholder="https://www.youtube.com/...."
                  {...registerMainData("introVideoURL", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {mainDataErrors.introVideoURL && (
                  <span className="text-sm text-red-600">
                    Please enter a valid URL
                  </span>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="about-video"
                  className="block text-sm font-medium text-gray-700"
                >
                  About Us Video URL
                </label>
                <input
                  type="url"
                  name="about-video"
                  id="about-video"
                  placeholder="https://www.youtube.com/...."
                  {...registerMainData("aboutVideoURL", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {mainDataErrors.aboutVideoURL && (
                  <span className="text-sm text-red-600">
                    Please enter a valid URL
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateConfigsPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateConfigsPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={submitBannerImage}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Main Section Banner
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner Image
                </label>
                <ImageUploader
                  onImagesChange={(images) => setBannerImage(images[0])}
                  initialImages={["http://localhost:3001/designs/banner.png"]}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdatingBannerImage}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdatingBannerImage ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleAchievementsSubmit(onSubmitAchievements)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Achievements Section
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  {...registerAchievements("experience", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {achievementsErrors.experience && (
                  <span className="text-sm text-red-600">
                    Please enter a positive number
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="professionals"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skilled Professionals
                </label>
                <input
                  type="number"
                  name="professionals"
                  id="professionals"
                  {...registerAchievements("professionals", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {achievementsErrors.professionals && (
                  <span className="text-sm text-red-600">
                    Please enter a positive number
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="total-products"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Products
                </label>
                <input
                  type="number"
                  name="total-products"
                  id="total-products"
                  {...registerAchievements("totalProducts", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {achievementsErrors.totalProducts && (
                  <span className="text-sm text-red-600">
                    Please enter a positive number
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="orders-placed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Orders Placed
                </label>
                <input
                  type="number"
                  name="orders-placed"
                  id="orders-placed"
                  {...registerAchievements("ordersPlaced", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {achievementsErrors.ordersPlaced && (
                  <span className="text-sm text-red-600">
                    Please enter a positive number
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateConfigsPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateConfigsPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleContactInfoSubmit(onSubmitContactInfo)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Contact Info.
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="en-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  EN. Address
                </label>
                <input
                  type="text"
                  name="en-address"
                  id="en-address"
                  {...registerContactInfo("enAddress", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.enAddress && (
                  <span className="text-sm text-red-600">
                    English address is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="ar-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  AR. Address
                </label>
                <input
                  type="text"
                  name="ar-address"
                  id="ar-address"
                  {...registerContactInfo("arAddress", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.arAddress && (
                  <span className="text-sm text-red-600">
                    Arabic address is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="en-opening"
                  className="block text-sm font-medium text-gray-700"
                >
                  EN. Opening Hours
                </label>
                <input
                  type="text"
                  name="en-opening"
                  id="en-opening"
                  {...registerContactInfo("enOpening", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.enOpening && (
                  <span className="text-sm text-red-600">
                    English opening hours are required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="ar-opening"
                  className="block text-sm font-medium text-gray-700"
                >
                  AR. Opening Hours
                </label>
                <input
                  type="text"
                  name="ar-opening"
                  id="ar-opening"
                  {...registerContactInfo("arOpening", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.arOpening && (
                  <span className="text-sm text-red-600">
                    Arabic opening hours are required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="map-x"
                  className="block text-sm font-medium text-gray-700"
                >
                  Map X Coordinate
                </label>
                <input
                  type="text"
                  name="map-x"
                  id="map-x"
                  placeholder="30.0113975"
                  {...registerContactInfo("mapX", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.mapX && (
                  <span className="text-sm text-red-600">
                    Map X coordinate is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="map-y"
                  className="block text-sm font-medium text-gray-700"
                >
                  Map Y Coordinate
                </label>
                <input
                  type="text"
                  name="map-y"
                  id="map-y"
                  placeholder="31.1949437"
                  {...registerContactInfo("mapY", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.mapY && (
                  <span className="text-sm text-red-600">
                    Map Y coordinate is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location Link
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="https://maps.app.goo.gl/ADaDXmUKtsyqkivq7"
                  {...registerContactInfo("location", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.location && (
                  <span className="text-sm text-red-600">
                    Location link is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  {...registerContactInfo("phone", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.phone && (
                  <span className="text-sm text-red-600">
                    Please enter a valid phone number
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="contact-email"
                  id="contact-email"
                  {...registerContactInfo("contactEmail", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.contactEmail && (
                  <span className="text-sm text-red-600">
                    Please enter a valid email address
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="https://facebook.com/..."
                  {...registerContactInfo("facebook", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.facebook && (
                  <span className="text-sm text-red-600">
                    Facebook link is required
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
                  placeholder="20123456789"
                  {...registerContactInfo("whatsapp", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.whatsapp && (
                  <span className="text-sm text-red-600">
                    WhatsApp link is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="https://instagram.com/..."
                  {...registerContactInfo("instagram", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.instagram && (
                  <span className="text-sm text-red-600">
                    Instagram link is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="tiktok"
                  className="block text-sm font-medium text-gray-700"
                >
                  TikTok
                </label>
                <input
                  type="text"
                  name="tiktok"
                  id="tiktok"
                  placeholder="https://tiktok.com/..."
                  {...registerContactInfo("tiktok", { required: true })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {contactInfoErrors.tiktok && (
                  <span className="text-sm text-red-600">
                    TikTok link is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateConfigsPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateConfigsPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleShippingPriceSubmit(onSubmitShippingPrice)}>
        <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
            <h3 className="mb-10 mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Orders Info.
            </h3>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="shipping"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Price
                </label>
                <input
                  type="number"
                  name="shipping"
                  id="shipping"
                  {...registerShippingPrice("shippingPrice", {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
                {shippingPriceErrors.shippingPrice && (
                  <span className="text-sm text-red-600">
                    Please enter a positive number
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              disabled={isUpdateConfigsPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdateConfigsPending ? <Spinner size={5} /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
