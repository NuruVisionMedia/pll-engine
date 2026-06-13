import React, { useState, useEffect } from "react";
// Stable build after component setupimport React, { useState, useEffect } from "react";

// â”€â”€â”€ DESIGN SYSTEM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Light premium: white base, slate-navy accents, pillar colors as precise hits
const B  = "#1D6FD8";   // TRAIN blue
const O  = "#D4500F";   // FUEL orange  
const P  = "#7C3AED";   // FOCUS purple
const G  = "#059669";   // success green

const BG          = "#F7F8FA";   // page background â€” cool light gray
const SURFACE     = "#FFFFFF";   // cards
const SURFACE2    = "#F0F2F5";   // inset / secondary surface
const NAVY        = "#0F1C2E";   // primary dark text / headers
const SLATE       = "#3D4F63";   // secondary text
const MUTED       = "#8496A9";   // tertiary / labels
const BORDER      = "#E1E7EE";   // subtle borders
const BORDER_MID  = "#C8D3DE";   // medium border

// â”€â”€â”€ STORAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Store = {
  save: (key, val) => { try { localStorage.setItem("pll_"+key, JSON.stringify(val)); } catch(e){} },
  load: (key) => { try { const v=localStorage.getItem("pll_"+key); return v?JSON.parse(v):null; } catch(e){ return null; } },
  del:  (key) => { try { localStorage.removeItem("pll_"+key); } catch(e){} }
};

// â”€â”€â”€ WEEK CONFIG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const WEEKS = {
  1: {
    label: "WEEK 1 â€” THE NEW SYSTEM",
    theme: "Foundation. New habits. New identity begins.",
    mantra: "Every champion was once a beginner who refused to quit. This is Day 1 of the rest of your life.",
    coachOpen:  (name) => `${name}, welcome to Phase 1. This week is about one thing â€” building the foundation that everything else stands on. Show up every day.`,
    coachClose: (name) => `${name}, Week 1 is DONE. You showed up every single day. That's what separates you already.`,
    intensity: "Foundation", repRange: "12-15 reps", sets: "3 sets", load: "Light to moderate â€” perfect form priority"
  },
  2: {
    label: "WEEK 2 â€” THE PROGRESSION",
    theme: "Intensity increases. Habits solidify. Halfway there.",
    mantra: "You've already done what most people won't. Now let's do what most people can't.",
    coachOpen:  (name) => `${name}, you made it to Week 2. That already puts you ahead of 80% of people who said they'd start.`,
    coachClose: (name) => `${name}, TWO WEEKS DOWN. Halfway through Phase 1 and you're already changing.`,
    intensity: "Progressive", repRange: "8-12 reps", sets: "4 sets", load: "Increase weight 10-15% from Week 1"
  },
  3: {
    label: "WEEK 3 â€” THE SEPARATION",
    theme: "This is where champions are made. Most quit. You won't.",
    mantra: "Week 3 is where your identity changes forever. You are no longer who you were.",
    coachOpen:  (name) => `${name}, this is THE week. The separation happens right here. Everyone starts. Almost nobody finishes. You will.`,
    coachClose: (name) => `${name}, PHASE 1 COMPLETE. You did what most people only talk about.`,
    intensity: "Peak", repRange: "6-10 reps", sets: "4-5 sets", load: "Maximum sustainable load"
  }
};

// â”€â”€â”€ EXERCISE VIDEOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

function getExerciseVideo(name) {
  if (!name) return null;
  const l = name.toLowerCase();
  for (const [key, url] of Object.entries(EXERCISE_VIDEOS)) {
    if (l.includes(key)) return url;
  }
  return null;
}

