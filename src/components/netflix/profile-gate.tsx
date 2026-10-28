"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profiles } from "@/data/portfolio";
import { EASE } from "@/lib/utils";
import { ProfileAvatar } from "./brand";
import { rememberProfile } from "./use-profile";

const LETTERS = "JAYA".split("");
const INTRO_MS = 2900;

/** Logo intro (skippable) followed by the "Who's watching?" profile picker. */
export function ProfileGate() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"intro" | "profiles">("intro");

  useEffect(() => {
    if (stage !== "intro") return;
    const skip = () => setStage("profiles");
    const timer = window.setTimeout(skip, reduce ? 0 : INTRO_MS);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, [stage, reduce]);

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {stage === "intro" ? (
          <motion.button
            key="intro"
            type="button"
            onClick={() => setStage("profiles")}
            aria-label="Skip intro"
            className="absolute inset-0 grid cursor-default place-items-center outline-none"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.span
              className="relative flex font-display text-[clamp(7rem,26vw,20rem)] leading-none text-accent"
              initial={{ scale: 0.85 }}
              animate={{
                scale: [0.85, 1, 1, 9],
                opacity: [1, 1, 1, 0],
                filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(8px)"],
                textShadow: [
                  "0 0 0px rgba(229,9,20,0)",
                  "0 0 40px rgba(229,9,20,0.55)",
                  "0 0 90px rgba(229,9,20,0.9)",
                  "0 0 120px rgba(229,9,20,1)",
                ],
              }}
              transition={{ duration: INTRO_MS / 1000, times: [0, 0.3, 0.68, 1], ease: "easeIn" }}
            >
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block origin-bottom"
                  initial={{ opacity: 0, y: "30%", scaleY: 0.4 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.09 }}
                >
                  {l}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="absolute bottom-10 text-xs tracking-[0.3em] text-white/40 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Click or press any key to skip
            </motion.span>
          </motion.button>
        ) : (
          <motion.section
            key="profiles"
            aria-labelledby="whos-watching"
            className="flex flex-col items-center px-4 py-16 text-center"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h1 id="whos-watching" className="text-3xl font-medium text-white sm:text-5xl lg:text-6xl">
              Who&apos;s watching?
            </h1>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:mt-12 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
              {profiles.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
                >
                  <Link
                    href={`/browse/${p.id}`}
                    onClick={() => rememberProfile(p.id)}
                    className="group flex flex-col items-center gap-3 rounded-md outline-none"
                  >
                    <span className="block rounded-[6%] ring-white transition-shadow group-hover:ring-[3px] group-focus-visible:ring-[3px]">
                      <ProfileAvatar profile={p} className="block size-28 sm:size-36 lg:size-40" />
                    </span>
                    <span className="text-base text-[#808080] transition-colors group-hover:text-white group-focus-visible:text-white sm:text-xl">
                      {p.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 max-w-md text-sm text-[#808080] sm:mt-16">
              Every profile gets its own curated tour of Jaya Arora&apos;s portfolio — pick the one that fits you best.
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
