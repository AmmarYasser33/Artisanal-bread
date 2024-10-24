import React, { Suspense } from "react";

import Spinner from "../components/Spinner";
import HeroSection from "../components/HeroSection";
const Stats = React.lazy(() => import("../components/Stats"));
const BakeryInfo = React.lazy(() => import("../components/BakeryInfo"));

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <BakeryInfo />
      </Suspense>
    </div>
  );
}
