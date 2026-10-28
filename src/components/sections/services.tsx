import { Check, Code2, Plug, ShoppingCart, Smartphone, Wrench, Blocks, type LucideIcon } from "lucide-react";
import { services, type Service } from "@/data/portfolio";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading, accent } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const icons: Record<Service["icon"], LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  ecommerce: ShoppingCart,
  wordpress: Blocks,
  api: Plug,
  maintenance: Wrench,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Services"
          title={[{ text: "What I can" }, { text: "build", className: accent }, { text: "for you." }]}
          description="Whether you're a startup validating an idea or a business ready to scale, I deliver complete, production-ready solutions — not just code."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <StaggerItem key={s.title}>
                <SpotlightCard as="article" className="group flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-fg text-bg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm">
                        <Check className="size-4 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
