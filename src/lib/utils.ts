import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

export type TailwindColor = `${string}-${number}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanRound(value?: number): string {
  if (value === undefined) {
    return "0";
  }
  if (value.toFixed(1).endsWith(".0")) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
}

export function clamp(
  value: number,
  { min, max }: { min?: number; max?: number },
): number {
  return Math.min(Math.max(value, min ?? 0), max ?? 100);
}

export function seperateWordsAndTitleCase(value: string): string {
  return value.replace(/([A-Z])/g, " $1").trim();
}

export function camelCaseToWords(str: string) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAndSplit(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((word) => capitalize(word.trim()))
    .join(" ")
    .trim();
}

export function tailwindToHex(tw: TailwindColor): string | undefined {
  const [name, shade] = tw.split("-");
  if (!name || !shade) return undefined;

  const color = colors[name as keyof typeof colors];
  if (typeof color === "object" && shade in color) {
    return color[shade as keyof typeof color];
  }
  return typeof color === "string" ? color : undefined;
}

export function tailwindToHexGaruntee(tw: TailwindColor): string {
  const hex = tailwindToHex(tw);
  if (!hex) throw new Error(`Invalid tailwind color: ${tw}`);
  return hex;
}

type Result<T, E = Error> = { data: T; error: null } | { data: null; error: E };
export function tryCatch<T, E = Error>(promise: () => T): Result<T, E> {
  try {
    const data = promise();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export async function tryCatchAsync<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
