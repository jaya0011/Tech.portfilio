import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#141414",
        backgroundImage:
          "radial-gradient(ellipse at 85% 20%, rgba(229,9,20,0.45), transparent 55%), linear-gradient(77deg, #000 10%, transparent 80%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, letterSpacing: 10, color: "#e5e5e5" }}>
        <span style={{ color: "#e50914", fontSize: 56, fontWeight: 900, letterSpacing: 0 }}>J</span>
        PORTFOLIO
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: -2, lineHeight: 1, textTransform: "uppercase" }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24, fontSize: 36, fontWeight: 700 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#e50914",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: 2 }}>TOP</span>
            <span style={{ fontSize: 26 }}>10</span>
          </div>
          {siteConfig.title}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b3b3b3" }}>
        <span style={{ display: "flex" }}>
          <span style={{ color: "#46d369", fontWeight: 700, marginRight: 14 }}>98% Match</span>
          Next.js · NestJS · React Native · PostgreSQL · WordPress
        </span>
        <span>{siteConfig.location.split(",")[0]}, India</span>
      </div>
    </div>,
    size,
  );
}
