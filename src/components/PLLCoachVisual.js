import React, { useState } from "react";

export default function PLLCoachVisual({
  gender = "Male",
  mode = "idle",
  size = 140,
  title = "PLL COACH",
  subtitle = "The Performance Architect",
  showControls = true
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isFemale = gender === "Female";

  const coachImage = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female.png`
    : `${process.env.PUBLIC_URL}/coach-male.png`;

  const fallbackImage = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female.jpg`
    : `${process.env.PUBLIC_URL}/coach-male.jpg`;

  const coachVideo = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female-idle.mp4`
    : `${process.env.PUBLIC_URL}/coach-male-idle.mp4`;

  const accent = isFemale ? "#9B5CFF" : "#2F80ED";

  return (
    <div
      style={{
        width: size,
        maxWidth: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#101827",
        border: `1px solid ${accent}55`,
        boxShadow: `0 0 28px ${accent}33`
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "9 / 12",
          background: "#050816"
        }}
      >
        {isPlaying ? (
          <video
            src={coachVideo}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setIsPlaying(false)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block"
            }}
          />
        ) : (
          <img
            src={coachImage}
            alt="PLL Coach"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 18%",
              display: "block"
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "14px 12px",
            background:
              "linear-gradient(180deg, rgba(5,8,22,0), rgba(5,8,22,0.92))"
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "2px",
              color: accent,
              marginBottom: "4px"
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#F8FAFC",
              lineHeight: "1.25"
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {showControls && (
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "none",
            background: `${accent}22`,
            color: accent,
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1.5px",
            cursor: "pointer"
          }}
        >
          {isPlaying ? "PAUSE COACH" : "PLAY COACH"}
        </button>
      )}
    </div>
  );
}
