"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ExpandOut<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;

export type PreferncesValues<T> = {
  value: T;
  key: string;
};

export type PREFERENCE_Theme = "system" | "light" | "dark";

export type PreferncesConfig = {
  theme: PreferncesValues<PREFERENCE_Theme> & {
    toggleDarkMode: () => void;
    isDarkMode: () => boolean;
  };
};

export const DEFAULT_PREFERENCES: PreferncesConfig = {
  theme: {
    value: "system",
    key: "ui-theme",
    toggleDarkMode: () => null,
    isDarkMode: () => false,
  },
};

type ValuesPart = {
  [K in keyof PreferncesConfig]: PreferncesConfig[K]["value"];
};

type SettersPart = {
  [K in keyof PreferncesConfig as `set${Capitalize<K & string>}`]: (
    value: PreferncesConfig[K]["value"],
  ) => void;
};

type ExtrasPart = {
  [K in keyof PreferncesConfig as `${K & string}`]: {
    [k in keyof Omit<
      PreferncesConfig[K],
      "key" | "value"
    >]: PreferncesConfig[K][k];
  };
};

type FlattenedExtrasPart = {
  [K in keyof ExtrasPart as `${keyof ExtrasPart[K] & string}`]: ExtrasPart[K][keyof ExtrasPart[K]];
};

type PreferencesContext = {
  isMounted: boolean;
} & ExpandOut<ValuesPart & SettersPart & FlattenedExtrasPart>;

const PreferencesProviderContext = createContext<PreferencesContext>({
  isMounted: false,
  theme: DEFAULT_PREFERENCES.theme.value,
  setTheme: () => null,
  toggleDarkMode: () => null,
  isDarkMode: () => false,
});

export function PreferencesProvider(props: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<PREFERENCE_Theme>(
    DEFAULT_PREFERENCES.theme.value,
  );

  useEffect(() => {
    const storedTheme = localStorage?.getItem(
      DEFAULT_PREFERENCES.theme.key,
    ) as PREFERENCE_Theme | null;
    if (storedTheme) {
      handleThemeChange(storedTheme);
    }

    setIsMounted(true);
  }, []);

  function handleThemeChange(theme: PREFERENCE_Theme) {
    localStorage.setItem(DEFAULT_PREFERENCES.theme.key, theme);
    if (theme === "system") {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );

      // Add listener for system theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          document.documentElement.classList.toggle("dark", e.matches);
        });
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }

    setTheme(theme);
  }

  const value: PreferencesContext = {
    isMounted: isMounted,
    theme,
    setTheme: handleThemeChange,
    toggleDarkMode: () => {
      console.log("toggleDarkMode, ", isDarkMode());
      handleThemeChange(isDarkMode() ? "light" : "dark");
    },
    isDarkMode: () => isDarkMode(),
  };

  if (!isMounted) {
    return null;
  }

  return (
    <PreferencesProviderContext.Provider {...props} value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          let isDark = false;
          const storedTheme = localStorage.getItem("${DEFAULT_PREFERENCES.theme.key}");
          if (storedTheme === "dark") {
            isDark = true;
          } else if (storedTheme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            isDark = true;
          }
          if (isDark) {
            document.documentElement.classList.add('dark');
          }
        `,
        }}
      />
      {props.children}
    </PreferencesProviderContext.Provider>
  );
}

export const usePreferences = () => {
  const context = useContext(PreferencesProviderContext);

  if (!context.isMounted)
    throw new Error("usePreferences must be used within a PreferencesProvider");

  return context;
};

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}
