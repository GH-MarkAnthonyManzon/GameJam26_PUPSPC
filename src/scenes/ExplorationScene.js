/**
 * ExplorationScene.js — Generic click-hotspot exploration scene
 *
 * Config-driven: receives { routeKey, phase } and looks up the matching
 * phase config from EXPLORATIONS registry. No location-specific logic here.
 *
 * Flow per phase:
 *  1. Render background + floating hotspot buttons
 *  2. Player clicks hotspots → inline popup shows internal monologue
 *  3. After requiredClicks hotspots visited → CONTINUE button appears
 *  4. CONTINUE → transitions per onComplete config (DialogueScene or MiniGameScene)
 *
 * Hotspot dialogues rendered as inline popup (no scene switch) to preserve state.
 */

import { EXPLORATIONS } from '../config/explorations/index.js';

const POPUP_H = 160;

export class ExplorationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ExplorationScene' });
  }

  init(data) {
    const routeConfig = EXPLORATIONS[data.routeKey];
    this.routeConfig  = routeConfig;
    this.phaseConfig  = routeConfig.phases[data.phase];
    this.background   = routeConfig.background;
    this.routeLabel   = routeConfig.label;
    this.visitedCount = 0;
    this.popupActive  = false;
    this.popupSteps   = [];
    this.popupIndex   = 0;
    this.currentHotspotId = null;
  }

  create() {
    const { width: W, height: H } = this.scale;

    // ── Background ───────────────────────────────────────────────────────
    this.bgImage = this.add.image(W / 2, H / 2, this.background).setDisplaySize(W, H);
    
    // ── Slice Texture Frames (if configured) ─────────────────────────────
    this.phaseConfig.hotspots.forEach(hs => {
      if (hs.texture && hs.frameRect) {
        const tex = this.textures.get(hs.texture);
        if (tex && !tex.has(hs.id)) {
          tex.add(hs.id, 0, hs.frameRect.x, hs.frameRect.y, hs.frameRect.w, hs.frameRect.h);
        }
      }
    });

    // Atmospheric dark overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.35);

    // ── Location label (top-left) ────────────────────────────────────────
    this.add.text(20, 16, this.routeLabel.toUpperCase(), {
      fontFamily: '"Courier New", monospace',
      fontSize: '11px',
      color: '#444444',
      letterSpacing: 3,
    });

    // ── Exploration prompt ───────────────────────────────────────────────
    this.hintText = this.add.text(W / 2, H - 240, 'Investigate the area. Click on objects.', {
      fontFamily: 'Georgia, serif',
      fontSize: '13px',
      color: '#444444',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // ── Hotspot buttons ──────────────────────────────────────────────────
    this.hotspotBtns = [];
    this.visitedMap  = {};
    this.phaseConfig.hotspots.forEach(hs => {
      this.createHotspot(hs);
    });

    // ── CONTINUE button (hidden until requiredClicks met) ─────────────────
    // Placed top-right to avoid overlapping any hotspots
    this.continueBtn = this.add.container(W - 140, 60);

    const contBg = this.add.rectangle(0, 0, 200, 44, 0x1a1a1a, 1)
      .setStrokeStyle(1, 0x555555)
      .setInteractive({ useHandCursor: true });
    const contTxt = this.add.text(0, 0, 'CONTINUE  ›', {
      fontFamily: '"Courier New", monospace',
      fontSize: '14px',
      color: '#888888',
      letterSpacing: 2,
    }).setOrigin(0.5);

    contBg.on('pointerover', () => {
      contBg.setStrokeStyle(1, 0xaaaaaa);
      contTxt.setColor('#cccccc');
    });
    contBg.on('pointerout', () => {
      contBg.setStrokeStyle(1, 0x555555);
      contTxt.setColor('#888888');
    });
    contBg.on('pointerdown', () => this.onContinue());

    this.continueBtn.add([contBg, contTxt]);
    this.continueBtn.setVisible(false);

    // FIX: If phase has 0 hotspots, show CONTINUE immediately so player isn't trapped
    if (this.phaseConfig.hotspots.length === 0) {
      this.time.delayedCall(200, () => {
        this.continueBtn.setVisible(true);
        this.tweens.add({ targets: this.continueBtn, alpha: { from: 0, to: 1 }, duration: 400 });
      });
    }

    // ── Inline dialogue popup ────────────────────────────────────────────
    this.buildPopup(W, H);

    // Fade in
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }

  // ── Hotspot creation ────────────────────────────────────────────────────
  createHotspot(hs) {
    const { x, y, w, h, color, label, dialogueData, id, texture, visual } = hs;

    let bg;
    if (texture) {
      bg = this.add.image(x, y, texture, id)
        .setInteractive({ useHandCursor: true });
      if (visual) {
        if (visual.scale !== undefined) bg.setScale(visual.scale);
        if (visual.offsetX !== undefined) bg.x += visual.offsetX;
        if (visual.offsetY !== undefined) bg.y += visual.offsetY;
        if (visual.rotation !== undefined) bg.setRotation(visual.rotation);
      }
    } else {
      bg = this.add.rectangle(x, y, w, h, color, 0.7)
        .setStrokeStyle(1, 0x888888)
        .setInteractive({ useHandCursor: true });
    }

    const lbl = this.add.text(x, y + h / 2 + 10, label, {
      fontFamily: '"Courier New", monospace',
      fontSize: '10px',
      color: '#777777',
      letterSpacing: 1,
    }).setOrigin(0.5, 0);

    // Gentle pulse while unvisited
    const pulse = this.tweens.add({
      targets: bg,
      alpha: 0.5,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    bg.on('pointerover', () => {
      if (texture) bg.setTint(0xffffff);
      else bg.setStrokeStyle(1, 0xffffff);
    });
    bg.on('pointerout', () => {
      if (texture) bg.clearTint();
      else bg.setStrokeStyle(1, 0x888888);
    });

    bg.on('pointerdown', () => {
      if (this.popupActive) return;

      // Only count as 'visited' the first time
      if (!this.visitedMap[id]) {
        this.visitedMap[id] = true;
        this.visitedCount++;

        // Dim visited hotspot
        if (texture) {
          bg.setTint(0x888888);
          bg.setAlpha(0.6);
        } else {
          bg.setFillStyle(color, 0.3).setStrokeStyle(1, 0x444444);
          bg.setAlpha(0.3);
        }
        lbl.setColor('#444444');
        pulse.stop();

        // Reveal CONTINUE when ALL hotspots in the phase are clicked
        if (this.visitedCount >= this.phaseConfig.hotspots.length) {
          this.time.delayedCall(200, () => {
            this.continueBtn.setVisible(true);
            this.tweens.add({ targets: this.continueBtn, alpha: { from: 0, to: 1 }, duration: 400 });
          });
        }
      }

      // Show inline monologue (always possible, even if previously visited)
      this.showPopup(dialogueData);
    });

    this.hotspotBtns.push(bg);
    this.visitedMap[id] = false;
  }

  // ── Inline popup ─────────────────────────────────────────────────────────
  buildPopup(W, H) {
    this.popup = this.add.container(0, H - POPUP_H);
    this.popup.setVisible(false);

    const popupBg = this.add.rectangle(W / 2, POPUP_H / 2, W - 20, POPUP_H - 10, 0x111111, 0.75)
      .setStrokeStyle(2, 0xffffff);
    this.popupSpeaker = this.add.text(30, 12, '', {
      fontFamily: 'Georgia, serif', fontSize: '13px', color: '#a29bfe',
    });
    this.popupText = this.add.text(30, 36, '', {
      fontFamily: 'Georgia, serif', fontSize: '17px', color: '#ffffff',
      wordWrap: { width: W - 80 }, lineSpacing: 5,
    });
    this.popupHint = this.add.text(W - 30, POPUP_H - 20, '▼', {
      fontFamily: 'monospace', fontSize: '13px', color: '#444444',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.popupHint, y: POPUP_H - 15, alpha: 0.3, duration: 500, yoyo: true, repeat: -1,
    });

    this.popup.add([popupBg, this.popupSpeaker, this.popupText, this.popupHint]);

    this.choicesActive = false;
    this.choiceTexts = [];
    this.selectedIndex = 0;
    this.currentChoices = null;

    // Click popup to advance
    this.input.on('pointerdown', () => {
      if (!this.popupActive || this.choicesActive) return;
      if (this.lastPopupOpenTime === this.time.now) return;
      
      this.popupIndex++;
      this.showPopupStep(this.popupIndex);
    });

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
    this.input.keyboard.on('keydown-ENTER', () => this.confirmSelection());
    this.input.keyboard.on('keydown-SPACE', () => this.confirmSelection());
  }

  showPopup(steps) {
    this.popupActive = true;
    this.lastPopupOpenTime = this.time.now;
    this.popupSteps  = [...steps]; // shallow copy to prevent permanent mutations
    this.popupIndex  = 0;
    this.popup.setVisible(true);
    this.hintText.setVisible(false);
    
    // Optional background blur
    if (this.routeConfig.blurIntensity) {
      if (!this.bgBlur) this.bgBlur = this.bgImage.postFX.addBlur(0, 0, 0);
      this.tweens.add({
        targets: this.bgBlur,
        strength: this.routeConfig.blurIntensity,
        duration: 300,
        ease: 'Sine.easeOut'
      });
    }
    
    this.showPopupStep(0);
  }

  showPopupStep(index) {
    if (index >= this.popupSteps.length) {
      this.hidePopup();
      return;
    }
    const step = this.popupSteps[index];
    this.popupSpeaker.setText(step.speaker || '');
    this.popupText.setText(step.text);

    this.clearChoices();
    if (step.choices) {
      this.showChoices(step.choices);
    }
  }

  showChoices(choices) {
    this.choicesActive = true;
    this.currentChoices = choices;
    this.selectedIndex = 0;
    this.popupHint.setVisible(false);

    const { width: W } = this.scale;
    const startY = 80;
    const spacing = 35;

    choices.forEach((choice, idx) => {
      const txt = this.add.text(W / 2, startY + (idx * spacing), choice.text, {
        fontFamily: 'Georgia, serif', fontSize: '15px', color: '#dddddd', backgroundColor: '#00000088', padding: { x: 8, y: 4 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      txt.on('pointerover', () => { this.selectedIndex = idx; this.updateSelection(); });
      txt.on('pointerdown', (pointer, localX, localY, event) => {
        event.stopPropagation();
        this.selectedIndex = idx;
        this.confirmSelection();
      });

      this.popup.add(txt);
      this.choiceTexts.push(txt);
    });

    this.updateSelection();
  }

  updateSelection() {
    this.choiceTexts.forEach((txt, idx) => {
      if (idx === this.selectedIndex) {
        txt.setText(`> ${this.currentChoices[idx].text} <`);
        txt.setStyle({ color: '#f1c40f', fontStyle: 'bold', backgroundColor: '#000000cc' });
      } else {
        txt.setText(this.currentChoices[idx].text);
        txt.setStyle({ color: '#dddddd', fontStyle: 'normal', backgroundColor: '#00000088' });
      }
    });
  }

  confirmSelection() {
    if (!this.choicesActive) return;
    this.choicesActive = false;
    const choice = this.currentChoices[this.selectedIndex];
    this.clearChoices();
    this.popupHint.setVisible(true);

    if (choice.nextSteps) {
      // Inline branch: insert the chosen steps right after the current one
      this.popupSteps.splice(this.popupIndex + 1, 0, ...choice.nextSteps);
    }
    this.popupIndex++;
    this.showPopupStep(this.popupIndex);
  }

  clearChoices() {
    this.choicesActive = false;
    this.currentChoices = null;
    this.choiceTexts.forEach(txt => txt.destroy());
    this.choiceTexts = [];
  }

  hidePopup() {
    this.popupActive = false;
    this.popup.setVisible(false);
    this.hintText.setVisible(true);
    this.clearChoices();
    
    if (this.bgBlur) {
      this.tweens.add({
        targets: this.bgBlur,
        strength: 0,
        duration: 300,
        ease: 'Sine.easeIn',
        onComplete: () => {
          this.bgImage.postFX.remove(this.bgBlur);
          this.bgBlur = null;
        }
      });
    }
  }

  // ── CONTINUE transition ───────────────────────────────────────────────────
  onContinue() {
    if (this.popupActive) return;
    const { nextScene, nextData } = this.phaseConfig.onComplete;
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(nextScene, nextData);
    });
  }
}
