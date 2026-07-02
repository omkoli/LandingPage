"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Upload,
  Store,
  UserCheck,
  ListChecks,
  FileBarChart,
  Rocket,
} from "lucide-react";

const nodes = [
  { icon: Upload, label: "Uploads AI App", sub: "Founder", accent: "from-brand-indigo to-brand-blue" },
  { icon: Store, label: "Marketplace", sub: "Smart match", accent: "from-brand-purple to-brand-indigo" },
  { icon: UserCheck, label: "Assigned Tester", sub: "Product-minded", accent: "from-brand-cyan to-brand-teal" },
  { icon: ListChecks, label: "Testing Workflow", sub: "Guided flow", accent: "from-brand-teal to-brand-emerald" },
  { icon: FileBarChart, label: "Structured Report", sub: "Standardized", accent: "from-brand-blue to-brand-cyan" },
  { icon: Rocket, label: "Launch Ready", sub: "Confidence score", accent: "from-brand-purple to-brand-pink" },
];

/**
 * The animated hero illustration — a glass "control panel" showing the
 * founder → marketplace → tester → report → launch flow with a traveling
 * pulse along the connective spine and floating metric chips.
 */
export default function HeroFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* ambient glow behind the panel */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-indigo/20 via-brand-purple/10 to-brand-cyan/20 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
        className="gradient-border relative rounded-[2rem] bg-white/[0.04] p-5 shadow-card backdrop-blur-2xl"
      >
        {/* window chrome */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 text-[11px] font-medium tracking-wide text-white/40">
            betacheck / validation-run
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-brand-emerald">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />
            live
          </span>
        </div>

        {/* flow spine */}
        <div className="relative flex flex-col gap-2.5">
          {/* traveling pulse line */}
          <div className="absolute left-[26px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-indigo/60 via-brand-purple/40 to-brand-cyan/60">
            {!reduce && (
              <motion.span
                className="absolute -left-[3px] h-2 w-2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(38,224,168,0.7)]"
                animate={{ top: ["0%", "100%"] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>

          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2.5 pr-4 transition-colors hover:border-white/15 hover:bg-white/[0.06]"
              >
                <div
                  className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${node.accent} text-white shadow-glow`}
                >
                  <Icon size={16} />
                  {!reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-xl border border-white/40"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] uppercase tracking-widest text-white/40">
                    {node.sub}
                  </p>
                  <p className="truncate text-sm font-medium text-white">
                    {node.label}
                  </p>
                </div>
                {i === nodes.length - 1 && (
                  <span className="ml-auto rounded-full bg-brand-emerald/15 px-2 py-1 text-[10px] font-semibold text-brand-emerald">
                    98%
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* floating metric chips */}
      <FloatingChip
        className="-left-10 top-16"
        delay={1}
        title="Bugs found"
        value="12"
        tone="text-brand-pink"
      />
      <FloatingChip
        className="-right-8 top-40"
        delay={1.3}
        title="UX score"
        value="A+"
        tone="text-brand-cyan"
      />
      <FloatingChip
        className="-left-6 bottom-10"
        delay={1.6}
        title="Testers"
        value="6 live"
        tone="text-brand-emerald"
      />
    </div>
  );
}

function FloatingChip({
  className,
  title,
  value,
  tone,
  delay,
}: {
  className: string;
  title: string;
  value: string;
  tone: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-20 hidden animate-float rounded-2xl border border-white/10 bg-ink-900/80 px-3.5 py-2.5 shadow-card backdrop-blur-xl sm:block ${className}`}
    >
      <p className="text-[10px] uppercase tracking-widest text-white/40">
        {title}
      </p>
      <p className={`text-lg font-semibold ${tone}`}>{value}</p>
    </motion.div>
  );
}
