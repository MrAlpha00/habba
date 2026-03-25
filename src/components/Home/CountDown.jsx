import React, { useEffect, useState } from "react";
import APLCards from "./APLCards";

const CountDown = () => {
  const TARGET_DATE = new Date("2026-04-11T00:00:00");

  const getTimeLeft = () => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="events" className="w-full h-full min-h-screen py-1 md:py-24 justify-center flex flex-col items-center gap-4 sm:gap-6 sm:px-6">
      {/* Title */}
      <APLCards/>
      <p className="text-3xl mt-16 md:mt-24 lg:text-7xl text-[#39ff14] tracking-wide font-medium text-center">
        The Dream Begins In
      </p>
      <p className="max-w-5xl mb-8 text-center px-4  mx-auto w-full z-40">More than excitement, it's a sense of belonging, pride, and shared dreams. Friendships grow stronger, confidence finds its voice, and every cheer from the crowd becomes part of a story that lasts forever. This is not just a celebration — it's emotion.</p>
      {/* Countdown */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6">
        <TimeBlock label="DAYS" value={time.d} />
        <Divider />
        <TimeBlock label="HRS" value={time.h} />
        <Divider />
        <TimeBlock label="MIN" value={time.m} />
        <Divider />
        <TimeBlock label="SEC" value={time.s} />
      </div>
    </div>
  );
};

const TimeBlock = ({ label, value }) => (
  <div
    className="
      min-w-[56px] sm:min-w-[72px] md:min-w-[96px] lg:min-w-[120px]
      px-2 sm:px-4 md:px-5
      py-2 sm:py-3 md:py-8
      rounded-2xl
      bg-white/10 backdrop-blur-xl
      border border-white/20
      text-center
      shadow-[0_0_20px_rgba(57,255,20,0.15)]
    "
  >
    <div className="text-xl sm:text-3xl md:text-4xl mb-0 md:mb-2 lg:text-5xl font-bold text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </div>
    <div className="mt-1 text-[9px] sm:text-xs md:text-sm tracking-widest text-white/70">
      {label}
    </div>
  </div>
);

const Divider = () => (
  <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/40 pb-1">
    :
  </span>
);

export default CountDown;
