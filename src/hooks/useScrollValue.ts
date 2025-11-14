"use client";

import { useEffect, useState } from "react";
import { clamp } from "~/lib/utils";

function useScrollValue({
  start,
  end,
  minValue,
  maxValue,
}: {
  start: number;
  end: number;
  minValue: number;
  maxValue: number;
}) {
  const [value, setValue] = useState(minValue);

  useEffect(() => {
    const handleScroll = () => {
      const progress = (window.scrollY - start) / (end - start);
      const clampedProgress = clamp(progress, { min: 0, max: 1 });
      setValue(minValue + clampedProgress * (maxValue - minValue));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [start, end, minValue, maxValue]);

  return value;
}

export default useScrollValue;
