"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { playBlur } from "~/components/PageBlur";

type ExpandOut<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;

export type StoredPrefernceValue<T> = {
  value: T;
  key: string;
};

export type EphemeralPrefernceValue<T> = {
  value: T;
};

export const THEME_OPTIONS = {
  dark: ["dark", "draconic", "cyberpunk", "space"],
  light: ["light", "aquatic", "forest", "desert"],
} as const;

export type Theme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS][number];
export type PREFERENCE_PreferredLuminosity = "system" | "dark" | "light";

export type StoredPreferences = {
  luminosity: StoredPrefernceValue<PREFERENCE_PreferredLuminosity> & {
    toggleDarkMode: () => void;
    isDarkMode: () => boolean;
  };
};

export type EphemeralPreferences = {
  theme: EphemeralPrefernceValue<Theme> & {
    applyRandomTheme: () => void;
    setTheme: (theme: Theme) => void;
  };
};

export const DEFAULT_PREFERENCES: StoredPreferences & EphemeralPreferences = {
  luminosity: {
    value: "system",
    key: "ui-theme",
    isDarkMode: () => false,
    toggleDarkMode: () => null,
  },
  theme: {
    value: "light",
    applyRandomTheme: () => null,
    setTheme: () => null,
  },
};

type ValuesPart<T extends Record<string, { value: unknown }>> = {
  [K in keyof T]: T[K]["value"];
};

type SettersPart<T extends Record<string, { value: unknown }>> = {
  [K in keyof T as `set${Capitalize<K & string>}`]: (
    value: T[K]["value"],
  ) => void;
};

type ExtrasPart<T extends Record<string, { value: unknown }>> = {
  [K in keyof T as `${K & string}`]: {
    [k in keyof Omit<T[K], "key" | "value">]: T[K][k];
  };
};

type FlattenOneLevel<T extends Record<string, object>> = {
  [K in keyof T]: T[K] extends object
    ? keyof T[K] extends never
      ? never
      : T[K]
    : never;
}[keyof T] extends infer U
  ? U extends object
    ? { [K in keyof U]: U[K] }
    : never
  : never;

type PreferencesContext = {
  isMounted: boolean;
} & ExpandOut<
  ValuesPart<StoredPreferences> &
    SettersPart<StoredPreferences> &
    FlattenOneLevel<ExtrasPart<StoredPreferences>>
> &
  ExpandOut<
    ValuesPart<EphemeralPreferences> &
      SettersPart<EphemeralPreferences> &
      FlattenOneLevel<ExtrasPart<EphemeralPreferences>>
  >;

const PreferencesProviderContext = createContext<PreferencesContext>(
  Object.entries(DEFAULT_PREFERENCES).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: value.value,
      };
    },
    {
      isMounted: false,
    } as PreferencesContext,
  ),
);

export function PreferencesProvider(props: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [luminosity, setLuminosity] = useState<PREFERENCE_PreferredLuminosity>(
    DEFAULT_PREFERENCES.luminosity.value,
  );
  const [theme, setTheme] = useState<Theme>(DEFAULT_PREFERENCES.theme.value);

  function getPrefersDarkMode() {
    const a = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("getPrefersDarkMode", a);
    return a;
  }

  function darkOrLightLuminosity() {
    return luminosity === "system"
      ? getPrefersDarkMode()
        ? "dark"
        : "light"
      : luminosity;
  }

  useEffect(() => {
    const storedTheme = localStorage?.getItem(
      DEFAULT_PREFERENCES.luminosity.key,
    ) as PREFERENCE_PreferredLuminosity | null;
    if (storedTheme) {
      console.log("storedTheme", storedTheme);
      setLuminosity(storedTheme);
      applyRandomTheme(storedTheme);
    } else {
      applyRandomTheme("system");
    }

    setIsMounted(true);
  }, []);

  const applyRandomTheme = useCallback(
    (_luminosity?: PREFERENCE_PreferredLuminosity) => {
      const l = _luminosity ?? luminosity;
      const options =
        THEME_OPTIONS[l === "system" ? darkOrLightLuminosity() : l];
      const a = options[Math.floor(Math.random() * options.length)] as Theme;
      handleThemeChange(a);
    },
    [luminosity],
  );

  function handleThemeChange(theme: Theme) {
    playBlur(
      darkOrLightLuminosity() === "dark"
        ? "rgba(0, 0, 0, 0.9)"
        : "rgba(255, 255, 255, 0.9)",
    );
    console.log("handleThemeChange", theme);
    for (const luminosity of Object.keys(THEME_OPTIONS)) {
      for (const option of THEME_OPTIONS[
        luminosity as keyof typeof THEME_OPTIONS
      ]) {
        document.documentElement.classList.remove(option);
      }
    }
    document.documentElement.classList.add(theme);

    setTheme(theme);
  }

  const value: PreferencesContext = {
    isMounted: isMounted,
    luminosity,
    setLuminosity,
    toggleDarkMode: () => {
      const oppositeLuminosity =
        darkOrLightLuminosity() === "dark" ? "light" : "dark";
      localStorage.setItem(
        DEFAULT_PREFERENCES.luminosity.key,
        oppositeLuminosity,
      );
      setLuminosity(oppositeLuminosity);
      applyRandomTheme(oppositeLuminosity);
    },
    applyRandomTheme,
    isDarkMode: () => darkOrLightLuminosity() === "dark",
    theme,
    setTheme,
  };

  if (!isMounted) {
    return null;
  }

  return (
    <PreferencesProviderContext.Provider {...props} value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const storedTheme = localStorage.getItem("${DEFAULT_PREFERENCES.luminosity.key}");
          if (storedTheme) {
            document.documentElement.classList.add(storedTheme);
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
