/**
 * ChaseScene.js — Final Chase (Procedural Tunnel Effect)
 *
 * Visuals: Fully procedural fever-dream tunnel drawn with Phaser Graphics.
 *   - NO image assets used for the background.
 *   - NO masks, trapezoids, or depth-card layering.
 *   - Concentric rings scale outward as W is held — innermost resets to
 *     create a continuous "flying through the tunnel" illusion.
 *
 * CONFIRMED SPEC:
 *   - 2D ONLY — no 3D, no WebGL 3D, no Three.js — ever
 *   - W = advance progress counter (forward movement)
 *   - A/D = cosmetic camera x-drift only
 *   - Linear, fixed path — no branching, no pathfinding
 *   - At scripted checkpoints → pause → DialogueScene → resume
 *   - Aura affects: speed, visual distortion, entity appearance frequency
 *   - Always completes — no fail state; ending branch decided by GameState.getEnding()
 */

import { GameState } from '../GameState.js';
import { DIALOGUES } from '../config/dialogues/index.js';

// Checkpoint progress values (out of TOTAL_PROGRESS)
const TOTAL_PROGRESS = 1500;
const CHECKPOINTS = [
  { progress: 400, dialogueKey: 'chase_checkpoint_1' },
  { progress: 850, dialogueKey: 'chase_checkpoint_2' },
  { progress: 1200, dialogueKey: 'chase_checkpoint_3' },
];

// ── Spiral tunnel configuration ───────────────────────────────────────────────
const SPIRAL_ARMS = 5;     // Thick spiral arms matching reference (~5 wide bands)
const SPIRAL_BANDS = 18;   // Concentric distance bands (low for performance)
const SPIRAL_TWIST = 4.2;   // Loose/wide spiral (reference has ~2-3 full turns)
const SPIRAL_BASE_ROTATION = 0.8; // Constant rotation speed (rad/s)

