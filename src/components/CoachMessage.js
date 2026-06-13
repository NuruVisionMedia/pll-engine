import React from "react";

export default function CoachMessage({
  pillar,
  name,
  message
}) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "12px",
        marginBottom: "24px",
        background: "rgba(47,128,237,0.08)",
        border: "1px solid rgba(47,128,237,0.15)"
      }}
    >
      <strong>
        Coach {name || "Prime"}
      </strong>

      <div style={{ marginTop: "8px" }}>
        {message}
      </div>
    </div>
  );
}
