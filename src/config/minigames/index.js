/**
 * index.js — Central mini-game config registry
 * MiniGameScene looks up configs by string key.
 *
 * Usage:
 *   import { MINIGAME_CONFIGS } from '../config/minigames/index.js';
 *   const config = MINIGAME_CONFIGS[data.configKey];
 */

import { pushThroughConfig } from './pushThrough.js';
import { dismissThoughtsConfig } from './dismissThoughts.js';
import { hallwayOfDoorsConfig } from './hallwayOfDoors.js';
import { invitationCardsConfig } from './invitationCards.js';

export const MINIGAME_CONFIGS = {
  pushThrough:     pushThroughConfig,
  dismissThoughts: dismissThoughtsConfig,
  hallwayOfDoors:  hallwayOfDoorsConfig,
  invitationCards: invitationCardsConfig,
};
