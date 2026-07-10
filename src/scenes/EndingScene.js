/**
 * EndingScene.js — Ending dispatcher
 *
 * Reads GameState.getEnding() and routes to the appropriate ending dialogue.
 * Good Ending: 50+ Aura Points → 'ending_good'
 * Bad Ending:  49 or below    → 'ending_bad'
 * After ending dialogue completes → back to TitleScene (new game).
 */

import { GameState } from '../GameState.js';

export class EndingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndingScene' });
  }

  create() {
    console.log(`[DEBUG] Final accumulated Aura right before threshold check: ${GameState.auraPoints}`);
    const ending = GameState.getEnding();
    console.log(`[EndingScene] Final Aura: ${GameState.auraPoints} → ${ending.toUpperCase()} ENDING`);

    // Route to the appropriate dialogue, which transitions back to TitleScene
    this.scene.start('DialogueScene', {
      dialogueKey: `ending_${ending}`,
      nextScene:   'TitleScene',
      nextData:    {},
    });
  }
}
