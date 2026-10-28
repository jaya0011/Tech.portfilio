import { Lock } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Stylised, code-drawn UI previews for each project, framed in a browser window.
 * Everything scales with container-query units so previews stay crisp at any size.
 */
export function ProjectPreview({
  project,
  className,
  fill = false,
}: {
  project: Project;
  className?: string;
  /** Stretch to fill the parent's height instead of using a fixed 16:10 body. */
  fill?: boolean;
}) {
  const { from, to } = project.accent;
  const host = project.url ? new URL(project.url).host : `${project.slug}.app`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "[container-type:inline-size] relative overflow-hidden rounded-2xl border border-line bg-[#0c0d12] shadow-soft",
        fill && "flex h-full flex-col",
        className,
      )}
      style={{ "--pa": from, "--pb": to } as React.CSSProperties}
    >
      <div className="flex items-center gap-[1.2cqw] border-b border-white/5 bg-[#12131a] px-[2.5cqw] py-[1.6cqw]">
        <span className="size-[1.4cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="size-[1.4cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#febc2e]" />
        <span className="size-[1.4cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex w-1/2 items-center justify-center gap-[0.8cqw] rounded-md bg-white/5 py-[0.7cqw] font-mono text-[max(1.8cqw,8px)] text-white/45">
          <Lock className="size-[max(1.6cqw,7px)]" />
          {host}
        </div>
      </div>
      <div className={cn("relative text-[1.9cqw] text-white", fill ? "min-h-0 flex-1" : "aspect-[16/10]")}>
        <Body variant={project.preview} title={project.title} />
      </div>
    </div>
  );
}

const grad = "bg-[linear-gradient(135deg,var(--pa),var(--pb))]";
const soft = "bg-white/[0.06]";

function Bar({ w, className }: { w: string; className?: string }) {
  return <div className={cn("h-[0.55em] rounded-full bg-white/15", className)} style={{ width: w }} />;
}

