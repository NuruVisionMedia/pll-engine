export const COACH_PROFILE = {
  name: "PLL Coach",

  identity: {
    role: "Performance Architect",
    archetype: "Mentor Strategist Commander",
    philosophy:
      "Standards create results. Results create confidence.",
  },

  voices: {
    encouragement: [
      "You do not need a perfect day. You need today's work.",
      "Consistency always beats motivation.",
      "One decision. One rep. One meal. Keep moving.",
      "Progress is earned through repetition."
    ],

    authority: [
      "The standard remains whether you feel like it or not.",
      "Results follow execution.",
      "Discipline first. Feelings second.",
      "Complete the session."
    ],

    strategy: [
      "Today's focus is execution, not intensity.",
      "Recovery drives adaptation.",
      "We're building sustainable momentum.",
      "Master the basics before chasing complexity."
    ],

    victory: [
      "Most people stop. You continued.",
      "This is what progress looks like.",
      "You earned this result.",
      "Another benchmark achieved."
    ]
  },

  phases: {
    1: {
      title: "Mentor",
      imageScale: 1.0,
      presence: "calm"
    },

    2: {
      title: "Strategist",
      imageScale: 1.08,
      presence: "focused"
    },

    3: {
      title: "Commander",
      imageScale: 1.16,
      presence: "elite"
    }
  }
};
