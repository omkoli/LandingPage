import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Consistent section header: eyebrow chip, gradient headline, and supporting copy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-2xl text-center items-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-glow-cyan" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
          {title}{" "}
          {highlight && (
            <span className="text-gradient-brand">{highlight}</span>
          )}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-pretty text-lg leading-relaxed text-white/55">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
