const fs = require('fs');

// 1. DialogueScene.js update
let diagFile = fs.readFileSync('src/scenes/DialogueScene.js', 'utf8');

const audioLogicFade = `
    const step = this.steps[index];

    // -- Audio Processing --
    if (step.bgm) {
      if (step.bgm === 'stop') {
        const currentBgm = this.game.registry.get('currentBgmAudio');
        if (currentBgm) {
          this.game.registry.remove('currentBgmAudio');
          this.game.registry.remove('currentBgmKey');
          this.tweens.add({
            targets: currentBgm,
            volume: 0,
            duration: 1500,
            onComplete: () => { currentBgm.stop(); currentBgm.destroy(); }
          });
        }
      } else {
        const currentBgmKey = this.game.registry.get('currentBgmKey');
        if (currentBgmKey !== step.bgm) {
          const currentBgm = this.game.registry.get('currentBgmAudio');
          
          const newBgm = this.sound.add(step.bgm, { loop: true, volume: 0 });
          newBgm.play();
          
          this.game.registry.set('currentBgmKey', step.bgm);
          this.game.registry.set('currentBgmAudio', newBgm);

          if (currentBgm) {
            this.tweens.add({
              targets: currentBgm,
              volume: 0,
              duration: 1500,
              onComplete: () => { currentBgm.stop(); currentBgm.destroy(); }
            });
          }
          this.tweens.add({
            targets: newBgm,
            volume: 0.5,
            duration: 1500
          });
        }
      }
    }

    if (step.sfx) {
      this.sound.play(step.sfx, { volume: 0.8 });
    }
`;

// Replace the previous audio logic block entirely
diagFile = diagFile.replace(/const step = this\.steps\[index\];[\s\S]*?if \(step\.sfx\) \{\s*this\.sound\.play\(step\.sfx, \{ volume: 0\.8 \}\);\s*\}/, audioLogicFade.trim());
fs.writeFileSync('src/scenes/DialogueScene.js', diagFile);

// 2. MiniGameScene.js update
let miniFile = fs.readFileSync('src/scenes/MiniGameScene.js', 'utf8');
const miniFade = `const { width: W, height: H } = this.scale;

    if (this.config.bgm && this.registry.get('currentBgmKey') !== this.config.bgm) {
      const currentBgm = this.registry.get('currentBgmAudio');
      
      const newBgm = this.sound.add(this.config.bgm, { loop: true, volume: 0 });
      newBgm.play();
      
      this.registry.set('currentBgmKey', this.config.bgm);
      this.registry.set('currentBgmAudio', newBgm);

      if (currentBgm) {
        this.tweens.add({
          targets: currentBgm,
          volume: 0,
          duration: 1500,
          onComplete: () => { currentBgm.stop(); currentBgm.destroy(); }
        });
      }
      this.tweens.add({
        targets: newBgm,
        volume: 0.5,
        duration: 1500
      });
    }`;

miniFile = miniFile.replace(/const \{ width: W, height: H \} = this\.scale;\s*if \(this\.config\.bgm[\s\S]*?this\.registry\.set\('currentBgmAudio', bgm\);\s*\}/, miniFade);
fs.writeFileSync('src/scenes/MiniGameScene.js', miniFile);

// 3. TitleScene.js update
let titleFile = fs.readFileSync('src/scenes/TitleScene.js', 'utf8');
const titleFade = `GameState.reset();

    if (this.registry.get('currentBgmKey') !== 'bgm_afternoon') {
      const currentBgm = this.registry.get('currentBgmAudio');
      
      const newBgm = this.sound.add('bgm_afternoon', { loop: true, volume: 0 });
      newBgm.play();
      
      this.registry.set('currentBgmKey', 'bgm_afternoon');
      this.registry.set('currentBgmAudio', newBgm);

      if (currentBgm) {
        this.tweens.add({
          targets: currentBgm,
          volume: 0,
          duration: 1500,
          onComplete: () => { currentBgm.stop(); currentBgm.destroy(); }
        });
      }
      this.tweens.add({
        targets: newBgm,
        volume: 0.5,
        duration: 1500
      });
    }`;

titleFile = titleFile.replace(/GameState\.reset\(\);\s*if \(this\.registry\.get\('currentBgmKey'\)[\s\S]*?this\.registry\.set\('currentBgmAudio', bgm\);\s*\}/, titleFade);
fs.writeFileSync('src/scenes/TitleScene.js', titleFile);

console.log('Crossfade tweens added to DialogueScene, MiniGameScene, and TitleScene!');
