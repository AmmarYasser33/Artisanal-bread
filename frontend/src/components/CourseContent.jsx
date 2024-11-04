export default function CourseContent({ lessons }) {
  return (
    <div className="bg-primary-100 py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <h2 className="relative text-center text-2xl font-bold text-secondary-500 md:text-3xl">
          Course Content
          <span className="absolute -bottom-3 left-1/2 h-2 w-28 -translate-x-1/2 transform bg-primary-500 md:w-36"></span>
        </h2>

        <div className="mt-12 border border-gray-300">
          {lessons?.map((lesson, index) => (
            <div key={index} className="border-b bg-white px-14 py-4 md:px-20">
              <h3 className="font-roboto text-base font-medium text-secondary-500 md:text-lg">
                {lesson.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
