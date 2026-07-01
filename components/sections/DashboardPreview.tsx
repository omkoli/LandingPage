"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Bug,
  CheckCircle2,
  Home,
  LayoutGrid,
  Search,
  Settings,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import Logo from "@/components/ui/Logo";

const metrics = [
  { label: "Active tests", value: 24, suffix: "", tone: "from-brand-indigo to-brand-blue" },
  { label: "Reports delivered", value: 312, suffix: "", tone: "from-brand-purple to-brand-pink" },
  { label: "Avg. UX score", value: 92, suffix: "%", tone: "from-brand-cyan to-brand-teal" },
  { label: "Testers online", value: 48, suffix: "", tone: "from-brand-teal to-brand-emerald" },
];

const activity = [
  { icon: CheckCircle2, text: "Report delivered for Nebula AI", time: "2m", tone: "text-brand-emerald" },
  { icon: Bug, text: "Critical issue flagged in Draftbot", time: "14m", tone: "text-brand-pink" },
  { icon: Users, text: "3 testers matched to Kernel", time: "38m", tone: "text-brand-cyan" },
  { icon: Activity, text: "Onboarding test 82% complete", time: "1h", tone: "text-brand-blue" },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[36vw] w-[70vw] -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[160px]" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Product preview"
          title="A command center for"
          highlight="launch readiness."
          description="Projects, reports, bug cards, tester profiles and live activity — everything in one beautifully calm dashboard."
        />

        <Reveal className="mt-14">
          <div className="gradient-border relative overflow-hidden rounded-[2rem] bg-ink-900/70 shadow-card backdrop-blur-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
              {/* sidebar */}
              <aside className="hidden border-r border-white/5 p-5 md:block">
                <div className="flex items-center gap-2.5">
                  <Logo className="h-8 w-8" />
                  <span className="text-sm font-semibold text-white">
                    TestLoop
                  </span>
                </div>
                <nav className="mt-8 space-y-1">
                  {[
                    { icon: Home, label: "Overview", active: true },
                    { icon: LayoutGrid, label: "Projects" },
                    { icon: Bug, label: "Reports" },
                    { icon: Users, label: "Testers" },
                    { icon: Settings, label: "Settings" },
                  ].map((n) => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.label}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                          n.active
                            ? "bg-white/[0.06] text-white"
                            : "text-white/45 hover:text-white/80"
                        }`}
                      >
                        <Icon size={16} />
                        {n.label}
                      </div>
                    );
                  })}
                </nav>
                <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-brand-indigo/10 to-transparent p-4">
                  <p className="text-xs font-medium text-white">Pilot program</p>
                  <p className="mt-1 text-xs text-white/45">
                    12 founding slots left
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan" />
                  </div>
                </div>
              </aside>

              {/* main */}
              <div className="p-5 sm:p-7">
                {/* top bar */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-white/40">
                    <Search size={15} />
                    Search projects, reports, testers…
                  </div>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-white/50">
                    <Bell size={16} />
                  </button>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan" />
                </div>

                {/* metrics */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs text-white/45">{m.label}</p>
                      <p
                        className={`mt-1.5 bg-gradient-to-r ${m.tone} bg-clip-text text-2xl font-semibold text-transparent`}
                      >
                        <CountUp value={m.value} suffix={m.suffix} />
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* content grid */}
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                  {/* chart */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        Validation throughput
                      </span>
                      <span className="rounded-full bg-brand-emerald/15 px-2.5 py-1 text-xs text-brand-emerald">
                        +18% wk
                      </span>
                    </div>
                    <Chart />
                  </div>

                  {/* activity feed */}
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    <span className="text-sm font-medium text-white">
                      Live activity
                    </span>
                    <div className="mt-4 space-y-4">
                      {activity.map((a, i) => {
                        const Icon = a.icon;
                        return (
                          <motion.div
                            key={a.text}
                            initial={{ opacity: 0, x: 12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <Icon size={16} className={`mt-0.5 shrink-0 ${a.tone}`} />
                            <p className="flex-1 text-xs leading-relaxed text-white/60">
                              {a.text}
                            </p>
                            <span className="text-[11px] text-white/30">
                              {a.time}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* bug cards + tester profiles */}
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    <span className="text-sm font-medium text-white">
                      Recent issues
                    </span>
                    <div className="mt-4 space-y-3">
                      {[
                        { t: "Empty state has no guidance", s: "Critical", tone: "text-brand-pink bg-brand-pink/10" },
                        { t: "Missing copy button on output", s: "Major", tone: "text-brand-purple bg-brand-purple/10" },
                        { t: "Onboarding too long", s: "Minor", tone: "text-brand-cyan bg-brand-cyan/10" },
                      ].map((b) => (
                        <div
                          key={b.t}
                          className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3"
                        >
                          <Bug size={15} className="text-white/40" />
                          <span className="flex-1 text-xs text-white/65">
                            {b.t}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.tone}`}
                          >
                            {b.s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    <span className="text-sm font-medium text-white">
                      Top testers
                    </span>
                    <div className="mt-4 space-y-3">
                      {[
                        { n: "Priya Nair", r: "4.9", e: "128 tests" },
                        { n: "Marco Silva", r: "4.8", e: "96 tests" },
                        { n: "Lena Ford", r: "4.8", e: "74 tests" },
                      ].map((t, i) => (
                        <div key={t.n} className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full bg-gradient-to-br ${
                              ["from-brand-indigo to-brand-cyan", "from-brand-purple to-brand-pink", "from-brand-teal to-brand-emerald"][i]
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-xs text-white/75">{t.n}</p>
                            <p className="text-[11px] text-white/35">{t.e}</p>
                          </div>
                          <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-brand-cyan">
                            ★ {t.r}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chart() {
  const bars = [42, 58, 38, 72, 55, 84, 68, 92, 78, 96];
  return (
    <div className="flex h-40 items-end gap-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${h}%`, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex-1 rounded-t-md bg-gradient-to-t from-brand-indigo/40 via-brand-purple/60 to-brand-cyan"
        >
          <span className="absolute inset-x-0 top-0 h-1 rounded-t-md bg-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}
