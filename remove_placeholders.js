const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/prologue.js', 'utf8');

// Replace any line containing sfx: 'placeholder_...' with sfx: null,
file = file.replace(/sfx:\s*'placeholder_[^']+',/g, "sfx: null,");

fs.writeFileSync('src/config/dialogues/prologue.js', file);
console.log('Removed all placeholder SFX from prologue.js');
