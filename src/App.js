import React, { useState, useEffect } from "react";

// --- COLORS ---
const B = "#00C2FF", O = "#FF6B2B", P = "#A855F7", G = "#00FF88", BG = "#F8F9FA", CD = "#1A1A2E", BR = "#E2E8F0";
const TEXT_PRIMARY = "#0F172A", TEXT_SECONDARY = "#475569", TEXT_LIGHT = "#94A3B8";
const CARD_BG = "#FFFFFF", SIDEBAR_BG = "#F1F5F9", ACCENT = "#0EA5E9";

// --- STORAGE ---
const Store = {
save: (key, val) => { try { localStorage.setItem("pll_"+key, JSON.stringify(val)); } catch(e){} },
load: (key) => { try { const v=localStorage.getItem("pll_"+key); return v?JSON.parse(v):null; } catch(e){ return null; } },
del: (key) => { try { localStorage.removeItem("pll_"+key); } catch(e){} }
};

// --- WEEK CONFIG ---
const WEEKS = {
1: {
 label: "WEEK 1 — THE NEW SYSTEM",
 theme: "Foundation. New habits. New identity begins.",
 mantra: "Every champion was once a beginner who refused to quit. This is Day 1 of the rest of your life.",
 coachOpen: (name) => `${name}, welcome to Phase 1. This week is about one thing — building the system. Don't focus on perfection. Focus on showing up. Let's go.`,
 coachClose: (name) => `${name}, Week 1 is DONE. You showed up every single day. That's what separates the ones who make it. Rest up — Week 2 is where we turn the heat up.`,
 intensity: "Foundation", repRange: "12-15 reps", sets: "3 sets", load: "Light to moderate — focus on form"
},
2: {
 label: "WEEK 2 — THE PROGRESSION",
 theme: "Intensity increases. Habits solidify. Halfway there.",
 mantra: "You've already done what most people won't. Now let's do what most people can't.",
 coachOpen: (name) => `${name}, you made it to Week 2. That already puts you ahead of 80% of people who start. This week we push harder — more weight, more intensity. Show up.`,
 coachClose: (name) => `${name}, TWO WEEKS DOWN. Halfway through Phase 1 and you're already not the same person who started. One more week. The final push. The Separation.`,
 intensity: "Progressive", repRange: "8-12 reps", sets: "4 sets", load: "Increase weight 10-15% from Week 1"
},
3: {
 label: "WEEK 3 — THE SEPARATION",
 theme: "This is where champions are made. Most quit. You won't.",
 mantra: "Week 3 is where your identity changes forever. You are no longer who you were.",
 coachOpen: (name) => `${name}, this is THE week. The separation happens right here. Everyone starts. Almost nobody finishes. You're going to finish. Let's make history.`,
 coachClose: (name) => `${name}, PHASE 1 COMPLETE. You did what most people only talk about. You are Prime Level now. Phase 2 is waiting — are you ready to go elite?`,
 intensity: "Peak", repRange: "6-10 reps", sets: "4-5 sets", load: "Maximum sustainable load"
}
};

// --- EXERCISE VIDEO MAP ---
const EXERCISE_VIDEOS = {
"goblet squat": "https://www.youtube.com/embed/MeIiIdhvXT4",
"squat": "https://www.youtube.com/embed/ultWZbUMPL8",
"leg press": "https://www.youtube.com/embed/IZxyjW7MPJQ",
"walking lunge": "https://www.youtube.com/embed/L8fvypPrzzs",
"lunge": "https://www.youtube.com/embed/QOVaHwm-Q6U",
"rdl": "https://www.youtube.com/embed/JCXUYuzwNrM",
"romanian deadlift": "https://www.youtube.com/embed/JCXUYuzwNrM",
"deadlift": "https://www.youtube.com/embed/op9kVnSso6Q",
"leg curl": "https://www.youtube.com/embed/1Tq3QdYUuHs",
"hamstring curl": "https://www.youtube.com/embed/1Tq3QdYUuHs",
"calf raise": "https://www.youtube.com/embed/-M4-G8p1fCI",
"hip thrust": "https://www.youtube.com/embed/SEdqd1n0cvg",
"glute bridge": "https://www.youtube.com/embed/OUgsJ8-Vi0E",
"step up": "https://www.youtube.com/embed/dQqApCGd5Ss",
"bulgarian split squat": "https://www.youtube.com/embed/2C-uNgKwPLE",
"bench press": "https://www.youtube.com/embed/rT7DgCr-3pg",
"push up": "https://www.youtube.com/embed/IODxDxX7oi4",
"overhead press": "https://www.youtube.com/embed/2yjwXTZQDDI",
"shoulder press": "https://www.youtube.com/embed/qEwKCR5JCog",
"lateral raise": "https://www.youtube.com/embed/3VcKaXpzqRo",
"tricep": "https://www.youtube.com/embed/2-LAMcpzODU",
"chest fly": "https://www.youtube.com/embed/eozdVDA78K0",
"dip": "https://www.youtube.com/embed/2z8JmcrW-As",
"pull up": "https://www.youtube.com/embed/eGo4IYlbE5g",
"chin up": "https://www.youtube.com/embed/eGo4IYlbE5g",
"row": "https://www.youtube.com/embed/roCP6wCXPqo",
"lat pulldown": "https://www.youtube.com/embed/CAwf7n6Luuc",
"bicep curl": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
"curl": "https://www.youtube.com/embed/ykJmrZ5v0Oo",
"face pull": "https://www.youtube.com/embed/rep-qVOkqgk",
"plank": "https://www.youtube.com/embed/ASdvN_XEl_c",
"crunch": "https://www.youtube.com/embed/Xyd_fa5zoEU",
"ab": "https://www.youtube.com/embed/AnYl6Nk9GOA",
"mountain climber": "https://www.youtube.com/embed/nmwgirgXLYM",
"russian twist": "https://www.youtube.com/embed/wkD8rjkodUI",
"leg raise": "https://www.youtube.com/embed/l4kQd9eWclE",
"burpee": "https://www.youtube.com/embed/dZgVxmf6jkA",
"kettlebell swing": "https://www.youtube.com/embed/YSxHifyI6s8",
"box jump": "https://www.youtube.com/embed/52r_Ul5k03g",
"jumping jack": "https://www.youtube.com/embed/iSSAk4XCsRA",
};

function getExerciseVideo(exerciseName) {
if (!exerciseName) return null;
const lower = exerciseName.toLowerCase();
for (const [key, url] of Object.entries(EXERCISE_VIDEOS)) {
 if (lower.includes(key)) return url;
}
return null;
}

