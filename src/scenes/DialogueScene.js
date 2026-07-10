/**
 * DialogueScene.js — Generic dialogue renderer
 *
 * Accepts any dialogue array (from DIALOGUES registry or directly).
 * Click/Space to advance. No hardcoded story content — all data-driven.
 *
 * Init data:
 *   dialogueKey:  string key into DIALOGUES registry (optional if dialogueData provided)
 *   dialogueData: array of steps (optional if dialogueKey provided)
 *   nextScene:    scene key to start when dialogue ends
 *   nextData:     data object to pass to nextScene
 *
 * Step format: { id, speaker, text, portrait, background }
 *   speaker:    null = narration (italic, no nameplate)
 *   portrait:   null = hide portrait
 *   background: null = keep current background; string = switch to texture key
 */

import { DIALOGUES } from '../config/dialogues/index.js';

const FONTS = {
  speaker_mc: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f1c40f', fontStyle: 'bold' },
  speaker_entity: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#ff7675', fontStyle: 'bold' },
  dialogue: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#ffffff', wordWrap: { width: 560 }, lineSpacing: 6 },
  narration: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#aaaaaa', fontStyle: 'italic', wordWrap: { width: 640 }, lineSpacing: 6 },
  choice: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#dddddd', backgroundColor: '#00000088', padding: { x: 10, y: 5 } },
  choice_selected: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f1c40f', fontStyle: 'bold', backgroundColor: '#000000cc', padding: { x: 10, y: 5 } },
};

