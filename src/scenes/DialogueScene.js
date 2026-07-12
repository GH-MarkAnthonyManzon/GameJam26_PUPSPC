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

    this.bg = this.add.image(W / 2, H / 2, 'bg_lab');

    this.overlayImage = this.add.image(W / 2, H / 2, 'bg_lab').setAlpha(0);
    if (this.overlayImage.postFX) {
      this.overlayImage.postFX.addBlur(2, 2, 1);
    }
    
    if (!this.textures.exists('vignette_tex')) {
      const canvas = this.textures.createCanvas('vignette_tex', W, H);
      const ctx = canvas.getContext('2d');
      const radius = Math.max(W, H) / 1.2;
      const gradient = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, radius);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.5, 'rgba(0,0,0,0.4)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
      canvas.refresh();
    }
    this.vignetteImage = this.add.image(W / 2, H / 2, 'vignette_tex').setAlpha(0);

    this.cgImage = this.add.image(W / 2, H / 2, 'bg_lab').setAlpha(0);

    const BOX_H = 140;
    const BOX_Y = H - BOX_H / 2 - 15;
    const portX = W - 90;
    
    this.add.rectangle(W / 2, BOX_Y, W - 40, BOX_H, 0x111111, 0.75).setStrokeStyle(2, 0xffffff);

    this.speakerTxt = this.add.text(45, BOX_Y - BOX_H / 2 - 12, '', FONTS.speaker_mc)
      .setOrigin(0, 0.5)
      .setStroke('#000000', 4);

    this.dialogueTxt = this.add.text(30, H - BOX_H - 5, '', FONTS.dialogue);

    this.portrait = this.add.image(W - 75, H - BOX_H / 2 - 10, 'portrait_protagonist')
      .setAlpha(0);

    this.portraitMaskGfx = this.make.graphics();
    this.portraitMaskGfx.fillStyle(0xffffff, 1);
    const portY = BOX_Y;
    this.portraitMaskGfx.fillRect(portX - 60, portY - 65, 120, 130);
    this.portrait.setMask(this.portraitMaskGfx.createGeometryMask());

    this.portraitBorder = this.add.graphics();
    this.portraitBorder.lineStyle(2, 0xffffff, 0.8); // Smooth border matching dialogue box
    this.portraitBorder.strokeRect(portX - 60, portY - 65, 120, 130);
    this.portraitBorder.setAlpha(0);

    this.characterSprite = this.add.image(W / 2, BOX_Y - BOX_H / 2, 'portrait_protagonist')
      .setOrigin(0.5, 1)
      .setAlpha(0);

    this.advanceHint = this.add.text(W - 35, BOX_Y + BOX_H / 2 - 20, '▼', {
      fontFamily: 'monospace', fontSize: '18px', color: '#ffffff',
    }).setOrigin(0.5).setStroke('#000000', 4);

    this.tweens.add({
      targets: this.advanceHint, 
      y: '+=5', 
      alpha: { getStart: () => 1, getEnd: () => 0.2 }, 
      duration: 600, 
      yoyo: true, 
      repeat: -1, 
      ease: 'Sine.easeInOut',
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

    this.fadeOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0)
      .setDepth(9999)
      .setAlpha(0);

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

    // Custom Cinematic Transitions
    if (step.id === 'p_1_12') {
      this.canAdvance = false;
      this.tweens.add({
        targets: this.fadeOverlay,
        alpha: 1,
        duration: 400,
        onComplete: () => {
          this.time.delayedCall(200, () => {
            this.canAdvance = true;
            this.advance();
          });
        }
      });
      return; // Wait for transition to complete
    }

    if (step.id === 'p_2_01') {
      this.tweens.add({
        targets: this.fadeOverlay,
        alpha: 0,
        duration: 400
      });
    }

    if (step.id === 'qb1_01') {
      this.tweens.add({
        targets: this.fadeOverlay,
        alpha: 0.45,
        duration: 250
      });
    }

    if (step.id === 'qb1_10') {
      this.tweens.add({
        targets: this.fadeOverlay,
        alpha: 0,
        duration: 400
      });
    }

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


    this.canAdvance = false;
    this.choicesActive = false;
    this.currentChoices = step.choices || null;
    this.clearChoices();

    this.overlayImage.setAlpha(0);
    this.cgImage.setAlpha(0);
    this.bg.clearTint();

    if (step.background) {
      this.bg.setTexture(step.background);
    }
    const bgScale = Math.max(W / this.bg.width, H / this.bg.height);
    this.bg.setScale(bgScale).setPosition(W / 2, H / 2);

    if (step.mood === 'night') {
      this.bg.setTint(0x1a2b4c);
    }

    if (step.overlay) {
      this.overlayImage.setTexture(step.overlay).setAlpha(0.8);
      const ovScale = Math.max(W / this.overlayImage.width, H / this.overlayImage.height);
      this.overlayImage.setScale(ovScale).setPosition(W / 2, H / 2).setTint(0x222222);
    }

    if (step.cg) {
      this.cgImage.setTexture(step.cg).setAlpha(1);
      const cgScale = Math.min(W / this.cgImage.width, H / this.cgImage.height);
      this.cgImage.setScale(cgScale).setPosition(W / 2, H / 2);
      
      if (this.vignetteImage.alpha === 0) {
        this.tweens.add({ targets: this.vignetteImage, alpha: 1, duration: 250, ease: 'Sine.easeOut' });
      }
    } else {
      if (this.vignetteImage.alpha > 0) {
        this.tweens.add({ targets: this.vignetteImage, alpha: 0, duration: 250, ease: 'Sine.easeIn' });
      }
    }

    if (step.speaker) {
      const isMC = step.speaker === 'Protagonist' || step.speaker === 'MC';
      this.speakerTxt.setText(step.speaker).setVisible(true).setStyle(isMC ? FONTS.speaker_mc : FONTS.speaker_entity);
      this.dialogueTxt.setStyle(FONTS.dialogue);
    } else {
      this.speakerTxt.setVisible(false);
      this.dialogueTxt.setStyle(FONTS.narration);
    }

    // Fix word wrap so text doesn't bleed into portrait
    const maxTextWidth = step.portrait ? W - 200 : W - 80;
    this.dialogueTxt.setWordWrapWidth(maxTextWidth);

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
      this.portrait.setTexture(step.portrait);
      
      // Dynamically scale image so its height is ~2.2x the portrait box (130px)
      // This guarantees a tight, readable face crop regardless of native PNG resolution
      const baseScale = (130 * 2.2) / this.portrait.height;
      const defaultOffsetX = 0;
      const defaultOffsetY = 20; // Push down slightly to keep hair in frame

      const finalScale = step.portraitScale ? baseScale * step.portraitScale : baseScale;
      // Note: checking !== undefined allows explicitly passing 0
      const finalOffsetX = step.portraitOffsetX !== undefined ? step.portraitOffsetX : defaultOffsetX;
      const finalOffsetY = step.portraitOffsetY !== undefined ? step.portraitOffsetY : defaultOffsetY;

      const BOX_H = 140;
      const portX = W - 90;
      const portY = H - BOX_H / 2 - 15;

      this.portrait.setPosition(portX + finalOffsetX, portY + finalOffsetY);
      this.portrait.setScale(finalScale).setAlpha(1);
      this.portraitBorder.setAlpha(1);
    } else {
      this.portrait.setAlpha(0);
      this.portraitBorder.setAlpha(0);
    }
    
    // Keep arrow in the bottom right corner, but adjust slightly if portrait border is present
    this.advanceHint.setDepth(20);
    this.advanceHint.setX(step.portrait ? W - 45 : W - 35);

    if (step.sprite) {
      this.characterSprite.setTexture(step.sprite);
      
      // Scale uniformly based on available vertical space
      const BOX_H = 140;
      const BOX_Y = H - BOX_H / 2 - 15;
      const availableHeight = (H - BOX_H) * 0.85; 
      const baseScale = availableHeight / this.characterSprite.height;
      
      const finalScale = step.spriteScale ? baseScale * step.spriteScale : baseScale;
      const offsetX = step.spriteOffsetX || 0;
      const offsetY = step.spriteOffsetY || 0;

      // Position sprite resting exactly on the dialogue box (original design)
      this.characterSprite.setPosition(W / 2 + offsetX, BOX_Y - BOX_H / 2 + offsetY);
      this.characterSprite.setScale(finalScale).setAlpha(1);
    } else {
      this.characterSprite.setAlpha(0);
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
