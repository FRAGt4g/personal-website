"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMousePosition } from "./useMousePosition";

interface PopupProps {
  children: ReactNode;
  pullForce?: number; // Allow customization of pull force
  scaleIncrease?: number; // Allow customization of scale increase on hover
  shrinkOnClick?: boolean; // Allow shrinking effect on click
  clickShrinkAmount?: number; // Amount to shrink on click
}

const Popup = ({
  children,
  pullForce = 1 / 5,
  scaleIncrease = 1.3,
  shrinkOnClick = false,
  clickShrinkAmount = 0.4,
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
        zIndex: 999,
      }}
      whileTap={
        shrinkOnClick
          ? {
              scale: scaleIncrease - clickShrinkAmount,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default Popup;