// â”€â”€â”€ PILLARS CONFIG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PILLARS = {
  TRAIN: {
    color: B, label: "TRAIN", subtitle: "WORKOUT BLUEPRINT",
    icon: (c,s=20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12"/>
      </svg>
    ),
    prompt: (answers, name, week, gender, ageRange) => {
      const w = WEEKS[week];
      const ageNote = ageRange === "18-24" ? "Foundation building phase. High volume appropriate." :
        ageRange === "25-34" ? "Peak performance window. Push intensity." :
        ageRange === "35-44" ? "Prioritize joint health. Progressive overload." :
        ageRange === "45-54" ? "Hormone-supportive training. Manage fatigue." :
        ageRange === "55-64" ? "Functional strength, balance, bone density." :
        ageRange === "65+" ? "Safety first. Mobility and maintaining muscle." : "";
      const genderNote = gender === "Female" ? "Tailor to female physiology: hormonal cycles, glute emphasis." :
        gender === "Male" ? "Testosterone-supportive training intensity. Compound lifts priority." : "";
      return `You are an elite fitness coach for Prime Level Living. Generate a complete Week ${week} training plan.
User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.goal}, Days=${answers.days}, Equipment=${answers.equipment}, Experience=${answers.experience}, Focus=${answers.focus}
Week Theme: ${w.theme}
Intensity: ${w.intensity}, Sets: ${w.sets}, Reps: ${w.repRange}, Load: ${w.load}
${ageNote ? `Age Note: ${ageNote}` : ""}
${genderNote ? `Gender Note: ${genderNote}` : ""}
Return ONLY valid JSON:
{
  "title": "Week ${week} Training Title",
  "subtitle": "Brief description",
  "coachMessage": "Personalized motivational message from coach to ${name} for week ${week}",
  "days": [{"day":1,"title":"Day Title","duration":"45 min","sets":"3 sets","reps":"12-15 reps","exercises":[{"name":"Exercise Name","sets":"3","reps":"12-15","tempo":"2-1-2","rest":"60s","formCue":"Key form tip","muscle":"Target muscle"}],"tips":["Tip 1","Tip 2","Tip 3"]}]
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
    prompt: (answers, name, week, gender, ageRange) => {
      const w = WEEKS[week];
      return `You are an elite nutrition coach for Prime Level Living. Generate a complete Week ${week} nutrition plan.
User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Goal=${answers.goal}, Diet=${answers.diet}, Supplement Experience=${answers.supplements}, Budget=${answers.budget}
Week Theme: ${w.theme}
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
    prompt: (answers, name, week, gender, ageRange) => {
      const w = WEEKS[week];
      return `You are an elite mindset coach for Prime Level Living. Generate a complete Week ${week} mental performance plan.
User Profile: Gender=${gender||"Not specified"}, Age Range=${ageRange||"Not specified"}, Mindset Goal=${answers.mindsetGoal}, Challenge=${answers.challenges}, Morning Routine=${answers.morning}, Stress=${answers.stress}
Week Theme: ${w.theme}, Mantra: ${w.mantra}
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

// â”€â”€â”€ INTAKE QUESTIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ STORE BRIDGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STORE_URL = "https://zs0r6d-2x.myshopify.com";
const STORE_COLLECTIONS = {
  TRAIN: { handle:"train", color:B, headline:(n,w)=>`${n}, your Week ${w} TRAIN stack is ready.`, subline:"Gear and supplements matched to your training profile â€” delivered.", cta:"Shop Your TRAIN Stack" },
  FUEL:  { handle:"fuel",  color:O, headline:(n,w)=>`${n}, your Week ${w} FUEL stack is ready.`, subline:"Supplements matched to your nutrition goals â€” ready to order.",    cta:"Shop Your FUEL Stack"  },
  FOCUS: { handle:"focus", color:P, headline:(n,w)=>`${n}, your Week ${w} FOCUS stack is ready.`,subline:"Mindset tools dialed to your program â€” shop now.",                   cta:"Shop Your FOCUS Stack" },
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
      }}>Ã—</button>
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
        Prime Level Living Â· Ships Direct
      </div>
    </div>
  );
}

// â”€â”€â”€ COACH AVATAR â€” Realistic portrait based on actual likeness â”€â”€â”€
// Deep brown skin, salt-and-pepper beard, shaved head, massive build,
// shoulder tattoo, intense upward-gazing expression
function CoachAvatar({ size = 80, pillar = "TRAIN", showRing = true }) {
  const color = pillar === "TRAIN" ? B : pillar === "FUEL" ? O : P;
  const id = `ca_${size}_${pillar}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin gradients â€” warm deep brown */}
        <radialGradient id={`${id}_skin`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#7B4A2A"/>
          <stop offset="60%" stopColor="#5A3018"/>
          <stop offset="100%" stopColor="#3A1C08"/>
        </radialGradient>
        <radialGradient id={`${id}_face`} cx="48%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#7A4828"/>
          <stop offset="70%" stopColor="#5C3218"/>
          <stop offset="100%" stopColor="#3A1C08"/>
        </radialGradient>
        <radialGradient id={`${id}_chest`} cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#6B3D20"/>
          <stop offset="100%" stopColor="#3A1C08"/>
        </radialGradient>
        <radialGradient id={`${id}_arm`} cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#6B3D20"/>
          <stop offset="100%" stopColor="#3A1C08"/>
        </radialGradient>
        <linearGradient id={`${id}_bg`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EEF2F8"/>
          <stop offset="100%" stopColor="#DDE4EE"/>
        </linearGradient>
        {showRing && (
          <filter id={`${id}_glow`}>
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={color} floodOpacity="0.35"/>
          </filter>
        )}
      </defs>

      {/* Background circle */}
      <circle cx="60" cy="60" r="58" fill={`url(#${id}_bg)`}/>
      {showRing && (
        <circle cx="60" cy="60" r="56" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
      )}

      {/* â”€â”€ TORSO / CHEST â”€â”€ */}
      {/* Neck */}
      <path d="M50 58 Q50 52 60 52 Q70 52 70 58 L68 70 Q60 72 52 70 Z" fill={`url(#${id}_skin)`}/>
      {/* Trap / shoulder mass */}
      <path d="M22 75 Q24 62 38 60 Q50 58 52 65 L52 95 Q38 98 28 96 Z" fill={`url(#${id}_chest)`}/>
      <path d="M98 75 Q96 62 82 60 Q70 58 68 65 L68 95 Q82 98 92 96 Z" fill={`url(#${id}_arm)`}/>
      {/* Main chest block */}
      <path d="M38 62 Q50 60 60 61 Q70 60 82 62 L82 96 Q72 100 60 100 Q48 100 38 96 Z" fill={`url(#${id}_chest)`}/>
      {/* Chest highlight / pec separation */}
      <path d="M42 70 Q52 67 60 69" stroke="#3A1C08" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M78 70 Q68 67 60 69" stroke="#3A1C08" strokeWidth="1.2" fill="none" opacity="0.5"/>
      {/* Ab center line */}
      <line x1="60" y1="72" x2="60" y2="98" stroke="#3A1C08" strokeWidth="0.8" opacity="0.35"/>
      <path d="M52 79 Q60 78 68 79" stroke="#3A1C08" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M52 86 Q60 85 68 86" stroke="#3A1C08" strokeWidth="0.8" fill="none" opacity="0.25"/>
      {/* Pec nipple detail */}
      <circle cx="50" cy="73" r="1.4" fill="#3A1C08" opacity="0.6"/>
      <circle cx="70" cy="73" r="1.4" fill="#3A1C08" opacity="0.6"/>

      {/* â”€â”€ LEFT ARM (viewer right) â€” bicep peak, vascular forearm â”€â”€ */}
      <path d="M38 62 Q26 65 20 72 Q15 80 18 88 Q20 93 25 91 Q22 87 24 80 Q28 72 36 70 Z" fill={`url(#${id}_arm)`}/>
      {/* Bicep peak */}
      <ellipse cx="21" cy="82" rx="5" ry="7" fill="#6B3D20" opacity="0.6" transform="rotate(-15 21 82)"/>
      {/* Forearm */}
      <path d="M25 91 Q23 100 24 108" stroke="#5C3018" strokeWidth="7" strokeLinecap="round"/>
      {/* Forearm vein */}
      <path d="M23 93 Q21 102 22 108" stroke="#3A1C08" strokeWidth="0.8" fill="none" opacity="0.4"/>
      {/* Fist */}
      <ellipse cx="24" cy="110" rx="5" ry="4" fill="#5C3018"/>

      {/* â”€â”€ RIGHT ARM (viewer left) â€” tattoo on this shoulder â”€â”€ */}
      <path d="M82 62 Q94 65 100 72 Q105 80 102 88 Q100 93 95 91 Q98 87 96 80 Q92 72 84 70 Z" fill={`url(#${id}_arm)`}/>
      {/* Bicep */}
      <ellipse cx="99" cy="82" rx="5" ry="7" fill="#6B3D20" opacity="0.6" transform="rotate(15 99 82)"/>
      {/* Tattoo on right shoulder â€” circular design matching photo */}
      <circle cx="88" cy="67" r="7" fill="none" stroke="#2A1008" strokeWidth="1.8" opacity="0.8"/>
      <path d="M83 64 Q88 60 93 64 Q91 70 88 72 Q85 70 83 64Z" fill="#2A1008" opacity="0.6"/>
      <path d="M85 70 Q88 74 91 70" stroke="#2A1008" strokeWidth="1" fill="none" opacity="0.7"/>
      {/* Forearm right */}
      <path d="M95 91 Q97 100 96 108" stroke="#5C3018" strokeWidth="7" strokeLinecap="round"/>
      <ellipse cx="96" cy="110" rx="5" ry="4" fill="#5C3018"/>

      {/* â”€â”€ HEAD â”€â”€ Shaved / very low cut, strong jaw, upward gaze */}
      {/* Head form */}
      <ellipse cx="60" cy="36" rx="18" ry="20" fill={`url(#${id}_face)`}/>
      {/* Very short hair / scalp â€” almost same tone, slight texture */}
      <ellipse cx="60" cy="22" rx="17" ry="10" fill="#2A1208" opacity="0.85"/>
      <path d="M43 30 Q44 20 60 18 Q76 20 77 30" fill="#2A1208" opacity="0.7"/>

      {/* Ear left */}
      <ellipse cx="42" cy="37" rx="3.5" ry="5" fill="#4A2410"/>
      <ellipse cx="43" cy="37" rx="2" ry="3.5" fill="#3A1A08"/>

      {/* Ear right */}
      <ellipse cx="78" cy="37" rx="3.5" ry="5" fill="#4A2410"/>
      <ellipse cx="77" cy="37" rx="2" ry="3.5" fill="#3A1A08"/>

      {/* Brow ridge â€” strong, slightly furrowed (intense gaze) */}
      <path d="M46 29 Q52 26 58 28" stroke="#1A0A04" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M62 28 Q68 26 74 29" stroke="#1A0A04" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Brow furrow center */}
      <path d="M58 28 Q60 27 62 28" stroke="#1A0A04" strokeWidth="1.5" fill="none" opacity="0.6"/>

      {/* Eyes â€” upward gaze (whites show below iris) */}
      {/* Eye whites */}
      <ellipse cx="53" cy="33" rx="5" ry="3.5" fill="#EEE8E0"/>
      <ellipse cx="67" cy="33" rx="5" ry="3.5" fill="#EEE8E0"/>
      {/* Irises â€” looking up-left slightly */}
      <circle cx="53" cy="31.5" r="3" fill="#2A1208"/>
      <circle cx="67" cy="31.5" r="3" fill="#2A1208"/>
      {/* Iris color ring */}
      <circle cx="53" cy="31.5" r="2.2" fill="#3D1E0A"/>
      <circle cx="67" cy="31.5" r="2.2" fill="#3D1E0A"/>
      {/* Pupils */}
      <circle cx="53" cy="31.5" r="1.2" fill="#0A0400"/>
      <circle cx="67" cy="31.5" r="1.2" fill="#0A0400"/>
      {/* Eye shine */}
      <circle cx="54" cy="30.5" r="0.8" fill="white" opacity="0.75"/>
      <circle cx="68" cy="30.5" r="0.8" fill="white" opacity="0.75"/>
      {/* Lower lid */}
      <path d="M48 35 Q53 37 58 35" stroke="#3A1A08" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M62 35 Q67 37 72 35" stroke="#3A1A08" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* Nose â€” broad, defined */}
      <path d="M58 34 Q56 40 54 43 Q60 45.5 66 43 Q64 40 62 34" fill="#3A1A08" opacity="0.35"/>
      <ellipse cx="54.5" cy="43" rx="3" ry="2" fill="#2A1008" opacity="0.55"/>
      <ellipse cx="65.5" cy="43" rx="3" ry="2" fill="#2A1008" opacity="0.55"/>

      {/* Mouth â€” strong, slightly parted / confident */}
      <path d="M50 48 Q56 50.5 60 50 Q64 50.5 70 48" stroke="#1A0A04" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M52 47 Q56 45 60 46.5 Q64 45 68 47" stroke="#2A1008" strokeWidth="1" fill="none" opacity="0.5"/>

      {/* Beard â€” salt-and-pepper full beard matching photos */}
      {/* Beard base */}
      <path d="M44 40 Q44 52 52 55 Q56 57 60 57 Q64 57 68 55 Q76 52 76 40 Q72 48 60 50 Q48 48 44 40Z"
        fill="#1E1410" opacity="0.82"/>
      {/* Salt/gray streaks in beard */}
      <path d="M52 45 Q54 50 56 54" stroke="#8A8078" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M60 46 Q60 51 60 55" stroke="#8A8078" strokeWidth="1" fill="none" opacity="0.45"/>
      <path d="M65 45 Q64 50 63 54" stroke="#8A8078" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M56 43 Q58 47 58 52" stroke="#7A7068" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M68 43 Q67 48 65 52" stroke="#7A7068" strokeWidth="0.8" fill="none" opacity="0.4"/>
      {/* Mustache */}
      <path d="M50 47 Q55 44 60 45.5 Q65 44 70 47" fill="#1A1008" opacity="0.75"/>
      {/* Chin definition */}
      <path d="M57 54 Q60 57 63 54" stroke="#3A1A08" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* Cheekbone highlight */}
      <ellipse cx="47" cy="40" rx="7" ry="4" fill="#7A4828" opacity="0.25" transform="rotate(-8 47 40)"/>
      <ellipse cx="73" cy="40" rx="7" ry="4" fill="#7A4828" opacity="0.25" transform="rotate(8 73 40)"/>

      {/* Pillar color accent â€” shirt/collar hint at bottom */}
      <path d="M42 97 Q52 101 60 101 Q68 101 78 97 L82 108 Q70 114 60 114 Q50 114 38 108 Z" fill={color} opacity="0.9"/>
      {/* PLL text on shirt */}
      <text x="60" y="110" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="5.5" fontWeight="800" fill="white" letterSpacing="1.5" opacity="0.95">PLL</text>
    </svg>
  );
}

// â”€â”€â”€ EXERCISE VIDEO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            <span style={{ fontSize:"14px",marginLeft:"3px" }}>â–¶</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div onClick={()=>setExpanded(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"20px" }}>
          <div style={{ width:"100%",maxWidth:"800px",position:"relative" }}>
            <button onClick={e=>{e.stopPropagation();setExpanded(false);}} style={{ position:"absolute",top:"-42px",right:0,background:"white",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px",fontWeight:"700" }}>Ã—</button>
            <div style={{ borderRadius:"12px",overflow:"hidden",aspectRatio:"16/9" }}>
              <iframe src={videoUrl+"?autoplay=1"} width="100%" height="100%" style={{border:"none",display:"block"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={exerciseName}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// â”€â”€â”€ COACH MESSAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        <CoachAvatar size={56} pillar={pillar} showRing={false}/>
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

// â”€â”€â”€ SECTION HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SectionLabel({ text, color }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:"10px",margin:"28px 0 14px" }}>
      <div style={{ width:"3px",height:"16px",background:color||NAVY,borderRadius:"2px" }}/>
      <span style={{ fontSize:"11px",fontWeight:"800",color:MUTED,letterSpacing:"2.5px" }}>{text}</span>
    </div>
  );
}

// â”€â”€â”€ TRAIN RESULT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TrainResult({ data, name, week, onDownload }) {
  const [activeDay, setActiveDay] = useState(0);
  if (!data?.days) return null;
  const day = data.days[activeDay];
  return (
    <div style={{ paddingBottom:"40px" }}>
      {/* Header card */}
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:B,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} Â· TRAIN</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px",letterSpacing:"-0.3px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="TRAIN" name={name}/>}

      {/* Day tabs */}
      <div style={{ display:"flex",gap:"8px",marginBottom:"24px",flexWrap:"wrap" }}>
        {data.days.map((d,i) => (
          <button key={i} onClick={()=>setActiveDay(i)} style={{
            padding:"10px 18px",borderRadius:"10px",
            border: activeDay===i ? "none" : `1.5px solid ${BORDER}`,
            background: activeDay===i ? B : SURFACE,
            color: activeDay===i ? "white" : SLATE,
            fontWeight:"700",fontSize:"13px",cursor:"pointer",
            letterSpacing:"0.5px",transition:"all 0.15s",
            boxShadow: activeDay===i ? `0 4px 14px ${B}35` : "none"
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
                <ExerciseVideo exerciseName={ex.name}/>
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

      <button onClick={onDownload} style={{
        width:"100%",padding:"16px",borderRadius:"12px",border:`1.5px solid ${B}`,
        background:NAVY,color:"white",fontWeight:"800",fontSize:"14px",
        cursor:"pointer",letterSpacing:"1.5px",marginTop:"24px",
        boxShadow:`0 4px 18px rgba(15,28,46,0.2)`
      }}>DOWNLOAD WEEK {week} TRAIN BLUEPRINT</button>
    </div>
  );
}

// â”€â”€â”€ FUEL RESULT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FuelResult({ data, name, week, onDownload }) {
  if (!data?.supplements) return null;
  return (
    <div style={{ paddingBottom:"40px" }}>
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:O,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} Â· FUEL</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="FUEL" name={name}/>}

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
                  <div key={j} style={{ fontSize:"13px",color:SLATE,padding:"3px 0",borderBottom:j<meal.foods.length-1?`1px solid ${BORDER}`:"none" }}>Â· {f}</div>
                ))}
                {meal.macros && <div style={{ fontSize:"11px",color:MUTED,marginTop:"8px",fontWeight:"600" }}>{meal.macros}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={onDownload} style={{
        width:"100%",padding:"16px",borderRadius:"12px",border:`1.5px solid ${O}30`,
        background:NAVY,color:"white",fontWeight:"800",fontSize:"14px",
        cursor:"pointer",letterSpacing:"1.5px",boxShadow:"0 4px 18px rgba(15,28,46,0.2)"
      }}>DOWNLOAD WEEK {week} FUEL BLUEPRINT</button>
    </div>
  );
}

