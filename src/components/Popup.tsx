"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMousePosition } from "./useMousePosition";

interface PopupProps {
  children: ReactNode;
  pullForce?: number; // Allow customization of pull force
  addShadow?: boolean; // Allow toggling shadow effect
  scaleIncrease?: number; // Allow customization of scale increase on hover
}

const Popup = ({
  children,
  pullForce = 1 / 5,
  addShadow = false,
  scaleIncrease = 1.2,
}: PopupProps) => {
  const mousePos = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);

  // Get the position of the center of the popup
  const getCenterPosition = () => {
    if (!ref.current) return { x: 0, y: 0 };

    const rect = ref.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{
        scale: scaleIncrease,
        x: (getCenterPosition().x - mousePos.x) * -pullForce,
        y: (getCenterPosition().y - mousePos.y) * -pullForce,
        boxShadow: addShadow ? "0px 10px 20px rgba(0, 0, 0, 0.2)" : undefined,
        zIndex: 999,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default Popup;
