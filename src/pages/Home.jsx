import React, { lazy, Suspense } from "react";
import Parallax from "../components/Home/Parallax";

const AboutUs = lazy(() => import("./AboutUs"));

const Home = () => {
  return (
    <div className="relative">
      <Parallax />

      <Suspense fallback={<div>Loading...</div>}>
        <AboutUs />
      </Suspense>
    </div>
  );
};

export default Home;