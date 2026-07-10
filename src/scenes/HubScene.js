/**
 * HubScene.js — Campus map location picker
 *
 * Shows 3 route buttons. Player picks ONE and plays it fully to ending.
 * No return to hub after completing a route — ending goes directly to TitleScene.
 * Stores the chosen route in GameState.chosenRoute.
 */

import { GameState } from '../GameState.js';

const ROUTES = [
  {
    key: 'quadrangle',
    label: 'Quadrangle',
    sublabel: 'Theme: Academic Burnout',
    color: 0x2d6a4f,
    hoverColor: 0x40916c,
  },
  {
    key: 'newbuilding',
    label: 'New Building',
    sublabel: 'Theme: Fear of the Future',
    color: 0x1e3a5f,
    hoverColor: 0x2e5e9f,
    introDialogue: 'newbuilding_intro',
  },
  {
    key: 'court',
    label: 'Court',
    sublabel: 'Theme: Losing Yourself',
    color: 0x5c1b1b,
    hoverColor: 0x8b2c2c,
  },
];

const FONTS = {
  speaker_mc: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f1c40f', fontStyle: 'bold' },
  dialogue: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#ffffff', wordWrap: { width: 560 }, lineSpacing: 6 },
  choice: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#aaaaaa' },
  choice_selected: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#f1c40f', fontStyle: 'bold' },
};

export class HubScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HubScene' });
  }

  create() {
    const { width: W, height: H } = this.scale;

    // Background (Placeholder for map later)
    this.add.image(W / 2, H / 2, 'bg_hub').setDisplaySize(W, H);
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.4);

    // ── Dialogue UI (matching DialogueScene) ──────────────────────────────
    const BOX_H = 140;
    const BOX_Y = H - BOX_H / 2 - 15;
    this.add.rectangle(W / 2, BOX_Y, W - 40, BOX_H, 0x111111, 0.75)
      .setStrokeStyle(2, 0xffffff);

    this.speakerTxt = this.add.text(45, BOX_Y - BOX_H / 2 - 12, 'MC', FONTS.speaker_mc)
      .setOrigin(0, 0.5)
      .setStroke('#000000', 4);

    this.dialogueTxt = this.add.text(30, H - BOX_H - 5, '', FONTS.dialogue);

    this.choicesActive = false;
    this.selectedIndex = 0;
    this.choiceTexts = [];
    this.fullText = "Where should I go?";

    // Typewriter effect for question
    let charIndex = 0;
    this.typewriterTimer = this.time.addEvent({
      delay: 30,
      repeat: this.fullText.length - 1,
      callback: () => {
        charIndex++;
        this.dialogueTxt.setText(this.fullText.substring(0, charIndex));
        if (charIndex === this.fullText.length) {
          this.showChoices();
        }
      }
    });

    // Skip typing on click
    this.input.on('pointerdown', () => {
      if (!this.choicesActive) {
        this.typewriterTimer.remove();
        this.dialogueTxt.setText(this.fullText);
        this.showChoices();
      }
    });

    // Fade in
    this.cameras.main.fadeIn(600, 0, 0, 0);
  }

  showChoices() {
    if (this.choicesActive) return;
    this.choicesActive = true;

    const { height: H } = this.scale;
    const startY = H - 105;
    const spacing = 30;

    ROUTES.forEach((route, idx) => {
      const txt = this.add.text(60, startY + (idx * spacing), route.label, FONTS.choice)
        .setInteractive({ useHandCursor: true })
        .setAlpha(0);

      this.tweens.add({ targets: txt, alpha: 1, duration: 300, delay: idx * 100 });

      txt.on('pointerover', () => {
        this.selectedIndex = idx;
        this.updateSelection();
      });

      txt.on('pointerdown', () => {
        this.selectedIndex = idx;
        this.confirmSelection();
      });

      this.choiceTexts.push(txt);
    });

    this.updateSelection();

    // Keyboard navigation
    this.input.keyboard.on('keydown-UP', () => {
      if (!this.choicesActive) return;
      this.selectedIndex = (this.selectedIndex - 1 + ROUTES.length) % ROUTES.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.choicesActive) return;
      this.selectedIndex = (this.selectedIndex + 1) % ROUTES.length;
      this.updateSelection();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      if (!this.choicesActive) return;
      this.confirmSelection();
    });
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.choicesActive) return;
      this.confirmSelection();
    });
  }

  updateSelection() {
    this.choiceTexts.forEach((txt, idx) => {
      if (idx === this.selectedIndex) {
        txt.setText(`> ${ROUTES[idx].label} — ${ROUTES[idx].sublabel}`);
        txt.setStyle(FONTS.choice_selected);
      } else {
        txt.setText(`  ${ROUTES[idx].label}`);
        txt.setStyle(FONTS.choice);
      }
    });
  }

  confirmSelection() {
    if (!this.choicesActive) return;
    this.choicesActive = false; // lock
    
    // Disable inputs
    this.input.keyboard.off('keydown-UP');
    this.input.keyboard.off('keydown-DOWN');
    this.input.keyboard.off('keydown-ENTER');
    this.input.keyboard.off('keydown-SPACE');

    const route = ROUTES[this.selectedIndex];
    GameState.chosenRoute = route.key;

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (route.introDialogue) {
        this.scene.start('DialogueScene', {
          dialogueKey: route.introDialogue,
          nextScene: 'ExplorationScene',
          nextData: { routeKey: route.key, phase: 0 },
        });
      } else {
        this.scene.start('ExplorationScene', { routeKey: route.key, phase: 0 });
      }
    });
  }
}
