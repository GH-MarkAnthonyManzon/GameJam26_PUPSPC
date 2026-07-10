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
  background: 'bg_quadrangle',
  label: 'Quadrangle',

  phases: [
    // ── Phase 0: Initial exploration ──────────────────────────────────────
    {
      requiredClicks: 2,
      hotspots: [
        {
          id: 'coffee_cup',
          x: 150, y: 300, w: 80, h: 80,
          color: 0x8B6914,
          label: 'Coffee Cup',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Cold...' },
            { speaker: 'Protagonist', text: 'How long has this been here?' },
          ],
        },
        {
          id: 'papers',
          x: 400, y: 320, w: 100, h: 80,
          color: 0xd4c9aa,
          label: 'Pile of Papers',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Submission...' },
            { speaker: 'Protagonist', text: 'Late.' },
          ],
        },
        {
          id: 'bench',
          x: 620, y: 310, w: 120, h: 60,
          color: 0x6B4C11,
          label: 'Bench',
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
          x: 180, y: 290, w: 80, h: 100,
          color: 0x2E5EAA,
          label: 'Notebook',
          dialogueData: [
            { speaker: 'Protagonist', text: 'This handwriting...' },
            { speaker: 'Protagonist', text: "...it's mine." },
          ],
        },
        {
          id: 'sticky_notes',
          x: 420, y: 275, w: 90, h: 90,
          color: 0xF9CA24,
          label: 'Sticky Notes',
          dialogueData: [
            { speaker: 'Protagonist', text: 'Deadlines...' },
            { speaker: 'Protagonist', text: 'So many...' },
          ],
        },
        {
          id: 'laptop',
          x: 630, y: 290, w: 120, h: 80,
          color: 0x636e72,
          label: 'Laptop',
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
