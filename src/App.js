import React, { useState, useEffect } from "react";
import {
  EXERCISE_LIBRARY,
  MUSCLE_GROUPS,
  COACH_MEDIA
} from "./data/workoutIntelligence";

// =====================================================
// PLL ENGINE
// Version: Sprint 5 Complete
// Coach Presence & Voice System
// Status: Production Stable
// =====================================================

// Sprint 2 Final Stable Build — Mobile + Coach + Encoding Fixes
// Checkpoint created before Sprint 3 development.
// Recovery point: stable after React import fix
// Stable build after component setupimport React, { useState, useEffect } from "react";

// import CoachAvatar from "./components/CoachAvatar";
// import CoachMessage from "./components/CoachMessage";
// import SectionLabel from "./components/SectionLabel";

// import {
//   B,
//   O,
//   P,
//   G,
//   BG,
//   SURFACE,
//   SURFACE2,
//   NAVY,
//   SLATE,
//   MUTED,
//   BORDER,
//   BORDER_MID
// } from "./config";
// - DESIGN SYSTEM -
// Light premium: white base, slate-navy accents, pillar colors as precise hits
const B  = "#2F80ED";
const O  = "#FF4D1D";
const P  = "#9B5CFF";
const G  = "#22C55E";

const BG          = "#101827";
const SURFACE     = "#182235";
const SURFACE2    = "#222F46";
const NAVY        = "#F8FAFC";
const SLATE       = "#CBD5E1";
const MUTED       = "#94A3B8";
const BORDER      = "#334155";
const BORDER_MID  = "#475569";

// - STORAGE -
const Store = {
  save: (key, val) => { try { localStorage.setItem("pll_"+key, JSON.stringify(val)); } catch(e){} },
  load: (key) => { try { const v=localStorage.getItem("pll_"+key); return v?JSON.parse(v):null; } catch(e){ return null; } },
  del:  (key) => { try { localStorage.removeItem("pll_"+key); } catch(e){} }
};

// - WEEK CONFIG -
const WEEKS = {
  1: {
    label: "WEEK 1 — THE NEW SYSTEM",
    theme: "Foundation. New habits. New identity begins.",
    mantra: "Every champion was once a beginner who refused to quit. This is Day 1 of the rest of your life.",
    coachOpen:  (name) => `${name}, welcome to Phase 1. This week is about one thing — building the foundation that everything else stands on. Show up every day.`,
    coachClose: (name) => `${name}, Week 1 is DONE. You showed up every single day. That's what separates you already.`,
    intensity: "Foundation", repRange: "12-15 reps", sets: "3 sets", load: "Light to moderate — perfect form priority"
  },
  2: {
    label: "WEEK 2 — THE PROGRESSION",
    theme: "Intensity increases. Habits solidify. Halfway there.",
    mantra: "You've already done what most people won't. Now let's do what most people can't.",
    coachOpen:  (name) => `${name}, you made it to Week 2. That already puts you ahead of 80% of people who said they'd start.`,
    coachClose: (name) => `${name}, TWO WEEKS DOWN. Halfway through Phase 1 and you're already changing.`,
    intensity: "Progressive", repRange: "8-12 reps", sets: "4 sets", load: "Increase weight 10-15% from Week 1"
  },
  3: {
    label: "WEEK 3 — THE SEPARATION",
    theme: "This is where champions are made. Most quit. You won't.",
    mantra: "Week 3 is where your identity changes forever. You are no longer who you were.",
    coachOpen:  (name) => `${name}, this is THE week. The separation happens right here. Everyone starts. Almost nobody finishes. You will.`,
    coachClose: (name) => `${name}, PHASE 1 COMPLETE. You did what most people only talk about.`,
    intensity: "Peak", repRange: "6-10 reps", sets: "4-5 sets", load: "Maximum sustainable load"
  }
};

// - EXERCISE VIDEOS -
const EXERCISE_VIDEOS = {
  "goblet squat":"https://www.youtube.com/embed/MeIiIdhvXT4",
  "squat":"https://www.youtube.com/embed/ultWZbUMPL8",
  "leg press":"https://www.youtube.com/embed/IZxyjW7MPJQ",
  "walking lunge":"https://www.youtube.com/embed/L8fvypPrzzs",
  "lunge":"https://www.youtube.com/embed/QOVaHwm-Q6U",
  "rdl":"https://www.youtube.com/embed/JCXUYuzwNrM",
  "romanian deadlift":"https://www.youtube.com/embed/JCXUYuzwNrM",
  "deadlift":"https://www.youtube.com/embed/op9kVnSso6Q",
  "leg curl":"https://www.youtube.com/embed/1Tq3QdYUuHs",
  "hamstring curl":"https://www.youtube.com/embed/1Tq3QdYUuHs",
  "calf raise":"https://www.youtube.com/embed/-M4-G8p1fCI",
  "hip thrust":"https://www.youtube.com/embed/SEdqd1n0cvg",
  "glute bridge":"https://www.youtube.com/embed/OUgsJ8-Vi0E",
  "step up":"https://www.youtube.com/embed/dQqApCGd5Ss",
  "bulgarian split squat":"https://www.youtube.com/embed/2C-uNgKwPLE",
  "bench press":"https://www.youtube.com/embed/rT7DgCr-3pg",
  "push up":"https://www.youtube.com/embed/IODxDxX7oi4",
  "overhead press":"https://www.youtube.com/embed/2yjwXTZQDDI",
  "shoulder press":"https://www.youtube.com/embed/qEwKCR5JCog",
  "lateral raise":"https://www.youtube.com/embed/3VcKaXpzqRo",
  "tricep":"https://www.youtube.com/embed/2-LAMcpzODU",
  "chest fly":"https://www.youtube.com/embed/eozdVDA78K0",
  "dip":"https://www.youtube.com/embed/2z8JmcrW-As",
  "pull up":"https://www.youtube.com/embed/eGo4IYlbE5g",
  "chin up":"https://www.youtube.com/embed/eGo4IYlbE5g",
  "row":"https://www.youtube.com/embed/roCP6wCXPqo",
  "lat pulldown":"https://www.youtube.com/embed/CAwf7n6Luuc",
  "bicep curl":"https://www.youtube.com/embed/ykJmrZ5v0Oo",
  "curl":"https://www.youtube.com/embed/ykJmrZ5v0Oo",
  "face pull":"https://www.youtube.com/embed/rep-qVOkqgk",
  "plank":"https://www.youtube.com/embed/ASdvN_XEl_c",
  "crunch":"https://www.youtube.com/embed/Xyd_fa5zoEU",
  "ab":"https://www.youtube.com/embed/AnYl6Nk9GOA",
  "mountain climber":"https://www.youtube.com/embed/nmwgirgXLYM",
  "russian twist":"https://www.youtube.com/embed/wkD8rjkodUI",
  "leg raise":"https://www.youtube.com/embed/l4kQd9eWclE",
  "burpee":"https://www.youtube.com/embed/dZgVxmf6jkA",
  "kettlebell swing":"https://www.youtube.com/embed/YSxHifyI6s8",
  "box jump":"https://www.youtube.com/embed/52r_Ul5k03g",
  "jumping jack":"https://www.youtube.com/embed/iSSAk4XCsRA",
};

function CoachExerciseReason({ exerciseName, muscle }) {

  const reasons = {
    "goblet squat":
      "Builds squat mechanics, leg strength and core stability while reinforcing proper movement patterns.",

    "squat":
      "Develops total lower-body strength and improves movement efficiency.",

    "romanian deadlift":
      "Strengthens the posterior chain while improving hip hinge mechanics.",

    "deadlift":
      "Builds full-body power while strengthening the hips, back and grip.",

    "bench press":
      "Develops pressing strength through the chest, shoulders and triceps.",

    "push up":
      "Improves upper-body endurance and pressing control using bodyweight.",

    "overhead press":
      "Builds shoulder strength while improving overhead stability.",

    "row":
      "Improves posture and upper-back strength while balancing pressing movements.",

    "lat pulldown":
      "Develops back width and pulling strength for better posture.",

    "pull up":
      "Builds upper-body pulling strength and total-body control.",

    "walking lunge":
      "Improves balance, stability and single-leg strength.",

    "leg press":
      "Safely overloads the legs while reinforcing lower-body strength.",

    "hip thrust":
      "Targets the glutes for improved power and hip extension.",

    "calf raise":
      "Strengthens the calves to improve ankle stability and lower-leg endurance."
  };

  const reason =
    reasons[exerciseName?.toLowerCase()] ||
    `Selected to improve your ${muscle || "overall"} strength while supporting this week's training objective.`;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        borderRadius: "10px",
        background: `${B}10`,
        border: `1px solid ${B}25`
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: "800",
          color: B,
          letterSpacing: "1px",
          marginBottom: "6px"
        }}
      >
        COACH'S REASON
      </div>

      <div
        style={{
          fontSize: "13px",
          lineHeight: "1.5",
          color: NAVY
        }}
      >
        {reason}
      </div>
    </div>
  );
}

function getExerciseVideo(name) {
  if (!name) return null;
  const l = name.toLowerCase();
  for (const [key, url] of Object.entries(EXERCISE_VIDEOS)) {
    if (l.includes(key)) return url;
  }
  return null;
}

function getCoachMedia(name) {
  if (!name) return null;

  const key = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return COACH_MEDIA[key] || null;
}

