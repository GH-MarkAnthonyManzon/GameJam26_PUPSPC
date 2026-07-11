const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/newbuilding.js', 'utf8');

// 1. Fix 'portrait_protagonist' inside nextSteps arrays (replace with port_mc_default and spr_mc_default)
file = file.replace(/portrait:\s*'portrait_protagonist'/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'");

// 2. Add portrait scale/offset to Regret and Lost
const portraitScaleParams = ", portraitScale: 1.8, portraitOffsetY: 180";
file = file.replace(/portrait:\s*'portrait_regret',\s*sprite:\s*'sprite_regret'(?!,\s*portraitScale)/g, "portrait: 'portrait_regret', sprite: 'sprite_regret'" + portraitScaleParams);
file = file.replace(/portrait:\s*'portrait_lost',\s*sprite:\s*'sprite_lost'(?!,\s*portraitScale)/g, "portrait: 'portrait_lost', sprite: 'sprite_lost'" + portraitScaleParams);

// 3. Fix the background for the start of the climax scene (after the minigame)
file = file.replace(
  /{ id: 'nb_fd_01',\s*speaker: null,\s*text: "The eighth door is different. Its wood is darker. Its handle colder.",\s*portrait: null,\s*background: null }/g,
  `{ id: 'nb_fd_01', speaker: null, text: "The eighth door is different. Its wood is darker. Its handle colder.", portrait: null, background: 'bg_hallway' }`
);

// 4. Ensure no portrait_protagonist remains
file = file.replace(/portrait:\s*'portrait_protagonist'/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'");

fs.writeFileSync('src/config/dialogues/newbuilding.js', file);
console.log('Successfully applied dialogue fixes.');
