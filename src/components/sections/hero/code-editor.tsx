"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { Files, GitBranch, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CODE = `import { Developer } from "@jaya/core";

const jaya: Developer = {
  name: "Jaya Arora",
  role: "Full-Stack Developer",
  based: "Amritsar, India",
  stack: ["Next.js", "NestJS",
          "React Native", "Postgres"],
  ships: "web + iOS + Android",
  available: true,
};

export async function build(idea: Idea) {
  const app = await jaya.craft(idea);
  return app.deploy({ fast: true });
}`;

const SOURCE_LINES = CODE.split("\n");
// Character offset where each line starts within CODE (+1 per newline).
const LINE_STARTS = SOURCE_LINES.map((_, i) => SOURCE_LINES.slice(0, i).reduce((n, l) => n + l.length + 1, 0));

const TERMINAL = [
  { text: "✓ Compiled successfully in 2.1s", tone: "ok" },
  { text: "✓ Type-check passed · 0 errors", tone: "ok" },
  { text: "▲ Deployed to production — ready", tone: "accent" },
] as const;

type Kind = "kw" | "str" | "fn" | "type" | "prop" | "bool" | "punc" | "plain";

const KEYWORDS = new Set(["import", "from", "const", "export", "async", "function", "await", "return"]);

const tokenColors: Record<Kind, string> = {
  kw: "text-[#c792ea]",
  str: "text-[#c3e88d]",
  fn: "text-[#82aaff]",
  type: "text-[#ffcb6b]",
  prop: "text-[#89ddff]",
  bool: "text-[#f78c6c]",
  punc: "text-[#7f8ea3]",
  plain: "text-[#d6deeb]",
};

/** Tiny purpose-built highlighter — just enough TypeScript for the hero snippet. */
function tokenize(line: string): { text: string; kind: Kind }[] {
  const out: { text: string; kind: Kind }[] = [];
  const re = /("[^"]*")|([A-Za-z_@$][\w/]*)|(\s+)|([^\w\s"]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const [tok, str, ident, space] = m;
    if (str) out.push({ text: tok, kind: "str" });
    else if (space) out.push({ text: tok, kind: "plain" });
    else if (ident) {
      const rest = line.slice(re.lastIndex).trimStart();
      let kind: Kind = "plain";
      if (KEYWORDS.has(tok)) kind = "kw";
      else if (tok === "true" || tok === "false") kind = "bool";
      else if (rest.startsWith("(")) kind = "fn";
      else if (/^[A-Z]/.test(tok)) kind = "type";
      else if (rest.startsWith(":")) kind = "prop";
      out.push({ text: tok, kind });
    } else out.push({ text: tok, kind: "punc" });
  }
  return out;
}

export function CodeEditor({ onDeployed }: { onDeployed?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const lines = useMemo(() => SOURCE_LINES.map(tokenize), []);
  const total = CODE.length;

  const [typed, setTyped] = useState(0);
  const [termLines, setTermLines] = useState(0);
  const chars = reduce ? total : typed;
  const shownTerm = reduce ? TERMINAL.length + 1 : termLines;
  const done = chars >= total;

  useEffect(() => {
    if (!inView || reduce) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setTyped((c) => {
          if (c >= total) {
            clearInterval(id);
            return c;
          }
          // Two characters per tick; whole runs of indentation appear at once.
          let next = Math.min(c + 2, total);
          while (next < total && CODE[next] === " " && CODE[next - 1] === " ") next++;
          return next;
        });
      }, 22);
    }, 1000);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [inView, reduce, total]);

  useEffect(() => {
    if (!done || reduce) return;
    const timers = [0, 1, 2, 3].map((i) => setTimeout(() => setTermLines(i + 1), 350 + i * 650));
    return () => timers.forEach(clearTimeout);
  }, [done, reduce]);

  const deployed = shownTerm > TERMINAL.length;
  useEffect(() => {
    if (deployed) onDeployed?.();
  }, [deployed, onDeployed]);

  // Render the snippet up to `chars` characters, preserving token colours.
  const rendered = lines.map((tokens, li) => {
    const lineLen = SOURCE_LINES[li].length;
    const budget = chars - LINE_STARTS[li];
    let left = Math.max(0, Math.min(budget, lineLen));
    const parts = tokens.map((t, ti) => {
      if (left <= 0) return null;
      const text = t.text.slice(0, left);
      left -= text.length;
      return (
        <span key={ti} className={tokenColors[t.kind]}>
          {text}
        </span>
      );
    });
    const isCursor = budget >= 0 && budget <= lineLen;
    return { parts, isCursor, li };
  });
  const activeLine = rendered.findIndex((r) => r.isCursor);

  return (
    <div ref={ref} className="flex h-full flex-col bg-[#0b0f17] font-mono text-[#d6deeb] select-none">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#0f141d] px-3 py-[0.55em]">
        <div className="flex gap-[0.4em]">
          <span className="size-[0.7em] rounded-full bg-[#ff5f57]" />
          <span className="size-[0.7em] rounded-full bg-[#febc2e]" />
          <span className="size-[0.7em] rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-3 flex gap-[0.3em] text-[0.82em]">
          <span className="rounded-t-md border-x border-t border-white/10 bg-[#0b0f17] px-[0.8em] py-[0.25em] text-white">
            <span className="text-[#3178c6]">TS</span> developer.ts
          </span>
          <span className="hidden px-[0.8em] py-[0.25em] text-white/40 sm:inline">api.controller.ts</span>
          <span className="hidden px-[0.8em] py-[0.25em] text-white/40 md:inline">schema.sql</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Activity bar */}
        <div className="hidden flex-col items-center gap-[1em] border-r border-white/5 bg-[#0f141d] px-[0.6em] pt-[0.9em] text-white/30 sm:flex">
          <Files className="size-[1.2em] text-white/70" />
          <Search className="size-[1.2em]" />
          <GitBranch className="size-[1.2em]" />
        </div>

        {/* Code */}
        <div className="relative min-w-0 flex-1 overflow-hidden py-[0.7em] text-[0.95em] leading-[1.6]">
          {rendered.map(({ parts, li }) => (
            <div key={li} className={cn("flex pr-3", li === activeLine && !done && "bg-white/[0.03]")}>
              <span className="w-[2.6em] shrink-0 pr-[0.9em] text-right text-white/20 tabular-nums">{li + 1}</span>
              <span className="whitespace-pre">
                {parts}
                {(li === activeLine || (done && li === lines.length - 1)) && (
                  <span className="ml-px inline-block h-[1.1em] w-[0.5em] translate-y-[0.18em] animate-blink bg-[#82aaff]" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div className="border-t border-white/5 bg-[#090c12] px-3 py-[0.6em] text-[0.85em] leading-[1.7]">
        <div className="mb-[0.2em] flex gap-[1.2em] text-[0.85em] tracking-wider text-white/35 uppercase">
          <span className="border-b border-[#82aaff] text-white/80">Terminal</span>
          <span>Output</span>
          <span className="hidden sm:inline">Problems</span>
        </div>
        <p className={cn("transition-opacity", shownTerm > 0 ? "opacity-100" : "opacity-0")}>
          <span className="text-[#c3e88d]">➜</span> <span className="text-[#82aaff]">~/jaya</span>{" "}
          <span className="text-white/80">npm run build && npm run deploy</span>
        </p>
        {TERMINAL.map((l, i) => (
          <p
            key={l.text}
            className={cn(
              "transition-all duration-500",
              shownTerm > i + 1 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              l.tone === "ok" ? "text-[#c3e88d]" : "text-[#c792ea]",
            )}
          >
            {l.text}
          </p>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#6a46ff] to-[#0891b2] px-3 py-[0.25em] text-[0.75em] text-white">
        <span className="flex items-center gap-[0.4em]">
          <GitBranch className="size-[1em]" /> main
        </span>
        <span className="opacity-90">TypeScript · UTF-8 · Ln {Math.max(activeLine, 0) + 1}</span>
      </div>
    </div>
  );
}