// â”€â”€â”€ FOCUS RESULT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FocusResult({ data, name, week, onDownload }) {
  if (!data?.dailyPractices) return null;
  return (
    <div style={{ paddingBottom:"40px" }}>
      <div style={{ background:SURFACE,borderRadius:"16px",padding:"24px",marginBottom:"24px",border:`1px solid ${BORDER}`,boxShadow:"0 2px 12px rgba(15,28,46,0.06)" }}>
        <div style={{ fontSize:"10px",fontWeight:"800",color:P,letterSpacing:"2.5px",marginBottom:"8px" }}>WEEK {week} Â· FOCUS</div>
        <h2 style={{ fontSize:"26px",fontWeight:"800",color:NAVY,margin:"0 0 8px" }}>{data.title}</h2>
        <p style={{ fontSize:"14px",color:SLATE,margin:0,lineHeight:"1.6" }}>{data.subtitle}</p>
      </div>

      {data.coachMessage && <CoachMessage message={data.coachMessage} pillar="FOCUS" name={name}/>}

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

      <button onClick={onDownload} style={{
        width:"100%",padding:"16px",borderRadius:"12px",border:`1.5px solid ${P}30`,
        background:NAVY,color:"white",fontWeight:"800",fontSize:"14px",
        cursor:"pointer",letterSpacing:"1.5px",boxShadow:"0 4px 18px rgba(15,28,46,0.2)"
      }}>DOWNLOAD WEEK {week} FOCUS BLUEPRINT</button>
    </div>
  );
}

