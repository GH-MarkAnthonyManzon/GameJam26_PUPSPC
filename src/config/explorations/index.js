/**
 * index.js — Central exploration config registry
 * ExplorationScene looks up routes by string key.
 *
 * Usage:
 *   import { EXPLORATIONS } from '../config/explorations/index.js';
 *   const routeConfig = EXPLORATIONS[data.routeKey]; // 'quadrangle' | 'newbuilding' | 'court'
 */

import { quadrangleExploration } from './quadrangleExploration.js';
import { newbuildingExploration } from './newbuildingExploration.js';
import { courtExploration } from './courtExploration.js';

export const EXPLORATIONS = {
  quadrangle: quadrangleExploration,
  newbuilding: newbuildingExploration,
  court: courtExploration,
};
