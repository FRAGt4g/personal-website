"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "./useMousePosition";

const BackgroundMovingGradient = () => {
  const mousePos = useMousePosition();
  const scale = 3;

  return (
    <div className="opacity-1 pointer-events-none fixed left-0 top-0 -z-10 h-full w-full blur-md backdrop:blur-md">
      <motion.div
        animate={{
          x: [
            mousePos.x - 50 * scale,
            mousePos.x - 100 * scale,
            mousePos.x - 50 * scale,
          ],
          y: [
            mousePos.y - 100 * scale,
            mousePos.y - 50 * scale,
            mousePos.y - 100 * scale,
          ],
          width: [100, 200, 90, 150, 140, 80].map((x) => x * scale),
          height: [200, 100, 200, 75, 130].map((x) => x * scale),
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "backIn",
          repeat: Infinity,
          repeatType: "reverse",
          stiffness: 300,
          damping: 25,
          delay: 0.5,
        }}
        className="rounded-full bg-gradient-to-tr from-[#f43f5e] to-[#f97316] opacity-30 blur-3xl"
      ></motion.div>
    </div>
  );
};

export default BackgroundMovingGradient;
