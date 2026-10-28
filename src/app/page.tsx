import Link from "next/link";
import { ProfileGate } from "@/components/netflix/profile-gate";
import { profiles, siteConfig } from "@/data/portfolio";

export default function HomePage() {
  return (
    <>
      {/* Crawlable summary — the gate itself is an animated client experience. */}
      <div className="sr-only">
        <p>
          {siteConfig.name} — {siteConfig.title}. {siteConfig.description}
        </p>
        <nav aria-label="Browse the portfolio">
          {profiles.map((p) => (
            <Link key={p.id} href={`/browse/${p.id}`}>
              Browse as {p.name}
            </Link>
          ))}
        </nav>
      </div>
      <ProfileGate />
    </>
  );
}
