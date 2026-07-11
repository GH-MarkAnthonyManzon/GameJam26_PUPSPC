const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/endings.js', 'utf8');

// 1. eb_01: background to null
file = file.replace(/id: 'eb_01', speaker: null, text: 'Darkness\. Silence\.', portrait: null, background: 'bg_hub'/,
  "id: 'eb_01', speaker: null, text: 'Darkness. Silence.', portrait: null, background: null");

// 2. eb_03: shocked mc
file = file.replace(/id: 'eb_03', speaker: 'Protagonist', text: 'No\.\.\. Please\.\.\.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null/,
  "id: 'eb_03', speaker: 'Protagonist', text: 'No... Please...', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked', background: null");

// 3. entities
file = file.replace(/id: 'eb_06', speaker: 'Burnout', text: 'Keep going\.', portrait: null, background: null/,
  "id: 'eb_06', speaker: 'Burnout', text: 'Keep going.', portrait: 'portrait_burnout', sprite: 'sprite_burnout', background: null");

file = file.replace(/id: 'eb_07', speaker: 'Regret', text: 'Not enough\.', portrait: null, background: null/,
  "id: 'eb_07', speaker: 'Regret', text: 'Not enough.', portrait: 'portrait_regret', sprite: 'sprite_regret', background: null");

file = file.replace(/id: 'eb_08', speaker: 'Lost', text: 'Where will you run now\?', portrait: null, background: null/,
  "id: 'eb_08', speaker: 'Lost', text: 'Where will you run now?', portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null");

file = file.replace(/id: 'eb_09', speaker: 'Deprivation', text: 'You forgot yourself\.', portrait: null, background: null/,
  "id: 'eb_09', speaker: 'Deprivation', text: 'You forgot yourself.', portrait: 'portrait_deprivation', sprite: 'sprite_deprivation', background: null");

file = file.replace(/id: 'eb_11', speaker: 'Despair', text: 'Stay with us\.', portrait: 'portrait_despair', background: null/,
  "id: 'eb_11', speaker: 'Despair', text: 'Stay with us.', portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null");

// 4. epilogue bg_ground
file = file.replace(/id: 'eb_13', speaker: null, text: 'Morning\. Students walk to class\. The campus is lively\. Everything feels ordinary\.', portrait: null, background: null/,
  "id: 'eb_13', speaker: null, text: 'Morning. Students walk to class. The campus is lively. Everything feels ordinary.', portrait: null, background: 'bg_ground'");

// 5. poster
const posterString = "portrait: 'port_missing_poster', sprite: 'sprite_missing_poster', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180";

file = file.replace(/id: 'eb_20', speaker: null, text: 'The camera lingers on the poster\. The wind blows\. It begins to tear\.', portrait: null, background: null/,
  "id: 'eb_20', speaker: null, text: 'The camera lingers on the poster. The wind blows. It begins to tear.', " + posterString + ", background: null");

file = file.replace(/id: 'eb_21', speaker: null, text: 'For a brief second\.\.\. The protagonist\\'s photograph changes\. Her eyes are completely black\.', portrait: null, background: null/,
  "id: 'eb_21', speaker: null, text: 'For a brief second... The protagonist\\'s photograph changes. Her eyes are completely black.', " + posterString + ", background: null");

file = file.replace(/id: 'eb_22', speaker: null, text: 'Blink\. Everything returns to normal\. The poster continues fluttering in the wind\.', portrait: null, background: null/,
  "id: 'eb_22', speaker: null, text: 'Blink. Everything returns to normal. The poster continues fluttering in the wind.', " + posterString + ", background: null");

file = file.replace(/id: 'eb_23', speaker: null, text: 'Some people disappear without leaving a trace\. Not because no one looked for them\. But because, somewhere along the way\.\.\. They lost themselves\.', portrait: null, background: null/,
  "id: 'eb_23', speaker: null, text: 'Some people disappear without leaving a trace. Not because no one looked for them. But because, somewhere along the way... They lost themselves.', " + posterString + ", background: null");

fs.writeFileSync('src/config/dialogues/endings.js', file);
console.log('Bad Ending array updated successfully.');
