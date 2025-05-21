"use client";

import { useEffect, useRef, useState } from "react";
import GradientText from "~/components/GradientText";
import { VStack } from "~/components/HelperDivs";
import {
  Theme,
  usePreferences,
} from "~/components/providers/Preferences-Provider";

export default function Home() {
  const [dummy, setDummy] = useState<Theme | undefined>(undefined);
  const { getAllowedThemes } = usePreferences();
  const allowedThemesRef = useRef(() => getAllowedThemes());
  const themeRef = useRef<Theme | undefined>(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const allowedThemes = allowedThemesRef
        .current()
        .filter((value) => value !== themeRef.current);
      const newIndex = Math.floor(Math.random() * allowedThemes.length);
      const newTheme = allowedThemes[newIndex];

      setDummy(newTheme);
      themeRef.current = newTheme;
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-safe-area flex-col bg-background">
      <VStack className="ml-10 mt-24 w-full" ySpacing="top">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {`What's up! I'm`}
        </h1>
        <h1 className="h-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <GradientText
            className={themeRef.current}
            style={{
              fontFamily: themeRef.current ? `var(--theme-font-sans)` : "",
            }}
          >
            Miles Fritzmather
          </GradientText>
        </h1>
      </VStack>
    </div>
  );
}
