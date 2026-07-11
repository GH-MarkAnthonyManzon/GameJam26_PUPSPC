/**
 * TitleScene.js — Game title screen
 * Resets GameState on each visit (new game).
 * Click anywhere → Prologue (DialogueScene).
 */

import { GameState } from '../GameState.js';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    const { width: W, height: H } = this.scale;

    // Reset state for every new run
    GameState.reset();

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
    }

    // Background
    this.add.image(W / 2, H / 2, 'bg_lab').setDisplaySize(W, H);

    // Dark vignette overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.55);

    // ── Title text ──────────────────────────────────────────────────────
    this.add.text(W / 2, H / 2 - 80, 'NINTENDOGS', {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '52px',
      color: '#ffffff',
      letterSpacing: 10,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(W / 2, H / 2 - 20, 'A Horror Visual Novel', {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '16px',
      color: '#888888',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Thin separator line
    const line = this.add.rectangle(W / 2, H / 2 + 15, 200, 1, 0x444444, 1);

    // ── Blinking prompt ─────────────────────────────────────────────────
    const prompt = this.add.text(W / 2, H / 2 + 60, 'CLICK ANYWHERE TO BEGIN', {
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '13px',
      color: '#555555',
      letterSpacing: 3,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.1,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // ── Atmospheric slow flicker on title ───────────────────────────────
    const titleText = this.children.list.find(c => c.text === 'NINTENDOGS');
    if (titleText) {
      this.tweens.add({
        targets: titleText,
        alpha: 0.85,
        duration: 2500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // ── Start on click ──────────────────────────────────────────────────
    this.input.once('pointerdown', () => {
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('DialogueScene', {
          dialogueKey: 'prologue',
          nextScene: 'HubScene',
          nextData: {},
        });
      });
    });

    // Also support keyboard (Enter / Space)
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());

    // Fade in
    this.cameras.main.fadeIn(800, 0, 0, 0);
  }

  startGame() {
    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('DialogueScene', {
        dialogueKey: 'prologue',
        nextScene: 'HubScene',
        nextData: {},
      });
    });
  }
}