// --- PILLARS CONFIG ---
const PILLARS = {
TRAIN: {
color: B, icon: "⚡", label: "TRAIN",
subtitle: "WORKOUT BLUEPRINT GENERATOR",
prompt: (answers, name, week, gender, ageRange) => {
  const w = WEEKS[week];
  const ageNote = ageRange === "18-24" ? "Foundation building phase. High volume is appropriate. Prioritize motor pattern development." :
    ageRange === "25-34" ? "Peak performance window. Push intensity while building sustainable long-term habits." :
    ageRange === "35-44" ? "Prioritize joint health and warm-ups. Progressive overload with smart recovery." :
    ageRange === "45-54" ? "Hormone-supportive training. Manage fatigue carefully. Emphasize compound movements." :
    ageRange === "55-64" ? "Focus on functional strength, balance, and bone density. Lower impact alternatives where needed." :
    ageRange === "65+" ? "Safety first. Prioritize mobility, balance, and maintaining muscle mass. Full recovery between sessions." : "";
  const genderNote = gender === "Female" ? "Tailor to female physiology: consider hormonal cycle, bone health, and joint laxity factors." :
    gender === "Male" ? "Tailor to male physiology: testosterone-supportive training intensity and recovery strategies." : "";
  return `You are an elite fitness coach for Prime Level Living. Generate a complete Week ${week} TRAIN blueprint for ${name}.

User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.goal||"Build Muscle"}, Training Days=${answers.days||"4"} days/week, Equipment=${answers.equipment||"Full Gym"}, Experience=${answers.experience||"Intermediate"}, Focus=${answers.focus||"Full Body"}

Week Theme: ${w.theme}
Intensity: ${w.intensity}, Sets: ${w.sets}, Reps: ${w.repRange}, Load: ${w.load}
${ageNote ? `Age-Specific Note: ${ageNote}` : ""}
${genderNote ? `Gender-Specific Note: ${genderNote}` : ""}

Return ONLY valid JSON in this exact format:
{
"title": "Week ${week} Training Title",
"subtitle": "Brief description",
"coachMessage": "Personalized motivational message from coach to ${name} for week ${week}",
"days": [
{
  "day": 1,
  "title": "Day Title",
  "duration": "45 min",
  "sets": "3 sets",
  "reps": "12-15 reps",
  "exercises": [
    {
      "name": "Exercise Name",
      "sets": "3",
      "reps": "12-15",
      "tempo": "2-1-2",
      "rest": "60s",
      "formCue": "Key form tip",
      "muscle": "Target muscle"
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}
]
}`
}
},
FUEL: {
color: O, icon: "🔥", label: "FUEL",
subtitle: "SUPPLEMENT & NUTRITION STACK",
prompt: (answers, name, week, gender, ageRange) => {
  const w = WEEKS[week];
  const ageNote = ageRange === "18-24" ? "Higher caloric needs. Prioritize protein synthesis and muscle building nutrition." :
    ageRange === "25-34" ? "Performance nutrition focus. Optimize macros for body composition and energy." :
    ageRange === "35-44" ? "Anti-inflammatory foods and hormone-balancing nutrients. Support metabolism." :
    ageRange === "45-54" ? "Hormone-supportive nutrition. Manage cortisol. Zinc and magnesium emphasis." :
    ageRange === "55-64" ? "Micronutrient density. Bone health support (calcium, D3). Protein to prevent muscle loss." :
    ageRange === "65+" ? "Digestive-friendly foods. Maximum micronutrient focus. Lean protein every meal." : "";
  const genderNote = gender === "Female" ? "Consider iron, folate, calcium needs. Hormonal cycle nutrition awareness where relevant." :
    gender === "Male" ? "Zinc, magnesium, healthy fats for testosterone support. High protein prioritization." : "";
  return `You are an elite nutrition coach for Prime Level Living. Generate a complete Week ${week} FUEL blueprint for ${name}.

User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.goal||"Build Muscle"}, Diet=${answers.diet||"Flexible"}, Supplements=${answers.supplements||"Open to all"}, Budget=${answers.budget||"Moderate"}

Week Theme: ${w.theme}
${ageNote ? `Age-Specific Note: ${ageNote}` : ""}
${genderNote ? `Gender-Specific Note: ${genderNote}` : ""}

Return ONLY valid JSON in this exact format:
{
"title": "Week ${week} Fuel Stack Title",
"subtitle": "Brief description",
"coachMessage": "Personalized nutrition message from coach to ${name} for week ${week}",
"supplements": [
{
  "name": "Supplement Name",
  "category": "Category",
  "dose": "Amount",
  "timing": "When to take",
  "benefit": "Why it works",
  "priority": "Essential/Recommended/Optional"
}
],
"nutrition": {
"calories": "Target calories",
"protein": "Protein target",
"carbs": "Carbs target",
"fats": "Fats target",
"mealTiming": "Meal timing strategy"
},
"mealPlan": [
{
  "meal": "Meal name",
  "timing": "When",
  "foods": ["Food 1", "Food 2"],
  "macros": "Approximate macros"
}
]
}`
}
},
FOCUS: {
color: P, icon: "🧠", label: "FOCUS",
subtitle: "MINDSET & MENTAL PERFORMANCE",
prompt: (answers, name, week, gender, ageRange) => {
  const w = WEEKS[week];
  const ageNote = ageRange === "18-24" ? "High neuroplasticity window. Build strong mental habits and sleep discipline now — they compound for decades." :
    ageRange === "25-34" ? "Stress resilience and peak output focus. Build systems that perform under pressure." :
    ageRange === "35-44" ? "Stress management is as important as performance. Recovery mindset and work-life integration." :
    ageRange === "45-54" ? "Cognitive clarity and emotional regulation. Purpose-driven motivation practices." :
    ageRange === "55-64" ? "Cognitive longevity practices. Gratitude, meaning, and social connection matter deeply." :
    ageRange === "65+" ? "Joy-based motivation. Legacy mindset. Daily practices that energize rather than drain." : "";
  const genderNote = gender === "Female" ? "Acknowledge hormonal influences on mood and motivation cycles. Self-compassion practices." :
    gender === "Male" ? "Identity and purpose-driven motivation. Brotherhood and accountability frameworks." : "";
  return `You are an elite mindset coach for Prime Level Living. Generate a complete Week ${week} FOCUS blueprint for ${name}.

User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.mindsetGoal||"Build discipline"}, Challenges=${answers.challenges||"Consistency"}, Morning routine=${answers.morning||"None yet"}, Stress level=${answers.stress||"Moderate"}

Week Theme: ${w.theme}
Mantra: ${w.mantra}
${ageNote ? `Age-Specific Note: ${ageNote}` : ""}
${genderNote ? `Gender-Specific Note: ${genderNote}` : ""}

Return ONLY valid JSON in this exact format:
{
"title": "Week ${week} Mental Performance Title",
"subtitle": "Brief description",
"coachMessage": "Personalized mindset message from coach to ${name} for week ${week}",
"dailyPractices": [
{
  "name": "Practice Name",
  "duration": "X minutes",
  "timing": "Morning/Evening/Anytime",
  "description": "How to do it",
  "benefit": "Why it works"
}
],
"weeklyChallenge": {
"title": "Challenge Title",
"description": "Full description",
"dailyActions": ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5"]
},
"affirmations": ["Affirmation 1", "Affirmation 2", "Affirmation 3", "Affirmation 4", "Affirmation 5"],
"journalPrompts": [
{
  "day": 1,
  "prompt": "Journal question for day 1"
}
],
"sleepProtocol": {
"bedtime": "Target bedtime",
"wakeTime": "Target wake time",
"practices": ["Practice 1", "Practice 2"]
}
}`
}
}
};

// --- INTAKE QUESTIONS ---
const INTAKE = {
TRAIN: [
{ id: "goal", label: "PRIMARY GOAL", options: ["Build Muscle", "Lose Fat", "Athletic Performance", "Aesthetic Frame"] },
{ id: "days", label: "TRAINING DAYS / WEEK", options: ["3 Days", "4 Days", "5 Days", "6 Days"] },
{ id: "equipment", label: "EQUIPMENT ACCESS", options: ["Full Gym", "Home + Dumbbells", "Bodyweight Only"] },
{ id: "experience", label: "EXPERIENCE LEVEL", options: ["Beginner", "Intermediate", "Advanced"] },
{ id: "focus", label: "FOCUS AREA", options: ["Upper Body", "Lower Body", "Full Body", "Core + Functional"] }
],
FUEL: [
{ id: "goal", label: "NUTRITION GOAL", options: ["Build Muscle", "Lose Fat", "Maintain & Perform", "Body Recomposition"] },
{ id: "diet", label: "DIETARY PREFERENCE", options: ["Flexible/No restrictions", "High Protein", "Plant-Based", "Low Carb"] },
{ id: "supplements", label: "SUPPLEMENT EXPERIENCE", options: ["New to supplements", "Some experience", "Advanced user"] },
{ id: "budget", label: "SUPPLEMENT BUDGET", options: ["Minimal ($0-30/mo)", "Moderate ($30-75/mo)", "Premium ($75+/mo)"] }
],
FOCUS: [
{ id: "mindsetGoal", label: "MINDSET GOAL", options: ["Build discipline", "Reduce stress", "Increase confidence", "Sharpen focus"] },
{ id: "challenges", label: "BIGGEST CHALLENGE", options: ["Staying consistent", "Negative self-talk", "Lack of motivation", "Anxiety/stress"] },
{ id: "morning", label: "CURRENT MORNING ROUTINE", options: ["None yet", "Basic routine", "Solid routine", "Elite routine"] },
{ id: "stress", label: "CURRENT STRESS LEVEL", options: ["Low", "Moderate", "High", "Very High"] }
]
};

