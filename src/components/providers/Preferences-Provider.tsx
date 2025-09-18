"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { playBlur } from "~/components/PageBlur";
import { type Theme, THEME_OPTIONS } from "~/styles/Themes";

type ExpandOut<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;
type Shape = Record<string, { value: unknown }>;
export type StoredPrefernceValue<T> = {
  value: T;
  key: string;
};

export type EphemeralPrefernceValue<T> = {
  value: T;
};

type PreferencesContext = {
  isMounted: boolean;
} & FlattenedAndExpandedValues<EphemeralPreferences> &
  FlattenedAndExpandedValues<StoredPreferences>;

type AdditionalValues<T extends Record<string, { value: unknown }>> = {
  [K in keyof T as `${K & string}`]: {
    [k in keyof Omit<T[K], "key" | "value">]: T[K][k];
  };
};

type FlattenedAndExpandedValues<T extends Shape> = ExpandOut<
  {
    [K in keyof T]: T[K]["value"];
  } & {
    [K in keyof T as `set${Capitalize<K & string>}`]: (
      value: T[K]["value"],
    ) => void;
  } & {
      [K in keyof AdditionalValues<T>]: AdditionalValues<T>[K] extends object
        ? keyof AdditionalValues<T>[K] extends never
          ? never
          : AdditionalValues<T>[K]
        : never;
    }[keyof AdditionalValues<T>] extends infer U
    ? U extends object
      ? { [K in keyof U]: U[K] }
      : never
    : never
>;

/** ---------------------------------------------------------------------------------------------------- **/

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
    getApplicableThemes: () => readonly Theme[];
    applyTheme: (theme: Theme) => void;
    getRandomTheme: (mustBeNew?: boolean) => Theme;
  };
};

export const DEFAULT_PREFERENCES: ExpandOut<
  StoredPreferences & EphemeralPreferences
> = {
  luminosity: {
    value: "system",
    key: "ui-theme",
    isDarkMode: () => false,
    toggleDarkMode: () => null,
  },
  theme: {
    value: "light",
    applyRandomTheme: () => null,
    getApplicableThemes: () => THEME_OPTIONS.dark,
    applyTheme: () => null,
    getRandomTheme: () => "light",
  },
};

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
      ].filter((option) => (mustBeNew ? option !== theme : true));
      const randomTheme = options[Math.floor(Math.random() * options.length)]!;
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
        document.body.classList.remove(option);
      }
    }
    document.body.classList.add(theme);
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
    applyTheme: (theme: Theme) => {
      handleThemeChange(theme);
    },
    getApplicableThemes: () => THEME_OPTIONS[darkOrLightLuminosity()],
    getRandomTheme: (mustBeNew?: boolean) => {
      const options = THEME_OPTIONS[darkOrLightLuminosity()].filter((option) =>
        mustBeNew ? option !== theme : true,
      );
      return options[Math.floor(Math.random() * options.length)]!;
    },
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
