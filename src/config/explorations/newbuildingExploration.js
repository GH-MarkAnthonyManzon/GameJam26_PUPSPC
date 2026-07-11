/**
 * newbuildingExploration.js — Exploration config for the New Building route
 * Source: NINTENDOGS.pdf pages 25–26 (Fear of the Future theme)
 *
 * Route flow for New Building:
 *   Phase 0 → Entity Encounter (Regret_1) → Phase 1 → MiniGame (hallwayOfDoors) → Climax → Chase
 */

export const newbuildingExploration = {
  background: 'bg_hallway',
  label: 'New Building',

  phases: [
    // ── Phase 0: Exploration Begins (Scene 1) ─────────────────────────────
    {
      requiredClicks: 3,
      hotspots: [
        {
          id: 'classroom_door',
          x: 150, y: 300, w: 100, h: 80,
          color: 0x2d3436,
          label: 'Classroom Door',
          texture: 'clue_dbw',
          frameRect: { x: 220, y: 572, w: 704, h: 1272 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: 'Protagonist', text: "Looks like everyone's already gone home..." },
            { speaker: null, text: "She reaches for the small window. The classroom is empty. Every chair pushed in neatly. Everything exactly where it should be. Yet... One chair slowly slides backward. On its own." },
            { speaker: null, text: "She immediately steps away." },
            { speaker: 'Protagonist', text: "..." },
            { speaker: 'Protagonist', text: "No. I didn't see that." },
          ],
        },
        {
          id: 'bulletin_board',
          x: 400, y: 275, w: 130, h: 100,
          color: 0x3498db,
          label: 'Bulletin Board',
          texture: 'clue_dbw',
          frameRect: { x: 1260, y: 572, w: 1160, h: 932 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: null, text: "Old announcements. Hackathon posters. Club recruitment. Internship opportunities. Most have already expired." },
            { speaker: 'Protagonist', text: "..." },
            { speaker: 'Protagonist', text: "I kept saying I'd join one someday.",
              choices: [
                {
                  text: "Maybe next semester.",
                  nextSteps: [
                    { speaker: 'Protagonist', text: "Maybe next semester. There was always another deadline first." }
                  ]
                },
                {
                  text: "I was too busy.",
                  nextSteps: [
                    { speaker: 'Protagonist', text: "I was too busy. Trying to survive everything else." }
                  ]
                }
              ]
            },
            { speaker: 'Protagonist', text: "At least that's what I kept telling myself." },
            { speaker: null, text: "As the protagonist walks away... One poster quietly falls from the board. Landing face-up. It reads: YOUR FUTURE STARTS HERE." },
            { speaker: null, text: "The lights flicker. The word FUTURE appears briefly smudged. Almost like someone scratched across it." },
          ],
        },
        {
          id: 'classroom_window',
          x: 625, y: 305, w: 90, h: 80,
          color: 0xdfe6e9,
          label: 'Classroom Window',
          texture: 'clue_dbw',
          frameRect: { x: 2504, y: 572, w: 968, h: 932 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: null, text: "She looks outside. She should be able to see the quadrangle. Instead... She sees another hallway. Exactly like the one she's standing in." },
            { speaker: null, text: "She blinks. The normal campus returns." },
            { speaker: 'Protagonist', text: "Nope. Definitely sleep deprivation." },
            { speaker: null, text: "She walks away." },
          ],
        },
      ],
      onComplete: {
        nextScene: 'DialogueScene',
        nextData: {
          dialogueKey: 'newbuilding_regret_1',
          nextScene: 'ExplorationScene',
          nextData: { routeKey: 'newbuilding', phase: 1 },
        },
      },
    },

    // ── Phase 1: Memory discovery (Scene 2) ───────────────────────────────
    {
      requiredClicks: 3,
      hotspots: [
        {
          id: 'graduation_banner',
          x: 175, y: 295, w: 100, h: 80,
          color: 0xd63031,
          label: 'Graduation Banner',
          texture: 'clue_BTC',
          frameRect: { x: 108, y: 684, w: 1160, h: 704 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: null, text: 'A faded tarpaulin hangs from the ceiling. It reads: "Congratulations, Graduating Class!" The smiling faces printed on it stare straight ahead.' },
            { speaker: 'Protagonist', text: 'Graduation...' },
            { speaker: null, text: 'She stares quietly.' },
            { speaker: 'Protagonist', text: "I wonder... if I'll ever make it there." },
            { speaker: null, text: 'A voice answers. Softly.' },
            { speaker: '???', text: 'You asked yourself that before.' },
            { speaker: null, text: 'The protagonist freezes.' },
            { speaker: 'Protagonist', text: '...' },
            { speaker: null, text: 'She slowly turns around. No one.' },
            { speaker: '???', text: 'You never answered.' },
            { speaker: null, text: 'Silence.' },
            { speaker: 'Protagonist', text: "... Who's there?" },
            { speaker: null, text: 'No response.' },
          ],
        },
        {
          id: 'trophy_display',
          x: 420, y: 285, w: 110, h: 90,
          color: 0x74b9ff,
          label: 'Trophy Display',
          texture: 'clue_BTC',
          frameRect: { x: 1616, y: 628, w: 528, h: 704 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: null, text: 'Inside a dusty display case are old awards. Programming competitions. Hackathons. Research conferences. One empty space remains. A small nameplate beneath it reads: "Reserved."' },
            { speaker: 'Protagonist', text: 'Reserved...?' },
            { speaker: null, text: 'She leans closer. The engraved letters slowly change. For a brief second... They read her name. She immediately blinks. The name disappears.' },
            { speaker: 'Protagonist', text: '... No... I couldn\'t have—' },
            { speaker: '???', text: 'You thought it\'d be yours.' },
            { speaker: null, text: 'The protagonist quickly steps away.' },
            { speaker: 'Protagonist', text: 'I never expected anything like that... Or maybe I did. But then what happened?' },
            { speaker: '???', text: 'Didn\'t you?',
              choices: [
                {
                  text: "I never said that.",
                  nextSteps: [
                    { speaker: 'Protagonist', text: "I never said that. Don't put words in my mouth." }
                  ]
                },
                {
                  text: "...Maybe.",
                  nextSteps: [
                    { speaker: 'Protagonist', text: "...Maybe. But it's too late now." }
                  ]
                }
              ]
            },
            { speaker: null, text: 'Silence. The hallway suddenly grows quieter.' },
          ],
        },
        {
          id: 'classroom_204',
          x: 625, y: 295, w: 80, h: 110,
          color: 0x636e72,
          label: 'Classroom 204',
          texture: 'clue_BTC',
          frameRect: { x: 2640, y: 340, w: 696, h: 1388 },
          visual: { scale: 0.15, offsetY: -20 },
          dialogueData: [
            { speaker: null, text: 'The classroom door is slightly open. Inside sits a single desk. On it rests a notebook. The protagonist slowly opens it.' },
            { speaker: null, text: 'Inside are handwritten notes. Algorithms. Flowcharts. Database diagrams. Entire pages crossed out. The final page reads: "Not good enough." Over. And over. And over.' },
            { speaker: 'Protagonist', text: '... That\'s...' },
            { speaker: null, text: 'The handwriting is unmistakable. It\'s hers.' },
            { speaker: '???', text: 'You wrote that.' },
            { speaker: null, text: 'The protagonist slams the notebook shut.' },
            { speaker: 'Protagonist', text: 'Stop...' },
            { speaker: null, text: 'Silence. Then...' },
            { speaker: '???', text: 'Why? Because it\'s true?' },
            { speaker: null, text: 'The lights flicker violently. The protagonist stumbles backward.' },
            { speaker: 'Protagonist', text: 'Enough!' },
            { speaker: null, text: 'Her own voice echoes throughout the hallway. No reply follows. Only silence.' },
          ],
        },
      ],
      onComplete: {
        nextScene: 'DialogueScene',
        nextData: {
          dialogueKey: 'newbuilding_transition_2',
          nextScene: 'MiniGameScene',
          nextData: { configKey: 'hallwayOfDoors' },
        },
      },
    },
  ],
};
