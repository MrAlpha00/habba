import React, { useEffect, useState } from "react";

const IntroCover = ({ onFinish }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(onFinish, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999]
      flex items-center justify-center
      min-h-[100vh] w-full
      bg-black
      transition-opacity duration-700
      ${hide ? "opacity-0" : "opacity-100"}`}
    >
      <h1 className="text-white text-7xl md:text-[200px] text-center leading-[1] font-bold tracking-widest animate-pulse">
        ACHARYA VTU <br/> HABBA
      </h1>
    </div>
  );
};

export default IntroCover;
