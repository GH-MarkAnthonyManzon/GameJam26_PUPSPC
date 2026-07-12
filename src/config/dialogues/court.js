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
    text: 'The empty court echoes every footstep. The atmosphere feels much heavier.', sfx: 'sfx_hallway',
    portrait: null,
    background: 'bg_court',
  },
  {
    id: 'ct_l1_02',
    speaker: 'Lost',
    text: 'Remember these?',
    portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180,
    background: null,
  },
  {
    id: 'ct_l1_03',
    speaker: 'Protagonist',
    text: '...',
    portrait: 'port_mc_default', sprite: 'spr_mc_default',
    background: null,
  },
  {
    id: 'ct_l1_04',
    speaker: 'Lost',
    text: 'You quit.',
    portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180,
    background: null,
  },
  {
    id: 'ct_l1_05',
    speaker: null,
    text: 'Lost constantly questions her purpose.',
    portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180,
    background: null,
  },
];

// ── Climax — Deprivation appears + Final Boss ────────────────────────────
export const court_climax = [
  { id: 'ct_cl_01', speaker: 'Protagonist', text: 'Stop it... both of you.', portrait: 'port_mc_default', sprite: 'spr_mc_shocked', background: 'bg_court' },
  { id: 'ct_cl_02', speaker: null, text: 'DEPRIVATION appears. Unlike the others — very calm. Soft voice.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_03', speaker: 'Deprivation', text: 'You used to draw.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_04', speaker: 'Protagonist', text: '...I was busy.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_05', speaker: 'Deprivation', text: 'Busy.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_06', speaker: null, text: 'Silence. The empty court echoes the unspoken words.', portrait: null, background: null },
  { id: 'ct_cl_07', speaker: 'Deprivation', text: 'Years. When was the last time... you did something because it made you happy?', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_08', speaker: null, text: 'She opens her mouth, but no words come out.', portrait: null, background: null },
  { id: 'ct_cl_09', speaker: null, text: 'LOST steps out from the bleachers. Its movements are slow, drifting aimlessly.', sfx: 'sfx_heavy', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_10', speaker: 'Lost', text: "She doesn't know who she is.", portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_11', speaker: 'Deprivation', text: 'Because she starved herself of joy.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_12', speaker: 'Lost', text: 'She chased success... but never knew where it was leading.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_13', speaker: 'Deprivation', text: '...and left herself behind.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_14', speaker: 'Protagonist', text: "I did what I had to do! You don't understand the pressure!", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_15', speaker: 'Lost', text: 'We understand better than anyone.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_16', speaker: 'Deprivation', text: 'We are the hollow space inside your chest.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_17', speaker: 'Lost', text: 'The feeling of waking up and not recognizing your own life.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_18', speaker: 'Protagonist', text: 'Then tell me how to fix it! If you know so much, tell me what to do!', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_19', speaker: 'Deprivation', text: 'We cannot fill what has always been empty.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_20', speaker: 'Lost', text: 'We are only echoes.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_21', speaker: 'Protagonist', text: 'Echoes of what?', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_22', speaker: 'Deprivation', text: 'Of a silence you refused to listen to.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_23', speaker: 'Lost', text: 'A silence that is no longer satisfied with just waiting.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_24', speaker: null, text: 'The overhead lights in the court shatter simultaneously. Total darkness descends. The polished wood floor begins to splinter and crack.', portrait: null, background: null },
  { id: 'ct_cl_25', speaker: 'Deprivation', text: 'The loneliness... the longing...', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_26', speaker: 'Lost', text: 'They were just the beginning.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_27', speaker: null, text: 'A profound, unnatural stillness fills the room. The shadows stretch across the court, pooling together at the center.', portrait: null, background: null },
  { id: 'ct_cl_28', speaker: 'Protagonist', text: 'What is happening?', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_29', speaker: null, text: 'Lost and Deprivation do not move. They watch calmly as the darkness consumes the room.', portrait: null, background: null },
  { id: 'ct_cl_30', speaker: 'Deprivation', text: 'When you lose your way, and you starve your soul...', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cl_31', speaker: 'Lost', text: '...there is only one place left to fall.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_32', speaker: null, text: 'A massive, shifting silhouette rises from the center of the court. It has no discernible shape, only a writhing mass of shadows that pull the warmth from the air.', portrait: null, background: null },
  { id: 'ct_cl_33', speaker: null, text: 'Burnout and Regret\'s whispers can be heard faintly within it, joined now by the soft, hollow tones of Lost and Deprivation.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_34', speaker: null, text: 'Lost and Deprivation fade into the shadows, offering no resistance. They merge into the whole.', portrait: null, background: null },
  { id: 'ct_cl_35', speaker: 'Despair', text: '"You have nowhere to go..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_36', speaker: 'Despair', text: '"You will always be empty..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_37', speaker: 'Despair', text: '"Stay in the dark..."', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cl_38', speaker: null, text: 'It is the terrifying sum of her isolation and her longing. Despair.', portrait: null, background: null },
  { id: 'ct_cl_39', speaker: null, text: 'Suddenly, the heavy double doors at the far end of the gym burst open. A sliver of moonlight cuts through the oppressive dark.', portrait: null, background: null },
  { id: 'ct_cl_40', speaker: 'Protagonist', text: 'I won\'t let it swallow me.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cl_41', speaker: null, text: 'The entity lets out a deafening, hollow scream. The ground violently shakes. The chase begins.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
];

export const court_cards_balanced = [
  {
    id: 'ct_cb_01',
    bgm: 'bgm_twisted_minigame', speaker: null, text: 'The last card fades. Something shifts in the air.', portrait: null, background: 'bg_court'
  },
  { id: 'ct_cb_02', speaker: 'Lost', text: 'You tried to hold everything. You ran in every direction...', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cb_03', speaker: 'Deprivation', text: '...but your hands are still empty.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cb_04', speaker: 'Protagonist', text: 'I... I tried to keep up. I didn\'t want to fall behind.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cb_05', speaker: 'Deprivation', text: 'And yet, you never caught up to what you truly wanted.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cb_06', speaker: 'Lost', text: 'You only arrived nowhere.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cb_07', speaker: 'Protagonist', text: 'I made it this far, didn\'t I? I survived.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
];

export const court_cards_burnout = [
  {
    id: 'ct_cbu_01',
    bgm: 'bgm_twisted_minigame', speaker: null, text: 'The last invitation disappears. She has nothing left.', portrait: null, background: 'bg_court'
  },
  { id: 'ct_cbu_02', speaker: 'Lost', text: 'You gave them everything. Every hour. Every piece of yourself.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cbu_03', speaker: 'Protagonist', text: 'I thought... if I just said yes, I\'d find where I belong.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_cbu_04', speaker: 'Deprivation', text: 'But you gave until there was nothing left for you.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cbu_05', speaker: 'Lost', text: 'Now, you are empty.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_cbu_06', speaker: 'Deprivation', text: 'A hollow shell, echoing with everyone else\'s demands.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_cbu_07', speaker: 'Protagonist', text: 'I just... I just wanted to be enough.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
];

export const court_cards_isolated = [
  {
    id: 'ct_ci_01',
    bgm: 'bgm_twisted_minigame', speaker: null, text: 'The last invitation is left untouched. The court is silent.', portrait: null, background: 'bg_court'
  },
  { id: 'ct_ci_02', speaker: 'Lost', text: 'You pushed them all away. You refused to walk with them.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_ci_03', speaker: 'Protagonist', text: 'I was protecting myself! It was too much.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_ci_04', speaker: 'Deprivation', text: 'You built walls so high that no one could reach you.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_ci_05', speaker: 'Lost', text: 'And now, you are completely alone.', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_ci_06', speaker: 'Deprivation', text: 'Safe from the world. Starving in the dark.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'ct_ci_07', speaker: 'Protagonist', text: '... I didn\'t know what else to do.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
];

export const court_chase_checkpoint_1 = [
  { id: 'ct_ch1_01', speaker: null, text: 'The court feels endless.', portrait: null, background: 'bg_chase' }
];

export const court_chase_checkpoint_2 = [
  { id: 'ct_ch2_01', speaker: null, text: 'You are running in circles.', portrait: null, background: 'bg_chase' }
];

export const court_chase_checkpoint_3 = [
  { id: 'ct_ch3_01', speaker: null, text: 'There is nothing left.', portrait: null, background: 'bg_chase' }
];

export const court_chase_resolution_good = [
  { id: 'ct_chr_g_01', speaker: null, text: 'She stumbles toward the blinding light ahead. Her body aches, and the shadows claw at her heels.', portrait: null, background: 'bg_chase' },
  { id: 'ct_chr_g_02', speaker: 'Protagonist', text: "I don't know where I'm going... but anywhere is better than here.", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'ct_chr_g_03', speaker: null, text: 'With one final push, she forces herself forward.', portrait: null, background: null },
  { id: 'ct_chr_g_04', speaker: null, text: 'She steps into the light, leaving the shadows behind. Everything fades to white.', portrait: null, background: null },
];

export const court_chase_resolution_bad = [
  { id: 'ct_chr_b_01', speaker: null, text: 'Her legs give out. She collapses onto the polished floor of the court.', portrait: null, background: 'bg_chase' },
  { id: 'ct_chr_b_02', speaker: null, text: 'In an instant, the encroaching darkness swallows her completely. Heavy, suffocating hands of shadow pull her down.', portrait: null, background: null },
  { id: 'ct_chr_b_03', speaker: 'Protagonist', text: "I'm so lost... I'm so empty...", portrait: 'port_mc_default', sprite: 'spr_mc_shocked', background: null },
  { id: 'ct_chr_b_04', speaker: null, text: 'The cacophony of whispers finally ceases, merging into a single, overwhelming silence.', portrait: null, background: null },
  { id: 'ct_chr_b_05', speaker: 'Despair', text: 'Then be nothing.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'ct_chr_b_06', speaker: null, text: 'She closes her eyes. Everything goes black.', portrait: null, background: null },
];
