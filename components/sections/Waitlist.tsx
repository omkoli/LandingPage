"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Rocket, Sparkles } from "lucide-react";
import AuroraBackground from "@/components/background/AuroraBackground";
import Confetti from "@/components/ui/Confetti";
import { Reveal } from "@/components/ui/Reveal";

type Role = "founder" | "tester";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  full?: boolean;
  textarea?: boolean;
};

const founderFields: Field[] = [
  { name: "name", label: "Name", placeholder: "Ada Lovelace" },
  { name: "email", label: "Work email", type: "email", placeholder: "you@startup.com" },
  { name: "startup", label: "Startup", placeholder: "Synthflow" },
  { name: "prototype", label: "Prototype URL", placeholder: "https://…", type: "url" },
  { name: "summary", label: "App summary", placeholder: "What does your AI app do?", full: true, textarea: true },
  { name: "challenge", label: "Validation challenge", placeholder: "What are you most unsure about?", full: true, textarea: true },
];

const testerFields: Field[] = [
  { name: "name", label: "Name", placeholder: "Grace Hopper" },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  { name: "experience", label: "Experience", placeholder: "Product, UX, QA…" },
  { name: "availability", label: "Availability", placeholder: "Hrs / week" },
  { name: "interest", label: "Why do you want to test AI apps?", placeholder: "Tell us what excites you…", full: true, textarea: true },
];

export default function Waitlist() {
  const [role, setRole] = useState<Role>("founder");
  const [submitted, setSubmitted] = useState<Role | null>(null);

  const fields = role === "founder" ? founderFields : testerFields;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(role);
  };

  return (
    <section id="waitlist" className="relative overflow-hidden py-28">
      <AuroraBackground variant="cta" grid={false} />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">
              <Sparkles size={13} className="text-brand-cyan" />
              Founding members · Limited early access
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
              Join the <span className="text-gradient-brand">waitlist</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-white/55">
              Be first in line when the marketplace opens. Founding members lock
              in pilot pricing and priority matching.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-2xl">
          <div className="gradient-border relative overflow-hidden rounded-4xl bg-ink-900/70 p-6 shadow-card backdrop-blur-2xl sm:p-9">
            <AnimatePresence>
              {submitted && <Confetti fire />}
            </AnimatePresence>

            {/* tab switcher */}
            <div className="relative mx-auto mb-8 grid max-w-xs grid-cols-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
              <motion.span
                layout
                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple shadow-glow"
                animate={{ x: role === "founder" ? 2 : "calc(100% + 2px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {(["founder", "tester"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setSubmitted(null);
                  }}
                  className={`relative z-10 rounded-full py-2.5 text-sm font-medium capitalize transition-colors ${
                    role === r ? "text-white" : "text-white/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.1,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-cyan shadow-glow-lg"
                  >
                    <Check size={38} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    You&apos;re on the list! 🎉
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-white/55">
                    {submitted === "founder"
                      ? "We'll reach out with early-access pilot details and lock in your founding-member rate."
                      : "We'll notify you the moment projects open up for testing. Welcome aboard!"}
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-6 text-sm text-brand-cyan transition-colors hover:text-white"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={role}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {fields.map((f) => (
                    <div
                      key={f.name}
                      className={f.full ? "sm:col-span-2" : ""}
                    >
                      <label className="mb-1.5 block text-xs font-medium text-white/50">
                        {f.label}
                      </label>
                      {f.textarea ? (
                        <textarea
                          name={f.name}
                          required={f.name === "email"}
                          rows={3}
                          placeholder={f.placeholder}
                          className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-brand-indigo/60 focus:bg-white/[0.05] focus:outline-none"
                        />
                      ) : (
                        <input
                          name={f.name}
                          type={f.type ?? "text"}
                          required={f.name === "email" || f.name === "name"}
                          placeholder={f.placeholder}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-brand-indigo/60 focus:bg-white/[0.05] focus:outline-none"
                        />
                      )}
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue px-7 py-4 text-sm font-semibold text-white shadow-glow [background-size:200%_auto] transition-all duration-300 hover:[background-position:right_center] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
                    >
                      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-indigo to-brand-cyan opacity-60 blur-lg transition-opacity group-hover:opacity-90" />
                      {role === "founder" ? (
                        <>
                          <Rocket size={16} />
                          Join Founder Waitlist
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Become a Tester
                        </>
                      )}
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                    <p className="mt-3 text-center text-xs text-white/35">
                      No spam. We&apos;ll only email you about early access.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
