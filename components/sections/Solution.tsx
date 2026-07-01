"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const tabs = [
  { id: "founder", label: "Founder dashboard", icon: LayoutDashboard },
  { id: "tester", label: "Tester dashboard", icon: ClipboardList },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Solution() {
  const [active, setActive] = useState<TabId>("founder");

  return (
    <section id="solution" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[140px]" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="The solution"
          title="One workspace to validate"
          highlight="every launch."
          description="Founders and testers work from purpose-built dashboards — assignments, progress, reports and feedback in a single glass surface."
        />

        <Reveal className="mt-14">
          {/* tab switcher */}
          <div className="mx-auto mb-6 flex max-w-full flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const on = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    on ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="solution-tab"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06] shadow-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={16} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* browser frame */}
          <div className="gradient-border relative mx-auto max-w-5xl overflow-hidden rounded-4xl bg-ink-900/70 shadow-card backdrop-blur-2xl">
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/[0.07]" />
              <div className="mx-auto flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1 text-xs text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                app.testloop.io/{active}
              </div>
            </div>

            {/* screen */}
            <div className="relative min-h-[380px] p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {active === "founder" && <FounderScreen />}
                  {active === "tester" && <TesterScreen />}
                  {active === "reports" && <ReportsScreen />}
                  {active === "feedback" && <FeedbackScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- mock screens ---------- */

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-white/[0.03] p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function Bar({ w, tone = "bg-white/10" }: { w: string; tone?: string }) {
  return <div className={`h-2.5 rounded-full ${tone}`} style={{ width: w }} />;
}

function FounderScreen() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
      <Panel>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white">Active projects</span>
          <span className="rounded-full bg-brand-indigo/15 px-2.5 py-1 text-xs text-brand-blue">
            3 running
          </span>
        </div>
        <div className="space-y-3">
          {[
            { name: "Onboarding flow", pct: 82, tone: "from-brand-indigo to-brand-cyan" },
            { name: "AI chat UX", pct: 60, tone: "from-brand-purple to-brand-pink" },
            { name: "Pricing page", pct: 35, tone: "from-brand-teal to-brand-emerald" },
          ].map((p) => (
            <div key={p.name} className="rounded-xl bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                <span>{p.name}</span>
                <span className="text-white/40">{p.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${p.tone}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="grid grid-rows-2 gap-4">
        <Panel>
          <p className="text-xs uppercase tracking-widest text-white/40">
            Launch readiness
          </p>
          <p className="mt-2 text-4xl font-semibold text-gradient-brand">86%</p>
          <div className="mt-3">
            <Bar w="86%" tone="bg-gradient-to-r from-brand-indigo to-brand-cyan" />
          </div>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-widest text-white/40">
            Issues by severity
          </p>
          <div className="mt-3 flex items-end gap-2">
            {[40, 70, 30, 55, 20].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-purple/40 to-brand-cyan"
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              />
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function TesterScreen() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Panel>
        <span className="text-sm font-medium text-white">Available projects</span>
        <div className="mt-4 space-y-3">
          {["Nebula AI · Chat", "Draftbot · Editor", "Kernel · Dashboard"].map(
            (n, i) => (
              <div
                key={n}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-purple" />
                  <div>
                    <p className="text-sm text-white">{n}</p>
                    <p className="text-xs text-white/40">~25 min · guided</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-brand-cyan">
                  {i === 0 ? "Accept" : "View"}
                </span>
              </div>
            )
          )}
        </div>
      </Panel>
      <Panel>
        <span className="text-sm font-medium text-white">Your reputation</span>
        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <motion.circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="url(#tester-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="97.4"
                initial={{ strokeDashoffset: 97.4 }}
                animate={{ strokeDashoffset: 97.4 * 0.12 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="tester-grad" x1="0" y1="0" x2="36" y2="36">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
              4.9
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white/70">Elite tester · Tier 3</p>
            <p className="text-white/40">128 evaluations</p>
            <p className="text-brand-emerald">$2,340 earned</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Critical", val: "2", tone: "text-brand-pink" },
          { label: "Major", val: "5", tone: "text-brand-purple" },
          { label: "Minor", val: "9", tone: "text-brand-cyan" },
        ].map((s) => (
          <Panel key={s.label}>
            <p className="text-xs uppercase tracking-widest text-white/40">
              {s.label}
            </p>
            <p className={`mt-1 text-3xl font-semibold ${s.tone}`}>{s.val}</p>
          </Panel>
        ))}
      </div>
      <Panel>
        <span className="text-sm font-medium text-white">Top recommendations</span>
        <div className="mt-4 space-y-3">
          {[
            "Clarify the empty-state on first AI run",
            "Add loading feedback during generation",
            "Reduce onboarding from 5 steps to 3",
          ].map((r, i) => (
            <div key={r} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-indigo/15 text-xs text-brand-blue">
                {i + 1}
              </span>
              <span className="text-sm text-white/70">{r}</span>
              <span className="ml-auto rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/40">
                high impact
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function FeedbackScreen() {
  return (
    <div className="space-y-3">
      {[
        {
          name: "Priya · Tester",
          text: "Loved the concept but I got stuck finding where to start a new project. The CTA blends into the background.",
          tag: "UX friction",
        },
        {
          name: "Marco · Tester",
          text: "The AI response was great, but there's no way to copy the output. Expected a copy button.",
          tag: "Missing action",
        },
        {
          name: "Lena · Tester",
          text: "Onboarding felt long. I almost dropped off at step 4 of 5 before reaching value.",
          tag: "Activation",
        },
      ].map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-emerald" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{f.name}</span>
              <span className="rounded-full bg-brand-purple/15 px-2 py-0.5 text-[11px] text-brand-purple">
                {f.tag}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-white/55">{f.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
