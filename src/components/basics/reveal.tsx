"use client";

import { motion, useAnimationControls, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DisappearingGlitchText2 } from "~/components/Glitch Effects/GlitchText";
import GlitchReveal from "../Glitch Effects/GlitchReveal";

const Reveal = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  const controls = useAnimationControls();
  const onScreen = useInView(ref, { once: true });

  useEffect(() => {
    if (onScreen) {
      void controls.start({ opacity: 1, y: 0 });
    }
  }, [onScreen, controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({
  children,
  animationTime = 500,
  n = 4,
  ...props
}: {
  children: string;
  animationTime?: number;
  n?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [, forceUpdate] = useState<number>(0);
  const time = useRef<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { once: true });
  const charactersToEffect = children
    .split("")
    .filter((char) => char !== " ").length;
  const masterTimeDelta = Math.floor(
    animationTime / (n + charactersToEffect - 1),
  );

  useEffect(() => {
    if (onScreen) {
      const intervalID = setInterval(() => {
        time.current += masterTimeDelta;
        forceUpdate((prev) => prev + 1);
      }, masterTimeDelta);
      return () => clearInterval(intervalID);
    }
  }, [onScreen]);

  return (
    <div ref={ref} className="relative" {...props}>
      {children.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index}>{char}</span>;
        }
        return (
          <DisappearingGlitchText2
            key={index}
            ttr={masterTimeDelta}
            playForXTicks={index + n}
            name={"TextReveal" + index}
            time={time.current}
          >
            {char}
          </DisappearingGlitchText2>
        );
      })}
    </div>
  );
};

const GlitchTextReveal = ({
  children,
  animationTime = 500,
  ticksPerSecond = 4,
}: {
  children: string;
  animationTime?: number;
  ticksPerSecond?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return children.split("").map((char, index) => {
    if (char === " ") {
      return <span key={index}>{char}</span>;
    }
    return (
      <GlitchReveal
        key={index}
        animationTime={animationTime}
        ticksPerSecond={ticksPerSecond}
      >
        {char}
      </GlitchReveal>
    );
  });
};

export { GlitchReveal, GlitchTextReveal, Reveal, TextReveal };