function Body({ variant, title }: { variant: Project["preview"]; title: string }) {
  switch (variant) {
    case "ecommerce":
      return (
        <div className="flex h-full flex-col bg-[#0f0d0a] p-[4%]">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[1.5em] tracking-[0.3em] text-[var(--pa)] uppercase">{title.split(" ")[0]}</span>
            <div className="flex gap-[1em]">
              {["Rings", "Necklaces", "Gems"].map((t) => (
                <span key={t} className="text-[0.85em] text-white/50">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[4%] grid flex-1 grid-cols-[1.1fr_1fr] gap-[4%]">
            <div className={cn("relative grid place-items-center overflow-hidden rounded-[0.8em]", soft)}>
              <div className="absolute size-[70%] rounded-full bg-[var(--pa)]/20 blur-2xl" />
              <div className="relative size-[45%] rounded-full border-[0.5em] border-[var(--pa)] shadow-[0_0_40px_var(--pa)]">
                <div className={cn("absolute -top-[30%] left-1/2 size-[38%] -translate-x-1/2 rotate-45 rounded-[0.2em]", grad)} />
              </div>
              <span className="absolute right-[5%] bottom-[5%] rounded-full bg-black/50 px-[0.7em] py-[0.2em] text-[0.75em]">
                3D view
              </span>
            </div>
            <div className="flex flex-col gap-[0.6em] py-[4%]">
              <span className="text-[0.75em] tracking-widest text-[var(--pa)] uppercase">Emerald · 18K Gold</span>
              <Bar w="90%" className="h-[0.9em] bg-white/70" />
              <Bar w="60%" className="h-[0.9em] bg-white/70" />
              <span className="mt-[0.4em] text-[1.3em] font-semibold">$1,240</span>
              <div className="flex gap-[0.4em]">
                {["USD", "EUR", "INR"].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "rounded-[0.4em] border px-[0.5em] py-[0.15em] text-[0.7em]",
                      i === 0 ? "border-[var(--pa)] text-[var(--pa)]" : "border-white/15 text-white/50",
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className={cn("mt-auto rounded-[0.5em] py-[0.6em] text-center text-[0.85em] font-semibold text-black", grad)}>
                Add to cart
              </div>
              <div className="rounded-[0.5em] border border-white/15 py-[0.5em] text-center text-[0.8em] text-white/70">
                ♡ Wishlist
              </div>
            </div>
          </div>
        </div>
      );

    case "dashboard":
      return (
        <div className="flex h-full bg-[#0b0e16]">
          <div className="flex w-[20%] flex-col gap-[0.6em] border-r border-white/5 p-[2.5%]">
            <div className={cn("mb-[0.6em] h-[1.4em] w-[70%] rounded-[0.3em]", grad)} />
            {["Dashboard", "Employees", "Attendance", "Leave", "Payroll", "Expenses"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "truncate rounded-[0.35em] px-[0.5em] py-[0.25em] text-[0.75em]",
                  i === 0 ? "bg-white/10 text-white" : "text-white/45",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-[3%] p-[3%]">
            <div className="grid grid-cols-3 gap-[3%]">
              {[
                ["Present", "248"],
                ["On leave", "12"],
                ["Payroll", "₹38L"],
              ].map(([k, v]) => (
                <div key={k} className={cn("rounded-[0.6em] p-[6%]", soft)}>
                  <p className="text-[0.7em] text-white/50">{k}</p>
                  <p className="text-[1.4em] font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <div className={cn("flex flex-1 items-end gap-[2.5%] rounded-[0.6em] p-[4%]", soft)}>
              {[45, 70, 55, 85, 60, 92, 75, 66, 88, 52, 78, 95].map((h, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-[0.25em]", i % 3 === 2 ? grad : "bg-white/15")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[3%]">
              {["Leave requests", "Expense claims"].map((t) => (
                <div key={t} className={cn("flex items-center justify-between rounded-[0.6em] px-[5%] py-[4%]", soft)}>
                  <span className="text-[0.75em] text-white/70">{t}</span>
                  <span className="rounded-full bg-[var(--pa)]/25 px-[0.5em] text-[0.7em] text-[var(--pa)]">4 new</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "booking":
      return (
        <div className="grid h-full grid-cols-[1.3fr_1fr] gap-[3%] bg-[#0a1210] p-[4%]">
          <div className={cn("flex flex-col rounded-[0.8em] p-[5%]", soft)}>
            <div className="flex items-center justify-between">
              <span className="text-[1em] font-semibold">Book a session</span>
              <span className="text-[0.75em] text-white/50">March</span>
            </div>
            <div className="mt-[5%] grid flex-1 grid-cols-7 gap-[4%] text-center text-[0.75em]">
              {Array.from({ length: 28 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "grid place-items-center rounded-[0.35em]",
                    i === 17
                      ? cn(grad, "font-semibold text-black")
                      : [3, 8, 12, 20, 24].includes(i)
                        ? "bg-[var(--pa)]/15 text-[var(--pa)]"
                        : "text-white/45",
                  )}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[0.6em]">
            <div className={cn("rounded-[0.8em] p-[7%]", soft)}>
              <div className="flex items-center gap-[0.5em]">
                <div className={cn("size-[2em] rounded-full", grad)} />
                <div className="flex-1 space-y-[0.3em]">
                  <Bar w="80%" />
                  <Bar w="50%" className="bg-white/10" />
                </div>
              </div>
            </div>
            {["10:00 AM", "11:30 AM", "4:00 PM"].map((t, i) => (
              <div
                key={t}
                className={cn(
                  "rounded-[0.5em] border px-[0.7em] py-[0.45em] text-[0.8em]",
                  i === 1 ? "border-[var(--pa)] text-[var(--pa)]" : "border-white/10 text-white/60",
                )}
              >
                {t}
              </div>
            ))}
            <div className="mt-auto flex items-center gap-[0.4em] rounded-[0.5em] bg-white/[0.04] px-[0.7em] py-[0.45em] text-[0.7em] text-white/60">
              <span className="rounded-[0.2em] bg-red-400/80 px-[0.3em] text-[0.85em] font-bold text-white">PDF</span> Therapy
              plan
            </div>
            <div className={cn("rounded-[0.5em] py-[0.55em] text-center text-[0.85em] font-semibold text-black", grad)}>
              Confirm
            </div>
          </div>
        </div>
      );

    case "education":
      return (
        <div className="flex h-full flex-col bg-[#120b16] p-[4%]">
          <div className="flex items-center justify-between">
            <span className="text-[1.1em] font-semibold">Good morning, Teacher</span>
            <div className="flex gap-[0.4em]">
              {["Teacher", "Parent"].map((r, i) => (
                <span
                  key={r}
                  className={cn(
                    "rounded-full px-[0.7em] py-[0.15em] text-[0.7em]",
                    i === 0 ? cn(grad, "text-black") : "bg-white/10 text-white/60",
                  )}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[4%] grid flex-1 grid-cols-3 gap-[3%]">
            {[
              ["Lesson plans", "12"],
              ["Question papers", "8"],
              ["Homework", "24"],
            ].map(([k, v], i) => (
              <div key={k} className={cn("flex flex-col justify-between rounded-[0.8em] p-[8%]", i === 0 ? grad : soft)}>
                <span className={cn("text-[0.75em]", i === 0 ? "text-black/70" : "text-white/55")}>{k}</span>
                <span className={cn("text-[2em] font-semibold", i === 0 && "text-black")}>{v}</span>
              </div>
            ))}
          </div>
          <div className={cn("mt-[3%] flex items-center gap-[0.6em] rounded-[0.8em] px-[3%] py-[2.5%]", soft)}>
            <span className={cn("grid size-[1.8em] place-items-center rounded-[0.4em] text-[0.8em] font-bold text-black", grad)}>
              AI
            </span>
            <span className="text-[0.8em] text-white/60">Generate a question paper for Class 8 Science…</span>
            <span className="ml-auto h-[1em] w-px animate-blink bg-white/70" />
          </div>
        </div>
      );

    case "tryon":
      return (
        <div className="grid h-full grid-cols-[1.2fr_1fr] gap-[4%] bg-[#140c0a] p-[4%]">
          <div className={cn("relative grid place-items-center overflow-hidden rounded-[0.8em]", soft)}>
            <div className="absolute inset-[12%] rounded-[1em] border border-dashed border-[var(--pa)]/50" />
            <div className="relative flex flex-col items-center">
              <div className={cn("h-[2.2em] w-[5.4em] rounded-t-full", grad)} />
              <div className="-mt-[0.6em] h-[5em] w-[4.4em] rounded-t-[40%] rounded-b-[45%] bg-[#e8b996]" />
              <div className="-mt-[1.6em] h-[1.8em] w-[3.6em] rounded-b-full bg-[#3b2416]/90" />
            </div>
            <span className="absolute top-[6%] left-[6%] rounded-full bg-black/50 px-[0.6em] py-[0.15em] text-[0.7em]">
              ● Live preview
            </span>
          </div>
          <div className="flex flex-col gap-[0.5em]">
            <span className="text-[1em] font-semibold">Hairstyles</span>
            <div className="grid grid-cols-3 gap-[0.4em]">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={cn("aspect-square rounded-[0.5em]", i === 1 ? cn(grad, "ring-2 ring-white/70") : soft)} />
              ))}
            </div>
            <span className="mt-[0.4em] text-[1em] font-semibold">Beard</span>
            <div className="grid grid-cols-3 gap-[0.4em]">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={cn("aspect-square rounded-[0.5em]", i === 0 ? "bg-[#3b2416] ring-2 ring-[var(--pa)]" : soft)}
                />
              ))}
            </div>
            <div className={cn("mt-auto rounded-[0.5em] py-[0.5em] text-center text-[0.8em] font-semibold text-black", grad)}>
              Try this look
            </div>
          </div>
        </div>
      );

    case "storefront":
      return (
        <div className="flex h-full flex-col bg-[#0b120a]">
          <div
            className={cn(
              "relative flex flex-1 flex-col justify-center gap-[0.5em] px-[6%]",
              "bg-[radial-gradient(circle_at_80%_50%,color-mix(in_oklab,var(--pa)_35%,transparent),transparent_60%)]",
            )}
          >
            <span className="text-[0.75em] tracking-[0.25em] text-[var(--pa)] uppercase">Pure · Fresh · Smart</span>
            <span className="text-[2.2em] leading-none font-bold">Spices &amp;</span>
            <span className="text-[2.2em] leading-none font-bold">Smart Vending</span>
            <div className="mt-[0.6em] flex gap-[0.5em]">
              <span className={cn("rounded-full px-[1em] py-[0.35em] text-[0.8em] font-semibold text-black", grad)}>
                Our products
              </span>
              <span className="rounded-full border border-white/20 px-[1em] py-[0.35em] text-[0.8em]">Franchise</span>
            </div>
            <div className="absolute top-1/2 right-[8%] h-[70%] w-[22%] -translate-y-1/2 rounded-[0.6em] border border-white/15 bg-white/5 p-[1.5%]">
              <div className="grid h-[70%] grid-cols-3 gap-[8%]">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className={cn("rounded-[0.2em]", i % 2 ? "bg-[var(--pa)]/50" : "bg-[var(--pb)]/50")} />
                ))}
              </div>
              <div className="mt-[10%] h-[15%] rounded-[0.2em] bg-black/40" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[2%] border-t border-white/5 p-[3%]">
            {["Turmeric", "Chilli", "Garam", "Cumin"].map((t) => (
              <div key={t} className={cn("rounded-[0.5em] p-[8%] text-center text-[0.75em] text-white/70", soft)}>
                {t}
              </div>
            ))}
          </div>
        </div>
      );

    case "network":
      return (
        <div className="grid h-full grid-cols-[1fr_2fr] gap-[3%] bg-[#0a0f18] p-[4%]">
          <div className={cn("flex flex-col items-center gap-[0.5em] rounded-[0.8em] p-[8%]", soft)}>
            <div className={cn("size-[3.6em] rounded-full ring-4 ring-white/10", grad)} />
            <Bar w="70%" className="bg-white/60" />
            <Bar w="50%" />
            <div className="mt-auto grid w-full grid-cols-2 gap-[0.3em] text-center">
              <div>
                <p className="text-[1.1em] font-semibold">512</p>
                <p className="text-[0.65em] text-white/45">Connections</p>
              </div>
              <div>
                <p className="text-[1.1em] font-semibold">38</p>
                <p className="text-[0.65em] text-white/45">Posts</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[3%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("flex flex-1 items-center gap-[0.7em] rounded-[0.8em] px-[4%]", soft)}>
                <div className={cn("size-[2.2em] shrink-0 rounded-full", i === 0 ? grad : "bg-white/15")} />
                <div className="flex-1 space-y-[0.35em]">
                  <Bar w={["60%", "45%", "70%"][i]} className="bg-white/50" />
                  <Bar w={["85%", "70%", "55%"][i]} />
                </div>
                <span
                  className={cn(
                    "rounded-full px-[0.8em] py-[0.25em] text-[0.7em]",
                    i === 0 ? cn(grad, "text-white") : "border border-white/20 text-white/70",
                  )}
                >
                  Connect
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "clinic":
      return (
        <div className="grid h-full grid-cols-[1.3fr_1fr] bg-[#08131a]">
          <div className="flex flex-col justify-center gap-[0.5em] px-[7%]">
            <span className="text-[0.75em] tracking-[0.2em] text-[var(--pa)] uppercase">Dental Care · Pitampura</span>
            <span className="text-[2em] leading-[1.05] font-bold">Healthy smiles start here.</span>
            <Bar w="85%" className="mt-[0.4em]" />
            <Bar w="65%" />
            <div className="mt-[0.8em] flex gap-[0.5em]">
              <span className={cn("rounded-full px-[1em] py-[0.4em] text-[0.8em] font-semibold text-black", grad)}>
                Book appointment
              </span>
              <span className="rounded-full border border-white/20 px-[1em] py-[0.4em] text-[0.8em]">Treatments</span>
            </div>
            <div className="mt-[0.8em] flex items-center gap-[0.4em] text-[0.75em] text-white/60">
              <span className="text-[var(--pa)]">★★★★★</span> Patient testimonials
            </div>
          </div>
          <div className="relative grid place-items-center">
            <div className={cn("absolute size-[70%] rounded-full opacity-30 blur-2xl", grad)} />
            <svg viewBox="0 0 64 64" className="relative w-[48%] drop-shadow-[0_0_25px_var(--pa)]">
              <path
                d="M32 10c-6-5-17-5-21 3-4 9 1 17 4 25 2 6 2 16 7 16 4 0 4-10 10-10s6 10 10 10c5 0 5-10 7-16 3-8 8-16 4-25-4-8-15-8-21-3Z"
                fill="white"
                fillOpacity=".92"
              />
            </svg>
          </div>
        </div>
      );

    case "film":
      return (
        <div className="relative flex h-full flex-col justify-end overflow-hidden bg-[#0d0612] p-[5%]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklab,var(--pa)_45%,transparent),transparent_55%),radial-gradient(ellipse_at_80%_80%,color-mix(in_oklab,var(--pb)_50%,transparent),transparent_55%)]" />
          <div className="absolute inset-x-0 top-0 flex justify-between px-[2%] py-[1.2%] opacity-40">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className="h-[0.7em] w-[1.2em] rounded-[0.15em] bg-white/70" />
            ))}
          </div>
          <div className="relative">
            <span className="text-[0.75em] tracking-[0.3em] text-white/60 uppercase">Independent film studio</span>
            <p className="mt-[0.3em] font-serif text-[2.6em] leading-none italic">Electric</p>
            <p className="font-serif text-[2.6em] leading-none italic">Marshmallow</p>
            <div className="mt-[0.8em] flex gap-[0.5em]">
              <span className="flex items-center gap-[0.4em] rounded-full bg-white px-[1em] py-[0.35em] text-[0.8em] font-semibold text-black">
                ▶ Watch reel
              </span>
              <span className="rounded-full border border-white/30 px-[1em] py-[0.35em] text-[0.8em]">Productions</span>
            </div>
          </div>
        </div>
      );
  }
}
