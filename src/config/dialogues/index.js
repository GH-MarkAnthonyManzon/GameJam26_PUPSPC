/**
 * index.js — Central dialogue registry
 * Import DIALOGUES and look up by string key from any scene.
 *
 * Usage in DialogueScene:
 *   import { DIALOGUES } from '../config/dialogues/index.js';
 *   const steps = DIALOGUES[data.dialogueKey];
 */

import { prologue } from './prologue.js';
import {
  quadrangle_burnout_1,
  quadrangle_burnout_2,
  quadrangle_pushthrough_success,
  quadrangle_pushthrough_fail,
  quadrangle_dismiss_success,
  quadrangle_dismiss_fail,
  quadrangle_climax_excellent,
  quadrangle_climax_good,
  quadrangle_climax_barely,
  quadrangle_climax_failed,
  quadrangle_chase_checkpoint_1,
  quadrangle_chase_checkpoint_2,
  quadrangle_chase_checkpoint_3,
  quadrangle_chase_resolution_good,
  quadrangle_chase_resolution_bad,
} from './quadrangle.js';
import {
  newbuilding_intro,
  newbuilding_regret_1,
  newbuilding_regret_1_confront,
  newbuilding_regret_1_loop,
  newbuilding_transition_2,
  newbuilding_climax_excellent,
  newbuilding_climax_good,
  newbuilding_climax_barely,
  newbuilding_climax_failed,
  newbuilding_chase_checkpoint_1,
  newbuilding_chase_checkpoint_2,
  newbuilding_chase_checkpoint_3,
  newbuilding_chase_resolution_good,
  newbuilding_chase_resolution_bad,
} from './newbuilding.js';
import {
  court_lost_1,
  court_climax,
  court_cards_balanced,
  court_cards_burnout,
  court_cards_isolated,
} from './court.js';
import { ending_good, ending_bad } from './endings.js';
import {
  chase_checkpoint_1,
  chase_checkpoint_2,
  chase_checkpoint_3,
} from './chase.js';

export const DIALOGUES = {
  // Prologue
  prologue,

  // Quadrangle route
  quadrangle_burnout_1,
  quadrangle_burnout_2,
  quadrangle_pushthrough_success,
  quadrangle_pushthrough_fail,
  quadrangle_dismiss_success,
  quadrangle_dismiss_fail,
  quadrangle_climax_excellent,
  quadrangle_climax_good,
  quadrangle_climax_barely,
  quadrangle_climax_failed,
  quadrangle_chase_checkpoint_1,
  quadrangle_chase_checkpoint_2,
  quadrangle_chase_checkpoint_3,
  quadrangle_chase_resolution_good,
  quadrangle_chase_resolution_bad,

  // New Building route
  newbuilding_intro,
  newbuilding_regret_1,
  newbuilding_regret_1_confront,
  newbuilding_regret_1_loop,
  newbuilding_transition_2,
  newbuilding_climax_excellent,
  newbuilding_climax_good,
  newbuilding_climax_barely,
  newbuilding_climax_failed,
  newbuilding_chase_checkpoint_1,
  newbuilding_chase_checkpoint_2,
  newbuilding_chase_checkpoint_3,
  newbuilding_chase_resolution_good,
  newbuilding_chase_resolution_bad,

  // Court route
  court_lost_1,
  court_climax,
  court_cards_balanced,
  court_cards_burnout,
  court_cards_isolated,

  // Endings
  ending_good,
  ending_bad,

  // Chase checkpoints
  chase_checkpoint_1,
  chase_checkpoint_2,
  chase_checkpoint_3,
};
