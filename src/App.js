import { useState, useEffect, useRef } from "react";

const B="#00C2FF",O="#FF6B2B",P="#A855F7",G="#00FF88",BG="#060608",CD="#0C0C14",BR="#16162A";

// ── STORAGE ──────────────────────────────────────────────────────────────────
const Store = {
save: (key, val) => { try { localStorage.setItem("pll_"+key, JSON.stringify(val)); } catch(e){} },
load: (key) => { try { const v=localStorage.getItem("pll_"+key); return v?JSON.parse(v):null; } catch(e){ return null; } },
del: (key) => { try { localStorage.removeItem("pll_"+key); } catch(e){} }
};

// ── WEEK CONFIG ───────────────────────────────────────────────────────────────
const WEEKS = {
1: {
label: "WEEK 1 — THE NEW SYSTEM",
theme: "Foundation. New habits. New identity begins.",
mantra: "Every champion was once a beginner who refused to quit. This is Day 1 of the rest of your life.",
coachOpen: (name) => `${name}, welcome to Phase 1. This week is about one thing — building the system. Don't focus on perfection. Focus on showing up. Let's go.`,
coachClose: (name) => `${name}, Week 1 is DONE. You showed up every single day. That's what separates the ones who make it. Rest up — Week 2 is where we turn the heat up.`,
intensity: "Foundation",
repRange: "12-15 reps",
sets: "3 sets",
load: "Light to moderate — focus on form"
},
2: {
label: "WEEK 2 — THE PROGRESSION",
theme: "Intensity increases. Habits solidify. Halfway there.",
mantra: "You've already done what most people won't. Now let's do what most people can't.",
coachOpen: (name) => `${name}, you made it to Week 2. That already puts you ahead of 80% of people who start. This week we push harder — more weight, more intensity, no excuses.`,
coachClose: (name) => `${name}, TWO WEEKS DOWN. Halfway through Phase 1 and you're already not the same person who started. One more week. The final push. This is where legends are made.`,
intensity: "Progressive",
repRange: "8-12 reps",
sets: "4 sets",
load: "Increase weight 10-15% from Week 1"
},
3: {
label: "WEEK 3 — THE SEPARATION",
theme: "Final push. New self is locking in. No turning back.",
mantra: "The old you is gone. The new system is locked. Finish what you started.",
coachOpen: (name) => `${name}, this is it. Week 3. The final separation from who you were. Most people quit before they get here. You didn't. Now finish it.`,
coachClose: (name) => `${name}... 21 DAYS. DONE. You are not the same person who opened this app 3 weeks ago. Phase 1 is complete. You've earned what comes next. Welcome to Phase 2.`,
intensity: "Peak",
repRange: "6-10 reps",
sets: "4-5 sets",
load: "Increase weight 15-20% from Week 2. Maximum effort."
}
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:${BG};font-family:'Space Grotesk',sans-serif;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${B}33;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes breatheB{0%,100%{filter:drop-shadow(0 0 16px ${B}44);}50%{filter:drop-shadow(0 0 32px ${B}88);}}
@keyframes breatheO{0%,100%{filter:drop-shadow(0 0 16px ${O}44);}50%{filter:drop-shadow(0 0 32px ${O}88);}}
@keyframes breatheP{0%,100%{filter:drop-shadow(0 0 16px ${P}44);}50%{filter:drop-shadow(0 0 32px ${P}88);}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes scan{0%{transform:translateY(-100%);}100%{transform:translateY(600%);}}
@keyframes rim{0%,100%{opacity:.4;}50%{opacity:.9;}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${B}44;}50%{box-shadow:0 0 0 8px ${B}00;}}
@keyframes celebrate{0%{transform:scale(1);}50%{transform:scale(1.05);}100%{transform:scale(1);}}
.chip{background:#0A0A14;border:1px solid #1E1E30;color:#777;padding:10px 18px;border-radius:40px;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:500;transition:all .18s;}
.chip:hover,.chip.on{border-color:var(--c,${B});color:var(--c,${B});background:var(--cb,${B}11);}
.inp{background:#0A0A12;border:1px solid #1E1E30;color:#E8E8F0;padding:13px 16px;border-radius:8px;width:100%;font-family:'Space Grotesk',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
.inp:focus{border-color:${B}88;}
.inp[type="password"]{letter-spacing:3px;}
.pbtn{border:none;padding:14px 32px;border-radius:8px;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;letter-spacing:1px;transition:all .2s;width:100%;}
.pbtn:hover:not(:disabled){filter:brightness(1.12);transform:translateY(-2px);}
.pbtn:disabled{opacity:.4;cursor:not-allowed;}
.gbtn{background:transparent;color:#444;border:1px solid #1E1E30;padding:8px 16px;border-radius:6px;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:12px;transition:all .18s;}
.gbtn:hover{color:#888;border-color:#333;}
.dtab{background:#0C0C14;border:1px solid #1E1E30;color:#555;padding:8px 14px;border-radius:6px;cursor:pointer;font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:2px;transition:all .18s;}
.dtab.on{color:#000;}
.btab{background:#0C0C14;border:1px solid #1E1E30;color:#555;padding:7px 12px;border-radius:6px;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:600;transition:all .18s;}
.btab.on{color:#fff;}
.week-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:2px;}
`;

// ── AVATAR ────────────────────────────────────────────────────────────────────
function Avatar({size=200,pillar="TRAIN"}){
const ac=pillar==="TRAIN"?B:pillar==="FUEL"?O:P;
const an=pillar==="TRAIN"?"breatheB":pillar==="FUEL"?"breatheO":"breatheP";
return(
<svg width={size} height={size*1.45} viewBox="0 0 220 320" fill="none" style={{animation:`${an} 4s ease-in-out infinite`,flexShrink:0}}>
<defs>
<linearGradient id={`sk${pillar}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8B5A3C"/><stop offset="60%" stopColor="#7A4F35"/><stop offset="100%" stopColor="#5C3820"/></linearGradient>
<linearGradient id={`sh${pillar}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5C3820"/><stop offset="100%" stopColor="#3D2414"/></linearGradient>
<linearGradient id={`st${pillar}`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0F0F1A"/><stop offset="100%" stopColor="#080810"/></linearGradient>
<radialGradient id={`glow${pillar}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={ac} stopOpacity="0.15"/><stop offset="100%" stopColor={ac} stopOpacity="0"/></radialGradient>
</defs>
<ellipse cx="110" cy="316" rx="62" ry="7" fill={`url(#glow${pillar})`}/>
{/* Legs */}
<path d="M85 205 C82 228 80 254 81 280 C82 292 87 297 91 297 C95 297 97 292 97 282 C97 260 96 234 95 213Z" fill={`url(#sk${pillar})`}/>
<path d="M125 205 C128 228 130 254 129 280 C128 292 123 297 119 297 C115 297 113 292 114 282 C114 260 115 234 115 213Z" fill={`url(#sk${pillar})`}/>
<ellipse cx="89" cy="246" rx="7" ry="5" fill="#6A3D25" opacity=".6"/>
<ellipse cx="121" cy="246" rx="7" ry="5" fill="#6A3D25" opacity=".6"/>
{/* Shorts */}
<path d="M73 174 C71 188 73 202 77 209 C82 216 87 218 91 218 C95 218 97 213 98 208 L110 208 L122 208 C123 213 125 218 129 218 C133 218 138 216 143 209 C147 202 149 188 147 174Z" fill={`url(#st${pillar})`}/>
<rect x="72" y="171" width="76" height="7" rx="2" fill="#0A0A14"/>
<rect x="72" y="174" width="3" height="36" rx="1" fill={ac} opacity=".2"/>
<rect x="145" y="174" width="3" height="36" rx="1" fill={ac} opacity=".2"/>
{/* Torso */}
<path d="M74 116 C67 132 67 152 69 172 L151 172 C153 152 153 132 146 116 C139 106 126 101 110 101 C94 101 81 106 74 116Z" fill={`url(#sk${pillar})`}/>
<path d="M74 116 C69 132 69 152 71 172" stroke="#3D2414" strokeWidth="6" strokeOpacity=".5" fill="none" strokeLinecap="round"/>
<path d="M146 116 C151 132 151 152 149 172" stroke="#3D2414" strokeWidth="6" strokeOpacity=".5" fill="none" strokeLinecap="round"/>
{/* Pecs */}
<path d="M79 116 C79 125 84 135 94 137 C101 138 108 135 110 130 C108 123 102 115 92 113 C86 112 79 113 79 116Z" fill="#A06840" opacity=".55"/>
<path d="M141 116 C141 125 136 135 126 137 C119 138 112 135 110 130 C112 123 118 115 128 113 C134 112 141 113 141 116Z" fill="#A06840" opacity=".48"/>
<path d="M110 107 L110 139" stroke="#3D2414" strokeWidth="2.5" strokeOpacity=".4"/>
{/* Abs */}
{[144,153,162].map((y,i)=>(
<g key={i}>
<rect x="98" y={y} width="10" height="7" rx="2" fill="#5C3820" opacity=".6"/>
<rect x="112" y={y} width="10" height="7" rx="2" fill="#5C3820" opacity=".6"/>
</g>
))}
<path d="M110 139 L110 172" stroke="#3D2414" strokeWidth="2" strokeOpacity=".5"/>
{/* Arms */}
<path d="M76 114 C63 114 50 123 46 137 C42 151 46 163 52 169 C58 175 66 173 70 167 C74 161 74 149 76 137 C78 127 78 119 76 114Z" fill={`url(#sk${pillar})`}/>
<path d="M52 169 C48 177 46 189 48 198 C50 206 56 210 62 208 C68 206 71 200 70 192 C69 184 66 176 64 170Z" fill={`url(#sh${pillar})`}/>
<path d="M144 114 C157 112 170 119 176 132 C182 145 180 159 174 165 C168 171 160 169 156 163 C152 157 152 145 150 133 C148 123 146 117 144 114Z" fill={`url(#sk${pillar})`}/>
<path d="M174 165 C179 173 181 185 179 194 C177 202 171 206 165 204 C159 202 156 196 158 188 C159 180 162 172 164 166Z" fill={`url(#sh${pillar})`}/>
{/* Neck */}
<path d="M97 93 C95 97 94 103 95 107 C97 110 103 112 110 112 C117 112 123 110 125 107 C126 103 125 97 123 93Z" fill={`url(#sk${pillar})`}/>
{/* Head — face completely voided */}
<path d="M82 68 C82 48 90 36 110 34 C130 34 138 48 138 68 C138 85 132 93 128 95 C124 97 116 99 110 99 C104 99 96 97 92 95 C88 93 82 85 82 68Z" fill="#000" opacity=".97"/>
<path d="M82 68 C78 66 76 70 76 74 C76 78 78 82 82 81" stroke="#5C3820" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
<path d="M138 68 C142 66 144 70 144 74 C144 78 142 82 138 81" stroke="#5C3820" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
{/* Rim lights */}
<path d="M82 45 C80 53 80 65 82 77 C84 85 88 93 92 95" stroke={ac} strokeWidth="2" strokeOpacity=".55" fill="none" strokeLinecap="round" style={{animation:"rim 3s ease-in-out infinite"}}/>
<path d="M138 45 C140 53 140 65 138 77 C136 85 132 93 128 95" stroke={ac} strokeWidth="2" strokeOpacity=".45" fill="none" strokeLinecap="round" style={{animation:"rim 3s ease-in-out infinite .6s"}}/>
<path d="M92 33 C98 30 104 29 110 29 C116 29 122 30 128 33" stroke={ac} strokeWidth="2.5" strokeOpacity=".5" fill="none" strokeLinecap="round"/>
<path d="M74 115 C67 119 57 127 49 139" stroke={ac} strokeWidth="1.5" strokeOpacity=".3" fill="none" strokeLinecap="round"/>
<path d="M146 115 C153 119 163 125 173 135" stroke={ac} strokeWidth="1.5" strokeOpacity=".28" fill="none" strokeLinecap="round"/>
<rect x="64" y="30" width="92" height="1.5" fill={ac} opacity=".04" style={{animation:"scan 5s linear infinite"}}/>
<g transform="translate(76,278)">
<rect x="0" y="0" width="68" height="16" rx="8" fill={ac} opacity=".1"/>
<rect x="0" y="0" width="68" height="16" rx="8" fill="none" stroke={ac} strokeWidth=".7" strokeOpacity=".3"/>
<text x="34" y="11.5" textAnchor="middle" fill={ac} fontSize="7" fontFamily="Space Grotesk,sans-serif" fontWeight="700" letterSpacing="1.5" opacity=".8">PLL COACH</text>
</g>
</svg>
);
}

// ── GIF ───────────────────────────────────────────────────────────────────────
function Gif({term,name}){
const [url,setUrl]=useState(null);
const [loading,setLoading]=useState(true);
useEffect(()=>{
fetch(`https://api.giphy.com/v1/gifs/search?api_key=sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh&q=${encodeURIComponent((term||name)+" exercise")}&limit=1&rating=g`)
.then(r=>r.json()).then(d=>{if(d.data?.[0])setUrl(d.data[0].images.fixed_height.url);setLoading(false);})
.catch(()=>setLoading(false));
},[term,name]);
return(
<div style={{width:"100%",height:"120px",background:"#080810",borderRadius:"6px",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BR}`}}>
{loading&&<div style={{width:"16px",height:"16px",border:`2px solid ${B}33`,borderTopColor:B,borderRadius:"50%",animation:"spin .8s linear infinite"}}/>}
{url&&<img src={url} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.85}}/>}
{!url&&!loading&&<span style={{fontSize:"10px",color:"#2A2A3A",padding:"6px",textAlign:"center"}}>{name}</span>}
</div>
);
}

// ── PILLARS CONFIG ────────────────────────────────────────────────────────────
const PILLARS={
TRAIN:{color:B,icon:"⚡",label:"TRAIN",tagline:"Workout Blueprint Generator",
questions:[
{id:"goal",label:"PRIMARY GOAL",options:["Build Muscle","Lose Fat","Athletic Performance","Aesthetic Frame"]},
{id:"days",label:"TRAINING DAYS / WEEK",options:["3 Days","4 Days","5 Days","6 Days"]},
{id:"equipment",label:"EQUIPMENT ACCESS",options:["Full Gym","Home + Dumbbells","Bodyweight Only"]},
{id:"level",label:"EXPERIENCE LEVEL",options:["Beginner","Intermediate","Advanced"]},
{id:"focus",label:"FOCUS AREA",options:["Upper Body","Lower Body","Full Body","Core + Functional"]},
],
prompt:(a,n,week)=>{
const w=WEEKS[week];
return `You are the PLL Coach. Generate a Week ${week} workout blueprint for ${n||"Athlete"}.
Week ${week} context: ${w.theme}. Intensity: ${w.intensity}. Sets: ${w.sets}. Reps: ${w.repRange}. Load: ${w.load}.
Goal: ${a.goal} | Days: ${a.days} | Equipment: ${a.equipment} | Level: ${a.level} | Focus: ${a.focus}
This is Week ${week} of 3. Programming should ${week===1?"establish foundations and form":week===2?"increase intensity and load 10-15% from week 1":"push to maximum effort, final push of Phase 1"}.
Return ONLY valid JSON no markdown:
{"headline":"WEEK ${week} BLUEPRINT NAME IN CAPS","summary":"2 sentences specific to week ${week} and this user","coachNote":"1 motivating line for week ${week} addressed to ${n||"Athlete"}","days":[{"day":"DAY 1","focus":"muscle group","duration":"est","exercises":[{"name":"Exercise","sets":"${w.sets}","reps":"${w.repRange}","tempo":"3-1-2","rest":"90s","cue":"form cue","muscle":"muscle","searchTerm":"search term"}]}],"weeklyTips":["tip1","tip2","tip3"]}`;
}
},
FUEL:{color:O,icon:"🔥",label:"FUEL",tagline:"Supplement & Nutrition Stack",
questions:[
{id:"fuelGoal",label:"FUEL PRIORITY",options:["Performance & Strength","Recovery & Repair","Fat Loss","Clean Energy","Muscle Building"]},
{id:"frequency",label:"TRAINING FREQUENCY",options:["2-3x per week","4-5x per week","6x+ per week"]},
{id:"currentStack",label:"CURRENT SUPPLEMENT USE",options:["Nothing yet","Basic (Protein + Creatine)","Intermediate Stack","Advanced Stack"]},
{id:"budget",label:"MONTHLY BUDGET",options:["Under $50","$50–$100","$100–$150","$150+"]},
{id:"lifestyle",label:"LIFESTYLE TYPE",options:["Athlete","Entrepreneur / High Performer","Both","General Fitness"]},
],
prompt:(a,n,week)=>{
const w=WEEKS[week];
return `You are the PLL Coach. Generate a Week ${week} fuel stack for ${n||"Athlete"}.
Week ${week} context: ${w.theme}. This is week ${week} of 3. ${week===1?"Week 1: introduce essential supplements.":week===2?"Week 2: build on week 1, add performance enhancers.":"Week 3: maximize recovery and performance for the final push."}
Fuel priority: ${a.fuelGoal} | Frequency: ${a.frequency} | Current: ${a.currentStack} | Budget: ${a.budget} | Lifestyle: ${a.lifestyle}
Return ONLY valid JSON no markdown:
{"headline":"WEEK ${week} FUEL STACK NAME","summary":"2 sentences for week ${week}","coachNote":"1 direct line to ${n||"Athlete"} about week ${week} fueling","stack":[{"name":"Supplement","category":"Category","dose":"Dose","timing":"When","why":"Why for week ${week}","priority":"Essential"}],"nutritionProtocol":{"calories":"target","protein":"daily","carbs":"daily","fats":"daily","mealTiming":["tip1","tip2","tip3"]},"weeklyTips":["tip1","tip2","tip3"]}`;
}
},
FOCUS:{color:P,icon:"🧠",label:"FOCUS",tagline:"Recovery & Mental Performance",
questions:[
{id:"sleep",label:"SLEEP QUALITY",options:["Poor — under 6hrs","Average — 6-7hrs","Good — 7-8hrs","Optimal — 8hrs+"]},
{id:"stress",label:"STRESS LEVEL",options:["High","Moderate","Low"]},
{id:"focusNeed",label:"PRIMARY FOCUS NEED",options:["Morning Activation","Deep Work Blocks","Post-Training Recovery","Sleep Optimization"]},
{id:"lifestyle",label:"LIFESTYLE TYPE",options:["Athlete","Entrepreneur / High Performer","Both","Student"]},
{id:"wakeTime",label:"WAKE TIME",options:["5–6 AM","6–7 AM","7–8 AM","After 8 AM"]},
],
prompt:(a,n,week)=>{
const w=WEEKS[week];
return `You are the PLL Coach. Generate a Week ${week} focus and recovery protocol for ${n||"Athlete"}.
Week ${week}: ${w.theme}. ${week===1?"Establish baseline habits and routines":week===2?"Deepen protocols, optimize recovery between harder sessions":"Maximize mental performance for final push, celebrate progress"}.
Sleep: ${a.sleep} | Stress: ${a.stress} | Need: ${a.focusNeed} | Lifestyle: ${a.lifestyle} | Wake: ${a.wakeTime}
Return ONLY valid JSON no markdown:
{"headline":"WEEK ${week} PROTOCOL NAME","summary":"2 sentences for week ${week}","coachNote":"1 direct line to ${n||"Athlete"} about week ${week} mental performance","dailyBlocks":[{"block":"BLOCK NAME","time":"time","duration":"duration","actions":[{"action":"Action","detail":"How","why":"Why week ${week}"}]}],"recoveryProtocol":{"sleepTarget":"target","deloadFrequency":"rec","activeRecovery":["r1","r2","r3"]},"weeklyTips":["tip1","tip2","tip3"]}`;
}
}
};

// ── PDF DOWNLOAD ──────────────────────────────────────────────────────────────
function downloadPDF(data,pillar,name,week){
const cfg=PILLARS[pillar];
const wk=WEEKS[week];
const hex=cfg.color.replace("#","");
let body="";
if(pillar==="TRAIN"&&data.days){
data.days.forEach(d=>{
body+=`<div class="block"><h3>${d.day} — ${d.focus} <span class="sub">${d.duration}</span></h3>`;
d.exercises?.forEach(ex=>{
body+=`<div class="ex"><div class="exn">${ex.name}</div><div class="meta"><span>SETS: ${ex.sets}</span><span>REPS: ${ex.reps}</span><span>TEMPO: ${ex.tempo}</span><span>REST: ${ex.rest}</span></div><div class="cue"><b>FORM CUE:</b> ${ex.cue}</div></div>`;
});
body+="</div>";
});
} else if(pillar==="FUEL"&&data.stack){
data.stack?.forEach(s=>{ body+=`<div class="ex"><div class="exn">${s.name} <span class="badge">${s.priority}</span></div><div class="meta"><span>DOSE: ${s.dose}</span><span>TIMING: ${s.timing}</span></div><div class="cue">${s.why}</div></div>`; });
if(data.nutritionProtocol){const np=data.nutritionProtocol;body+=`<h3 class="st">NUTRITION</h3><div class="meta"><span>CAL: ${np.calories}</span><span>PROTEIN: ${np.protein}</span><span>CARBS: ${np.carbs}</span><span>FATS: ${np.fats}</span></div>`;}
} else if(pillar==="FOCUS"&&data.dailyBlocks){
data.dailyBlocks?.forEach(bl=>{
body+=`<div class="block"><h3>${bl.block} <span class="sub">${bl.time}</span></h3>`;
bl.actions?.forEach(a=>{ body+=`<div class="ex"><div class="exn">${a.action}</div><div class="cue">${a.detail}</div></div>`; });
body+="</div>";
});
}
if(data.weeklyTips?.length){body+=`<h3 class="st">WEEKLY TIPS</h3><ul>${data.weeklyTips.map(t=>`<li>${t}</li>`).join("")}</ul>`;}
const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>PLL ${pillar} Week ${week} — ${name}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&display=swap');
body{font-family:'Space Grotesk',sans-serif;background:#060608;color:#E0E0E0;margin:0;padding:28px;max-width:800px;}
.hdr{border-bottom:2px solid #${hex};padding-bottom:18px;margin-bottom:24px;}
.brand{font-family:'Bebas Neue',cursive;font-size:28px;color:#fff;letter-spacing:4px;}
.pl{font-family:'Bebas Neue',cursive;font-size:18px;color:#${hex};letter-spacing:3px;margin-top:3px;}
.wk{font-size:11px;color:#444;letter-spacing:2px;margin-top:3px;}
.mantra{background:#${hex}11;border-left:3px solid #${hex};padding:10px 14px;border-radius:3px;font-size:12px;color:#888;font-style:italic;margin:16px 0;}
h2{font-family:'Bebas Neue',cursive;font-size:24px;color:#fff;letter-spacing:2px;margin:16px 0 6px;}
.sum{font-size:12px;color:#666;line-height:1.7;margin-bottom:10px;}
.cn{background:#${hex}0A;border-left:3px solid #${hex};padding:9px 12px;font-size:12px;color:#AAA;font-style:italic;margin-bottom:20px;}
.block{background:#0D0D1A;border:1px solid #16162A;border-radius:6px;padding:14px;margin-bottom:12px;}
.block h3{font-family:'Bebas Neue',cursive;font-size:16px;color:#fff;letter-spacing:2px;margin-bottom:10px;}
.sub{font-size:11px;color:#444;font-family:'Space Grotesk',sans-serif;font-weight:400;letter-spacing:0;margin-left:6px;}
.ex{background:#080810;border:1px solid #16162A;border-radius:4px;padding:10px;margin-bottom:7px;}
.exn{font-family:'Bebas Neue',cursive;font-size:14px;color:#fff;letter-spacing:1px;margin-bottom:5px;}
.meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;}
.meta span{font-size:9px;color:#${hex};background:#${hex}11;padding:2px 8px;border-radius:8px;font-weight:700;letter-spacing:1px;}
.cue{font-size:11px;color:#666;line-height:1.6;}
.badge{font-size:9px;background:#${hex}22;color:#${hex};padding:2px 7px;border-radius:6px;margin-left:6px;}
.st{font-family:'Bebas Neue',cursive;font-size:16px;color:#${hex};letter-spacing:2px;margin:16px 0 10px;}
ul{padding-left:16px;}li{font-size:11px;color:#666;line-height:1.8;}
.ftr{margin-top:28px;border-top:1px solid #0D0D1A;padding-top:12px;font-size:9px;color:#1A1A2A;letter-spacing:2px;text-align:center;}
</style></head><body>
<div class="hdr">
<div class="brand">LEVEL UP</div>
<div class="pl">${pillar} — PHASE 1</div>
<div class="wk">${wk.label.toUpperCase()} · ${name?`PREPARED FOR ${name.toUpperCase()}`:""}</div>
</div>
<div class="mantra">"${wk.mantra}"</div>
<h2>${data.headline||""}</h2>
<div class="sum">${data.summary||""}</div>
<div class="cn">"${data.coachNote||""}"</div>
${body}
<div class="ftr">PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK ${week} OF 3</div>
</body></html>`;
const w=window.open("","_blank");
if(w){w.document.write(html);w.document.close();setTimeout(()=>w.print(),600);}
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({onLogin}){
const [mode,setMode]=useState("login"); // login | register
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");
const [loading,setLoading]=useState(false);

const hash=(str)=>{
let h=0;
for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i);h|=0;}
return h.toString(36);
};

const submit=()=>{
if(!username.trim()||!password.trim()){setError("Please enter username and password.");return;}
if(password.length<6){setError("Password must be at least 6 characters.");return;}
setLoading(true);setError("");
setTimeout(()=>{
const key=`user_${username.toLowerCase().trim()}`;
const stored=Store.load(key);
if(mode==="register"){
if(stored){setError("Username already exists. Please log in.");setLoading(false);return;}
const profile={username:username.trim(),firstName:username.trim().split(" ")[0],passwordHash:hash(password),createdAt:Date.now(),week:1,completedWeeks:[],pillarsComplete:{},answers:{},lastVisit:Date.now()};
Store.save(key,profile);
onLogin(profile);
} else {
if(!stored){setError("Username not found. Please register.");setLoading(false);return;}
if(stored.passwordHash!==hash(password)){setError("Incorrect password.");setLoading(false);return;}
stored.lastVisit=Date.now();
Store.save(key,stored);
onLogin(stored);
}
},600);
};

return(
<div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px"}}>
<style>{CSS}</style>
<div style={{width:"100%",maxWidth:"360px"}}>
<div style={{textAlign:"center",marginBottom:"36px"}}>
<Avatar size={100} pillar="TRAIN"/>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"32px",color:"#FFF",letterSpacing:"4px",marginTop:"16px",lineHeight:1}}>LEVEL UP</div>
<div style={{fontSize:"10px",color:"#2A2A3A",letterSpacing:"4px",marginTop:"4px",fontWeight:700}}>THE PLL SYSTEM · PHASE 1</div>
</div>

<div style={{display:"flex",gap:"4px",marginBottom:"24px",background:"#0A0A14",padding:"4px",borderRadius:"8px"}}>
{["login","register"].map(m=>(
<button key={m} onClick={()=>{setMode(m);setError("");}} style={{flex:1,padding:"10px",borderRadius:"6px",border:"none",cursor:"pointer",background:mode===m?B:"transparent",color:mode===m?"#000":"#444",fontFamily:"Space Grotesk,sans-serif",fontWeight:700,fontSize:"13px",letterSpacing:"1px",transition:"all .2s"}}>
{m==="login"?"SIGN IN":"CREATE ACCOUNT"}
</button>
))}
</div>

<div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"16px"}}>
<input className="inp" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
<input className="inp" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
</div>

{error&&<div style={{fontSize:"12px",color:"#FF4444",marginBottom:"12px",textAlign:"center"}}>{error}</div>}

<button className="pbtn" onClick={submit} disabled={loading} style={{background:loading?"#1A1A2E":B,color:loading?"#333":"#000"}}>
{loading?"VERIFYING...":(mode==="login"?"SIGN IN TO MY PROGRAM":"START MY 21-DAY JOURNEY")}
</button>

<div style={{textAlign:"center",marginTop:"20px",fontSize:"11px",color:"#1E1E2E",lineHeight:"1.6"}}>
21 DAYS · 3 PILLARS · ONE TRANSFORMATION<br/>
<span style={{color:"#2A2A3A"}}>PRIME LEVEL LIVING · NURU VISION MEDIA</span>
</div>
</div>
</div>
);
}

// ── INTAKE FORM ───────────────────────────────────────────────────────────────
function IntakeForm({pillar,savedAnswers,onComplete}){
const cfg=PILLARS[pillar];
const [ans,setAns]=useState(savedAnswers||{});
const ready=cfg.questions.every(q=>ans[q.id]);
return(
<div style={{animation:"fadeUp .4s ease forwards"}}>
<div style={{display:"flex",gap:"14px",alignItems:"center",marginBottom:"22px"}}>
<Avatar size={54} pillar={pillar}/>
<div>
<div style={{fontSize:"9px",color:cfg.color,letterSpacing:"3px",fontWeight:700,marginBottom:"3px"}}>{cfg.label} — INTAKE</div>
<div style={{fontSize:"13px",color:"#555"}}>{savedAnswers?"Your previous answers are loaded. Update if needed.":"Tell the Coach what you're working with."}</div>
</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"22px"}}>
{cfg.questions.map(q=>(
<div key={q.id}>
<div style={{fontSize:"10px",color:"#333",letterSpacing:"2px",marginBottom:"7px",fontWeight:700}}>{q.label}</div>
<div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
{q.options.map(o=>(
<button key={o} className={`chip${ans[q.id]===o?" on":""}`} style={{"--c":cfg.color,"--cb":cfg.color+"11"}} onClick={()=>setAns(a=>({...a,[q.id]:o}))}>{o}</button>
))}
</div>
</div>
))}
</div>
<button className="pbtn" onClick={()=>ready&&onComplete(ans)} disabled={!ready} style={{background:ready?cfg.color:"#1A1A2E",color:ready?"#000":"#333"}}>
GENERATE MY WEEK BLUEPRINT →
</button>
</div>
);
}

// ── LOADING ───────────────────────────────────────────────────────────────────
function Loading({pillar,name,week}){
const {color,label}=PILLARS[pillar];
const msgs=["Analyzing your profile...","Building Week "+week+" blueprint...","Calibrating intensity...","Finalizing your protocol..."];
const [i,setI]=useState(0);
useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%4),1200);return()=>clearInterval(t);},[]);
return(
<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"340px",gap:"22px"}}>
<Avatar size={110} pillar={pillar}/>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"12px",color:"#2A2A3A",letterSpacing:"3px",marginBottom:"12px"}}>
{name?`BUILDING ${name.toUpperCase()}'S WEEK ${week} ${label} BLUEPRINT`:`BUILDING WEEK ${week} ${label} BLUEPRINT`}
</div>
<div style={{width:"180px",height:"2px",background:"#0D0D1A",borderRadius:"1px",margin:"0 auto 10px",overflow:"hidden"}}>
<div style={{height:"100%",background:`linear-gradient(90deg,transparent,${color},transparent)`,animation:"scan 1.4s linear infinite",width:"100%"}}/>
</div>
<div style={{fontSize:"11px",color:color,letterSpacing:"2px",fontWeight:500}}>{msgs[i]}</div>
</div>
</div>
);
}

