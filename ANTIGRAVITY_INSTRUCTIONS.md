# INSTRUCTIONS FOR ANTIGRAVITY — "NINTENDOGS" Horror Visual Novel Clicker

## CONTEXT

You are helping build a game jam project. Deadline is **July 5, 11:59 PM** — approximately 27 hours from now. The developer (me) has **zero prior game development experience**. Full story, lore, and mechanics design docs are attached/pasted below this instruction. Your job right now is **PLANNING AND ARCHITECTURE ONLY** — do not write full production code yet until the plan is confirmed back to me.

---

## TECH STACK (DECIDED — DO NOT SUGGEST ALTERNATIVES)

- **Engine/Framework:** Phaser 3 (JavaScript)
- **Rendering:** 2D only, including the "Final Chase" sequence (explained below — it is NOT true 3D)
- **No build tooling required** — plain JS + Phaser CDN or npm, whichever is faster to get running in-browser tonight
- **Assets:** Placeholder only for now (colored rectangles, basic shapes, default Phaser text). Final art, animation, and music will be dropped in later by designers — code must NOT hardcode asset dependencies that block testing before final art arrives.

**Reasoning (do not relitigate this):** Switching to Godot or Unity was considered and rejected due to zero engine-specific experience and the 27-hour timeline. Phaser was chosen because it has strong AI-code-generation reliability, a real scene/game-loop system, and lets visuals be swapped in later without touching game logic.

---

## CORE ARCHITECTURE PRINCIPLE (MANDATORY)

**Build ONE generic, reusable engine per repeated system — NOT one-off code per location.** The three location routes (Quadrangle, New Building, Court) are structurally identical. The four mini-games are structurally identical (timer + meter(s) + click action + performance evaluation). Do not duplicate logic three or four times. Instead:

1. **One generic `MiniGameScene`** that accepts a config object (duration, starting meter values, drain/gain rates, click actions, spawn events, performance thresholds). Each of the 4 mini-games (Push Through, Dismiss the Thoughts, Hallway of Doors, Invitation Cards) is a **config file**, not separate code.
2. **One generic `DialogueScene`** that reads a JSON/array of `{speaker, text, spriteExpression, next}` objects and renders them with click-to-advance. All story dialogue (Prologue, all three routes, all endings) becomes **data files**, not hardcoded scene code.
3. **One generic `ExplorationScene`** (or lightweight click-hotspot scene) reused across all three locations, taking a background image + array of clickable hotspots (each triggering a dialogue snippet) as config.
4. **One `HubScene`** for the campus map location-select screen.
5. **One `ChaseScene`** for the Final Chase (see clarified spec below).
6. **A global `GameState` object** (or Phaser registry) tracking: current Aura Points total, which locations are completed, and per-mini-task performance ratings. This must persist across scene transitions.

---

## CLARIFIED SPEC: THE "FINAL CHASE" (IMPORTANT — READ CAREFULLY)

Earlier drafts of the design doc call this a "3D Chase" or "switch to 3D." **This is a naming leftover from early brainstorming and does NOT mean literal 3D rendering.** The confirmed actual design is:

- The Final Chase is a **2D first-person-perspective sequence** — the illusion of forward movement/depth achieved through 2D techniques only (e.g., scaling/parallaxing background layers, forced-perspective corridor art, or a scrolling background), NOT a 3D camera, NOT WebGL 3D, NOT Three.js.
- **Player control: WASD movement, but the path is guided/linear, NOT free-roam.** There is only one correct route forward — the player cannot actually get lost or take a wrong branch. The disorientation is purely visual/atmospheric (unfamiliar-looking corridors, shifting/warping environment, reused or repeating background elements) to create the *feeling* of being lost without any actual navigational failure state. In practice this likely means: W moves forward along the fixed path, A/D may shift the camera/view slightly left-right for looking-around effect or minor lane-dodging (e.g., avoiding an obstacle/jump-scare prop), but there is no branching path logic to build. Gameplay: the player is being pursued by **Entity E (Despair)**, the fusion of all four prior traumas.
- At scripted intervals during the chase, gameplay **pauses and hands off to the existing `DialogueScene`**: the protagonist's sprite appears with a scared/distressed expression, Entity E's dialogue plays (per the design doc's "Final Boss Concept" — mostly silence/breathing rather than heavy dialogue, per the lore doc), then control returns to the chase.
- The chase sequence's difficulty/visual treatment is modulated by the player's accumulated Aura (per the "FINAL CHASE (REVISED)" section of the design doc: high Aura = brighter, clearer, more forgiving; low Aura = distorted, harder to parse, more frequent entity intrusions).
- The chase concludes by directly branching into the Good Ending or Bad Ending sequence (also handled via `DialogueScene` + a final static/CG image), based on final Aura total versus the threshold defined in the doc.

**Action item for Antigravity:** Architect the Final Chase as its own lightweight `ChaseScene` using Phaser's keyboard input (WASD) to advance the player along a fixed/scripted path (no real pathfinding or branch logic needed — a simple "distance traveled" or "checkpoint index" variable driven by forward input is sufficient), interleaved with `DialogueScene` calls at scripted checkpoints (for the Entity E interruptions). This is simpler to build than free-roam movement — do not over-engineer collision/navigation systems. Confirm this reuse/simplicity plan explicitly in your response before building it.

---

## FULL DESIGN DOCUMENT (REFERENCE — SOURCE OF TRUTH)

*(Paste the full "NINTENDOGS" document here — lore, 5 entities, all three route mini-task specs with exact numbers/percentages/timings, dialogue scripts for Prologue and Quadrangle/New Building/Court routes, Aura Point system and thresholds, Good/Bad ending scripts, and the Universal Mini-Task Features section. This is the complete and current version of the design — treat all mechanic numbers, dialogue lines, and structural flow described in it as final and authoritative unless it conflicts with the Tech Stack or Final Chase clarification above, in which case those two sections of this instruction take precedence.)*

i inserted the pdf in here in the project, just check it.

---

## WHAT I NEED FROM YOU RIGHT NOW (PLANNING PHASE — NOT CODE YET)

Please respond with:

1. **A proposed file/folder structure** for the Phaser project (scenes, config/data folders, asset placeholder folders).
2. **The shape of the config object** you'd use for `MiniGameScene`, applied as an example to at least 2 of the 4 mini-games (show me the JSON/object structure, not full implementation).
3. **The shape of the dialogue data format** you'd use for `DialogueScene`, applied as an example to at least one short exchange from the design doc (e.g., the Prologue awakening scene).
4. **Your proposed build order** for the next ~20-24 hours of active dev time, broken into milestones, assuming I am learning Phaser as I go and will need to test each piece in-browser before moving on.
5. **Any scope risks you see** in the current design doc given the timeline — flag anything you think should be simplified or cut, but do not cut anything unilaterally; list it as a recommendation for me to approve.
6. **Explicit confirmation** that you understand the Final Chase clarification above and are not planning to build a separate 3D rendering system for it.

Do not generate full production code until I confirm the plan in items 1-6 above looks right.
