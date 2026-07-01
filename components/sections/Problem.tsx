"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { painPoints } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function Problem() {
  return (
    <section id="problem" className="relative py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="The problem"
          title="AI ships fast."
          highlight="Broken UX ships faster."
          description="Founders generate MVPs in a weekend — then launch to real users without ever watching someone struggle through them."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* left: broken-launch illustration */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-pink/20 blur-3xl" />

              {/* mock "broken" browser */}
              <div className="relative rounded-3xl border border-white/10 bg-ink-900/80 p-4 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-pink/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>

                <div className="space-y-3">
                  <div className="h-3 w-2/3 rounded-full bg-white/10" />
                  <div className="h-3 w-1/2 rounded-full bg-white/[0.07]" />

                  {/* error toast */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 rounded-2xl border border-brand-pink/30 bg-brand-pink/10 p-3"
                  >
                    <AlertTriangle size={18} className="text-brand-pink" />
                    <div className="flex-1">
                      <div className="h-2.5 w-24 rounded-full bg-brand-pink/50" />
                      <div className="mt-1.5 h-2 w-36 rounded-full bg-white/10" />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="h-16 rounded-2xl bg-white/[0.04]" />
                    <div className="h-16 rounded-2xl bg-white/[0.04]" />
                  </div>

                  {/* falling retention line */}
                  <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white/[0.03] p-3">
                    <TrendingDown size={18} className="text-brand-pink" />
                    <span className="text-xs text-white/50">
                      Day-1 retention dropping
                    </span>
                    <svg
                      viewBox="0 0 100 30"
                      className="ml-auto h-8 w-28"
                      fill="none"
                    >
                      <motion.path
                        d="M2 6 C 20 8, 30 10, 45 16 S 75 26, 98 27"
                        stroke="#f472b6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right: pain points */}
          <RevealGroup className="flex flex-col gap-4">
            {painPoints.map((point, i) => (
              <RevealItem key={point.title} direction="left">
                <div className="group relative flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-mono text-sm text-white/40 transition-colors group-hover:text-brand-cyan">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                      {point.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
