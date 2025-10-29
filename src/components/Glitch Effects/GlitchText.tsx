"use client";

import { useEffect, useRef, useState } from "react";
import { TextReveal } from "~/components/basics/reveal";
import GradientText from "~/components/GradientText";
import { cn } from "~/lib/utils";
import { usePreferences } from "~/providers/Preferences-Provider";
import { type Theme } from "~/styles/Themes";

type GlitchTextProps = {
  children: string;
  ttr?: number;
  name?: string;
  className?: string;
  trigger?: boolean;
  timer?: number;
};

type GlitchTextPropsWithExternalTimer = {
  children: string;
  tickDelay?: number;
  className?: string;
  timer: number;
  shouldResetStyle?: boolean;
};

export function GlitchTextWithExternalTimer({
  children,
  tickDelay = 500,
  className,
  timer,
  shouldResetStyle = true,
}: GlitchTextPropsWithExternalTimer) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);
  const renderCount = useRef(0);
  const { getRandomTheme } = usePreferences();

  useEffect(() => {
    renderCount.current++;
  }, []);

  useEffect(() => {
    if (renderCount.current <= 2) {
      if (renderCount.current === 2) {
        renderCount.current++;
      }
      // console.log(`${renderCount.current} render(s)`);
      return;
    }

    if (timer === -1 && shouldResetStyle) {
      setTheme(undefined);
    } else if (Math.abs(timer % tickDelay) < 100) {
      const newTheme = getRandomTheme();
      // console.log("newTheme", newTheme);
      setTheme(newTheme);
    } else {
      // console.log("did not updateTheme", timer, tickDelay);
    }
  }, [timer, tickDelay, getRandomTheme, shouldResetStyle]);

  return (
    <GradientText theme={theme} className={className}>
      {children}
    </GradientText>
  );
}

export default function GlitchText({
  children,
  ttr = 500,
  name,
  className,
  trigger,
  timer,
}: GlitchTextProps) {
  const [tickCount, setTickCount] = useState<number>(0);
  const { getRandomTheme } = usePreferences();
  const themeRef = useRef<Theme | undefined>(undefined);
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);

  function updateTheme() {
    themeRef.current = getRandomTheme(true);
    setTickCount((prev) => prev + 1);
  }

  function startEffect() {
    intervalId.current = setInterval(() => {
      updateTheme();
    }, ttr);
  }

  function stopEffect() {
    clearInterval(intervalId.current);
    intervalId.current = undefined;
    setTickCount(0);
    themeRef.current = undefined;
  }

  useEffect(() => {
    if (tickCount < children.length && !intervalId.current) {
      startEffect();
    }
  }, [ttr, name, tickCount]);

  useEffect(() => {
    if (trigger) {
      startEffect();
    } else {
      stopEffect();
    }
  }, [trigger]);

  return (
    <GradientText
      className={cn(themeRef.current, className)}
      style={{
        fontFamily: themeRef.current ? `var(--theme-font-sans)` : "",
      }}
    >
      {children}
    </GradientText>
  );
}

export function DisappearingGlitchText({
  children,
  ttr = 500,
  playForXTicks,
  keepLastThemeOnStop = false,
  name,
}: {
  children: string;
  ttr?: number;
  playForXTicks?: number;
  keepLastThemeOnStop?: boolean;
  name?: string;
}) {
  const [, setDummy] = useState<Theme | undefined>(undefined);
  const { getApplicableThemes } = usePreferences();
  const allowedThemesRef = useRef(() => getApplicableThemes());
  const themeRef = useRef<Theme | undefined>(undefined);
  const updateCountRef = useRef(0);
  const timedOut =
    playForXTicks !== undefined && updateCountRef.current >= playForXTicks;

  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  function updateTheme() {
    const allowedThemes = allowedThemesRef
      .current()
      .filter((value) => value !== themeRef.current);
    const newIndex = Math.floor(Math.random() * allowedThemes.length);
    const newTheme = allowedThemes[newIndex];
    themeRef.current = newTheme;
    setDummy(newTheme);
    updateCountRef.current++;
  }

  useEffect(() => {
    if (intervalID) {
      clearInterval(intervalID);
    }
  }, [timedOut]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIntervalID(
      setInterval(() => {
        console.log("updateTheme", name, updateCountRef.current);
        updateTheme();
      }, ttr),
    );
    return () => clearInterval(intervalID);
  }, [ttr, name]); // eslint-disable-line react-hooks/exhaustive-deps

  if (timedOut) {
    return (
      <span className={keepLastThemeOnStop ? themeRef.current : ""}>
        {children}
      </span>
    );
  }

  return (
    <GradientText
      className={themeRef.current}
      style={{
        fontFamily: themeRef.current ? `var(--theme-font-sans)` : "",
      }}
    >
      {children}
    </GradientText>
  );
}

export function DisappearingGlitchText2({
  children,
  ttr = 500,
  playForXTicks,
  name,
  time,
}: {
  children: string;
  ttr?: number;
  playForXTicks?: number;
  keepLastThemeOnStop?: boolean;
  name?: string;
  time?: number;
}) {
  const { getApplicableThemes } = usePreferences();
  const allowedThemesRef = useRef(() => getApplicableThemes());
  const themeRef = useRef<Theme | undefined>(undefined);
  const updateCountRef = useRef(0);
  const timedOut =
    playForXTicks !== undefined && updateCountRef.current >= playForXTicks;

  function updateTheme() {
    const allowedThemes = allowedThemesRef
      .current()
      .filter((value) => value !== themeRef.current);
    const newIndex = Math.floor(Math.random() * allowedThemes.length);
    const newTheme = allowedThemes[newIndex];
    themeRef.current = newTheme;
    updateCountRef.current++;
  }

  useEffect(() => {
    if (time && time % ttr === 0) {
      updateTheme();
    }
  }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

  if (timedOut) {
    return <span>{children}</span>;
  }

  return (
    <GradientText
      wrapWithSpaces
      className={themeRef.current}
      style={{
        fontFamily: themeRef.current ? `var(--theme-font-sans)` : "",
      }}
    >
      {children}
    </GradientText>
  );
}

export function HoverGlitchText({
  children,
  ttr = 500,
  name,
  noSpaces = false,
  className,
}: {
  children: string;
  ttr?: number;
  name?: string;
  noSpaces?: boolean;
  className?: string;
}) {
  const [, setDummy] = useState<Theme | undefined>(undefined);
  const { getRandomTheme } = usePreferences();
  const themeRef = useRef<Theme | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  function updateTheme() {
    const newTheme = getRandomTheme(true);
    themeRef.current = newTheme;
    setDummy(newTheme);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("updateTheme", name);
      updateTheme();
    }, ttr);
    return () => clearInterval(intervalRef.current);
  }, [ttr, name]);

  useEffect(() => {
    if (isHovered) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        console.log("updateTheme", name);
        updateTheme();
      }, ttr);
    }
  }, [isHovered, ttr, name]);

  return (
    <TextReveal
      className={cn(themeRef.current, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </TextReveal>
  );
}
