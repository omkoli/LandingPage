import { cn } from "@/lib/utils";

/**
 * BetaCheck mark — an infinity/loop glyph in the brand gradient, evoking the
 * continuous test → improve → launch cycle.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-cyan p-[1px] shadow-glow",
        className
      )}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[11px] bg-ink-950">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-2/3 w-2/3"
          aria-hidden
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#26e0a8" />
              <stop offset="0.5" stopColor="#12d9c0" />
              <stop offset="1" stopColor="#3d9bff" />
            </linearGradient>
          </defs>
          <path
            d="M7 8a4 4 0 100 8c2.2 0 3.4-1.8 5-4 1.6-2.2 2.8-4 5-4a4 4 0 110 8c-2.2 0-3.4-1.8-5-4"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
