"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
    toggleDarkModeNoAnimation: () => void;
  };
};

export type EphemeralPreferences = {
  theme: EphemeralPrefernceValue<Theme> & {
    applyRandomTheme: (mustBeNew?: boolean) => void;
    getApplicableThemes: () => readonly Theme[];
    applyTheme: (theme: Theme) => void;
    soonToBeTheme: Theme | null;
    hardSetTheme: (theme: Theme) => void;
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
    toggleDarkModeNoAnimation: () => null,
  },
  theme: {
    value: "dark",
    soonToBeTheme: null,
    hardSetTheme: () => null,
    applyRandomTheme: () => null,
    getApplicableThemes: () => THEME_OPTIONS.dark,
    applyTheme: () => null,
    getRandomTheme: () => "dark",
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
  const [soonToBeTheme, setSoonToBeTheme] = useState<Theme | null>(null);
  const isInitialMountRef = useRef(true);

  function getPrefersDarkMode() {
    const a = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return a;
  }

  const darkOrLightLuminosity = useCallback(() => {
    return luminosity === "system"
      ? getPrefersDarkMode()
        ? "dark"
        : "light"
      : luminosity;
  }, [luminosity]);

  const finalSetTheme = useCallback((theme: Theme) => {
    for (const luminosity of Object.keys(THEME_OPTIONS)) {
      for (const option of THEME_OPTIONS[
        luminosity as keyof typeof THEME_OPTIONS
      ]) {
        document.body.classList.remove(option);
      }
    }
    document.body.classList.add(theme);

    setTheme(theme);
  }, []);

  const applyRandomTheme = useCallback(
    (_luminosity?: PREFERENCE_PreferredLuminosity, mustBeNew?: boolean) => {
      const l = _luminosity ?? luminosity;
      const options = THEME_OPTIONS[
        l === "system" ? darkOrLightLuminosity() : l
      ].filter((option) => (mustBeNew ? option !== theme : true));
      const randomTheme = options[Math.floor(Math.random() * options.length)]!;

      // Only trigger animation if not initial mount
      if (!isInitialMountRef.current) {
        setSoonToBeTheme(randomTheme);
      } else {
        finalSetTheme(randomTheme);
      }
    },
    [luminosity, theme, darkOrLightLuminosity, finalSetTheme],
  );

  useEffect(() => {
    const storedTheme = localStorage?.getItem(
      DEFAULT_PREFERENCES.luminosity.key,
    ) as PREFERENCE_PreferredLuminosity | null;
    if (storedTheme) {
      setLuminosity(storedTheme);
      // On initial mount, set theme directly without animation
      const l = storedTheme;
      const options =
        THEME_OPTIONS[l === "system" ? darkOrLightLuminosity() : l];
      const randomTheme = options[Math.floor(Math.random() * options.length)]!;
      finalSetTheme(randomTheme);
      // Set soonToBeTheme to match theme to prevent animation trigger
      setSoonToBeTheme(randomTheme);
    } else {
      // On initial mount, set theme directly without animation
      const options = THEME_OPTIONS[darkOrLightLuminosity()];
      const randomTheme = options[Math.floor(Math.random() * options.length)]!;
      finalSetTheme(randomTheme);
      // Set soonToBeTheme to match theme to prevent animation trigger
      setSoonToBeTheme(randomTheme);
    }

    setIsMounted(true);
    isInitialMountRef.current = false;
  }, [darkOrLightLuminosity, finalSetTheme]);

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
    toggleDarkModeNoAnimation: () => {
      const oppositeLuminosity =
        darkOrLightLuminosity() === "dark" ? "light" : "dark";
      localStorage.setItem(
        DEFAULT_PREFERENCES.luminosity.key,
        oppositeLuminosity,
      );
      setLuminosity(oppositeLuminosity);
      finalSetTheme(oppositeLuminosity === "dark" ? "dark" : "light");
    },
    applyRandomTheme: (mustBeNew?: boolean) => {
      applyRandomTheme(undefined, mustBeNew);
    },
    isDarkMode: () => darkOrLightLuminosity() === "dark",
    theme,
    soonToBeTheme,
    setTheme,
    hardSetTheme: (theme: Theme) => {
      finalSetTheme(theme);
    },
    applyTheme: (theme: Theme) => {
      // Only trigger animation if not initial mount
      if (!isInitialMountRef.current) {
        setSoonToBeTheme(theme);
      } else {
        finalSetTheme(theme);
      }
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
