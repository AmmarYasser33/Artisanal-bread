import React, { Suspense } from "react";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
import AboutUsSection from "../components/AboutUsSection";
const TeamSection = React.lazy(() => import("../components/TeamSection"));
const ContactUsSection = React.lazy(
  () => import("../components/ContactUsSection"),
);

export default function About() {
  return (
    <div>
      <div className="bg-secondary-500 shadow-lg">
        <Nav />
      </div>

      <AboutUsSection />
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <ContactUsSection />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <p className="mt-10 bg-primary-100 py-4 text-center font-roboto text-sm text-secondary-900">
          Developed by:
          <a
            href="https://t.me/ammar_yasser"
            className="ml-2 font-sans font-bold underline underline-offset-4"
            target="_blank"
          >
            Ammar Yasser
          </a>
        </p>
      </Suspense>
    </div>
  );
}
