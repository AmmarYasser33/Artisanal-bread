import { useSelector } from "react-redux";

export default function InstagramFloatIcon() {
  const instagram = useSelector((state) => state.configs.instagram);

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex transform items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-3 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 2.25h9a5.25 5.25 0 015.25 5.25v9a5.25 5.25 0 01-5.25 5.25h-9A5.25 5.25 0 012.25 16.5v-9A5.25 5.25 0 017.5 2.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.125 6.375h.008v.008h-.008v-.008zM12 8.625a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75z"
          />
        </svg>
      </a>
    </div>
  );
}
