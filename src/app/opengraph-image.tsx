import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const alt = "Umair Tahir, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview card shown when the site link is shared on LinkedIn, WhatsApp and similar. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fb923c",
              color: "#0b0b0c",
              borderRadius: 16,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            UT
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa" }}>{profile.stackLine}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#fb923c" }}>{profile.role}</div>
          <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 900, lineHeight: 1.35 }}>
            Role-based web platforms with React, Next.js, Node.js and MongoDB.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#8a8a94" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
