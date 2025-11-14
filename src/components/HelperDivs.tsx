import { forwardRef } from "react";
import { cn } from "~/lib/utils";

type HelperDivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  centered?: boolean;
  fill?: boolean;
};

type VerticalDivProps = HelperDivProps & {
  x?: "left" | "center" | "right" | "space-between" | "space-around";
  y?: "top" | "middle" | "bottom" | "stretch" | "baseline";
};

export const VStack = forwardRef<HTMLDivElement, VerticalDivProps>(
  (
    {
      children,
      className,
      gap = 4,
      centered = false,
      fill = false,
      x,
      y,
      style,
      ...props
    },
    ref,
  ) => {
    VStack.displayName = "VStack";
    const _x = centered ? "center" : (x ?? "left");
    const _y = centered ? "middle" : (y ?? "top");
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className, {
          "h-full": fill,
          "items-start": _x === "left",
          "items-center": _x === "center",
          "items-end": _x === "right",
          "items-stretch": _x === "space-between",
          "items-baseline": _x === "space-around",
          "justify-start": _y === "top",
          "justify-center": _y === "middle",
          "justify-end": _y === "bottom",
          "justify-between": _y === "stretch",
          "justify-around": _y === "baseline",
        })}
        style={{ gap: `${gap / 4}rem`, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

type HorizontalDivProps = HelperDivProps & {
  x?: "left" | "center" | "right" | "between" | "around";
  y?: "top" | "middle" | "bottom" | "stretch" | "baseline";
};

export const HStack = forwardRef<HTMLDivElement, HorizontalDivProps>(
  (
    {
      children,
      className,
      gap = 4,
      fill = false,
      centered = false,
      x: x,
      y: y,
      style,
      ...props
    },
    ref,
  ) => {
    HStack.displayName = "HStack";
    const _x = centered ? "center" : (x ?? "left");
    const _y = centered ? "middle" : (y ?? "top");

    return (
      <div
        ref={ref}
        className={cn("flex flex-row", className, {
          "w-full": fill,
          "justify-start": _x === "left",
          "justify-center": _x === "center",
          "justify-end": _x === "right",
          "justify-between": _x === "between",
          "justify-around": _x === "around",
          "items-start": _y === "top",
          "items-center": _y === "middle",
          "items-end": _y === "bottom",
          "items-stretch": _y === "stretch",
          "items-baseline": _y === "baseline",
        })}
        style={{ gap: `${gap / 4}rem`, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export const Wrap = forwardRef<
  HTMLDivElement,
  HorizontalDivProps & { maxCols?: number }
>(
  (
    {
      children,
      className,
      gap = 4,
      centered = false,
      fill = false,
      x: x,
      y: y,
      maxCols,
      style,
      ...props
    },
    ref,
  ) => {
    Wrap.displayName = "Wrap";
    const _x = centered ? "center" : (x ?? "left");
    const _y = centered ? "middle" : (y ?? "top");
    return (
      <div
        ref={ref}
        className={cn("flex flex-row flex-wrap", className, {
          "w-full": fill,
          "flex-wrap": maxCols !== -1,
          "justify-start": _x === "left",
          "justify-center": _x === "center",
          "justify-end": _x === "right",
          "justify-between": _x === "between",
          "justify-around": _x === "around",
          "items-start": _y === "top",
          "items-center": _y === "middle",
          "items-end": _y === "bottom",
          "items-stretch": _y === "stretch",
          "items-baseline": _y === "baseline",
        })}
        style={{ gap: `${gap / 4}rem`, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  maxCols?: number;
  xGap?: number;
  yGap?: number;
  direction?: "row" | "column";
  x?:
    | "center"
    | "left"
    | "right"
    | "space-between"
    | "space-around"
    | "space-evenly";
  y?:
    | "middle"
    | "top"
    | "bottom"
    | "space-between"
    | "space-around"
    | "space-evenly";
  fill?: boolean;
};
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      maxCols = -1,
      xGap = 4,
      yGap = 4,
      direction = "row",
      x = "left",
      y = "top",
      fill = false,
      style,
      ...props
    },
    ref,
  ) => {
    Grid.displayName = "Grid";
    return (
      <div
        ref={ref}
        className={cn("grid", className, {
          "w-full": fill,
          "grid-cols-1": direction === "column",
          "grid-cols-2": direction === "row",
          "items-center": x === "center",
          "items-left": x === "left",
          "items-right": x === "right",
          "justify-center": y === "middle",
          "justify-start": y === "top",
          "justify-end": y === "bottom",
          "justify-between": y === "space-between",
          "justify-around": y === "space-around",
        })}
        style={{
          gap: `${yGap / 4}rem ${xGap / 4}rem`,
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
