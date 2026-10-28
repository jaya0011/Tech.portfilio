"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

const socials = [
  { label: "GitHub", handle: "@jaya0011", href: siteConfig.socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", handle: "Jaya Arora", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", handle: "@jayaonloop", href: siteConfig.socials.instagram, Icon: InstagramIcon },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <div className="group flex items-center gap-3 rounded-2xl p-2 pl-4 glass">
      <Mail className="size-5 shrink-0 text-accent" />
      <a href={`mailto:${siteConfig.email}`} className="min-w-0 flex-1 truncate font-medium hover:underline">
        {siteConfig.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-fg text-bg transition-transform hover:scale-105"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title={[{ text: "Have an idea?" }, { text: "Let's build it", className: accent }, { text: "together." }]}
              description="Tell me about your project — a new product, a store, an app or improvements to something you already have. I'll reply with next steps, a timeline and an honest estimate."
            />

            <Reveal delay={0.2} className="mt-10 space-y-4">
              <CopyEmail />
              <div className="flex items-center gap-3 rounded-2xl px-4 py-4 text-sm glass">
                <MapPin className="size-5 text-accent" />
                <span>
                  {siteConfig.location} <span className="text-muted">· Working with clients worldwide</span>
                </span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {socials.map(({ label, handle, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col gap-4 rounded-2xl p-4 glass transition-all hover:-translate-y-1 hover:border-line-strong"
                    >
                      <span className="flex items-center justify-between">
                        <Icon className="size-5" />
                        <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{label}</span>
                        <span className="block truncate text-xs text-muted">{handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
