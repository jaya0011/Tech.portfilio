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
        background: "#06060a",
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(143,114,255,0.45), transparent 45%), radial-gradient(circle at 90% 90%, rgba(34,211,238,0.35), transparent 45%)",
        color: "#ececf3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a0a0b4" }}>
        <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: "#10b981" }} />
        Available for freelance projects
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{siteConfig.name}</div>
        <div
          style={{
            fontSize: 48,
            marginTop: 20,
            backgroundImage: "linear-gradient(90deg, #8f72ff, #f472b6, #22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.title}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a0a0b4" }}>
        <span>Next.js · NestJS · React Native · PostgreSQL · WordPress</span>
        <span>{siteConfig.location.split(",")[0]}, India</span>
      </div>
    </div>,
    size,
  );
}