// --- STORE BRIDGE ---
const STORE_URL = "https://zs0r6d-2x.myshopify.com";
const STORE_COLLECTIONS = {
 TRAIN: {
   handle: "train", color: B, icon: "🏋️",
   headline: (name, week) => `${name}, your Week ${week} TRAIN stack is ready.`,
   subline: "The right gear and supplements matched to your training profile — delivered.",
   cta: "Get Your TRAIN Stack →",
 },
 FUEL: {
   handle: "fuel", color: O, icon: "⚡",
   headline: (name, week) => `${name}, your Week ${week} FUEL stack is ready.`,
   subline: "Supplements and nutrition tools matched to your goals — ready to order.",
   cta: "Get Your FUEL Stack →",
 },
 FOCUS: {
   handle: "focus", color: P, icon: "🧠",
   headline: (name, week) => `${name}, your Week ${week} FOCUS stack is ready.`,
   subline: "Mindset tools and recovery products dialed to your program — shop now.",
   cta: "Get Your FOCUS Stack →",
 },
};

function StoreBridge({ pillar, pillarStates, profile, week, dismissed, onDismiss }) {
 const [clicked, setClicked] = useState(false);
 const activeState = pillarStates?.[pillar];
 if (!activeState || activeState.phase !== "result") return null;
 if (dismissed?.[pillar]) return null;
 const config = STORE_COLLECTIONS[pillar];
 if (!config) return null;
 const name = profile?.firstName || profile?.username || "Athlete";
 const shopUrl = `${STORE_URL}/collections/${config.handle}?utm_source=pll-engine&utm_medium=blueprint&utm_campaign=week${week}-${pillar.toLowerCase()}&utm_content=storebridge`;
 const handleShopClick = () => {
   setClicked(true);
   const events = JSON.parse(localStorage.getItem("pll_bridge_clicks") || "[]");
   events.push({ pillar, week, timestamp: new Date().toISOString(), url: shopUrl });
   localStorage.setItem("pll_bridge_clicks", JSON.stringify(events));
   window.open(shopUrl, "_blank");
 };
 return (
   <div style={{
     margin: "24px 0 8px 0", borderRadius: "16px",
     background: `linear-gradient(135deg, ${config.color}18 0%, ${config.color}08 100%)`,
     border: `1.5px solid ${config.color}40`, padding: "20px",
     position: "relative", boxShadow: `0 4px 24px ${config.color}15`,
   }}>
     <button onClick={() => onDismiss(pillar)} style={{
       position: "absolute", top: "12px", right: "14px", background: "none",
       border: "none", cursor: "pointer", color: "#94A3B8", fontSize: "18px",
       lineHeight: 1, padding: "2px 6px",
     }}>×</button>
     <div style={{
       display: "inline-flex", alignItems: "center", gap: "6px",
       background: config.color, color: "#fff", fontSize: "10px", fontWeight: "800",
       letterSpacing: "0.12em", padding: "3px 10px", borderRadius: "20px",
       marginBottom: "12px", textTransform: "uppercase",
     }}>
       {config.icon} YOUR STACK IS READY
     </div>
     <div style={{ fontSize: "17px", fontWeight: "700", color: TEXT_PRIMARY, marginBottom: "6px", lineHeight: 1.3, paddingRight: "24px" }}>
       {config.headline(name, week)}
     </div>
     <div style={{ fontSize: "13px", color: TEXT_SECONDARY, marginBottom: "16px", lineHeight: 1.5 }}>
       {config.subline}
     </div>
     <button onClick={handleShopClick} style={{
       width: "100%", padding: "14px 20px",
       background: clicked ? "#10B981" : config.color,
       color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px",
       fontWeight: "800", letterSpacing: "0.06em", cursor: "pointer",
       textTransform: "uppercase", transition: "opacity 0.15s ease",
     }}
       onMouseEnter={e => (e.target.style.opacity = "0.88")}
       onMouseLeave={e => (e.target.style.opacity = "1")}

       {clicked ? "✓ Opening Store..." : config.cta}
     </button>
     <div style={{ textAlign: "center", fontSize: "11px", color: "#94A3B8", marginTop: "10px" }}>
       Prime Level Living · Ships direct · Cancel anytime
     </div>
   </div>
 );
}

// --- HUMAN COACH SVG ---
function CoachAvatar({ size = 80, pillar = "TRAIN" }) {
const color = pillar === "TRAIN" ? B : pillar === "FUEL" ? O : P;
return (
<svg width={size} height={size} viewBox="0 0 80 80" fill="none">
  <circle cx="40" cy="20" r="12" fill="#D4A574" stroke={color} strokeWidth="2"/>
  <ellipse cx="40" cy="11" rx="10" ry="5" fill="#2D1B00"/>
  <rect x="36" y="31" width="8" height="6" fill="#D4A574"/>
  <path d="M24 37 Q28 35 36 37 L40 55 L44 37 Q52 35 56 37 L54 65 Q48 68 40 68 Q32 68 26 65 Z" fill={color} opacity="0.9"/>
  <ellipse cx="24" cy="40" rx="8" ry="6" fill={color} opacity="0.8"/>
  <ellipse cx="56" cy="40" rx="8" ry="6" fill={color} opacity="0.8"/>
  <path d="M16 40 Q12 50 14 58" stroke="#D4A574" strokeWidth="6" strokeLinecap="round"/>
  <path d="M64 40 Q68 50 66 58" stroke="#D4A574" strokeWidth="6" strokeLinecap="round"/>
  <circle cx="14" cy="60" r="4" fill="#D4A574"/>
  <circle cx="66" cy="60" r="4" fill="#D4A574"/>
  <path d="M33 65 Q31 72 30 78" stroke="#1A1A2E" strokeWidth="7" strokeLinecap="round"/>
  <path d="M47 65 Q49 72 50 78" stroke="#1A1A2E" strokeWidth="7" strokeLinecap="round"/>
  <circle cx="36" cy="19" r="1.5" fill="#1A1A2E"/>
  <circle cx="44" cy="19" r="1.5" fill="#1A1A2E"/>
  <path d="M36 25 Q40 28 44 25" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  <line x1="40" y1="38" x2="40" y2="52" stroke="white" strokeWidth="1" opacity="0.4"/>
  <line x1="33" y1="42" x2="47" y2="42" stroke="white" strokeWidth="1" opacity="0.4"/>
</svg>
);
}

