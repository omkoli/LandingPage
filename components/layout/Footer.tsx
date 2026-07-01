"use client";

import { useState } from "react";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { footerLinks, site } from "@/lib/site";
import Logo from "@/components/ui/Logo";

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60vw] -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[120px]" />

      <div className="container-page relative z-10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="text-lg font-semibold tracking-tight text-white">
                {site.name}
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              The usability testing marketplace built for AI-generated apps.
              Validate before your users do.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-6"
            >
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/40">
                Product updates
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-4 backdrop-blur-md focus-within:border-brand-indigo/50">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={sent ? "You're subscribed 🎉" : "you@startup.com"}
                  disabled={sent}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple text-white transition-transform hover:scale-105"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white">{group}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {site.name}. Built for founders shipping
            the future.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
