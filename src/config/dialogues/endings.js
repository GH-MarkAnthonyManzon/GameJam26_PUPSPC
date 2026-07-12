/**
 * endings.js — Good Ending + Bad Ending dialogue
 * Source: NINTENDOGS.pdf pages 24–25 and updated flow specifications.
 *
 * Threshold (from PDF): Good Ending = 50+ Aura Points
 * Selected in EndingScene → passes to DialogueScene as 'ending_good' or 'ending_bad'
 */

// ── Good Ending ───────────────────────────────────────────────────────────
export const ending_good = [
  {
    id: 'eg_01',
    bgm: 'bgm_good_ending', speaker: null, text: 'A bright white light fills the screen.', portrait: null, background: 'bg_comlab'
  },
  { id: 'eg_02', speaker: null, text: 'The sound of hurried footsteps fades away. The silence is replaced by the chatter of students.', portrait: null, background: null },
  { id: 'eg_03', speaker: null, text: 'A familiar voice breaks through.', portrait: null, background: null },
  { id: 'eg_04', speaker: 'Professor', text: 'Are you with us?', portrait: null, background: null },
  { id: 'eg_05', speaker: null, text: 'She suddenly opens her eyes. She\'s back in the Computer Laboratory.', portrait: null, background: null },
  { id: 'eg_06', speaker: null, text: 'Sunlight streams through the windows. Her classmates are quietly working on their computers.', portrait: null, background: null },
  { id: 'eg_07', speaker: 'Protagonist', text: '...', portrait: 'port_mc_default', sprite: 'spr_mc_monitor', background: null },
  { id: 'eg_08', speaker: null, text: 'She looks around. Everything is normal.', portrait: null, background: null },
  { id: 'eg_09', speaker: null, text: 'The professor smiles.', portrait: null, background: null },
  { id: 'eg_10', speaker: 'Professor', text: 'Long night?', portrait: null, background: null },
  { id: 'eg_11', speaker: null, text: 'The class chuckles softly. Embarrassed, she rubs her eyes.', portrait: null, background: null },
  { id: 'eg_12', speaker: 'Protagonist', text: 'Sorry, sir...', portrait: 'port_mc_default', sprite: 'spr_mc_monitor', background: null },
  { id: 'eg_13', speaker: null, text: 'She glances at her notebook. For a moment... She notices a small handwritten note.', portrait: null, background: null },
  { id: 'eg_14', speaker: null, text: '"One step at a time."', portrait: null, background: null },
  { id: 'eg_15', speaker: null, text: 'She doesn\'t remember writing it. But somehow... It feels familiar.', portrait: null, background: null },
  { id: 'eg_16', speaker: null, text: 'She smiles. A genuine smile.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null },
  { id: 'eg_17', speaker: null, text: 'The future is still uncertain. The deadlines haven\'t disappeared. The mistakes of yesterday still exist.', portrait: null, background: null },
  { id: 'eg_18', speaker: null, text: 'But for the first time... She no longer believes they define her.', portrait: null, background: null },

  // Epilogue
  { id: 'eg_19', speaker: null, text: 'Several months later. She stands among hundreds of graduating students.', portrait: null, background: 'bg_ground' },
  { id: 'eg_20', speaker: null, text: 'She adjusts her graduation cap. Looking around. Her friends wave from nearby. She laughs.', portrait: null, background: null },
  { id: 'eg_21', speaker: null, text: 'As her name is called... She walks across the stage. The audience applauds. She accepts her diploma.', portrait: null, background: null },
  { id: 'eg_22', speaker: null, text: 'The camera lingers for a moment. She looks toward the bright sky.', portrait: null, background: null },
  { id: 'eg_23', speaker: 'Protagonist', text: '... I made it.', portrait: 'port_grad_cap', sprite: 'sprite_grad_cap', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 80, background: null },
  { id: 'eg_24', speaker: null, text: 'Fade to white.', portrait: null, background: null },
  { id: 'eg_25', speaker: null, text: 'Some scars never disappear. But they don\'t have to decide where your story ends. THE END.', portrait: null, background: null },
];

// ── Bad Ending ────────────────────────────────────────────────────────────
export const ending_bad = [
  {
    id: 'eb_01',
    bgm: 'bgm_bad_ending', speaker: null, text: 'Darkness. Silence.', portrait: null, background: null
  },
  { id: 'eb_02', speaker: null, text: 'She struggles to move. Invisible hands pull her backward.', portrait: null, background: null },
  { id: 'eb_03', speaker: 'Protagonist', text: 'No... Please...', portrait: 'port_mc_default', sprite: 'spr_mc_shocked', background: null },
  { id: 'eb_04', speaker: null, text: 'The light grows smaller. Smaller. Until it disappears.', portrait: null, background: null },
  { id: 'eb_05', speaker: null, text: 'The whispers return. Not one. Not two. Hundreds.', portrait: null, background: null },
  { id: 'eb_06', speaker: 'Burnout', text: 'Keep going.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null },
  { id: 'eb_07', speaker: 'Regret', text: 'Not enough.', portrait: 'portrait_regret', sprite: 'sprite_regret', background: null },
  { id: 'eb_08', speaker: 'Lost', text: 'Where will you run now?', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'eb_09', speaker: 'Deprivation', text: 'You forgot yourself.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null },
  { id: 'eb_10', speaker: null, text: 'The voices slowly become one.', portrait: null, background: null },
  { id: 'eb_11', speaker: 'Despair', text: 'Stay with us.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null },
  { id: 'eb_12', speaker: null, text: 'She reaches toward the fading light. Her hand disappears into darkness. Black. Silence.', portrait: null, background: null },

  // Epilogue
  { id: 'eb_13', speaker: null, text: 'Morning. Students walk to class. The campus is lively. Everything feels ordinary.', portrait: null, background: 'bg_ground' },
  { id: 'eb_14', speaker: null, text: 'A student stops near an electric pole. Freshly taped to it... A missing person poster. MISSING STUDENT. Last seen on campus.', portrait: null, background: null },
  { id: 'eb_15', speaker: null, text: 'Several students gather.', portrait: null, background: null },
  { id: 'eb_16', speaker: 'Student 1', text: 'Isn\'t she from the IT department?', portrait: null, background: null },
  { id: 'eb_17', speaker: 'Student 2', text: 'Yeah... I heard she never went home.', portrait: null, background: null },
  { id: 'eb_18', speaker: 'Student 3', text: 'They searched the whole campus.', portrait: null, background: null },
  { id: 'eb_19', speaker: 'Student 3', text: 'They never found her.', portrait: null, background: null },
  { id: 'eb_20', speaker: null, text: 'The camera lingers on the poster. The wind blows. It begins to tear.', portrait: 'port_missing_poster', sprite: 'sprite_missing_poster', background: null },
  { id: 'eb_21', speaker: null, text: 'For a brief second... Her photograph changes. Her eyes are completely black.', portrait: 'port_missing_poster', sprite: 'sprite_missing_poster', background: null },
  { id: 'eb_22', speaker: null, text: 'Blink. Everything returns to normal. The poster continues fluttering in the wind.', portrait: 'port_missing_poster', sprite: 'sprite_missing_poster', background: null },
  { id: 'eb_23', speaker: null, text: 'Some people disappear without leaving a trace. Not because no one looked for them. But because, somewhere along the way... They lost themselves.', portrait: 'port_missing_poster', sprite: 'sprite_missing_poster', background: null },
  { id: 'eb_24', speaker: null, text: 'Fade to black.', portrait: null, background: null },
  { id: 'eb_25', speaker: null, text: 'When your fears become your only voice... Even the brightest path can disappear. THE END.', portrait: null, background: null },
];
