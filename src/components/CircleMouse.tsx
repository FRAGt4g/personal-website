"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

const CircleMouse = () => {
  useEffect(() => {
    const circleMouse = document.getElementById("circle-mouse");
    if (!circleMouse) return;

    const moveCircleMouse = (e: MouseEvent) => {
      circleMouse.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", moveCircleMouse);

    return () => {
      window.removeEventListener("mousemove", moveCircleMouse);
    };
  }, []);

  return (
    <motion.div
      id="circle-mouse"
      whileTap={{ scale: 2 }}
      style={{
        zIndex: 9999,
        backdropFilter: "invert(0.8)",
        height: "1rem",
        width: "1rem",
      }}
      className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-black bg-white/10 backdrop-blur-sm transition-transform duration-100 ease-out"
    />
  );
};

export default CircleMouse;