// â”€â”€â”€ LOADING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Loading({ pillar, name, week }) {
  const p = PILLARS[pillar];
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const t = setInterval(()=>setDots(d=>d.length>=3?".":d+"."),500);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div style={{ textAlign:"center",padding:"60px 20px" }}>
      <CoachAvatar size={80} pillar={pillar}/>
      <div style={{ marginTop:"24px",marginBottom:"8px" }}>
        <span style={{ fontSize:"13px",fontWeight:"800",color:p.color,letterSpacing:"2px" }}>GENERATING{dots}</span>
      </div>
      <div style={{ fontSize:"22px",fontWeight:"800",color:NAVY,marginBottom:"6px" }}>Building Your {pillar} Blueprint</div>
      <div style={{ fontSize:"14px",color:SLATE,marginBottom:"24px" }}>Personalizing for {name} â€” Week {week}</div>
      <div style={{ width:"200px",height:"3px",background:BORDER,borderRadius:"2px",margin:"0 auto",overflow:"hidden" }}>
        <div style={{ height:"100%",background:p.color,borderRadius:"2px",animation:"pllLoad 2s ease-in-out infinite" }}/>
      </div>
      <style>{`@keyframes pllLoad{0%{width:0%}50%{width:80%}100%{width:100%}}`}</style>
    </div>
  );
}

