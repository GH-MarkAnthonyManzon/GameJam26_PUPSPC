const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/court.js', 'utf8');

// 1. Clean up old incorrect protagonist sprites
file = file.replace(/portrait:\s*'portrait_protagonist'(?!,\s*sprite)/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'");
file = file.replace(/portrait:\s*'portrait_protagonist'/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'");
file = file.replace(/port_mc_tired/g, 'port_mc_default');
file = file.replace(/spr_mc_tired/g, 'spr_mc_default');
file = file.replace(/port_mc_monitor/g, 'port_mc_default');
file = file.replace(/spr_mc_monitor/g, 'spr_mc_default');

// 2. Entity positioning: Deprivation, Lost, Despair
const entityString = ", spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180";

// Clean existing stuff
file = file.replace(/portrait:\s*'portrait_deprivation'.*?(?=,\s*background|\s*})/g, "portrait: 'portrait_deprivation'");
file = file.replace(/portrait:\s*'portrait_deprivation'/g, "portrait: 'portrait_deprivation', sprite: 'sprite_deprivation'" + entityString);

file = file.replace(/portrait:\s*'portrait_lost'.*?(?=,\s*background|\s*})/g, "portrait: 'portrait_lost'");
file = file.replace(/portrait:\s*'portrait_lost'/g, "portrait: 'portrait_lost', sprite: 'sprite_lost'" + entityString);

file = file.replace(/portrait:\s*'portrait_despair'.*?(?=,\s*background|\s*})/g, "portrait: 'portrait_despair'");
file = file.replace(/portrait:\s*'portrait_despair'/g, "portrait: 'portrait_despair', sprite: 'sprite_despair'" + entityString);

// 3. Climax backgrounds (so it doesn't return to black screen after minigame)
file = file.replace(/background:\s*null/g, "background: null"); // normalize

fs.writeFileSync('src/config/dialogues/court.js', file);
console.log('court.js updated successfully.');
