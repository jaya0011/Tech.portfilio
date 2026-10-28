"use client";

import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { hero, siteConfig } from "@/data/portfolio";
import { EASE } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";
import { accent } from "@/components/ui/section-heading";
import { SplitText } from "@/components/ui/split-text";
import { DeviceShowcase } from "./device-showcase";

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % hero.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={hero.roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block text-fg"
        >
          {hero.roles[i]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-blink bg-accent" aria-hidden="true" />
    </span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => (node.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" aria-label="Introduction" className="relative pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div {...fadeUp(0.1)} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium glass">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {hero.status}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="size-3.5" /> {siteConfig.location}
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.2)} className="mt-8 font-mono text-sm text-muted">
            <span className="text-accent">{"//"}</span> Hi, I&apos;m <span className="text-fg">{siteConfig.name}</span>
          </motion.p>

          <h1 className="mt-4 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem]">
            <SplitText
              animateOnMount
              delay={0.3}
              segments={[
                { text: "I turn ideas into" },
                { text: "fast, scalable", className: accent },
                { text: "web & mobile products." },
              ]}
            />
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-6 font-mono text-base text-muted sm:text-lg">
            <span className="text-accent-2">&gt;</span> <RoleRotator />
          </motion.p>

          <motion.p {...fadeUp(0.85)} className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {hero.intro}
          </motion.p>

          <motion.div {...fadeUp(1)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#work" size="lg">
              Explore my work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary" size="lg">
              Let&apos;s talk
            </ButtonLink>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: siteConfig.socials.github, label: "GitHub", Icon: GitHubIcon },
                { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile`}
                  className="grid size-11 place-items-center rounded-full text-muted transition-all hover:-translate-y-0.5 hover:bg-surface hover:text-fg"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: deviceY }} className="px-2 pb-10 sm:px-6 lg:px-0">
          <DeviceShowcase />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
        <motion.dl
          {...fadeUp(1.3)}
          className="grid grid-cols-2 divide-line overflow-hidden rounded-3xl glass md:grid-cols-4 md:divide-x"
        >
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 p-6 sm:p-8 ${i < 2 ? "border-b border-line md:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-line md:border-r-0" : ""}`}
            >
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-4xl font-semibold tracking-tight sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mx-auto mt-12 hidden w-fit flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-subtle uppercase md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