// ── WEEK CELEBRATION ──────────────────────────────────────────────────────────
function WeekCelebration({week,name,isPhaseComplete,onNext,onPhase2}){
const wk=WEEKS[week];
const isLast=week===3;
return(
<div style={{textAlign:"center",padding:"32px 16px",animation:"fadeUp .5s ease forwards"}}>
<div style={{fontSize:"48px",marginBottom:"16px",animation:"celebrate 1s ease-in-out infinite"}}>{isLast?"🏆":"🔥"}</div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(22px,5vw,36px)",color:"#FFF",letterSpacing:"3px",marginBottom:"8px"}}>
{isLast?`${name?name+" — ":""}21 DAYS COMPLETE!`:`WEEK ${week} DONE${name?", "+name.toUpperCase():""}!`}
</div>
<div style={{fontSize:"14px",color:"#666",lineHeight:"1.8",maxWidth:"440px",margin:"0 auto 24px"}}>
{isLast?`You are not the same person who started this program. Phase 1 is complete. You've built a new system, a new identity. ${name||"Athlete"}, it's time for what's next.`:wk.coachClose(name||"Athlete")}
</div>
{isLast?(
<div style={{background:"linear-gradient(135deg,#1A0A00,#0A0A1A)",border:`1px solid ${O}44`,borderRadius:"12px",padding:"24px",marginBottom:"24px",maxWidth:"440px",margin:"0 auto 24px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"22px",color:O,letterSpacing:"3px",marginBottom:"8px"}}>PHASE 2 UNLOCKS</div>
<div style={{fontSize:"13px",color:"#666",lineHeight:"1.7",marginBottom:"16px"}}>Advanced periodization. Heavier programming. Elite supplementation protocols. The membership that takes you from good to elite.</div>
<button className="pbtn" onClick={onPhase2} style={{background:O,color:"#000",animation:"pulse 2s infinite"}}>
LEVEL UP TO PHASE 2 →
</button>
</div>
):(
<button className="pbtn" onClick={onNext} style={{background:B,color:"#000",maxWidth:"320px",margin:"0 auto"}}>
START WEEK {week+1} →
</button>
)}
</div>
);
}

// ── TRAIN RESULT ──────────────────────────────────────────────────────────────
function TrainResult({data,name,week,onDownload}){
const [day,setDay]=useState(0);
const d=data.days?.[day];
const wk=WEEKS[week];
return(
<div style={{animation:"fadeUp .5s ease forwards"}}>
<div style={{background:`${B}08`,border:`1px solid ${B}18`,borderRadius:"8px",padding:"14px",marginBottom:"18px"}}>
<div style={{fontSize:"9px",color:B,letterSpacing:"3px",fontWeight:700,marginBottom:"4px"}}>WEEK {week} MANTRA</div>
<div style={{fontSize:"13px",color:"#888",fontStyle:"italic",lineHeight:"1.6"}}>"{wk.mantra}"</div>
</div>
<div style={{display:"flex",gap:"16px",alignItems:"flex-start",marginBottom:"20px",flexWrap:"wrap"}}>
<Avatar size={64} pillar="TRAIN"/>
<div style={{flex:1,minWidth:"180px"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"5px",flexWrap:"wrap"}}>
<span style={{fontSize:"9px",color:B,letterSpacing:"3px",fontWeight:700}}>TRAIN — WEEK {week}/3</span>
<span className="week-badge" style={{background:`${B}11`,border:`1px solid ${B}22`,color:B}}>{wk.intensity.toUpperCase()}</span>
</div>
<h2 style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(18px,3.5vw,26px)",color:"#FFF",letterSpacing:"2px",marginBottom:"7px"}}>{data.headline}</h2>
<p style={{fontSize:"12px",color:"#555",lineHeight:"1.7",marginBottom:"9px"}}>{data.summary}</p>
<div style={{background:`${B}08`,borderLeft:`3px solid ${B}`,padding:"8px 12px",borderRadius:"2px",fontSize:"12px",color:"#AAA",fontStyle:"italic"}}>"{data.coachNote}"</div>
</div>
</div>
<div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"16px"}}>
{data.days?.map((d,i)=>(
<button key={i} className={`dtab${day===i?" on":""}`} style={{background:day===i?B:"#0C0C14","--c":B}} onClick={()=>setDay(i)}>{d.day}</button>
))}
</div>
{d&&(
<div style={{background:CD,border:`1px solid ${BR}`,borderRadius:"10px",padding:"16px",marginBottom:"16px"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"14px",flexWrap:"wrap",gap:"6px"}}>
<div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"17px",color:"#FFF",letterSpacing:"2px"}}>{d.day} — {d.focus}</div>
<div style={{fontSize:"10px",color:"#2A2A3A",marginTop:"2px"}}>{d.duration} · {wk.sets} · {wk.repRange}</div>
</div>
<span style={{background:`${B}11`,border:`1px solid ${B}22`,padding:"4px 10px",borderRadius:"20px",fontSize:"10px",color:B,fontWeight:600,alignSelf:"center"}}>{d.exercises?.length} exercises</span>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"10px"}}>
{d.exercises?.map((ex,i)=>(
<div key={i} style={{background:"#080810",border:`1px solid ${BR}`,borderRadius:"8px",overflow:"hidden"}}>
<Gif term={ex.searchTerm} name={ex.name}/>
<div style={{padding:"10px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"14px",color:"#FFF",letterSpacing:"1px",marginBottom:"2px"}}>{ex.name}</div>
<div style={{fontSize:"9px",color:B,letterSpacing:"2px",fontWeight:600,marginBottom:"7px"}}>{ex.muscle}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"7px"}}>
{[["SETS",ex.sets],["REPS",ex.reps],["TEMPO",ex.tempo],["REST",ex.rest]].map(([k,v])=>(
<div key={k} style={{background:"#0C0C14",padding:"5px 7px",borderRadius:"4px"}}>
<div style={{fontSize:"7px",color:"#2A2A3A",letterSpacing:"2px",marginBottom:"2px"}}>{k}</div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"12px",color:"#CCC",letterSpacing:"1px"}}>{v}</div>
</div>
))}
</div>
<div style={{background:`${B}07`,borderLeft:`2px solid ${B}22`,padding:"6px 8px",borderRadius:"2px"}}>
<div style={{fontSize:"7px",color:B,letterSpacing:"2px",fontWeight:700,marginBottom:"2px"}}>FORM CUE</div>
<div style={{fontSize:"11px",color:"#666",lineHeight:"1.5"}}>{ex.cue}</div>
</div>
</div>
</div>
))}
</div>
</div>
)}
{data.weeklyTips&&(
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"8px",marginBottom:"18px"}}>
{data.weeklyTips.map((t,i)=>(
<div key={i} style={{background:CD,border:`1px solid ${BR}`,padding:"12px",borderRadius:"8px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"10px",color:B,letterSpacing:"2px",marginBottom:"4px"}}>TIP {i+1}</div>
<div style={{fontSize:"11px",color:"#555",lineHeight:"1.6"}}>{t}</div>
</div>
))}
</div>
)}
<button className="pbtn" onClick={onDownload} style={{background:B,color:"#000"}}>⬇ DOWNLOAD WEEK {week} TRAIN BLUEPRINT PDF</button>
</div>
);
}

