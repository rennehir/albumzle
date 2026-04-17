// src/styles/themes.ts

export type ColorThemeName = "light" | "dark";
export type LayoutThemeName = "compact" | "comfortable";

export type ColorTokens = {
  bg: string;
  text: string;

  surface: string;
  border: string;

  correct: string;
  misplaced: string;
  wrong: string;

  accent: string;
};

export type LayoutTokens = {
  space: string;
  radius: string;
  maxWidth: string;
};

export type Theme = {
  colors: ColorTokens;
  layout: LayoutTokens;
};

export const colorThemes: Record<ColorThemeName, ColorTokens> = {
  light: {
    bg: "#FFF8E7",
    text: "#1F2937",

    surface: "#FFFFFF",
    border: "#E2E8F0",

    correct: "#2ECC71",
    misplaced: "#F1C40F",
    wrong: "#2C3E50",

    accent: "#FF4D6D",
  },

  dark: {
    bg: "#0B0F14",
    text: "#E5E7EB",

    surface: "#111827",
    border: "#2D3748",

    correct: "#2ECC71",
    misplaced: "#F1C40F",
    wrong: "#2C3E50",

    accent: "#FF5C7A",
  },
};

export const layoutThemes: Record<LayoutThemeName, LayoutTokens> = {
  compact: {
    space: "8px",
    radius: "8px",
    maxWidth: "420px",
  },

  comfortable: {
    space: "16px",
    radius: "12px",
    maxWidth: "520px",
  },
};

export function buildTheme(
  color: ColorThemeName,
  layout: LayoutThemeName,
): Theme {
  return {
    colors: colorThemes[color],
    layout: layoutThemes[layout],
  };
}
