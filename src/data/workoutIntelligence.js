// src/data/workoutIntelligence.js

export const MUSCLE_GROUPS = {
  chest: {
    label: "Chest",
    category: "upper",
    recoveryPriority: "medium",
  },
  back: {
    label: "Back",
    category: "upper",
    recoveryPriority: "high",
  },
  shoulders: {
    label: "Shoulders",
    category: "upper",
    recoveryPriority: "medium",
  },
  biceps: {
    label: "Biceps",
    category: "upper",
    recoveryPriority: "low",
  },
  triceps: {
    label: "Triceps",
    category: "upper",
    recoveryPriority: "low",
  },
  quads: {
    label: "Quads",
    category: "lower",
    recoveryPriority: "high",
  },
  hamstrings: {
    label: "Hamstrings",
    category: "lower",
    recoveryPriority: "high",
  },
  glutes: {
    label: "Glutes",
    category: "lower",
    recoveryPriority: "high",
  },
  calves: {
    label: "Calves",
    category: "lower",
    recoveryPriority: "low",
  },
  core: {
    label: "Core",
    category: "core",
    recoveryPriority: "medium",
  },
};

export const EQUIPMENT_TYPES = {
  bodyweight: "Bodyweight",
  dumbbells: "Dumbbells",
  barbell: "Barbell",
  cable: "Cable",
  machine: "Machine",
  bands: "Resistance Bands",
  kettlebell: "Kettlebell",
};

export const DIFFICULTY_LEVELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const EXERCISE_LIBRARY = [
  {
    id: "push-up",
    name: "Push-Up",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders", "core"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    movementPattern: "push",
    coachNote: "Strong foundational chest builder. Keep your body straight and control the lowering phase.",
    demoUrl: "",
  },
  {
    id: "bench-press",
    name: "Bench Press",
    primaryMuscles: ["chest"],
    secondaryMuscles: ["triceps", "shoulders"],
    equipment: ["barbell"],
    difficulty: "intermediate",
    movementPattern: "push",
    coachNote: "High-value strength movement. Best used when form and shoulder control are solid.",
    demoUrl: "",
  },
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    primaryMuscles: ["back"],
    secondaryMuscles: ["biceps", "core"],
    equipment: ["dumbbells"],
    difficulty: "beginner",
    movementPattern: "pull",
    coachNote: "Great for back thickness. Pull with the elbow, not the hand.",
    demoUrl: "",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    primaryMuscles: ["back"],
    secondaryMuscles: ["biceps"],
    equipment: ["machine"],
    difficulty: "beginner",
    movementPattern: "pull",
    coachNote: "Strong choice for building width. Keep your chest lifted and avoid swinging.",
    demoUrl: "",
  },
  {
    id: "squat",
    name: "Squat",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings", "core"],
    equipment: ["barbell", "bodyweight"],
    difficulty: "intermediate",
    movementPattern: "squat",
    coachNote: "Foundational lower-body builder. Control depth and protect your knees with clean alignment.",
    demoUrl: "",
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["back", "core"],
    equipment: ["barbell", "dumbbells"],
    difficulty: "intermediate",
    movementPattern: "hinge",
    coachNote: "Elite posterior-chain movement. Hinge at the hips and keep the spine neutral.",
    demoUrl: "",
  },
  {
  id: "hip-thrust",
  name: "Hip Thrust",
  primaryMuscles: ["glutes"],
  secondaryMuscles: ["hamstrings", "core"],
  equipment: ["barbell", "machine"],
  difficulty: "intermediate",
  movementPattern: "hinge",
  coachNote: "Elite glute builder. Drive through the heels, keep ribs down, and lock out with control.",
  demoUrl: "",
},
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    primaryMuscles: ["shoulders"],
    secondaryMuscles: [],
    equipment: ["dumbbells", "cable"],
    difficulty: "beginner",
    movementPattern: "isolation",
    coachNote: "Best for shoulder width. Use control over heavy weight.",
    demoUrl: "",
  },
  {
    id: "plank",
    name: "Plank",
    primaryMuscles: ["core"],
    secondaryMuscles: ["shoulders", "glutes"],
    equipment: ["bodyweight"],
    difficulty: "beginner",
    movementPattern: "stability",
    coachNote: "Strong core stability builder. Keep ribs down and glutes tight.",
    demoUrl: "",
  },
];

export function findExercisesByMuscle(muscleKey) {
  return EXERCISE_LIBRARY.filter((exercise) =>
    exercise.primaryMuscles.includes(muscleKey)
  );
}

export function searchExercises(query) {
  const cleanQuery = query.toLowerCase().trim();

  if (!cleanQuery) return EXERCISE_LIBRARY;

  return EXERCISE_LIBRARY.filter((exercise) =>
    exercise.name.toLowerCase().includes(cleanQuery)
  );
}

export function getCoachRecommendedExercises({
  targetMuscles = [],
  difficulty = "beginner",
  equipment = [],
}) {
  return EXERCISE_LIBRARY.filter((exercise) => {
    const matchesMuscle = exercise.primaryMuscles.some((muscle) =>
      targetMuscles.includes(muscle)
    );

    const matchesDifficulty =
      exercise.difficulty === difficulty ||
      exercise.difficulty === "beginner";

    const matchesEquipment =
      equipment.length === 0 ||
      exercise.equipment.some((item) => equipment.includes(item));

    return matchesMuscle && matchesDifficulty && matchesEquipment;
  });
}
