export type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/**
 * Tiny className joiner (clsx-lite). Keeps the bundle dependency-free.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      out.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(walk);
    } else if (typeof val === "object") {
      for (const key in val) {
        if (val[key]) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}
