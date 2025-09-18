"use client";

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
    <div
      id="circle-mouse"
      className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-gray-500 backdrop-invert transition-transform duration-100 ease-out"
    />
  );
};

export default CircleMouse;
