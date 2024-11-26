import { useState, useEffect } from "react";
import { IconCloudUpload, IconTrashDelete } from "../Icons";

export default function ImageUploader({
  onImagesChange,
  multiple = false,
  initialImages = [],
}) {
  const [isImgDragging, setIsImgDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // Store { file, url } objects

  useEffect(() => {
    if (
      uploadedImages.length === 0 &&
      initialImages &&
      initialImages.length > 0
    ) {
      const images = initialImages.map((url) => ({
        file: null,
        url,
      }));
      setUploadedImages(images);
    }
  }, [initialImages, uploadedImages]);

  const handleImageUpload = (files) => {
    const filesArr = Array.from(files);
    const images = filesArr.map((file) => ({
      file, // Store the actual File object
      url: URL.createObjectURL(file), // Create an object URL for preview
    }));

    const updatedImages = multiple ? [...uploadedImages, ...images] : images;
    setUploadedImages(updatedImages);

    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file)); // Pass only files to the parent
    }
  };

  const handleDeleteImage = (imageUrl) => {
    const updatedImages = uploadedImages.filter((img) => img.url !== imageUrl);
    setUploadedImages(updatedImages);

    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file)); // Pass updated files to the parent
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    handleImageUpload(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsImgDragging(false);
    const files = event.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsImgDragging(true);
  };

  const handleDragLeave = () => {
    setIsImgDragging(false);
  };

  return (
    <div>
      <div className="mt-3 flex w-full items-center justify-center">
        <div
          className={`flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
            isImgDragging
              ? "border-gray-600 bg-gray-100"
              : "border-gray-30 bg-gray-50 hover:bg-gray-100"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <label htmlFor="dropzone-file" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center pb-6 pt-3">
              <IconCloudUpload className="mb-3 h-8 w-8 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                {/* SVG, PNG or JPG (MAX. 800x400px) */}
                SVG, PNG, WEBP, or JPG
              </p>
            </div>
          </label>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            multiple={multiple}
          />
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div className="border-gray-30 mt-1 flex w-full flex-wrap items-center justify-center rounded-sm border p-3">
          {uploadedImages.map(({ url }, index) => (
            <div key={index} className="relative me-3 mt-3 h-20 w-20">
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="h-full w-full rounded-md object-cover"
              />
              <button
                type="button"
                className="absolute right-0 top-0 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                onClick={() => handleDeleteImage(url)}
              >
                <IconTrashDelete className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
