import React, { useEffect, useState } from "react";

export default function LoadingStatus({
  pillar = "TRAIN",
  name = "Athlete",
  week = 1,
  color = "#D4AF37",
  navy = "#F8FAFC",
  slate = "#CBD5E1",
  border = "#334155"
}) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);

    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginTop: "24px", marginBottom: "8px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "800",
            color,
            letterSpacing: "2px"
          }}
        >
          GENERATING{dots}
        </span>
      </div>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "800",
          color: navy,
          marginBottom: "6px"
        }}
      >
        Building Your {pillar} Blueprint
      </div>

      <div
        style={{
          fontSize: "14px",
          color: slate,
          marginBottom: "24px"
        }}
      >
        Personalizing for {name} — Week {week}
      </div>

      <div
        style={{
          width: "200px",
          height: "3px",
          background: border,
          borderRadius: "2px",
          margin: "0 auto",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            height: "100%",
            background: color,
            borderRadius: "2px",
            animation: "pllLoad 2s ease-in-out infinite"
          }}
        />
      </div>

      <style>
        {`@keyframes pllLoad{0%{width:0%}50%{width:80%}100%{width:100%}}`}
      </style>
    </div>
  );
}
