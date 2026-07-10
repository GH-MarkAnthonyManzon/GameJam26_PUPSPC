/**
 * BootScene.js — Generates all placeholder textures procedurally
 *
 * All art is colored rectangles — easily swappable by designers later.
 * Asset swap policy: all references go through texture keys (strings),
 * never hardcoded paths. Final art = drop file into assets/, update key
 * in BootScene's preload/create only.
 */


export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('chase_bg_placeholder', 'assets/chase_bg_placeholder.png');
    this.load.image('chase_sky', 'assets/chase_sky.png');
    this.load.image('chase_building', 'assets/chase_building.png');
    this.load.image('chase_ground', 'assets/chase_ground.png');
    this.load.image('chase_gate', 'assets/chase_gate.png');
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // ── Backgrounds (full-screen) ─────────────────────────────────────────
    this.makeRect('bg_lab',         0x1a1a2e, W, H); // computer lab — dark navy
    this.makeRect('bg_outside',     0x0d1b2a, W, H); // campus exterior — very dark blue
    this.makeRect('bg_hub',         0x0d1b2a, W, H); // campus map — same as outside
    this.makeRect('bg_quadrangle',  0x0d2818, W, H); // quadrangle — dark green-black
    this.makeRect('bg_newbuilding', 0x14213d, W, H); // new building — dark blue-grey
    this.makeRect('bg_court',       0x1c1010, W, H); // court — dark red-black
    this.makeRect('bg_chase',       0x050505, W, H); // chase — near black

    // ── Ending backgrounds ────────────────────────────────────────────────
    this.makeRect('ending_good', 0x1a3a2a, W, H); // dim morning green
    this.makeRect('ending_bad',  0x0a0000, W, H); // deep red-black

    // ── Character portraits (120×150) ─────────────────────────────────────
    this.makeRect('portrait_protagonist',  0x6c5ce7, 120, 150); // purple
    this.makeRect('portrait_professor',    0x74b9ff, 120, 150); // light blue
    this.makeRect('portrait_burnout',      0xff7675, 120, 150); // coral red
    this.makeRect('portrait_regret',       0xa29bfe, 120, 150); // soft purple
    this.makeRect('portrait_lost',         0x81ecec, 120, 150); // teal
    this.makeRect('portrait_deprivation',  0xffeaa7, 120, 150); // warm yellow
    this.makeRect('portrait_despair',      0x2d2d2d, 120, 150); // near black (Entity E)

    // ── Chase parallax layers ─────────────────────────────────────────────
    // Removed makeRect for chase layers, now using chase_bg_placeholder loaded in preload

    // ── Chase entity & obstacles ──────────────────────────────────────────
    this.makeRect('entity_despair_chase', 0x080808, 160, 400);
    this.makeRect('chase_obstacle',       0x550000, 100, 100); // dark red block

    // ── Utility ──────────────────────────────────────────────────────────
    this.makeRect('pixel', 0xffffff, 1, 1); // 1x1 white — for tinted overlays

    // ── Go to title ──────────────────────────────────────────────────────
    this.scene.start('TitleScene');
  }

  /**
   * Creates a solid-color rectangle as a named Phaser texture.
   * Textures persist across scenes — generated once, reused everywhere.
   */
  makeRect(key, color, w, h) {
    const g = this.add.graphics();
    g.fillStyle(color, 1);
    g.fillRect(0, 0, w, h);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
