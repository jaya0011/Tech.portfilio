"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/portfolio";
import { EASE, cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { GitHubIcon, InstagramIcon, LinkedInIcon, LogoMark } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { openCommandMenu } from "./command-menu";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!enabled) return;
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : "";
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-all duration-500",
            scrolled ? "shadow-soft glass-strong" : "border border-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Jaya Arora — home">
            <LogoMark className="size-8" />
            <span className="hidden sm:inline">
              jaya<span className="text-accent">.</span>arora
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm transition-colors",
                    active === link.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface ring-1 ring-line"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCommandMenu}
              className="hidden h-9 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-surface hover:text-fg md:flex"
              aria-label="Open command menu"
            >
              <Command className="size-4" />
              <kbd className="font-mono text-xs">K</kbd>
            </button>
            <ThemeToggle />
            <Link href="/#contact" className={buttonClasses("primary", "sm", "ml-1 hidden sm:inline-flex")}>
              Hire me
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/90 px-6 pt-28 pb-10 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <Link
                    href={`/#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-4xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-auto flex flex-col gap-6"
            >
              <Link href="/#contact" onClick={() => setOpen(false)} className={buttonClasses("primary", "lg", "w-full")}>
                Start a project <ArrowUpRight className="size-4" />
              </Link>
              <div className="flex items-center justify-between text-sm text-muted">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">
                  {siteConfig.email}
                </a>
                <div className="flex gap-4">
                  <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHubIcon className="size-5" />
                  </a>
                  <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon className="size-5" />
                  </a>
                  <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon className="size-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
