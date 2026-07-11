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
  bgm: 'bgm_burnout_dialogue',
  label: 'Invitation Cards',
  location: 'Court',

  // ── Starting values (PDF exact) ───────────────────────────────────────────
  startEnergy: 70,
  startBelonging: 0,
  startToll: 0,

  cardTimeout: 5000,    // ms per card before auto-skip (Updated for readability)

  // ── Failure thresholds ────────────────────────────────────────────────────
  energyMin: 0,
  tollMax: 70,

  // ── Skip cost ─────────────────────────────────────────────────────────────
  skipTollGain: 10,     // Toll added per skip/auto-skip

  // ── Card sequence (8 invitations from PDF) ────────────────────────────────
  cards: [
    { label: 'Club Fair',        description: 'Join multiple clubs to build connections, but you already feel stretched too thin.', energyCost: 15, belongingGain: 12, tollGain: 0  },
    { label: 'Exam Review',      description: 'A classmate invites you to cram, guaranteeing better scores at the cost of your sleep.', energyCost: 10, belongingGain: 8,  tollGain: 0  },
    { label: 'Study Group',      description: 'Help struggling peers pass, though you barely have time to finish your own work.', energyCost: 12, belongingGain: 10, tollGain: 0  },
    { label: 'Friend Hangout',   description: 'Your friends invite you out after weeks apart, but you\'re already mentally exhausted from consecutive deadlines.', energyCost: 14, belongingGain: 14, tollGain: 0  },
    { label: 'Hackathon',        description: 'An incredible resume builder that demands 48 hours of non-stop, draining focus.', energyCost: 20, belongingGain: 18, tollGain: 0  },
    { label: 'Freelance Work',   description: 'Take on a side project for extra cash, ignoring how badly your body needs a break.', energyCost: 18, belongingGain: 5,  tollGain: 0  },
    { label: 'Family Gathering', description: 'Your family expects you to visit, but the emotional labor feels overwhelming right now.', energyCost: 10, belongingGain: 10, tollGain: 0  },
    // Rest Day: special — restores energy, reduces toll (strategic opportunity)
    { label: 'Rest Day',         description: 'Turn off your phone and sleep. You might miss out, but you can finally breathe.', energyCost: -10, belongingGain: 2, tollGain: -5, special: true },
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
