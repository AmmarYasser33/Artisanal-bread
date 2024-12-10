import React, { Suspense } from "react";

import Spinner from "../components/Spinner";
import HeroSection from "../components/HeroSection";
const Stats = React.lazy(() => import("../components/Stats"));
const BakeryInfo = React.lazy(() => import("../components/BakeryInfo"));
const TrendingProducts = React.lazy(
  () => import("../components/TrendingProducts"),
);
const Testimonials = React.lazy(() => import("../components/Testimonials"));
const Footer = React.lazy(() => import("../components/Footer"));

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <TrendingProducts />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <BakeryInfo />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<Spinner color={"primary-700"} size={10} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