// ── FUEL RESULT ───────────────────────────────────────────────────────────────
function FuelResult({data,name,week,onDownload}){
const pc={Essential:G,Recommended:O,Optional:"#444"};
const wk=WEEKS[week];
return(
<div style={{animation:"fadeUp .5s ease forwards"}}>
<div style={{background:`${O}08`,border:`1px solid ${O}18`,borderRadius:"8px",padding:"14px",marginBottom:"18px"}}>
<div style={{fontSize:"9px",color:O,letterSpacing:"3px",fontWeight:700,marginBottom:"4px"}}>WEEK {week} MANTRA</div>
<div style={{fontSize:"13px",color:"#888",fontStyle:"italic",lineHeight:"1.6"}}>"{wk.mantra}"</div>
</div>
<div style={{display:"flex",gap:"16px",alignItems:"flex-start",marginBottom:"20px",flexWrap:"wrap"}}>
<Avatar size={64} pillar="FUEL"/>
<div style={{flex:1,minWidth:"180px"}}>
<div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"5px"}}><span style={{fontSize:"9px",color:O,letterSpacing:"3px",fontWeight:700}}>FUEL — WEEK {week}/3</span></div>
<h2 style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(18px,3.5vw,26px)",color:"#FFF",letterSpacing:"2px",marginBottom:"7px"}}>{data.headline}</h2>
<p style={{fontSize:"12px",color:"#555",lineHeight:"1.7",marginBottom:"9px"}}>{data.summary}</p>
<div style={{background:`${O}08`,borderLeft:`3px solid ${O}`,padding:"8px 12px",borderRadius:"2px",fontSize:"12px",color:"#AAA",fontStyle:"italic"}}>"{data.coachNote}"</div>
</div>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"10px",marginBottom:"16px"}}>
{data.stack?.map((s,i)=>(
<div key={i} style={{background:CD,border:`1px solid ${BR}`,borderTop:`2px solid ${pc[s.priority]||O}`,padding:"13px",borderRadius:"8px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"4px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"14px",color:"#FFF",letterSpacing:"1px"}}>{s.name}</div>
<span style={{fontSize:"8px",color:pc[s.priority]||O,background:`${pc[s.priority]||O}11`,padding:"2px 6px",borderRadius:"8px",fontWeight:700,marginLeft:"5px",whiteSpace:"nowrap"}}>{s.priority}</span>
</div>
<div style={{fontSize:"9px",color:O,letterSpacing:"2px",fontWeight:600,marginBottom:"7px"}}>{s.category}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"7px"}}>
{[["DOSE",s.dose],["TIMING",s.timing]].map(([k,v])=>(
<div key={k} style={{background:"#080810",padding:"5px 7px",borderRadius:"4px"}}>
<div style={{fontSize:"7px",color:"#2A2A3A",letterSpacing:"2px",marginBottom:"2px"}}>{k}</div>
<div style={{fontSize:"11px",color:"#AAA",fontWeight:500}}>{v}</div>
</div>
))}
</div>
<div style={{fontSize:"11px",color:"#555",lineHeight:"1.5"}}>{s.why}</div>
</div>
))}
</div>
{data.nutritionProtocol&&(
<div style={{background:CD,border:`1px solid ${BR}`,padding:"16px",borderRadius:"10px",marginBottom:"16px"}}>
<div style={{fontSize:"9px",color:"#2A2A3A",letterSpacing:"3px",fontWeight:700,marginBottom:"10px"}}>NUTRITION</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:"7px",marginBottom:"10px"}}>
{[["CALORIES",data.nutritionProtocol.calories],["PROTEIN",data.nutritionProtocol.protein],["CARBS",data.nutritionProtocol.carbs],["FATS",data.nutritionProtocol.fats]].map(([k,v])=>(
<div key={k} style={{background:"#080810",padding:"9px",borderRadius:"6px",textAlign:"center"}}>
<div style={{fontSize:"7px",color:"#2A2A3A",letterSpacing:"2px",marginBottom:"3px"}}>{k}</div>
<div style={{fontSize:"11px",color:O,fontWeight:700}}>{v}</div>
</div>
))}
</div>
{data.nutritionProtocol.mealTiming?.map((t,i)=>(
<div key={i} style={{display:"flex",gap:"8px",marginBottom:"6px"}}>
<span style={{color:O,fontSize:"11px",flexShrink:0,marginTop:"2px"}}>▸</span>
<span style={{fontSize:"11px",color:"#555",lineHeight:"1.6"}}>{t}</span>
</div>
))}
</div>
)}
{data.weeklyTips&&(
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"8px",marginBottom:"18px"}}>
{data.weeklyTips.map((t,i)=>(
<div key={i} style={{background:CD,border:`1px solid ${BR}`,padding:"12px",borderRadius:"8px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"10px",color:O,letterSpacing:"2px",marginBottom:"4px"}}>TIP {i+1}</div>
<div style={{fontSize:"11px",color:"#555",lineHeight:"1.6"}}>{t}</div>
</div>
))}
</div>
)}
<button className="pbtn" onClick={onDownload} style={{background:O,color:"#000"}}>⬇ DOWNLOAD WEEK {week} FUEL STACK PDF</button>
</div>
);
}

