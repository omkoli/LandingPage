"use client";

import {
  Award,
  ClipboardCheck,
  Compass,
  Cpu,
  FileText,
  LayoutTemplate,
  Lightbulb,
  MousePointerClick,
  Rocket,
  Route,
  ShieldCheck,
  Sparkles,
  Bug,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  founderFeatures,
  marketplaceFeatures,
  testerFeatures,
} from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Rocket,
  Users,
  FileText,
  Lightbulb,
  Bug,
  ShieldCheck,
  MousePointerClick,
  Route,
  Award,
  ClipboardCheck,
  Sparkles,
  Compass,
  LayoutTemplate,
  Cpu,
};

type Feature = { title: string; body: string; icon: string };

function FeatureGrid({
  features,
  cols = 3,
}: {
  features: Feature[];
  cols?: 2 | 3;
}) {
  return (
    <RevealGroup
      className={`grid gap-4 sm:grid-cols-2 ${
        cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {features.map((f) => {
        const Icon = icons[f.icon] ?? Sparkles;
        return (
          <RevealItem key={f.title}>
            <GlassCard className="h-full" tilt>
              <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/10 text-brand-blue">
                <span className="absolute inset-0 rounded-2xl border border-white/10" />
                <Icon size={20} className="relative z-10" />
              </div>
              <h3 className="text-lg font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {f.body}
              </p>
            </GlassCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="container-page space-y-20">
        <div>
          <SectionHeading
            eyebrow="Features"
            title="Everything founders need to"
            highlight="ship with confidence."
            description="Submit an app, track testers, and turn structured feedback into a launch-ready product."
          />
          <div className="mt-12">
            <FeatureGrid features={founderFeatures} cols={3} />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <SectionHeading
            eyebrow="For testers"
            title="Get paid for your"
            highlight="product instincts."
            description="Choose the AI products you want to evaluate, follow guided flows, and build a public reputation."
            align="left"
          />
          <FeatureGrid features={testerFeatures} cols={2} />
        </div>

        <div>
          <SectionHeading
            eyebrow="Marketplace"
            title="Purpose-built for the"
            highlight="AI-native era."
            description="Smart matching, guided validation, and standardized reports — designed for how AI startups actually build."
          />
          <div className="mt-12">
            <FeatureGrid features={marketplaceFeatures} cols={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
