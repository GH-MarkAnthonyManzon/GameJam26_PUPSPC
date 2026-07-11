const fs = require('fs');
let file = fs.readFileSync('src/scenes/DialogueScene.js', 'utf8');

const audioLogic = `
    const step = this.steps[index];

    // -- Audio Processing --
    if (step.bgm) {
      if (step.bgm === 'stop') {
        const currentBgm = this.game.registry.get('currentBgmAudio');
        if (currentBgm) {
          currentBgm.stop();
          this.game.registry.remove('currentBgmAudio');
          this.game.registry.remove('currentBgmKey');
        }
      } else {
        const currentBgmKey = this.game.registry.get('currentBgmKey');
        if (currentBgmKey !== step.bgm) {
          const currentBgm = this.game.registry.get('currentBgmAudio');
          if (currentBgm) currentBgm.stop();
          
          const newBgm = this.sound.add(step.bgm, { loop: true, volume: 0.5 });
          newBgm.play();
          
          this.game.registry.set('currentBgmKey', step.bgm);
          this.game.registry.set('currentBgmAudio', newBgm);
        }
      }
    }

    if (step.sfx) {
      this.sound.play(step.sfx, { volume: 0.8 });
    }
`;

if (!file.includes("currentBgmAudio")) {
  file = file.replace(/const step = this\.steps\[index\];/, audioLogic);
  fs.writeFileSync('src/scenes/DialogueScene.js', file);
  console.log('DialogueScene.js updated for audio.');
}
