import React from "react";

export default function CoachAvatar({ pillar }) {
  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        overflow: "hidden",
        margin: "0 auto 16px",
        border: "3px solid #2F80ED"
      }}
    >
      <img
        src="/coach.jpg"
        alt="Coach"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
}
