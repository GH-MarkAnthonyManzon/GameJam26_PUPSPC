/**
 * MiniGameScene.js — Generic mini-game engine
 *
 * Reads config.type to activate the correct sub-renderer:
 *   PUSH_THROUGH      — Energy bar, click button to restore, 20s timer
 *   DISMISS_THOUGHTS  — Click thought bubbles before 5 accumulate, 20s timer
 *   HALLWAY_OF_DOORS  — 8 sequential doors, Certainty bar, open/ignore
 *   INVITATION_CARDS  — 8 sequential cards, 3 meters, engage/skip
 *
 * Shared framework:
 *   - Aura evaluation at end (config.aura thresholds)
 *   - GameState.recordRating() called with result
 *   - endMiniGame(outcomeKey) hands off to DialogueScene or next scene
 *   - No retry/fail states — story always continues
 *
 * Design rule: no location-specific logic in this file.
 * All variation lives in config objects (config/ folder).
 */

import { GameState } from '../GameState.js';
import { MINIGAME_CONFIGS } from '../config/minigames/index.js';

export class MiniGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MiniGameScene' });
  }

  init(data) {
    this.config = data.config || MINIGAME_CONFIGS[data.configKey];
    // Runtime stats — type-specific, populated by each sub-renderer
    this.stats  = {};
    this.gameActive = false;
  }

  create() {
    const { width: W, height: H } = this.scale;

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
    }

    // Dark overlay background for all mini-games
    if (this.config.background) {
      const bgImg = this.add.image(W / 2, H / 2, this.config.background);
      const bgScale = Math.max(W / bgImg.width, H / bgImg.height);
      bgImg.setScale(bgScale);
      this.add.rectangle(W / 2, H / 2, W, H, 0x050510, 0.35);
    } else {
      this.add.rectangle(W / 2, H / 2, W, H, 0x050510, 1);
    }

    // Mini-game label (top-left, subtle)
    this.add.text(16, 12, `[ ${this.config.label.toUpperCase()} ]`, {
      fontFamily: '"Courier New", monospace',
      fontSize: '16px',
      color: '#aaaaaa',
      letterSpacing: 2,
    });

    // Dispatch to the right sub-renderer
    switch (this.config.type) {
      case 'PUSH_THROUGH':
        this.setupPushThrough();
        break;
      case 'DISMISS_THOUGHTS':
        this.setupDismissThoughts();
        break;
      case 'HALLWAY_OF_DOORS':
        this.setupHallwayOfDoors();
        break;
      case 'INVITATION_CARDS':
        this.setupInvitationCards();
        break;
      default:
        console.error(`[MiniGameScene] Unknown type: ${this.config.type}`);
    }

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUSH THROUGH
  // ═══════════════════════════════════════════════════════════════════════════
  setupPushThrough() {
    const { width: W, height: H } = this.scale;
    const cfg = this.config;

    // Runtime state
    this.energy    = cfg.startEnergy;
    this.stats     = { minEnergy: cfg.startEnergy, failed: false };
    this.lastClick = 0;
    this.spamFlag  = false;
    this.gameActive = true;

    // ── Energy bar ──────────────────────────────────────────────────────
    const barW = W - 80;
    this.add.rectangle(W / 2, 40, barW, 22, 0x222222, 1).setStrokeStyle(1, 0x444444);
    this.energyBarFill = this.add.rectangle(40 + barW / 2, 40, barW, 22, 0x27ae60, 1);
    this.energyBarFill.setOrigin(0, 0.5);
    this.energyBarFill.x = 40;

    this.add.text(W / 2, 40, '', { fontFamily: 'monospace', fontSize: '14px', color: '#cccccc' })
      .setOrigin(0.5)
      .setDepth(2);

    // ── Timer display ────────────────────────────────────────────────────
    this.timerTxt = this.add.text(W / 2, 80, `${cfg.duration}s`, {
      fontFamily: '"Courier New", monospace',
      fontSize: '22px',
      color: '#cccccc',
    }).setOrigin(0.5);

    // ── Intrusive thought overlay ────────────────────────────────────────
    this.thoughtTxt = this.add.text(W / 2, H / 2 - 60, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#ff9999',
      fontStyle: 'italic',
      align: 'center',
    }).setOrigin(0.5).setAlpha(0).setDepth(5);

    // ── Screen darkening overlay (energy-linked) ──────────────────────────
    this.darkOverlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0)
      .setDepth(4);

    // ── PUSH THROUGH button ──────────────────────────────────────────────
    const btnBg = this.add.rectangle(W / 2, H / 2 + 60, 260, 60, 0x27ae60, 1)
      .setStrokeStyle(2, 0x2ecc71)
      .setInteractive({ useHandCursor: true })
      .setDepth(6);
    const btnTxt = this.add.text(W / 2, H / 2 + 60, 'PUSH THROUGH', {
      fontFamily: '"Courier New", monospace',
      fontSize: '22px',
      color: '#ffffff',
      letterSpacing: 2,
    }).setOrigin(0.5).setDepth(7);

    btnBg.on('pointerdown', () => this.handlePushThroughClick(btnBg, btnTxt));
    btnBg.on('pointerover', () => btnBg.setFillStyle(0x2ecc71));
    btnBg.on('pointerout',  () => btnBg.setFillStyle(0x27ae60));

    // ── Timer countdown ──────────────────────────────────────────────────
    // Also tracks elapsed seconds so the drain callback can read time-remaining
    this.elapsedSeconds = 0;
    let elapsed = 0;
    this.countdown = this.time.addEvent({
      delay: 1000,
      repeat: cfg.duration - 1,
      callback: () => {
        elapsed++;
        this.elapsedSeconds = elapsed;
        const remaining = cfg.duration - elapsed;
        this.timerTxt.setText(`${remaining}s`);
        if (remaining <= 0) this.endPushThrough();
      },
    });

    // ── Energy drain (escalating rate) ───────────────────────────────────
    // Drain multiplier tiers keyed by seconds-remaining thresholds:
    //   20-15s remaining: 1.0× | 15-13s: 1.5× | 13-10s: 2.0×
    //   10-5s remaining:  2.5× | 5-0s:   3.0×
    // Smooth lerp between adjacent tiers to avoid hard snaps.
    const drainTiers = [
      { above: 15, mult: 1.0 },
      { above: 13, mult: 1.5 },
      { above: 10, mult: 2.0 },
      { above: 5,  mult: 2.5 },
      { above: 0,  mult: 3.0 },
    ];
    const getDrainMultiplier = (remaining) => {
      // Find current tier (hard snap, no interpolation)
      for (let i = 0; i < drainTiers.length; i++) {
        if (remaining > drainTiers[i].above) {
          return drainTiers[i].mult;
        }
      }
      return drainTiers[drainTiers.length - 1].mult;
    };

    this.drainTimer = this.time.addEvent({
      delay: cfg.drainInterval,
      loop: true,
      callback: () => {
        if (!this.gameActive) return;
        const remaining = cfg.duration - this.elapsedSeconds;
        const mult = getDrainMultiplier(remaining);
        const drain = cfg.drainRate * mult;
        this.energy = Math.max(0, this.energy - drain);
        if (this.energy < this.stats.minEnergy) this.stats.minEnergy = this.energy;
        this.updateEnergyBar();
        if (this.energy <= 0 && !this.stats.failed) {
          this.stats.failed = true;
          this.endPushThrough(true);
        }
      },
    });

    // ── Intrusive thoughts ────────────────────────────────────────────────
    this.scheduleThought();
  }

  scheduleThought() {
    const cfg = this.config;
    const [min, max] = cfg.thoughtInterval;
    const delay = Phaser.Math.Between(min, max);
    this.time.delayedCall(delay, () => {
      if (!this.gameActive) return;
      const thought = Phaser.Utils.Array.GetRandom(cfg.intrusiveThoughts);
      this.thoughtTxt.setText(thought);
      this.tweens.add({
        targets: this.thoughtTxt,
        alpha: { from: 0, to: 1 },
        duration: 200,
        onComplete: () => {
          this.time.delayedCall(cfg.thoughtDuration, () => {
            this.tweens.add({ targets: this.thoughtTxt, alpha: 0, duration: 200 });
          });
        },
      });
      this.scheduleThought(); // reschedule
    });
  }

  handlePushThroughClick(btnBg, btnTxt) {
    if (!this.gameActive) return;
    const now = Date.now();
    const cfg = this.config;
    const isSpam = (now - this.lastClick) < cfg.clickCooldown;
    this.lastClick = now;

    const restore = isSpam ? cfg.spamRestore : cfg.clickRestore;
    this.energy = Math.min(100, this.energy + restore);
    this.updateEnergyBar();

    // Click feedback
    this.tweens.add({
      targets: btnBg,
      scaleX: 0.95, scaleY: 0.95,
      duration: 60,
      yoyo: true,
    });
  }

  updateEnergyBar() {
    const { width: W } = this.scale;
    const barW = W - 80;
    const ratio = this.energy / 100;
    this.energyBarFill.width = barW * ratio;

    // Color: green → yellow → red
    const color = this.energy > 50 ? 0x27ae60 : this.energy > 25 ? 0xf39c12 : 0xe74c3c;
    this.energyBarFill.setFillStyle(color);

    // Dark overlay intensity (inverse of energy)
    const darkness = (1 - ratio) * 0.65;
    this.darkOverlay.setAlpha(darkness);
  }

  endPushThrough(earlyFail = false) {
    if (!this.gameActive) return;
    this.gameActive = false;
    this.countdown?.remove();
    this.drainTimer?.remove();

    const cfg = this.config;
    const { minEnergy, failed } = this.stats;

    // Evaluate Aura
    let rating, points;
    if (failed || minEnergy <= 0) {
      rating = 'failed'; points = cfg.aura.failed.points;
    } else if (minEnergy >= cfg.aura.excellent.minEnergy) {
      rating = 'excellent'; points = cfg.aura.excellent.points;
    } else if (minEnergy >= cfg.aura.good.minEnergy) {
      rating = 'good'; points = cfg.aura.good.points;
    } else {
      rating = 'barely'; points = cfg.aura.barely.points;
    }

    GameState.recordRating(cfg.id, rating, points);
    // Fix: use same condition as rating — if energy ever hit 0, it's a fail outcome
    // regardless of whether the drain timer beat the countdown timer to set stats.failed
    const isFail = failed || minEnergy <= 0;
    this.endMiniGame(isFail ? 'fail' : 'success');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DISMISS THOUGHTS
  // ═══════════════════════════════════════════════════════════════════════════
  setupDismissThoughts() {
    const { width: W, height: H } = this.scale;
    const cfg = this.config;

    this.bubbles = [];
    this.stats   = { maxAccumulated: 0, failed: false };
    this.gameActive = true;

    // ── Timer display ────────────────────────────────────────────────────
    this.timerTxt = this.add.text(W / 2, 30, `${cfg.duration}s`, {
      fontFamily: '"Courier New", monospace',
      fontSize: '22px',
      color: '#cccccc',
    }).setOrigin(0.5);

    // Accumulation warning
    this.accumTxt = this.add.text(W / 2, H - 35, '', {
      fontFamily: '"Courier New", monospace',
      fontSize: '16px',
      color: '#ff6b6b',
    }).setOrigin(0.5);

    // ── Countdown timer ───────────────────────────────────────────────────
    let elapsed = 0;
    this.countdown = this.time.addEvent({
      delay: 1000,
      repeat: cfg.duration - 1,
      callback: () => {
        elapsed++;
        const remaining = cfg.duration - elapsed;
        this.timerTxt.setText(`${remaining}s`);
        if (remaining <= 0) this.endDismissThoughts();
      },
    });

    // ── Bubble spawn timer ────────────────────────────────────────────────
    this.spawnTimer = this.time.addEvent({
      delay: cfg.spawnInterval,
      loop: true,
      callback: () => {
        if (!this.gameActive) return;
        for (let i = 0; i < cfg.spawnRate; i++) {
          this.spawnBubble();
        }
        this.checkAccumulation();
      },
    });

    // ── Bubble drift timer ────────────────────────────────────────────────
    this.time.delayedCall(cfg.bubbleDriftDelay, () => {
      this.bubbles.forEach(b => this.driftBubbleToCenter(b));
    });
  }

  spawnBubble() {
    const cfg = this.config;
    const { width: W, height: H } = this.scale;

    if (this.bubbles.length >= cfg.maxBubbles) return;

    // Determine type
    const rand = Math.random();
    let type;
    if (rand < cfg.bubbleTypes.falseHope.chance) type = 'falseHope';
    else if (rand < cfg.bubbleTypes.falseHope.chance + cfg.bubbleTypes.heavy.chance) type = 'heavy';
    else type = 'normal';

    const bType = cfg.bubbleTypes[type];
    const msg   = Phaser.Utils.Array.GetRandom(bType.messages);

    const x = Phaser.Math.Between(80, W - 80);
    const y = Phaser.Math.Between(80, H - 200);
    // Base size 160px — large enough to feel genuinely overwhelming and crowding
    // at 4–5 bubbles simultaneously; heavy bubbles hit 240px diameter
    const size = 160 * bType.sizeMultiplier;

    // Colors per type
    const colors = { normal: 0x4a3a6e, heavy: 0x6e1a1a, falseHope: 0x2a5e3f };

    const circle = this.add.circle(x, y, size / 2, colors[type], 0.85)
      .setStrokeStyle(1, 0x888888)
      .setInteractive({ useHandCursor: true });

    const txt = this.add.text(x, y, msg, {
      fontFamily: 'Georgia, serif',
      fontSize: '14px',
      color: '#ffffff',
      wordWrap: { width: size - 10 },
      align: 'center',
    }).setOrigin(0.5);

    let hitsLeft = bType.clicksRequired;

    const handleClick = () => {
      if (!this.gameActive) return;
      hitsLeft--;
      if (hitsLeft <= 0) {
        // False Hope spawns more bubbles
        if (type === 'falseHope') {
          for (let i = 0; i < bType.spawnExtra; i++) this.spawnBubble();
        }
        this.removeBubble(circle, txt);
      } else {
        circle.setAlpha(0.5);
      }
    };

    circle.on('pointerdown', handleClick);

    this.bubbles.push({ circle, txt, type });

    // Slow expansion
    this.tweens.add({
      targets: circle,
      radius: (size / 2) * 1.3,
      duration: 5000,
      ease: 'Linear',
    });
  }

  driftBubbleToCenter(b) {
    const { width: W, height: H } = this.scale;
    this.tweens.add({
      targets: [b.circle, b.txt],
      x: W / 2 + Phaser.Math.Between(-60, 60),
      y: H / 2 + Phaser.Math.Between(-60, 60),
      duration: 3000,
      ease: 'Sine.easeInOut',
    });
  }

  removeBubble(circle, txt) {
    this.tweens.killTweensOf(circle);
    this.tweens.killTweensOf(txt);
    
    this.tweens.add({
      targets: [circle, txt],
      alpha: 0,
      scaleX: 1.5, scaleY: 1.5,
      duration: 150,
      onComplete: () => {
        circle.destroy();
        txt.destroy();
        this.bubbles = this.bubbles.filter(b => b.circle !== circle);
      },
    });
  }

  checkAccumulation() {
    const count = this.bubbles.length;
    if (count > this.stats.maxAccumulated) this.stats.maxAccumulated = count;

    const threshold = this.config.failThreshold; // 8
    this.accumTxt.setText(count >= 3 ? `Thoughts accumulating: ${count}/${threshold}` : '');

    // Progressive shake — starts subtle at count=4, scales up to max at threshold
    // This creates mounting-pressure feel rather than an on/off jolt
    if (count >= 4 && !this.stats.failed) {
      // Map count 4→threshold to intensity range 0.003→0.018
      const t = (count - 4) / Math.max(1, threshold - 4); // 0.0 at count=4, 1.0 at count=threshold
      const intensity = 0.003 + t * 0.015;
      this.cameras.main.shake(200, intensity);
    }

    if (count >= threshold && !this.stats.failed) {
      this.stats.failed = true;
      // Max shake burst at the actual fail moment
      this.cameras.main.shake(600, 0.022);
      this.endDismissThoughts(true);
    }
  }

  endDismissThoughts(earlyFail = false) {
    if (!this.gameActive) return;
    this.gameActive = false;
    this.countdown?.remove();
    this.spawnTimer?.remove();

    const cfg = this.config;
    const { maxAccumulated, failed } = this.stats;

    let rating, points;
    if (failed) {
      rating = 'failed'; points = cfg.aura.failed.points;
    } else if (maxAccumulated <= cfg.aura.excellent.maxAccumulated) {
      rating = 'excellent'; points = cfg.aura.excellent.points;
    } else if (maxAccumulated <= cfg.aura.good.maxAccumulated) {
      rating = 'good'; points = cfg.aura.good.points;
    } else {
      rating = 'barely'; points = cfg.aura.barely.points;
    }

    GameState.recordRating(cfg.id, rating, points);
    this.endMiniGame(rating);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HALLWAY OF DOORS
  // ═══════════════════════════════════════════════════════════════════════════
  setupHallwayOfDoors() {
    const { width: W, height: H } = this.scale;
    const cfg = this.config;

    this.certainty   = cfg.startCertainty;
    this.doorIndex   = 0;
    this.stats       = { finalCertainty: cfg.startCertainty, failed: false };
    this.inReflection = false;
    this.reflectionClicks = 0;
    this.gameActive  = true;

    // ── Certainty bar ────────────────────────────────────────────────────
    const barW = W - 80;
    this.add.text(W / 2, 20, 'CERTAINTY', {
      fontFamily: '"Courier New", monospace',
      fontSize: '14px',
      color: '#aaaaaa',
      letterSpacing: 3,
    }).setOrigin(0.5);

    this.add.rectangle(W / 2, 42, barW, 14, 0x222222).setStrokeStyle(1, 0x333333);
    this.certaintyFill = this.add.rectangle(40, 42, barW * (this.certainty / 100), 14, 0x5b5fa6)
      .setOrigin(0, 0.5);

    // ── Door progress indicator ───────────────────────────────────────────
    this.doorProgressTxt = this.add.text(W / 2, 65, `Door 1 of ${cfg.totalDoors}`, {
      fontFamily: '"Courier New", monospace',
      fontSize: '16px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    // ── Door visual ───────────────────────────────────────────────────────
    this.doorBg = this.add.rectangle(W / 2, H / 2 - 20, 180, 280, 0x1a1a1a)
      .setStrokeStyle(2, 0x555555);
    this.doorLabel = this.add.text(W / 2, H / 2 - 20, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '14px',
      color: '#dddddd',
      wordWrap: { width: 160 },
      align: 'center',
    }).setOrigin(0.5);

    // Door timer bar (below the door)
    this.doorTimerBg  = this.add.rectangle(W / 2, H / 2 + 165, 180, 6, 0x222222);
    this.doorTimerBar = this.add.rectangle(W / 2 - 90, H / 2 + 165, 180, 6, 0x7f8c8d).setOrigin(0, 0.5);

    // ── Buttons ───────────────────────────────────────────────────────────
    const openBg = this.add.rectangle(W / 2 - 110, H - 80, 160, 50, 0x1a3a1a)
      .setStrokeStyle(1, 0x2ecc71)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2 - 110, H - 80, 'OPEN', {
      fontFamily: '"Courier New", monospace',
      fontSize: '20px',
      color: '#2ecc71',
    }).setOrigin(0.5);

    const ignoreBg = this.add.rectangle(W / 2 + 110, H - 80, 160, 50, 0x1a1a2e)
      .setStrokeStyle(1, 0xa29bfe)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2 + 110, H - 80, 'IGNORE', {
      fontFamily: '"Courier New", monospace',
      fontSize: '20px',
      color: '#a29bfe',
    }).setOrigin(0.5);

    openBg.on('pointerdown',   () => this.handleDoorOpen());
    ignoreBg.on('pointerdown', () => this.handleDoorIgnore());

    // Reflection click penalty listener
    this.input.on('pointerdown', () => {
      if (this.inReflection) {
        this.reflectionClicks++;
        if (this.reflectionClicks === 3) { // Trigger only ONCE per reflection
          this.changeCertainty(this.config.avoidancePenalty);
          this.doorLabel.setText("[ SHATTERED ]\n\nThe memory suddenly cracks like broken glass.\n\nShe desperately tries to look away. To make it end sooner.\n\nThe memory shatters. Leaving only fragments behind.\n\nRegret: See? Even now... You refuse to face it.");
          this.doorLabel.setColor('#e74c3c');
          this.fitDoorText();
        }
      }
    });

    this.showTutorialOverlay();
  }

  showTutorialOverlay() {
    const { width: W, height: H } = this.scale;
    this.tutorialContainer = this.add.container(0, 0).setDepth(100);
    
    const bg = this.add.rectangle(W/2, H/2, W, H, 0x000000, 0.95).setInteractive();
    
    const baseText = "The hallway responds to the protagonist's emotions.\n\nEach door represents a memory.\nSome memories bring pain.\nOthers remind her why she kept moving forward.\n\nThe choices she makes will affect her Certainty.\n\nThere is no correct answer. Only honest ones.";
    const feedbackText = "The hallway behind her disappears into darkness.\n\nSome questions... demand an answer.";
    
    const txt = this.add.text(W/2, H/2 - 100, baseText, {
      fontFamily: 'Georgia, serif', fontSize: '16px', color: '#aaaaaa', fontStyle: 'italic', align: 'center', lineSpacing: 8
    }).setOrigin(0.5);

    const choice1 = this.add.text(W/2, H/2 + 80, "> Open the door <", {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#f1c40f', fontStyle: 'bold', backgroundColor: '#000000cc', padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const choice2 = this.add.text(W/2, H/2 + 130, "Walk away", {
      fontFamily: 'Georgia, serif', fontSize: '18px', color: '#dddddd', backgroundColor: '#00000088', padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.tutorialContainer.add([bg, txt, choice1, choice2]);
    this.tutorialChoices = [
      { obj: choice1, text: "Open the door", action: "open" },
      { obj: choice2, text: "Walk away", action: "walk" }
    ];
    this.tutorialSelectedIndex = 0;

    const updateTutorialSelection = () => {
      this.tutorialChoices.forEach((choice, idx) => {
        if (idx === this.tutorialSelectedIndex) {
          choice.obj.setText(`> ${choice.text} <`);
          choice.obj.setStyle({ color: '#f1c40f', fontStyle: 'bold', backgroundColor: '#000000cc' });
        } else {
          choice.obj.setText(choice.text);
          choice.obj.setStyle({ color: '#dddddd', fontStyle: 'normal', backgroundColor: '#00000088' });
        }
      });
    };

    const confirmTutorialSelection = () => {
      const action = this.tutorialChoices[this.tutorialSelectedIndex].action;
      if (action === "open") {
        this.input.keyboard.off('keydown-UP');
        this.input.keyboard.off('keydown-DOWN');
        this.input.keyboard.off('keydown-ENTER');
        this.input.keyboard.off('keydown-SPACE');
        this.tutorialContainer.destroy();
        this.showDoor(0);
        this.scheduleRegretQuote();
      } else {
        txt.setText(feedbackText);
      }
    };

    choice1.on('pointerover', () => { this.tutorialSelectedIndex = 0; updateTutorialSelection(); });
    choice2.on('pointerover', () => { this.tutorialSelectedIndex = 1; updateTutorialSelection(); });

    choice1.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation();
      this.tutorialSelectedIndex = 0;
      confirmTutorialSelection();
    });

    choice2.on('pointerdown', (pointer, localX, localY, event) => {
      event.stopPropagation();
      this.tutorialSelectedIndex = 1;
      confirmTutorialSelection();
    });

    this.input.keyboard.on('keydown-UP', () => {
      this.tutorialSelectedIndex = (this.tutorialSelectedIndex - 1 + this.tutorialChoices.length) % this.tutorialChoices.length;
      updateTutorialSelection();
    });
    this.input.keyboard.on('keydown-DOWN', () => {
      this.tutorialSelectedIndex = (this.tutorialSelectedIndex + 1) % this.tutorialChoices.length;
      updateTutorialSelection();
    });
    this.input.keyboard.on('keydown-ENTER', () => confirmTutorialSelection());
    this.input.keyboard.on('keydown-SPACE', () => confirmTutorialSelection());

    updateTutorialSelection();
  }

  scheduleRegretQuote() {
    if (!this.gameActive) return;
    // Reduce delay so it actually fires within the ~25s minigame
    const delay = Phaser.Math.Between(3000, 6000);
    this.time.delayedCall(delay, () => {
      if (!this.gameActive) return;
      if (this.inReflection) {
        // If blocked, wait briefly and try again without a full reset
        this.time.delayedCall(1000, () => this.scheduleRegretQuote());
        return;
      }
      const quote = Phaser.Utils.Array.GetRandom(this.config.regretQuotes);
      
      const { width: W, height: H } = this.scale;
      const quoteTxt = this.add.text(W / 2, H / 2 - 200, quote, {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: '#ff9999',
        fontStyle: 'italic',
        align: 'center',
        lineSpacing: 5
      }).setOrigin(0.5).setAlpha(0).setDepth(10);

      this.tweens.add({
        targets: quoteTxt,
        alpha: { from: 0, to: 1 },
        duration: 1000,
        yoyo: true,
        hold: 2500,
        onComplete: () => {
          quoteTxt.destroy();
          this.scheduleRegretQuote();
        }
      });
    });
  }

  showDoor(index) {
    const cfg = this.config;
    if (index >= cfg.totalDoors) {
      this.endHallwayOfDoors();
      return;
    }

    const door = cfg.doorSequence[index];
    const effect = cfg.doorEffects[door.type];

    this.doorIndex = index;
    this.doorProgressTxt.setText(`Door ${index + 1} of ${cfg.totalDoors}`);
    this.doorBg.setStrokeStyle(2, effect.color);
    this.doorLabel.setText(`[ ${effect.label.toUpperCase()} ]\n\n${door.memory}`).setColor('#888888');
    this.fitDoorText();

    // Timer bar countdown — visual only, updated every 50ms
    // Auto-advance is handled by a single delayedCall (avoids floating-point
    // precision issues and double-fire edge cases from a repeating tick).
    if (this.doorTimer) this.doorTimer.remove();
    if (this.doorAutoAdvance) this.doorAutoAdvance.remove();

    let pct = 1;
    const timerW = 180;
    const { width: W } = this.scale;   // canvas width — needed to position the timer bar
    this.doorTimerBar.width = timerW;
    this.doorTimerBar.x     = W / 2 - 90;

    this.doorTimer = this.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        pct -= 50 / cfg.doorTimeout;
        this.doorTimerBar.width = timerW * Math.max(0, pct);
      },
    });

    // Single one-shot auto-advance fires once at exactly doorTimeout ms
    this.doorAutoAdvance = this.time.delayedCall(cfg.doorTimeout, () => {
      if (!this.gameActive || this.inReflection) return;
      this.doorTimer?.remove();
      // Auto-ignore: apply skip penalty and advance
      this.changeCertainty(this.config.skipPenalty);
      this.doorIndex++;
      if (!this.stats.failed) this.showDoor(this.doorIndex);
    });
  }

  handleDoorOpen() {
    if (!this.gameActive || this.inReflection) return;
    if (this.doorTimer) this.doorTimer.remove();
    if (this.doorAutoAdvance) this.doorAutoAdvance.remove();

    const door   = this.config.doorSequence[this.doorIndex];
    const effect = this.config.doorEffects[door.type];

    this.changeCertainty(effect.certaintyDelta);

    // Reflection phase — 2s, click spam detected
    this.inReflection     = true;
    this.reflectionClicks = 0;
    this.doorLabel.setText(`[ REMEMBERING ]\n\n${door.memory}`).setColor('#ffffff');
    this.fitDoorText();

    this.time.delayedCall(this.config.reflectionDuration, () => {
      this.inReflection = false;
      this.doorLabel.setColor('#888888');
      this.doorIndex++;
      if (!this.stats.failed) this.showDoor(this.doorIndex);
    });
  }

  handleDoorIgnore() {
    if (!this.gameActive) return;
    if (this.doorTimer) this.doorTimer.remove();
    if (this.doorAutoAdvance) this.doorAutoAdvance.remove();

    this.changeCertainty(this.config.skipPenalty);
    this.doorIndex++;
    if (!this.stats.failed) this.showDoor(this.doorIndex);
  }

  changeCertainty(delta) {
    this.certainty = Phaser.Math.Clamp(this.certainty + delta, 0, 100);
    const barW = this.scale.width - 80;
    this.certaintyFill.width = barW * (this.certainty / 100);

    if (this.certainty <= 0 && !this.stats.failed) {
      this.stats.failed = true;
      this.endHallwayOfDoors(true);
    }
  }

  endHallwayOfDoors(earlyFail = false) {
    if (!this.gameActive) return;
    this.gameActive = false;
    if (this.doorTimer) this.doorTimer.remove();

    const cfg = this.config;
    this.stats.finalCertainty = this.certainty;

    let rating, points;
    if (this.stats.failed) {
      rating = 'failed'; points = cfg.aura.failed.points;
    } else if (this.certainty >= cfg.aura.excellent.minCertainty) {
      rating = 'excellent'; points = cfg.aura.excellent.points;
    } else if (this.certainty >= cfg.aura.good.minCertainty) {
      rating = 'good'; points = cfg.aura.good.points;
    } else {
      rating = 'barely'; points = cfg.aura.barely.points;
    }

    GameState.recordRating(cfg.id, rating, points);
    this.endMiniGame(rating);
  }

  fitDoorText() {
    if (!this.doorLabel) return;
    this.doorLabel.setScale(1);
    if (this.doorLabel.height > 260) {
      this.doorLabel.setScale(260 / this.doorLabel.height);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INVITATION CARDS
  // ═══════════════════════════════════════════════════════════════════════════
  setupInvitationCards() {
    const { width: W, height: H } = this.scale;
    const cfg = this.config;

    this.energy    = cfg.startEnergy;
    this.belonging = cfg.startBelonging;
    this.toll      = cfg.startToll;
    this.cardIndex = 0;
    this.stats     = { outcome: null };
    this.gameActive = true;

    // ── Three meter bars ──────────────────────────────────────────────────
    const meterY = 50;
    this.buildMeter(120,  meterY, 'ENERGY',    0xe74c3c, () => this.energy / cfg.startEnergy);
    this.buildMeter(400,  meterY, 'BELONGING', 0x27ae60, () => this.belonging / 100);
    this.buildMeter(680,  meterY, 'TOLL',      0x8e44ad, () => this.toll / cfg.tollMax);

    // Store references for update
    this.meterUpdaters = [];

    // ── Card display ──────────────────────────────────────────────────────
    this.cardBg = this.add.rectangle(W / 2, H / 2 - 30, 300, 180, 0x1a1a1a)
      .setStrokeStyle(2, 0x555555);
    this.cardTitle = this.add.text(W / 2, H / 2 - 80, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5);
    this.cardDesc = this.add.text(W / 2, H / 2 - 15, '', {
      fontFamily: 'Georgia, serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'italic',
      align: 'center',
      wordWrap: { width: 260 },
      lineSpacing: 4
    }).setOrigin(0.5);
    this.cardTimer = this.add.rectangle(W / 2 - 150, H / 2 + 65, 300, 5, 0x555555).setOrigin(0, 0.5);
    this.cardTimerBar = this.add.rectangle(W / 2 - 150, H / 2 + 65, 300, 5, 0xe67e22).setOrigin(0, 0.5);

    // Card number
    this.cardNumTxt = this.add.text(W / 2, H / 2 - 110, '', {
      fontFamily: '"Courier New", monospace',
      fontSize: '16px',
      color: '#aaaaaa',
      letterSpacing: 2,
    }).setOrigin(0.5);

    // ── Engage / Skip buttons ─────────────────────────────────────────────
    const engageBg = this.add.rectangle(W / 2 - 110, H - 80, 160, 50, 0x1a3a2a)
      .setStrokeStyle(1, 0x27ae60)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2 - 110, H - 80, 'ENGAGE', {
      fontFamily: '"Courier New", monospace',
      fontSize: '20px',
      color: '#27ae60',
    }).setOrigin(0.5);

    const skipBg = this.add.rectangle(W / 2 + 110, H - 80, 160, 50, 0x2a1a2a)
      .setStrokeStyle(1, 0x8e44ad)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2 + 110, H - 80, 'SKIP', {
      fontFamily: '"Courier New", monospace',
      fontSize: '20px',
      color: '#8e44ad',
    }).setOrigin(0.5);

    engageBg.on('pointerdown', () => this.handleEngage());
    skipBg.on('pointerdown',   () => this.handleSkip());

    // Live meter display texts
    this.energyTxt    = this.add.text(40,  70, '', { fontFamily: 'monospace', fontSize: '14px', color: '#e74c3c' });
    this.belongingTxt = this.add.text(320, 70, '', { fontFamily: 'monospace', fontSize: '14px', color: '#27ae60' });
    this.tollTxt      = this.add.text(600, 70, '', { fontFamily: 'monospace', fontSize: '14px', color: '#8e44ad' });

    this.showCard(0);
  }

  buildMeter(x, y, label, color, valueFn) {
    const { width: W } = this.scale;
    this.add.text(x, y - 18, label, {
      fontFamily: '"Courier New", monospace',
      fontSize: '12px',
      color: '#aaaaaa',
      letterSpacing: 2,
    }).setOrigin(0.5);
    this.add.rectangle(x, y, 160, 12, 0x222222).setStrokeStyle(1, 0x333333);
    const fill = this.add.rectangle(x - 80, y, 0, 12, color).setOrigin(0, 0.5);
    // We'll update fill manually each frame
    this.meterUpdaters = this.meterUpdaters || [];
    this.meterUpdaters.push({ fill, valueFn, maxW: 160 });
  }

  showCard(index) {
    const cfg = this.config;
    if (index >= cfg.cards.length) {
      this.endInvitationCards();
      return;
    }

    const card = cfg.cards[index];
    this.cardIndex = index;
    this.currentCard = card;

    this.cardNumTxt.setText(`Card ${index + 1} of ${cfg.cards.length}`);
    this.cardTitle.setText(card.label);
    if (this.cardDesc) this.cardDesc.setText(card.description || '');
    this.cardBg.setStrokeStyle(2, card.special ? 0xf39c12 : 0x555555);

    // Timer bar countdown
    let pct = 1;
    const barW = 300;
    this.cardTimerBar.width = barW;

    if (this.cardCountdown) this.cardCountdown.remove();
    this.cardCountdown = this.time.addEvent({
      delay: 50,
      repeat: Math.floor(cfg.cardTimeout / 50) - 1,
      callback: () => {
        pct -= 1 / (cfg.cardTimeout / 50);
        this.cardTimerBar.width = barW * Math.max(0, pct);
        if (pct <= 0) this.handleSkip();
      },
    });

    this.updateMeterDisplays();
  }

  handleEngage() {
    if (!this.gameActive || !this.currentCard) return;
    if (this.cardCountdown) this.cardCountdown.remove();

    const card = this.currentCard;
    this.energy    = Phaser.Math.Clamp(this.energy - card.energyCost, 0, 100);
    this.belonging = Phaser.Math.Clamp(this.belonging + card.belongingGain, 0, 100);
    this.toll      = Phaser.Math.Clamp(this.toll + card.tollGain, 0, this.config.tollMax);

    this.updateMeterDisplays();
    this.checkCardFailConditions();
    if (this.gameActive) {
      this.cardIndex++;
      this.showCard(this.cardIndex);
    }
  }

  handleSkip() {
    if (!this.gameActive) return;
    if (this.cardCountdown) this.cardCountdown.remove();

    this.toll = Phaser.Math.Clamp(this.toll + this.config.skipTollGain, 0, this.config.tollMax);

    this.updateMeterDisplays();
    this.checkCardFailConditions();
    if (this.gameActive) {
      this.cardIndex++;
      this.showCard(this.cardIndex);
    }
  }

  checkCardFailConditions() {
    const cfg = this.config;
    if (this.energy <= cfg.energyMin && !this.stats.outcome) {
      this.stats.outcome = 'burnout';
      this.endInvitationCards(true);
    } else if (this.toll >= cfg.tollMax && !this.stats.outcome) {
      this.stats.outcome = 'isolated';
      this.endInvitationCards(true);
    }
  }

  updateMeterDisplays() {
    const cfg = this.config;
    if (this.meterUpdaters) {
      this.meterUpdaters.forEach(m => {
        m.fill.width = m.maxW * Phaser.Math.Clamp(m.valueFn(), 0, 1);
      });
    }
    if (this.energyTxt)    this.energyTxt.setText(`${Math.round(this.energy)}`);
    if (this.belongingTxt) this.belongingTxt.setText(`${Math.round(this.belonging)}`);
    if (this.tollTxt)      this.tollTxt.setText(`${Math.round(this.toll)}`);
  }

  endInvitationCards(earlyFail = false) {
    if (!this.gameActive) return;
    this.gameActive = false;
    if (this.cardCountdown) this.cardCountdown.remove();

    const cfg = this.config;
    if (!this.stats.outcome) {
      // Determine final outcome per doc spec:
      // balanced = energy > 20 AND toll < tollMax (good balance)
      // barely   = completed all 8 but close to edge (one condition almost failed)
      // good     = minor imbalance but reasonably OK
      const energyRatio   = this.energy / cfg.startEnergy;
      const tollRatio     = this.toll / cfg.tollMax;
      if (this.energy > 20 && this.toll < cfg.tollMax) {
        // Both within bounds — rate by how well
        if (energyRatio > 0.5 && tollRatio < 0.4) {
          this.stats.outcome = 'balanced'; // genuinely healthy
        } else if (energyRatio > 0.3 && tollRatio < 0.6) {
          this.stats.outcome = 'good';     // minor imbalance
        } else {
          this.stats.outcome = 'barely';   // very close to edge
        }
      } else {
        this.stats.outcome = 'barely'; // shouldn't reach here without earlyFail, but safe fallback
      }
    }

    const auraData = cfg.aura[this.stats.outcome] || cfg.aura.barely;
    GameState.recordRating(cfg.id, this.stats.outcome, auraData.points);
    // All invitation card outcomes route through the same outcome block in invitationCards.js.
    // 'burnout' and 'isolated' are set by checkCardFailConditions and have their own outcome keys.
    // 'balanced', 'good', 'barely' must fall back to existing outcome keys — map to 'balanced' for routing.
    const routeKey = (this.stats.outcome === 'burnout' || this.stats.outcome === 'isolated')
      ? this.stats.outcome
      : 'balanced'; // balanced/good/barely all follow the non-fail story path
    this.endMiniGame(routeKey);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED — end mini-game and transition
  // ═══════════════════════════════════════════════════════════════════════════
  endMiniGame(outcomeKey) {
    const outcome = this.config.outcome[outcomeKey] || this.config.outcome.fail || this.config.outcome.success;
    if (!outcome) {
      console.error(`[MiniGameScene] No outcome config for key: ${outcomeKey}`);
      this.scene.start('TitleScene');
      return;
    }

    this.time.delayedCall(600, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        if (outcome.dialogueKey) {
          this.scene.start('DialogueScene', {
            dialogueKey: outcome.dialogueKey,
            nextScene:   outcome.nextScene,
            nextData:    outcome.nextData,
          });
        } else {
          this.scene.start(outcome.nextScene, outcome.nextData);
        }
      });
    });
  }
}
