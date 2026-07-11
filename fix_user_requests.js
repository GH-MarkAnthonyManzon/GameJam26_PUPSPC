const fs = require('fs');

// 1. BootScene: Add MAP.png
let boot = fs.readFileSync('src/scenes/BootScene.js', 'utf8');
if (!boot.includes("bg_MAP")) {
  boot = boot.replace(/this\.load\.image\('bg_PHONE'.*\n/, "$&\n    this.load.image('bg_MAP', 'assets/MAP.png');\n");
  fs.writeFileSync('src/scenes/BootScene.js', boot);
}

// 2. prologue.js: Update p_3_26 for MAP and remove spr_mc_tired
let prol = fs.readFileSync('src/config/dialogues/prologue.js', 'utf8');
prol = prol.replace("id: 'p_3_26',", "id: 'p_3_26',"); // dummy
prol = prol.replace(
  /id: 'p_3_26'[\s\S]*?sfx:/,
  "id: 'p_3_26',\n    speaker: null,\n    text: '[VISUAL: CAMPUS MAP screen appears — three route choices in dialogue box:]\\n> Quadrangle\\n> New Building\\n> Court',\n    portrait: null,\n    background: 'bg_outside',\n    overlay: 'bg_ground',\n    cg: 'bg_MAP',\n    sprite: null,\n    sfx:"
);
prol = prol.replace(/spr_mc_tired/g, 'spr_mc_default');
prol = prol.replace(/port_mc_tired/g, 'port_mc_default');
fs.writeFileSync('src/config/dialogues/prologue.js', prol);

// 3. quadrangle.js: Remove spr_mc_tired and fix Despair
let quad = fs.readFileSync('src/config/dialogues/quadrangle.js', 'utf8').split('\n');
for (let i = 0; i < quad.length; i++) {
  let line = quad[i];
  
  // Replace tired with default
  line = line.replace(/spr_mc_tired/g, 'spr_mc_default');
  line = line.replace(/port_mc_tired/g, 'port_mc_default');

  // Fix Despair
  if (line.includes("portrait_despair")) {
    if (!line.includes("sprite_despair")) {
      line = line.replace(/portrait: 'portrait_despair'/, "portrait: 'portrait_despair', sprite: 'sprite_despair', spriteScale: 0.18, spriteOffsetY: 100, portraitScale: 1.2, portraitOffsetY: 50");
    } else if (!line.includes("spriteScale")) {
      line = line.replace(/sprite: 'sprite_despair'/, "sprite: 'sprite_despair', spriteScale: 0.18, spriteOffsetY: 100, portraitScale: 1.2, portraitOffsetY: 50");
    }
  }

  quad[i] = line;
}
fs.writeFileSync('src/config/dialogues/quadrangle.js', quad.join('\n'));

// 4. Update MiniGameScene.js to support background
let mini = fs.readFileSync('src/scenes/MiniGameScene.js', 'utf8');
if (!mini.includes("if (this.config.background)")) {
  mini = mini.replace(
    /this\.add\.rectangle\(W \/ 2, H \/ 2, W, H, 0x050510, 1\);/,
    "if (this.config.background) {\n      this.add.image(W / 2, H / 2, this.config.background).setAlpha(0.6);\n      this.add.rectangle(W / 2, H / 2, W, H, 0x050510, 0.4);\n    } else {\n      this.add.rectangle(W / 2, H / 2, W, H, 0x050510, 1);\n    }"
  );
  fs.writeFileSync('src/scenes/MiniGameScene.js', mini);
}

// 5. Update Minigame configs
const push = 'src/config/minigames/pushThrough.js';
if (fs.existsSync(push)) {
  let pTxt = fs.readFileSync(push, 'utf8');
  if (!pTxt.includes("background:")) {
    pTxt = pTxt.replace(/label: 'Push Through',/, "label: 'Push Through',\n  background: 'bg_outside',");
    fs.writeFileSync(push, pTxt);
  }
}

const dismiss = 'src/config/minigames/dismissThoughts.js';
if (fs.existsSync(dismiss)) {
  let dTxt = fs.readFileSync(dismiss, 'utf8');
  if (!dTxt.includes("background:")) {
    dTxt = dTxt.replace(/label: 'Dismiss Thoughts',/, "label: 'Dismiss Thoughts',\n  background: 'bg_outside',");
    fs.writeFileSync(dismiss, dTxt);
  }
}

console.log('All user requests applied.');
