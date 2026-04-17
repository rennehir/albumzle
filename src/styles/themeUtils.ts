import type { Theme } from "./themes";

export function themeToCSSVars(
  obj: Record<string, any>,
  prefix = "",
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = prefix ? `${prefix}-${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(vars, themeToCSSVars(value, newPrefix));
    } else {
      vars[newPrefix] = String(value);
    }
  }

  return vars;
}

export function cssVarsToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
}

export const flattenTheme = (theme: Theme) => {
  const vars: Record<string, string> = {};

  Object.entries(theme).forEach(([themeType, themeObject]) => {
    Object.entries(themeObject).forEach(([key, value]) => {
      vars[`${themeType}-${key}`] = value;
    });
  });

  return vars;
};
