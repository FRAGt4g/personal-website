"use client";

import { motion } from "framer-motion";
import { type ComponentProps, forwardRef } from "react";

type FadeInProps = ComponentProps<typeof motion.div> & {
  index?: number;
  delayBetween?: number;
  yOffset?: number;
};

const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  (
    { children, index = 0, delayBetween = 0.1, yOffset = 20, ...props },
    ref,
  ) => {
    FadeIn.displayName = "FadeIn";
    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          y: yOffset,
          ...(props.initial as object),
        }}
        animate={{
          opacity: 1,
          y: 0,
          ...(props.animate as object),
        }}
        transition={{
          duration: 0.5,
          delay: index * delayBetween,
          ...(props.transition as object),
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    );
  },
);

const FadeInText = forwardRef<
  HTMLSpanElement,
  Exclude<FadeInProps, "children"> & { text: string }
>(({ text, delayBetween = 0.1, ...props }, ref) => {
  FadeInText.displayName = "FadeInText";
  return (
    <span ref={ref} className="inline-flex whitespace-nowrap">
      {text.split("").map((char, index) => (
        <FadeIn
          key={index}
          index={index}
          delayBetween={delayBetween}
          {...props}
        >
          {char === " " ? "\u00A0" : char}
        </FadeIn>
      ))}
    </span>
  );
});

export { FadeIn, FadeInText };