// â”€â”€â”€ INTAKE FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          <div style={{ fontSize:"12px",color:MUTED,marginTop:"4px" }}>Week {profile?.week||1} Â· {WEEKS[profile?.week||1]?.theme}</div>
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
                  fontWeight:"700",fontSize:"13px",cursor:"pointer",transition:"all 0.15s",
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
          background: allAnswered ? NAVY : BORDER_MID,
          color: allAnswered ? "white" : MUTED,
          fontWeight:"800",fontSize:"14px",cursor:allAnswered?"pointer":"not-allowed",
          letterSpacing:"1.5px",marginTop:"8px",
          boxShadow: allAnswered ? "0 6px 22px rgba(15,28,46,0.25)" : "none",
          transition:"all 0.2s"
        }}>
        {allAnswered ? `GENERATE MY WEEK ${profile?.week||1} ${pillar} BLUEPRINT` : "COMPLETE ALL SELECTIONS ABOVE"}
      </button>
    </div>
  );
}

// â”€â”€â”€ PDF DOWNLOAD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function downloadPDF(data, pillar, name, week) {
  const w = window.open("","_blank");
  w.document.write(`<html><head><title>PLL ${pillar} Week ${week} â€” ${name}</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:800px;margin:0 auto;padding:40px 32px;color:#0F1C2E;background:#fff;}
  h1{font-size:28px;font-weight:800;color:#0F1C2E;margin:0 0 8px;}
  .tag{display:inline-block;background:#EFF6FF;color:#1D6FD8;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;margin-bottom:16px;}
  pre{white-space:pre-wrap;font-family:inherit;font-size:13px;line-height:1.6;color:#3D4F63;}
  .footer{margin-top:40px;padding-top:20px;border-top:1px solid #E1E7EE;font-size:11px;color:#8496A9;letter-spacing:2px;}
</style>
</head><body>
<h1>${data.title||`${pillar} Week ${week} Blueprint`}</h1>
<span class="tag">PRIME LEVEL LIVING Â· ${name} Â· WEEK ${week}</span>
<p style="color:#3D4F63;font-size:15px;">${data.subtitle||""}</p>
${data.coachMessage?`<div style="border-left:4px solid #1D6FD8;padding:16px 20px;margin:20px 0;background:#F7F8FA;border-radius:0 8px 8px 0;"><strong>Coach Message:</strong><br/><em>${data.coachMessage}</em></div>`:""}
<pre>${JSON.stringify(data,null,2)}</pre>
<div class="footer">PRIME LEVEL LIVING Â· NURU VISION MEDIA Â· PHASE 1 Â· WEEK ${week} OF 3</div>
</body></html>`);
  w.document.close();
  setTimeout(()=>w.print(),500);
}

