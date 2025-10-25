"use client";

import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import useTopOfScreen from "~/hooks/useTopOfScreen";
import { cn } from "~/lib/utils";

const BouncingArrow = () => {
  const { atTopOfPage } = useTopOfScreen();

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 opacity-40 blur-0 transition-all duration-500",
        !atTopOfPage && "opacity-0 blur-lg",
      )}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          type: "keyframes",
          stiffness: 300,
          damping: 25,
        }}
      >
        <FaArrowDown size={30} />
      </motion.div>
    </div>
  );
};

export default BouncingArrow;
