import { Mail } from "lucide-react";
import { navLinks, profiles, siteConfig } from "@/data/portfolio";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";

const socials = [
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function Footer() {
  const columns = [
    navLinks.map((l) => ({ href: `/browse/recruiter#${l.id}`, label: l.label })),
    profiles.map((p) => ({ href: `/browse/${p.id}`, label: `Browse as ${p.name}` })),
    socials.map((s) => ({ href: s.href, label: s.label })),
    [
      { href: `mailto:${siteConfig.email}`, label: "Email" },
      { href: "/", label: "Switch profiles" },
    ],
  ];

  return (
    <footer className="mx-auto mt-16 max-w-[980px] px-gutter pb-10 text-[13px] text-[#808080]">
      <div className="flex items-center gap-5 text-white">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="transition-opacity hover:opacity-70"
          >
            <Icon className="size-6" />
          </a>
        ))}
        <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="transition-opacity hover:opacity-70">
          <Mail className="size-6" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        {columns.map((links, i) => (
          <ul key={i} className="space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <p className="mt-8 inline-block border border-[#808080] px-2 py-1">{siteConfig.location}</p>
      <p className="mt-5 text-[11px]">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.title}
      </p>
    </footer>
  );
}
