# PROJECT CONTEXT — NINTENDOGS (Horror Visual Novel Clicker)
*This file is the persistent source of truth for this project. Re-read it before starting any new task. Do not deviate from these constraints without asking first.*

## HARD CONSTRAINTS (never violate these)

1. **Engine: Phaser 3, JavaScript. Nothing else.** No Godot, no Unity, no Three.js, no React game libraries. If a task seems to need something else, flag it — do not silently switch tools.
2. **2D rendering only, including the Final Chase sequence.** The "3D chase" mentioned anywhere in design docs is a naming leftover — it is a 2D first-person-perspective illusion (parallax/scaling), NOT real 3D. Never generate WebGL 3D or camera-rig code for this.
3. **No duplicate logic across the 3 locations or 4 mini-games.** Quadrangle, New Building, and Court all reuse the same scene classes with different config/data. The 4 mini-games (Push Through, Dismiss the Thoughts, Hallway of Doors, Invitation Cards) all reuse one generic `MiniGameScene` with different config objects. If you catch yourself writing similar logic a second time, stop and refactor into shared config-driven code instead.
4. **Placeholder-first asset policy.** Use colored rectangles, Phaser default text, and basic shapes for all art/audio right now. Never block functionality on final assets. All asset references must be swappable via a single config/path change later, not scattered through logic.
5. **No retry/fail states in mini-games.** Every mini-game always proceeds to the next stage regardless of performance. Performance only affects a hidden Aura Points value and dialogue tone — never blocks progression. Do not implement "game over" or "try again" screens for mini-tasks.
6. **Final Chase player control = WASD movement along a fixed/guided path.** No free-roam, no real pathfinding, no branching routes. Movement is essentially a forward-progress counter driven by W/forward input; A/D are cosmetic camera drift or minor dodge prompts only. Disorientation is visual/atmospheric, not mechanical.
7. **Aura Points are always hidden from the player.** Never render an Aura counter, meter, or number in the UI. It is tracked internally only, used to select dialogue tone and the final ending branch.

## PROJECT STRUCTURE PRINCIPLE

- `scenes/` — reusable scene classes only (HubScene, ExplorationScene, DialogueScene, MiniGameScene, ChaseScene, EndingScene). No location-specific or minigame-specific scene files.
- `data/` or `config/` — all per-location and per-minigame variation lives here as JS objects/JSON (dialogue scripts, mini-game configs, hotspot definitions).
- `assets/placeholder/` — current placeholder art/audio, structured to mirror where final assets will eventually go.

## CURRENT PROJECT STATE
*(Update this section yourself as you progress — keep it current so any AI tool picking up the project mid-build has accurate context.)*

- [ ] Phaser project scaffolded and running in browser
- [ ] Generic MiniGameScene built and tested with 1 config
- [ ] All 4 mini-game configs written
- [ ] DialogueScene built and tested
- [ ] One full location loop wired end-to-end (Hub → Exploration → Dialogue → MiniGame → MiniGame → back to Hub)
- [ ] Remaining 2 locations wired
- [ ] ChaseScene built
- [ ] Aura → Ending branch wired
- [ ] Placeholder assets swapped for final art/audio

## DEADLINE
Game jam submission due **July 5, 11:59 PM**. Every suggestion should account for remaining time — flag scope risks rather than silently gold-plating anything.

## WHEN UNSURE
If a design doc detail is ambiguous or missing, ask rather than assuming — this is a first-time solo dev project and wrong assumptions compound quickly under a deadline.
