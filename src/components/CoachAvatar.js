import React from "react";

export default function CoachAvatar({
  image = "/coach.jpg",
  title = "PLL Coach",
  subtitle = "Mentor • Strategist • Commander",
  phase = 1,
  size = 92
}) {
  const scale =
    phase === 1 ? 1 :
    phase === 2 ? 1.08 :
    1.16;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 10px",
          border: "3px solid #2F80ED",
          transform: `scale(${scale})`,
          transition: "all 0.6s ease",
          boxShadow: "0 10px 28px rgba(47,128,237,0.28)"
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>

      <div style={{ fontWeight: 900, fontSize: 13, color: "#0F1C2E" }}>
        {title}
      </div>

      <div style={{ fontSize: 10, color: "#6B7280", letterSpacing: "1.2px", textTransform: "uppercase" }}>
        {subtitle}
      </div>
    </div>
  );
}
