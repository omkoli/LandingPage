"use client";

import { builtWith, trustBadges } from "@/lib/site";
import Marquee from "@/components/ui/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function SocialProof() {
  return (
    <section className="relative border-y border-white/5 bg-ink-950/60 py-20">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/40">
            Built for AI apps shipped with the tools you already use
          </p>
        </Reveal>

        <div className="mt-10">
          <Marquee speed={38}>
            {builtWith.map((tool) => (
              <div
                key={tool}
                className="flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.02] px-6 py-3 text-white/45 transition-colors hover:text-white/80"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan" />
                <span className="whitespace-nowrap text-base font-semibold tracking-tight">
                  {tool}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-3">
          {trustBadges.map((badge) => (
            <RevealItem key={badge.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand-indigo/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <p className="text-xl font-semibold tracking-tight text-gradient-brand">
                  {badge.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {badge.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
