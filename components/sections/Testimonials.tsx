"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const gradients = [
  "from-brand-indigo to-brand-cyan",
  "from-brand-purple to-brand-pink",
  "from-brand-teal to-brand-emerald",
  "from-brand-blue to-brand-purple",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Loved by builders"
          title="What early founders and testers"
          highlight="are saying."
          description="Real reactions from the pilot program — feedback that reads like a product review, not a bug list."
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <RevealItem key={t.name}>
              <GlassCard className="h-full" lift>
                <Quote
                  size={32}
                  className="mb-4 text-white/10"
                  fill="currentColor"
                />
                <p className="text-lg leading-relaxed text-white/80">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${
                      gradients[i % gradients.length]
                    } text-sm font-semibold text-white`}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-sm text-white/45">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
