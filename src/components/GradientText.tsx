"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { type Theme } from "~/styles/Themes";

type GradientTextProps = {
  className?: string;
  animationDuration?: number;
  theme?: Theme;
} & (
  | {
      children: string;
      wrapWithSpaces?: boolean;
    }
  | {
      children: React.ReactNode;
      wrapWithSpaces?: never;
    }
) &
  React.HTMLAttributes<HTMLSpanElement>;

export default function GradientText({
  animationDuration = 0.5,
  children,
  wrapWithSpaces = false,
  className,
  style,
  theme,
  ...props
}: GradientTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        theme,
        "bg-gradient-to-tr from-primary via-accent to-primary bg-clip-text text-transparent",
        className,
      )}
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: isHovered ? "100% 0%" : "0% 100%",
        transition: `background-position ${animationDuration}s ease-in-out`,
        fontFamily: theme ? `var(--theme-font-sans)` : "",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {typeof children === "string"
        ? wrapWithSpaces
          ? children
          : ` ${children} `
        : children}
    </span>
  );
}
