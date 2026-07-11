/**
 * quadrangleExploration.js — Exploration config for the Quadrangle route
 * Source: NINTENDOGS.pdf pages 17–20 (Academic Burnout theme)
 *
 * Structure:
 *   background: texture key for the scene background
 *   phases[]:   array of exploration phases (phase 0 = initial, phase 1 = deeper)
 *     requiredClicks: how many hotspots must be clicked before CONTINUE appears
 *     hotspots[]:     clickable objects with inline monologue dialogue
 *     onComplete:     { nextScene, nextData } — where CONTINUE leads
 *
 * Hotspot inline dialogueData: [{ speaker, text }]
 *   Rendered as a popup directly in ExplorationScene (no scene switch)
 */

export const quadrangleExploration = {
  background: 'bg_outside',
  label: 'Quadrangle',

  blurIntensity: 4, // Configurable background blur during popups
  phases: [
    // ── Phase 0: Initial exploration ──────────────────────────────────────
    {
      requiredClicks: 2,
      hotspots: [
        {
          id: 'coffee_cup',
          x: 150, y: 300, w: 96, h: 145,
          color: 0x8B6914,
          label: 'Coffee Cup',
          texture: 'clue_CPB',
          frameRect: { x: 76, y: 227, w: 96, h: 145 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'Cold...' },
            { speaker: 'Protagonist', text: 'How long has this been here?' },
          ],
        },
        {
          id: 'papers',
          x: 400, y: 320, w: 233, h: 308,
          color: 0xd4c9aa,
          label: 'Pile of Papers',
          texture: 'clue_CPB',
          frameRect: { x: 344, y: 86, w: 233, h: 308 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'Submission...' },
            { speaker: 'Protagonist', text: 'Late.' },
          ],
        },
        {
          id: 'bench',
          x: 620, y: 310, w: 190, h: 194,
          color: 0x6B4C11,
          label: 'Bench',
          texture: 'clue_CPB',
          frameRect: { x: 661, y: 200, w: 190, h: 194 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'I used to eat lunch here.' },
          ],
        },
      ],
      onComplete: {
        nextScene: 'DialogueScene',
        nextData: {
          dialogueKey: 'quadrangle_burnout_1',
          nextScene: 'ExplorationScene',
          nextData: { routeKey: 'quadrangle', phase: 1 },
        },
      },
    },

    // ── Phase 1: Memory discovery ─────────────────────────────────────────
    {
      requiredClicks: 2,
      hotspots: [
        {
          id: 'notebook',
          x: 180, y: 290, w: 264, h: 133,
          color: 0x2E5EAA,
          label: 'Notebook',
          texture: 'clue_NSL',
          frameRect: { x: 52, y: 229, w: 264, h: 133 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'This handwriting...' },
            { speaker: 'Protagonist', text: "...it's mine." },
          ],
        },
        {
          id: 'sticky_notes',
          x: 420, y: 275, w: 119, h: 89,
          color: 0xF9CA24,
          label: 'Sticky Notes',
          texture: 'clue_NSL',
          frameRect: { x: 400, y: 228, w: 119, h: 89 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'Deadlines...' },
            { speaker: 'Protagonist', text: 'So many...' },
          ],
        },
        {
          id: 'laptop',
          x: 630, y: 290, w: 193, h: 115,
          color: 0x636e72,
          label: 'Laptop',
          texture: 'clue_NSL',
          frameRect: { x: 630, y: 201, w: 193, h: 115 }, // Sliced from PNG
          visual: { scale: 1, offsetX: 0, offsetY: 0 },
          dialogueData: [
            { speaker: 'Protagonist', text: 'Still on...' },
            { speaker: 'Protagonist', text: 'I forgot to close the tab.' },
          ],
        },
      ],
      onComplete: {
        nextScene: 'DialogueScene',
        nextData: {
          dialogueKey: 'quadrangle_burnout_2',
          nextScene: 'MiniGameScene',
          nextData: { configKey: 'pushThrough' },
        },
      },
    },
  ],
};
