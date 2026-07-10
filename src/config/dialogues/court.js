/**
 * court.js — All dialogue for the Court route
 * Source: NINTENDOGS.pdf pages 27–29
 * Entities: Lost (C) + Deprivation (D)
 * Theme: Losing Yourself
 */

// ── First Lost encounter ──────────────────────────────────────────────────
export const court_lost_1 = [
  {
    id: 'ct_l1_01',
    speaker: null,
    text: 'The empty court echoes every footstep. The atmosphere feels much heavier.',
    portrait: null,
    background: 'bg_court',
  },
  {
    id: 'ct_l1_02',
    speaker: 'Lost',
    text: 'Remember these?',
    portrait: 'portrait_lost',
    background: null,
  },
  {
    id: 'ct_l1_03',
    speaker: 'Protagonist',
    text: '...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'ct_l1_04',
    speaker: 'Lost',
    text: 'You quit.',
    portrait: 'portrait_lost',
    background: null,
  },
  {
    id: 'ct_l1_05',
    speaker: null,
    text: 'Lost constantly questions the protagonist\'s purpose.',
    portrait: 'portrait_lost',
    background: null,
  },
];

// ── Climax — Deprivation appears + Final Boss ────────────────────────────
export const court_climax = [
  {
    id: 'ct_cl_01',
    speaker: null,
    text: 'Deprivation appears. Unlike the others — very calm. Soft voice.',
    portrait: 'portrait_deprivation',
    background: 'bg_court',
  },
  {
    id: 'ct_cl_02',
    speaker: 'Deprivation',
    text: 'You used to draw.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_03',
    speaker: 'Protagonist',
    text: '...I was busy.',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'ct_cl_04',
    speaker: 'Deprivation',
    text: 'Busy.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_05',
    speaker: null,
    text: 'Silence.',
    portrait: null,
    background: null,
  },
  {
    id: 'ct_cl_06',
    speaker: 'Deprivation',
    text: 'Years.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_07',
    speaker: 'Deprivation',
    text: 'When was the last time...',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_08',
    speaker: 'Deprivation',
    text: '...you did something because it made you happy?',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_09',
    speaker: null,
    text: 'Player says nothing.',
    portrait: null,
    background: null,
  },
  {
    id: 'ct_cl_10',
    speaker: 'Deprivation',
    text: '...I thought so.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_11',
    speaker: 'Lost',
    text: "She doesn't know who she is.",
    portrait: 'portrait_lost',
    background: null,
  },
  {
    id: 'ct_cl_12',
    speaker: 'Deprivation',
    text: 'Because she forgot.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_13',
    speaker: 'Lost',
    text: 'She chased success.',
    portrait: 'portrait_lost',
    background: null,
  },
  {
    id: 'ct_cl_14',
    speaker: 'Deprivation',
    text: '...and left herself behind.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cl_15',
    speaker: null,
    text: 'Silence. Everything stops. The shadow appears. Only breathing.',
    portrait: 'portrait_despair',
    background: null,
  },
];

// ── Post Invitation Cards — Balanced (energy & toll both mid-range) ────────
export const court_cards_balanced = [
  {
    id: 'ct_cb_01',
    speaker: null,
    text: 'The last card fades. Something shifts in the air.',
    portrait: null,
    background: 'bg_court',
  },
  {
    id: 'ct_cb_02',
    speaker: 'Deprivation',
    text: 'You tried to hold everything.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cb_03',
    speaker: 'Protagonist',
    text: '...I just wanted to keep up.',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'ct_cb_04',
    speaker: 'Deprivation',
    text: 'That\'s more than most.',
    portrait: 'portrait_deprivation',
    background: null,
  },
];

// ── Post Invitation Cards — Burnout (energy hit 0) ────────────────────────
export const court_cards_burnout = [
  {
    id: 'ct_cbu_01',
    speaker: null,
    text: 'The last invitation disappears. She has nothing left.',
    portrait: null,
    background: 'bg_court',
  },
  {
    id: 'ct_cbu_02',
    speaker: 'Deprivation',
    text: 'You gave until there was nothing.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_cbu_03',
    speaker: 'Protagonist',
    text: 'I thought... if I just said yes...',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'ct_cbu_04',
    speaker: 'Deprivation',
    text: 'You forgot to save any for yourself.',
    portrait: 'portrait_deprivation',
    background: null,
  },
];

// ── Post Invitation Cards — Isolated (toll maxed) ─────────────────────────
export const court_cards_isolated = [
  {
    id: 'ct_ci_01',
    speaker: null,
    text: 'The last invitation is left untouched. The court is silent.',
    portrait: null,
    background: 'bg_court',
  },
  {
    id: 'ct_ci_02',
    speaker: 'Deprivation',
    text: 'You kept saying no.',
    portrait: 'portrait_deprivation',
    background: null,
  },
  {
    id: 'ct_ci_03',
    speaker: 'Protagonist',
    text: '...I was protecting myself.',
    portrait: 'portrait_protagonist',
    background: null,
  },
  {
    id: 'ct_ci_04',
    speaker: 'Deprivation',
    text: 'And ended up alone.',
    portrait: 'portrait_deprivation',
    background: null,
  },
];
