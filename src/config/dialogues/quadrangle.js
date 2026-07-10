/**
 * quadrangle.js — All dialogue for the Quadrangle route
 * Source: NINTENDOGS.pdf pages 17–24
 * Entities: Burnout (A) + Regret (B)
 * Theme: Academic Burnout
 *
 * Exported arrays (each consumed by DialogueScene via key lookup):
 *   quadrangle_burnout_1        — First Burnout encounter
 *   quadrangle_burnout_2        — Notebook scene (Burnout reappears)
 *   quadrangle_pushthrough_success — Post Push Through (survived)
 *   quadrangle_pushthrough_fail    — Post Push Through (energy hit 0)
 *   quadrangle_dismiss_success     — Post Dismiss Thoughts (survived)
 *   quadrangle_dismiss_fail        — Post Dismiss Thoughts (5 bubbles accumulated)
 *   quadrangle_climax              — Dual-entity climax → Final Boss appears
 */

// ── First Burnout encounter ───────────────────────────────────────────────
export const quadrangle_burnout_1 = [
  {
    id: 'qb1_01',
    speaker: null,
    text: 'The screen darkens slightly. A silhouette appears beneath a tree. No face. Only glowing eyes.',
    portrait: 'portrait_burnout',
    background: 'bg_quadrangle',
  },
  {
    id: 'qb1_02',
    speaker: 'Burnout',
    text: '...',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb1_03',
    speaker: null,
    text: 'No response. Player walks closer.',
    portrait: null,
    background: null,
  },
  {
    id: 'qb1_04',
    speaker: 'Burnout',
    text: "You're still working.",
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb1_05',
    speaker: 'Protagonist',
    text: '...Who are you?',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qb1_06',
    speaker: 'Burnout',
    text: "You haven't slept.",
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb1_07',
    speaker: 'Protagonist',
    text: 'I...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qb1_08',
    speaker: 'Burnout',
    text: "It's okay.",
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb1_09',
    speaker: 'Burnout',
    text: 'Just one more assignment.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb1_10',
    speaker: null,
    text: 'Silence. Burnout disappears.',
    portrait: null,
    background: null,
  },
  {
    id: 'qb1_11',
    speaker: 'Protagonist',
    text: '...',
    portrait: 'portrait_protagonist',
    background: null,
  },
];

// ── Notebook scene — Burnout reappears ────────────────────────────────────
export const quadrangle_burnout_2 = [
  {
    id: 'qb2_01',
    speaker: 'Protagonist',
    text: 'This handwriting...',
    portrait: 'portrait_protagonist',
    background: 'bg_quadrangle',
  },
  {
    id: 'qb2_02',
    speaker: 'Protagonist',
    text: "...it's mine.",
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qb2_03',
    speaker: null,
    text: 'Notebook Entry — Monday: Quiz. Project. Assignment. Study. Sleep later.',
    portrait: null,
    background: null,
  },
  {
    id: 'qb2_04',
    speaker: null,
    text: '*Burnout appears again.*',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb2_05',
    speaker: 'Burnout',
    text: 'You wrote that.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb2_06',
    speaker: 'Protagonist',
    text: '...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qb2_07',
    speaker: 'Burnout',
    text: 'You always say',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qb2_08',
    speaker: 'Burnout',
    text: '"Sleep later."',
    portrait: 'portrait_burnout',
    background: null,
  },
];

// ── Post Push Through — Survived ──────────────────────────────────────────
export const quadrangle_pushthrough_success = [
  {
    id: 'qpts_01',
    speaker: 'Burnout',
    text: 'See?',
    portrait: 'portrait_burnout',
    background: 'bg_quadrangle',
  },
  {
    id: 'qpts_02',
    speaker: 'Burnout',
    text: 'You can keep going.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qpts_03',
    speaker: 'Protagonist',
    text: '(breathing) No...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qpts_04',
    speaker: 'Burnout',
    text: "You're doing great.",
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qpts_05',
    speaker: 'Burnout',
    text: 'Everyone else is surviving.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qpts_06',
    speaker: 'Burnout',
    text: "Why can't you?",
    portrait: 'portrait_burnout',
    background: null,
  },
];

// ── Post Push Through — Failed (energy hit 0) ─────────────────────────────
export const quadrangle_pushthrough_fail = [
  {
    id: 'qptf_01',
    speaker: 'Burnout',
    text: "You couldn't hold on.",
    portrait: 'portrait_burnout',
    background: 'bg_quadrangle',
  },
  {
    id: 'qptf_02',
    speaker: 'Protagonist',
    text: 'I...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qptf_03',
    speaker: 'Burnout',
    text: 'You never could.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qptf_04',
    speaker: 'Burnout',
    text: "Everyone else can. Why can't you?",
    portrait: 'portrait_burnout',
    background: null,
  },
];

// ── Post Dismiss Thoughts — Survived ──────────────────────────────────────
export const quadrangle_dismiss_success = [
  {
    id: 'qdts_01',
    speaker: null,
    text: 'The thoughts begin to clear. For a moment.',
    portrait: null,
    background: 'bg_quadrangle',
  },
  {
    id: 'qdts_02',
    speaker: 'Protagonist',
    text: '...I can breathe.',
    portrait: 'portrait_protagonist',
    background: null,
  },
];

