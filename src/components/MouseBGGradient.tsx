"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "./useMousePosition";

const BackgroundGradient = () => {
  const mousePos = useMousePosition();

  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full opacity-40 blur-md backdrop:blur-md">
      <motion.div
        style={{ x: mousePos.x, y: mousePos.y }}
        className="h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#f43f5e] to-[#f97316] opacity-30 blur-3xl"
      ></motion.div>
    </div>
  );
};

export default BackgroundGradient;
