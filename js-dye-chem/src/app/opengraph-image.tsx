import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "JS Dye Chem — Textile Chemicals & Digital Printing Inks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "#06090d",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: "50%",
            width: 760,
            height: 520,
            transform: "translateX(-50%)",
            borderRadius: 999,
            background: "rgba(34,211,238,0.16)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: 999,
            background: "rgba(245,158,11,0.12)",
            filter: "blur(90px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(34,211,238,0.18)",
              border: "2px solid rgba(34,211,238,0.5)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8">
              <path d="M12 2.5c3.6 4.4 6 7.6 6 10.6a6 6 0 1 1-12 0c0-3 2.4-6.2 6-10.6Z" strokeLinejoin="round" />
              <path d="M12 9.5v6.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#e7edf3", letterSpacing: 1 }}>
              JS DYE CHEM
            </div>
            <div style={{ fontSize: 20, color: "#94a8b8", marginTop: 4, letterSpacing: 3, textTransform: "uppercase" }}>
              Textile Chemicals &amp; Printing Inks
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 64,
            fontWeight: 700,
            color: "#e7edf3",
            lineHeight: 1.12,
            maxWidth: 900,
            letterSpacing: -1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          Precision chemistry for the{" "}
          <span style={{ color: "#22d3ee" }}>textile industry</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#94a8b8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          Specialised chemicals · Digital inks · Softners · Bonding agents · Enzymes
        </div>
        <div style={{ position: "absolute", bottom: 56, left: 80, fontSize: 22, color: "#25d366", fontWeight: 600 }}>
          WhatsApp +91 97129 22210 · Kadodara, Surat, Gujarat
        </div>
      </div>
    ),
    { ...size }
  );
}
