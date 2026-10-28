"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, CornerDownLeft, FolderGit2, Hash, Mail, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks, projects, siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";

const OPEN_EVENT = "open-command-menu";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = {
  id: string;
  group: "Navigate" | "Projects" | "Actions" | "Connect";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

/** ⌘K / Ctrl+K command palette for keyboard-first navigation. */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo<Item[]>(() => {
    const close = () => {
      setOpen(false);
      setQuery("");
      setIndex(0);
    };
    const go = (href: string) => {
      close();
      router.push(href);
    };
    const external = (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      ...navLinks.map((l) => ({
        id: `nav-${l.id}`,
        group: "Navigate" as const,
        label: l.label,
        hint: `#${l.id}`,
        icon: <Hash className="size-4" />,
        run: () => go(`/#${l.id}`),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects" as const,
        label: p.title,
        hint: p.type,
        icon: <FolderGit2 className="size-4" />,
        run: () => go(`/projects/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: siteConfig.email,
        icon: <Copy className="size-4" />,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email).then(
            () => setToast("Email copied to clipboard"),
            () => setToast("Couldn't copy — " + siteConfig.email),
          );
          close();
        },
      },
      {
        id: "toggle-theme",
        group: "Actions",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
        icon: <Moon className="size-4" />,
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
      {
        id: "email",
        group: "Connect",
        label: "Send an email",
        icon: <Mail className="size-4" />,
        run: () => {
          close();
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "github",
        group: "Connect",
        label: "GitHub",
        hint: "@jaya0011",
        icon: <GitHubIcon className="size-4" />,
        run: () => external(siteConfig.socials.github),
      },
      {
        id: "linkedin",
        group: "Connect",
        label: "LinkedIn",
        icon: <LinkedInIcon className="size-4" />,
        run: () => external(siteConfig.socials.linkedin),
      },
      {
        id: "instagram",
        group: "Connect",
        label: "Instagram",
        hint: "@jayaonloop",
        icon: <InstagramIcon className="size-4" />,
        run: () => external(siteConfig.socials.instagram),
      },
    ];
  }, [router, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const safeIndex = Math.min(index, Math.max(filtered.length - 1, 0));

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((safeIndex + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((safeIndex - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[safeIndex]?.run();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-${filtered[safeIndex]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, filtered]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl glass-strong"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 shrink-0 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search sections, projects, actions…"
                  className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-subtle"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmd-list"
                  aria-activedescendant={filtered[safeIndex] ? `cmd-${filtered[safeIndex].id}` : undefined}
                  aria-autocomplete="list"
                />
                <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>

              <ul id="cmd-list" role="listbox" aria-label="Commands" className="no-scrollbar max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-muted">No results for “{query}”</li>}
                {filtered.map((item, i) => {
                  const header = item.group !== filtered[i - 1]?.group ? item.group : null;
                  return (
                    <li key={item.id} role="presentation">
                      {header && (
                        <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">{header}</p>
                      )}
                      <div
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={i === safeIndex}
                        onMouseMove={() => setIndex(i)}
                        onClick={item.run}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          i === safeIndex ? "bg-surface text-fg ring-1 ring-line" : "text-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-8 place-items-center rounded-lg border border-line",
                            i === safeIndex && "text-accent",
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && <span className="hidden truncate text-xs text-subtle sm:block">{item.hint}</span>}
                        {i === safeIndex && <CornerDownLeft className="size-3.5 text-subtle" />}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
                <span>↑↓ navigate · ↵ select</span>
                <span className="flex items-center gap-1">
                  jaya.arora <ArrowRight className="size-3" /> cmd
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm shadow-soft glass-strong"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
