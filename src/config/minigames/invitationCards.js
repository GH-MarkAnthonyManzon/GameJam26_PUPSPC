/**
 * invitationCards.js — Mini-game config for "Invitation Cards" (Lost+Deprivation — Court)
 * Source: NINTENDOGS.pdf pages 11–12 (COURT section)
 *
 * 8 sequential cards — each an invitation to Engage or Skip.
 * Three possible failure outcomes (no retry — only Aura/dialogue changes):
 *   - balanced:  completed all 8, energy > 20, toll < 70
 *   - burnout:   energy hit 0 before all 8 shown
 *   - isolated:  toll meter maxed (>= 70)
 *
 * Design lesson: constantly saying "yes" = burnout, constantly saying "no" = isolation.
 */

export const invitationCardsConfig = {
  id: 'invitationCards',
  type: 'INVITATION_CARDS',
  label: 'Invitation Cards',
  location: 'Court',

  // ── Starting values (PDF exact) ───────────────────────────────────────────
  startEnergy: 70,
  startBelonging: 0,
  startToll: 0,

  cardTimeout: 3500,    // ms per card before auto-skip (PDF: 3–4s)

  // ── Failure thresholds ────────────────────────────────────────────────────
  energyMin: 0,
  tollMax: 70,

  // ── Skip cost ─────────────────────────────────────────────────────────────
  skipTollGain: 10,     // Toll added per skip/auto-skip

  // ── Card sequence (8 invitations from PDF) ────────────────────────────────
  cards: [
    { label: 'Club Fair',        energyCost: 15, belongingGain: 12, tollGain: 0  },
    { label: 'Exam Review',      energyCost: 10, belongingGain: 8,  tollGain: 0  },
    { label: 'Study Group',      energyCost: 12, belongingGain: 10, tollGain: 0  },
    { label: 'Friend Hangout',   energyCost: 14, belongingGain: 14, tollGain: 0  },
    { label: 'Hackathon',        energyCost: 20, belongingGain: 18, tollGain: 0  },
    { label: 'Freelance Work',   energyCost: 18, belongingGain: 5,  tollGain: 0  },
    { label: 'Family Gathering', energyCost: 10, belongingGain: 10, tollGain: 0  },
    // Rest Day: special — restores energy, reduces toll (strategic opportunity)
    { label: 'Rest Day',         energyCost: -10, belongingGain: 2, tollGain: -5, special: true },
  ],

  // ── Aura evaluation ───────────────────────────────────────────────────────
  // Uses `stats.outcome` key ('balanced' | 'burnout' | 'isolated')
  aura: {
    balanced:  { points: 60 },
    good:      { points: 50 }, // minor imbalance (energy > 20, toll < 70 but not great)
    barely:    { points: 20 }, // very close to either fail condition
    burnout:   { points: 0  }, // energy reached 0
    isolated:  { points: 0  }, // toll maxed out
  },

  // ── Scene chain after mini-game ───────────────────────────────────────────
  // All paths continue to court_climax (no retry), but burnout/isolated
  // play a heavier entity dialogue before the climax per the design doc.
  outcome: {
    balanced: {
      dialogueKey: 'court_cards_balanced',
      nextScene: 'DialogueScene',
      nextData: {
        dialogueKey: 'court_climax',
        nextScene: 'ChaseScene',
        nextData: {},
      },
    },
    // burnout: player said yes to everything — energy drained
    burnout: {
      dialogueKey: 'court_cards_burnout',
      nextScene: 'DialogueScene',
      nextData: {
        dialogueKey: 'court_climax',
        nextScene: 'ChaseScene',
        nextData: {},
      },
    },
    // isolated: player said no to everything — toll maxed
    isolated: {
      dialogueKey: 'court_cards_isolated',
      nextScene: 'DialogueScene',
      nextData: {
        dialogueKey: 'court_climax',
        nextScene: 'ChaseScene',
        nextData: {},
      },
    },
  },
};