// --- EXERCISE VIDEO COMPONENT ---
function ExerciseVideo({ exerciseName }) {
const [expanded, setExpanded] = useState(false);
const videoUrl = getExerciseVideo(exerciseName);
if (!videoUrl) {
return (
  <div style={{
    width: "100%", height: "120px", background: "#F1F5F9",
    borderRadius: "8px", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", border: `1px solid ${BR}`
  }}>
    <span style={{ fontSize: "12px", color: TEXT_LIGHT }}>No demo available</span>
  </div>
);
}
return (
<>
  <div onClick={() => setExpanded(true)} style={{
    width: "100%", height: "120px", borderRadius: "8px",
    overflow: "hidden", cursor: "pointer", position: "relative",
    border: `2px solid ${BR}`, transition: "border-color 0.2s"
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = B}
    onMouseLeave={e => e.currentTarget.style.borderColor = BR}

    <iframe src={videoUrl} width="100%" height="100%"
      style={{ border: "none", pointerEvents: "none" }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title={exerciseName}
    />
    <div style={{
      position: "absolute", inset: 0, display: "flex",
      alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)"
    }}>
      <div style={{
        width: "40px", height: "40px", borderRadius: "50%",
        background: "rgba(255,255,255,0.9)", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: "16px", marginLeft: "3px" }}>&#9654;</span>
      </div>
    </div>
  </div>
  {expanded && (
    <div onClick={() => setExpanded(false)} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "20px"
    }}>
      <div style={{ width: "100%", maxWidth: "800px", position: "relative" }}>
        <button onClick={(e) => { e.stopPropagation(); setExpanded(false); }} style={{
          position: "absolute", top: "-40px", right: "0",
          background: "white", border: "none", borderRadius: "50%",
          width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", fontWeight: "bold"
        }}>X</button>
        <div style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9" }}>
          <iframe src={videoUrl + "?autoplay=1"} width="100%" height="100%"
            style={{ border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title={exerciseName}
          />
        </div>
        <p style={{ color: "white", textAlign: "center", marginTop: "12px", fontSize: "14px" }}>Tap anywhere to close</p>
      </div>
    </div>
  )}
</>
);
}

// --- COACH MESSAGE ---
function CoachMessage({ message, pillar, name }) {
const color = pillar === "TRAIN" ? B : pillar === "FUEL" ? O : P;
return (
<div style={{
  background: `linear-gradient(135deg, ${color}15, ${color}05)`,
  border: `1px solid ${color}30`, borderLeft: `4px solid ${color}`,
  borderRadius: "12px", padding: "20px",
  display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "24px"
}}>
  <CoachAvatar size={56} pillar={pillar} />
  <div>
    <div style={{ fontSize: "11px", fontWeight: "700", color: color, letterSpacing: "2px", marginBottom: "6px" }}>COACH MESSAGE</div>
    <p style={{ fontSize: "15px", color: TEXT_PRIMARY, lineHeight: "1.6", margin: 0, fontStyle: "italic" }}>"{message}"</p>
  </div>
</div>
);
}

// --- TRAIN RESULT ---
function TrainResult({ data, name, week, onDownload }) {
const [activeDay, setActiveDay] = useState(0);
if (!data?.days) return null;
const w = WEEKS[week] || WEEKS[1];
const day = data.days[activeDay];
return (
 <div style={{ padding: "0 0 40px" }}>
   <div style={{
     background: `linear-gradient(135deg, ${B}15, ${B}05)`,
     borderRadius: "16px", padding: "24px", marginBottom: "24px", border: `1px solid ${B}20`
   }}>
     <div style={{ fontSize: "11px", fontWeight: "700", color: B, letterSpacing: "2px", marginBottom: "8px" }}>TRAIN — WEEK {week}/3 · {w.intensity.toUpperCase()}</div>
     <h2 style={{ fontSize: "28px", fontWeight: "800", color: TEXT_PRIMARY, margin: "0 0 8px", letterSpacing: "-0.5px" }}>{data.title}</h2>
     <p style={{ fontSize: "15px", color: TEXT_SECONDARY, margin: "0 0 12px" }}>{data.subtitle}</p>
     <div style={{ background: `${B}10`, borderLeft: `3px solid ${B}`, padding: "12px 16px", borderRadius: "0 8px 8px 0" }}>
       <p style={{ margin: 0, fontSize: "14px", color: TEXT_PRIMARY, fontStyle: "italic" }}>"{w.mantra}"</p>
     </div>
   </div>
   {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="TRAIN" name={name} />}
   <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
     {data.days.map((d, i) => (
       <button key={i} onClick={() => setActiveDay(i)} style={{
         padding: "10px 18px", borderRadius: "8px", border: "none",
         background: activeDay === i ? B : CARD_BG,
         color: activeDay === i ? "white" : TEXT_SECONDARY,
         fontWeight: "700", fontSize: "13px", cursor: "pointer",
         boxShadow: activeDay === i ? `0 4px 12px ${B}40` : "0 1px 3px rgba(0,0,0,0.1)", transition: "all 0.2s"
       }}>DAY {d.day}</button>
     ))}
   </div>
   {day && (
     <div>
       <div style={{
         background: CARD_BG, borderRadius: "16px", padding: "20px",
         marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1px solid ${BR}`
       }}>
         <h3 style={{ fontSize: "18px", fontWeight: "800", color: TEXT_PRIMARY, margin: "0 0 4px", textTransform: "uppercase" }}>DAY {day.day} — {day.title}</h3>
         <p style={{ fontSize: "13px", color: TEXT_LIGHT, margin: "0 0 16px" }}>{day.duration} · {day.sets} · {day.reps}</p>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
           {day.exercises?.map((ex, i) => (
             <div key={i} style={{ background: BG, borderRadius: "12px", padding: "16px", border: `1px solid ${BR}` }}>
               <ExerciseVideo exerciseName={ex.name} />
               <div style={{ marginTop: "12px" }}>
                 <div style={{ fontWeight: "800", fontSize: "15px", color: TEXT_PRIMARY, textTransform: "uppercase", marginBottom: "4px" }}>{ex.name}</div>
                 <div style={{ fontSize: "12px", color: B, fontWeight: "600", marginBottom: "10px" }}>{ex.muscle}</div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                   {[["SETS", ex.sets], ["REPS", ex.reps], ["TEMPO", ex.tempo], ["REST", ex.rest]].map(([label, val]) => (
                     <div key={label} style={{ background: CARD_BG, borderRadius: "6px", padding: "8px", border: `1px solid ${BR}`, textAlign: "center" }}>
                       <div style={{ fontSize: "10px", color: TEXT_LIGHT, fontWeight: "700", letterSpacing: "1px" }}>{label}</div>
                       <div style={{ fontSize: "13px", fontWeight: "800", color: TEXT_PRIMARY }}>{val}</div>
                     </div>
                   ))}
                 </div>
                 <div style={{ background: `${B}10`, borderRadius: "8px", padding: "10px 12px", border: `1px solid ${B}20` }}>
                   <span style={{ fontSize: "11px", fontWeight: "700", color: B }}>FORM CUE: </span>
                   <span style={{ fontSize: "12px", color: TEXT_SECONDARY }}>{ex.formCue}</span>
                 </div>
               </div>
             </div>
           ))}
         </div>
         {day.tips && (
           <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
             {day.tips.map((tip, i) => (
               <div key={i} style={{ background: CARD_BG, borderRadius: "10px", padding: "14px", border: `1px solid ${BR}` }}>
                 <div style={{ fontSize: "11px", fontWeight: "700", color: B, marginBottom: "6px" }}>TIP {i+1}</div>
                 <p style={{ fontSize: "13px", color: TEXT_SECONDARY, margin: 0, lineHeight: "1.5" }}>{tip}</p>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   )}
   <button onClick={onDownload} style={{
     width: "100%", padding: "16px", borderRadius: "12px", border: "none",
     background: `linear-gradient(135deg, ${B}, ${B}CC)`,
     color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
     letterSpacing: "1px", boxShadow: `0 6px 20px ${B}40`
   }}>↓ DOWNLOAD WEEK {week} TRAIN BLUEPRINT PDF</button>
 </div>
);
}

// --- FUEL RESULT ---
function FuelResult({ data, name, week, onDownload }) {
if (!data?.supplements) return null;
const w = WEEKS[week] || WEEKS[1];
return (
<div style={{ padding: "0 0 40px" }}>
  <div style={{
    background: `linear-gradient(135deg, ${O}15, ${O}05)`,
    borderRadius: "16px", padding: "24px", marginBottom: "24px", border: `1px solid ${O}20`
  }}>
    <div style={{ fontSize: "11px", fontWeight: "700", color: O, letterSpacing: "2px", marginBottom: "8px" }}>FUEL — WEEK {week}/3 · {w.intensity.toUpperCase()}</div>
    <h2 style={{ fontSize: "28px", fontWeight: "800", color: TEXT_PRIMARY, margin: "0 0 8px", letterSpacing: "-0.5px" }}>{data.title}</h2>
    <p style={{ fontSize: "15px", color: TEXT_SECONDARY, margin: 0 }}>{data.subtitle}</p>
  </div>
  {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="FUEL" name={name} />}
  <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>SUPPLEMENT STACK</h3>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "28px" }}>
    {data.supplements?.map((s, i) => (
      <div key={i} style={{ background: CARD_BG, borderRadius: "12px", padding: "18px", border: `1px solid ${BR}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <div style={{ fontWeight: "800", fontSize: "15px", color: TEXT_PRIMARY, textTransform: "uppercase" }}>{s.name}</div>
            <div style={{ fontSize: "12px", color: O, fontWeight: "600" }}>{s.category}</div>
          </div>
          <span style={{
            background: s.priority === "Essential" ? `${O}20` : s.priority === "Recommended" ? `${B}20` : `${G}20`,
            color: s.priority === "Essential" ? O : s.priority === "Recommended" ? B : G,
            fontSize: "10px", fontWeight: "700", padding: "4px 8px", borderRadius: "20px"
          }}>{s.priority}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
          {[["DOSE", s.dose], ["TIMING", s.timing]].map(([label, val]) => (
            <div key={label} style={{ background: BG, borderRadius: "6px", padding: "8px", border: `1px solid ${BR}` }}>
              <div style={{ fontSize: "10px", color: TEXT_LIGHT, fontWeight: "700", letterSpacing: "1px" }}>{label}</div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: TEXT_PRIMARY }}>{val}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: TEXT_SECONDARY, margin: 0, lineHeight: "1.5" }}>{s.benefit}</p>
      </div>
    ))}
  </div>
  {data.nutrition && (
    <>
      <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>NUTRITION TARGETS</h3>
      <div style={{ background: CARD_BG, borderRadius: "16px", padding: "20px", border: `1px solid ${BR}`, marginBottom: "28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
          {[["CALORIES", data.nutrition.calories, O], ["PROTEIN", data.nutrition.protein, B], ["CARBS", data.nutrition.carbs, G], ["FATS", data.nutrition.fats, P]].map(([label, val, color]) => (
            <div key={label} style={{ textAlign: "center", background: `${color}10`, borderRadius: "10px", padding: "14px", border: `1px solid ${color}20` }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color, letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: TEXT_PRIMARY }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: BG, borderRadius: "8px", padding: "12px", border: `1px solid ${BR}` }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: O }}>MEAL TIMING: </span>
          <span style={{ fontSize: "13px", color: TEXT_SECONDARY }}>{data.nutrition.mealTiming}</span>
        </div>
      </div>
    </>
  )}
  {data.mealPlan && (
    <>
      <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>MEAL PLAN</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", marginBottom: "28px" }}>
        {data.mealPlan.map((meal, i) => (
          <div key={i} style={{ background: CARD_BG, borderRadius: "12px", padding: "16px", border: `1px solid ${BR}` }}>
            <div style={{ fontWeight: "800", fontSize: "14px", color: TEXT_PRIMARY, marginBottom: "4px" }}>{meal.meal}</div>
            <div style={{ fontSize: "12px", color: O, marginBottom: "10px" }}>{meal.timing}</div>
            {meal.foods?.map((f, j) => (
              <div key={j} style={{ fontSize: "13px", color: TEXT_SECONDARY, padding: "4px 0", borderBottom: `1px solid ${BR}` }}>• {f}</div>
            ))}
            {meal.macros && <div style={{ fontSize: "11px", color: TEXT_LIGHT, marginTop: "8px" }}>{meal.macros}</div>}
          </div>
        ))}
      </div>
    </>
  )}
  <button onClick={onDownload} style={{
    width: "100%", padding: "16px", borderRadius: "12px", border: "none",
    background: `linear-gradient(135deg, ${O}, ${O}CC)`,
    color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
    letterSpacing: "1px", boxShadow: `0 6px 20px ${O}40`
  }}>↓ DOWNLOAD WEEK {week} FUEL BLUEPRINT PDF</button>
</div>
);
}

// --- FOCUS RESULT ---
function FocusResult({ data, name, week, onDownload }) {
if (!data?.dailyPractices) return null;
const w = WEEKS[week] || WEEKS[1];
return (
 <div style={{ padding: "0 0 40px" }}>
   <div style={{
     background: `linear-gradient(135deg, ${P}15, ${P}05)`,
     borderRadius: "16px", padding: "24px", marginBottom: "24px", border: `1px solid ${P}20`
   }}>
     <div style={{ fontSize: "11px", fontWeight: "700", color: P, letterSpacing: "2px", marginBottom: "8px" }}>FOCUS — WEEK {week}/3 · {w.intensity.toUpperCase()}</div>
     <h2 style={{ fontSize: "28px", fontWeight: "800", color: TEXT_PRIMARY, margin: "0 0 8px", letterSpacing: "-0.5px" }}>{data.title}</h2>
     <p style={{ fontSize: "15px", color: TEXT_SECONDARY, margin: 0 }}>{data.subtitle}</p>
   </div>
   {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="FOCUS" name={name} />}
   <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>DAILY PRACTICES</h3>
   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "28px" }}>
     {data.dailyPractices?.map((p, i) => (
       <div key={i} style={{ background: CARD_BG, borderRadius: "12px", padding: "18px", border: `1px solid ${BR}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
           <div style={{ fontWeight: "800", fontSize: "15px", color: TEXT_PRIMARY }}>{p.name}</div>
           <span style={{ background: `${P}15`, color: P, fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "20px", whiteSpace: "nowrap" }}>{p.duration}</span>
         </div>
         <div style={{ fontSize: "12px", color: P, fontWeight: "600", marginBottom: "8px" }}>{p.timing}</div>
         <p style={{ fontSize: "13px", color: TEXT_SECONDARY, margin: "0 0 10px", lineHeight: "1.5" }}>{p.description}</p>
         <div style={{ background: `${P}10`, borderRadius: "6px", padding: "8px 10px" }}>
           <span style={{ fontSize: "11px", fontWeight: "700", color: P }}>WHY: </span>
           <span style={{ fontSize: "12px", color: TEXT_SECONDARY }}>{p.benefit}</span>
         </div>
       </div>
     ))}
   </div>
   {data.weeklyChallenge && (
     <>
       <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>WEEKLY CHALLENGE</h3>
       <div style={{ background: `linear-gradient(135deg, ${P}15, ${P}05)`, borderRadius: "16px", padding: "20px", marginBottom: "28px", border: `1px solid ${P}25` }}>
         <h4 style={{ fontSize: "18px", fontWeight: "800", color: TEXT_PRIMARY, margin: "0 0 8px" }}>{data.weeklyChallenge.title}</h4>
         <p style={{ fontSize: "14px", color: TEXT_SECONDARY, margin: "0 0 16px", lineHeight: "1.6" }}>{data.weeklyChallenge.description}</p>
         {data.weeklyChallenge.dailyActions?.map((action, i) => (
           <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: `1px solid ${BR}` }}>
             <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${P}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
               <span style={{ fontSize: "12px", fontWeight: "800", color: P }}>D{i+1}</span>
             </div>
             <span style={{ fontSize: "14px", color: TEXT_PRIMARY }}>{action}</span>
           </div>
         ))}
       </div>
     </>
   )}
   {data.affirmations && (
     <>
       <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>DAILY AFFIRMATIONS</h3>
       <div style={{ marginBottom: "28px" }}>
         {data.affirmations.map((aff, i) => (
           <div key={i} style={{ background: CARD_BG, borderRadius: "10px", padding: "14px 18px", marginBottom: "10px", border: `1px solid ${BR}`, display: "flex", alignItems: "center", gap: "12px" }}>
             <span style={{ fontSize: "18px" }}>💎</span>
             <p style={{ margin: 0, fontSize: "14px", color: TEXT_PRIMARY, fontStyle: "italic", fontWeight: "600" }}>"{aff}"</p>
           </div>
         ))}
       </div>
     </>
   )}
   {data.sleepProtocol && (
     <>
       <h3 style={{ fontSize: "14px", fontWeight: "800", color: TEXT_PRIMARY, letterSpacing: "2px", marginBottom: "16px" }}>SLEEP PROTOCOL</h3>
       <div style={{ background: CARD_BG, borderRadius: "16px", padding: "20px", border: `1px solid ${BR}`, marginBottom: "28px" }}>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
           {[["BEDTIME", data.sleepProtocol.bedtime], ["WAKE TIME", data.sleepProtocol.wakeTime]].map(([label, val]) => (
             <div key={label} style={{ background: `${P}10`, borderRadius: "10px", padding: "14px", textAlign: "center", border: `1px solid ${P}20` }}>
               <div style={{ fontSize: "11px", fontWeight: "700", color: P, letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
               <div style={{ fontSize: "18px", fontWeight: "800", color: TEXT_PRIMARY }}>{val}</div>
             </div>
           ))}
         </div>
         {data.sleepProtocol.practices?.map((practice, i) => (
           <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${BR}` }}>
             <span style={{ color: P, fontSize: "16px" }}>🌙</span>
             <span style={{ fontSize: "14px", color: TEXT_SECONDARY }}>{practice}</span>
           </div>
         ))}
       </div>
     </>
   )}
   <button onClick={onDownload} style={{
     width: "100%", padding: "16px", borderRadius: "12px", border: "none",
     background: `linear-gradient(135deg, ${P}, ${P}CC)`,
     color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
     letterSpacing: "1px", boxShadow: `0 6px 20px ${P}40`
   }}>↓ DOWNLOAD WEEK {week} FOCUS BLUEPRINT PDF</button>
 </div>
);
}

