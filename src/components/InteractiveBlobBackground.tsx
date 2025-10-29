"use client";

import { motion } from "framer-motion";
import { createRef, useEffect, useRef, type RefObject } from "react";
import useScrollValue from "~/hooks/useScrollValue";

type XY = { x: number; y: number };

type Bubble = {
  velocity: XY;
  translation: XY;
  ref: RefObject<HTMLDivElement>;
} & BubbleConfig;

type BubbleConfig = {
  size: { width: number; height: number };
  color: string;
  startingPosition: XY;
};

const BubbleConfigs = [
  {
    size: { width: 500, height: 500 },
    color: "255, 100, 255",
    startingPosition: { x: 84.7, y: 23.4 },
  },
  {
    size: { width: 1000, height: 1000 },
    color: "0, 255, 0",
    startingPosition: { x: 12.3, y: 67.8 },
  },
  {
    size: { width: 2000, height: 2000 },
    color: "0, 0, 255",
    startingPosition: { x: 45.6, y: 78.9 },
  },
  {
    size: { width: 1400, height: 1400 },
    color: "255, 255, 0",
    startingPosition: { x: 91.2, y: 34.5 },
  },
  {
    size: { width: 3000, height: 3000 },
    color: "255, 0, 0",
    startingPosition: { x: 56.7, y: 12.3 },
  },
  {
    size: { width: 1000, height: 1000 },
    color: "0, 0, 255",
    startingPosition: { x: 23.4, y: 87.6 },
  },
  {
    size: { width: 800, height: 800 },
    color: "200, 120, 0",
    startingPosition: { x: 78.9, y: 43.2 },
  },
] satisfies BubbleConfig[];

const InteractiveBubbleBackground = () => {
  const mouseBubble = useRef<HTMLDivElement>(null);
  const bubbles = BubbleConfigs.map((bubble) => ({
    ...bubble,
    velocity: {
      x: 0,
      y: 0,
    },
    translation: {
      x: 0,
      y: 0,
    },
    ref: createRef<HTMLDivElement>(),
  }));
  const mouseBubbleLerpSpeed = 20;

  useEffect(() => {
    const mouseBubblePos = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
    };
    let lastTime = Date.now();

    function updateBubbleVelocity(bubble: Bubble) {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000; // Convert to seconds
      const maxVelocity = 4;
      const acceleration = 2;

      // Gradually change velocity with smooth randomness
      bubble.velocity.x += (Math.random() - 0.5) * acceleration * deltaTime;
      bubble.velocity.y += (Math.random() - 0.5) * acceleration * deltaTime;

      // Clamp velocity to prevent too fast movement
      bubble.velocity.x = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, bubble.velocity.x),
      );
      bubble.velocity.y = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, bubble.velocity.y),
      );

      lastTime = now;
    }

    function moveMovableBubble(bubble: Bubble, index: number) {
      // Update velocity over time
      updateBubbleVelocity(bubble);

      // Update position based on velocity
      bubble.translation.x += bubble.velocity.x;
      bubble.translation.y += bubble.velocity.y;

      bubble.ref.current!.style.transform = `translate(${Math.round(bubble.translation.x)}px, ${Math.round(bubble.translation.y)}px)`;

      requestAnimationFrame(() => {
        moveMovableBubble(bubble, index);
      });
    }

    function move() {
      mouseBubblePos.current.x +=
        (mouseBubblePos.target.x - mouseBubblePos.current.x) /
        mouseBubbleLerpSpeed;
      mouseBubblePos.current.y +=
        (mouseBubblePos.target.y - mouseBubblePos.current.y) /
        mouseBubbleLerpSpeed;

      mouseBubble.current!.style.transform = `translate(${Math.round(mouseBubblePos.current.x)}px, ${Math.round(mouseBubblePos.current.y)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    function handleMouseMove(event: MouseEvent) {
      mouseBubblePos.target.x = event.clientX;
      mouseBubblePos.target.y = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);

    move();
    bubbles.forEach((bubble, index) => {
      moveMovableBubble(bubble, index);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [bubbles, mouseBubbleLerpSpeed]);

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
      <div
        style={{
          filter: "url(#noise-filter)",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {BubbleConfigs.map((bubble, index) => (
          <div
            key={index}
            ref={(el) => {
              (bubbles[index]!.ref as { current: HTMLDivElement }).current =
                el!;
            }}
            style={{
              position: "absolute",
              top: `${bubble.startingPosition.y}%`,
              left: `${bubble.startingPosition.x}%`,

              width: bubble.size.width,
              height: bubble.size.height,

              background: `radial-gradient(circle at center, rgba(${bubble.color}, 0.8) 0, rgba(${bubble.color}, 0) 50%) no-repeat`,
              mixBlendMode: "multiply",
              opacity: 0.7,

              pointerEvents: "none",
            }}
          />
        ))}
        <div
          ref={mouseBubble}
          style={{
            position: "absolute",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0, rgba(140, 100, 255, 0) 50%) no-repeat",
            mixBlendMode: "multiply",

            width: "100%",
            height: "100%",
            top: "-50%",
            left: "-50%",

            opacity: 0.7,
          }}
        />
      </div>
      <BlurOverlay />
    </div>
  );
};

const BlurOverlay = () => {
  const maxBlur = 200;
  const scrollValue = useScrollValue({
    start: 0,
    end: 500,
    minValue: 0,
    maxValue: maxBlur,
  });
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        backdropFilter: `blur(${scrollValue}px)`,
        backgroundColor: `hsl(var(--background) / ${scrollValue / maxBlur})`,
      }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default InteractiveBubbleBackground;
