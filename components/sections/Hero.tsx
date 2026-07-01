"use client";

import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Sparkles } from "lucide-react";
import AuroraBackground from "@/components/background/AuroraBackground";
import ParticleField from "@/components/background/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroFlow from "./HeroFlow";

const bullets = [
  "Founder-defined validation goals",
  "Guided evaluation workflows",
  "Actionable standardized reports",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20 noise"
    >
      <AuroraBackground variant="hero" />
      <ParticleField />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left: copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="eyebrow">
                <Sparkles size={13} className="text-brand-cyan" />
                Pilot program · Limited early access
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              Validate your AI app{" "}
              <span className="text-gradient-brand">before launch</span> with
              guided usability testing.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/60"
            >
              Connect your AI-generated MVP with product-minded testers. Receive
              structured reports uncovering bugs, UX issues, friction points, and
              actionable recommendations.
            </motion.p>

            <motion.ul variants={item} className="mt-8 flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/70">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.2 5 8.5l4.5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[15px]">{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton href="#waitlist" className="text-[15px]">
                Join Founder Waitlist
                <ArrowRight size={17} />
              </MagneticButton>
              <MagneticButton
                href="#waitlist"
                variant="secondary"
                className="text-[15px]"
              >
                <FlaskConical size={16} />
                I Want To Test Apps
              </MagneticButton>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 text-sm text-white/40"
            >
              No credit card · Founding members lock in pilot rates
            </motion.p>
          </motion.div>

          {/* right: illustration */}
          <div className="relative">
            <HeroFlow />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
