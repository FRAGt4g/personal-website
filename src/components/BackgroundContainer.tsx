"use client";

import { useState } from "react";
import BackgroundNoiseEffect from "./BackgroundEffects";
import NoiseFilters from "./NoiseFilters";

interface BackgroundContainerProps {
  children?: React.ReactNode;
  defaultRadius?: number;
  defaultBlur?: number;
  showControls?: boolean;
}

export default function BackgroundContainer({
  children,
  defaultRadius = 300,
  defaultBlur = 3,
  showControls = false,
}: BackgroundContainerProps) {
  const [radius, setRadius] = useState(defaultRadius);
  const [blur, setBlur] = useState(defaultBlur);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <BackgroundNoiseEffect blur={blur} />

      {/* Noise filters */}
      <NoiseFilters />

      {/* Content */}
      {children}

      {/* Optional controls */}
      {showControls && (
        <div className="absolute right-4 top-4 z-20 space-y-4 rounded-lg bg-black/20 p-4 backdrop-blur-sm">
          <div>
            <label className="block text-sm text-white">
              Radius: {radius}px
            </label>
            <input
              type="range"
              min="50"
              max="800"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Blur: {blur}rem</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
