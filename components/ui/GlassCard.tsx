"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Glassmorphic card with an interactive spotlight that follows the cursor and
 * an optional 3D tilt + hover lift. The default building block for the page.
 */
export default function GlassCard({
  children,
  className,
  tilt = false,
  spotlight = true,
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  spotlight?: boolean;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setGlow({ x: px * 100, y: py * 100, active: true });
    if (tilt && !reduce) {
      setRot({ x: (py - 0.5) * -10, y: (px - 0.5) * 10 });
    }
  };

  const onLeave = () => {
    setGlow((g) => ({ ...g, active: false }));
    setRot({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        tilt
          ? { transformStyle: "preserve-3d", transformPerspective: 1000 }
          : undefined
      }
      animate={tilt ? { rotateX: rot.x, rotateY: rot.y } : undefined}
      whileHover={lift && !reduce ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-xl",
        className
      )}
    >
      {/* cursor spotlight */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${glow.x}% ${glow.y}%, rgba(38,224,168,0.14), transparent 70%)`,
          }}
        />
      )}
      {/* top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
