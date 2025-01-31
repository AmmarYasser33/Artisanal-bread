import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCompletedCourse, updateCourse } from "../util/Http";
import { IconPlusLg, IconTrashDelete } from "../Icons";
import ImageUploader from "../components/ImageUploader";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../util/Globals";

export default function AdminCourse() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [image, setImage] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [arRequirements, setArRequirements] = useState([]);
  const [requirement, setRequirement] = useState("");
  const [arRequirement, setArRequirement] = useState("");
  const handleAddRequirement = () => {
    if (requirement.trim() && arRequirement.trim()) {
      setRequirements((prev) => [...prev, requirement.trim()]);
      setArRequirements((prev) => [...prev, arRequirement.trim()]);
      setRequirement("");
      setArRequirement("");
    } else {
      notifyError("EN-AR Requirement cannot be empty");
    }
  };

  const [contents, setContents] = useState([]);
  const [content, setContent] = useState("");
  const [arContents, setArContents] = useState([]);
  const [arContent, setArContent] = useState("");
  const handleAddContent = () => {
    if (content.trim() && arContent.trim()) {
      setContents((prev) => [...prev, content.trim()]);
      setArContents((prev) => [...prev, arContent.trim()]);
      setContent("");
      setArContent("");
    } else {
      notifyError("EN-AR Content cannot be empty");
    }
  };

  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({ title: "", arTitle: "", video: "" });
  const handleAddLesson = () => {
    if (lesson.title.trim() && lesson.arTitle.trim() && lesson.video.trim()) {
      setLessons((prev) => [...prev, lesson]);
      setLesson({ title: "", arTitle: "", video: "" });
    } else {
      notifyError("Lesson titles and video URL cannot be empty");
    }
  };

  const {
    data: course,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useQuery({
    queryKey: ["course", id, token],
    queryFn: () => getCompletedCourse(token, id),
    enabled: !!id,
    select: (res) => res.data,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => updateCourse(token, id, formData),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Course updated successfully");
      } else {
        notifyError(
          data?.response?.data?.message || "Failed to update course!",
        );
      }
    },
    onError: () => {
      notifyError("Failed to update course!");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (course) {
      reset({
        title: course.title,
        arTitle: course.arTitle,
        description: course?.description || "",
        arDescription: course?.arDescription || "",
        duration: course.duration,
        arDuration: course.arDuration,
        price: course.price,
        video: course.video,
      });
      setRequirements(course.requirements);
      setArRequirements(course.arRequirements);
      setContents(course.content);
      setArContents(course.arContent);
      setLessons(course.lessons);
    }
  }, [course, id, reset]);

  const onSubmitData = (data) => {
    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    if (requirements.length) {
      requirements.forEach((req, index) => {
        formData.append(`requirements[${index}]`, req);
      });
    } else {
      return notifyError("At least one requirement is required");
    }

    if (arRequirements.length) {
      arRequirements.forEach((req, index) => {
        formData.append(`arRequirements[${index}]`, req);
      });
    } else {
      return notifyError("At least one Arabic requirement is required");
    }

    if (contents.length) {
      contents.forEach((content, index) => {
        formData.append(`content[${index}]`, content);
      });
    } else {
      return notifyError("At least one content is required");
    }

    if (arContents.length) {
      arContents.forEach((content, index) => {
        formData.append(`arContent[${index}]`, content);
      });
    } else {
      return notifyError("At least one Arabic content is required");
    }

    if (!lessons.length && data.isOnline) {
      return notifyError("Lessons are required for online courses");
    } else if (lessons.length && data.isOnline) {
      lessons.forEach((lesson, index) => {
        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][arTitle]`, lesson.arTitle);
        formData.append(`lessons[${index}][video]`, lesson.video);
      });
    }

    formData.append("title", data.title);
    formData.append("arTitle", data.arTitle);
    formData.append("description", data.description);
    formData.append("arDescription", data.arDescription);
    formData.append("duration", data.duration);
    formData.append("arDuration", data.arDuration);
    formData.append("price", data.price);
    formData.append("video", data.video);

    mutate(formData);
  };

  return (
    <section className="space-y-6 bg-white py-4 antialiased shadow-lg sm:overflow-hidden sm:rounded-md sm:px-6 md:py-8 lg:col-span-9 lg:px-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-secondary-800 sm:text-2xl">
            Course Details
          </h2>

          {isCourseLoading && (
            <div className="flex items-center justify-center p-10">
              <Spinner />
            </div>
          )}

          {isCourseError && (
            <div className="flex items-center justify-center p-10">
              <p className="text-xl font-bold text-red-600">
                Error getting course details!
              </p>
            </div>
          )}

          {!isCourseLoading && !isCourseError && course && (
            <form
              className="mt-2 bg-white px-4 pt-6 sm:mt-4"
              onSubmit={handleSubmit(onSubmitData)}
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="e.g. Chocolate Cake Baking"
                    autoComplete="title"
                    {...register("title", { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.title && (
                    <span className="text-sm text-red-600">
                      Course title is required
                    </span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="arTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Arabic Title
                  </label>
                  <input
                    type="text"
                    name="arTitle"
                    id="arTitle"
                    placeholder="مثال: تعلم كيفية خبز كعكة الشوكولاتة"
                    autoComplete="arTitle"
                    {...register("arTitle", { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.arTitle && (
                    <span className="text-sm text-red-600">
                      Course Arabic title is required
                    </span>
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="family-name"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.description && (
                    <span className="text-sm text-red-600">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="arDescription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Arabic Description
                  </label>
                  <textarea
                    type="text"
                    name="arDescription"
                    id="arDescription"
                    autoComplete="family-name"
                    {...register("arDescription", {
                      required: "Arabic Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.arDescription && (
                    <span className="text-sm text-red-600">
                      {errors.arDescription.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    placeholder="e.g. 15 hours"
                    {...register("duration", { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.duration && (
                    <span className="text-sm text-red-600">
                      Duration is required
                    </span>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="arDuration"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Arabic Duration
                  </label>
                  <input
                    type="text"
                    name="arDuration"
                    id="arDuration"
                    placeholder="مثال: 15 ساعة"
                    {...register("arDuration", { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.arDuration && (
                    <span className="text-sm text-red-600">
                      Arabic Duration is required
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    name="price"
                    id="price"
                    autoComplete="price"
                    {...register("price", {
                      required: true,
                      min: 0,
                      valueAsNumber: true,
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.price && (
                    <span className="text-sm text-red-600">
                      Enter a valid price
                    </span>
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="video-url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About Video URL
                  </label>
                  <input
                    type="url"
                    name="video-url"
                    id="video-url"
                    autoComplete="video-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    {...register("video", {
                      required: true,
                      // setValueAs: (value) => value.trim(),
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                  />
                  {errors.video && (
                    <span className="text-sm text-red-600">
                      Enter a valid video URL
                    </span>
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="requirement"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Requirements
                  </label>
                  <div className="flex flex-col items-center gap-2 max-md:mb-5 md:flex-row">
                    <input
                      type="text"
                      name="requirement"
                      id="requirement"
                      placeholder="e.g. Basic baking knowledge"
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                    />
                    <input
                      type="text"
                      name="arRequirement"
                      id="arRequirement"
                      placeholder="مثال: معرفة أساسية بالخبز"
                      value={arRequirement}
                      onChange={(e) => setArRequirement(e.target.value)}
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] focus:outline-none"
                    >
                      <IconPlusLg className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <ul className="mt-2 space-y-1 md:ps-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-gray-700">
                          {`(${requirement} - ${arRequirements[index]})`}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setRequirements((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                            setArRequirements((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                          className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <IconTrashDelete className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <div className="flex flex-col items-center gap-2 max-md:mb-5 md:flex-row">
                    <input
                      type="text"
                      name="content"
                      id="content"
                      placeholder="e.g. Introduction to cake baking"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                    />
                    <input
                      type="text"
                      name="arContent"
                      id="arContent"
                      placeholder="مثال: مقدمة إلى أساسيات الخبز"
                      value={arContent}
                      onChange={(e) => setArContent(e.target.value)}
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddContent}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] focus:outline-none"
                    >
                      <IconPlusLg className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <ul className="mt-2 space-y-1 md:ps-4">
                    {contents?.map((content, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-gray-700">
                          {`(${content} - ${arContents[index]})`}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setContents((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                            setArContents((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                          className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <IconTrashDelete className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {course?.isOnline && (
                  <div className="col-span-6">
                    <label
                      htmlFor="lessons"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lessons
                    </label>
                    <div className="grid grid-cols-6 gap-2 md:mb-5">
                      <input
                        type="text"
                        name="lesson-title"
                        id="lesson-title"
                        placeholder="lesson title"
                        value={lesson.title}
                        onChange={(e) =>
                          setLesson({ ...lesson, title: e.target.value })
                        }
                        className="col-span-6 mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm md:col-span-3"
                      />
                      <input
                        type="text"
                        name="lesson-arTitle"
                        id="lesson-arTitle"
                        placeholder="عنوان الدرس"
                        value={lesson.arTitle}
                        onChange={(e) =>
                          setLesson({ ...lesson, arTitle: e.target.value })
                        }
                        className="col-span-6 mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 text-right shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm md:col-span-3"
                      />
                      <input
                        type="url"
                        name="lesson-video"
                        id="lesson-video"
                        autoComplete="lesson-video"
                        placeholder="lesson video URL"
                        value={lesson.video}
                        onChange={(e) =>
                          setLesson({ ...lesson, video: e.target.value })
                        }
                        className="col-span-5 mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[var(--color-primary-500)] focus:outline-none focus:ring-[var(--color-primary-500)] sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddLesson}
                        className="mt-2 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] focus:outline-none"
                      >
                        <IconPlusLg className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <ul className="mt-2 space-y-1 md:ps-4">
                      {lessons.map((lesson, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="text-gray-700 underline underline-offset-2">
                            {`(${lesson.title} - ${lesson.arTitle}) : `}
                          </span>
                          <span className="text-gray-700">{lesson.video}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setLessons((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                          >
                            <IconTrashDelete className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course && course.image && (
                  <div className="col-span-6 md:col-span-3">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image
                    </label>
                    <ImageUploader
                      onImagesChange={(images) => setImage(images[0])}
                      initialImages={[`${BASE_URL}${course?.image}`]}
                    />
                  </div>
                )}
              </div>

              <div className="mt-10 flex justify-end pe-1">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-0 rounded-md border border-transparent bg-[var(--color-primary-300)] px-6 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-[var(--color-primary-600)] focus:outline-none disabled:cursor-not-allowed disabled:px-10"
                >
                  {isPending ? <Spinner size={5} /> : "Update Course"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
