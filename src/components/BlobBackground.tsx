"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useMemo } from "react";
import useScrollValue from "~/hooks/useScrollValue";
import { useBackground } from "~/providers/BackgroundProvider";

const InteractiveSingleBlobBackground = () => {
  const { blobs, assignMouseBlob } = useBackground();

  // Memoize the blob elements to prevent unnecessary rerenders
  const blobElements = useMemo(
    () =>
      blobs.map((blob, index) => (
        <div
          id={`bubble-${index}`}
          key={index}
          ref={(el) => {
            (blob.ref as { current: HTMLDivElement }).current = el!;
          }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: blob.solidRadius + blob.glowRadius,
            height: blob.solidRadius + blob.glowRadius,
            background: `radial-gradient(circle at center, rgba(${blob.color}, 0.8) ${(blob.solidRadius / (blob.solidRadius + blob.glowRadius)) * 100}%, rgba(${blob.color}, 0) 50%) no-repeat`,
            mixBlendMode: "multiply",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      )),
    [blobs],
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        overflow: "hidden",
        top: "0",
        left: "0",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Filter />
      <div
        style={{
          filter: "url(#noise-filter)",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {blobElements}

        {/* Mouse blob */}
        <div
          ref={(el) => {
            assignMouseBlob(el!);
          }}
          style={{
            position: "fixed",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0, rgba(140, 100, 255, 0) 50%) no-repeat",
            mixBlendMode: "multiply",

            width: "100%",
            height: "100%",

            opacity: 0.7,
          }}
        />
      </div>
      <BlurOverlay />
    </div>
  );
};

const Filter = memo(() => {
  return (
    <svg
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }}
    >
      <filter id="noise-filter" pointerEvents="none">
        {/* Blur the source graphic */}
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />

        {/* Apply a color matrix to the blurred graphic */}
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
          result="goo"
        />

        {/* Blend the blurred graphic with the source graphic */}
        <feBlend in="SourceGraphic" in2="goo" result="blended" />

        {/* Perlin noise generation */}
        <feTurbulence
          baseFrequency="0.6"
          numOctaves="3"
          result="NOISE_FILTER"
          seed="1"
        />

        {/* Black and white conversion */}
        <feColorMatrix
          in="NOISE_FILTER"
          type="saturate"
          values="0"
          result="NOISE_FILTER_BW"
        />

        {/* Overlay the noise filter with the source graphic */}
        <feComposite
          in="SourceGraphic"
          in2="NOISE_FILTER_BW"
          operator="overlay"
          result="NOISE_FILTER_APPLIED"
        />

        {/* Extract the alpha channel of the source graphic */}
        <feColorMatrix
          in="blended"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="SOURCE_ALPHA"
        />

        {/* Combine the noise filter with the alpha channel */}
        <feComposite
          in="NOISE_FILTER_APPLIED"
          in2="SOURCE_ALPHA"
          operator="in"
          result="FINAL_BLOBS"
        />
      </filter>
    </svg>
  );
});

Filter.displayName = "Filter";

const BlurOverlay = () => {
  const maxBlur = 200;
  const maxOpacity = 1;
  const scrollValue = useScrollValue({
    start: 0,
    end: 500,
    minValue: 0,
    maxValue: 1,
  });
  const { setPaused } = useBackground();

  useEffect(() => {
    setPaused(scrollValue == 1);
  }, [scrollValue, setPaused]);

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        backdropFilter: `blur(${scrollValue * maxBlur}px)`,
        backgroundColor: `hsl(var(--background) / ${scrollValue * maxOpacity})`,
      }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default InteractiveSingleBlobBackground;
