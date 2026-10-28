"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bell, CalendarCheck, CircleCheck, Clock, Code2, Home, MonitorPlay, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { EASE, cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/projects/project-preview";
import { CodeEditor } from "./code-editor";

const featured = projects.filter((p) => p.featured);
const CYCLE_MS = 3600;

const chips = [
  { label: "PostgreSQL", dot: "bg-[#336791]", className: "-top-5 left-[6%]", delay: 0.6 },
  { label: "Next.js", dot: "bg-fg", className: "-top-5 right-[10%]", delay: 0 },
  { label: "TypeScript", dot: "bg-[#3178c6]", className: "top-[46%] -left-8 lg:-left-14", delay: 1.2 },
  { label: "React Native", dot: "bg-[#61dafb]", className: "-bottom-[36%] -right-[2%] xl:-right-[10%]", delay: 1.8 },
];

type Screen = "code" | "live";

/**
 * Interactive laptop + phone mockup that tilts with the cursor.
 * The laptop types out code, "deploys" it, then switches to a live preview
 * cycling through featured projects — visitors can flip between the two.
 */
export function DeviceShowcase() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -3]), { stiffness: 120, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

  const [screen, setScreen] = useState<Screen>("code");
  const [index, setIndex] = useState(0);
  const userChose = useRef(false);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Auto-switch to the live preview shortly after the deploy finishes, unless the visitor took control.
  const onDeployed = useCallback(() => {
    switchTimer.current = setTimeout(() => {
      if (!userChose.current) setScreen("live");
    }, 1600);
  }, []);
  useEffect(() => () => clearTimeout(switchTimer.current), []);

  useEffect(() => {
    if (screen !== "live") return;
    const id = setInterval(() => setIndex((i) => (i + 1) % featured.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [screen]);

  function choose(next: Screen) {
    userChose.current = true;
    setScreen(next);
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const current = featured[index];

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className="relative [perspective:1800px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        {/* Glow behind devices — tinted by the project on screen */}
        <div
          aria-hidden="true"
          className="absolute inset-[10%] -z-10 rounded-full opacity-70 blur-[80px] transition-[background] duration-1000"
          style={{
            background:
              screen === "live"
                ? `linear-gradient(45deg, ${current.accent.from}, ${current.accent.to})`
                : "linear-gradient(45deg, var(--accent), var(--accent-3), var(--accent-2))",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 25 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
          className="[transform-style:preserve-3d]"
        >
          <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
            {/* ---- Laptop ---- */}
            <figure aria-label="Laptop showing Jaya's code and the products it ships" className="relative">
              <div className="relative rounded-t-[1.1rem] rounded-b-md border border-black/10 bg-[#0a0a0f] p-[1.6%] pb-[2.4%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] dark:border-white/10">
                <span className="absolute top-[0.6%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/15 ring-2 ring-white/5" />
                <div className="[container-type:inline-size] relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-[#0b0f17]">
                  {/* Source view stays mounted so the typing state survives toggling */}
                  <motion.div
                    className="absolute inset-0 text-[1.55cqw]"
                    animate={
                      screen === "code"
                        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                        : { opacity: 0, scale: 0.96, filter: "blur(6px)" }
                    }
                    transition={{ duration: 0.6, ease: EASE }}
                    aria-hidden={screen !== "code"}
                  >
                    <CodeEditor onDeployed={onDeployed} />
                  </motion.div>

                  {/* Live view */}
                  <AnimatePresence initial={false}>
                    {screen === "live" && (
                      <motion.div
                        key="live"
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      >
                        <AnimatePresence initial={false}>
                          <motion.div
                            key={current.slug}
                            className="absolute inset-0"
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.8, ease: EASE }}
                          >
                            <ProjectPreview project={current} fill className="rounded-none border-0 shadow-none" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Caption + progress */}
                        <div className="absolute right-[3%] bottom-[4%] left-[3%] flex items-center justify-between gap-[2cqw] rounded-[1.4cqw] bg-black/55 px-[2.2cqw] py-[1.4cqw] text-[1.7cqw] text-white backdrop-blur-md">
                          <span className="flex min-w-0 items-center gap-[1cqw]">
                            <span className="relative flex size-[1.1cqw]">
                              <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex size-full rounded-full bg-emerald-400" />
                            </span>
                            <span className="truncate font-medium">{current.title}</span>
                            <span className="hidden truncate text-white/55 sm:inline">· {current.type}</span>
                          </span>
                          <span className="flex shrink-0 gap-[0.8cqw]">
                            {featured.map((p, i) => (
                              <span
                                key={p.slug}
                                className="relative h-[0.5cqw] w-[4cqw] overflow-hidden rounded-full bg-white/20"
                              >
                                {i === index && (
                                  <motion.span
                                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                                  />
                                )}
                                {i < index && <span className="absolute inset-0 rounded-full bg-white/70" />}
                              </span>
                            ))}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* screen glare */}
                  <motion.div
                    aria-hidden="true"
                    style={{ left: glareX }}
                    className="pointer-events-none absolute -top-1/2 h-[200%] w-1/3 -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                  />
                </div>
              </div>
              {/* deck */}
              <div className="relative left-1/2 h-3 w-[116%] -translate-x-1/2 rounded-t-sm rounded-b-[1.2rem] bg-gradient-to-b from-[#e4e4ea] via-[#b9b9c3] to-[#8a8a96] shadow-[0_30px_40px_-20px_rgba(0,0,0,0.5)] sm:h-4 dark:from-[#3a3a45] dark:via-[#25252d] dark:to-[#141419]">
                <span className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-lg bg-black/15 dark:bg-black/40" />
              </div>
            </figure>

            {/* ---- Phone (right side, clear of the code) ---- */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
              style={{ translateZ: 60 }}
              className="absolute -right-[5%] -bottom-[26%] hidden w-[17%] sm:block lg:-right-[1%] xl:-right-[12%]"
            >
              <div className="animate-float" style={{ animationDelay: "0.8s" }}>
                <PhoneMock />
              </div>
            </motion.div>

            {/* ---- Floating chips ---- */}
            {chips.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.15, duration: 0.6, ease: EASE }}
                style={{ translateZ: 80 }}
                className={`absolute ${c.className} hidden md:block`}
              >
                <div
                  className="flex animate-float items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] shadow-soft glass-strong"
                  style={{ animationDelay: `${c.delay}s` }}
                >
                  <span className={`size-2 rounded-full ${c.dot} ring-1 ring-black/10`} />
                  {c.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ---- Source / Live toggle ---- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: EASE }}
        className="mt-10 flex justify-center sm:mt-14 sm:justify-start sm:pl-[4%]"
      >
        <div role="group" aria-label="Laptop screen" className="flex gap-1 rounded-full p-1 shadow-soft glass-strong">
          {(
            [
              { id: "code", label: "Source", Icon: Code2 },
              { id: "live", label: "Live projects", Icon: MonitorPlay },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={screen === id}
              onClick={() => choose(id)}
              className={cn(
                "relative isolate flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                screen === id ? "text-bg" : "text-muted hover:text-fg",
              )}
            >
              {screen === id && (
                <motion.span
                  layoutId="screen-toggle"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div
      aria-hidden="true"
      className="[container-type:inline-size] relative aspect-[9/19] rounded-[18%/8.5%] border-[3px] border-[#1c1c22] bg-[#0b0b10] p-[4%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[14%/6.5%] bg-gradient-to-b from-[#16132b] to-[#0b0f17] text-[6.5cqw] text-white">
        {/* dynamic island */}
        <span className="mx-auto mt-[5%] h-[3.5%] w-[34%] rounded-full bg-black" />
        <div className="flex items-center justify-between px-[8%] pt-[7%]">
          <div>
            <p className="text-[0.75em] text-white/50">Good morning</p>
            <p className="text-[1.05em] font-semibold">Jaya 👋</p>
          </div>
          <Bell className="size-[1.2em] text-white/60" />
        </div>

        <div className="mx-[7%] mt-[8%] rounded-[0.9em] bg-gradient-to-br from-[#6a46ff] to-[#0891b2] p-[8%]">
          <p className="text-[0.75em] text-white/80">Today · Shift 9:00</p>
          <p className="mt-[0.2em] text-[1.6em] leading-none font-semibold tabular-nums">09:02</p>
          <span className="mt-[0.7em] inline-flex items-center gap-[0.3em] rounded-full bg-white/20 px-[0.7em] py-[0.25em] text-[0.75em]">
            <CircleCheck className="size-[1em]" /> Checked in
          </span>
        </div>

        <div className="mx-[7%] mt-[8%] space-y-[0.5em]">
          {[
            { icon: CalendarCheck, t: "Leave approved", c: "text-emerald-300" },
            { icon: Clock, t: "Payroll · Friday", c: "text-sky-300" },
            { icon: User, t: "3 new teammates", c: "text-fuchsia-300" },
          ].map(({ icon: Icon, t, c }) => (
            <div key={t} className="flex items-center gap-[0.5em] rounded-[0.6em] bg-white/[0.06] px-[0.6em] py-[0.55em]">
              <Icon className={`size-[1.1em] ${c}`} />
              <span className="text-[0.8em] text-white/85">{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex justify-around border-t border-white/5 py-[6%] text-white/40">
          <Home className="size-[1.2em] text-white" />
          <CalendarCheck className="size-[1.2em]" />
          <User className="size-[1.2em]" />
        </div>
      </div>
    </div>
  );
}
