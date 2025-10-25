"use client";

import { useState } from "react";

interface ToggleProps {
  onClass: string;
  offClass: string;
  label?: string;
  initialOff?: boolean;
}

export default function Toggle({
  onClass,
  offClass,
  label,
  initialOff = false,
}: ToggleProps) {
  const [isOff, setIsOff] = useState(initialOff);

  const handleClick = () => {
    setIsOff(!isOff);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
      <div
        className={`toggle ${onClass.includes("light") ? "light" : "dark"}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className={`switch ${onClass} ${isOff ? offClass : ""}`} />
      </div>
    </div>
  );
}
