"use client";

import {
  MessagesSquare,
  PenTool,
  Tag,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { foundingBenefits } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Tag,
  Zap,
  MessagesSquare,
  PenTool,
};

export default function FoundingMembers() {
  return (
    <section id="founding" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36vw] w-[36vw] -translate-x-1/2 rounded-full bg-brand-purple/10 blur-[140px]" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Founding members"
          title="Get in early and"
          highlight="build it with us."
          description="BetaCheck is pre-launch. Join the pilot to lock in early-access pricing and help shape how usability testing works for AI apps."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {foundingBenefits.map((benefit) => {
            const Icon = icons[benefit.icon] ?? Tag;
            return (
              <RevealItem key={benefit.title}>
                <GlassCard className="h-full" tilt>
                  <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/10 text-brand-blue">
                    <span className="absolute inset-0 rounded-2xl border border-white/10" />
                    <Icon size={20} className="relative z-10" />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {benefit.body}
                  </p>
                </GlassCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <MagneticButton href="#waitlist" className="text-[15px]">
            Claim a founding spot
            <ArrowRight size={17} />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