export class ChaseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ChaseScene' });
  }

  // Restore progress when returning from a checkpoint DialogueScene
  init(data) {
    this.resumeProgress = data?._resumeProgress || 0;
    this.resumeCheckpoint = data?._resumeCheckpoint || 0;
    this.resumeSpeed = data?._resumeSpeed || null;
  }

  create() {
    const { width: W, height: H } = this.scale;

    // Restore progress from checkpoint resume (or start fresh)
    this.progress = this.resumeProgress || 0;
    this.checkpointIndex = this.resumeCheckpoint || 0;
    this.chaseActive = true;

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
    }
    this.inCheckpoint = false;
    this.cameraXOffset = 0;
    this.currentLane = 0; // -1: Left, 0: Center, 1: Right

    // Aura modifiers — high Aura = faster + less distortion
    const auraRatio = GameState.getAuraRatio(); // 0–1
    this.speed = this.resumeSpeed || (80 + auraRatio * 120); // 80–200 progress/s

    // ── Tunnel Graphics object (redrawn every frame) ──────────────────────
    this.tunnelGfx = this.add.graphics().setDepth(0);

    // Spiral rotation angle (continuously updated)
    this.spiralAngle = 0;

    // FOGS
    this.fogClouds = [];
    for (let i = 0; i < 20; i++) {

      this.fogClouds.push({

        angle: Phaser.Math.FloatBetween(0, Math.PI * 2),

        radius: Phaser.Math.Between(20, 80),

        size: Phaser.Math.Between(60, 130),

        speed: Phaser.Math.FloatBetween(0.1, 0.4)

      });

    }

    // ground particles
    this.floorDust = [];

    for (let i = 0; i < 120; i++) {
      this.floorDust.push({
        t: Math.random(),
        offset: Phaser.Math.FloatBetween(-1, 1),
        size: Phaser.Math.FloatBetween(0.5, 1.5),
        alpha: Phaser.Math.FloatBetween(0.01, 0.05)
      });
    }

    // ── Radial vignette (drawn as concentric fading circles — no rectangles) ──
    this.vignetteGfx = this.add.graphics().setDepth(7);
    this._drawRadialVignette(W, H);

    // ── WASD keys ─────────────────────────────────────────────────────────
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.scheduleWhispers();

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  // ── Draw the procedural spiral tunnel ──────────────────────────────────────
  drawTunnel(W, H, dt) {
    this.tunnelGfx.clear();

    const cameraPulse = Math.sin(this.time.now * 0.003);

    const cx =
      W / 2 -
      this.cameraXOffset * 0.08 +
      cameraPulse * 8;
    const cy = H / 2;

    // Head-bob
    const runCycle = this.progress * 0.05;
    const bobY = Math.abs(Math.cos(runCycle)) * 10;
    const tunnelCY = cy + bobY;

    // Progress ratio drives glow intensity
    const targetProgress = CHECKPOINTS[CHECKPOINTS.length - 1].progress;
    const progressRatio = Math.min(1, this.progress / targetProgress);

    // Forward movement into the tunnel
    const approach = Math.min(1, this.progress / TOTAL_PROGRESS);

    const colorPulse = (Math.sin(this.time.now * 0.004) + 1) * 0.5;
    const fever = Math.sin(this.time.now * 0.0015);
    const brightnessBoost = (fever + 1) * 0.5;

    // Deep purple background

    this.tunnelGfx.fillStyle(0x12071d, 1);
    this.tunnelGfx.fillRect(0, 0, W, H);

    // ── Spiral vortex ──
    const maxR =
      Math.sqrt(W * W + H * H) * 0.6;

    const totalSectors = SPIRAL_ARMS * 2; // alternating light/dark
    const sectorAngle = (Math.PI * 2) / totalSectors;
    const ARC_SEGS = 24; // arc points per sector (smooth enough, performant)

    // Draw bands outermost → innermost (inner overdraw outer)
    for (let b = SPIRAL_BANDS - 1; b >= 0; b--) {
      const bandT = (b + 1) / SPIRAL_BANDS; // 1 = outer edge, 0 = centre
      const outerR = bandT * maxR;
      const innerR = (b / SPIRAL_BANDS) * maxR;
      if (outerR < 2) continue;

      // Twist angle increases with distance → creates the spiral curve
      const wallWave =
        Math.sin(
          this.time.now * 0.0015 +
          bandT * 8
        ) * 0.25;

      const twistAngle =
        this.spiralAngle +
        wallWave +
        Math.pow(bandT, 1.7) *
        SPIRAL_TWIST *
        Math.PI *
        2;

      // Brightness ramp: centre bands = full white, outer = dimmer
      const brightness = Math.pow(1 - bandT, 0.35);

      for (let s = 0; s < totalSectors; s++) {
        const isLight = s % 2 === 0;
        const aStart = twistAngle + s * sectorAngle;
        const aEnd = aStart + sectorAngle;

        if (isLight) {
          const purple =
            Phaser.Display.Color.Interpolate.ColorWithColor(
              Phaser.Display.Color.ValueToColor(0x3d235b),
              Phaser.Display.Color.ValueToColor(0xb66cff),
              100,
              Math.floor(brightness * 100)
            );

          this.tunnelGfx.fillStyle(
            Phaser.Display.Color.GetColor(
              purple.r,
              purple.g,
              purple.b
            ),
            0.95
          );
        }
        else {
          this.tunnelGfx.fillStyle(
            0x09040f,
            1
          );
        }

        // Build smooth annular sector
        this.tunnelGfx.beginPath();
        for (let p = 0; p <= ARC_SEGS; p++) {
          const a = aStart + (aEnd - aStart) * (p / ARC_SEGS);
          const px = cx + Math.cos(a) * outerR;
          const py = tunnelCY + Math.sin(a) * outerR;
          if (p === 0) this.tunnelGfx.moveTo(px, py);
          else this.tunnelGfx.lineTo(px, py);
        }
        for (let p = ARC_SEGS; p >= 0; p--) {
          const a = aStart + (aEnd - aStart) * (p / ARC_SEGS);
          const px = cx + Math.cos(a) * innerR;
          const py = tunnelCY + Math.sin(a) * innerR;
          this.tunnelGfx.lineTo(px, py);
        }
        this.tunnelGfx.closePath();
        this.tunnelGfx.fill();

        this.tunnelGfx.fillStyle(0xffffff, 0.04);

        this.tunnelGfx.beginPath();

        for (let p = 0; p <= ARC_SEGS; p++) {
          const a = aStart + (aEnd - aStart) * (p / ARC_SEGS);

          const px = cx + Math.cos(a) * (outerR + 2);
          const py = tunnelCY + Math.sin(a) * (outerR + 2);

          if (p === 0)
            this.tunnelGfx.moveTo(px, py);
          else
            this.tunnelGfx.lineTo(px, py);
        }

        for (let p = ARC_SEGS; p >= 0; p--) {
          const a = aStart + (aEnd - aStart) * (p / ARC_SEGS);

          const px = cx + Math.cos(a) * (innerR - 2);
          const py = tunnelCY + Math.sin(a) * (innerR - 2);

          this.tunnelGfx.lineTo(px, py);
        }

        this.tunnelGfx.closePath();
        this.tunnelGfx.fill();
      }
    }

    // ===========================================
    // APPROACHING LIGHT
    // ===========================================

    // Non-linear growth.
    // Hardly changes at first.
    // Explodes in size near the end.

    const approachCurve =
      Math.pow(approach, 2.6);

    const glowRadius =
      Phaser.Math.Linear(
        60,
        500,
        approachCurve
      );

    const coreRadius =
      Phaser.Math.Linear(
        12,
        80,
        approachCurve
      );

    // More glow layers = smoother
    for (let i = 24; i >= 0; i--) {
      const t = i / 24;

      const radius =
        glowRadius * (0.2 + t * 1.8);

      const alpha =
        Math.pow(1 - t, 2.4) *
        (0.25 + approach * 0.30);

      let color;

      if (t > 0.75)
        color = 0x2a143e;
      else if (t > 0.55)
        color = 0x5a2fa5;
      else if (t > 0.30)
        color = 0x9660ff;
      else
        color = 0xf3deff;

      this.tunnelGfx.fillStyle(color, alpha);
      this.tunnelGfx.fillCircle(
        cx,
        tunnelCY,
        radius
      );
    }

    // FOGS
    for (const cloud of this.fogClouds) {

      cloud.angle += dt * cloud.speed;

      this.tunnelGfx.fillStyle(0xffffff, 0.02);

      this.tunnelGfx.fillCircle(

        cx + Math.cos(cloud.angle) * cloud.radius,

        tunnelCY + Math.sin(cloud.angle) * cloud.radius,

        cloud.size

      );

    }

    // ====================================================================
    // DREAM BRIDGE
    // ====================================================================

    // Number of bridge segments
    const SEGMENTS = 22;

    for (let i = SEGMENTS; i >= 1; i--) {

      const tNear = i / SEGMENTS;
      const tFar = (i - 1) / SEGMENTS;

      const yNear = Phaser.Math.Linear(
        H,
        tunnelCY + 25,
        tNear
      );

      const yFar = Phaser.Math.Linear(
        H,
        tunnelCY + 25,
        tFar
      );

      const bridgeWidth =
        Phaser.Math.Linear(
          1,
          0.25,
          approach
        );

      const halfNear =
        Phaser.Math.Linear(
          W * 0.32 * bridgeWidth,
          12,
          tNear
        );

      const halfFar =
        Phaser.Math.Linear(
          W * 0.32 * bridgeWidth,
          12,
          tFar
        );

      // Slight random wobble
      const wobble =
        Math.sin(
          this.time.now * 0.002 +
          i
        ) * 2;

      this.tunnelGfx.fillStyle(
        i % 2 === 0
          ? 0x5d4277
          : 0x49315f,
        1
      );

      this.tunnelGfx.beginPath();

      this.tunnelGfx.moveTo(cx - halfNear + wobble, yNear);

      this.tunnelGfx.lineTo(cx + halfNear + wobble, yNear);

      this.tunnelGfx.lineTo(cx + halfFar, yFar);

      this.tunnelGfx.lineTo(cx - halfFar, yFar);

      this.tunnelGfx.closePath();

      this.tunnelGfx.fill();

    }

    // ====================================================================
    // BRIDGE EDGES
    // ====================================================================

    this.tunnelGfx.lineStyle(
      3,
      0xc49cff,
      0.35
    );

    this.tunnelGfx.beginPath();

    this.tunnelGfx.moveTo(
      cx - W * 0.32,
      H
    );

    this.tunnelGfx.lineTo(
      cx - 10,
      tunnelCY + 25
    );

    this.tunnelGfx.strokePath();

    this.tunnelGfx.beginPath();

    this.tunnelGfx.moveTo(
      cx + W * 0.32,
      H
    );

    this.tunnelGfx.lineTo(
      cx + 10,
      tunnelCY + 25
    );

    this.tunnelGfx.strokePath();

    // ====================================================================
    // BRIDGE CRACKS
    // ====================================================================

    for (let i = 0; i < 45; i++) {

      const y =
        Phaser.Math.Between(
          tunnelCY + 40,
          H
        );

      const width =
        Phaser.Math.Linear(
          8,
          W * 0.30,
          (y - tunnelCY) / (H - tunnelCY)
        );

      const x =
        cx +
        Phaser.Math.FloatBetween(
          -width,
          width
        );

      const len =
        Phaser.Math.Between(
          4,
          10
        );

      this.tunnelGfx.lineStyle(
        1,
        0x2a1838,
        0.35
      );

      this.tunnelGfx.beginPath();

      this.tunnelGfx.moveTo(
        x,
        y
      );

      this.tunnelGfx.lineTo(
        x + Phaser.Math.Between(-4, 4),
        y + len
      );

      this.tunnelGfx.strokePath();

    }

    // White center
    this.tunnelGfx.fillStyle(
      0xffffff,
      0.9
    );

    this.tunnelGfx.fillCircle(
      cx,
      tunnelCY,
      coreRadius
    );
  }

  // ── Radial vignette (concentric circles — no rectangular artifacts) ────────
  _drawRadialVignette(W, H) {
    this.vignetteGfx.clear();
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.sqrt(cx * cx + cy * cy);
    const steps = 12;
    for (let i = steps; i >= 1; i--) {
      const frac = i / steps;
      const r = maxR * (0.35 + frac * 0.65);
      const alpha = frac * frac * 0.6;
      this.vignetteGfx.fillStyle(0x000000, alpha);
      this.vignetteGfx.fillCircle(cx, cy, r);
    }
  }

  scheduleWhispers() {
    if (!this.chaseActive) return;
    const delay = Phaser.Math.Between(4000, 8000);
    this.time.delayedCall(delay, () => {
      if (!this.chaseActive) return;
      if (this.inCheckpoint) {
        this.time.delayedCall(1000, () => this.scheduleWhispers());
        return;
      }

      const whispers = [
        { speaker: 'Regret', text: "You can't outrun your past.", color: '#6c3483' },
        { speaker: 'Lost', text: "Where are you going?", color: '#1a5276' },
        { speaker: 'Burnout', text: "Keep running.", color: '#e74c3c' },
        { speaker: 'Deprivation', text: "What did it all cost?", color: '#8e44ad' }
      ];

      const whisper = Phaser.Utils.Array.GetRandom(whispers);

      const { width: W, height: H } = this.scale;
      const x = W / 2 + Phaser.Math.Between(-200, 200);
      const y = H / 2 + Phaser.Math.Between(-150, 150);

      const whisperTxt = this.add.text(x, y, whisper.text, {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: whisper.color,
        fontStyle: 'italic',
        backgroundColor: '#000000aa',
        padding: { x: 5, y: 5 }
      }).setOrigin(0.5).setAlpha(0).setDepth(9);

      this.tweens.add({
        targets: whisperTxt,
        alpha: { from: 0, to: 0.9 },
        duration: 1000,
        yoyo: true,
        hold: 2500,
        onComplete: () => {
          whisperTxt.destroy();
          this.scheduleWhispers();
        }
      });
    });
  }

  update(time, delta) {
    if (!this.chaseActive || this.inCheckpoint) return;

    const dt = delta / 1000; // seconds

    // ── Spiral rotation — constant speed, does NOT change with movement ───
    this.spiralAngle += SPIRAL_BASE_ROTATION * dt;

    // ── Forward movement (W) ──────────────────────────────────────────────
    if (this.keys.up.isDown) {
      this.progress += this.speed * dt;

      this.checkProgress();
    }

    // ── Discrete Lane Movement (A/D) ──────────────────────────────────────
    if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
      if (this.currentLane > -1) this.currentLane--;
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
      if (this.currentLane < 1) this.currentLane++;
    }

    // Smoothly pan camera to the target lane position
    const targetXOffset = this.currentLane * 200;
    this.cameraXOffset = Phaser.Math.Linear(this.cameraXOffset, targetXOffset, 0.1);

    // ── Redraw procedural tunnel ──────────────────────────────────────────
    const { width: W, height: H } = this.scale;
    this.drawTunnel(W, H, dt);

    this.vignetteGfx.alpha =
      0.55 + Math.sin(time * 0.0015) * 0.15;

    this.cameras.main.rotation =
      Math.sin(time * 0.0014) * 0.02;

    this.cameras.main.zoom =
      1 +
      Math.sin(time * 0.002) * 0.02;

    this.cameras.main.scrollX =
      Math.sin(time * 0.0018) * 3;

    this.cameras.main.scrollY =
      Math.cos(time * 0.0015) * 2;

    if (Math.random() < 0.015) {

      this.cameras.main.shake(60, 0.0015);

    }

  }

  checkProgress() {
    if (this.checkpointIndex < CHECKPOINTS.length) {
      const cp = CHECKPOINTS[this.checkpointIndex];
      if (this.progress >= cp.progress) {
        this.triggerCheckpoint(cp);
        return;
      }
    }

    if (this.progress >= TOTAL_PROGRESS) {
      this.endChase();
    }
  }

  triggerCheckpoint(cp) {
    this.checkpointIndex++;
    // NOTE: chaseActive and inCheckpoint are NOT changed — chase continues.

    // Resolve dialogue key exactly as before (route-specific override)
    const dialogueKey = `${GameState.chosenRoute}_${cp.dialogueKey}`;

    // Look up dialogue from the same DIALOGUES registry that DialogueScene uses
    const steps = DIALOGUES[dialogueKey] || [];
    if (steps.length === 0) return;

    // Display each line sequentially as a floating thought
    this._showCheckpointLines(steps, 0);
  }

  /**
   * Recursively display checkpoint dialogue lines as floating player thoughts.
   * Visually distinct from entity whispers: centered, larger, white/lavender,
   * different font, softer timing.
   */
  _showCheckpointLines(steps, index) {
    if (index >= steps.length) return; // all lines shown, chase continues naturally

    const step = steps[index];
    const { width: W, height: H } = this.scale;

    // Determine style based on speaker
    const isNarration = !step.speaker;
    const textColor = isNarration ? '#ccbbdd' : '#f0e6ff';
    const fontSize = isNarration ? '18px' : '22px';
    const fontStyle = isNarration ? 'italic' : 'normal';

    const thought = this.add.text(W / 2, H * 0.32, step.text, {
      fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      fontSize: fontSize,
      fontStyle: fontStyle,
      color: textColor,
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
      wordWrap: { width: W * 0.6 },
      lineSpacing: 4,
    }).setOrigin(0.5).setAlpha(0).setDepth(12);

    // Gentle float upward + fade in, hold, fade out, then show next line
    this.tweens.add({
      targets: thought,
      alpha: { from: 0, to: 0.95 },
      y: thought.y - 15,
      duration: 800,
      ease: 'Sine.easeOut',
      onComplete: () => {
        // Hold visible
        this.time.delayedCall(1800, () => {
          // Fade out
          this.tweens.add({
            targets: thought,
            alpha: 0,
            y: thought.y - 20,
            duration: 600,
            ease: 'Sine.easeIn',
            onComplete: () => {
              thought.destroy();
              // Show next line
              this._showCheckpointLines(steps, index + 1);
            }
          });
        });
      }
    });
  }

  endChase() {
    if (!this.chaseActive) return;
    this.chaseActive = false;

    this.cameras.main.fadeOut(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      const endingKey = GameState.getEnding();
      const resolutionKey = `${GameState.chosenRoute}_chase_resolution_${endingKey}`;
      
      // If the route has a specific resolution dialogue, play it first
      if (DIALOGUES[resolutionKey]) {
        this.scene.start('DialogueScene', {
          dialogueKey: resolutionKey,
          nextScene: 'EndingScene',
          nextData: {}
        });
      } else {
        this.scene.start('EndingScene');
      }
    });
  }

}
