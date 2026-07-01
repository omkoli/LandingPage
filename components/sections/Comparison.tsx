"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { comparison } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-emerald/15 text-brand-emerald">
        <Check size={16} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-white/40">
        <Minus size={16} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink/70">
      <X size={16} />
    </span>
  );
}

export default function Comparison() {
  const { columns, rows } = comparison;
  const lastCol = columns.length - 1;

  return (
    <section id="comparison" className="relative py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why we're different"
          title="Not freelancers. Not legacy QA."
          highlight="A validation marketplace."
          description="Generic gigs hunt for typos and old-school QA chases bugs. We deliver structured product feedback for AI MVPs."
        />

        <Reveal className="mt-14">
          <div className="gradient-border overflow-hidden rounded-4xl bg-ink-900/60 backdrop-blur-2xl">
            {/* header */}
            <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] gap-2 border-b border-white/10 px-4 py-5 sm:px-6">
              <div />
              {columns.map((col, i) => (
                <div
                  key={col}
                  className={cn(
                    "text-center text-xs font-semibold sm:text-sm",
                    i === lastCol
                      ? "text-gradient-brand"
                      : "text-white/45"
                  )}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* rows */}
            {rows.map((row, ri) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ri * 0.05, duration: 0.5 }}
                className={cn(
                  "grid grid-cols-[1.6fr_repeat(3,1fr)] items-center gap-2 px-4 py-4 sm:px-6",
                  ri % 2 === 0 ? "bg-white/[0.015]" : ""
                )}
              >
                <div className="text-sm text-white/70">{row.label}</div>
                {row.values.map((v, ci) => (
                  <div
                    key={ci}
                    className={cn(
                      "flex justify-center",
                      ci === lastCol &&
                        "rounded-xl bg-gradient-to-b from-brand-indigo/10 to-transparent py-1"
                    )}
                  >
                    <Cell value={v} />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
