const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/court.js', 'utf8');

// Remove the scale and offset overrides for DEPRIVATION that broke its portrait box positioning.
// The string was: , spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180
file = file.replace(/(portrait:\s*'portrait_deprivation',\s*sprite:\s*'sprite_deprivation'),\s*spriteScale:\s*1\.1,\s*spriteOffsetY:\s*0,\s*portraitScale:\s*1\.8,\s*portraitOffsetY:\s*180/g, "$1");

fs.writeFileSync('src/config/dialogues/court.js', file);
console.log('Fixed Deprivation portrait positioning.');
