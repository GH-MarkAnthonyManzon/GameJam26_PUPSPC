/**
 * GameState.js — Global state singleton for NINTENDOGS
 *
 * RULES (from design doc):
 *  - Aura Points are NEVER shown to the player — internal only
 *  - Good Ending = 50+ AP, Bad Ending = 49 or below (PDF authoritative)
 *  - Max possible per route: 2 mini-games × 30 AP = 60 AP
 *  - Mini-game results only affect Aura and dialogue tone — never block progression
 */

export const GameState = {
  auraPoints: 0,
  chosenRoute: null,    // 'quadrangle' | 'newbuilding' | 'court'
  ratings: {},          // { miniGameId: { rating, points } }

  reset() {
    this.auraPoints = 0;
    this.chosenRoute = null;
    this.ratings = {};
    console.log('[GameState] Reset for new run.');
  },

  addAura(points) {
    this.auraPoints += points;
    // Console only — never render this number in the game UI
    console.log(`[GameState] Aura +${points} → Total: ${this.auraPoints}`);
  },

  recordRating(miniGameId, rating, points) {
    this.ratings[miniGameId] = { rating, points };
    this.addAura(points);
    console.log(`[GameState] "${miniGameId}" rated: ${rating} (+${points} AP)`);
  },

  /** PDF: Good Ending = 50 or Above AP */
  getEnding() {
    return this.auraPoints >= 50 ? 'good' : 'bad';
  },

  /** True if >= 50 AP — drives Chase visual modifiers */
  isHighAura() {
    return this.auraPoints >= 50;
  },

  /** 0–1 ratio for Chase visual intensity (0 = worst, 1 = best) */
  getAuraRatio() {
    return Math.min(this.auraPoints / 60, 1);
  },
};
