const fs = require('fs');

function updateFile(path, replacers) {
  let file = fs.readFileSync(path, 'utf8');
  for (const r of replacers) {
    file = file.replace(r.search, r.replace);
  }
  fs.writeFileSync(path, file);
}

// 1. Minigames
updateFile('src/config/minigames/hallwayOfDoors.js', [
  {
    search: /type: 'HALLWAY_OF_DOORS',/,
    replace: "type: 'HALLWAY_OF_DOORS',\n  bgm: 'bgm_regret_dialogue',"
  }
]);

updateFile('src/config/minigames/invitationCards.js', [
  {
    search: /type: 'INVITATION_CARDS',/,
    replace: "type: 'INVITATION_CARDS',\n  bgm: 'bgm_regret_dialogue',"
  }
]);

// 2. newbuilding.js
updateFile('src/config/dialogues/newbuilding.js', [
  {
    search: /id: 'nb_01',/,
    replace: "id: 'nb_01',\n    bgm: 'bgm_main',"
  },
  {
    search: /id: 'nb_in_14',\s*speaker: null,\s*text: 'She keeps walking\. Step\.\.\. \.\.\. Step\.\.\. \.\.\. Step\.\.\.',\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_in_14', speaker: null, text: 'She keeps walking. Step... ... Step... ... Step...', portrait: null, background: null, sfx: 'sfx_hallway'"
  },
  {
    search: /id: 'nb_in_17',\s*speaker: null,\s*text: 'The protagonist immediately freezes\. Silence\. The second footsteps stop as well\.',\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_in_17', speaker: null, text: 'The protagonist immediately freezes. Silence. The second footsteps stop as well.', portrait: null, background: null, sfx: 'sfx_hallway'"
  },
  {
    search: /id: 'nb_in_22',\s*speaker: null,\s*text: 'She starts walking again\. The second footsteps return\. Always one step behind\. Never catching up\. Never falling behind\.',\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_in_22', speaker: null, text: 'She starts walking again. The second footsteps return. Always one step behind. Never catching up. Never falling behind.', portrait: null, background: null, sfx: 'sfx_heavy'"
  },
  {
    search: /id: 'nb_r1_28',\s*speaker: null,\s*text: 'The staircase groans beneath every step\. Each floor creaks as though the building itself is breathing\. The farther she climbs\.\.\. The quieter the world becomes\.',\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_r1_28', speaker: null, text: 'The staircase groans beneath every step. Each floor creaks as though the building itself is breathing. The farther she climbs... The quieter the world becomes.', portrait: null, background: null, sfx: 'sfx_hallway'"
  },
  {
    search: /id: 'nb_cl_06',\s*speaker: null,\s*text: 'The protagonist steps forward\. Her footsteps are muffled by the carpet\. The deeper she walks\.\.\. The darker the room becomes\.',\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_cl_06', speaker: null, text: 'The protagonist steps forward. Her footsteps are muffled by the carpet. The deeper she walks... The darker the room becomes.', portrait: null, background: null, sfx: 'sfx_hallway'"
  },
  {
    search: /id: 'nb_fd_11',\s*speaker: null,\s*text: "For the first time\.\.\. The protagonist hears footsteps approaching\. Not behind her\. Not ahead of her\. Everywhere\.",\s*portrait: null,\s*background: null/,
    replace: "id: 'nb_fd_11', speaker: null, text: \"For the first time... The protagonist hears footsteps approaching. Not behind her. Not ahead of her. Everywhere.\", portrait: null, background: null, sfx: 'sfx_heavy'"
  }
]);

// 3. court.js
updateFile('src/config/dialogues/court.js', [
  {
    search: /id: 'ct_01',/,
    replace: "id: 'ct_01',\n    bgm: 'bgm_main',"
  },
  {
    search: /text: 'The empty court echoes every footstep\. The atmosphere feels much heavier\.',/g,
    replace: "text: 'The empty court echoes every footstep. The atmosphere feels much heavier.', sfx: 'sfx_hallway',"
  },
  {
    search: /id: 'ct_cl_09',\s*speaker: null,\s*text: 'LOST steps out from the bleachers\. Its movements are slow, drifting aimlessly\.',\s*portrait: 'portrait_lost',/g,
    replace: "id: 'ct_cl_09', speaker: null, text: 'LOST steps out from the bleachers. Its movements are slow, drifting aimlessly.', sfx: 'sfx_heavy', portrait: 'portrait_lost',"
  }
]);

// 4. ChaseScene.js
updateFile('src/scenes/ChaseScene.js', [
  {
    search: /this\.chaseActive = true;\n/,
    replace: `this.chaseActive = true;\n
    // Start global BGM
    if (this.registry.get('currentBgmKey') !== 'bgm_chase') {
      const old = this.registry.get('currentBgmAudio');
      
      const newBgm = this.sound.add('bgm_chase', { loop: true, volume: 0 });
      newBgm.play();
      
      this.registry.set('currentBgmKey', 'bgm_chase');
      this.registry.set('currentBgmAudio', newBgm);

      if (old) {
        this.tweens.add({
          targets: old,
          volume: 0,
          duration: 1500,
          onComplete: () => { old.stop(); old.destroy(); }
        });
      }
      this.tweens.add({
        targets: newBgm,
        volume: 0.5,
        duration: 1500
      });
    }\n`
  }
]);

// 5. chase.js
updateFile('src/config/dialogues/chase.js', [
  {
    search: /id: 'chase_checkpoint_1',/,
    replace: "id: 'chase_checkpoint_1',\n    bgm: 'bgm_chase',"
  }
]);

console.log('Audio mapping 2 completed.');
