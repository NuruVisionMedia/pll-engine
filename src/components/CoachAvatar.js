import React from "react";

export default function CoachAvatar({
  phase = 1,
  size = 80
}) {

  const scale =
    phase === 1 ? 1 :
    phase === 2 ? 1.08 :
    1.16;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        margin: "0 auto 16px",
        border: "3px solid #2F80ED",
        transform: `scale(${scale})`,
        transition: "all 0.6s ease"
      }}
    >
      <img
        src="/coach.jpg"
        alt="PLL Coach"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
}
