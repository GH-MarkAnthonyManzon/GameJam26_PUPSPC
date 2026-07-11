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
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: 'bg_outside',
  },
  {
    id: 'qb1_02',
    speaker: 'Burnout',
    text: '...',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
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
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb1_05',
    speaker: 'Protagonist',
    text: '...Who are you?',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'qb1_06',
    speaker: 'Burnout',
    text: "You haven't slept.",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb1_07',
    speaker: 'Protagonist',
    text: 'I...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'qb1_08',
    speaker: 'Burnout',
    text: "It's okay.",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb1_09',
    speaker: 'Burnout',
    text: 'Just one more assignment.',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
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
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
];

// ── Notebook scene — Burnout reappears ────────────────────────────────────
export const quadrangle_burnout_2 = [
  {
    id: 'qb2_01',
    speaker: 'Protagonist',
    text: 'This handwriting...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: 'bg_outside',
  },
  {
    id: 'qb2_02',
    speaker: 'Protagonist',
    text: "...it's mine.",
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
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
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb2_05',
    speaker: 'Burnout',
    text: 'You wrote that.',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb2_06',
    speaker: 'Protagonist',
    text: '...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'qb2_07',
    speaker: 'Burnout',
    text: 'You always say',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qb2_08',
    speaker: 'Burnout',
    text: '"Sleep later."',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
];

// ── Post Push Through — Survived ──────────────────────────────────────────
export const quadrangle_pushthrough_success = [
  {
    id: 'qpts_01',
    speaker: 'Burnout',
    text: 'See?',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: 'bg_outside',
  },
  {
    id: 'qpts_02',
    speaker: 'Burnout',
    text: 'You can keep going.',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qpts_03',
    speaker: 'Protagonist',
    text: '(breathing) No...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'qpts_04',
    speaker: 'Burnout',
    text: "You're doing great.",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qpts_05',
    speaker: 'Burnout',
    text: 'Everyone else is surviving.',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qpts_06',
    speaker: 'Burnout',
    text: "Why can't you?",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
];

// ── Post Push Through — Failed (energy hit 0) ─────────────────────────────
export const quadrangle_pushthrough_fail = [
  {
    id: 'qptf_01',
    speaker: 'Burnout',
    text: "You couldn't hold on.",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: 'bg_outside',
  },
  {
    id: 'qptf_02',
    speaker: 'Protagonist',
    text: 'I...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'qptf_03',
    speaker: 'Burnout',
    text: 'You never could.',
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
    background: null,
  },
  {
    id: 'qptf_04',
    speaker: 'Burnout',
    text: "Everyone else can. Why can't you?",
    portrait: 'portrait_burnout', sprite: 'sprite_burnout',
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
    background: 'bg_outside',
  },
  {
    id: 'qdts_02',
    speaker: 'Protagonist',
    text: '...I can breathe.',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
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
    background: 'bg_outside',
  },
  {
    id: 'qdtf_02',
    speaker: 'Protagonist',
    text: 'Make them stop...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
];

// ── Climax — Both entities + Final Boss appears ───────────────────────────
const quadrangle_climax_base = [
  { id: 'qcl_01', speaker: null, text: 'The quadrangle stretches endlessly. The protagonist stops, breathing heavily. Every muscle aches.', portrait: null, background: 'bg_outside' },
  { id: 'qcl_02', speaker: null, text: 'The wind howls through the empty courtyard. The air feels thick, like moving underwater.', portrait: null, background: null },
  { id: 'qcl_03', speaker: 'Protagonist', text: 'Just... a little further...', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_04', speaker: null, text: 'A heavy sigh echoes through the corridor. It doesn\'t come from her.', portrait: null, background: null },
  { id: 'qcl_05', speaker: 'Burnout', text: 'Why?', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_06', speaker: null, text: 'The protagonist turns. Burnout stands near the concrete benches. Slumped. Exhausted. Its glowing eyes dull.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_07', speaker: 'Burnout', text: 'Why take another step? Your legs are shaking. Your mind is blank.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_08', speaker: 'Protagonist', text: 'I have to finish... I have to get through this.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_09', speaker: 'Burnout', text: 'To what end? There is always another assignment. Always another deadline.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_10', speaker: 'Burnout', text: 'You trade sleep for grades. You trade your health for a piece of paper. It never stops.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_11', speaker: null, text: 'A second voice cuts in. Sharp. Judging.', portrait: null, background: null },
  { id: 'qcl_12', speaker: 'Regret', text: 'And look where it got her.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_13', speaker: null, text: 'The shadows lengthen. REGRET steps out from the darkness. Much taller. Imposing.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_14', speaker: 'Regret', text: 'You worked yourself to the bone, and yet... you still failed.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_15', speaker: 'Protagonist', text: 'No... I tried my best.', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked', background: null },
  { id: 'qcl_16', speaker: 'Regret', text: 'Your best?', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_17', speaker: null, text: 'The courtyard distorts. A flash of memory.', portrait: null, background: null },
  { id: 'qcl_18', speaker: 'Regret', text: 'Do you remember the test? The one you studied three nights for? You still couldn\'t answer the final question.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_19', speaker: 'Regret', text: 'Do you remember the friends you pushed away because you were "too busy"? They stopped calling.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_20', speaker: 'Protagonist', text: 'Stop...', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_21', speaker: 'Burnout', text: 'She\'s too tired to argue.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_22', speaker: null, text: 'Burnout takes a slow, dragging step forward.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_23', speaker: 'Burnout', text: 'Just lay down. Close your eyes. It\'s so much easier to stop caring.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_24', speaker: 'Burnout', text: 'If you give up now, you won\'t have to feel this exhaustion anymore. The pressure will vanish.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_25', speaker: 'Regret', text: 'She can\'t give up. She\'s terrified of proving everyone right. Terrified that all those sacrifices meant nothing.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_26', speaker: 'Protagonist', text: 'I didn\'t sacrifice it for nothing! I\'m building a future!', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_27', speaker: 'Regret', text: 'A future built on broken pieces of yourself. Every choice you made left you emptier.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_28', speaker: 'Burnout', text: 'Look at you. There is barely anything left.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_29', speaker: null, text: 'The protagonist clutches her chest. Her heart is pounding. They are right. The fatigue. The guilt. It\'s suffocating.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_30', speaker: 'Protagonist', text: '... Is this all there is? Just... being tired and hating myself for it?', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_31', speaker: null, text: 'Silence. Burnout and Regret do not advance. They stand perfectly still.', portrait: null, background: null },
  { id: 'qcl_32', speaker: 'Burnout', text: '... We are only the symptoms.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_33', speaker: 'Protagonist', text: 'What?', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked', background: null },
  { id: 'qcl_34', speaker: 'Regret', text: 'You think we are the enemy. You think fighting us will save you.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_35', speaker: 'Regret', text: 'But we are only fragments of a larger crack.', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_36', speaker: null, text: 'The courtyard lamps shatter simultaneously. Total darkness descends. The ground begins to groan, as if buckling under immense weight.', portrait: null, background: null },
  { id: 'qcl_37', speaker: 'Burnout', text: 'The exhaustion you feel... the guilt that haunts you...', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_38', speaker: 'Burnout', text: 'They were just preparing you for him.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_39', speaker: null, text: 'A sound ripples through the dark. Not a footstep. A deep, resonant dragging sound. Like the tearing of metal.', portrait: null, background: null },
  { id: 'qcl_40', speaker: 'Regret', text: 'When every mistake is piled up... when the exhaustion breaks your will to live...', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_41', speaker: 'Regret', text: 'What is left?', portrait: 'portrait_regret', sprite: 'sprite_regret', portraitOffsetY: 60, background: null },
  { id: 'qcl_42', speaker: null, text: 'A massive silhouette begins to rise from the very shadows beneath them. Black sludge pools at the protagonist\'s feet, clinging to her shoes.', portrait: null, background: null },
  { id: 'qcl_43', speaker: 'Protagonist', text: 'No... no, what is that?!', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked', background: null },
  { id: 'qcl_44', speaker: null, text: 'Burnout and Regret begin to sink into the sludge. They do not resist. They simply allow the darkness to reclaim them.', portrait: null, background: null },
  { id: 'qcl_45', speaker: 'Burnout', text: 'The end result.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'qcl_46', speaker: null, text: 'The towering figure fully manifests. It has no face, only a hollow void that pulls at the light. Whispers emanate from it—not just Burnout\'s tired voice, not just Regret\'s sharp tone, but hundreds of overlapping voices crying out in hopelessness.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'qcl_47', speaker: 'Despair', text: '"Give up..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'qcl_48', speaker: 'Despair', text: '"It was all for nothing..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'qcl_49', speaker: 'Despair', text: '"There is no escape..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'qcl_50', speaker: null, text: 'It isn\'t just an emotion anymore. It is a sheer, undeniable fact of her existence. Despair.', portrait: null, background: null },
  { id: 'qcl_51', speaker: null, text: 'Suddenly, the heavy iron gates at the far end of the quadrangle burst open. A sliver of moonlight cuts through the oppressive dark.', portrait: null, background: null },
  { id: 'qcl_52', speaker: 'Protagonist', text: 'I have to run.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qcl_53', speaker: null, text: 'The entity lets out a deafening, hollow scream. The ground violently shakes. The chase begins.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
];

export const quadrangle_climax_excellent = [
  ...quadrangle_dismiss_success,
  { id: 'qcl_e_01', speaker: 'Protagonist', text: "I won't let this bury me.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_good = [
  ...quadrangle_dismiss_success,
  { id: 'qcl_g_01', speaker: 'Protagonist', text: "I just need a little more time.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_barely = [
  ...quadrangle_dismiss_fail,
  { id: 'qcl_b_01', speaker: 'Protagonist', text: "...Just barely.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  ...quadrangle_climax_base
];

export const quadrangle_climax_failed = [
  ...quadrangle_dismiss_fail,
  { id: 'qcl_f_01', speaker: 'Protagonist', text: "I can't... I can't do this anymore.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
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
  { id: 'qchr_g_01', speaker: null, text: 'The protagonist stumbles toward the blinding light ahead. Her body aches with absolute exhaustion.', portrait: null, background: 'bg_chase' },
  { id: 'qchr_g_02', speaker: 'Protagonist', text: "I'm so tired... but I can't stop here.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qchr_g_03', speaker: null, text: 'With one final push, she forces herself forward.', portrait: null, background: null },
  { id: 'qchr_g_04', speaker: null, text: 'She steps into the light, leaving the shadows behind. Everything fades to white.', portrait: null, background: null },
];

export const quadrangle_chase_resolution_bad = [
  { id: 'qchr_b_01', speaker: null, text: 'The exhaustion finally takes over. Her legs give out, and she collapses onto the cold ground.', portrait: null, background: 'bg_chase' },
  { id: 'qchr_b_02', speaker: null, text: 'In an instant, the encroaching darkness swallows her completely. Heavy, suffocating hands of shadow pull her down.', portrait: null, background: null },
  { id: 'qchr_b_03', speaker: 'Protagonist', text: 'I can\'t... I have nothing left...', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'qchr_b_04', speaker: null, text: 'The cacophony of whispers finally ceases, merging into a single, overwhelming silence.', portrait: null, background: null },
  { id: 'qchr_b_05', speaker: 'Despair', text: 'Then rest. Forever.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'qchr_b_06', speaker: null, text: 'She closes her eyes. Everything goes black.', portrait: null, background: null },
];
