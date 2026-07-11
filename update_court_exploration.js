const fs = require('fs');
let file = fs.readFileSync('src/config/explorations/courtExploration.js', 'utf8');

file = file.replace(/background: 'bg_court'/, "background: 'bg_court'");

// Add BPI
file = file.replace(/id: 'basketball',\s*x: 150, y: 310, w: 80, h: 80,\s*color: 0xe17055,\s*label: 'Basketball',/, 
  "id: 'basketball',\n          x: 150, y: 310, w: 80, h: 80,\n          color: 0xe17055,\n          label: 'Basketball',\n          texture: 'clue_BPI',\n          frameRect: { x: 0, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");
file = file.replace(/id: 'club_posters',\s*x: 400, y: 275, w: 100, h: 100,\s*color: 0x6c5ce7,\s*label: 'Club Posters',/, 
  "id: 'club_posters',\n          x: 400, y: 275, w: 100, h: 100,\n          color: 0x6c5ce7,\n          label: 'Club Posters',\n          texture: 'clue_BPI',\n          frameRect: { x: 1200, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");
file = file.replace(/id: 'music_equipment',\s*x: 625, y: 295, w: 110, h: 90,\s*color: 0x00b894,\s*label: 'Music Equipment',/, 
  "id: 'music_equipment',\n          x: 625, y: 295, w: 110, h: 90,\n          color: 0x00b894,\n          label: 'Music Equipment',\n          texture: 'clue_BPI',\n          frameRect: { x: 2400, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");

// Add PCS
file = file.replace(/id: 'photos',\s*x: 175, y: 300, w: 100, h: 80,\s*color: 0xfdcb6e,\s*label: 'Old Photos',/, 
  "id: 'photos',\n          x: 175, y: 300, w: 100, h: 80,\n          color: 0xfdcb6e,\n          label: 'Old Photos',\n          texture: 'clue_PCS',\n          frameRect: { x: 0, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");
file = file.replace(/id: 'certificates',\s*x: 415, y: 285, w: 110, h: 90,\s*color: 0xffeaa7,\s*label: 'Certificates',/, 
  "id: 'certificates',\n          x: 415, y: 285, w: 110, h: 90,\n          color: 0xffeaa7,\n          label: 'Certificates',\n          texture: 'clue_PCS',\n          frameRect: { x: 1200, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");
file = file.replace(/id: 'sketchbook',\s*x: 625, y: 295, w: 90, h: 105,\s*color: 0xb2bec3,\s*label: 'Old Sketchbook',/, 
  "id: 'sketchbook',\n          x: 625, y: 295, w: 90, h: 105,\n          color: 0xb2bec3,\n          label: 'Old Sketchbook',\n          texture: 'clue_PCS',\n          frameRect: { x: 2400, y: 300, w: 1000, h: 1400 },\n          visual: { scale: 0.12, offsetY: -30 },");

fs.writeFileSync('src/config/explorations/courtExploration.js', file);
console.log('courtExploration updated.');
