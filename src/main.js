/**
 * main.js — Phaser game bootstrap
 * Registers all scenes and configures the game instance.
 * No game logic here — this file only wires scenes together.
 *
 * Phaser is loaded as a UMD global via <script> tag in index.html.
 */

import { BootScene }        from './scenes/BootScene.js';
import { TitleScene }       from './scenes/TitleScene.js';
import { DialogueScene }    from './scenes/DialogueScene.js';
import { HubScene }         from './scenes/HubScene.js';
import { ExplorationScene } from './scenes/ExplorationScene.js';
import { MiniGameScene }    from './scenes/MiniGameScene.js';
import { ChaseScene }       from './scenes/ChaseScene.js';
import { EndingScene }      from './scenes/EndingScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',

  // Responsive scaling — maintains 800×600 aspect ratio
  scale: {
    mode:       Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  // High-fidelity rendering configuration
  resolution: 2,
  antialias: true,
  antialiasGL: true,

  // Scene order = load order; BootScene runs first
  scene: [
    BootScene,
    TitleScene,
    DialogueScene,
    HubScene,
    ExplorationScene,
    MiniGameScene,
    ChaseScene,
    EndingScene,
  ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);
