import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SerFP — Tu referencia para estudiar FP en España";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}
      >
        {/* Blue accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#1d4ed8",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "72px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: "#1d4ed8",
              color: "white",
              borderRadius: "8px",
              padding: "4px 10px",
              fontSize: "28px",
              fontWeight: 900,
            }}
          >
            ser
          </div>
          <span style={{ color: "#1d4ed8", fontSize: "32px", fontWeight: 900 }}>
            FP
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "18px",
            color: "#3b82f6",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          La comunidad FP que habla claro
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#0f172a",
            lineHeight: 1.1,
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          Decide tu FP con información real, no con humo
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#64748b",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Testimonios reales · Comparativas de ciclos · Salidas profesionales
        </div>
      </div>
    ),
    { ...size }
  );
}
