import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function VideoModal({ onClose, videoUrl, isPlaying }) {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
        onClose(); // Notify parent to close modal
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 mx-0 flex h-full max-h-full max-w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-60">
      <div
        ref={modalRef}
        className="relative max-h-full w-full max-w-xl md:max-w-4xl"
      >
        <div className="relative rounded-lg bg-gray-700 shadow">
          {/* Modal Content */}
          <div className="h-96 p-1 md:h-[30rem]">
            <ReactPlayer
              url={videoUrl}
              loop={true}
              playing={isPlaying}
              width="100%"
              height="100%"
              // controls={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
