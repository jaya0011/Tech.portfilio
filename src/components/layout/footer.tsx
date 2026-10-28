"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon, LogoMark } from "@/components/ui/icons";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: siteConfig.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"} IST</span>;
}

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
              <LogoMark className="size-8" />
              <span>
                jaya<span className="text-accent">.</span>arora
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Full-stack developer & freelancer building fast, reliable web and mobile products for businesses worldwide.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Amritsar, India · <LocalTime />
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Sitemap</p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link href={`/#${l.id}`} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-subtle uppercase">Connect</p>
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted transition-colors hover:text-fg">
              {siteConfig.email}
            </a>
            <div className="mt-4 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full text-muted glass transition-all hover:-translate-y-0.5 hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Designed & engineered with Next.js, TypeScript & Framer Motion.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            Back to top
            <span className="grid size-8 place-items-center rounded-full glass transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
