const fs = require('fs');

function updateFile(path, replacers) {
  let file = fs.readFileSync(path, 'utf8');
  for (const r of replacers) {
    file = file.replace(r.search, r.replace);
  }
  fs.writeFileSync(path, file);
}

// 1. TitleScene.js
updateFile('src/scenes/TitleScene.js', [
  {
    search: /GameState\.reset\(\);\n/,
    replace: `GameState.reset();\n\n    if (this.registry.get('currentBgmKey') !== 'bgm_afternoon') {
      const old = this.registry.get('currentBgmAudio');
      if (old) old.stop();
      const bgm = this.sound.add('bgm_afternoon', { loop: true, volume: 0.5 });
      bgm.play();
      this.registry.set('currentBgmKey', 'bgm_afternoon');
      this.registry.set('currentBgmAudio', bgm);
    }\n`
  }
]);

// 2. MiniGameScene.js
updateFile('src/scenes/MiniGameScene.js', [
  {
    search: /const \{ width: W, height: H \} = this\.scale;\n/,
    replace: `const { width: W, height: H } = this.scale;\n
    if (this.config.bgm && this.registry.get('currentBgmKey') !== this.config.bgm) {
      const old = this.registry.get('currentBgmAudio');
      if (old) old.stop();
      const bgm = this.sound.add(this.config.bgm, { loop: true, volume: 0.5 });
      bgm.play();
      this.registry.set('currentBgmKey', this.config.bgm);
      this.registry.set('currentBgmAudio', bgm);
    }\n`
  }
]);

// 3. minigames configs
updateFile('src/config/minigames/pushThrough.js', [
  {
    search: /type: 'PUSH_THROUGH',/,
    replace: "type: 'PUSH_THROUGH',\n  bgm: 'bgm_burnout_minigame',"
  }
]);

updateFile('src/config/minigames/dismissThoughts.js', [
  {
    search: /type: 'DISMISS_THOUGHTS',/,
    replace: "type: 'DISMISS_THOUGHTS',\n  bgm: 'bgm_regret_minigame',"
  }
]);

// 4. prologue.js
updateFile('src/config/dialogues/prologue.js', [
  {
    search: /id: 'p_1_01',/,
    replace: "id: 'p_1_01',\n    bgm: 'bgm_afternoon',"
  },
  {
    search: /id: 'p_2_01',/,
    replace: "id: 'p_2_01',\n    bgm: 'bgm_main',"
  },
  {
    search: /sfx: 'placeholder_footsteps_echoing',/g,
    replace: "sfx: 'sfx_gravel',"
  }
]);

// 5. quadrangle.js
updateFile('src/config/dialogues/quadrangle.js', [
  {
    search: /id: 'qd_cl_01',/,
    replace: "id: 'qd_cl_01',\n    bgm: 'bgm_burnout_dialogue',"
  }
]);

// 6. newbuilding.js
updateFile('src/config/dialogues/newbuilding.js', [
  {
    search: /id: 'nb_cl_01',/,
    replace: "id: 'nb_cl_01',\n    bgm: 'bgm_regret_dialogue',"
  }
]);

// 7. endings.js
updateFile('src/config/dialogues/endings.js', [
  {
    search: /id: 'eg_01',/,
    replace: "id: 'eg_01',\n    bgm: 'bgm_good_ending',"
  },
  {
    search: /id: 'eb_01',/,
    replace: "id: 'eb_01',\n    bgm: 'bgm_bad_ending',"
  }
]);

console.log('Audio mapping applied successfully across all scenes and dialogues.');
