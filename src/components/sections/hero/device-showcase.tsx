"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bell, CalendarCheck, CircleCheck, Clock, Home, User } from "lucide-react";
import { EASE } from "@/lib/utils";
import { CodeEditor } from "./code-editor";

const chips = [
  { label: "Next.js", dot: "bg-white", className: "-top-5 right-[12%]", delay: 0 },
  { label: "TypeScript", dot: "bg-[#3178c6]", className: "top-[30%] -right-4 sm:-right-8", delay: 1.2 },
  { label: "PostgreSQL", dot: "bg-[#336791]", className: "-top-5 left-[6%]", delay: 0.6 },
  { label: "React Native", dot: "bg-[#61dafb]", className: "right-[6%] -bottom-6", delay: 1.8 },
];

/** Interactive laptop + phone mockup that tilts with the cursor. */
export function DeviceShowcase() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -3]), { stiffness: 120, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

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

  return (
    <div className="relative mx-auto w-full max-w-[640px] [perspective:1800px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* Glow behind devices */}
      <div
        aria-hidden="true"
        className="absolute inset-[10%] -z-10 rounded-full bg-gradient-to-tr from-accent/40 via-accent-3/20 to-accent-2/40 blur-[80px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 25 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        className="[transform-style:preserve-3d]"
      >
        <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
          {/* ---- Laptop ---- */}
          <figure aria-label="Laptop showing Jaya's code editor" className="relative">
            <div className="relative rounded-t-[1.1rem] rounded-b-md border border-black/10 bg-[#0a0a0f] p-[1.6%] pb-[2.4%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] dark:border-white/10">
              {/* camera */}
              <span className="absolute top-[0.6%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/15 ring-2 ring-white/5" />
              <div className="[container-type:inline-size] relative aspect-[16/10] overflow-hidden rounded-[0.35rem]">
                <div className="h-full text-[1.55cqw]">
                  <CodeEditor />
                </div>
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

          {/* ---- Phone ---- */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            style={{ translateZ: 60 }}
            className="absolute -bottom-[20%] -left-[7%] hidden w-[20%] sm:block"
          >
            <div className="animate-float">
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
