/**
 * dismissThoughts.js — Mini-game config for "Dismiss the Thoughts" (Regret — Quadrangle)
 * Source: NINTENDOGS.pdf pages 8–9 (QUADRANGLE — Regret section)
 *
 * Bubble types:
 *   Normal (70%)       — 1 click to dismiss
 *   Heavy Regret (20%) — 2 clicks, larger
 *   False Hope (10%)   — 1 click, but spawns 2 more on click
 *
 * Fail condition: 8 unclicked bubbles simultaneously triggers entity manifestation
 * After Dismiss Thoughts → Climax dialogue → Chase (always, regardless of outcome)
 */

export const dismissThoughtsConfig = {
  id: 'dismissThoughts',
  type: 'DISMISS_THOUGHTS',
  bgm: 'bgm_regret_minigame',
  label: 'Dismiss the Thoughts',
  background: 'bg_outside',
  location: 'Quadrangle',

  // ── Core mechanics (per NINTENDOGS.md spec) ───────────────────────────────
  duration: 20,             // seconds
  spawnRate: 3,             // bubbles per spawnInterval
  spawnInterval: 2000,      // ms
  maxBubbles: 12,           // max simultaneous bubbles on screen
  failThreshold: 8,         // 8 unclicked bubbles triggers entity manifestation
  bubbleDriftDelay: 5000,   // ms before bubbles start drifting to center

  // ── Bubble type distribution ──────────────────────────────────────────────
  bubbleTypes: {
    normal: {
      chance: 0.70,
      clicksRequired: 1,
      sizeMultiplier: 1.0,
      spawnExtra: 0,
      messages: [
        "You should've joined that org.",
        'They became successful.',
        'You wasted four years.',
        'Too late now.',
        "You're falling behind.",
        'Everyone moved on.',
      ],
    },
    heavy: {
      chance: 0.20,
      clicksRequired: 2,
      sizeMultiplier: 1.5,
      spawnExtra: 0,
      messages: [
        'You failed them.',
        'You let everyone down.',
        'You never tried hard enough.',
      ],
    },
    falseHope: {
      chance: 0.10,
      clicksRequired: 1,
      sizeMultiplier: 1.0,
      spawnExtra: 0,           // removed extra spawn to prevent sudden bombardment
      messages: [
        "It'll get better.",
        'You still have time.',
        'Maybe next semester.',
      ],
    },
  },

  // ── Aura evaluation ───────────────────────────────────────────────────────
  // Uses `stats.maxAccumulated` (highest simultaneous untouched bubble count)
  aura: {
    excellent: { maxAccumulated: 2, points: 30 }, // very few accumulated
    good:      { maxAccumulated: 4, points: 20 }, // manageable
    barely:    { maxAccumulated: 7, points: 10 }, // close to failure
    failed:    { maxAccumulated: 8, points: 0  }, // reached fail threshold
  },

  // ── Scene chain after mini-game ───────────────────────────────────────────
  // Both outcomes lead to the same climax (no retry — only Aura changes)
  outcome: {
    excellent: {
      nextScene: 'DialogueScene',
      nextData: { dialogueKey: 'quadrangle_climax_excellent', nextScene: 'ChaseScene' },
    },
    good: {
      nextScene: 'DialogueScene',
      nextData: { dialogueKey: 'quadrangle_climax_good', nextScene: 'ChaseScene' },
    },
    barely: {
      nextScene: 'DialogueScene',
      nextData: { dialogueKey: 'quadrangle_climax_barely', nextScene: 'ChaseScene' },
    },
    failed: {
      nextScene: 'DialogueScene',
      nextData: { dialogueKey: 'quadrangle_climax_failed', nextScene: 'ChaseScene' },
    },
  },
};
