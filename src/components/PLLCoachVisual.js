import React, { useState } from "react";

const COACH_MODES = {
  idle: {
    label: "COACH READY",
    title: "PLL COACH",
    subtitle: "The Performance Architect",
    button: "PLAY COACH"
  },
  didYouKnow: {
    label: "DID YOU KNOW",
    title: "PLL KNOWLEDGE DROP",
    subtitle: "Performance education in motion",
    button: "PLAY LESSON"
  },
  demo: {
    label: "COACH DEMO",
    title: "MOVEMENT BREAKDOWN",
    subtitle: "Watch the form. Learn the standard.",
    button: "PLAY DEMO"
  },
  victory: {
    label: "BLUEPRINT COMPLETE",
    title: "WORK COMPLETE",
    subtitle: "Now execute the plan.",
    button: "PLAY MESSAGE"
  }
};

export default function PLLCoachVisual({
  gender = "Male",
  mode = "idle",
  size = 180,
  showControls = true
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isFemale = gender === "Female";
  const coachMode = COACH_MODES[mode] || COACH_MODES.idle;

  const coachImage = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female.png`
    : `${process.env.PUBLIC_URL}/coach-male.png`;

  const fallbackImage = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female.jpg`
    : `${process.env.PUBLIC_URL}/coach-male.jpg`;

  const coachVideo = isFemale
    ? `${process.env.PUBLIC_URL}/coach-female-${mode}.mp4`
    : `${process.env.PUBLIC_URL}/coach-male-${mode}.mp4`;

  const accent = isFemale ? "#9B5CFF" : "#D4AF37";

  return (
    <div
      style={{
        width: size,
        maxWidth: "100%",
        borderRadius: "22px",
        overflow: "hidden",
        background: "#050816",
        border: `1px solid ${accent}66`,
        boxShadow: `0 0 34px ${accent}33`
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
              objectPosition: "50% 16%",
              display: "block"
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "5px 9px",
            borderRadius: "999px",
            background: "rgba(5,8,22,0.72)",
            border: `1px solid ${accent}66`,
            color: accent,
            fontSize: "9px",
            fontWeight: "900",
            letterSpacing: "1.4px"
          }}
        >
          {coachMode.label}
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "18px 14px",
            background:
              "linear-gradient(180deg, rgba(5,8,22,0), rgba(5,8,22,0.96))"
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "2px",
              color: accent,
              marginBottom: "5px"
            }}
          >
            {coachMode.title}
          </div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              color: "#F8FAFC",
              lineHeight: "1.3"
            }}
          >
            {coachMode.subtitle}
          </div>
        </div>
      </div>

      {showControls && (
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          style={{
            width: "100%",
            padding: "11px 12px",
            border: "none",
            background: `${accent}22`,
            color: accent,
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1.5px",
            cursor: "pointer"
          }}
        >
          {isPlaying ? "PAUSE COACH" : coachMode.button}
        </button>
      )}
    </div>
  );
}
