const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/newbuilding.js', 'utf8');

// 1. Revert ALL MC sprites to default, since both tired and shocked seem to have the monitor glow or the user just wants the default.
file = file.replace(/port_mc_tired/g, 'port_mc_default');
file = file.replace(/spr_mc_tired/g, 'spr_mc_default');
file = file.replace(/port_mc_shocked/g, 'port_mc_default');
file = file.replace(/spr_mc_shocked/g, 'spr_mc_default');
file = file.replace(/port_mc_monitor/g, 'port_mc_default');
file = file.replace(/spr_mc_monitor/g, 'spr_mc_default');

// 2. Remove the scale and offset overrides for REGRET that broke its portrait box positioning.
// The string was: spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180
file = file.replace(/(portrait:\s*'portrait_regret',\s*sprite:\s*'sprite_regret'),\s*spriteScale:\s*1\.1,\s*spriteOffsetY:\s*0,\s*portraitScale:\s*1\.8,\s*portraitOffsetY:\s*180/g, "$1");

fs.writeFileSync('src/config/dialogues/newbuilding.js', file);
console.log('Fixed MC sprites and Regret portrait.');
