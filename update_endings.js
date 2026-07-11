const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/endings.js', 'utf8');

// eg_01: change bg_lab to bg_comlab
file = file.replace(/id: 'eg_01', speaker: null, text: 'A bright white light fills the screen.', portrait: null, background: 'bg_lab'/,
  "id: 'eg_01', speaker: null, text: 'A bright white light fills the screen.', portrait: null, background: 'bg_comlab'");

// eg_07: set monitor glow
file = file.replace(/id: 'eg_07', speaker: 'Protagonist', text: '\.\.\.', portrait: 'portrait_protagonist', background: null/,
  "id: 'eg_07', speaker: 'Protagonist', text: '...', portrait: 'port_mc_monitor', sprite: 'spr_mc_monitor', background: null");

// eg_12: set monitor glow
file = file.replace(/id: 'eg_12', speaker: 'Protagonist', text: 'Sorry, sir\.\.\.', portrait: 'portrait_protagonist', background: null/,
  "id: 'eg_12', speaker: 'Protagonist', text: 'Sorry, sir...', portrait: 'port_mc_monitor', sprite: 'spr_mc_monitor', background: null");

// eg_16: switch to default when she smiles (Wait, it's a null speaker line, but maybe I can add portrait/sprite here so the on-screen sprite changes?)
file = file.replace(/id: 'eg_16', speaker: null, text: 'She smiles\. A genuine smile\.', portrait: null, background: null/,
  "id: 'eg_16', speaker: null, text: 'She smiles. A genuine smile.', portrait: 'port_mc_default', sprite: 'spr_mc_default', background: null");

// eg_19: set background to bg_quadrangle
file = file.replace(/id: 'eg_19', speaker: null, text: 'Several months later\. The protagonist stands among hundreds of graduating students\.', portrait: null, background: null/,
  "id: 'eg_19', speaker: null, text: 'Several months later. The protagonist stands among hundreds of graduating students.', portrait: null, background: 'bg_quadrangle'");

// eg_23: set grad cap portrait
file = file.replace(/id: 'eg_23', speaker: 'Protagonist', text: '\.\.\. I made it\.', portrait: 'portrait_protagonist', background: null/,
  "id: 'eg_23', speaker: 'Protagonist', text: '... I made it.', portrait: 'port_grad_cap', sprite: 'sprite_grad_cap', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180, background: null");

// Also check the rest of the bad ending just in case there are portrait_protagonist instances
file = file.replace(/portrait:\s*'portrait_protagonist'(?!,\s*sprite)/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'");

fs.writeFileSync('src/config/dialogues/endings.js', file);
console.log('endings.js updated successfully.');
