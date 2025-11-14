"use client";

import { motion } from "framer-motion";
import { forwardRef, useRef, type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { useMousePosition } from "../hooks/useMousePosition";

type PopupProps = {
  children: ReactNode;
  pullForce?: number; // Allow customization of pull force
  scaleIncrease?: number; // Allow customization of scale increase on hover
  shrinkOnClick?: boolean; // Allow shrinking effect on click
  clickShrinkAmount?: number; // Amount to shrink on click
} & React.ComponentProps<typeof motion.div>;

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (
    {
      children,
      pullForce = 1 / 5,
      scaleIncrease = 1.3,
      shrinkOnClick = false,
      clickShrinkAmount = 0.4,
      whileHover,
      whileTap,
      transition,
      className,
      ...props
    },
    ref,
  ) => {
    Popup.displayName = "Popup";

    const mousePos = useMousePosition();
    const localRef = useRef<HTMLDivElement>(null);

    // Get the position of the center of the popup
    const getCenterPosition = () => {
      if (!localRef.current) return { x: 0, y: 0 };
      const rect = localRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    return (
      <motion.div
        ref={ref ?? localRef}
        whileHover={
          whileHover ?? {
            scale: scaleIncrease,
            x: (getCenterPosition().x - mousePos.x) * -pullForce,
            y: (getCenterPosition().y - mousePos.y) * -pullForce,
            zIndex: 999,
          }
        }
        whileTap={
          whileTap ??
          (shrinkOnClick
            ? {
                scale: scaleIncrease - clickShrinkAmount,
              }
            : {})
        }
        transition={
          transition ?? { type: "spring", stiffness: 500, damping: 50 }
        }
        className={cn("inline-block", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

export default Popup;