// --- LOADING ---
function Loading({ pillar, name, week }) {
const p = PILLARS[pillar];
const [dots, setDots] = useState(".");
useEffect(() => {
const t = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 500);
return () => clearInterval(t);
}, []);
return (
<div style={{ textAlign: "center", padding: "60px 20px" }}>
  <CoachAvatar size={80} pillar={pillar} />
  <div style={{ marginTop: "24px", marginBottom: "8px" }}><span style={{ fontSize: "32px" }}>{p.icon}</span></div>
  <div style={{ fontSize: "18px", fontWeight: "800", color: TEXT_PRIMARY, marginBottom: "8px" }}>Building your {pillar} Blueprint{dots}</div>
  <div style={{ fontSize: "14px", color: TEXT_SECONDARY }}>Personalizing for {name} — Week {week}</div>
  <div style={{ width: "200px", height: "4px", background: BR, borderRadius: "2px", margin: "24px auto 0", overflow: "hidden" }}>
    <div style={{ height: "100%", background: p.color, borderRadius: "2px", animation: "loadingBar 2s ease-in-out infinite" }} />
  </div>
  <style>{`@keyframes loadingBar { 0%{width:0%} 50%{width:80%} 100%{width:100%} }`}</style>
</div>
);
}

// --- INTAKE FORM ---
function IntakeForm({ pillar, profile, onGenerate }) {
const p = PILLARS[pillar];
const questions = INTAKE[pillar];
const [answers, setAnswers] = useState(profile?.answers?.[pillar] || {});
return (
<div style={{ padding: "8px 0 40px" }}>
  <div style={{
    display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", padding: "20px",
    background: `linear-gradient(135deg, ${p.color}12, ${p.color}04)`,
    borderRadius: "16px", border: `1px solid ${p.color}20`
  }}>
    <CoachAvatar size={56} pillar={pillar} />
    <div>
      <div style={{ fontSize: "11px", fontWeight: "700", color: p.color, letterSpacing: "2px", marginBottom: "4px" }}>{pillar} — INTAKE</div>
      <div style={{ fontSize: "15px", color: TEXT_SECONDARY }}>Your previous answers are loaded. Update if needed.</div>
    </div>
  </div>
  {questions.map(q => (
    <div key={q.id} style={{ marginBottom: "20px" }}>
      <div style={{ fontSize: "11px", fontWeight: "700", color: TEXT_LIGHT, letterSpacing: "2px", marginBottom: "10px" }}>{q.label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => setAnswers(a => ({...a, [q.id]: opt}))} style={{
            padding: "10px 16px", borderRadius: "8px",
            border: answers[q.id] === opt ? `2px solid ${p.color}` : `2px solid ${BR}`,
            background: answers[q.id] === opt ? `${p.color}15` : CARD_BG,
            color: answers[q.id] === opt ? p.color : TEXT_SECONDARY,
            fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "all 0.15s"
          }}>{opt}</button>
        ))}
      </div>
    </div>
  ))}
  <button onClick={() => onGenerate(answers)} style={{
    width: "100%", padding: "16px", borderRadius: "12px", border: "none",
    background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)`,
    color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
    letterSpacing: "1px", marginTop: "8px", boxShadow: `0 6px 20px ${p.color}40`
  }}>GENERATE MY WEEK {profile?.week || 1} {pillar} BLUEPRINT →</button>
</div>
);
}

// --- PDF DOWNLOAD ---
function downloadPDF(data, pillar, name, week) {
const w = window.open("", "_blank");
w.document.write(`<html><head><title>PLL ${pillar} Week ${week} — ${name}</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#0F172A;background:white;}h1{font-size:28px;font-weight:800;margin-bottom:4px;}h2{font-size:20px;font-weight:700;margin-top:28px;margin-bottom:12px;border-bottom:2px solid #E2E8F0;padding-bottom:8px;}.tag{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:16px;}.card{border:1px solid #E2E8F0;border-radius:10px;padding:16px;margin-bottom:14px;}.footer{margin-top:40px;text-align:center;font-size:12px;color:#94A3B8;border-top:1px solid #E2E8F0;padding-top:20px;}@media print{body{padding:20px;}}</style>
</head><body>
<h1>${data.title||`${pillar} Week ${week} Blueprint`}</h1>
<span class="tag" style="background:#EFF6FF;color:#0EA5E9;">PRIME LEVEL LIVING · ${name} · WEEK ${week}</span>
<p>${data.subtitle||""}</p>
${data.coachMessage?`<div class="card" style="border-left:4px solid #0EA5E9;"><strong>Coach:</strong> "${data.coachMessage}"</div>`:""}
<pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;line-height:1.6;">${JSON.stringify(data,null,2)}</pre>
<div class="footer">PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK ${week} OF 3</div>
</body></html>`);
w.document.close();
setTimeout(() => w.print(), 500);
}

// --- MAIN APP ---
export default function App() {
const [screen, setScreen] = useState("login");
const [profile, setProfile] = useState(null);
const [activePillar, setActivePillar] = useState("TRAIN");
const [pillarStates, setPillarStates] = useState({ TRAIN: {phase:"intake"}, FUEL: {phase:"intake"}, FOCUS: {phase:"intake"} });
const [completedPillars, setCompletedPillars] = useState([]);
const [showCelebration, setShowCelebration] = useState(false);
const [bridgeDismissed, setBridgeDismissed] = useState({});
const [loginForm, setLoginForm] = useState({ username: "", password: "" });
const [createForm, setCreateForm] = useState({ firstName: "", username: "", email: "", password: "", gender: "", ageRange: "" });
const [loginMode, setLoginMode] = useState("signin");
const [loginError, setLoginError] = useState("");

const upd = (pillar, update) => setPillarStates(prev => ({ ...prev, [pillar]: { ...prev[pillar], ...update } }));
const st = pillarStates[activePillar];
const week = profile?.week || 1;
const name = profile?.firstName || profile?.username || "Athlete";

useEffect(() => {
const saved = Store.load("profile_" + (loginForm.username || ""));
if (saved) setProfile(saved);
}, []);

const saveProfile = (updates) => {
const updated = { ...profile, ...updates };
setProfile(updated);
if (updated.username) Store.save("profile_" + updated.username.toLowerCase(), updated);
};

const login = (prof) => {
Store.save("user_" + prof.username.toLowerCase(), prof);
setProfile(prof);
setScreen("app");
};

const logout = () => { setScreen("login"); setProfile(null); };

const handleSignIn = () => {
if (!loginForm.username || !loginForm.password) { setLoginError("Please fill in all fields."); return; }
const saved = Store.load("user_" + loginForm.username.toLowerCase());
if (!saved) { setLoginError("Account not found."); return; }
if (saved.password !== loginForm.password) { setLoginError("Incorrect password."); return; }
login(saved);
};

const handleCreateAccount = () => {
if (!createForm.firstName || !createForm.username || !createForm.email || !createForm.password) {
  setLoginError("Please fill in all fields."); return;
}
if (!createForm.gender) { setLoginError("Please select Male or Female."); return; }
if (!createForm.ageRange) { setLoginError("Please select your age range."); return; }
const exists = Store.load("user_" + createForm.username.toLowerCase());
if (exists) { setLoginError("Username already taken."); return; }
const newProfile = {
  firstName: createForm.firstName,
  username: createForm.username,
  email: createForm.email,
  password: createForm.password,
  gender: createForm.gender,
  ageRange: createForm.ageRange,
  week: 1, answers: {}, createdAt: new Date().toISOString()
};
login(newProfile);
};

const generate = async (pillar, answers) => {
upd(pillar, { phase: "loading", answers });
const newAnswers = { ...(profile?.answers || {}), [pillar]: answers };
saveProfile({ answers: newAnswers });
try {
  const n = profile?.firstName || profile?.username || "Athlete";
  const gender = profile?.gender || "";
  const ageRange = profile?.ageRange || "";
  const prompt = PILLARS[pillar].prompt(answers, n, week, gender, ageRange);
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 4000, messages: [{ role: "user", content: prompt }] })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const text = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("");
  const clean = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const result = JSON.parse(clean);
  upd(pillar, { phase: "result", result });
  if (!completedPillars.includes(pillar)) {
    const newCompleted = [...completedPillars, pillar];
    setCompletedPillars(newCompleted);
    if (newCompleted.length === 3) setShowCelebration(true);
  }
} catch (err) {
  console.log("PLL Engine error:", err.message);
  upd(pillar, { phase: "error" });
}
};

if (screen === "login") {
return (
  <div style={{
    minHeight: "100vh", background: `linear-gradient(135deg, ${CD} 0%, #0F172A 50%, ${CD} 100%)`,
    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
  }}>
    <div style={{
      background: "white", borderRadius: "24px", padding: "40px",
      width: "100%", maxWidth: "400px", boxShadow: "0 25px 60px rgba(0,0,0,0.4)"
    }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <CoachAvatar size={72} pillar="TRAIN" />
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: TEXT_PRIMARY, margin: "16px 0 4px", letterSpacing: "-1px" }}>LEVEL UP</h1>
        <p style={{ fontSize: "13px", color: TEXT_LIGHT, letterSpacing: "3px", textTransform: "uppercase", margin: 0 }}>THE PLL SYSTEM · PHASE 1</p>
      </div>

      <div style={{ display: "flex", marginBottom: "24px", background: BG, borderRadius: "10px", padding: "4px" }}>
        {["signin", "create"].map(mode => (
          <button key={mode} onClick={() => { setLoginMode(mode); setLoginError(""); }} style={{
            flex: 1, padding: "10px", borderRadius: "8px", border: "none",
            background: loginMode === mode ? "white" : "transparent",
            color: loginMode === mode ? TEXT_PRIMARY : TEXT_LIGHT,
            fontWeight: "700", fontSize: "13px", cursor: "pointer",
            boxShadow: loginMode === mode ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
            textTransform: "uppercase", letterSpacing: "1px"
          }}>{mode === "signin" ? "Sign In" : "Create Account"}</button>
        ))}
      </div>

      {loginError && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#DC2626" }}>{loginError}</p>
        </div>
      )}

      {loginMode === "signin" ? (
        <>
          {[{ label: "Username", key: "username", type: "text" }, { label: "Password", key: "password", type: "password" }].map(f => (
            <div key={f.key} style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: TEXT_LIGHT, letterSpacing: "1px", display: "block", marginBottom: "6px" }}>{f.label.toUpperCase()}</label>
              <input type={f.type} value={loginForm[f.key]}
                onChange={e => setLoginForm(p => ({...p, [f.key]: e.target.value}))}
                onKeyDown={e => e.key === "Enter" && handleSignIn()}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: `1px solid ${BR}`, fontSize: "15px", color: TEXT_PRIMARY, background: BG, boxSizing: "border-box", outline: "none" }}
              />
            </div>
          ))}
          <button onClick={handleSignIn} style={{
            width: "100%", padding: "14px", borderRadius: "10px", border: "none",
            background: `linear-gradient(135deg, ${B}, ${ACCENT})`,
            color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
            letterSpacing: "1px", marginTop: "8px", boxShadow: `0 6px 20px ${B}40`
          }}>SIGN IN TO MY PROGRAM</button>
        </>
      ) : (
        <>
          {[
            { label: "First Name", key: "firstName", type: "text" },
            { label: "Username", key: "username", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
            { label: "Password", key: "password", type: "password" }
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: "700", color: TEXT_LIGHT, letterSpacing: "1px", display: "block", marginBottom: "6px" }}>{f.label.toUpperCase()}</label>
              <input type={f.type} value={createForm[f.key]}
                onChange={e => setCreateForm(p => ({...p, [f.key]: e.target.value}))}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: `1px solid ${BR}`, fontSize: "15px", color: TEXT_PRIMARY, background: BG, boxSizing: "border-box", outline: "none" }}
              />
            </div>
          ))}

          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: TEXT_LIGHT, marginBottom: "8px", textTransform: "uppercase" }}>I AM</div>
            <div style={{ display: "flex", gap: "10px" }}>
              {["Male", "Female"].map(g => (
                <button key={g} type="button" onClick={() => setCreateForm(p => ({ ...p, gender: g }))} style={{
                  flex: 1, padding: "12px", borderRadius: "10px", cursor: "pointer",
                  fontSize: "13px", fontWeight: "700", letterSpacing: "0.06em",
                  textTransform: "uppercase", transition: "all 0.15s ease",
                  background: createForm.gender === g ? TEXT_PRIMARY : BG,
                  color: createForm.gender === g ? "#FFFFFF" : TEXT_SECONDARY,
                  border: createForm.gender === g ? `2px solid ${TEXT_PRIMARY}` : `2px solid ${BR}`,
                }}>
                  {g === "Male" ? "♂ Male" : "♀ Female"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: TEXT_LIGHT, marginBottom: "8px", textTransform: "uppercase" }}>MY AGE RANGE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {["18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map(range => (
                <button key={range} type="button" onClick={() => setCreateForm(p => ({ ...p, ageRange: range }))} style={{
                  padding: "11px 6px", borderRadius: "10px", cursor: "pointer",
                  fontSize: "13px", fontWeight: "700", transition: "all 0.15s ease",
                  background: createForm.ageRange === range ? O : BG,
                  color: createForm.ageRange === range ? "#FFFFFF" : TEXT_SECONDARY,
                  border: createForm.ageRange === range ? `2px solid ${O}` : `2px solid ${BR}`,
                }}>{range}</button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "11px", color: TEXT_LIGHT, textAlign: "center", margin: "8px 0 12px" }}>
            By creating an account you agree to receive program updates and coaching tips from Prime Level Living.
          </p>
          <button onClick={handleCreateAccount} style={{
            width: "100%", padding: "14px", borderRadius: "10px", border: "none",
            background: `linear-gradient(135deg, ${O}, ${O}CC)`,
            color: "white", fontWeight: "800", fontSize: "15px", cursor: "pointer",
            letterSpacing: "1px", boxShadow: `0 6px 20px ${O}40`
          }}>START MY TRANSFORMATION →</button>
        </>
      )}

      <p style={{ textAlign: "center", fontSize: "12px", color: TEXT_LIGHT, margin: "20px 0 0" }}>
        21 DAYS · 3 PILLARS · ONE TRANSFORMATION<br/>PRIME LEVEL LIVING · NURU VISION MEDIA
      </p>
    </div>
  </div>
);
}

