/**
 * hallwayOfDoors.js — Mini-game config for "Hallway of Doors" (Regret+Lost — New Building)
 * Source: NINTENDOGS.pdf pages 9–10 (NEW BUILDING section)
 *
 * 8 sequential doors — each a memory to face or avoid.
 * Door types: Regret (−15%), Lost (−10%), Spark (+12%)
 * Two-phase interaction: Decision → if Opened: Reflection (2s, no skip)
 * Spam-clicking during Reflection = Avoidance Penalty (−8%)
 * Ignoring door = Skip penalty (−4%)
 *
 * After Hallway of Doors → Climax → Chase
 */

export const hallwayOfDoorsConfig = {
  background: 'bg_library',
  id: 'hallwayOfDoors',
  type: 'HALLWAY_OF_DOORS',
  bgm: 'bgm_regret_dialogue',
  label: 'Hallway of Doors',
  location: 'New Building',

  // ── Core mechanics (Adjusted for mathematical viability) ──────────────────
  totalDoors: 8,
  startCertainty: 50,          // % (0–100)
  doorTimeout: 4000,           // ms before door auto-skips
  reflectionDuration: 2000,    // ms forced memory-view after opening
  avoidancePenalty: -6,        // % Certainty lost for spam-clicking during reflection
  skipPenalty: -3,             // % Certainty lost for ignoring a door

  // ── Door type effects ─────────────────────────────────────────────────────
  doorEffects: {
    regret: { certaintyDelta: -10, label: 'Regret', color: 0x6c3483 },
    lost: { certaintyDelta: -5, label: 'Lost', color: 0x1a5276 },
    spark: { certaintyDelta: +20, label: 'Spark', color: 0x1e8449 },
  },

  // ── Scripted door sequence (8 doors) ───────────────────────────
  doorSequence: [
    { type: 'regret', memory: "Student Council Interview.\n\nInterviewer: Thank you for applying. We'll contact you soon.\n\nWeeks later... No email ever came." },
    { type: 'lost', memory: "A classroom. The protagonist sits alone. Her laptop is open.\n\nProtagonist (Past): Do I even enjoy this anymore?\n\nThe memory freezes. Present-day protagonist watches silently.\n\nRegret: You never answered yourself." },
    { type: 'spark', memory: "A programming laboratory. Groupmates cheer.\n\nFriend: We actually did it!\n\nPast Protagonist: I thought we were going to fail...\n\nEveryone laughs.\n\nRegret: You forgot this one." },
    { type: 'regret', memory: "The deadline I missed." },
    { type: 'lost', memory: "Not knowing what to do after graduation." },
    { type: 'spark', memory: "A professor who believed in me." },
    { type: 'regret', memory: "The friend I stopped talking to." },
    { type: 'spark', memory: "Landing my first internship." },
  ],

  regretQuotes: [
    "Funny...\nYou remember every mistake.\nBut never your victories.",
    "You keep asking...\n\"What if?\"\nAs if the answer would change anything.",
    "Some doors were never locked.\nYou simply stopped reaching for the handle.",
    "Running from a memory...\nDoesn't erase it."
  ],

  // ── Certainty visual zones ─────────────────────────────────────────────
  certaintyZones: [
    { above: 80, effect: 'confident', label: 'Confident' },
    { above: 40, effect: 'balanced', label: 'Balanced' },
    { above: 1, effect: 'dark', label: 'Uncertain' },
    { above: 0, effect: 'critical', label: 'Overwhelmed' },
  ],

  // ── Aura evaluation (from PDF Performance Evaluation) ────────────────────
  aura: {
    excellent: { minCertainty: 60, points: 60 },
    good: { minCertainty: 40, points: 50 },
    barely: { minCertainty: 1, points: 20 },
    failed: { minCertainty: 0, points: 0 },
  },

  // ── Scene chain after mini-game ───────────────────────────────────────────
  outcome: {
    excellent: { nextScene: 'DialogueScene', nextData: { dialogueKey: 'newbuilding_climax_excellent', nextScene: 'ChaseScene' } },
    good: { nextScene: 'DialogueScene', nextData: { dialogueKey: 'newbuilding_climax_good', nextScene: 'ChaseScene' } },
    barely: { nextScene: 'DialogueScene', nextData: { dialogueKey: 'newbuilding_climax_barely', nextScene: 'ChaseScene' } },
    failed: { nextScene: 'DialogueScene', nextData: { dialogueKey: 'newbuilding_climax_failed', nextScene: 'ChaseScene' } },
  },
};
