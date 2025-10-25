"use client";

import { cn } from "~/lib/utils";
import { usePreferences } from "./providers/Preferences-Provider";

export default function BackgroundNoiseEffect() {
  const { isDarkMode } = usePreferences();

  const filters = {
    filter1: (
      <>
        <feTurbulence
          baseFrequency="0.33"
          numOctaves="10"
          result="noise"
          seed="1"
        />
        <feColorMatrix in="noise" type="saturate" values="0" />
      </>
    ),
    // filter2: (
    //   <>
    //     <feTurbulence
    //       baseFrequency="0.9"
    //       numOctaves="4"
    //       result="noise"
    //       seed="2"
    //     />
    //     <feColorMatrix in="noise" type="saturate" values="0" />
    //   </>
    // ),
  };

  return (
    <>
      <svg
        style={{
          position: "absolute",
          zIndex: 2,
          width: "100%",
          height: "100%",
        }}
        pointerEvents="none"
      >
        <defs>
          {Object.entries(filters).map(([key, filter]) => (
            <filter id={key} key={key}>
              {filter}
            </filter>
          ))}
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0">
        {/* Blur layers */}
        {/* <div
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ filter: `blur(${blur}rem)` }}
        />
        <div
          className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-black/5 to-transparent"
          style={{ filter: `blur(${blur * 0.7}rem)` }}
        /> */}
        <div className="absolute inset-0 h-full w-full blur-md" />
        {/* <div
          className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-black/5 to-transparent"
          style={{ filter: `blur(${blur * 0.7}rem)` }}
        /> */}
        {/* Noise overlay effects */}
        {Object.keys(filters).map((key) => (
          <div
            key={key}
            className={cn(
              "absolute inset-0 opacity-30 mix-blend-multiply",
              isDarkMode() ? "bg-white" : "bg-black",
            )}
            style={{ filter: `url(#${key})` }}
          />
        ))}
      </div>
    </>
  );
}
