"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const CircleMouse = () => {
  const mouseDownRef = useRef<boolean>(false);

  useEffect(() => {
    const circleMouse = document.getElementById("circle-mouse");
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const lerpSpeed = 0.9;

    if (!circleMouse) return;

    function moveCircleMouse() {
      current.x += (target.x - current.x) * lerpSpeed;
      current.y += (target.y - current.y) * lerpSpeed;
      circleMouse!.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(moveCircleMouse);
    }

    function upadteTargetPosition(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    moveCircleMouse();
    window.addEventListener("mousemove", upadteTargetPosition);

    return () => {
      window.removeEventListener("mousemove", upadteTargetPosition);
    };
  }, []);

  return (
    <motion.div
      id="circle-mouse"
      style={{
        zIndex: 9999,
        backdropFilter: "invert(0.8)",
        height: "1rem",
        width: "1rem",
        scale: mouseDownRef.current ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/10 bg-white/10 backdrop-blur-sm transition-transform duration-100 ease-out"
    />
  );
};

export default CircleMouse;
