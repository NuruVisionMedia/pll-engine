import React from "react";

export default function SectionLabel({ text, color }) {
  return (
    <div
      style={{
        color,
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "2px",
        marginBottom: "12px"
      }}
    >
      {text}
    </div>
  );
}