export class DialogueScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DialogueScene' });
  }

  init(data) {
    this.steps = [...(data.dialogueData || DIALOGUES[data.dialogueKey] || [])];
    this.nextScene = data.nextScene || 'HubScene';
    this.nextData  = data.nextData  || {};
    this.index = 0;
    this.canAdvance = false;
    this.isTyping = false;
    this.fullText = '';
    this.typewriterTimer = null;

    this.choicesActive = false;
    this.selectedIndex = 0;
    this.choiceTexts = [];
    this.currentChoices = null;
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, 'bg_lab').setDisplaySize(W, H);

    const BOX_H = 140;
    const BOX_Y = H - BOX_H / 2 - 15;
    this.add.rectangle(W / 2, BOX_Y, W - 40, BOX_H, 0x111111, 0.75).setStrokeStyle(2, 0xffffff);

    this.speakerTxt = this.add.text(45, BOX_Y - BOX_H / 2 - 12, '', FONTS.speaker_mc)
      .setOrigin(0, 0.5)
      .setStroke('#000000', 4);

    this.dialogueTxt = this.add.text(30, H - BOX_H - 5, '', FONTS.dialogue);

    this.portrait = this.add.image(W - 75, H - BOX_H / 2 - 10, 'portrait_protagonist')
      .setDisplaySize(100, 125)
      .setAlpha(0);

    this.advanceHint = this.add.text(W - 28, H - 18, '▼', {
      fontFamily: 'monospace', fontSize: '14px', color: '#555555',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.advanceHint, y: H - 13, alpha: 0.3, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });

    this.flashOverlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0).setDepth(10);

    this.input.on('pointerdown', () => this.advance());
    this.input.keyboard.on('keydown-SPACE', () => this.advance());
    this.input.keyboard.on('keydown-ENTER', () => this.advance());

    // Keyboard navigation for choices
    this.input.keyboard.on('keydown-UP', () => {
      if (!this.choicesActive) return;
      this.selectedIndex = (this.selectedIndex - 1 + this.currentChoices.length) % this.currentChoices.length;
      this.updateSelection();
    });
    this.input.keyboard.on('keydown-DOWN', () => {
      if (!this.choicesActive) return;
      this.selectedIndex = (this.selectedIndex + 1) % this.currentChoices.length;
      this.updateSelection();
    });

    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.showStep(0);
  }

  showStep(index) {
    if (index >= this.steps.length) {
      this.endDialogue();
      return;
    }

    const { width: W, height: H } = this.scale;
    const step = this.steps[index];

    this.canAdvance = false;
    this.choicesActive = false;
    this.currentChoices = step.choices || null;
    this.clearChoices();

    if (step.background) {
      this.bg.setTexture(step.background).setDisplaySize(W, H);
    }

    if (step.speaker) {
      const isMC = step.speaker === 'Protagonist' || step.speaker === 'MC';
      this.speakerTxt.setText(step.speaker).setVisible(true).setStyle(isMC ? FONTS.speaker_mc : FONTS.speaker_entity);
      this.dialogueTxt.setStyle(FONTS.dialogue);
    } else {
      this.speakerTxt.setVisible(false);
      this.dialogueTxt.setStyle(FONTS.narration);
    }

    this.fullText = step.text;
    this.dialogueTxt.setText('');
    this.isTyping = true;
    
    let charIndex = 0;
    if (this.typewriterTimer) this.typewriterTimer.remove();
    this.typewriterTimer = this.time.addEvent({
      delay: 30,
      repeat: this.fullText.length - 1,
      callback: () => {
        charIndex++;
        this.dialogueTxt.setText(this.fullText.substring(0, charIndex));
        if (charIndex === this.fullText.length) {
          this.isTyping = false;
          this.checkShowChoices();
        }
      }
    });

    if (step.portrait) {
      this.portrait.setTexture(step.portrait).setDisplaySize(100, 125).setAlpha(1);
    } else {
      this.portrait.setAlpha(0);
    }

    this.time.delayedCall(200, () => { this.canAdvance = true; });
  }

  advance() {
    if (!this.canAdvance || this.choicesActive) return;
    
    if (this.isTyping) {
      if (this.typewriterTimer) this.typewriterTimer.remove();
      this.dialogueTxt.setText(this.fullText);
      this.isTyping = false;
      this.checkShowChoices();
      return;
    }
    
    // Only advance if there are no choices pending
    if (!this.currentChoices) {
      this.index++;
      this.showStep(this.index);
    }
  }

  checkShowChoices() {
    if (this.currentChoices) {
      this.showChoices(this.currentChoices);
    }
  }

  showChoices(choices) {
    if (this.choicesActive) return;
    this.choicesActive = true;
    this.selectedIndex = 0;

    const { width: W, height: H } = this.scale;
    const startY = H / 2 - (choices.length * 25);
    const spacing = 50;

    choices.forEach((choice, idx) => {
      const txt = this.add.text(W / 2, startY + (idx * spacing), choice.text, FONTS.choice)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setAlpha(0);

      this.tweens.add({ targets: txt, alpha: 1, duration: 300, delay: idx * 100 });

      txt.on('pointerover', () => {
        this.selectedIndex = idx;
        this.updateSelection();
      });

      txt.on('pointerdown', (pointer, localX, localY, event) => {
        event.stopPropagation();
        this.selectedIndex = idx;
        this.confirmSelection();
      });

      this.choiceTexts.push(txt);
    });

    this.updateSelection();
  }

  updateSelection() {
    this.choiceTexts.forEach((txt, idx) => {
      if (idx === this.selectedIndex) {
        txt.setText(`> ${this.currentChoices[idx].text} <`);
        txt.setStyle(FONTS.choice_selected);
      } else {
        txt.setText(this.currentChoices[idx].text);
        txt.setStyle(FONTS.choice);
      }
    });
  }

  confirmSelection() {
    if (!this.choicesActive) return;
    this.choicesActive = false;
    
    const choice = this.currentChoices[this.selectedIndex];
    this.clearChoices();

    if (choice.nextKey) {
      this.steps = DIALOGUES[choice.nextKey];
      this.index = 0;
      this.showStep(0);
    } else if (choice.nextSteps) {
      this.steps.splice(this.index + 1, 0, ...choice.nextSteps);
      this.index++;
      this.showStep(this.index);
    } else {
      // Just advance inline if no branch specified
      this.index++;
      this.showStep(this.index);
    }
  }

  clearChoices() {
    this.choiceTexts.forEach(txt => txt.destroy());
    this.choiceTexts = [];
  }

  endDialogue() {
    this.canAdvance = false;
    this.input.off('pointerdown');
    this.input.keyboard.removeAllListeners();

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(this.nextScene, this.nextData);
    });
  }
}
