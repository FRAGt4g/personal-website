"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMousePosition } from "~/hooks/useMousePosition";
import { cn } from "~/lib/utils";
import { usePreferences } from "~/providers/Preferences-Provider";

const ANIMATION_DURATION = 0.3;
export const ThemeTransition = () => {
  const { soonToBeTheme, hardSetTheme, theme } = usePreferences();
  const mousePosition = useMousePosition();
  const [isAnimating, setIsAnimating] = useState(false);
  const hasTriggeredMidRef = useRef(false);
  const previousThemeRef = useRef<string | null>(null);
  const [animationStartPosition, setAnimationStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [radius, setRadius] = useState(0);

  const onMidAnimation = useCallback(() => {
    if (!soonToBeTheme) return;
    hardSetTheme(soonToBeTheme);
  }, [soonToBeTheme, hardSetTheme]);

  function onComplete() {
    setIsAnimating(false);
    hasTriggeredMidRef.current = false;
    setAnimationStartPosition(null);
    setRadius(0);
  }

  useEffect(() => {
    // Only animate if theme is actually changing and we have a valid theme
    if (
      soonToBeTheme &&
      soonToBeTheme !== theme &&
      soonToBeTheme !== previousThemeRef.current
    ) {
      previousThemeRef.current = soonToBeTheme;
      // Capture mouse position at animation start
      const startPos = {
        x: mousePosition.x,
        y: mousePosition.y,
      };
      setAnimationStartPosition(startPos);

      setIsAnimating(true);
      hasTriggeredMidRef.current = false;

      setRadius(window.innerWidth * 2.5);

      const midAnimationTimer = setTimeout(
        () => {
          if (!hasTriggeredMidRef.current) {
            hasTriggeredMidRef.current = true;
            onMidAnimation();
          }
        },
        ANIMATION_DURATION * 0.5 * 1000,
      );

      return () => clearTimeout(midAnimationTimer);
    }
  }, [soonToBeTheme, theme, mousePosition, onMidAnimation]);

  // Use the captured position for animation, fallback to current if not set
  const animationPosition = animationStartPosition ?? mousePosition;

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{
            width: 1,
            height: 1,
          }}
          // animate={{
          //   width: radius,
          //   height: radius,
          // }}
          exit={{
            width: 1,
            height: 1,
          }}
          transition={{
            duration: ANIMATION_DURATION,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            setIsAnimating(false);
            hasTriggeredMidRef.current = false;
            onComplete();
          }}
          className={cn("bg-primary", soonToBeTheme)}
          style={{
            position: "fixed",
            left: animationPosition.x,
            top: animationPosition.y,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            transformOrigin: "center",
            transform: "translate(-50%, -50%)",
            mixBlendMode: "normal",
            willChange: "transform",
          }}
        />
      )}
    </AnimatePresence>
  );
};
