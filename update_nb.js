const fs = require('fs');
let file = fs.readFileSync('src/config/dialogues/newbuilding.js', 'utf8');

// Replace backgrounds
file = file.replace(/nb_in_01.*?background:\s*'bg_newbuilding'/g, "nb_in_01', speaker: null, text: 'The automatic glass doors stand slightly open. No security guard. No janitor. No voices. Only silence.', portrait: null, background: 'bg_outside_avr'");
file = file.replace(/nb_r1_01.*?background:\s*'bg_newbuilding'/g, "nb_r1_01', speaker: null, text: 'She reaches the end of the Ground Floor hallway. The staircase leading upward comes into view.', portrait: null, background: 'bg_stairs'");
file = file.replace(/nb_r1_14.*?background:\s*'bg_newbuilding'/g, "nb_r1_14', speaker: 'Protagonist', text: \"No... I'm done. Whatever this is, I'm not staying here.\", portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked', background: 'bg_stairs'");
file = file.replace(/nb_t2_01.*?background:\s*'bg_newbuilding'/g, "nb_t2_01', speaker: null, text: 'The player continues exploring. As the final clue is collected... A distorted school bell rings.', portrait: null, background: 'bg_hallway'");
file = file.replace(/nb_cl_01.*?background:\s*'bg_newbuilding'/g, "nb_cl_01', speaker: null, text: 'When the darkness fades... The protagonist finds herself standing in front of a pair of large wooden doors. Above them hangs a faded sign. LIBRARY', portrait: null, background: 'bg_library'");
file = file.replace(/nb_pf_e_01.*?background:\s*'bg_newbuilding'/g, "nb_pf_e_01', speaker: 'Protagonist', text: \"... I can't change those memories. But... I don't have to keep living inside them.\", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: 'bg_library'");
file = file.replace(/nb_pf_g_01.*?background:\s*'bg_newbuilding'/g, "nb_pf_g_01', speaker: 'Protagonist', text: \"I still have doubts... But I can keep moving.\", portrait: 'port_mc_default', sprite: 'spr_mc_default', background: 'bg_library'");
file = file.replace(/nb_pf_b_01.*?background:\s*'bg_newbuilding'/g, "nb_pf_b_01', speaker: 'Protagonist', text: \"... Why is it so hard... to forgive myself?\", portrait: 'port_mc_tired', sprite: 'spr_mc_tired', background: 'bg_library'");
file = file.replace(/nb_pf_f_01.*?background:\s*'bg_newbuilding'/g, "nb_pf_f_01', speaker: null, text: 'The Certainty Bar shatters. The hallway cracks apart. The protagonist collapses to her knees.', portrait: null, background: 'bg_library'");


// Fix protagonist portraits and add sprites everywhere
file = file.replace(/portrait:\s*'portrait_protagonist'(,\s*background:\s*(null|'bg_[a-z_]+'))/g, "portrait: 'port_mc_default', sprite: 'spr_mc_default'$1");

// Fix specific shocked/tired expressions for MC
file = file.replace(/nb_in_13.*?port_mc_default.*?spr_mc_default/g, "nb_in_13', speaker: 'Protagonist', text: '... Weird.', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked'");
file = file.replace(/nb_r1_18.*?port_mc_default.*?spr_mc_default/g, "nb_r1_18', speaker: 'Protagonist', text: 'What?', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked'");
file = file.replace(/nb_r1_20.*?port_mc_default.*?spr_mc_default/g, "nb_r1_20', speaker: 'Protagonist', text: \"That's...impossible.\", portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked'");
file = file.replace(/nb_t2_07.*?port_mc_default.*?spr_mc_default/g, "nb_t2_07', speaker: 'Protagonist', text: '... Those... weren\\'t here before.', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked'");
file = file.replace(/nb_cl_64.*?port_mc_default.*?spr_mc_default/g, "nb_cl_64', speaker: 'Protagonist', text: 'Stop!', portrait: 'port_mc_shocked', sprite: 'spr_mc_shocked'");
file = file.replace(/nb_cl_88.*?port_mc_default.*?spr_mc_default/g, "nb_cl_88', speaker: 'Protagonist', text: 'Stop... Please...', portrait: 'port_mc_tired', sprite: 'spr_mc_tired'");
file = file.replace(/nb_pf_f_02.*?port_mc_default.*?spr_mc_default/g, "nb_pf_f_02', speaker: 'Protagonist', text: 'Please... Make it stop...', portrait: 'port_mc_tired', sprite: 'spr_mc_tired'");

// Fix Regret sprite and portrait
file = file.replace(/portrait:\s*'portrait_regret'(,\s*background:\s*(null|'bg_[a-z_]+'))/g, "portrait: 'portrait_regret', sprite: 'sprite_regret'$1");
// Fix Lost sprite and portrait
file = file.replace(/portrait:\s*'portrait_lost'(,\s*background:\s*(null|'bg_[a-z_]+'))/g, "portrait: 'portrait_lost', sprite: 'sprite_lost'$1");

// Fix Despair sprite and portrait with correct scale/offset
file = file.replace(/portrait:\s*'portrait_despair'(,\s*background:\s*(null|'bg_[a-z_]+'))/g, "portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 1.1, spriteOffsetY: 0, portraitScale: 1.8, portraitOffsetY: 180$1");

fs.writeFileSync('src/config/dialogues/newbuilding.js', file);
console.log('Successfully updated newbuilding.js');
