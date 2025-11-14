"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const CircleMouse = () => {
  const size = 20;
  const circleMouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circleMouseRef.current) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const lerpSpeed = 0.9;

    function moveCircleMouse() {
      current.x += (target.x - current.x) * lerpSpeed;
      current.y += (target.y - current.y) * lerpSpeed;
      circleMouseRef.current!.style.transform = `translate(${current.x - size / 2}px, ${current.y - size / 2}px)`;
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
      ref={circleMouseRef}
      style={{
        zIndex: 100,
        backdropFilter: "invert(0.8)",
        height: size,
        width: size,
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
