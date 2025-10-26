"use client";

import { useEffect, useRef } from "react";
import { usePreferences } from "~/components/providers/Preferences-Provider";

const Bubbles = [
  {
    width: 700,
    height: 700,
    color: "255, 0, 255",
  },
  {
    width: 1000,
    height: 1000,
    color: "255, 0, 0",
  },
  {
    width: 1000,
    height: 1000,
    color: "0, 255, 0",
  },
  {
    width: 750,
    height: 750,
    color: "0, 0, 255",
  },
  {
    width: 500,
    height: 500,
    color: "0, 255, 255",
  },
  {
    width: 300,
    height: 300,
    color: "255, 255, 0",
  },
];

const moveingBubbles = [
  {
    size: { width: 500, height: 500 },
    color: "255, 100, 255",
  },
  {
    size: { width: 500, height: 500 },
    color: "0, 255, 0",
  },
];

const MovableBubble = {
  width: 500,
  height: 500,
  color: "255, 100, 255",
};

function seededRandom(seed: number) {
  return Math.abs(Math.sin((seed + 121.493) * 8536.317 + 127.25)) % 1;
}

const GooGradient = () => {
  const interBubbleRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = usePreferences();
  const movableBubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interBubble = interBubbleRef.current!;
    const movableBubble = movableBubbleRef.current!;
    const scaling = 200;
    const moveableBubblePos = [
      {
        current: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
      },
    ];
    // const movableBubbleX = 0;
    // const movableBubbleY = 0;
    // const movableBubbleTgX = 0;
    // const movableBubbleTgY = 0;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function moveMovableBubble(index: number) {
      const bubble = moveableBubblePos[index]!;
      bubble.current.x += (bubble.target.x - bubble.current.x) / scaling;
      bubble.current.y += (bubble.target.y - bubble.current.y) / scaling;
      movableBubble.style.transform = `translate(${Math.round(bubble.current.x)}px, ${Math.round(bubble.current.y)}px)`;
      requestAnimationFrame(() => {
        moveMovableBubble(index);
      });
    }

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    moveableBubblePos.forEach((bubble) => {
      setInterval(() => {
        bubble.target.x = Math.random() * window.innerWidth;
        bubble.target.y = Math.random() * window.innerHeight;
      }, 1000);
    });

    move();
    moveableBubblePos.forEach((bubble, index) => {
      moveMovableBubble(index);
    });
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        overflow: "hidden",
        background: isDarkMode() ? "black" : "white",
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
        <div
          ref={movableBubbleRef}
          style={{
            position: "absolute",
            pointerEvents: "none",
            background: `radial-gradient(circle at center, rgba(${MovableBubble.color}, 0.8) 0, rgba(${MovableBubble.color}, 0) 50%) no-repeat`,
            mixBlendMode: "multiply",

            width: MovableBubble.width,
            height: MovableBubble.height,
            top: "-50%",
            left: "-50%",

            opacity: 0.7,
          }}
        />
        {/* {Bubbles.map((bubble, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              pointerEvents: "none",
              background: `radial-gradient(circle at center,
                rgba(${bubble.color}, 0.8) 0,
                rgba(${bubble.color}, 0) 50%) no-repeat`,
              mixBlendMode: "multiply",

              width: bubble.width,
              height: bubble.height,
              top: `${seededRandom(index) * window.innerHeight - bubble.height / 2}px`,
              left: `${seededRandom(index) * window.innerWidth - bubble.width / 2}px`,

              transformOrigin: "center center",

              opacity: "1",
            }}
          />
        ))} */}
        <div
          ref={interBubbleRef}
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
    </div>
  );
};

export default GooGradient;
