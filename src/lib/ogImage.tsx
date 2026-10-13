import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Shared branded share-card renderer used by both the Open Graph and Twitter
 * image route handlers. Kept in a plain module so each route file can export
 * its own segment config (Next.js forbids re-exporting `runtime`).
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a0a0b",
          color: "#ecebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6f6e6a",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#d9a441",
            }}
          />
          {site.disciplines.join("  ·  ")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#ecebe8",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#a3a29d",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#6f6e6a",
          }}
        >
          <div>{`${site.location} · Remote`}</div>
          <div style={{ color: "#d9a441" }}>{site.email}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