// â”€â”€â”€ PILLAR NAV BUTTON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PillarButton({ pillar, active, done, onClick }) {
  const p = PILLARS[pillar];
  const color = p.color;
  return (
    <button onClick={onClick} style={{
      display:"flex",flexDirection:"column",alignItems:"center",gap:"5px",
      padding:"10px 14px",minWidth:"72px",borderRadius:"12px",cursor:"pointer",
      transition:"all 0.2s ease",
      border: active ? "none" :
              done   ? `1.5px solid ${color}35` :
                       `1.5px solid ${BORDER}`,
      background: active ? NAVY :
                  done   ? `${color}0D` :
                           SURFACE,
      boxShadow: active ? `0 4px 18px rgba(15,28,46,0.22)` :
                 done   ? `0 2px 8px ${color}18` :
                          "none",
    }}>
      {/* Icon */}
      <div style={{ opacity: active||done ? 1 : 0.5 }}>
        {p.icon(active ? "white" : done ? color : MUTED, 18)}
      </div>
      {/* Label */}
      <span style={{
        fontSize:"10px",fontWeight:"800",letterSpacing:"1.5px",
        color: active ? "white" : done ? color : MUTED
      }}>{pillar}</span>
      {/* Status */}
      {done && !active && (
        <span style={{
          fontSize:"9px",fontWeight:"800",color:color,
          background:`${color}15`,padding:"1px 6px",borderRadius:"10px",
          border:`1px solid ${color}25`,letterSpacing:"0.5px"
        }}>âœ“ DONE</span>
      )}
    </button>
  );
}

