import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { type Theme } from "~/styles/Themes";
import { usePreferences } from "../providers/Preferences-Provider";

const GlitchReveal = ({
  children,
  animationTime = 1000,
  ticksPerSecond = 10,
  className,
}: {
  children: React.ReactNode;
  animationTime?: number;
  ticksPerSecond?: number;
  className?: string;
}) => {
  const [tickCount, setTickCount] = useState<number>(0);
  const { theme, getRandomTheme } = usePreferences();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { once: true });
  const customThemeRef = useRef<Theme>(theme);
  const done = tickCount / ticksPerSecond >= animationTime / 1000;
  const intervalID = useRef<NodeJS.Timeout | null>(null);

  console.log(animationTime, ticksPerSecond, tickCount, done);
  useEffect(() => {
    if (done && intervalID.current) {
      clearInterval(intervalID.current);
      intervalID.current = null;
    }
  }, [done, intervalID]);

  useEffect(() => {
    if (onScreen) {
      intervalID.current = setInterval(() => {
        setTickCount((prev) => prev + 1);
        customThemeRef.current = getRandomTheme(true);
      }, 1000 / ticksPerSecond);
      return () => {
        if (intervalID.current) {
          clearInterval(intervalID.current);
        }
      };
    }
  }, [onScreen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        done ? theme : customThemeRef.current,
        "relative",
        className,
        done && "opacity-0",
      )}
      style={{
        fontFamily: "var(--theme-font-sans)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlitchReveal;
