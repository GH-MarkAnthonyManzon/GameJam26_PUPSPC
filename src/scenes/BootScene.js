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
    // ── Backgrounds ─────────────────────────────────────────────────────────
    this.load.image('bg_comlab', 'assets/backgrounds/comlab.png');
    this.load.image('bg_outside', 'assets/backgrounds/outside.png');
    this.load.image('bg_monitor', 'assets/backgrounds/monitor.png');
    this.load.image('bg_court', 'assets/backgrounds/court.png');
    this.load.image('bg_door', 'assets/backgrounds/door.png');
    this.load.image('bg_ground', 'assets/backgrounds/ground.png');
    this.load.image('bg_hallway', 'assets/backgrounds/hallway.png');
    this.load.image('bg_outsideAVR', 'assets/backgrounds/outsideAVR.png');
    this.load.image('bg_comlab', 'assets/backgrounds/comlab.png');
    this.load.image('bg_quadrangle', 'assets/backgrounds/outside.png');
    this.load.image('bg_outside_avr', 'assets/backgrounds/outsideAVR.png');
    this.load.image('bg_stairs', 'assets/stairs.png');
    this.load.image('bg_library', 'assets/library.png');
    this.load.image('bg_PHONE', 'assets/PHONE.png');

    this.load.image('bg_MAP', 'assets/MAP.png');

    // ── Portraits ───────────────────────────────────────────────────────────
    this.load.image('port_mc_default', 'assets/portraits/protagonist_default.png');
    this.load.image('port_mc_shocked', 'assets/portraits/protagonist_shocked.png');
    this.load.image('port_burnout', 'assets/portraits/BURNOUT.png');
    this.load.image('port_lost', 'assets/portraits/LOST.png');
    this.load.image('portrait_lost', 'assets/portraits/LOST.png');
    this.load.image('portrait_regret', 'assets/portraits/REGRET.png');
    this.load.image('portrait_burnout', 'assets/portraits/BURNOUT.png');
    this.load.image('portrait_despair', 'assets/DESPAIR.png');
    this.load.image('port_deprivation', 'assets/portraits/depravation.png');
    this.load.image('portrait_deprivation', 'assets/portraits/depravation.png');
    this.load.image('port_mc_tired', 'assets/sprites/protagonist/mc_tired.png');
    this.load.image('port_mc_monitor', 'assets/sprites/protagonist/mc_monitor.png');
    this.load.image('port_mc_sleeping', 'assets/sprites/protagonist/mc_sleeping.png');
    this.load.image('port_mc_eyes_closed', 'assets/sprites/protagonist/mc_eyes_closed.png');
    this.load.image('port_grad_cap', 'assets/gradCap.png');
    this.load.image('port_missing_poster', 'assets/MISSINGPOSTER.png');

    // ── Character Sprites ───────────────────────────────────────────────────
    this.load.image('spr_mc_default', 'assets/sprites/protagonist/mc_default.png');
    this.load.image('spr_mc_shocked', 'assets/sprites/protagonist/mc_shocked.png');
    this.load.image('spr_mc_eyes_closed', 'assets/sprites/protagonist/mc_eyes_closed.png');
    this.load.image('spr_mc_monitor', 'assets/sprites/protagonist/mc_monitor.png');
    this.load.image('spr_mc_sleeping', 'assets/sprites/protagonist/mc_sleeping.png');
    this.load.image('spr_mc_tired', 'assets/sprites/protagonist/mc_tired.png');
    this.load.image('sprite_grad_cap', 'assets/gradCap.png');
    this.load.image('sprite_missing_poster', 'assets/MISSINGPOSTER.png');

    // ── Entity Sprites ──────────────────────────────────────────────────────
    this.load.image('spr_entity_burnout', 'assets/sprites/entities/BURNOUT.png');
    this.load.image('spr_entity_lost', 'assets/sprites/entities/LOST.png');
    this.load.image('sprite_lost', 'assets/sprites/entities/LOST.png');
    this.load.image('sprite_regret', 'assets/sprites/entities/REGRET.png');
    this.load.image('sprite_burnout', 'assets/sprites/entities/BURNOUT.png');
    this.load.image('sprite_despair', 'assets/DESPAIR.png');
    this.load.image('spr_entity_deprivation', 'assets/sprites/entities/depravation.png');
    this.load.image('sprite_deprivation', 'assets/sprites/entities/depravation.png');
    
    // ── Clues ───────────────────────────────────────────────────────────────
    this.load.image('clue_CPB', 'assets/clues/CPB.png');
    this.load.image('clue_NSL', 'assets/clues/NSL.png');
    this.load.image('clue_dbw', 'assets/dbw.png');
    this.load.image('clue_BTC', 'assets/BTC.png');
    this.load.image('clue_BPI', 'assets/BPI.png');
    this.load.image('clue_PCS', 'assets/PCS.png');
    // ── Audio ───────────────────────────────────────────────────────────────
    this.load.audio('bgm_afternoon', 'audios/sfx/afternoon.mp3');
    this.load.audio('bgm_main', 'audios/sfx/BGM.mp3');
    this.load.audio('bgm_burnout_dialogue', 'audios/sfx/burnout dialouge.mp3');
    this.load.audio('bgm_burnout_minigame', 'audios/sfx/burnout minigame.mp3');
    this.load.audio('bgm_regret_minigame', 'audios/sfx/baliko katawan minigame.mp3');
    this.load.audio('bgm_regret_dialogue', 'audios/sfx/character na baliko katawan dialogue.mp3');
    this.load.audio('sfx_gravel', 'audios/Footsteps sFX/gravel.mp3');
    this.load.audio('bgm_good_ending', 'audios/sfx/good ending.mp3');
    this.load.audio('bgm_bad_ending', 'audios/sfx/bad ending.mp3');
    this.load.audio('sfx_hallway', 'audios/Footsteps sFX/hallway.mp3');
    this.load.audio('sfx_heavy', 'audios/Footsteps sFX/heavy.mp3');
    this.load.audio('bgm_chase', 'audios/sfx/chase scene (climax).mp3');
    this.load.audio('bgm_twisted_minigame', 'audios/sfx/TWISTED MINIGAME.mp3');
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
    this.makeRect('portrait_lost',         0x81ecec, 120, 150); // teal
    this.makeRect('portrait_despair',      0x2d2d2d, 120, 150); // near black (Entity E)

    // ── Chase parallax layers ─────────────────────────────────────────────
    // (Reserved for future chase assets)

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
