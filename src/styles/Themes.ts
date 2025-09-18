export const THEME_OPTIONS = {
  dark: ["dark", "draconic", "cyberpunk", "space", "retro", "tealDark"],
  light: ["light", "aquatic", "forest", "desert", "lunar", "tealLight"],
} as const;

export type Theme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS][number];
