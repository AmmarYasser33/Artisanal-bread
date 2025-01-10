import { useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";

export default function IntroVideoSection() {
  const introVideo = useSelector((state) => state.configs.introVideo);

  return (
    <div className="container mx-auto flex h-72 justify-center py-7 sm:h-96 sm:px-10 md:h-[30rem] md:px-20 md:py-12 lg:h-[35rem] xl:h-[40rem]">
      <ReactPlayer
        url={introVideo}
        // loop={true}
        playing={false}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}
