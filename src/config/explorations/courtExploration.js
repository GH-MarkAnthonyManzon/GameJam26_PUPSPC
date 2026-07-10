/**
 * courtExploration.js — Exploration config for the Court route
 * Source: NINTENDOGS.pdf pages 27–28 (Losing Yourself theme)
 *
 * Route flow for Court:
 *   Phase 0 → Entity Encounter (Lost_1) → Phase 1 → MiniGame (invitationCards) → Climax → Chase
 */

export const courtExploration = {
  background: 'bg_court',
  label: 'Court',

  phases: [
    // ── Phase 0: Initial exploration ──────────────────────────────────────
    {
      requiredClicks: 2,
      hotspots: [
        {
          id: 'basketball',
          x: 150, y: 310, w: 80, h: 80,
          color: 0xe17055,
          label: 'Basketball',
          dialogueData: [
            { speaker: 'Protagonist', text: 'I used to play.' },
            { speaker: 'Protagonist', text: 'I was good at it, I think.' },
          ],
        },
        {
          id: 'club_posters',
          x: 400, y: 275, w: 100, h: 100,
          color: 0x6c5ce7,
          label: 'Club Posters',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Photography Club.' },
            { speaker: 'Protagonist', text: 'I almost joined.' },
          ],
        },
        {
          id: 'music_equipment',
          x: 625, y: 295, w: 110, h: 90,
          color: 0x00b894,
          label: 'Music Equipment',
          dialogueData: [
            { speaker: 'Protagonist', text: 'I had a keyboard at home.' },
            { speaker: 'Protagonist', text: 'I sold it for textbooks.' },
          ],
        },
      ],
      onComplete: {
        nextScene: 'DialogueScene',
        nextData: {
          dialogueKey: 'court_lost_1',
          nextScene: 'ExplorationScene',
          nextData: { routeKey: 'court', phase: 1 },
        },
      },
    },

    // ── Phase 1: Memory discovery ─────────────────────────────────────────
    {
      requiredClicks: 2,
      hotspots: [
        {
          id: 'photos',
          x: 175, y: 300, w: 100, h: 80,
          color: 0xfdcb6e,
          label: 'Old Photos',
          dialogueData: [
            { speaker: 'Protagonist', text: "Everyone's smiling." },
            { speaker: 'Protagonist', text: 'When was this?' },
          ],
        },
        {
          id: 'certificates',
          x: 415, y: 285, w: 110, h: 90,
          color: 0xffeaa7,
          label: 'Certificates',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Perfect attendance.' },
            { speaker: 'Protagonist', text: "I was there, but I wasn't." },
          ],
        },
        {
          id: 'sketchbook',
          x: 625, y: 295, w: 90, h: 105,
          color: 0xb2bec3,
          label: 'Old Sketchbook',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Mine.' },
            { speaker: 'Protagonist', text: "I didn't know I left this here." },
          ],
        },
      ],
      onComplete: {
        // Court has only 1 mini-game (Invitation Cards) then climax
        nextScene: 'MiniGameScene',
        nextData: { configKey: 'invitationCards' },
      },
    },
  ],
};
