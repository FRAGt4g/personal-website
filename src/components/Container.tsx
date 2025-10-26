"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";
import { usePreferences } from "./providers/Preferences-Provider";

type ContainerProps = {
  theme?: "dark" | "light";
} & React.ComponentProps<typeof motion.div>;

const shadowConfig = {
  light: {
    topEdge: "inset 0 5px 5px 0 rgb(255, 255, 255, 1)",
    topRightCorner: "inset -15px 28px 23px 2px rgb(0, 0, 0, 0.1)",
    bottomEdge: "inset 0 -5px 5px 0 rgb(255, 255, 255, 1)",
    bottomLeftCorner: "inset 23px -33px 28px 0 rgb(255, 255, 255, 0.9)",
    topGlow: "0 25px 41px 0 rgb(0, 0, 0, 0.16)",
    bottomDrop: "0 -5px 18px 0 rgb(255, 255, 255, 1)",
  },
  dark: {
    topEdge: "inset 0 5px 5px 0 rgb(255,255,255,0.13)",
    bottomEdge: "inset 0 -5px 5px 0 rgb(0,0,0,0.5)",
    topRightCorner: "inset 23px -33px 28px 0 rgb(255,255,255,0.03)",
    bottomLeftCorner: "inset -25px 28px 23px 0 rgb(0,0,0,0.4)",
    topGlow: "0 -7px 30px 0 rgb(255,255,255,0.08)",
    bottomDrop: "0 15px 30px 0 rgb(0,0,0,0.9)",
  },
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, style, className, theme, ...props }, ref) => {
    Container.displayName = "Container";
    const { isDarkMode } = usePreferences();
    const containerStyle = theme ?? (isDarkMode() ? "dark" : "light");

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex h-fit w-fit flex-col justify-center rounded-3xl p-4 backdrop-blur-md",
          className,
        )}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          backgroundColor:
            containerStyle === "dark"
              ? "rgba(26, 26, 26, 0.8)"
              : "rgba(237, 237, 237, 0.9)",
          boxShadow: Object.values(shadowConfig[containerStyle]).join(", "),
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

export default Container;
