import React from "react";
import ScrollStack from "../lightswind/scroll-stack";
import { IMAGES } from "../../assets/Images";



const cards = [
  {
    title: "Events",
    type: "image",
    src: IMAGES.EVENT1,
    message: "Step into a world of endless possibilities with an exciting lineup of events crafted to celebrate talent, creativity, and competitive spirit. Acharya Habba 2026 brings together cultural showcases, technical challenges, literary contests, and entertaining informal experiences, ensuring there is something for everyone. Whether you are ready to perform under the spotlight, test your skills against the best, or cheer for your friends, each event offers a chance to be part of moments that inspire, thrill, and stay with you forever. Explore the stages, embrace the challenge, and find where you belong.",
  },
{
title: (
  <div className="flex flex-col gap-2 md:gap-5 items-center justify-center">
    Find Your Event
    <span className="text-4xl ">At</span>
    Acharya Habba 2026
  </div>
),

  type: "image",
  src: IMAGES.EVENT2,
},


];


const ScrollStackDemo = () => {
  return (
    <div className="">
  <ScrollStack cards={cards} />
</div>

  );
};

export default ScrollStackDemo;
