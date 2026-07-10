/**
 * chase.js — Dialogue for ChaseScene checkpoint interruptions
 * Source: NINTENDOGS.pdf — "Final Boss Concept" section
 *
 * Design note (from PDF): "Rather than having the final boss speak,
 * make it a manifestation of all emotional burdens. Its silence makes
 * it more unsettling." — Checkpoint dialogue is minimal: mostly silence
 * and breathing. Entity E (Despair) does not monologue.
 *
 * ChaseScene calls these at scripted progress checkpoints.
 */

export const chase_checkpoint_1 = [
  {
    id: 'ch1_01',
    speaker: null,
    text: '...',
    portrait: 'portrait_despair',
    background: 'bg_chase',
  },
  {
    id: 'ch1_02',
    speaker: null,
    text: '*breathing*',
    portrait: 'portrait_despair',
    background: null,
  },
];

export const chase_checkpoint_2 = [
  {
    id: 'ch2_01',
    speaker: null,
    text: '*footsteps grow louder*',
    portrait: 'portrait_despair',
    background: 'bg_chase',
  },
  {
    id: 'ch2_02',
    speaker: 'Protagonist',
    text: "Don't look back.",
    portrait: 'portrait_protagonist',
    background: null,
  },
];

export const chase_checkpoint_3 = [
  {
    id: 'ch3_01',
    speaker: null,
    text: '*It gets closer.*',
    portrait: 'portrait_despair',
    background: 'bg_chase',
  },
  {
    id: 'ch3_02',
    speaker: 'Protagonist',
    text: 'Almost...',
    portrait: 'portrait_protagonist',
    background: null,
  },
];
