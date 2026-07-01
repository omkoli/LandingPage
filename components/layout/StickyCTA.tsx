"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

/**
 * A floating pill CTA that fades in after the hero and gently pulses when the
 * user has been idle, nudging toward the waitlist without being intrusive.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      // show after the hero, hide near the waitlist/footer
      setVisible(y > window.innerHeight * 0.9 && y < max - 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), 6000);
    };
    reset();
    window.addEventListener("mousemove", reset);
    window.addEventListener("scroll", reset);
    window.addEventListener("keydown", reset);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("keydown", reset);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#waitlist"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: idle ? [1, 1.04, 1] : 1,
          }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{
            duration: 0.4,
            scale: idle
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 },
          }}
          className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-blue px-5 py-3.5 text-sm font-semibold text-white shadow-glow-lg [background-size:200%_auto] transition-[background-position] duration-500 hover:[background-position:right_center] sm:flex"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan opacity-50 blur-lg" />
          <Rocket size={16} />
          Join the waitlist
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
