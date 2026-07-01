"use client";

import { cn } from "@/lib/utils";

/**
 * Layered ambient background: animated mesh gradient + glowing orbs +
 * moving light beams + a faint grid. Purely decorative; GPU-friendly
 * (transform/opacity only). Compose it behind any dark section.
 */
export default function AuroraBackground({
  className,
  variant = "hero",
  grid = true,
}: {
  className?: string;
  variant?: "hero" | "soft" | "cta";
  grid?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* base vignette */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* animated grid */}
      {grid && (
        <div className="absolute inset-0 bg-grid mask-fade-y opacity-60" />
      )}

      {/* glowing orbs */}
      <div className="absolute -left-24 top-[-10%] h-[45vw] w-[45vw] animate-aurora-shift rounded-full bg-brand-indigo/30 blur-[120px]" />
      <div className="absolute right-[-10%] top-[10%] h-[38vw] w-[38vw] animate-float-slow rounded-full bg-brand-purple/25 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[42vw] w-[42vw] animate-aurora-shift rounded-full bg-brand-cyan/20 blur-[140px] [animation-delay:-6s]" />

      {variant === "cta" && (
        <div className="absolute bottom-[-20%] right-[10%] h-[40vw] w-[40vw] animate-float rounded-full bg-brand-teal/20 blur-[130px]" />
      )}

      {/* moving light beams */}
      {variant !== "soft" && (
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent">
            <div className="h-full w-1/3 animate-beam-move bg-gradient-to-r from-transparent via-brand-cyan to-transparent blur-sm" />
          </div>
          <div className="absolute left-0 top-2/3 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent">
            <div className="h-full w-1/4 animate-beam-move bg-gradient-to-r from-transparent via-brand-purple to-transparent blur-sm [animation-delay:-3s]" />
          </div>
        </div>
      )}

      {/* top + bottom fades to blend into neighboring sections */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
