const fs = require('fs');

// 1. BootScene.js update
let file = fs.readFileSync('src/scenes/BootScene.js', 'utf8');

const audioLoadBlock2 = `
    this.load.audio('sfx_hallway', 'audios/Footsteps sFX/hallway.mp3');
    this.load.audio('sfx_heavy', 'audios/Footsteps sFX/heavy.mp3');
    this.load.audio('bgm_chase', 'audios/sfx/chase scene (climax).mp3');
  }

  create() {`;

if (!file.includes("sfx_hallway")) {
  file = file.replace(/\s*}\n\s*create\(\) \{/, audioLoadBlock2);
  fs.writeFileSync('src/scenes/BootScene.js', file);
  console.log('New audio registered in BootScene.js');
}
