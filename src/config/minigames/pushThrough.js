/**
 * pushThrough.js — Mini-game config for "Push Through" (Burnout — Quadrangle)
 * Source: NINTENDOGS.pdf pages 7–8 (QUADRANGLE — Burnout section)
 *
 * All numeric values are exact from the PDF.
 * Aura thresholds use data — evaluated in MiniGameScene.
 *
 * outcome.success: energy never hit 0 before 20s timer ended
 * outcome.fail:    energy reached 0
 *
 * After Push Through → Dismiss Thoughts (always, regardless of outcome)
 */

export const pushThroughConfig = {
  id: 'pushThrough',
  type: 'PUSH_THROUGH',
  label: 'Push Through',
  location: 'Quadrangle',

  // ── Core mechanics (PDF exact values) ────────────────────────────────────
  duration: 20,          // seconds
  startEnergy: 60,       // starting % (0–100)
  drainRate: 2,          // % lost per drainInterval
  drainInterval: 500,    // ms (2% every 0.5s = 4%/s total)
  clickRestore: 8,       // % restored per valid click
  spamRestore: 4,        // % restored if spamming (within cooldown window)
  clickCooldown: 350,    // ms between valid clicks

  // ── Intrusive thoughts (flash briefly, can't be clicked) ─────────────────
  intrusiveThoughts: [
    "Don't stop.",
    "Almost there.",
    "Everyone else can.",
    "You're so close.",
    "Just a little more.",
    "Why is this so hard for you?",
  ],
  thoughtInterval: [3000, 5000], // random ms between thoughts
  thoughtDuration: 1000,         // ms each thought stays on screen

  // ── Visual feedback zones (from PDF) ─────────────────────────────────────
  // Used by MiniGameScene to apply screen effects
  visualZones: [
    { above: 60, effect: 'normal' },
    { above: 40, effect: 'desaturate' },
    { above: 20, effect: 'heartbeat_vignette' },
    { above: 0,  effect: 'entity_flash' },
  ],

  // ── Aura evaluation (PDF Performance Evaluation section) ─────────────────
  // Evaluated at game end using `stats.minEnergy`
  aura: {
    excellent: { minEnergy: 50, points: 30 }, // Energy never below 50%
    good:      { minEnergy: 30, points: 20 }, // Lowest energy 30–49%
    barely:    { minEnergy: 1,  points: 10 }, // Dropped below 30% but survived
    failed:    { minEnergy: 0,  points: 0  }, // Energy reached 0
  },

  // ── Scene chain after mini-game ───────────────────────────────────────────
  outcome: {
    success: {
      dialogueKey: 'quadrangle_pushthrough_success',
      nextScene: 'MiniGameScene',
      nextData: { configKey: 'dismissThoughts' },
    },
    fail: {
      dialogueKey: 'quadrangle_pushthrough_fail',
      nextScene: 'MiniGameScene',
      nextData: { configKey: 'dismissThoughts' },
    },
  },
};