// - PILLARS CONFIG -
const PILLARS = {
  TRAIN: {
    color: B, label: "TRAIN", subtitle: "WORKOUT BLUEPRINT",
    icon: (c,s=20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12"/>
      </svg>
    ),
    prompt: (
  answers,
  name,
  week,
  gender,
  ageRange,
  intelligence = ""
) => {
  
      const w = WEEKS[week];
      const ageNote = ageRange === "18-24" ? "Foundation building phase. High volume appropriate." :
        ageRange === "25-34" ? "Peak performance window. Push intensity." :
        ageRange === "35-44" ? "Prioritize joint health. Progressive overload." :
        ageRange === "45-54" ? "Hormone-supportive training. Manage fatigue." :
        ageRange === "55-64" ? "Functional strength, balance, bone density." :
        ageRange === "65+" ? "Safety first. Mobility and maintaining muscle." : "";
      const genderNote = gender === "Female" ? "Tailor to female physiology: hormonal cycles, glute emphasis." :
        gender === "Male" ? "Testosterone-supportive training intensity. Compound lifts priority." : "";
      return `You are a Prime Level Living TRAIN coach. Generate Week ${week} TRAIN blueprint.

User:
Name=${name}
Gender=${gender || "Not specified"}
AgeRange=${ageRange || "Not specified"}
Goal=${answers.goal}
Days=${answers.days}
Equipment=${answers.equipment}
Experience=${answers.experience}
Focus=${answers.focus}
Theme=${w.theme}
Intensity=${w.intensity}

${intelligence}

Return ONLY valid JSON:
{
  "title": "Week ${week} Training Title",
  "subtitle": "Brief training focus",
  "coachMessage": "Short coach message to ${name}",
  "days": [
    {
      "day": 1,
      "title": "Workout Day",
      "duration": "45 min",
      "sets": "3 sets",
      "reps": "8-12 reps",
      "exercises": [
        {
          "name": "Exercise Name",
          "target": "Main muscle",
          "why": "Why it matters"
        }
      ]
    }
  ],
  "coachTips": [
    "Training tip 1",
    "Training tip 2",
    "Training tip 3"
  ]
}`;
    }
  },
  FUEL: {
    color: O, label: "FUEL", subtitle: "NUTRITION & SUPPLEMENTS",
    icon: (c,s=20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M5 8h13v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8zM12 8V3M8 3h8"/>
      </svg>
    ),
    
    prompt: (
  answers,
  name,
  week,
  gender,
  ageRange,
  intelligence = ""
) => {
  
  const w = WEEKS[week];
  
      return `You are an elite nutrition coach for Prime Level Living. Generate a complete Week ${week} nutrition plan.
User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.goal}, Diet=${answers.diet}, Supplement Experience=${answers.supplements}, Budget=${answers.budget}
Week Theme: ${w.theme}

${intelligence}

Return ONLY valid JSON:
{
  "title": "Week ${week} Fuel Stack Title",
  "subtitle": "Brief description",
  "coachMessage": "Personalized nutrition message from coach to ${name} for week ${week}",
  "supplements": [{"name":"Supplement Name","category":"Category","dose":"Amount","timing":"When","benefit":"Why it works","priority":"Essential/Recommended/Optional"}],
  "nutrition": {"calories":"Target","protein":"Protein target","carbs":"Carbs","fats":"Fats","mealTiming":"Strategy"},
  "mealPlan": [{"meal":"Meal name","timing":"When","foods":["Food 1"],"macros":"Approx macros"}]
}`;
    }
  },
  FOCUS: {
    color: P, label: "FOCUS", subtitle: "MINDSET & PERFORMANCE",
    icon: (c,s=20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    
    prompt: (
  answers,
  name,
  week,
  gender,
  ageRange,
  intelligence = ""
) => {
  
      const w = WEEKS[week];
      return `You are an elite mindset coach for Prime Level Living. Generate a complete Week ${week} mental performance plan.
User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Mindset Goal=${answers.mindsetGoal}, Challenge=${answers.challenges}, Morning Routine=${answers.morning}, Stress=${answers.stress}
Week Theme: ${w.theme}, Mantra: ${w.mantra}
${intelligence}

Return ONLY valid JSON:
{
  "title": "Week ${week} Mental Performance Title",
  "subtitle": "Brief description",
  "coachMessage": "Personalized mindset message from coach to ${name} for week ${week}",
  "dailyPractices": [{"name":"Practice Name","duration":"X minutes","timing":"Morning/Evening","description":"How to do it","benefit":"Why it works"}],
  "weeklyChallenge": {"title":"Challenge Title","description":"Full description","dailyActions":["Action 1","Action 2","Action 3","Action 4","Action 5"]},
  "affirmations": ["Affirmation 1","Affirmation 2","Affirmation 3","Affirmation 4","Affirmation 5"],
  "journalPrompts": [{"day":1,"prompt":"Journal question"}],
  "sleepProtocol": {"bedtime":"Target bedtime","wakeTime":"Target wake time","practices":["Practice 1","Practice 2"]}
}`;
    }
  }
};

// - INTAKE QUESTIONS -
const INTAKE = {
  TRAIN: [
    { id:"goal",       label:"PRIMARY GOAL",         options:["Build Muscle","Lose Fat","Athletic Performance","General Fitness"] },
    { id:"days",       label:"TRAINING DAYS / WEEK", options:["3 Days","4 Days","5 Days","6 Days"] },
    { id:"equipment",  label:"EQUIPMENT ACCESS",     options:["Full Gym","Home + Dumbbells","Bodyweight Only","Resistance Bands"] },
    { id:"experience", label:"EXPERIENCE LEVEL",     options:["Beginner","Intermediate","Advanced"] },
    { id:"focus",      label:"FOCUS AREA",           options:["Upper Body","Lower Body","Full Body","Core & Conditioning"] },
  ],
  FUEL: [
    { id:"goal",        label:"NUTRITION GOAL",         options:["Build Muscle","Lose Fat","Maintain & Perform","Improve Recovery"] },
    { id:"diet",        label:"DIETARY PREFERENCE",     options:["Flexible/No restrictions","High Protein Focus","Plant-Based","Low Carb/Keto"] },
    { id:"supplements", label:"SUPPLEMENT EXPERIENCE",  options:["New to supplements","Some experience","Experienced","Advanced stack"] },
    { id:"budget",      label:"SUPPLEMENT BUDGET",      options:["Minimal ($0-30/mo)","Moderate ($30-75/mo)","Premium ($75-150/mo)","No limit"] },
  ],
  FOCUS: [
    { id:"mindsetGoal", label:"MINDSET GOAL",          options:["Build discipline","Reduce stress","Increase confidence","Sharpen focus"] },
    { id:"challenges",  label:"BIGGEST CHALLENGE",     options:["Staying consistent","Negative self-talk","Low motivation","Anxiety/Overwhelm"] },
    { id:"morning",     label:"CURRENT MORNING ROUTINE",options:["None yet","Basic routine","Solid routine","Advanced practice"] },
    { id:"stress",      label:"CURRENT STRESS LEVEL",  options:["Low","Moderate","High","Very High"] },
  ]
};

// - STORE BRIDGE -
const STORE_URL = "https://zs0r6d-2x.myshopify.com";
const STORE_COLLECTIONS = {
  TRAIN: { handle:"train", color:B, headline:(n,w)=>`${n}, your Week ${w} TRAIN stack is ready.`, subline:"Gear and supplements matched to your training profile — delivered.", cta:"Shop Your TRAIN Stack" },
  FUEL:  { handle:"fuel",  color:O, headline:(n,w)=>`${n}, your Week ${w} FUEL stack is ready.`, subline:"Supplements matched to your nutrition goals — ready to order.",    cta:"Shop Your FUEL Stack"  },
  FOCUS: { handle:"focus", color:P, headline:(n,w)=>`${n}, your Week ${w} FOCUS stack is ready.`,subline:"Mindset tools dialed to your program — shop now.",                   cta:"Shop Your FOCUS Stack" },
};

function StoreBridge({ pillar, pillarStates, profile, week, dismissed, onDismiss }) {
  const [clicked, setClicked] = useState(false);
  const activeState = pillarStates?.[pillar];
  if (!activeState || activeState.phase !== "result") return null;
  if (dismissed?.[pillar]) return null;
  const config = STORE_COLLECTIONS[pillar];
  if (!config) return null;
  const name = profile?.firstName || profile?.username || "Athlete";
  const shopUrl = `${STORE_URL}/collections/${config.handle}?utm_source=pll-engine&utm_medium=app&utm_campaign=week${week}-${pillar.toLowerCase()}`;
  const handleShopClick = () => {
    setClicked(true);
    const events = JSON.parse(localStorage.getItem("pll_bridge_clicks")||"[]");
    events.push({ pillar, week, timestamp: new Date().toISOString() });
    localStorage.setItem("pll_bridge_clicks", JSON.stringify(events));
    window.open(shopUrl, "_blank");
  };
  return (
    <div style={{
      margin:"24px 0 8px", borderRadius:"16px",
      background:SURFACE, border:`1.5px solid ${config.color}30`,
      padding:"24px", position:"relative",
      boxShadow:`0 2px 16px ${config.color}10`
    }}>
      <button onClick={()=>onDismiss(pillar)} style={{
        position:"absolute",top:"14px",right:"16px",
        background:"none",border:"none",cursor:"pointer",
        color:MUTED,fontSize:"18px",lineHeight:1,padding:"2px 6px"
      }}>×</button>
      <div style={{
        display:"inline-flex",alignItems:"center",gap:"6px",
        background:`${config.color}12`,color:config.color,
        fontSize:"10px",fontWeight:"800",letterSpacing:"0.14em",
        padding:"4px 12px",borderRadius:"20px",marginBottom:"14px",
        border:`1px solid ${config.color}25`
      }}>
        YOUR STACK IS READY
      </div>
      <div style={{fontSize:"17px",fontWeight:"700",color:NAVY,marginBottom:"6px"}}>
        {config.headline(name,week)}
      </div>
      <div style={{fontSize:"13px",color:SLATE,marginBottom:"18px",lineHeight:"1.5"}}>
        {config.subline}
      </div>
      <button onClick={handleShopClick} style={{
        width:"100%",padding:"14px 20px",
        background:clicked?"#059669":config.color,
        color:"#fff",border:"none",borderRadius:"10px",
        fontSize:"14px",fontWeight:"700",letterSpacing:"0.06em",
        cursor:"pointer",transition:"all 0.2s ease"
      }}>
        {clicked ? "Opening Storeâ€¦" : config.cta}
      </button>
      <div style={{textAlign:"center",fontSize:"11px",color:MUTED,marginTop:"10px"}}>
        Prime Level Living · Ships Direct
      </div>
    </div>
  );
}

// - COACH AVATAR — Realistic portrait based on actual likeness -
// Deep brown skin, salt-and-pepper beard, shaved head, massive build,
// shoulder tattoo, intense upward-gazing expression
function CoachAvatar({ size = 80, pillar = "TRAIN", showRing = true }) {
  const color = pillar === "TRAIN" ? B : pillar === "FUEL" ? O : P;
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: NAVY,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: size * 0.22,
          border: showRing ? `3px solid ${color}` : `2px solid ${BORDER}`,
          boxSizing: "border-box",
          flexShrink: 0
        }}
      >
        PLL
      </div>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: showRing ? `3px solid ${color}` : `2px solid ${BORDER}`,
        boxShadow: showRing ? `0 0 0 4px ${color}22` : "none",
        background: SURFACE2,
        flexShrink: 0
      }}
    >
      <img
  src={`${process.env.PUBLIC_URL}/coach-full.jpg`}
  alt="PLL Coach"
  onError={(e) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/coach.jpg`;
  }}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 35%",
    display: "block"
  }}
/>
        
    </div>
  );
}
function ExerciseVideo({ exerciseName }) {
  const [expanded, setExpanded] = useState(false);
  const videoUrl = getExerciseVideo(exerciseName);
  if (!videoUrl) return (
    <div style={{ width:"100%",height:"110px",background:SURFACE2,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BORDER}` }}>
      <span style={{ fontSize:"12px",color:MUTED }}>No demo available</span>
    </div>
  );
  return (
    <>
      <div onClick={()=>setExpanded(true)}
        style={{ width:"100%",height:"110px",borderRadius:"8px",overflow:"hidden",cursor:"pointer",position:"relative",border:`1.5px solid ${BORDER}`,transition:"border-color 0.2s" }}
        onMouseEnter={e=>e.currentTarget.style.borderColor=B}
        onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
        <iframe src={videoUrl} width="100%" height="100%" style={{border:"none",pointerEvents:"none"}} title={exerciseName}/>
        <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(15,28,46,0.3)" }}>
          <div style={{ width:"38px",height:"38px",borderRadius:"50%",background:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontSize:"14px",marginLeft:"3px" }}>▶</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div onClick={()=>setExpanded(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"20px" }}>
          <div style={{ width:"100%",maxWidth:"800px",position:"relative" }}>
            <button onClick={e=>{e.stopPropagation();setExpanded(false);}} style={{ position:"absolute",top:"-42px",right:0,background:SURFACE,border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px",fontWeight:"700" }}>×</button>
            <div style={{ borderRadius:"12px",overflow:"hidden",aspectRatio:"16/9" }}>
              <iframe src={videoUrl+"?autoplay=1"} width="100%" height="100%" style={{border:"none",display:"block"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={exerciseName}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// - COACH MESSAGE -
function CoachMessage({ message, pillar, name }) {
  const color = PILLARS[pillar].color;
  return (
    <div style={{
      background:SURFACE, border:`1px solid ${BORDER}`,
      borderLeft:`4px solid ${color}`, borderRadius:"12px",
      padding:"20px", display:"flex", gap:"16px",
      alignItems:"flex-start", marginBottom:"28px",
      boxShadow:"0 1px 6px rgba(15,28,46,0.05)"
    }}>
      <div style={{ flexShrink:0 }}>
       <CoachAvatar
  phase={1}
  size={56}
  title="Coach"
  subtitle="Foundation Mentor"
/>
      </div>
      <div>
        <div style={{ fontSize:"10px",fontWeight:"800",color:color,letterSpacing:"2px",marginBottom:"8px" }}>
          COACH MESSAGE
        </div>
        <p style={{ fontSize:"15px",color:NAVY,lineHeight:"1.65",margin:0,fontStyle:"italic" }}>
          "{message}"
        </p>
      </div>
    </div>
  );
}
// - SECTION HEADER -
function SectionLabel({ text, color }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:"10px",margin:"28px 0 14px" }}>
      <div style={{ width:"3px",height:"16px",background:color||NAVY,borderRadius:"2px" }}/>
      <span style={{ fontSize:"11px",fontWeight:"800",color:MUTED,letterSpacing:"2.5px" }}>{text}</span>
    </div>
  );
}

function CoachMediaNote({ exerciseName }) {
  const media = getCoachMedia(exerciseName);

  if (!media) return null;

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "12px",
        background: `${B}10`,
        border: `1px solid ${B}35`,
        borderRadius: "12px",
        fontSize: "12px",
        color: NAVY
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: "900",
          color: B,
          letterSpacing: "1px",
          marginBottom: "6px"
        }}
      >
        PLL COACH MEDIA
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: "900",
          color: NAVY,
          marginBottom: "6px"
        }}
      >
        {media.title}
      </div>

      <div
        style={{
          fontSize: "12px",
          lineHeight: "1.5",
          color: SLATE,
          fontWeight: "700"
        }}
      >
        {media.coachTip}
      </div>
    </div>
  );
}

// - TRAIN RESULT -
function TrainResult({ data, name, week, onDownload }) {
  const [activeDay, setActiveDay] = useState(0);
  if (!data?.days) return null;
  const day = data.days[activeDay];
  return (
    <div style={{ paddingBottom:"40px" }}>
      {/* Header card */}
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:B,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} · TRAIN</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px",letterSpacing:"-0.3px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && (
  <CoachMessage
    message={data.coachMessage}
    pillar="TRAIN"
    name={name}
  />
)}

{day.exercises?.[0]?.name && (
  <CoachMediaNote exerciseName={day.exercises[0].name} />
)}

