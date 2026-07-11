const fs = require('fs');

function updateFile(path, replacers) {
  let file = fs.readFileSync(path, 'utf8');
  for (const r of replacers) {
    file = file.replace(r.search, r.replace);
  }
  fs.writeFileSync(path, file);
}

// 1. BootScene.js
let bootFile = fs.readFileSync('src/scenes/BootScene.js', 'utf8');
if (!bootFile.includes("bgm_twisted_minigame")) {
  bootFile = bootFile.replace(
    /this\.load\.audio\('bgm_chase', 'audios\/sfx\/chase scene \(climax\)\.mp3'\);/,
    "this.load.audio('bgm_chase', 'audios/sfx/chase scene (climax).mp3');\n    this.load.audio('bgm_twisted_minigame', 'audios/sfx/TWISTED MINIGAME.mp3');"
  );
  fs.writeFileSync('src/scenes/BootScene.js', bootFile);
}

// 2. invitationCards.js
updateFile('src/config/minigames/invitationCards.js', [
  {
    search: /bgm: 'bgm_regret_dialogue',/,
    replace: "bgm: 'bgm_burnout_dialogue',"
  }
]);

// 3. newbuilding.js
updateFile('src/config/dialogues/newbuilding.js', [
  {
    search: /id: 'nb_pf_e_01',/,
    replace: "id: 'nb_pf_e_01',\n    bgm: 'bgm_twisted_minigame',"
  },
  {
    search: /id: 'nb_pf_g_01',/,
    replace: "id: 'nb_pf_g_01',\n    bgm: 'bgm_twisted_minigame',"
  },
  {
    search: /id: 'nb_pf_b_01',/,
    replace: "id: 'nb_pf_b_01',\n    bgm: 'bgm_twisted_minigame',"
  },
  {
    search: /id: 'nb_pf_f_01',/,
    replace: "id: 'nb_pf_f_01',\n    bgm: 'bgm_twisted_minigame',"
  }
]);

// 4. court.js
updateFile('src/config/dialogues/court.js', [
  {
    search: /id: 'ct_cb_01',/,
    replace: "id: 'ct_cb_01',\n    bgm: 'bgm_twisted_minigame',"
  },
  {
    search: /id: 'ct_cbu_01',/,
    replace: "id: 'ct_cbu_01',\n    bgm: 'bgm_twisted_minigame',"
  },
  {
    search: /id: 'ct_ci_01',/,
    replace: "id: 'ct_ci_01',\n    bgm: 'bgm_twisted_minigame',"
  }
]);

console.log('Audio revision completed successfully!');
