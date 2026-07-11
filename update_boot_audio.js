const fs = require('fs');
let file = fs.readFileSync('src/scenes/BootScene.js', 'utf8');

const audioLoadBlock = `
    // ── Audio ───────────────────────────────────────────────────────────────
    this.load.audio('bgm_afternoon', 'audios/sfx/afternoon.mp3');
    this.load.audio('bgm_main', 'audios/sfx/BGM.mp3');
    this.load.audio('bgm_burnout_dialogue', 'audios/sfx/burnout dialouge.mp3');
    this.load.audio('bgm_burnout_minigame', 'audios/sfx/burnout minigame.mp3');
    this.load.audio('bgm_regret_minigame', 'audios/sfx/baliko katawan minigame.mp3');
    this.load.audio('bgm_regret_dialogue', 'audios/sfx/character na baliko katawan dialogue.mp3');
    this.load.audio('sfx_gravel', 'audios/Footsteps sFX/gravel.mp3');
    this.load.audio('bgm_good_ending', 'audios/sfx/good ending.mp3');
    this.load.audio('bgm_bad_ending', 'audios/sfx/bad ending.mp3');
  }

  create() {`;

if (!file.includes("bgm_afternoon")) {
  file = file.replace(/\s*}\n\s*create\(\) \{/, audioLoadBlock);
  fs.writeFileSync('src/scenes/BootScene.js', file);
  console.log('Audio registered in BootScene.js');
}