{/* Day Tabs */}
      <div style={{ display:"flex",gap:"8px",marginBottom:"24px",flexWrap:"wrap" }}>
        {data.days.map((d,i) => (
          <button key={i} onClick={()=>setActiveDay(i)} style={{
            padding:"10px 18px",borderRadius:"10px",
            border: activeDay===i ? "none" : `1.5px solid ${BORDER}`,
            background: activeDay===i ? `${B}22` : SURFACE,
color: activeDay===i ? B : SLATE,
boxShadow: "none"
          
          }}>DAY {d.day}</button>
        ))}
      </div>

      {day && (
        <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 10px rgba(15,28,46,0.05)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
            <h3 style={{ fontSize:"18px",fontWeight:"800",color:NAVY,margin:0 }}>{day.title}</h3>
            <span style={{ fontSize:"12px",color:MUTED,background:SURFACE2,padding:"4px 12px",borderRadius:"20px",border:`1px solid ${BORDER}` }}>{day.duration}</span>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px" }}>
            {day.exercises?.map((ex,i) => (
              <div key={i} style={{ background:BG,borderRadius:"12px",padding:"16px",border:`1px solid ${BORDER}` }}>
                <ExerciseVideo exerciseName={ex.name} />
<CoachMediaNote exerciseName={ex.name} />
<CoachExerciseReason
    exerciseName={ex.name}
    muscle={ex.muscle}
/>

<div style={{ marginTop:"12px" }}>
                  <div style={{ fontWeight:"800",fontSize:"14px",color:NAVY,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"0.3px" }}>{ex.name}</div>
                  <div style={{ fontSize:"11px",color:B,fontWeight:"700",marginBottom:"10px",letterSpacing:"0.5px" }}>{ex.muscle}</div>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"10px" }}>
                    {[["SETS",ex.sets],["REPS",ex.reps],["TEMPO",ex.tempo],["REST",ex.rest]].map(([label,val])=>(
                      <div key={label} style={{ background:SURFACE,borderRadius:"8px",padding:"8px",border:`1px solid ${BORDER}` }}>
                        <div style={{ fontSize:"9px",color:MUTED,fontWeight:"800",letterSpacing:"1px",marginBottom:"2px" }}>{label}</div>
                        <div style={{ fontSize:"13px",fontWeight:"800",color:NAVY }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:`${B}0D`,borderRadius:"8px",padding:"10px 12px",border:`1px solid ${B}20` }}>
                    <span style={{ fontSize:"10px",fontWeight:"800",color:B,marginRight:"6px" }}>FORM CUE:</span>
                    <span style={{ fontSize:"12px",color:SLATE }}>{ex.formCue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {day.tips && (
            <div style={{ marginTop:"20px" }}>
              <SectionLabel text="COACH TIPS" color={B}/>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"10px" }}>
                {day.tips.map((tip,i) => (
                  <div key={i} style={{ background:SURFACE,borderRadius:"10px",padding:"14px 16px",border:`1px solid ${BORDER}` }}>
                    <div style={{ fontSize:"10px",fontWeight:"800",color:B,marginBottom:"6px" }}>TIP {i+1}</div>
                    <p style={{ fontSize:"13px",color:SLATE,margin:0,lineHeight:"1.5" }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button
  onClick={onDownload}
  style={{
    width:"100%",
    padding:"16px",
    borderRadius:"12px",
    border:`1.5px solid ${B}35`,
    background:`${B}12`,
    color:B,
    fontWeight:"800",
    fontSize:"14px",
    cursor:"pointer",
    letterSpacing:"1.5px",
    marginTop:"24px",
    boxShadow:"0 4px 18px rgba(15,111,216,0.18)"
  }}
>
  DOWNLOAD WEEK {week} TRAIN BLUEPRINT
</button>
    
    </div>
  );
}

// - FUEL RESULT -
function FuelResult({ data, name, week, onDownload }) {
  if (!data?.supplements) return null;
  return (
    <div style={{ paddingBottom:"40px" }}>
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:O,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} · FUEL</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && (
  <CoachMessage
    message={data.coachMessage}
    pillar="FUEL"
    name={name}
  />
)}

{data.supplements?.[0]?.name && (
  <CoachMediaNote exerciseName={data.supplements[0].name} />
)}

<SectionLabel text="SUPPLEMENT STACK" color={O}/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"14px",marginBottom:"28px" }}>
        {data.supplements?.map((s,i) => (
          <div key={i} style={{ background:SURFACE,borderRadius:"12px",padding:"18px",border:`1px solid ${BORDER}`,boxShadow:"0 1px 6px rgba(15,28,46,0.05)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px" }}>
              <div>
                <div style={{ fontWeight:"800",fontSize:"14px",color:NAVY,textTransform:"uppercase",letterSpacing:"0.3px" }}>{s.name}</div>
                <div style={{ fontSize:"11px",color:O,fontWeight:"700",marginTop:"2px" }}>{s.category}</div>
              </div>
              <span style={{
                background: s.priority==="Essential" ? `${O}15` : s.priority==="Recommended" ? `${B}12` : `${G}12`,
                color: s.priority==="Essential" ? O : s.priority==="Recommended" ? B : G,
                fontSize:"10px",fontWeight:"800",padding:"4px 10px",borderRadius:"20px",
                border: `1px solid ${s.priority==="Essential" ? O+"30" : s.priority==="Recommended" ? B+"25" : G+"25"}`,
                whiteSpace:"nowrap"
              }}>{s.priority}</span>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:"10px" }}>
              {[["DOSE",s.dose],["TIMING",s.timing]].map(([label,val])=>(
                <div key={label} style={{ background:SURFACE2,borderRadius:"8px",padding:"8px",border:`1px solid ${BORDER}` }}>
                  <div style={{ fontSize:"9px",color:MUTED,fontWeight:"800",letterSpacing:"1px",marginBottom:"2px" }}>{label}</div>
                  <div style={{ fontSize:"12px",fontWeight:"700",color:NAVY }}>{val}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize:"13px",color:SLATE,margin:0,lineHeight:"1.5" }}>{s.benefit}</p>
          </div>
        ))}
      </div>

      {data.nutrition && (
        <>
          <SectionLabel text="NUTRITION TARGETS" color={O}/>
          <div style={{ background:SURFACE,borderRadius:"16px",padding:"20px",border:`1px solid ${BORDER}`,marginBottom:"24px" }}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"16px" }}>
              {[["CALORIES",data.nutrition.calories,O],["PROTEIN",data.nutrition.protein,B],["CARBS",data.nutrition.carbs,G],["FATS",data.nutrition.fats,P]].map(([label,val,color])=>(
                <div key={label} style={{ textAlign:"center",background:`${color}0D`,borderRadius:"10px",padding:"14px 8px",border:`1px solid ${color}20` }}>
                  <div style={{ fontSize:"9px",fontWeight:"800",color,letterSpacing:"1px",marginBottom:"4px" }}>{label}</div>
                  <div style={{ fontSize:"15px",fontWeight:"800",color:NAVY }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background:SURFACE2,borderRadius:"8px",padding:"12px",border:`1px solid ${BORDER}` }}>
              <span style={{ fontSize:"10px",fontWeight:"800",color:O,marginRight:"8px" }}>MEAL TIMING:</span>
              <span style={{ fontSize:"13px",color:SLATE }}>{data.nutrition.mealTiming}</span>
            </div>
          </div>
        </>
      )}

      {data.mealPlan && (
        <>
          <SectionLabel text="MEAL PLAN" color={O}/>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"12px",marginBottom:"24px" }}>
            {data.mealPlan.map((meal,i) => (
              <div key={i} style={{ background:SURFACE,borderRadius:"12px",padding:"16px",border:`1px solid ${BORDER}` }}>
                <div style={{ fontWeight:"800",fontSize:"14px",color:NAVY,marginBottom:"4px" }}>{meal.meal}</div>
                <div style={{ fontSize:"11px",color:O,marginBottom:"10px",fontWeight:"600" }}>{meal.timing}</div>
                {meal.foods?.map((f,j) => (
                  <div key={j} style={{ fontSize:"13px",color:SLATE,padding:"3px 0",borderBottom:j<meal.foods.length-1?`1px solid ${BORDER}`:"none" }}>· {f}</div>
                ))}
                {meal.macros && <div style={{ fontSize:"11px",color:MUTED,marginTop:"8px",fontWeight:"600" }}>{meal.macros}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={onDownload} style={{
        width:"100%",padding:"16px",borderRadius:"12px",border:`1.5px solid ${O}30`,
        background:'${O}22',color:O,fontWeight:"800",fontSize:"14px",
        cursor:"pointer",letterSpacing:"1.5px",boxShadow:"none"
      }}>DOWNLOAD WEEK {week} FUEL BLUEPRINT</button>
    </div>
  );
}

// - FOCUS RESULT -
function FocusResult({ data, name, week, onDownload }) {
  if (!data?.dailyPractices) return null;
  return (
    <div style={{ paddingBottom:"40px" }}>
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:P,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} · FOCUS</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && (
  <CoachMessage
    message={data.coachMessage}
    pillar="FOCUS"
    name={name}
  />
)}

{data.dailyPractices?.[0]?.name && (
  <CoachMediaNote exerciseName={data.dailyPractices[0].name} />
)}

      <SectionLabel text="DAILY PRACTICES" color={P}/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"14px",marginBottom:"28px" }}>
        {data.dailyPractices?.map((p,i) => (
          <div key={i} style={{ background:SURFACE,borderRadius:"12px",padding:"18px",border:`1px solid ${BORDER}`,boxShadow:"0 1px 6px rgba(15,28,46,0.04)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px" }}>
              <div style={{ fontWeight:"800",fontSize:"14px",color:NAVY }}>{p.name}</div>
              <span style={{ background:`${P}12`,color:P,fontSize:"10px",fontWeight:"700",padding:"3px 10px",borderRadius:"20px",border:`1px solid ${P}25`,whiteSpace:"nowrap" }}>{p.duration}</span>
            </div>
            <div style={{ fontSize:"11px",color:P,fontWeight:"700",marginBottom:"8px" }}>{p.timing}</div>
            <p style={{ fontSize:"13px",color:SLATE,margin:"0 0 10px",lineHeight:"1.5" }}>{p.description}</p>
            <div style={{ background:`${P}0D`,borderRadius:"8px",padding:"8px 10px",border:`1px solid ${P}18` }}>
              <span style={{ fontSize:"10px",fontWeight:"800",color:P,marginRight:"6px" }}>WHY:</span>
              <span style={{ fontSize:"12px",color:SLATE }}>{p.benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {data.weeklyChallenge && (
        <>
          <SectionLabel text="WEEKLY CHALLENGE" color={P}/>
          <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",border:`1px solid ${BORDER}`,marginBottom:"24px" }}>
            <h4 style={{ fontSize:"18px",fontWeight:"800",color:NAVY,margin:"0 0 8px" }}>{data.weeklyChallenge.title}</h4>
            <p style={{ fontSize:"14px",color:SLATE,margin:"0 0 18px",lineHeight:"1.6" }}>{data.weeklyChallenge.description}</p>
            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {data.weeklyChallenge.dailyActions?.map((action,i) => (
                <div key={i} style={{ display:"flex",alignItems:"center",gap:"14px" }}>
                  <div style={{ width:"28px",height:"28px",borderRadius:"50%",background:`${P}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1.5px solid ${P}30` }}>
                    <span style={{ fontSize:"11px",fontWeight:"800",color:P }}>D{i+1}</span>
                  </div>
                  <span style={{ fontSize:"14px",color:NAVY }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {data.affirmations && (
        <>
          <SectionLabel text="AFFIRMATIONS" color={P}/>
          <div style={{ marginBottom:"24px",display:"flex",flexDirection:"column",gap:"8px" }}>
            {data.affirmations.map((aff,i) => (
              <div key={i} style={{ background:SURFACE,borderRadius:"10px",padding:"14px 18px",border:`1px solid ${BORDER}`,display:"flex",gap:"14px",alignItems:"flex-start" }}>
                <div style={{ width:"4px",height:"4px",borderRadius:"50%",background:P,flexShrink:0,marginTop:"8px" }}/>
                <p style={{ margin:0,fontSize:"14px",color:NAVY,fontStyle:"italic",lineHeight:"1.6" }}>{aff}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {data.sleepProtocol && (
        <>
          <SectionLabel text="SLEEP PROTOCOL" color={P}/>
          <div style={{ background:SURFACE,borderRadius:"16px",padding:"20px",border:`1px solid ${BORDER}`,marginBottom:"24px" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px" }}>
              {[["BEDTIME",data.sleepProtocol.bedtime],["WAKE TIME",data.sleepProtocol.wakeTime]].map(([label,val])=>(
                <div key={label} style={{ background:`${P}0D`,borderRadius:"10px",padding:"14px",border:`1px solid ${P}18` }}>
                  <div style={{ fontSize:"10px",fontWeight:"800",color:P,letterSpacing:"1px",marginBottom:"4px" }}>{label}</div>
                  <div style={{ fontSize:"18px",fontWeight:"800",color:NAVY }}>{val}</div>
                </div>
              ))}
            </div>
            {data.sleepProtocol.practices?.map((practice,i) => (
              <div key={i} style={{ display:"flex",gap:"10px",alignItems:"center",padding:"8px 0",borderBottom:i<data.sleepProtocol.practices.length-1?`1px solid ${BORDER}`:"none" }}>
                <div style={{ width:"6px",height:"6px",borderRadius:"50%",background:P,flexShrink:0 }}/>
                <span style={{ fontSize:"14px",color:SLATE }}>{practice}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
  onClick={onDownload}
  style={{
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: `1.5px solid ${P}30`,
    background: `${P}12`,
    color: P,
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer",
    letterSpacing: "1.5px",
    marginTop: "24px",
    boxShadow: "0 4px 18px rgba(124,58,237,0.15)"
  }}
>
  DOWNLOAD WEEK {week} FOCUS BLUEPRINT
</button>
    
    </div>
  );
}

// - LOADING -
function Loading({ pillar, name, week }) {
  const p = PILLARS[pillar];
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const t = setInterval(()=>setDots(d=>d.length>=3?".":d+"."),500);
    return ()=>clearInterval(t);
  },[]);
  return (
  <div
    style={{
      display:"grid",
      gridTemplateColumns:"1fr 380px",
      gap:"32px",
      alignItems:"center",
      maxWidth:"1100px",
      margin:"0 auto",
      padding:"60px 20px"
    }}
>
<div style={{ textAlign:"center" }}>
      <CoachAvatar size={80} pillar={pillar}/>
      <div style={{ marginTop:"24px",marginBottom:"8px" }}>
        <span style={{ fontSize:"13px",fontWeight:"800",color:p.color,letterSpacing:"2px" }}>GENERATING{dots}</span>
      </div>
      <div style={{ fontSize:"22px",fontWeight:"800",color:NAVY,marginBottom:"6px" }}>Building Your {pillar} Blueprint</div>
      <div style={{ fontSize:"14px",color:SLATE,marginBottom:"24px" }}>Personalizing for {name} — Week {week}</div>
      <div style={{ width:"200px",height:"3px",background:BORDER,borderRadius:"2px",margin:"0 auto",overflow:"hidden" }}>
        <div style={{ height:"100%",background:p.color,borderRadius:"2px",animation:"pllLoad 2s ease-in-out infinite" }}/>
      </div>
      <style>{`@keyframes pllLoad{0%{width:0%}50%{width:80%}100%{width:100%}}`}</style>
    </div>
    <div
      style={{
        background:SURFACE,
        border:`1px solid ${BORDER}`,
        borderRadius:"20px",
        padding:"20px",
        textAlign:"left"
      }}
    >
      <div style={{ fontSize:"10px", fontWeight:"800", letterSpacing:"2px", color:O, marginBottom:"10px" }}>
        PLL STORE FEATURED
      </div>

      <div
        style={{
          aspectRatio:"16 / 9",
          background:"#111827",
          borderRadius:"12px",
          marginBottom:"14px",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:MUTED,
          fontSize:"13px"
        }}
      >
        STORE PROMO VIDEO
      </div>

      <div style={{ fontSize:"18px", fontWeight:"800", color:NAVY, marginBottom:"8px" }}>
        Upgrade Your Results Faster
      </div>

      <div style={{ fontSize:"13px", color:SLATE, lineHeight:"1.6" }}>
        Recommended supplements, training gear and recovery tools selected for your PLL journey.
      </div>
    </div>
</div>
  );
}

// - INTAKE FORM -
function IntakeForm({ pillar, profile, onGenerate }) {
  const p = PILLARS[pillar];
  const questions = INTAKE[pillar];
  const [answers, setAnswers] = useState(profile?.answers?.[pillar]||{});
  const allAnswered = questions.every(q=>answers[q.id]);
  return (
    <div style={{ paddingBottom:"40px" }}>
      {/* Coach intro banner */}
      <div style={{
        background:SURFACE,borderRadius:"16px",padding:"20px 24px",
        marginBottom:"28px",display:"flex",gap:"16px",alignItems:"center",
        border:`1px solid ${BORDER}`,boxShadow:"0 2px 10px rgba(15,28,46,0.05)"
      }}>
        <CoachAvatar size={64} pillar={pillar}/>
        <div>
          <div style={{ fontSize:"10px",fontWeight:"800",color:p.color,letterSpacing:"2px",marginBottom:"6px" }}>YOUR COACH</div>
          <div style={{ fontSize:"15px",fontWeight:"700",color:NAVY,lineHeight:"1.5" }}>
            Tell me about yourself and I'll build your personalized {p.label} blueprint.
          </div>
          <div style={{ fontSize:"12px",color:MUTED,marginTop:"4px" }}>Week {profile?.week||1} · {WEEKS[profile?.week||1]?.theme}</div>
        </div>
      </div>

      {questions.map(q => (
        <div key={q.id} style={{ marginBottom:"24px" }}>
          <div style={{ fontSize:"11px",fontWeight:"800",color:MUTED,letterSpacing:"2px",marginBottom:"10px" }}>{q.label}</div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
            {q.options.map(opt => {
              const active = answers[q.id]===opt;
              return (
                <button key={opt} onClick={()=>setAnswers(a=>({...a,[q.id]:opt}))} style={{
                  padding:"11px 18px",borderRadius:"10px",
                  border: active ? `1.5px solid ${p.color}` : `1.5px solid ${BORDER}`,
                  background: active ? `${p.color}12` : SURFACE,
color: active ? p.color : SLATE,
boxShadow: active ? `0 2px 10px ${p.color}20` : "none"
                }}>{opt}</button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={()=>allAnswered && onGenerate(answers)}
        style={{
          width:"100%",padding:"17px",borderRadius:"12px",border:"none",
          background: allAnswered ? `${B}22` : BORDER_MID,
color: allAnswered ? B : MUTED,
boxShadow: "none",
          transition:"all 0.2s"
        }}>
        {allAnswered ? `GENERATE MY WEEK ${profile?.week||1} ${pillar} BLUEPRINT` : "COMPLETE ALL SELECTIONS ABOVE"}
      </button>
    </div>
  );
}

// - PDF DOWNLOAD -
function downloadPDF(data, pillar, name, week) {
  const w = window.open("","_blank");
  w.document.write(`<html><head><title>PLL ${pillar} Week ${week} — ${name}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:40px 32px;color:#0F1C2E;background:#fff;}
  h1{font-size:28px;font-weight:800;color:#0F1C2E;margin:0 0 8px;}
  .tag{display:inline-block;background:#EFF6FF;color:#1D6FD8;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;margin-bottom:16px;}
  pre{white-space:pre-wrap;font-family:inherit;font-size:13px;line-height:1.6;color:#3D4F63;}
  .footer{margin-top:40px;padding-top:20px;border-top:1px solid #E1E7EE;font-size:11px;color:#8496A9;letter-spacing:2px;}
</style>
</head><body>
<h1>${data.title||`${pillar} Week ${week} Blueprint`}</h1>
<span class="tag">PRIME LEVEL LIVING · ${name} · WEEK ${week}</span>
<p style="color:#3D4F63;font-size:15px;">${data.subtitle||""}</p>
${data.coachMessage?`<div style="border-left:4px solid #1D6FD8;padding:16px 20px;margin:20px 0;background:#F7F8FA;border-radius:0 8px 8px 0;"><strong>Coach Message:</strong><br/><em>${data.coachMessage}</em></div>`:""}
<pre>${JSON.stringify(data,null,2)}</pre>
<div class="footer">PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK ${week} OF 3</div>
</body></html>`);
  w.document.close();
  setTimeout(()=>w.print(),500);
}

// - PILLAR NAV BUTTON -
function PillarButton({ pillar, active, done, onClick }) {
  const p = PILLARS[pillar];
  const color = p.color;

  return (
    <button onClick={onClick} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
      padding: "10px 14px",
      minWidth: "72px",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: active
        ? `1.5px solid ${color}35`
        : done
        ? `1.5px solid ${color}35`
        : `1.5px solid ${BORDER}`,
      background: active
        ? `${color}18`
        : done
        ? `${color}0D`
        : SURFACE,
      boxShadow: "none"
    }}>
      <div style={{ opacity: active || done ? 1 : 0.5 }}>
        {p.icon}
      </div>

      <span style={{
        fontSize: "10px",
        fontWeight: "800",
        letterSpacing: "1.5px",
        color: active ? color : done ? color : MUTED
      }}>
        {pillar}
      </span>

      {done && !active && (
        <span style={{
          fontSize: "9px",
          fontWeight: "800",
          color,
          background: `${color}15`,
          padding: "1px 6px",
          borderRadius: "10px",
          border: `1px solid ${color}25`,
          letterSpacing: "0.5px"
        }}>
          DONE
        </span>
      )}
    </button>
  );
}
// ── SPRINT 1: PLL COACH + PHASE ENGINE ────────────────────────────────

const PLL_PROGRESS_KEY = "progress_history";

const getPhaseFromWeek = (week) => {
  const w = Number(week) || 1;

  if (w >= 1 && w <= 3) return 1;
  if (w >= 4 && w <= 6) return 2;
  return 3;
};

const getCoachMode = (phase) => {
  if (phase === 1) {
    return {
      phaseName: "Mentor",
      coachTitle: "The Performance Architect",
      accent: "#1D6FD8",
      tone: "Calm. Grounded. Foundation-focused.",
      badge: "PHASE 1 · MENTOR"
    };
  }

  if (phase === 2) {
    return {
      phaseName: "Strategist",
      coachTitle: "The Performance Architect",
      accent: "#D4AF37",
      tone: "Precise. Analytical. Execution-focused.",
      badge: "PHASE 2 · STRATEGIST"
    };
  }

  return {
    phaseName: "Commander",
    coachTitle: "The Performance Architect",
    accent: "#111827",
    tone: "Direct. Decisive. Standards-focused.",
    badge: "PHASE 3 · COMMANDER"
  };
};

const getCoachVoiceLine = ({ phase, week, pillar, memory }) => {
  const PILLAR = String(pillar || "-").toUpperCase();
  const level = memory?.coachLevel || "Foundation";
  const generated = memory?.generatedBlueprints || 0;
  const strongest = memory?.strongestPillar || "TRAIN";
  const weakest = memory?.weakestPillar || "FOCUS";
  const preferred = memory?.preferredPillar || PILLAR;

  if (generated === 0) {
    return `Week ${week}. ${PILLAR} begins with standards, not motivation. Build the foundation.`;
  }

  if (phase === 1) {
    return `Week ${week}. Coach Level: ${level}. You have generated ${generated} blueprint${generated === 1 ? "" : "s"}. ${PILLAR} is your current focus.`;
  }

  if (phase === 2) {
    return `Week ${week}. You are moving beyond introduction. Strongest pillar: ${strongest}. Weakest pillar: ${weakest}. Execute ${PILLAR} with sharper discipline.`;
  }

  const commanderLines = [
  `Week ${week}. You've earned consistency. Protect it.`,
  `Week ${week}. Discipline has become identity.`,
  `Week ${week}. Champions repeat winning habits.`,
  `Week ${week}. Your standards are rising.`,
  `Week ${week}. Stay dangerous. Stay disciplined.`,
  `Week ${week}. Momentum belongs to those who refuse to quit.`,
  `Week ${week}. Excellence is now your baseline.`,
  `Week ${week}. Finish strong. Leaders finish what they start.`,
  `Week ${week}. Quiet work creates loud results.`,
  `Week ${week}. Every blueprint completed builds the next version of you.`,
  `Week ${week}. Small victories become permanent habits.`,
  `Week ${week}. Stay patient. Stay relentless.`,
  `Week ${week}. Progress compounds when discipline never misses.`,
  `Week ${week}. Today's work becomes tomorrow's confidence.`,
  `Week ${week}. Elite performers never negotiate with excuses.`
];

return commanderLines[
  Math.floor(Math.random() * commanderLines.length)
];
};

// — SPRINT 6.1: ATHLETE READINESS ENGINE —
const getAthleteReadiness = ({ profile = {}, memory = {}, week = 1 }) => {
  const age = Number(profile.age) || 0;
  const weight = Number(profile.weight) || 0;
  const goalWeight = Number(profile.goalWeight) || 0;
  const streak = Number(memory.streak) || 0;
  const generated = Number(memory.generatedBlueprints) || 0;

  let score = 70;

  if (streak >= 3) score += 10;
  if (generated >= 6) score += 8;
  if (age >= 55) score -= 6;
  if (weight && goalWeight && goalWeight > weight) score -= 4;
  if (week >= 3) score += 5;

  score = Math.max(35, Math.min(100, score));

  return {
    score,
    status:
      score >= 85 ? "PRIMED" :
      score >= 70 ? "READY" :
      score >= 55 ? "CONTROLLED" :
      "RECOVERY PRIORITY",
    coachLine:
      score >= 85 ? "You are primed. Push with control." :
      score >= 70 ? "You are ready. Execute with discipline." :
      score >= 55 ? "Control the pace. Quality first." :
      "Recovery leads today. Protect the body."
  };
};

const loadProgressHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("pll_" + PLL_PROGRESS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveProgressEntry = (entry) => {
  try {
    const history = loadProgressHistory();

    const updated = [
      ...history,
      {
        ...entry,
        id: Date.now(),
        date: new Date().toISOString()
      }
    ];

    localStorage.setItem("pll_" + PLL_PROGRESS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

const getCurrentStreak = (history = []) => {
  if (!history.length) return 0;

  const dates = [
    ...new Set(history.map(item => new Date(item.date).toDateString()))
  ];

  return dates.length;
};

// ── SPRINT 2 RESERVED MODULES — DO NOT ACTIVATE IN SPRINT 1 ───────────

const CoachKnowledgeLibrary = {};
const ExerciseLibrary = {};
const ProgressTracker = {};
const VideoLessonLibrary = {};
const CommunityModule = {};
const StoreRecommendationEngine = {};

// ====================================================
// PLL COACH MEMORY ENGINE — SPRINT 2.1
// ====================================================

const COACH_MEMORY_KEY = "pll_coach_memory";

const CoachMemory = {
  load() {
    try {
      return JSON.parse(
        localStorage.getItem(COACH_MEMORY_KEY)
      ) || {
        streak: 0,
        completedWeeks: [],
        generatedBlueprints: 0,
        lastPillar: null,
        lastVisit: null,
        coachLevel: "Foundation",
pillarCounts:{
  TRAIN:0,
  FUEL:0,
  FOCUS:0
},
strongestPillar:"TRAIN",
weakestPillar:"FOCUS",
preferredPillar:"TRAIN"
      };
    } catch {
      return {
  streak: 0,
  completedWeeks: [],
  generatedBlueprints: 0,
  lastPillar: null,
  lastVisit: null,
  coachLevel: "Foundation",
  pillarCounts:{
    TRAIN:0,
    FUEL:0,
    FOCUS:0
  },
  strongestPillar:"TRAIN",
  weakestPillar:"FOCUS",
  preferredPillar:"TRAIN"
};
    }
  },

  save(memory) {
    localStorage.setItem(
      COACH_MEMORY_KEY,
      JSON.stringify(memory)
    );
  }
};

const updateCoachMemory = (pillar) => {
  
  const memory = CoachMemory.load();
  
memory.generatedBlueprints += 1;

memory.lastPillar = pillar;

memory.lastVisit = new Date().toISOString();

memory.pillarCounts = memory.pillarCounts || {
  TRAIN: 0,
  FUEL: 0,
  FOCUS: 0
};

memory.pillarCounts[pillar] += 1;

const entries = Object.entries(memory.pillarCounts);

entries.sort((a,b)=>b[1]-a[1]);

memory.strongestPillar = entries[0][0];
memory.weakestPillar = entries[2][0];

memory.preferredPillar = pillar;

if (memory.generatedBlueprints >= 30) {
  memory.coachLevel = "Elite";
} else if (memory.generatedBlueprints >= 15) {
  memory.coachLevel = "Advanced";
} else if (memory.generatedBlueprints >= 5) {
  memory.coachLevel = "Developing";
} else {
  memory.coachLevel = "Foundation";
}

  CoachMemory.save(memory);

  return memory;
};

const getCoachMemory = () => {
  return CoachMemory.load();
};

const resetCoachMemory = () => {
  localStorage.removeItem(COACH_MEMORY_KEY);
};

// ====================================================
// PLL BLUEPRINT INTELLIGENCE ENGINE — SPRINT 2.2
// ====================================================

const getBlueprintDifficulty = (memory = {}) => {
  const level = memory?.coachLevel || "Foundation";

  switch (level) {
    case "Elite":
      return "Elite Performance";
    case "Advanced":
      return "Advanced Progression";
    case "Developing":
      return "Progressive Development";
    default:
      return "Foundation Building";
  }
};

const getPlateauStatus = (pillar, memory = {}) => {
  const count = memory?.pillarCounts?.[pillar] || 0;

  return {
    plateau: count >= 8,
    count
  };
};

const getBalanceRecommendation = (pillar, memory = {}) => {
  const strongest = memory?.strongestPillar;
  const weakest = memory?.weakestPillar;

  if (pillar === weakest) {
    return "Extra attention should be given to this pillar because it is currently the user's weakest area.";
  }

  if (pillar === strongest) {
    return "Increase challenge because this is currently the user's strongest pillar.";
  }

  return "Maintain balanced development across all pillars.";
};

const getBlueprintEvolution = (week) => {
  if (week === 1) {
    return "Focus on foundation, habit formation, and consistency.";
  }

  if (week === 2) {
    return "Increase challenge and accountability from Week 1.";
  }

  if (week === 3) {
    return "Create separation. Raise standards and intensity.";
  }

  return "Continue progressive advancement.";
};

const buildBlueprintIntelligence = ({
  pillar,
  week,
  memory,
  weight,
  goalWeight
}) => {
  
  const difficulty =
    getBlueprintDifficulty(memory);

  const plateau =
    getPlateauStatus(pillar, memory);

  const balance =
    getBalanceRecommendation(
      pillar,
      memory
    );

  const evolution =
    getBlueprintEvolution(week);

  return `
PLL COACH INTELLIGENCE

Coach Level:
${memory?.coachLevel || "Foundation"}

Difficulty:
${difficulty}

Current Streak:
${memory?.streak || 0}

Generated Blueprints:
${memory?.generatedBlueprints || 0}

Athlete Weight:
${weight ? `${weight} lbs` : "Not provided."}

Goal Weight:
${goalWeight ? `${goalWeight} lbs` : "Not provided."}

Weight Goal Direction:
${
  weight && goalWeight
    ? Number(goalWeight) > Number(weight)
      ? "Gain weight / build muscle emphasis."
      : Number(goalWeight) < Number(weight)
        ? "Lose weight / fat loss emphasis."
        : "Maintain weight / recomposition emphasis."
    : "Not enough data."
}

Strongest Pillar:
${memory?.strongestPillar || "TRAIN"}

Weakest Pillar:
${memory?.weakestPillar || "FOCUS"}

Preferred Pillar:
${memory?.preferredPillar || pillar}

Plateau Detected:
${plateau.plateau ? "YES" : "NO"}

Balance Recommendation:
${balance}

Blueprint Evolution:
${evolution}

Coaching Rules:

- Avoid generic advice.
- Progress from previous success.
- Increase challenge based on coach level.
- Reference strengths and weaknesses.
- Adjust difficulty dynamically.
`;
};

// ====================================================
// PLL MOMENTUM INTELLIGENCE ENGINE — SPRINT 2.3
// ====================================================

const getTrueStreak = (history = []) => {
  if (!history.length) return 0;

  const dates = [
    ...new Set(
      history.map(item =>
        new Date(item.date).toDateString()
      )
    )
  ]
    .map(date => new Date(date))
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 0; i < dates.length - 1; i++) {
    const diff =
      (dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

const getMomentumScore = ({
  streak = 0,
  completedPillars = [],
  coachMemory = {}
}) => {
  const streakScore = Math.min(streak * 10, 40);
  const pillarScore = completedPillars.length * 20;
  const memoryScore = Math.min(
    (coachMemory.generatedBlueprints || 0) * 2,
    20
  );

  return Math.min(
    streakScore + pillarScore + memoryScore,
    100
  );
};

const getMomentumStatus = (score) => {
  if (score >= 85) return "Elite Momentum";
  if (score >= 65) return "Building Strong";
  if (score >= 40) return "Gaining Rhythm";
  return "Foundation Mode";
};

const getRecoveryStatus = (history = []) => {
  if (!history.length) return "New Start";

  const latest = history
    .map(item => new Date(item.date))
    .sort((a, b) => b - a)[0];

  const today = new Date();
  const diffDays = Math.floor(
    (today - latest) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "On Track";
  if (diffDays === 1) return "Still Close";
  if (diffDays <= 3) return "Needs Reconnect";
  return "Comeback Needed";
};

const getMomentumCoachLine = ({
  score,
  streak,
  recoveryStatus,
  name
}) => {
  if (recoveryStatus === "Comeback Needed") {
    return `${name}, no guilt. Just restart. Momentum comes back when you show up again.`;
  }

  if (score >= 85) {
    return `${name}, you're operating at a high level. Protect this rhythm.`;
  }

  if (score >= 65) {
    return `${name}, you're building real consistency. Keep stacking wins.`;
  }

  if (streak >= 2) {
    return `${name}, the rhythm is starting. Do not break the chain.`;
  }

  return `${name}, today is about showing up and rebuilding momentum.`;
};

export default function App() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  const workoutMovementPatterns = selectedWorkout.reduce((acc, exercise) => {
  acc[exercise.movementPattern] = (acc[exercise.movementPattern] || 0) + 1;
  return acc;
}, {});

  const workoutBalanceFeedback = (() => {
  if (selectedWorkout.length === 0) return "Select exercises to begin workout evaluation.";

  const hasPush = workoutMovementPatterns.push > 0;
  const hasPull = workoutMovementPatterns.pull > 0;
  const hasLower =
    workoutMovementPatterns.squat > 0 ||
    workoutMovementPatterns.hinge > 0;

  if (!hasPush) return "Coach note: Add at least one push movement.";
  if (!hasPull) return "Coach note: Add at least one pull movement.";
  if (!hasLower) return "Coach note: Add at least one lower-body movement.";
  if (selectedWorkout.length < 4) return "Coach note: Add at least 4 exercises for a stronger starter workout.";

  return "Coach note: Balanced starter workout selected.";
})();
  
  const [screen, setScreen] = useState("login");
  const [profile, setProfile] = useState(null);
  const [activePillar, setActivePillar] = useState("TRAIN");
  const [pillarStates, setPillarStates] = useState({ TRAIN:{phase:"intake"}, FUEL:{phase:"intake"}, FOCUS:{phase:"intake"} });
  const [completedPillars, setCompletedPillars] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [bridgeDismissed, setBridgeDismissed] = useState({});
  const [loginForm, setLoginForm] = useState({ username:"", password:"" });
  const [createForm, setCreateForm] = useState({
  firstName: "",
  username: "",
  email: "",
  password: "",
  gender: "",
  ageRange: "",
  weight: "",
goalWeight: ""
});
  
  const [loginMode, setLoginMode] = useState("signin");
  const [loginError, setLoginError] = useState("");

  const [coachMemory, setCoachMemory] =
useState(getCoachMemory());

// SPRINT 5.1 — COACH ANIMATION STATE
const [coachBlink, setCoachBlink] = useState(false);

  const [coachSpeaking, setCoachSpeaking] = useState(false);

  const upd = (pillar, update) => setPillarStates(prev=>({...prev,[pillar]:{...prev[pillar],...update}}));
  const st = pillarStates[activePillar];
  const week = profile?.week || 1;
  const name = profile?.firstName || profile?.username || "Athlete";

  const phase = getPhaseFromWeek(week);

const coachMode = getCoachMode(phase);

  const coachMessage = getCoachVoiceLine({
  phase,
  week,
  pillar: activePillar,
  memory: coachMemory
});

  const readiness = {
  score: 70,
  status: "READY",
  coachLine: "You are ready. Execute with discipline.",
  color: B
};

  const progressHistory = loadProgressHistory();

const currentStreak =
  typeof getTrueStreak === "function"
    ? getTrueStreak(progressHistory)
    : getCurrentStreak(progressHistory);

const momentumScore =
  getMomentumScore({
    streak: currentStreak,
    completedPillars,
    coachMemory
  });
  
const momentumStatus =
  getMomentumStatus(momentumScore);
  
const recoveryStatus =
  getRecoveryStatus(progressHistory);
  
const momentumCoachLine =
  getMomentumCoachLine({
    score: momentumScore,
    streak: currentStreak,
    recoveryStatus,
    name
  });

  // Sprint 6.5 Adaptive Recommendation Engine

  const adaptiveRecommendation = (() => {

    if (readiness.score < 50) {
      return {
        title: "Recovery Priority",
        message:
          "Your readiness is low today. Reduce intensity, prioritize sleep, hydration, and mobility before your next hard session."
      };
    }

    if (momentumScore >= 90) {
      return {
        title: "Push Performance",
        message:
          "Momentum is exceptional. Today is a great opportunity to increase training intensity or volume."
      };
    }

    if (currentStreak >= 7) {
      return {
        title: "Protect Momentum",
        message:
          "Excellent consistency. Stay disciplined and avoid unnecessary missed training days."
      };
    }

    if (coachMemory.weakestPillar === "FUEL") {
      return {
        title: "Nutrition Focus",
        message:
          "Nutrition remains your limiting factor. Improve recovery meals and hydration today."
      };
    }

    if (coachMemory.weakestPillar === "FOCUS") {
      return {
        title: "Mental Performance",
        message:
          "Prioritize recovery, breathing work, and quality sleep to sharpen focus."
      };
    }

    return {
      title: "Balanced Progress",
      message:
        "Continue executing your current plan with consistency. Small improvements create long-term results."
    };

  })();

  // SPRINT 5.1 — COACH BLINK ENGINE
useEffect(() => {
  const blinkTimer = setInterval(() => {
    setCoachBlink(true);

    setTimeout(() => {
      setCoachBlink(false);
    }, 160);
  }, 5200);

  return () => clearInterval(blinkTimer);
}, []);

  const completedCount = completedPillars.length;
const bridgeKey = `${week}-${activePillar}`;
const showBridgeMessage =
  completedCount > 0 &&
  completedCount < 3 &&
  !bridgeDismissed[bridgeKey];

const dismissBridgeMessage = () => {
  setBridgeDismissed(prev => ({
    ...prev,
    [bridgeKey]: true
  }));
};

  const saveProfile = (updates) => {
    const updated = {...profile,...updates};
    setProfile(updated);
    if (updated.username) Store.save("profile_"+updated.username.toLowerCase(), updated);
  };
  
  const login = (prof) => { Store.save("user_"+prof.username.toLowerCase(), prof); setProfile(prof); setScreen("app"); };
  const logout = () => { setScreen("login"); setProfile(null); setPillarStates({TRAIN:{phase:"intake"},FUEL:{phase:"intake"},FOCUS:{phase:"intake"}}); setCompletedPillars([]); };

  const handleSignIn = () => {
    if (!loginForm.username||!loginForm.password){setLoginError("Please fill in all fields.");return;}
    const saved = Store.load("user_"+loginForm.username.toLowerCase());
    if (!saved){setLoginError("Account not found.");return;}
    if (saved.password!==loginForm.password){setLoginError("Incorrect password.");return;}
    login(saved);
  };
  const handleCreateAccount = () => {
    if (!createForm.firstName||!createForm.username||!createForm.email||!createForm.password){setLoginError("Please fill in all fields.");return;}
    if (!createForm.gender){setLoginError("Please select your gender.");return;}
    if (!createForm.ageRange){setLoginError("Please select your age range.");return;}
    const exists = Store.load("user_"+createForm.username.toLowerCase());
    if (exists){setLoginError("Username already taken.");return;}
    const newProfile = {
  firstName: createForm.firstName,
  username: createForm.username,
  email: createForm.email,
  password: createForm.password,
  gender: createForm.gender,
  ageRange: createForm.ageRange,
  weight: createForm.weight,
goalWeight: createForm.goalWeight
};
    login(newProfile);
  };

  const generate = async (pillar, answers) => {
    upd(pillar,{phase:"loading",answers});
    const newAnswers = {...(profile?.answers||{}),[pillar]:answers};
    saveProfile({answers:newAnswers});
    try {
      const n = profile?.firstName||profile?.username||"Athlete";
      const gender = profile?.gender||"";
      const ageRange = profile?.ageRange || "";
const weight = profile?.weight || "";
      
      const sprint3WorkoutContext =
  pillar === "TRAIN"
    ? `
SPRINT 3 WORKOUT DESIGN CONTEXT:

Athlete Weight:
${weight ? `${weight} lbs` : "Not provided."}

Goal Weight:
${profile?.goalWeight ? `${profile.goalWeight} lbs` : "Not provided."}

Weight Goal Direction:
${
  weight && profile?.goalWeight
    ? Number(profile.goalWeight) > Number(weight)
      ? "Gain weight / build muscle emphasis."
      : Number(profile.goalWeight) < Number(weight)
        ? "Lose weight / fat loss emphasis."
        : "Maintain weight / recomposition emphasis."
    : "Not enough data."
}

Target Muscle Groups:
${
  selectedMuscles.length > 0
    ? selectedMuscles.map((key) => MUSCLE_GROUPS[key]?.label).join(", ")
    : "No specific target muscles selected."
}

User-Selected Exercises:
${
  selectedWorkout.length > 0
    ? selectedWorkout.map((exercise) => `- ${exercise.name}`).join("\n")
    : "No custom exercises selected."
}

Coach Instruction:
If target muscles or selected exercises are provided, build the TRAIN blueprint around them.
Prioritize the selected muscles.
Selected exercises are athlete-priority movements.

Include these exercises whenever they are appropriate for the workout split, unless they would create unsafe volume, duplicate another movement, or disrupt proper programming.

When including them:
- Place them naturally into the workout.
- Keep proper exercise order.
- Respect recovery and muscle balance.
- Balance push, pull, legs, core, and recovery across the week.
- Do not overload one muscle group unless the user specifically selected it as a priority.
- If a target muscle is selected, include supporting muscles to protect joints and improve performance.

Workout Difficulty Rules:

If this is Week 1:
Build confidence.
Use moderate volume.
Prioritize technique and consistency.

If this is Week 2:
Increase intensity slightly.
Introduce progression where appropriate.

If this is Week 3:
Increase challenge while maintaining excellent exercise quality.
Encourage personal best performance without sacrificing recovery.

Always prioritize long-term consistency over maximum intensity.

Equipment Rules:

When designing the workout:

• Prefer equipment the athlete has already selected or demonstrated a preference for.

• If a recommended exercise requires equipment that may not be available, immediately provide an equally effective alternative.

• Never reduce workout quality because of limited equipment.

• Bodyweight, dumbbells, resistance bands, barbells, cable machines, kettlebells, and machines should all be treated as valid training environments.

• Explain substitutions briefly so the athlete understands why they were made.

Workout Design Explanation:

After generating the TRAIN blueprint, include a brief section titled:

"Why Your Coach Built This Workout"

In 3–5 concise bullet points explain:

• Why these exercises were selected.
• How they support the athlete's selected muscle priorities.
• How they align with the athlete's current weight and goal weight.
• Why the weekly difficulty matches the athlete's current phase.
• What the athlete should focus on this week.

Recovery Rules:

Always include recovery guidance that matches workout difficulty.

Week 1:
Emphasize learning movement quality, hydration, sleep, and consistency.

Week 2:
Recommend active recovery, mobility work, and nutrition that supports progression.

Week 3:
Increase emphasis on recovery, quality sleep, hydration, mobility, and preparation for the next phase.

If the athlete's goal is muscle gain:
Encourage recovery strategies that maximize growth.

If the athlete's goal is fat loss:
Encourage recovery strategies that preserve strength while maintaining training frequency.

Progressive Overload Rules:

Each week's TRAIN blueprint should recommend one measurable improvement from the previous week.

Possible progression methods include:

• Increase resistance.
• Increase repetitions.
• Increase sets.
• Improve exercise technique.
• Improve range of motion.
• Reduce rest periods when appropriate.
• Improve tempo and movement control.

Only recommend progression that matches the athlete's current experience level and recovery capacity.

Never recommend increasing every training variable at the same time.

Long-term consistency is always more important than rapid progression.

Coach Personality Rules:

Speak directly to the athlete by first name whenever available.

Maintain the voice of an elite performance coach:
• Confident
• Encouraging
• Honest
• Strategic
• Professional

Celebrate progress without exaggeration.

When correcting mistakes:
• Explain the reason.
• Offer a better solution.
• Keep the athlete motivated.

Keep explanations concise and actionable.

Every TRAIN blueprint should leave the athlete feeling confident about the next workout.

Final Blueprint Quality Standards:

Every TRAIN blueprint must be complete, organized, and immediately usable.

Before finishing, verify that the workout:

• Matches the athlete's current phase and week.
• Supports the athlete's primary goal.
• Uses the athlete's selected exercises whenever appropriate.
• Prioritizes the selected muscle groups.
• Balances movement patterns across the workout.
• Includes appropriate progression.
• Includes recovery guidance.
• Includes coaching explanations.
• Remains realistic and achievable.
• Never contains conflicting instructions.

The athlete should feel that this workout was designed specifically for them—not generated from a generic template.

If one or more selected exercises are intentionally omitted, explain why and recommend the closest alternative.
Use athlete weight and goal weight to personalize volume, progression, recovery, and nutrition guidance.
If goal weight is higher than current weight, bias toward muscle gain, calorie surplus, progressive overload, and recovery.
If goal weight is lower than current weight, bias toward fat loss, controlled conditioning, strength preservation, and sustainable deficit.
Do not ignore user-selected exercises unless they create poor balance.
If balance is poor, explain the correction and add better supporting exercises.
`
    : "";

const intelligence = `
${buildBlueprintIntelligence({
  pillar,
  week,
  memory: coachMemory,
weight,
goalWeight: profile?.goalWeight || ""
  
})}

${sprint3WorkoutContext}
`;

const prompt = PILLARS[pillar].prompt(
  answers,
  n,
  week,
  gender,
  ageRange,
  intelligence
);
      
      let data = null;
let lastError = null;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 4200,
        messages: [{ role: "user", content: prompt }]
      })
    });

    data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data?.error?.message || data?.error || "Blueprint generation failed.");
    }

    break;
  } catch (err) {
    lastError = err;
    console.error(`PLL generate attempt ${attempt} failed:`, err.message);
    if (attempt === 3) throw err;
    await new Promise(resolve => setTimeout(resolve, 900 * attempt));
  }
}

const text = (data.content || [])
  .filter(c => c.type === "text")
  .map(c => c.text)
  .join("")
  .trim();

let clean = text
  .replace(/^```(?:json)?\s*/i, "")
  .replace(/\s*```$/i, "")
  .trim();

const firstBrace = clean.indexOf("{");
const lastBrace = clean.lastIndexOf("}");

if (firstBrace === -1 || lastBrace === -1) {
  throw new Error("AI response did not contain valid JSON.");
}

clean = clean.slice(firstBrace, lastBrace + 1);

const result = JSON.parse(clean);
      
      upd(pillar,{phase:"result",result});
      
      const updatedCompletedPillars = completedPillars.includes(pillar)
  ? completedPillars
  : [...completedPillars, pillar];

if (!completedPillars.includes(pillar)) {
  setCompletedPillars(updatedCompletedPillars);
}

saveProgressEntry({
  week,
  phase,
  coachMode: coachMode.phaseName,
  coachTitle: coachMode.coachTitle,
  pillar,
  completedPillars: updatedCompletedPillars,
  progressPct: Math.round((updatedCompletedPillars.length / 3) * 100)
});

      const updatedCoachMemory = updateCoachMemory(pillar);
setCoachMemory(updatedCoachMemory);

    } catch(err) {
      console.error("PLL Engine error:",err.message);
      upd(pillar,{phase:"error"});
    }
  };

  // - LOGIN SCREEN -
  if (screen==="login") {
    return (
      <div style={{
        minHeight:"100vh",
        background:`linear-gradient(160deg, ${NAVY} 0%, #1A3050 50%, #0F1C2E 100%)`,
        display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"
      }}>
        <div style={{
          background:SURFACE,borderRadius:"24px",padding:"40px",
          width:"100%",maxWidth:"420px",
          boxShadow:"0 32px 80px rgba(0,0,0,0.4)"
        }}>
          {/* Logo area */}
          <div style={{ textAlign:"center",marginBottom:"32px" }}>
            <div style={{ display:"inline-flex",justifyContent:"center",marginBottom:"16px" }}>
              <CoachAvatar size={84} pillar="TRAIN" showRing={true}/>
            </div>
            <h1 style={{ fontSize:"26px",fontWeight:"900",color:NAVY,margin:"0 0 6px",letterSpacing:"-0.5px" }}>
              PLL ENGINE
            </h1>
            <p style={{ fontSize:"11px",color:MUTED,letterSpacing:"3px",margin:0 }}>
              TRAIN · FUEL · FOCUS
            </p>
            <div style={{ display:"flex",justifyContent:"center",gap:"6px",marginTop:"10px" }}>
              {[B,O,P].map((c,i)=>(
                <div key={i} style={{ width:"24px",height:"3px",borderRadius:"2px",background:c }}/>
              ))}
            </div>
          </div>

          {/* Tab toggle */}
          <div style={{ display:"flex",marginBottom:"24px",background:SURFACE2,borderRadius:"12px",padding:"4px" }}>
            {["signin","create"].map(mode=>(
              <button key={mode} onClick={()=>{setLoginMode(mode);setLoginError("");}} style={{
                flex:1,padding:"10px",borderRadius:"8px",border:"none",
                background:loginMode===mode?SURFACE:"transparent",
                color:loginMode===mode?NAVY:MUTED,
                fontWeight:"700",fontSize:"12px",cursor:"pointer",
                boxShadow:loginMode===mode?"0 2px 8px rgba(15,28,46,0.1)":"none",
                letterSpacing:"1px",transition:"all 0.15s"
              }}>{mode==="signin"?"SIGN IN":"CREATE ACCOUNT"}</button>
            ))}
          </div>

          {loginError && (
            <div style={{ background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"10px",padding:"12px 16px",marginBottom:"16px" }}>
              <p style={{ margin:0,fontSize:"13px",color:"#DC2626" }}>{loginError}</p>
            </div>
          )}

          {loginMode==="signin" ? (
            <>
              {[{label:"Username",key:"username",type:"text"},{label:"Password",key:"password",type:"password"}].map(f=>(
                <div key={f.key} style={{ marginBottom:"14px" }}>
                  <label style={{ fontSize:"10px",fontWeight:"800",color:MUTED,letterSpacing:"1.5px",display:"block",marginBottom:"6px" }}>{f.label}</label>
                  <input type={f.type} value={loginForm[f.key]}
                    onChange={e=>setLoginForm(p=>({...p,[f.key]:e.target.value}))}
                    onKeyDown={e=>e.key==="Enter"&&handleSignIn()}
                    style={{ width:"100%",padding:"12px 14px",borderRadius:"10px",border:`1.5px solid ${BORDER}`,fontSize:"14px",color:NAVY,background:SURFACE,outline:"none",boxSizing:"border-box" }}/>
                </div>
              ))}
              <button onClick={handleSignIn} style={{
                width:"100%",padding:"15px",borderRadius:"12px",border:"none",
                background:`${B}22`,
color:B,
boxShadow:"none"
              }}>SIGN IN</button>
            </>
          ) : (
            <>
              {[{label:"First Name",key:"firstName",type:"text"},{label:"Username",key:"username",type:"text"},{label:"Email Address",key:"email",type:"email"},{label:"Password",key:"password",type:"password"}].map(f=>(
                <div key={f.key} style={{ marginBottom:"12px" }}>
                  <label style={{ fontSize:"10px",fontWeight:"800",color:MUTED,letterSpacing:"1.5px",display:"block",marginBottom:"6px" }}>{f.label}</label>
                  <input type={f.type} value={createForm[f.key]}
                    onChange={e=>setCreateForm(p=>({...p,[f.key]:e.target.value}))}
                    style={{ width:"100%",padding:"12px 14px",borderRadius:"10px",border:`1.5px solid ${BORDER}`,fontSize:"14px",color:NAVY,background:SURFACE,outline:"none",boxSizing:"border-box" }}/>
                </div>
              ))}

              {/* Gender */}
              <div style={{ marginBottom:"14px" }}>
                <div style={{ fontSize:"10px",fontWeight:"800",color:MUTED,letterSpacing:"1.5px",marginBottom:"8px" }}>GENDER</div>
                <div style={{ display:"flex",gap:"10px" }}>
                  {["Male","Female"].map(g=>(
                    <button key={g} type="button" onClick={()=>setCreateForm(p=>({...p,gender:g}))} style={{
                      flex:1,padding:"12px",borderRadius:"10px",cursor:"pointer",
                      fontSize:"13px",fontWeight:"700",letterSpacing:"0.5px",transition:"all 0.15s",
                      background:createForm.gender===g?NAVY:SURFACE2,
                      color:createForm.gender===g?"#FFF":SLATE,
                      border:createForm.gender===g?`2px solid ${NAVY}`:`2px solid ${BORDER}`
                    }}>{g}
</button>
                  ))}
                </div>
              </div>

{/* Weight */}

<div style={{ marginBottom: "16px" }}>
  <div
    style={{
      fontSize: "10px",
      fontWeight: "800",
      color: MUTED,
      letterSpacing: "1.5px",
      marginBottom: "8px"
    }}
  >
    WEIGHT PROFILE (lbs)
  </div>

  <div style={{
    display: "grid",
    gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
    gap: "10px"
  }}>
    <input
      type="number"
      value={createForm.weight}
      onChange={(e)=>
        setCreateForm({
          ...createForm,
          weight:e.target.value
        })
      }
      placeholder="Current Weight"
      style={{
        width:"100%",
        padding:"12px",
        borderRadius:"10px",
        background:SURFACE2,
        color:"#FFF",
        border:`2px solid ${BORDER}`,
        fontSize:"15px",
        fontWeight:"700"
      }}
    />

    <input
      type="number"
      value={createForm.goalWeight}
      onChange={(e)=>
        setCreateForm({
          ...createForm,
          goalWeight:e.target.value
        })
      }
      placeholder="Goal Weight"
      style={{
        width:"100%",
        padding:"12px",
        borderRadius:"10px",
        background:SURFACE2,
        color:"#FFF",
        border:`2px solid ${BORDER}`,
        fontSize:"15px",
        fontWeight:"700"
      }}
    />
  </div>
</div>

<div style={{ marginBottom: "16px" }}>
  <div
    style={{
      fontSize: "10px",
      fontWeight: "800",
      color: MUTED,
      letterSpacing: "1.5px",
      marginBottom: "8px"
    }}
  >
    CURRENT WEIGHT (lbs)
  </div>

  <input
    type="number"
    value={createForm.weight}
    onChange={(e)=>
      setCreateForm({
        ...createForm,
        weight:e.target.value
      })
    }

    placeholder="Example: 160"

    style={{
      width:"100%",
      padding:"12px",
      borderRadius:"10px",
      background:SURFACE2,
      color:"#FFF",
      border:`2px solid ${BORDER}`,
      fontSize:"15px",
      fontWeight:"700"
    }}
  />
</div>

              {/* Age range */}
              <div style={{ marginBottom:"16px" }}>
                <div style={{ fontSize:"10px",fontWeight:"800",color:MUTED,letterSpacing:"1.5px",marginBottom:"8px" }}>AGE RANGE</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px" }}>
                  {["18-24","25-34","35-44","45-54","55-64","65+"].map(range=>(
                    <button key={range} type="button" onClick={()=>setCreateForm(p=>({...p,ageRange:range}))} style={{
                      padding:"11px 6px",borderRadius:"10px",cursor:"pointer",
                      fontSize:"13px",fontWeight:"700",transition:"all 0.15s",
                      background:createForm.ageRange===range?O:SURFACE2,
                      color:createForm.ageRange===range?"#FFF":SLATE,
                      border:createForm.ageRange===range?`2px solid ${O}`:`2px solid ${BORDER}`
                    }}>{range}</button>
                  ))}
                </div>
              </div>

              <button onClick={handleCreateAccount} style={{
                width:"100%",padding:"15px",borderRadius:"12px",border:"none",
                background:`${B}22`,
color:B,
boxShadow:"none"
              }}>START MY TRANSFORMATION</button>
            </>
          )}

          <p style={{ textAlign:"center",fontSize:"11px",color:MUTED,margin:"20px 0 0",letterSpacing:"1px" }}>
            21 DAYS · 3 PILLARS · ONE TRANSFORMATION
          </p>
        </div>
      </div>
    );
  }

  // - CELEBRATION SCREEN -
  if (showCelebration) {
    return (
      <div style={{
        minHeight:"100vh",
        background:`linear-gradient(160deg, ${NAVY} 0%, #1A3050 50%, #0F1C2E 100%)`,
        display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"
      }}>
        <div style={{ textAlign:"center",maxWidth:"500px" }}>
          <CoachAvatar size={96} pillar="TRAIN"/>
          <div style={{ display:"flex",justifyContent:"center",gap:"8px",margin:"20px 0 10px" }}>
            {[B,O,P].map((c,i)=><div key={i} style={{ width:"32px",height:"3px",borderRadius:"2px",background:c }}/>)}
          </div>
          <h1 style={{ fontSize:"34px",fontWeight:"900",color:"white",margin:"0 0 16px",letterSpacing:"-0.5px" }}>
            WEEK {week} COMPLETE
          </h1>
          <p style={{ fontSize:"15px",color:"rgba(255,255,255,0.72)",lineHeight:"1.7",marginBottom:"32px" }}>
            {WEEKS[week]?.coachClose(name)||`${name}, you completed all 3 pillars this week.`}
          </p>

          {week < 3 ? (
            <button
  onClick={() => {
    saveProfile({ week: week + 1 });
    setCompletedPillars([]);
    setShowCelebration(false);
    setPillarStates({
      TRAIN: { phase: "intake" },
      FUEL: { phase: "intake" },
      FOCUS: { phase: "intake" }
    });
  }}
  style={{
    padding: "18px 44px",
    borderRadius: "12px",
    border: "none",
    background: `${B}22`,
    color: B,
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "1.5px",
    boxShadow: "none"
  }}
>
  START WEEK {week + 1}
</button>
          ) : (
            <div>
              <div style={{ background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.12)`,borderRadius:"16px",padding:"24px",marginBottom:"24px" }}>
                <div style={{ fontSize:"10px",fontWeight:"800",color:O,letterSpacing:"2.5px",marginBottom:"10px" }}>PHASE 1 COMPLETE</div>
                <p style={{ color:"rgba(255,255,255,0.8)",fontSize:"15px",margin:0,lineHeight:"1.6" }}>
                  21 days. 3 pillars. Fully completed. You are no longer who you were.
                </p>
              </div>
              <button style={{
  padding: "18px 44px",
  borderRadius: "12px",
  border: "none",
  background: `${O}22`,
  color: O,
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer",
  letterSpacing: "1.5px",
  boxShadow: "none"
}}>
  UNLOCK PHASE 2
</button>
  
            </div>
          )}
        </div>
      </div>
    );
  }

  const progressPct = Math.round((completedPillars.length/3)*100);

const phaseProgressLabel = `PHASE ${phase} · ${coachMode.phaseName}`;
const coachHeaderLine = `${coachMode.coachTitle} · ${coachMode.tone}`;
const athleteIdentityLine = `${name} · Week ${week} · ${completedPillars.length}/3 Pillars Complete`;

const progressLabel =
  progressPct === 100
    ? "Sprint 1 Complete"
    : `${completedPillars.length}/3 Pillars Complete`;

  // - MAIN APP SCREEN -
  return (
    <div style={{
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100vw",
  overflowX: "hidden",
  background: BG,
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif"
}}>

      {/* - HEADER - */}
      <div style={{
        background:SURFACE,borderBottom:`1px solid ${BORDER}`,
        padding:"0 24px",position: "relative",
        zIndex: 10,
        boxShadow:"0 1px 10px rgba(15,28,46,0.07)"
      }}>
        
        <div style={{
  maxWidth: "1100px",
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: window.innerWidth < 768 ? "column" : "row",
  alignItems: window.innerWidth < 768 ? "stretch" : "center",
  justifyContent: "space-between",
  gap: window.innerWidth < 768 ? "14px" : "16px",
  minHeight: window.innerWidth < 768 ? "auto" : "82px",
  padding: window.innerWidth < 768 ? "14px 0" : "0",
  boxSizing: "border-box",
  overflow: "hidden"
}}>

          {/* Brand */}
          <div style={{ display:"flex",alignItems:"center",gap:"12px",marginRight:"auto" }}>
            <CoachAvatar size={38} pillar={activePillar} showRing={false}/>
                <div>
                  <div style={{ fontSize:"15px",fontWeight:"900",color:NAVY,letterSpacing:"1px" }}>PLL ENGINE</div>
              <div style={{ fontSize:"9px",color:MUTED,letterSpacing:"2.5px" }}>PRIME LEVEL LIVING</div>

            <div style={{
  marginTop: "5px",
  fontSize: "9px",
  color: coachMode.accent,
  letterSpacing: "1.6px",
  fontWeight: "800"
}}>
  {phaseProgressLabel}
</div>

<div style={{
  marginTop: "3px",
  fontSize: "9px",
  color: SLATE,
  letterSpacing: "1px",
  fontWeight: "700"
}}>
  {athleteIdentityLine}
</div>
            </div>
          </div>

          {/* Pillar nav */}
          <div style={{ display:"flex",gap:"6px" }}>
            {["TRAIN","FUEL","FOCUS"].map(p=>(
              <PillarButton
                key={p}
                pillar={p}
                active={activePillar===p}
                done={completedPillars.includes(p)}
                onClick={()=>setActivePillar(p)}
              />
            ))}
          </div>

{/* Sprint 1 Coach Status */}
<div style={{
  marginTop: "14px",
  padding: "14px 16px",
  borderRadius: "14px",
  border: `1px solid ${coachMode.accent}`,
  background: SURFACE,
  boxShadow: st.phase === "loading"
    ? `0 0 24px ${coachMode.accent}88`
    : `0 0 18px ${coachMode.accent}22`,
  transform: st.phase === "loading" ? "scale(1.01)" : "scale(1)",
  transition: "all 0.3s ease"
}}>
  <div style={{
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.4px",
    color: coachMode.accent,
    marginBottom: "6px"
  }}>
    {coachMode.badge}
  </div>

    <button
  onClick={() => {
    const line = coachMessage || `${name}, your coach is here. Stay locked in.`;
    const speech = new SpeechSynthesisUtterance(line);

    speech.rate = 0.92;
    speech.pitch = 0.85;
    speech.volume = 1;

    speech.onstart = () => setCoachSpeaking(true);
    speech.onend = () => setCoachSpeaking(false);
    speech.onerror = () => setCoachSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }}
  style={{
  marginTop: "12px",
  padding: "10px 14px",
  borderRadius: "10px",
  border: `1px solid ${coachMode.accent}`,
  background: coachSpeaking ? coachMode.accent : `${coachMode.accent}22`,
  color: coachSpeaking ? "#FFFFFF" : coachMode.accent,
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "1px",
  cursor: "pointer",
  transform: coachSpeaking
  ? `scale(${coachBlink ? 1.07 : 1.02})`
  : "scale(1)",

opacity: coachSpeaking
  ? (coachBlink ? 1 : 0.82)
  : 1,

boxShadow: coachSpeaking
  ? `0 0 ${coachBlink ? 28 : 18}px ${coachMode.accent}`
  : "none",

transition: "all .18s ease"
}}
>
  {coachSpeaking ? "COACH SPEAKING..." : "HEAR COACH"}
</button>

    {coachSpeaking && (
  <div style={{
    marginTop: "6px",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: coachMode.accent
  }}>
    COACH SPEAKING...
  </div>
)}

  <div style={{
    fontSize: "13px",
    fontWeight: "900",
    color: NAVY,
    marginBottom: "4px"
  }}>
    {coachMode.coachTitle}
  </div>

  <div style={{
  fontSize: "12px",
  color: SLATE,
  lineHeight: "1.5"
}}>
  {coachMessage}
</div>

<div style={{
  marginTop: "8px",
  fontSize: "10px",
  fontWeight: "900",
  letterSpacing: "1px",
  color: coachMode.accent
}}>
  COACH LEVEL: {coachMemory.coachLevel} · BLUEPRINTS: {coachMemory.generatedBlueprints}
</div>

  <div style={{
  marginTop:"4px",
  fontSize:"10px",
  color:MUTED,
  letterSpacing:"1px"
}}>
  PRIMARY FOCUS: {coachMemory.preferredPillar}
</div>

{/* Sprint 6.2 Athlete Readiness */}

<div
  style={{
    marginTop: "12px",
    padding: "12px 16px",
    borderRadius: "14px",
    border: `1px solid ${BORDER}`,
    background: SURFACE,
    boxShadow: "0 0 14px rgba(0,0,0,.12)"
  }}
>

  <div
    style={{
      fontSize: "10px",
      fontWeight: "900",
      letterSpacing: "1.4px",
      color: coachMode.accent,
      marginBottom: "6px"
    }}
  >
    ATHLETE READINESS
  </div>

  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
  <div
    style={{
      fontSize: "18px",
      fontWeight: "900",
      color: readiness.color
    }}
  >
    {readiness.status}
  </div>

  <div
    style={{
      fontSize: "16px",
      fontWeight: "900",
      color: readiness.color
    }}
  >
    {readiness.score}%
  </div>
</div>

    <div
  style={{
    marginTop: "6px",
    fontSize: "12px",
    color: SLATE,
    lineHeight: "1.5"
  }}
>
  {readiness.coachLine}
</div>
  
<div
  style={{
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: `1px solid ${BORDER}`,
    fontSize: "11px",
    color: MUTED,
    lineHeight: "1.5"
  }}
>
  RECOVERY: {recoveryStatus} • STREAK: {currentStreak} DAY{currentStreak === 1 ? "" : "S"}
</div>

</div>

  {/* Sprint 2.3 Coach Momentum Card */}
<div style={{
  marginTop: "12px",
  padding: "14px 16px",
  borderRadius: "14px",
  border: `1px solid ${BORDER}`,
  background: SURFACE,
  boxShadow: "0 0 14px rgba(0,0,0,0.12)"
}}>
    
  <div style={{
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.4px",
    color: coachMode.accent,
    marginBottom: "6px"
  }}>
    COACH MOMENTUM
  </div>

  <div style={{
    fontSize: "13px",
    fontWeight: "900",
    color: NAVY,
    marginBottom: "6px"
  }}>
    {momentumStatus} · {momentumScore}%
  </div>

  <div style={{
    fontSize: "11px",
    color: MUTED,
    letterSpacing: "1px",
    marginBottom: "6px"
  }}>
    RECOVERY: {recoveryStatus} · STREAK: {currentStreak} DAY{currentStreak === 1 ? "" : "S"}
  </div>

  <div style={{
    fontSize: "12px",
    color: SLATE,
    lineHeight: "1.5"
  }}>
    {momentumCoachLine}
  </div>

    {/* Sprint 6.4 Coach Performance Dashboard */}
<div style={{
  marginTop: "12px",
  padding: "14px 16px",
  borderRadius: "14px",
  border: `1px solid ${BORDER}`,
  background: SURFACE,
  boxShadow: "0 0 14px rgba(0,0,0,0.12)"
}}>
  <div style={{
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1.4px",
    color: coachMode.accent,
    marginBottom: "6px"
  }}>
    COACH PERFORMANCE DASHBOARD
  </div>

  <div style={{
    fontSize: "13px",
    fontWeight: "900",
    color: NAVY,
    marginBottom: "6px"
  }}>
    {momentumStatus} · {momentumScore}%
  </div>

    <div style={{
  fontSize: "11px",
  color: SLATE,
  lineHeight: "1.5",
  marginTop: "4px"
}}>
  Coach Readiness: {readiness.status} · {readiness.score}%
</div>

        <div style={{
  fontSize: "11px",
  color: MUTED,
  marginTop: "4px",
  lineHeight: "1.5"
}}>
  Performance Trend: {momentumScore >= 80
    ? "Rising"
    : momentumScore >= 60
      ? "Stable"
      : "Needs Attention"}
</div>

  <div style={{
    fontSize: "11px",
    color: SLATE,
    lineHeight: "1.5"
  }}>
    Recovery: {recoveryStatus} · Streak: {currentStreak} Day{currentStreak === 1 ? "" : "s"}
  </div>

<div style={{
  fontSize: "11px",
  color: coachMode.accent,
  marginTop: "6px",
  lineHeight: "1.5",
  fontWeight: "800"
}}>
  Coach Recommendation: {readiness.status === "PRIMED"
    ? "Push with control."
    : readiness.status === "READY"
      ? "Execute the plan."
      : "Protect recovery first."}
</div>

<div style={{
  marginTop: "10px",
  height: "6px",
  width: "100%",
  borderRadius: "999px",
  background: BORDER,
  overflow: "hidden"
}}>
  <div style={{
    height: "100%",
    width: `${momentumScore}%`,
    borderRadius: "999px",
    background: coachMode.accent,
    transition: "width 0.4s ease"
  }} />
</div>

  <div style={{
  marginTop: "6px",
  fontSize: "10px",
  color: MUTED,
  letterSpacing: "1px",
  fontWeight: "800"
}}>
  PERFORMANCE LOAD: {momentumScore >= 80
    ? "HIGH"
    : momentumScore >= 60
      ? "MODERATE"
      : "LOW"}
</div>

  <div style={{
  marginTop: "10px",
  paddingTop: "10px",
  borderTop: `1px solid ${BORDER}`
}}>
  <div style={{
    fontSize: "10px",
    color: coachMode.accent,
    letterSpacing: "1px",
    fontWeight: "900",
    marginBottom: "4px"
  }}>
    ADAPTIVE COACH RECOMMENDATION
  </div>

  <div style={{
    fontSize: "12px",
    color: NAVY,
    fontWeight: "900",
    marginBottom: "4px"
  }}>
    {adaptiveRecommendation.title}
  </div>

  <div style={{
    fontSize: "11px",
    color: SLATE,
    lineHeight: "1.5"
  }}>
    {adaptiveRecommendation.message}
  </div>
</div>
    
  <div style={{
  marginTop:"4px",
  fontSize:"10px",
  color:MUTED,
  letterSpacing:"1px"
}}>
  STRONGEST: {coachMemory.strongestPillar}
</div>

<div style={{
  marginTop:"4px",
  fontSize:"10px",
  color:MUTED,
  letterSpacing:"1px"
}}>
  WEAKEST: {coachMemory.weakestPillar}
</div>

  <div style={{
    marginTop: "8px",
    fontSize: "10px",
    color: MUTED,
    letterSpacing: "1px",
    fontWeight: "700"
  }}>
    STREAK: {currentStreak} DAY{currentStreak === 1 ? "" : "S"}
  </div>
</div>

{showBridgeMessage && (
  <div style={{
    marginTop:"12px",
    padding:"14px 16px",
    borderRadius:"16px",
    border:`1px solid ${coachMode.accent}`,
    background:"rgba(255,255,255,0.07)",
    boxShadow:`0 0 18px ${coachMode.accent}22`
  }}>
    <div style={{ fontSize:"10px", fontWeight:"900", letterSpacing:"1.4px", color:coachMode.accent, marginBottom:"6px" }}>
      COACH CHECKPOINT
    </div>
    <div style={{ fontSize:"13px", color:SLATE, lineHeight:"1.5" }}>
      {name}, you have completed {completedCount}/3 pillars this week. Keep moving — finish all three pillars to complete your weekly blueprint.
    </div>
    <button
      onClick={dismissBridgeMessage}
      style={{
        marginTop:"10px",
        padding:"8px 14px",
        borderRadius:"999px",
        border:"1px solid rgba(255,255,255,0.18)",
        background:"rgba(255,255,255,0.08)",
        color:SLATE,
        fontSize:"11px",
        fontWeight:"800",
        cursor:"pointer"
      }}
    >
      GOT IT
    </button>
  </div>
)}

{/* Sprint 1 Progress History Preview */}
{progressHistory.length > 0 && (
  <div style={{
    marginTop:"10px",
    padding:"12px 14px",
    borderRadius:"14px",
    border:`1px solid ${BORDER}`,
    background:SURFACE
  }}>
    <div style={{
      fontSize:"10px",
      fontWeight:"900",
      color:NAVY,
      letterSpacing:"1.5px",
      marginBottom:"8px"
    }}>
      RECENT PROGRESS
    </div>

    {progressHistory.slice(0,3).map((entry,i)=>(
  <div
    key={entry.id || i}
    style={{
      fontSize:"11px",
      color:MUTED,
      marginBottom:i===2 ? "0" : "6px",
      lineHeight:"1.4"
    }}
  >
    {entry.date
      ? new Date(entry.date).toLocaleDateString()
      : "Recent Session"}
    {" • "}
    Week {entry.week}
    {" • "}
    {entry.pillar}
    {" • "}
    {entry.progressPct}% Complete
  </div>
))}
  </div>
)}

          {/* User + logout */}
          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginLeft:"8px" }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:"12px",fontWeight:"700",color:NAVY }}>{name}</div>
              <div style={{ fontSize:"10px",color:MUTED }}>Week {week} of 3</div>
            </div>
            <button onClick={logout} style={{
              padding:"7px 14px",borderRadius:"8px",border:`1.5px solid ${BORDER}`,
              background:"transparent",color:MUTED,fontSize:"12px",fontWeight:"600",cursor:"pointer"
            }}>Sign out</button>
          </div>
        </div>
      </div>

      {/* - PROGRESS BAR - */}
      <div style={{ background:SURFACE,borderBottom:`1px solid ${BORDER}`,padding:"10px 24px" }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"7px" }}>
            <span style={{ fontSize:"10px",fontWeight:"700",color:MUTED,letterSpacing:"2px" }}>
              WEEK {week} PROGRESS · {WEEKS[week]?.theme}
            </span>
            <div style={{ display:"flex",gap:"14px",alignItems:"center" }}>
              {["TRAIN","FUEL","FOCUS"].map(p=>(
                <span key={p} style={{ fontSize:"11px",fontWeight:"700",color:completedPillars.includes(p)?PILLARS[p].color:MUTED }}>
                  {completedPillars.includes(p)?`âœ“ ${p}`:p}
                </span>
              ))}
              <span style={{ fontSize:"12px",fontWeight:"800",color:progressPct===100?G:NAVY }}>{progressPct}%</span>
            </div>
          </div>
          <div style={{ height:"3px",background:BORDER,borderRadius:"2px",overflow:"hidden" }}>
            <div style={{
              height:"100%",width:`${progressPct}%`,borderRadius:"2px",
              background:`linear-gradient(90deg, ${B}, ${O}, ${P})`,
              transition:"width 0.5s ease"
            }}/>
          </div>
        </div>
      </div>

      {/* - MAIN CONTENT - */}
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"28px 24px" }}>

        {/* Active pillar header */}
        <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px" }}>
          {PILLARS[activePillar].icon(PILLARS[activePillar].color, 22)}
          <div>
            <span style={{ fontSize:"13px",fontWeight:"800",color:PILLARS[activePillar].color,letterSpacing:"2px" }}>{activePillar}</span>
            <span style={{ fontSize:"13px",color:MUTED,marginLeft:"10px" }}>· {PILLARS[activePillar].subtitle}</span>
          </div>
          <div style={{ marginLeft:"auto",padding:"5px 14px",borderRadius:"20px",background:SURFACE,border:`1px solid ${BORDER}`,fontSize:"11px",fontWeight:"700",color:SLATE }}>
            {WEEKS[week]?.label||`WEEK ${week}`}
          </div>
        </div>

{/* Sprint 3 Workout Intelligence Status */}
<div style={{
  margin: window.innerWidth < 768 ? "12px 0" : "16px 0",
  padding: window.innerWidth < 768 ? "12px" : "14px",
  borderRadius: "14px",
  border: `1px solid ${BORDER}`,
  background: SURFACE,
  color: SLATE,
  fontSize: window.innerWidth < 768 ? "12px" : "13px",
  lineHeight: "1.5"
}}>
  <div style={{ fontWeight: "900", color: NAVY, letterSpacing: "1px", marginBottom: "6px" }}>
    SPRINT 3 WORKOUT INTELLIGENCE
  </div>

  <div>Exercise Library Loaded: <strong>{EXERCISE_LIBRARY.length}</strong></div>
<div>
  Muscle Groups Mapped: <strong>{Object.keys(MUSCLE_GROUPS).length}</strong>
</div>

<div style={{
  marginTop: "10px",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "12px",
  border: `1px solid ${BORDER}`,
  background: `${NAVY}12`
}}>
  <div style={{
    fontWeight: "900",
    color: NAVY,
    marginBottom: "6px",
    letterSpacing: ".8px"
  }}>
    ATHLETE PROFILE
  </div>

  <div>Current Weight: <strong>{profile?.weight ? `${profile.weight} lbs` : "Not provided"}</strong></div>
<div>Goal Weight: <strong>{profile?.goalWeight ? `${profile.goalWeight} lbs` : "Not provided"}</strong></div>

<div style={{
  display: "grid",
  gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
  gap: "8px",
  marginTop: "10px"
}}>
  <input
    type="number"
    value={profile?.weight || ""}
    onChange={(e)=>saveProfile({ weight:e.target.value })}
    placeholder="Update current weight"
    style={{
      width:"100%",
      padding:"10px",
      borderRadius:"10px",
      border:`1px solid ${BORDER}`,
      background:SURFACE2,
      color:"#FFF",
      fontWeight:"700"
    }}
  />

  <input
    type="number"
    value={profile?.goalWeight || ""}
    onChange={(e)=>saveProfile({ goalWeight:e.target.value })}
    placeholder="Update goal weight"
    style={{
      width:"100%",
      padding:"10px",
      borderRadius:"10px",
      border:`1px solid ${BORDER}`,
      background:SURFACE2,
      color:"#FFF",
      fontWeight:"700"
    }}
  />
</div>
  <div>
    Direction:{" "}
    <strong>
      {profile?.weight && profile?.goalWeight
        ? Number(profile.goalWeight) > Number(profile.weight)
          ? "Gain / Build"
          : Number(profile.goalWeight) < Number(profile.weight)
            ? "Lose / Cut"
            : "Maintain / Recomp"
        : "Not enough data"}
    </strong>
  </div>
</div>

  {selectedWorkout.length > 0 && (
    <div style={{
      marginBottom: "14px",
      padding: "10px",
      borderRadius: "12px",
      border: `1px solid ${B}`,
      background: `${B}22`
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px"
      }}>
        <div style={{ fontWeight: "900", color: NAVY, letterSpacing: ".8px" }}>
          SELECTED WORKOUT ({selectedWorkout.length})
        </div>

        <button
          onClick={() => setSelectedWorkout([])}
          style={{
            padding: "5px 8px",
            borderRadius: "8px",
            border: `1px solid ${BORDER}`,
            background: "transparent",
            color: MUTED,
            fontSize: "10px",
            fontWeight: "900",
            cursor: "pointer"
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginBottom: "8px", fontSize: "11px", color: MUTED, fontWeight: "700" }}>
        Balance Score: <strong>{Math.min(100, selectedWorkout.length * 20)}</strong>/100
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
        {Object.entries(workoutMovementPatterns).map(([pattern, count]) => (
          <span key={pattern} style={{
            padding: "5px 8px",
            borderRadius: "999px",
            border: `1px solid ${BORDER}`,
            background: `${NAVY}12`,
            color: NAVY,
            fontSize: "10px",
            fontWeight: "900",
            textTransform: "uppercase"
          }}>
            {pattern}: {count}
          </span>
        ))}
      </div>

      <div style={{ marginBottom: "8px", fontSize: "11px", color: MUTED, fontWeight: "700" }}>
        {workoutBalanceFeedback}
      </div>

      <button
        onClick={() => {
          const neededPatterns = [];

          if (!workoutMovementPatterns.push) neededPatterns.push("push");
          if (!workoutMovementPatterns.pull) neededPatterns.push("pull");
          if (!workoutMovementPatterns.squat && !workoutMovementPatterns.hinge) {
            neededPatterns.push("squat");
          }

          const additions = EXERCISE_LIBRARY.filter((exercise) =>
            neededPatterns.includes(exercise.movementPattern) &&
            !selectedWorkout.some((item) => item.id === exercise.id)
          ).slice(0, 3);

          setSelectedWorkout((prev) => [...prev, ...additions]);
        }}
        style={{
          width: "100%",
          marginBottom: "8px",
          padding: "8px 10px",
          borderRadius: "10px",
          border: `1px solid ${B}`,
          background: `${B}33`,
          color: "#FFFFFF",
          fontWeight: "900",
          fontSize: "11px",
          cursor: "pointer"
        }}
      >
        Coach Auto-Fill Gaps
      </button>

      <button
        onClick={() => {
          const savedWorkout = {
            id: Date.now(),
            name: `Workout ${savedWorkouts.length + 1}`,
            exercises: selectedWorkout
          };

          setSavedWorkouts((prev) => [...prev, savedWorkout]);
        }}
        style={{
          width: "100%",
          marginBottom: "8px",
          padding: "8px 10px",
          borderRadius: "10px",
          border: `1px solid ${BORDER}`,
          background: `${NAVY}22`,
          color: "#FFFFFF",
          fontWeight: "900",
          fontSize: "11px",
          cursor: "pointer"
        }}
      >
        Save Workout
      </button>

      {selectedWorkout.map((exercise, index) => (
        <div key={exercise.id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          padding: "7px 0",
          borderBottom: index === selectedWorkout.length - 1 ? "none" : `1px solid ${BORDER}`
        }}>
          <strong>{index + 1}. {exercise.name}</strong>

          <button
            onClick={() => {
              setSelectedWorkout((prev) =>
                prev.filter((item) => item.id !== exercise.id)
              );
            }}
            style={{
              padding: "5px 8px",
              borderRadius: "8px",
              border: `1px solid ${BORDER}`,
              background: "transparent",
              color: MUTED,
              fontSize: "10px",
              fontWeight: "900",
              cursor: "pointer"
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}

  {savedWorkouts.length > 0 && (
    <div style={{
      marginBottom: "14px",
      padding: "10px",
      borderRadius: "12px",
      border: `1px solid ${BORDER}`,
      background: `${NAVY}12`
    }}>
      <div style={{ fontWeight: "900", color: NAVY, marginBottom: "8px", letterSpacing: ".8px" }}>
        SAVED WORKOUTS ({savedWorkouts.length})
      </div>

      {savedWorkouts.map((workout) => (
        <div key={workout.id} style={{
          padding: "8px 0",
          borderTop: `1px solid ${BORDER}`
        }}>
          <strong>{workout.name}</strong>

          <div style={{ fontSize: "11px", color: MUTED, marginBottom: "7px" }}>
            {workout.exercises.length} exercises
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setSelectedWorkout(workout.exercises)}
              style={{
                flex: 1,
                padding: "7px 8px",
                borderRadius: "8px",
                border: `1px solid ${B}`,
                background: `${B}33`,
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: "900",
                cursor: "pointer"
              }}
            >
              Load
            </button>

            <button
              onClick={() => {
                setSavedWorkouts((prev) =>
                  prev.filter((item) => item.id !== workout.id)
                );
              }}
              style={{
                flex: 1,
                padding: "7px 8px",
                borderRadius: "8px",
                border: `1px solid ${BORDER}`,
                background: "transparent",
                color: MUTED,
                fontSize: "10px",
                fontWeight: "900",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  <input
    value={exerciseSearch}
    onChange={(e) => setExerciseSearch(e.target.value)}
    placeholder="Search exercises..."
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: "12px",
      border: `1px solid ${BORDER}`,
      background: "#FFFFFF10",
      color: "#FFFFFF",
      marginBottom: "12px",
      fontWeight: "700"
    }}
  />

  <div style={{ fontWeight: "900", color: NAVY, marginBottom: "6px", letterSpacing: ".8px" }}>
    TARGET MUSCLE GROUPS
  </div>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
    {Object.entries(MUSCLE_GROUPS).map(([key, muscle]) => {
      const active = selectedMuscles.includes(key);

      return (
        <button
          key={key}
          onClick={() => {
            setSelectedMuscles((prev) =>
              prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
            );
          }}
          style={{
            padding: "7px 11px",
            borderRadius: "999px",
            border: `1px solid ${active ? B : BORDER}`,
            background: active ? `${B}55` : `${B}18`,
            color: active ? "#FFFFFF" : NAVY,
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: ".5px",
            cursor: "pointer"
          }}
        >
          {muscle.label}
        </button>
      );
    })}
  </div>

  <div style={{ fontWeight: "900", color: NAVY, marginBottom: "6px", letterSpacing: ".8px" }}>
    COACH RECOMMENDED EXERCISES
  </div>

  <div style={{
    display: "grid",
    gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
    gap: "8px"
  }}>
    {EXERCISE_LIBRARY
      .filter((exercise) => {
        const matchesMuscle =
          selectedMuscles.length === 0 ||
          exercise.primaryMuscles.some((muscle) => selectedMuscles.includes(muscle));

        const matchesSearch =
          !exerciseSearch.trim() ||
          exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase());

        return matchesMuscle && matchesSearch;
      })
      .map((exercise) => {
        const alreadyAdded = selectedWorkout.some((item) => item.id === exercise.id);

        return (
          <div key={exercise.id} style={{
            padding: "10px",
            borderRadius: "12px",
            border: `1px solid ${BORDER}`,
            background: `${NAVY}10`
          }}>
            <div style={{ fontWeight: "900", color: NAVY, marginBottom: "4px" }}>
              {exercise.name}
            </div>

            <div style={{ fontSize: "11px", color: SLATE }}>
              Difficulty: {exercise.difficulty}
            </div>

            <div style={{ fontSize: "11px", color: SLATE }}>
              Equipment: {exercise.equipment.join(", ")}
            </div>

            <div style={{ fontSize: "11px", color: MUTED, marginTop: "6px" }}>
              {exercise.coachNote}
            </div>

            <button
              disabled={alreadyAdded}
              onClick={() => {
                setSelectedWorkout((prev) =>
                  prev.some((item) => item.id === exercise.id)
                    ? prev
                    : [...prev, exercise]
                );
              }}
              style={{
                marginTop: "8px",
                width: "100%",
                padding: "8px 10px",
                borderRadius: "10px",
                border: `1px solid ${alreadyAdded ? BORDER : B}`,
                background: alreadyAdded ? `${NAVY}18` : `${B}33`,
                color: "#FFFFFF",
                fontWeight: "900",
                fontSize: "11px",
                cursor: alreadyAdded ? "default" : "pointer",
                opacity: alreadyAdded ? 0.6 : 1
              }}
            >
              {alreadyAdded ? "Added" : "Add to Workout"}
            </button>
          </div>
        );
      })}
  </div>
</div>

{/* Sprint 2.4 Coach Presence Panel */}
<div style={{
  margin: window.innerWidth < 768 ? "12px 0 18px" : "18px 0 24px",
  padding: window.innerWidth < 768 ? "14px" : "18px",
  borderRadius: "18px",
  border: `1px solid ${BORDER}`,
  background: SURFACE,
  display: "flex",
  flexDirection: window.innerWidth < 768 ? "column" : "row",
  gap: window.innerWidth < 768 ? "12px" : "18px",
  alignItems: window.innerWidth < 768 ? "flex-start" : "center",
  overflow: "hidden"
}}>
  <div
  style={{
    width: window.innerWidth < 768 ? "100%" : "160px",
    maxWidth: window.innerWidth < 768 ? "180px" : "160px",
    height: window.innerWidth < 768 ? "180px" : "210px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
    animation: "coachBreathing 4s ease-in-out infinite",
    flexShrink: 0
  }}
>
  <img
    src={process.env.PUBLIC_URL + "/coach-full.jpg"}
    onError={(e) => {
      e.currentTarget.src = process.env.PUBLIC_URL + "/coach.jpg";
    }}
    alt="PLL Coach"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "50% 18%",
      display: "block",
      transform: coachBlink ? "scaleY(0.96)" : "scaleY(1)",
      transition: "transform 0.12s ease"
    }}
  />
</div>
  <div>
    <div style={{
      fontSize: "10px",
      fontWeight: "900",
      color: coachMode.accent,
      letterSpacing: "1.5px",
      marginBottom: "6px"
    }}>
      PLL COACH
    </div>

    <div style={{
      fontSize: window.innerWidth < 768 ? "17px" : "20px",
      fontWeight: "900",
      color: NAVY,
      marginBottom: "6px",
      lineHeight: "1.15"
    }}>
      The Performance Architect
    </div>

    <div style={{
      fontSize: window.innerWidth < 768 ? "12px" : "13px",
      color: SLATE,
      lineHeight: "1.5"
    }}>
      {momentumCoachLine}
    </div>
  </div>
</div>

<style>{`
  @keyframes coachBreathing {
    0% { transform: scale(1); }
    50% { transform: scale(1.018); }
    100% { transform: scale(1); }
  }
`}</style>

        {/* Pillar content */}
        {st.phase==="loading" && <Loading pillar={activePillar} name={name} week={week}/>}
        {st.phase==="intake" && (
          <IntakeForm pillar={activePillar} profile={{...profile,week}} onGenerate={(answers)=>generate(activePillar,answers)}/>
        )}
        {st.phase==="result" && st.result && activePillar==="TRAIN" && (
          <TrainResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"TRAIN",name,week)}/>
        )}
        {st.phase==="result" && st.result && activePillar==="FUEL" && (
          <FuelResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"FUEL",name,week)}/>
        )}
        {st.phase==="result" && st.result && activePillar==="FOCUS" && (
          <FocusResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"FOCUS",name,week)}/>
        )}

        {/* All 3 pillars complete — Complete Week CTA */}
        {completedPillars.length===3 && !showCelebration && (
          <div style={{
            margin:"32px 0 8px",borderRadius:"16px",
            background:SURFACE,padding:"28px 24px",textAlign:"center",
            boxShadow:"0 8px 32px rgba(15,28,46,0.2)"
          }}>
            <div style={{ display:"flex",justifyContent:"center",gap:"8px",marginBottom:"14px" }}>
              {[B,O,P].map((c,i)=><div key={i} style={{ width:"28px",height:"3px",borderRadius:"2px",background:c }}/>)}
            </div>
            <div style={{ fontSize:"10px",fontWeight:"800",color:G,letterSpacing:"3px",marginBottom:"10px" }}>
              ALL 3 PILLARS COMPLETE
            </div>
            <div style={{ fontSize:"22px",fontWeight:"900",color:NAVY,marginBottom:"8px" }}>
              Week {week} Blueprint Done, {name}.
            </div>
            <div style={{ fontSize:"13px",color:SLATE,marginBottom:"24px",lineHeight:"1.6" }}>
              You showed up for all three pillars. That is what separates the ones who make it.
            </div>
            <button onClick={()=>setShowCelebration(true)} style={{
              padding:"16px 40px",borderRadius:"12px",border:"none",
              background:`linear-gradient(135deg, ${O}, #E86020)`,
              color:"white",fontWeight:"900",fontSize:"14px",cursor:"pointer",
              letterSpacing:"1.5px",boxShadow:`0 6px 24px ${O}45`
            }}>COMPLETE WEEK {week}</button>
          </div>
        )}

        {/* Store bridge */}
        <StoreBridge
          pillar={activePillar}
          pillarStates={pillarStates}
          profile={profile}
          week={week}
          dismissed={bridgeDismissed}
          onDismiss={(p)=>setBridgeDismissed(prev=>({...prev,[p]:true}))}
        />

        {/* Error state */}
        {st.phase==="error" && (
          <div style={{ textAlign:"center",padding:"60px 20px" }}>
            <div style={{ fontSize:"36px",marginBottom:"16px" }}>âš </div>
            <div style={{ fontWeight:"800",fontSize:"20px",color:NAVY,marginBottom:"8px" }}>Generation Failed</div>
            <div style={{ fontSize:"14px",color:SLATE,marginBottom:"24px" }}>Something went wrong. Let's try again.</div>
            <button
  onClick={() => upd(activePillar, { phase: "intake" })}
  style={{
    padding: "12px 28px",
    borderRadius: "10px",
    border: "none",
    background: `${PILLARS[activePillar].color}22`,
    color: PILLARS[activePillar].color,
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer"
  }}
>
  RETRY
</button>
          </div>
        )}
      </div>

      {/* - FOOTER - */}
      <div style={{ borderTop:`1px solid ${BORDER}`,padding:"16px 24px",textAlign:"center",background:SURFACE }}>
        <div style={{ fontSize:"10px",color:MUTED,letterSpacing:"2.5px",fontWeight:"600" }}>
          PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK {week} OF 3
        </div>
      </div>
    </div>
  );
}
