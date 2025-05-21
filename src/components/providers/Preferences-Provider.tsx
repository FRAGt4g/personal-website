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
  dark: ["dark", "draconic", "cyberpunk", "space", "retro"],
  light: ["light", "aquatic", "forest", "desert", "lunar"],
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
    applyRandomTheme: (mustBeNew?: boolean) => void;
    setTheme: (theme: Theme) => void;
    getAllowedThemes: () => readonly Theme[];
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
    getAllowedThemes: () => THEME_OPTIONS.dark,
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

type FlattenOneLevel<T extends Record<string, { value: unknown }>> = {
  [K in keyof ExtrasPart<T>]: ExtrasPart<T>[K] extends object
    ? keyof ExtrasPart<T>[K] extends never
      ? never
      : ExtrasPart<T>[K]
    : never;
}[keyof ExtrasPart<T>] extends infer U
  ? U extends object
    ? { [K in keyof U]: U[K] }
    : never
  : never;

type PreferencesContext = {
  isMounted: boolean;
} & ExpandOut<
  ValuesPart<StoredPreferences> &
    SettersPart<StoredPreferences> &
    FlattenOneLevel<StoredPreferences>
> &
  ExpandOut<
    ValuesPart<EphemeralPreferences> &
      SettersPart<EphemeralPreferences> &
      FlattenOneLevel<EphemeralPreferences>
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
      setLuminosity(storedTheme);
      applyRandomTheme(storedTheme);
    } else {
      applyRandomTheme("system");
    }

    setIsMounted(true);
  }, []);

  const applyRandomTheme = useCallback(
    (_luminosity?: PREFERENCE_PreferredLuminosity, mustBeNew?: boolean) => {
      const l = _luminosity ?? luminosity;
      const options = THEME_OPTIONS[
        l === "system" ? darkOrLightLuminosity() : l
      ].filter((option) => (mustBeNew ? option !== theme : true)) as Theme[];
      const randomTheme = options[
        Math.floor(Math.random() * options.length)
      ] as Theme;
      console.log("options", options);
      console.log("theme", randomTheme);

      handleThemeChange(randomTheme);
    },
    [luminosity],
  );

  function handleThemeChange(theme: Theme) {
    playBlur(
      darkOrLightLuminosity() === "dark"
        ? "rgba(0, 0, 0, 0.9)"
        : "rgba(255, 255, 255, 0.9)",
    );
    for (const luminosity of Object.keys(THEME_OPTIONS)) {
      for (const option of THEME_OPTIONS[
        luminosity as keyof typeof THEME_OPTIONS
      ]) {
        document.documentElement.classList.remove(option);
      }
    }
    document.documentElement.classList.add(theme);
    console.log("theme", theme);

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
    applyRandomTheme: (mustBeNew?: boolean) => {
      applyRandomTheme(undefined, mustBeNew);
    },
    isDarkMode: () => darkOrLightLuminosity() === "dark",
    theme,
    setTheme,
    getAllowedThemes: () => THEME_OPTIONS[darkOrLightLuminosity()],
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
