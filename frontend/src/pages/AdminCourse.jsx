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
  const [requirement, setRequirement] = useState("");
  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirements((prev) => [...prev, requirement.trim()]);
      setRequirement("");
    } else {
      notifyError("Requirement cannot be empty");
    }
  };

  const [contents, setContents] = useState([]);
  const [content, setContent] = useState("");
  const handleAddContent = () => {
    if (content.trim()) {
      setContents((prev) => [...prev, content.trim()]);
      setContent("");
    } else {
      notifyError("Content cannot be empty");
    }
  };

  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState({ title: "", video: "" });
  const handleAddLesson = () => {
    if (lesson.title.trim() && lesson.video.trim()) {
      setLessons((prev) => [...prev, lesson]);
      setLesson({ title: "", video: "" });
    } else {
      notifyError("Lesson title and video URL cannot be empty");
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
        description: course?.description || "",
        duration: course.duration,
        price: course.price,
        video: course.video,
      });
      setRequirements(course.requirements);
      setContents(course.content);
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

    if (contents.length) {
      contents.forEach((content, index) => {
        formData.append(`content[${index}]`, content);
      });
    } else {
      return notifyError("At least one content is required");
    }

    if (lessons.length) {
      lessons.forEach((lesson, index) => {
        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][video]`, lesson.video);
      });
    } else {
      return notifyError("At least one lesson is required");
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {errors.title && (
                    <span className="text-sm text-red-600">
                      Course title is required
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
                    // placeholder="e.g. Learn how to bake a delicious chocolate cake from scratch."
                    id="description"
                    autoComplete="family-name"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {errors.description && (
                    <span className="text-sm text-red-600">
                      {errors.description.message}
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
                    autoComplete="duration"
                    placeholder="e.g. 15 hours"
                    {...register("duration", { required: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                  />
                  {errors.duration && (
                    <span className="text-sm text-red-600">
                      Duration is required
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      name="requirement"
                      id="requirement"
                      autoComplete="requirement"
                      placeholder="e.g. Basic baking knowledge"
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="mt-1 block grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-800 focus:outline-none"
                    >
                      <IconPlusLg className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <ul className="mt-2 md:ps-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-gray-700">{requirement}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setRequirements((prev) =>
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

                <div className="col-span-6">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      name="content"
                      id="content"
                      autoComplete="content"
                      placeholder="e.g. Introduction to cake baking"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 block grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddContent}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-800 focus:outline-none"
                    >
                      <IconPlusLg className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <ul className="mt-2 md:ps-4">
                    {contents?.map((content, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-gray-700">{content}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setContents((prev) =>
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

                <div className="col-span-6">
                  <label
                    htmlFor="lessons"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lessons
                  </label>
                  <div className="flex flex-col items-center gap-2 md:flex-row">
                    <input
                      type="url"
                      name="lesson-title"
                      id="lesson-title"
                      autoComplete="lesson-title"
                      placeholder="lesson title"
                      value={lesson.title}
                      onChange={(e) =>
                        setLesson({ ...lesson, title: e.target.value })
                      }
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
                      className="mt-1 block w-full grow rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddLesson}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-800 focus:outline-none"
                    >
                      <IconPlusLg className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  <ul className="mt-2 md:ps-4">
                    {lessons.map((lesson, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-gray-700 underline underline-offset-2">
                          {lesson.title}:
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

                {course && course.image && (
                  <div className="col-span-6 sm:col-span-3">
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
                  className="flex items-center gap-0 rounded-md border border-transparent bg-primary-300 px-6 py-2 text-sm font-medium text-secondary-800 shadow-sm duration-200 ease-in-out hover:bg-primary-600 focus:outline-none disabled:cursor-not-allowed disabled:px-10"
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
