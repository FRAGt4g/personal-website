import { useState } from "react";
import { cn } from "~/lib/utils";

type GradientTextProps = {
  className?: string;
  animationDuration?: number;
  children?: string;
  noSpaces?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function GradientText({
  animationDuration = 0.5,
  children,
  noSpaces = false,
  className,
  style,
  ...props
}: GradientTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        "bg-gradient-to-tr from-primary via-accent to-primary bg-clip-text text-transparent",
        className,
      )}
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: isHovered ? "100% 0%" : "0% 100%",
        transition: `background-position ${animationDuration}s ease-in-out`,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {noSpaces ? children : ` ${children} `}
    </span>
  );
}
