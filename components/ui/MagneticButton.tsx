"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

/**
 * Magnetic CTA button: the label is drawn toward the cursor, with a gradient
 * glow, animated border and a ripple on click. Renders as <a> or <button>.
 */
export default function MagneticButton({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  type = "button",
  strength = 0.35,
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [
        ...r,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    }
    onClick?.();
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

  const styles: Record<Variant, string> = {
    primary:
      "text-white shadow-glow bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue [background-size:200%_auto] hover:[background-position:right_center]",
    secondary: "glass-strong text-white gradient-border hover:bg-white/[0.09]",
    ghost: "text-white/70 hover:text-white",
  };

  const inner = (
    <>
      {/* glow aura */}
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan opacity-60 blur-lg transition-opacity duration-300 group-hover:opacity-90" />
      )}
      <motion.span
        className="relative z-10 inline-flex items-center gap-2"
        animate={{ x: pos.x * 0.5, y: pos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      >
        {children}
      </motion.span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-white/40"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );

  const shared = {
    className: cn("group", base, styles[variant], className),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick: handleClick,
    animate: { x: pos.x, y: pos.y },
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      mass: 0.3,
    },
  };

  if (href) {
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
