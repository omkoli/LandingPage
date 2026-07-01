"use client";

import { ArrowRight, FlaskConical } from "lucide-react";
import AuroraBackground from "@/components/background/AuroraBackground";
import ParticleField from "@/components/background/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 noise">
      <AuroraBackground variant="cta" />
      <ParticleField density={0.00005} />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Launch with confidence.
              <br />
              <span className="text-gradient-brand">
                Validate before your users do.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
              Join the founders and testers building the usability layer for the
              AI era. Limited founding-member spots in the pilot program.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                Become a Tester
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                Only for AI founders
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                Founding-member pricing
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
                Pilot program access
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
