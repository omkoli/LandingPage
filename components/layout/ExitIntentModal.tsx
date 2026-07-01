"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, X } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist";
import { site } from "@/lib/site";

const STORAGE_KEY = "proofly_exit_seen";

/**
 * Exit-intent waitlist prompt. Fires once per session when the cursor leaves
 * the top of the viewport (desktop) or after a long dwell as a mobile fallback.
 */
export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    const result = await submitWaitlist({
      email,
      role: "founder",
      _subject: `New waitlist signup (exit-intent) · ${site.name}`,
      source: "exit-intent",
    });
    setLoading(false);
    if (result.ok) setDone(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // desktop exit intent
    document.addEventListener("mouseleave", onLeave);
    // mobile fallback: long dwell
    const timer = setTimeout(trigger, 45000);

    return () => {
      document.removeEventListener("mouseleave", onLeave);
      clearTimeout(timer);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="gradient-border relative w-full max-w-md overflow-hidden rounded-4xl bg-ink-900/90 p-8 shadow-card backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-purple/25 blur-3xl" />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan shadow-glow">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  You&apos;re in! 🎉
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  Watch your inbox for early-access details.
                </p>
                <button
                  onClick={close}
                  className="mt-5 text-sm text-brand-cyan hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow">
                  <Sparkles size={13} className="text-brand-cyan" />
                  Wait — don&apos;t launch blind
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  Grab a{" "}
                  <span className="text-gradient-brand">founding-member</span>{" "}
                  spot before you go.
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  Lock in pilot pricing and priority tester matching. Limited
                  early access.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@startup.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-brand-indigo/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-glow [background-size:200%_auto] transition-all hover:[background-position:right_center] disabled:opacity-80"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Claiming…
                      </>
                    ) : (
                      <>
                        Claim my spot
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
