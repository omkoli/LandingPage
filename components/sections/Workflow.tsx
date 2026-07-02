"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { workflowSteps } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="workflow" className="relative py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[36vw] w-[36vw] rounded-full bg-brand-purple/10 blur-[140px]" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="How it works"
          title="From upload to launch in"
          highlight="six guided steps."
          description="A repeatable validation loop — scroll to follow the flow from prototype to confident launch."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* rail */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-indigo via-brand-purple to-brand-cyan md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10">
            {workflowSteps.map((step, i) => (
              <TimelineRow key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  step,
  index,
}: {
  step: { step: string; title: string; body: string };
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center gap-6 pl-16 md:pl-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* node */}
      <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
        <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_16px_4px_rgba(38,224,168,0.6)]" />
        <span className="absolute h-3 w-3 animate-pulse-ring rounded-full bg-brand-indigo" />
      </div>

      {/* card */}
      <div className="w-full md:w-[calc(50%-2.5rem)]">
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
          <div className="pointer-events-none absolute -right-8 -top-8 text-7xl font-bold text-white/[0.04] transition-colors group-hover:text-white/[0.07]">
            {step.step}
          </div>
          <span className="text-sm font-semibold text-gradient-brand">
            Step {step.step}
          </span>
          <h3 className="mt-2 text-xl font-medium text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {step.body}
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
}