// ── FOCUS RESULT ──────────────────────────────────────────────────────────────
function FocusResult({data,name,week,onDownload}){
const [bl,setBl]=useState(0);
const block=data.dailyBlocks?.[bl];
const wk=WEEKS[week];
return(
<div style={{animation:"fadeUp .5s ease forwards"}}>
<div style={{background:`${P}08`,border:`1px solid ${P}18`,borderRadius:"8px",padding:"14px",marginBottom:"18px"}}>
<div style={{fontSize:"9px",color:P,letterSpacing:"3px",fontWeight:700,marginBottom:"4px"}}>WEEK {week} MANTRA</div>
<div style={{fontSize:"13px",color:"#888",fontStyle:"italic",lineHeight:"1.6"}}>"{wk.mantra}"</div>
</div>
<div style={{display:"flex",gap:"16px",alignItems:"flex-start",marginBottom:"20px",flexWrap:"wrap"}}>
<Avatar size={64} pillar="FOCUS"/>
<div style={{flex:1,minWidth:"180px"}}>
<div style={{fontSize:"9px",color:P,letterSpacing:"3px",fontWeight:700,marginBottom:"5px"}}>FOCUS — WEEK {week}/3</div>
<h2 style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(18px,3.5vw,26px)",color:"#FFF",letterSpacing:"2px",marginBottom:"7px"}}>{data.headline}</h2>
<p style={{fontSize:"12px",color:"#555",lineHeight:"1.7",marginBottom:"9px"}}>{data.summary}</p>
<div style={{background:`${P}08`,borderLeft:`3px solid ${P}`,padding:"8px 12px",borderRadius:"2px",fontSize:"12px",color:"#AAA",fontStyle:"italic"}}>"{data.coachNote}"</div>
</div>
</div>
<div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"14px"}}>
{data.dailyBlocks?.map((b,i)=>(
<button key={i} className={`btab${bl===i?" on":""}`} style={{background:bl===i?P:"#0C0C14","--c":P}} onClick={()=>setBl(i)}>
{b.block?.split(" ").slice(0,2).join(" ")}
</button>
))}
</div>
{block&&(
<div style={{background:CD,border:`1px solid ${BR}`,borderRadius:"10px",padding:"16px",marginBottom:"16px"}}>
<div style={{marginBottom:"12px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"17px",color:"#FFF",letterSpacing:"2px"}}>{block.block}</div>
<div style={{fontSize:"10px",color:"#2A2A3A",marginTop:"2px"}}>{block.time} · {block.duration}</div>
</div>
{block.actions?.map((a,i)=>(
<div key={i} style={{background:"#080810",borderLeft:`2px solid ${P}33`,padding:"11px",borderRadius:"4px",marginBottom:"8px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"13px",color:"#FFF",letterSpacing:"1px",marginBottom:"4px"}}>{a.action}</div>
<div style={{fontSize:"12px",color:"#666",lineHeight:"1.6",marginBottom:"5px"}}>{a.detail}</div>
<div style={{fontSize:"10px",color:P,opacity:.7}}>WHY: {a.why}</div>
</div>
))}
</div>
)}
{data.recoveryProtocol&&(
<div style={{background:CD,border:`1px solid ${BR}`,padding:"14px",borderRadius:"10px",marginBottom:"16px"}}>
<div style={{fontSize:"9px",color:"#2A2A3A",letterSpacing:"3px",fontWeight:700,marginBottom:"10px"}}>RECOVERY</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
{[["SLEEP TARGET",data.recoveryProtocol.sleepTarget],["DELOAD",data.recoveryProtocol.deloadFrequency]].map(([k,v])=>(
<div key={k} style={{background:"#080810",padding:"8px",borderRadius:"6px"}}>
<div style={{fontSize:"7px",color:"#2A2A3A",letterSpacing:"2px",marginBottom:"3px"}}>{k}</div>
<div style={{fontSize:"11px",color:"#666"}}>{v}</div>
</div>
))}
</div>
<div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
{data.recoveryProtocol.activeRecovery?.map((r,i)=>(
<span key={i} style={{background:`${P}0D`,border:`1px solid ${P}22`,color:P,padding:"3px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:500}}>{r}</span>
))}
</div>
</div>
)}
{data.weeklyTips&&(
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"8px",marginBottom:"18px"}}>
{data.weeklyTips.map((t,i)=>(
<div key={i} style={{background:CD,border:`1px solid ${BR}`,padding:"12px",borderRadius:"8px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"10px",color:P,letterSpacing:"2px",marginBottom:"4px"}}>TIP {i+1}</div>
<div style={{fontSize:"11px",color:"#555",lineHeight:"1.6"}}>{t}</div>
</div>
))}
</div>
)}
<button className="pbtn" onClick={onDownload} style={{background:P,color:"#fff"}}>⬇ DOWNLOAD WEEK {week} FOCUS PROTOCOL PDF</button>
</div>
);
}

// ── PROGRESS BAR ──────────────────────────────────────────────────────────────
function ProgressBar({week,completedPillars}){
const totalPillars=3;
const weekProgress=completedPillars.length;
const overallPct=Math.round(((week-1)*totalPillars+weekProgress)/(3*totalPillars)*100);
return(
<div style={{background:CD,border:`1px solid ${BR}`,padding:"12px 16px",marginBottom:"0"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px",flexWrap:"wrap",gap:"6px"}}>
<div style={{fontSize:"10px",color:"#2A2A3A",letterSpacing:"3px",fontWeight:700}}>PHASE 1 PROGRESS</div>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}>
{[1,2,3].map(w=>(
<div key={w} style={{display:"flex",alignItems:"center",gap:"4px"}}>
<div style={{width:"8px",height:"8px",borderRadius:"50%",background:week>w?G:week===w?B:"#1A1A2E",transition:"all .3s"}}/>
<span style={{fontSize:"9px",color:week>=w?"#555":"#2A2A3A",fontWeight:600}}>W{w}</span>
</div>
))}
<span style={{fontSize:"10px",color:B,fontWeight:700,marginLeft:"4px"}}>{overallPct}%</span>
</div>
</div>
<div style={{height:"3px",background:"#0A0A14",borderRadius:"2px",overflow:"hidden"}}>
<div style={{height:"100%",width:`${overallPct}%`,background:`linear-gradient(90deg,${B},${G})`,borderRadius:"2px",transition:"width .6s ease"}}/>
</div>
</div>
);
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
const [profile,setProfile]=useState(null);
const [activePillar,setActivePillar]=useState("TRAIN");
const [pillarStates,setPillarStates]=useState({
TRAIN:{phase:"intake",answers:null,result:null},
FUEL:{phase:"intake",answers:null,result:null},
FOCUS:{phase:"intake",answers:null,result:null},
});
const [completedPillars,setCompletedPillars]=useState([]);
const [showCelebration,setShowCelebration]=useState(false);
const [allWeeksDone,setAllWeeksDone]=useState(false);

const upd=(p,u)=>setPillarStates(s=>({...s,[p]:{...s[p],...u}}));

const login=(prof)=>{
setProfile(prof);
// Restore answers if returning user
if(prof.answers){
setPillarStates(s=>{
const ns={...s};
Object.keys(prof.answers).forEach(p=>{ if(ns[p])ns[p]={...ns[p],answers:prof.answers[p]}; });
return ns;
});
}
};

const saveProfile=(updates)=>{
if(!profile)return;
const updated={...profile,...updates};
setProfile(updated);
Store.save(`user_${updated.username.toLowerCase()}`,updated);
};

const generate=async(pillar,answers)=>{
const week=profile?.week||1;
upd(pillar,{phase:"loading",answers});
// Save answers to profile
const newAnswers={...(profile?.answers||{}),[pillar]:answers};
saveProfile({answers:newAnswers});
try{
const name=profile?.firstName||profile?.username||"Athlete";
const prompt=PILLARS[pillar].prompt(answers,name,week);
const res=await fetch("/api/generate",{
method:"POST",
headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})
});
const data=await res.json();
if(data.error)throw new Error(data.error.message);
const text=(data.content||[]).filter(c=>c.type==="text").map(c=>c.text).join("");
const clean=text.replace(/^```(?:json)?\s*/i,"").replace(/\s*```\s*$/i,"").trim();
const result=JSON.parse(clean);
upd(pillar,{phase:"result",result});
// Mark pillar complete
if(!completedPillars.includes(pillar)){
const newCompleted=[...completedPillars,pillar];
setCompletedPillars(newCompleted);
// Check if all 3 pillars done this week
if(newCompleted.length===3){
setShowCelebration(true);
}
}
}catch(e){
console.error("PLL Engine:",e.message);
upd(pillar,{phase:"error"});
}
};

const advanceWeek=()=>{
const currentWeek=profile?.week||1;
const nextWeek=currentWeek+1;
if(nextWeek>3){
setAllWeeksDone(true);
return;
}
saveProfile({week:nextWeek,completedWeeks:[...(profile?.completedWeeks||[]),currentWeek]});
setCompletedPillars([]);
setShowCelebration(false);
setPillarStates({
TRAIN:{phase:"intake",answers:pillarStates.TRAIN.answers,result:null},
FUEL:{phase:"intake",answers:pillarStates.FUEL.answers,result:null},
FOCUS:{phase:"intake",answers:pillarStates.FOCUS.answers,result:null},
});
};

const logout=()=>{
setProfile(null);
setCompletedPillars([]);
setShowCelebration(false);
setAllWeeksDone(false);
setPillarStates({TRAIN:{phase:"intake",answers:null,result:null},FUEL:{phase:"intake",answers:null,result:null},FOCUS:{phase:"intake",answers:null,result:null}});
};

if(!profile)return <AuthScreen onLogin={login}/>;

const week=profile?.week||1;
const wk=WEEKS[week];
const name=profile?.firstName||profile?.username||"Athlete";
const st=pillarStates[activePillar];
const cfg=PILLARS[activePillar];

if(allWeeksDone){
return(
<div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center"}}>
<style>{CSS}</style>
<div style={{fontSize:"56px",marginBottom:"20px",animation:"celebrate 1s ease-in-out infinite"}}>🏆</div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(28px,6vw,48px)",color:"#FFF",letterSpacing:"3px",marginBottom:"12px"}}>PHASE 1 COMPLETE!</div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"clamp(16px,3vw,24px)",color:G,letterSpacing:"2px",marginBottom:"20px"}}>{name.toUpperCase()} — 21 DAYS DONE</div>
<div style={{fontSize:"14px",color:"#666",lineHeight:"1.9",maxWidth:"440px",marginBottom:"32px"}}>You showed up. You pushed through. You built a new system. Phase 1 is complete and you are not the same person who started.</div>
<div style={{background:"linear-gradient(135deg,#0A0500,#050014)",border:`1px solid ${O}33`,borderRadius:"16px",padding:"28px",maxWidth:"400px",width:"100%",marginBottom:"24px"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"24px",color:O,letterSpacing:"3px",marginBottom:"8px"}}>PHASE 2 AWAITS</div>
<div style={{fontSize:"13px",color:"#555",lineHeight:"1.7",marginBottom:"18px"}}>Advanced periodization. Elite supplementation. The program that takes you from transformed to elite.</div>
<button className="pbtn" style={{background:O,color:"#000",animation:"pulse 2s infinite"}} onClick={()=>alert("Phase 2 membership coming soon! Stay locked in.")}>
UNLOCK PHASE 2 →
</button>
</div>
<button className="gbtn" onClick={logout}>← Back to Login</button>
</div>
);
}

if(showCelebration){
return(
<div style={{minHeight:"100vh",background:BG,padding:"24px 16px"}}>
<style>{CSS}</style>
<WeekCelebration week={week} name={name} isPhaseComplete={week===3} onNext={advanceWeek} onPhase2={()=>alert("Phase 2 membership coming soon!")}/>
</div>
);
}

return(
<div style={{background:BG,minHeight:"100vh",color:"#E0E0E0"}}>
<style>{CSS}</style>

{/* Header */}
<div style={{borderBottom:`1px solid ${BR}`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",position:"sticky",top:0,background:`${BG}F4`,backdropFilter:"blur(12px)",zIndex:100}}>
<div>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"20px",color:"#FFF",letterSpacing:"4px",lineHeight:1}}>LEVEL UP</div>
<div style={{fontSize:"8px",color:"#1E1E2E",letterSpacing:"3px",marginTop:"1px",fontWeight:700}}>THE PLL SYSTEM · {name.toUpperCase()}</div>
</div>
<div style={{display:"flex",gap:"4px",flexWrap:"wrap",alignItems:"center"}}>
{["TRAIN","FUEL","FOCUS"].map(p=>{
const c=PILLARS[p];
const isActive=activePillar===p;
const isDone=completedPillars.includes(p);
return(
<button key={p} onClick={()=>setActivePillar(p)} style={{background:isActive?c.color:"transparent",color:isActive?"#000":isDone?c.color:"#444",border:`1px solid ${isActive?c.color:isDone?c.color+"55":"#1A1A28"}`,padding:"7px 14px",borderRadius:"6px",cursor:"pointer",fontFamily:"Bebas Neue,cursive",fontSize:"14px",letterSpacing:"2px",transition:"all .2s",display:"flex",alignItems:"center",gap:"4px"}}>
{c.icon} {p} {isDone&&"✓"}
</button>
);
})}
<button className="gbtn" onClick={logout} style={{marginLeft:"4px",fontSize:"10px",padding:"6px 10px"}}>OUT</button>
</div>
</div>

{/* Progress */}
<ProgressBar week={week} completedPillars={completedPillars}/>

{/* Week banner */}
<div style={{background:`linear-gradient(90deg,${cfg.color}06,transparent)`,borderBottom:`1px solid ${cfg.color}15`,padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"6px"}}>
<div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
<span style={{fontFamily:"Bebas Neue,cursive",fontSize:"15px",color:cfg.color,letterSpacing:"3px"}}>{activePillar}</span>
<span style={{fontSize:"9px",color:"#1E1E2E",fontWeight:700,letterSpacing:"1px"}}>— {cfg.tagline.toUpperCase()}</span>
<span className="week-badge" style={{background:`${B}11`,border:`1px solid ${B}22`,color:B}}>{wk.label}</span>
</div>
{st.phase==="result"&&<button className="gbtn" onClick={()=>upd(activePillar,{phase:"intake",result:null})} style={{fontSize:"10px"}}>↺ Redo</button>}
</div>

{/* Coach opening message */}
{st.phase==="intake"&&!completedPillars.includes(activePillar)&&(
<div style={{margin:"16px 16px 0",background:`${cfg.color}08`,border:`1px solid ${cfg.color}18`,borderRadius:"8px",padding:"12px 14px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
<Avatar size={36} pillar={activePillar}/>
<div style={{fontSize:"12px",color:"#888",lineHeight:"1.7",fontStyle:"italic",flex:1}}>
"{completedPillars.length===0&&week===1?wk.coachOpen(name):`${name}, let's get your Week ${week} ${activePillar} blueprint built.`}"
</div>
</div>
)}

{/* Content */}
<div style={{maxWidth:"820px",margin:"0 auto",padding:"20px 14px"}}>
{st.phase==="intake"&&(
<IntakeForm pillar={activePillar} savedAnswers={st.answers} onComplete={(ans)=>generate(activePillar,ans)}/>
)}
{st.phase==="loading"&&<Loading pillar={activePillar} name={name} week={week}/>}
{st.phase==="result"&&st.result&&activePillar==="TRAIN"&&(
<TrainResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"TRAIN",name,week)}/>
)}
{st.phase==="result"&&st.result&&activePillar==="FUEL"&&(
<FuelResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"FUEL",name,week)}/>
)}
{st.phase==="result"&&st.result&&activePillar==="FOCUS"&&(
<FocusResult data={st.result} name={name} week={week} onDownload={()=>downloadPDF(st.result,"FOCUS",name,week)}/>
)}
{st.phase==="error"&&(
<div style={{textAlign:"center",padding:"50px 0"}}>
<div style={{fontFamily:"Bebas Neue,cursive",fontSize:"20px",color:"#FF4444",letterSpacing:"2px",marginBottom:"10px"}}>SYSTEM ERROR</div>
<div style={{fontSize:"12px",color:"#333",marginBottom:"18px"}}>Something went wrong. Let's try again.</div>
<button className="gbtn" onClick={()=>upd(activePillar,{phase:"intake"})}>RETRY</button>
</div>
)}
</div>

<div style={{borderTop:`1px solid ${BR}`,padding:"12px 16px",textAlign:"center"}}>
<div style={{fontSize:"8px",color:"#141420",letterSpacing:"3px",fontWeight:700}}>PRIME LEVEL LIVING · NURU VISION MEDIA · PHASE 1 · WEEK {week} OF 3</div>
</div>
</div>
);
}