// â”€â”€â”€ MAIN APP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  const [screen, setScreen] = useState("login");
  const [profile, setProfile] = useState(null);
  const [activePillar, setActivePillar] = useState("TRAIN");
  const [pillarStates, setPillarStates] = useState({ TRAIN:{phase:"intake"}, FUEL:{phase:"intake"}, FOCUS:{phase:"intake"} });
  const [completedPillars, setCompletedPillars] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [bridgeDismissed, setBridgeDismissed] = useState({});
  const [loginForm, setLoginForm] = useState({ username:"", password:"" });
  const [createForm, setCreateForm] = useState({ firstName:"", username:"", email:"", password:"", gender:"", ageRange:"" });
  const [loginMode, setLoginMode] = useState("signin");
  const [loginError, setLoginError] = useState("");

  const upd = (pillar, update) => setPillarStates(prev=>({...prev,[pillar]:{...prev[pillar],...update}}));
  const st = pillarStates[activePillar];
  const week = profile?.week || 1;
  const name = profile?.firstName || profile?.username || "Athlete";

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
    const newProfile = { firstName:createForm.firstName, username:createForm.username, email:createForm.email, password:createForm.password, gender:createForm.gender, ageRange:createForm.ageRange, week:1, answers:{}, createdAt:new Date().toISOString() };
    login(newProfile);
  };

  const generate = async (pillar, answers) => {
    upd(pillar,{phase:"loading",answers});
    const newAnswers = {...(profile?.answers||{}),[pillar]:answers};
    saveProfile({answers:newAnswers});
    try {
      const n = profile?.firstName||profile?.username||"Athlete";
      const gender = profile?.gender||"";
      const ageRange = profile?.ageRange||"";
      const prompt = PILLARS[pillar].prompt(answers,n,week,gender,ageRange);
      const res = await fetch("/api/generate",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},
        body:JSON.stringify({model:"claude-haiku-4-5",max_tokens:4000,messages:[{role:"user",content:prompt}]})
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = (data.content||[]).filter(c=>c.type==="text").map(c=>c.text).join("");
      const clean = text.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/i,"").trim();
      const result = JSON.parse(clean);
      upd(pillar,{phase:"result",result});
      if (!completedPillars.includes(pillar)) {
        setCompletedPillars(prev=>[...prev,pillar]);
      }
    } catch(err) {
      console.error("PLL Engine error:",err.message);
      upd(pillar,{phase:"error"});
    }
  };

  // â”€â”€ LOGIN SCREEN â”€â”€
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
              TRAIN Â· FUEL Â· FOCUS
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
                background:NAVY,color:"white",fontWeight:"800",fontSize:"14px",
                cursor:"pointer",letterSpacing:"1.5px",marginTop:"8px",
                boxShadow:"0 6px 22px rgba(15,28,46,0.3)"
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
                    }}>{g==="Male"?"â™‚ Male":"â™€ Female"}</button>
                  ))}
                </div>
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
                background:NAVY,color:"white",fontWeight:"800",fontSize:"14px",
                cursor:"pointer",letterSpacing:"1.5px",
                boxShadow:"0 6px 22px rgba(15,28,46,0.3)"
              }}>START MY TRANSFORMATION</button>
            </>
          )}

          <p style={{ textAlign:"center",fontSize:"11px",color:MUTED,margin:"20px 0 0",letterSpacing:"1px" }}>
            21 DAYS Â· 3 PILLARS Â· ONE TRANSFORMATION
          </p>
        </div>
      </div>
    );
  }

  // â”€â”€ CELEBRATION SCREEN â”€â”€
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
            <button onClick={()=>{
              saveProfile({week:week+1});
              setCompletedPillars([]);
              setShowCelebration(false);
              setPillarStates({TRAIN:{phase:"intake"},FUEL:{phase:"intake"},FOCUS:{phase:"intake"}});
            }} style={{
              padding:"18px 44px",borderRadius:"12px",border:"none",
              background:`linear-gradient(135deg, ${B}, #2A7FE8)`,
              color:"white",fontWeight:"800",fontSize:"15px",cursor:"pointer",
              letterSpacing:"1.5px",boxShadow:`0 8px 28px ${B}50`
            }}>START WEEK {week+1}</button>
          ) : (
            <div>
              <div style={{ background:"rgba(255,255,255,0.07)",border:`1px solid rgba(255,255,255,0.12)`,borderRadius:"16px",padding:"24px",marginBottom:"24px" }}>
                <div style={{ fontSize:"10px",fontWeight:"800",color:O,letterSpacing:"2.5px",marginBottom:"10px" }}>PHASE 1 COMPLETE</div>
                <p style={{ color:"rgba(255,255,255,0.8)",fontSize:"15px",margin:0,lineHeight:"1.6" }}>
                  21 days. 3 pillars. Fully completed. You are no longer who you were.
                </p>
              </div>
              <button style={{
                padding:"18px 44px",borderRadius:"12px",border:"none",
                background:`linear-gradient(135deg, ${O}, #E86020)`,
                color:"white",fontWeight:"800",fontSize:"15px",cursor:"pointer",letterSpacing:"1.5px",
                boxShadow:`0 8px 28px ${O}45`
              }}>UNLOCK PHASE 2</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const progressPct = Math.round((completedPillars.length/3)*100);

  // â”€â”€ MAIN APP SCREEN â”€â”€
  return (
    <div style={{ minHeight:"100vh",background:BG,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif" }}>
      {/* â”€â”€ HEADER â”€â”€ */}
      <div style={{
        background:SURFACE,borderBottom:`1px solid ${BORDER}`,
        padding:"0 24px",position:"sticky",top:0,zIndex:100,
        boxShadow:"0 1px 10px rgba(15,28,46,0.07)"
      }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",gap:"16px",height:"64px" }}>
          {/* Brand */}
          <div style={{ display:"flex",alignItems:"center",gap:"12px",marginRight:"auto" }}>
            <CoachAvatar size={38} pillar={activePillar} showRing={false}/>
            <div>
              <div style={{ fontSize:"15px",fontWeight:"900",color:NAVY,letterSpacing:"1px" }}>PLL ENGINE</div>
              <div style={{ fontSize:"9px",color:MUTED,letterSpacing:"2.5px" }}>PRIME LEVEL LIVING</div>
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

      {/* â”€â”€ PROGRESS BAR â”€â”€ */}
      <div style={{ background:SURFACE,borderBottom:`1px solid ${BORDER}`,padding:"10px 24px" }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"7px" }}>
            <span style={{ fontSize:"10px",fontWeight:"700",color:MUTED,letterSpacing:"2px" }}>
              WEEK {week} PROGRESS Â· {WEEKS[week]?.theme}
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

      {/* â”€â”€ MAIN CONTENT â”€â”€ */}
      <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"28px 24px" }}>

        {/* Active pillar header */}
        <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px" }}>
          {PILLARS[activePillar].icon(PILLARS[activePillar].color, 22)}
          <div>
            <span style={{ fontSize:"13px",fontWeight:"800",color:PILLARS[activePillar].color,letterSpacing:"2px" }}>{activePillar}</span>
            <span style={{ fontSize:"13px",color:MUTED,marginLeft:"10px" }}>Â· {PILLARS[activePillar].subtitle}</span>
          </div>
          <div style={{ marginLeft:"auto",padding:"5px 14px",borderRadius:"20px",background:SURFACE,border:`1px solid ${BORDER}`,fontSize:"11px",fontWeight:"700",color:SLATE }}>
            {WEEKS[week]?.label||`WEEK ${week}`}
          </div>
        </div>

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

        {/* All 3 pillars complete â€” Complete Week CTA */}
        {completedPillars.length===3 && !showCelebration && (
          <div style={{
            margin:"32px 0 8px",borderRadius:"16px",
            background:NAVY,padding:"28px 24px",textAlign:"center",
            boxShadow:"0 8px 32px rgba(15,28,46,0.2)"
          }}>
            <div style={{ display:"flex",justifyContent:"center",gap:"8px",marginBottom:"14px" }}>
              {[B,O,P].map((c,i)=><div key={i} style={{ width:"28px",height:"3px",borderRadius:"2px",background:c }}/>)}
            </div>
            <div style={{ fontSize:"10px",fontWeight:"800",color:G,letterSpacing:"3px",marginBottom:"10px" }}>
              ALL 3 PILLARS COMPLETE
            </div>
            <div style={{ fontSize:"22px",fontWeight:"900",color:"white",marginBottom:"8px" }}>
              Week {week} Blueprint Done, {name}.
            </div>
            <div style={{ fontSize:"13px",color:"rgba(255,255,255,0.6)",marginBottom:"24px",lineHeight:"1.6" }}>
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
            <button onClick={()=>upd(activePillar,{phase:"intake"})} style={{
              padding:"12px 28px",borderRadius:"10px",border:"none",
              background:PILLARS[activePillar].color,color:"white",fontWeight:"800",fontSize:"14px",cursor:"pointer"
            }}>RETRY</button>
          </div>
        )}
      </div>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <div style={{ borderTop:`1px solid ${BORDER}`,padding:"16px 24px",textAlign:"center",background:SURFACE }}>
        <div style={{ fontSize:"10px",color:MUTED,letterSpacing:"2.5px",fontWeight:"600" }}>
          PRIME LEVEL LIVING Â· NURU VISION MEDIA Â· PHASE 1 Â· WEEK {week} OF 3
        </div>
      </div>
    </div>
  );
}
