const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/endings.js', 'utf8');

// Remove the scaling from the missing poster lines (eb_20 to eb_23)
file = file.replace(/(portrait:\s*'port_missing_poster',\s*sprite:\s*'sprite_missing_poster'),\s*spriteScale:\s*1\.1,\s*spriteOffsetY:\s*0,\s*portraitScale:\s*1\.8,\s*portraitOffsetY:\s*180/g, "$1");

fs.writeFileSync('src/config/dialogues/endings.js', file);
console.log('Fixed missing poster portrait positioning.');