if (showCelebration) {
return (
  <div style={{
    minHeight: "100vh", background: `linear-gradient(135deg, ${CD}, #0F172A)`,
    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
  }}>
    <div style={{ textAlign: "center", maxWidth: "500px" }}>
      <div style={{ fontSize: "60px", marginBottom: "16px" }}>🔥</div>
      <h1 style={{ fontSize: "36px", fontWeight: "900", color: "white", margin: "0 0 16px", letterSpacing: "-1px" }}>WEEK {week} DONE, {name.toUpperCase()}!</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", marginBottom: "32px" }}>
        {WEEKS[week]?.coachClose(name) || `${name}, you completed all 3 pillars this week. That's elite.`}
      </p>
      {week < 3 ? (
        <button onClick={() => {
          saveProfile({ week: week + 1 });
          setCompletedPillars([]);
          setShowCelebration(false);
          setPillarStates({ TRAIN: {phase:"intake"}, FUEL: {phase:"intake"}, FOCUS: {phase:"intake"} });
        }} style={{
          padding: "18px 40px", borderRadius: "12px", border: "none",
          background: `linear-gradient(135deg, ${B}, ${ACCENT})`,
          color: "white", fontWeight: "800", fontSize: "16px", cursor: "pointer",
          letterSpacing: "1px", boxShadow: `0 8px 24px ${B}50`
        }}>START WEEK {week + 1} →</button>
      ) : (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${O}20, ${O}05)`, border: `1px solid ${O}30`, borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: O, letterSpacing: "2px", marginBottom: "8px" }}>PHASE 1 COMPLETE</div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", margin: 0 }}>You've completed all 3 weeks of Phase 1. Phase 2 unlocks elite-level programming. Ready to go further?</p>
          </div>
          <button style={{
            padding: "18px 40px", borderRadius: "12px", border: "none",
            background: `linear-gradient(135deg, ${O}, ${O}AA)`,
            color: "white", fontWeight: "800", fontSize: "16px", cursor: "pointer", letterSpacing: "1px"
          }}>UNLOCK PHASE 2 →</button>
        </div>
      )}
    </div>
  </div>
);
}

const totalPillars = 3;
const progressPct = Math.round((completedPillars.length / totalPillars) * 100);

return (
<div style={{ minHeight: "100vh", background: BG, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
  <div style={{
    background: "white", borderBottom: `1px solid ${BR}`,
    padding: "0 24px", position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 1px 8px rgba(0,0,0,0.06)"
  }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CoachAvatar size={36} pillar={activePillar} />
        <div>
          <div style={{ fontSize: "16px", fontWeight: "900", color: TEXT_PRIMARY, letterSpacing: "-0.5px", lineHeight: "1" }}>LEVEL UP</div>
          <div style={{ fontSize: "10px", color: TEXT_LIGHT, letterSpacing: "2px" }}>THE PLL SYSTEM · {name.toUpperCase()}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        {["TRAIN", "FUEL", "FOCUS"].map(p => {
          const pl = PILLARS[p];
          const done = completedPillars.includes(p);
          const active = activePillar === p;
          return (
            <button key={p} onClick={() => setActivePillar(p)} style={{
              padding: "8px 16px", borderRadius: "8px", border: "none",
              background: active ? pl.color : done ? `${pl.color}15` : "transparent",
              color: active ? "white" : done ? pl.color : TEXT_LIGHT,
              fontWeight: "800", fontSize: "13px", cursor: "pointer",
              letterSpacing: "1px", transition: "all 0.2s",
              boxShadow: active ? `0 4px 12px ${pl.color}40` : "none"
            }}>{pl.icon} {p} {done ? "✓" : ""}</button>
          );
        })}
      </div>
      <button onClick={logout} style={{
        padding: "8px 14px", borderRadius: "8px", border: `1px solid ${BR}`,
        background: "transparent", color: TEXT_LIGHT, fontSize: "13px", fontWeight: "600", cursor: "pointer"
      }}>OUT</button>
    </div>
  </div>

  <div style={{ background: "white", borderBottom: `1px solid ${BR}`, padding: "12px 24px" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "11px", fontWeight: "700", color: TEXT_LIGHT, letterSpacing: "2px" }}>PHASE 1 PROGRESS</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {["TRAIN", "FUEL", "FOCUS"].map(p => (
            <span key={p} style={{ fontSize: "11px", fontWeight: "700", color: completedPillars.includes(p) ? PILLARS[p].color : TEXT_LIGHT }}>
              W{week} {completedPillars.includes(p) ? "●" : "○"}
            </span>
          ))}
          <span style={{ fontSize: "12px", fontWeight: "800", color: progressPct === 100 ? G : TEXT_PRIMARY }}>{progressPct}%</span>
        </div>
      </div>
      <div style={{ height: "4px", background: BR, borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progressPct}%`, background: `linear-gradient(90deg, ${B}, ${O}, ${P})`, borderRadius: "2px", transition: "width 0.5s ease" }} />
      </div>
    </div>
  </div>

  <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <span style={{ fontSize: "13px", fontWeight: "800", color: PILLARS[activePillar].color, letterSpacing: "2px" }}>{activePillar}</span>
      <span style={{ fontSize: "13px", color: TEXT_LIGHT }}>—</span>
      <span style={{ fontSize: "13px", color: TEXT_SECONDARY }}>{PILLARS[activePillar].subtitle}</span>
      <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: "20px", background: `${PILLARS[activePillar].color}15`, color: PILLARS[activePillar].color, fontSize: "12px", fontWeight: "700" }}>
        {WEEKS[week]?.label || `WEEK ${week}`}
      </div>
    </div>

    {st.phase === "loading" && <Loading pillar={activePillar} name={name} week={week} />}

    {st.phase === "intake" && (
      <IntakeForm pillar={activePillar} profile={{ ...profile, week }} onGenerate={(answers) => generate(activePillar, answers)} />
    )}

    {st.phase === "result" && st.result && activePillar === "TRAIN" && (
      <TrainResult data={st.result} name={name} week={week} onDownload={() => downloadPDF(st.result, "TRAIN", name, week)} />
    )}

    {st.phase === "result" && st.result && activePillar === "FUEL" && (
      <FuelResult data={st.result} name={name} week={week} onDownload={() => downloadPDF(st.result, "FUEL", name, week)} />
    )}

    {st.phase === "result" && st.result && activePillar === "FOCUS" && (
      <FocusResult data={st.result} name={name} week={week} onDownload={() => downloadPDF(st.result, "FOCUS", name, week)} />
    )}

    <StoreBridge
      pillar={activePillar}
      pillarStates={pillarStates}
      profile={profile}
      week={week}
      dismissed={bridgeDismissed}
      onDismiss={(p) => setBridgeDismissed(prev => ({...prev, [p]: true}))}
    />

    {st.phase === "error" && (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
        <div style={{ fontWeight: "800", fontSize: "20px", color: "#FF4444", marginBottom: "8px" }}>SYSTEM ERROR</div>
        <div style={{ fontSize: "14px", color: TEXT_SECONDARY, marginBottom: "24px" }}>Something went wrong. Let's try again.</div>
        <button onClick={() => upd(activePillar, { phase: "intake" })} style={{
          padding: "12px 28px", borderRadius: "10px", border: "none",
          background: PILLARS[activePillar].color, color: "white", fontWeight: "800", fontSize: "14px", cursor: "pointer"
        }}>RETRY</button>
      </div>
    )}
  </div>

  <div style={{ borderTop: `1px solid ${BR}`, padding: "16px 24px", textAlign: "center", background: "white", marginTop: "40px" }}>
    <div style={{ fontSize: "11px", color: TEXT_LIGHT, letterSpacing: "2px", fontWeight: "600" }}>
      PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK {week} OF 3
    </div>
  </div>
</div>
);
}
