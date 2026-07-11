const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/newbuilding.js', 'utf8');

// The first script only caught lines where both portrait and sprite were present.
// We should catch any line with portrait_lost or portrait_regret that doesn't have portraitScale yet.
file = file.replace(/portrait:\s*'portrait_lost'(?!.*?portraitScale)/g, "portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180");
file = file.replace(/portrait:\s*'portrait_regret'(?!.*?portraitScale)/g, "portrait: 'portrait_regret', sprite: 'sprite_regret', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180");

// Oh wait, some lines already have "portrait: 'portrait_lost', sprite: 'sprite_lost', portraitScale: 1.8, portraitOffsetY: 180" from my previous script.
// Let's do a cleaner approach: match the object, parse it? No, regex is fine. Let's just remove all the extra fields first and then re-add them to be perfectly uniform.
file = file.replace(/portrait:\s*'portrait_lost'.*?(?=,\s*background|\s*})/g, "portrait: 'portrait_lost'");
file = file.replace(/portrait:\s*'portrait_lost'/g, "portrait: 'portrait_lost', sprite: 'sprite_lost', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180");

file = file.replace(/portrait:\s*'portrait_regret'.*?(?=,\s*background|\s*})/g, "portrait: 'portrait_regret'");
file = file.replace(/portrait:\s*'portrait_regret'/g, "portrait: 'portrait_regret', sprite: 'sprite_regret', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180");

fs.writeFileSync('src/config/dialogues/newbuilding.js', file);
console.log('Successfully applied aggressive entity configuration.');