// ── Post Dismiss Thoughts — Failed (5 bubbles accumulated) ────────────────
export const quadrangle_dismiss_fail = [
  {
    id: 'qdtf_01',
    speaker: null,
    text: 'The thoughts pile on. She can barely see.',
    portrait: null,
    background: 'bg_quadrangle',
  },
  {
    id: 'qdtf_02',
    speaker: 'Protagonist',
    text: 'Make them stop...',
    portrait: 'portrait_protagonist',
    background: null,
  },
];

// ── Climax — Both entities + Final Boss appears ───────────────────────────
const quadrangle_climax_base = [
  {
    id: 'qcl_01',
    speaker: null,
    text: 'Wind grows stronger. Static. Screen glitches. Burnout looks behind the protagonist.',
    portrait: 'portrait_burnout',
    background: 'bg_quadrangle',
  },
  {
    id: 'qcl_02',
    speaker: 'Burnout',
    text: "...He's here.",
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qcl_03',
    speaker: null,
    text: 'Lights cut out. REGRET APPEARS. Much taller. Face hidden. Voice echoes.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_04',
    speaker: 'Regret',
    text: 'You remember.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_05',
    speaker: 'Protagonist',
    text: '...Who are you?',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'qcl_06',
    speaker: 'Regret',
    text: 'You already know.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_07',
    speaker: 'Regret',
    text: "You should've studied.",
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_08',
    speaker: null,
    text: 'Flash. Exam score: 52%',
    portrait: null,
    background: null,
  },
  {
    id: 'qcl_09',
    speaker: 'Regret',
    text: 'Maybe then...',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_10',
    speaker: null,
    text: 'Flash. Missed deadline.',
    portrait: null,
    background: null,
  },
  {
    id: 'qcl_11',
    speaker: 'Regret',
    text: 'Maybe then...',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_12',
    speaker: null,
    text: 'Flash. A friend leaves.',
    portrait: null,
    background: null,
  },
  {
    id: 'qcl_13',
    speaker: 'Regret',
    text: 'Maybe then...',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_14',
    speaker: 'Burnout',
    text: 'She was tired.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qcl_15',
    speaker: 'Regret',
    text: 'She was lazy.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_16',
    speaker: 'Burnout',
    text: 'She tried.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qcl_17',
    speaker: 'Regret',
    text: 'Not enough.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_18',
    speaker: 'Burnout',
    text: 'Keep working.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qcl_19',
    speaker: 'Regret',
    text: 'Too late.',
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_20',
    speaker: 'Burnout',
    text: 'Keep going.',
    portrait: 'portrait_burnout',
    background: null,
  },
  {
    id: 'qcl_21',
    speaker: 'Regret',
    text: "You'll never catch up.",
    portrait: 'portrait_regret',
    background: null,
  },
  {
    id: 'qcl_22',
    speaker: null,
    text: 'The screen completely glitches.',
    portrait: null,
    background: null,
  },
  {
    id: 'qcl_23',
    speaker: null,
    text: 'Silence. Everything stops. Footsteps. A monstrous shadow appears. No dialogue. Only breathing.',
    portrait: 'portrait_despair',
    background: null,
  },
];

export const quadrangle_climax_excellent = [
  ...quadrangle_dismiss_success,
  { id: 'qcl_e_01', speaker: 'Protagonist', text: "I won't let this bury me.", portrait: 'portrait_protagonist', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_good = [
  ...quadrangle_dismiss_success,
  { id: 'qcl_g_01', speaker: 'Protagonist', text: "I just need a little more time.", portrait: 'portrait_protagonist', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_barely = [
  ...quadrangle_dismiss_fail,
  { id: 'qcl_b_01', speaker: 'Protagonist', text: "...Just barely.", portrait: 'portrait_protagonist', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_failed = [
  ...quadrangle_dismiss_fail,
  { id: 'qcl_f_01', speaker: 'Protagonist', text: "I can't... I can't do this anymore.", portrait: 'portrait_protagonist', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_chase_checkpoint_1 = [
  { id: 'qch1_01', speaker: null, text: 'The weight grows heavier.', portrait: null, background: 'bg_chase' }
];

export const quadrangle_chase_checkpoint_2 = [
  { id: 'qch2_01', speaker: null, text: 'There is no rest.', portrait: null, background: 'bg_chase' }
];

export const quadrangle_chase_checkpoint_3 = [
  { id: 'qch3_01', speaker: null, text: 'It will consume you.', portrait: null, background: 'bg_chase' }
];

export const quadrangle_chase_resolution_good = [
  { id: 'qchr_g_01', speaker: null, text: 'The protagonist stumbles toward the light. Her body aches with exhaustion.', portrait: null, background: 'bg_chase' },
  { id: 'qchr_g_02', speaker: 'Protagonist', text: "I'm tired... but I can't stop here.", portrait: 'portrait_protagonist', background: null },
  { id: 'qchr_g_03', speaker: null, text: 'She steps into the light. Everything fades to white.', portrait: null, background: null },
];

export const quadrangle_chase_resolution_bad = [
  { id: 'qchr_b_01', speaker: null, text: 'The shadows pull her down. She is too tired to stand.', portrait: null, background: 'bg_chase' },
  { id: 'qchr_b_02', speaker: 'Protagonist', text: 'Just let me rest...', portrait: 'portrait_protagonist', background: null },
  { id: 'qchr_b_03', speaker: null, text: 'The whispers merge into one voice.', portrait: null, background: null },
  { id: 'qchr_b_04', speaker: 'Despair', text: 'Sleep.', portrait: 'portrait_despair', background: null },
  { id: 'qchr_b_05', speaker: null, text: 'Everything goes black.', portrait: null, background: null },
];
