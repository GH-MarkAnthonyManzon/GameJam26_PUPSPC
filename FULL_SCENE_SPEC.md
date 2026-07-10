# NINTENDOGS — FULL SCENE IMPLEMENTATION SPEC

## Format & Rules (confirmed)

- **No literal camera movement.** "Angle" = which static sprite/background asset is displayed at that beat (e.g., "phone close-up," "wide shot," "portrait — shocked"), not an animated camera pan/zoom.
- **SFX tags are placeholders** — leave as a `sfx` field in the data structure, no actual audio required yet.
- **Shadow/Entity A glimpses are placeholders** — reference them as beats, but they can render as an empty/placeholder sprite until asset is ready.
- **Every beat is its own click-to-advance step.** Do not merge multiple lines/thoughts into a single dialogue box — pacing and silence are intentional per the source doc.
- **Format per beat:**
```
[VISUAL: static background/sprite shown]
[SFX: placeholder tag]
SPEAKER: "Line"   (omit if visual/action-only beat)
```

---

## [START SCREEN] — unchanged, no action needed

---

## PROLOGUE

### Scene 1 — Computer Laboratory (Late Afternoon)
**Background:** Computer Laboratory, daylight
**Sprites on screen:** Protagonist (tired, back of room), Professor (background), Students (background)

```
[VISUAL: Wide shot — Computer Laboratory, daylight. Students at desks, professor addressing class, protagonist visible at back looking exhausted.]
[SFX: placeholder — classroom ambience]
PROFESSOR: "Your capstone proposal is due next week."
PROFESSOR: "Make sure your documentation is complete."

[VISUAL: Same wide shot — students begin packing up, background motion]

[VISUAL: Protagonist portrait/close-up — tired expression]
PROTAGONIST (THOUGHT): "Just five more minutes..."
PROTAGONIST (THOUGHT): "I'll finish it..."
PROTAGONIST (THOUGHT): "If I stop now..."
PROTAGONIST (THOUGHT): "I'll just have even more work tomorrow."

[VISUAL: Protagonist sprite — eyes closing/head lowering]
[VISUAL: Protagonist sprite — head resting on desk]
[SFX: placeholder — ambient fade out]

[VISUAL: FADE TO BLACK]
```

### Scene 2 — Awakening (12:04 AM)
**Background:** Computer Laboratory, night/empty state
**Sprites on screen:** Protagonist only. Entity A (Shadow) — placeholder glimpse only, brief.

```
[VISUAL: Black screen, holds briefly]
[SFX: placeholder — single clock tick]

[VISUAL: Computer Laboratory, dark/empty. Monitor glow only light source.]
[SFX: placeholder — lights flicker/buzz]

[VISUAL: Protagonist sprite — lifting head, groggy]
PROTAGONIST: "...?"
PROTAGONIST: "Hm...?"

[VISUAL: Wide shot — empty dark classroom, no students/professor]
PROTAGONIST: "Everyone..."
PROTAGONIST: "...already left?"

[SFX: placeholder — lights flicker again]

[VISUAL: Phone close-up — screen lighting up]
[VISUAL: Phone close-up — reads "12:04 AM"]

PROTAGONIST: "Midnight...?"
PROTAGONIST: "Wait... that's impossible."

[VISUAL: Protagonist sprite — shocked/standing]
PROTAGONIST: "Hello...?"

[VISUAL: Beat — wide shot, empty room, no response]

[VISUAL: Protagonist sprite — walking toward door]
[VISUAL: Placeholder shadow glimpse — brief, indistinct, background corner of frame. Entity A, not confronted.]

[VISUAL: Wide shot — outside campus, completely empty, dark]
[SFX: placeholder — wind only, no music]

[VISUAL: TITLE CARD: "NINTENDOGS"]
```

### Scene 3 — Crossroads (12:06 AM)
**Background:** Empty School Grounds, outside Computer Laboratory, night
**Sprites on screen:** Protagonist. Entity A implied only (narration line at the end, no visual).

```
[VISUAL: Wide shot — empty campus grounds, buildings, trees swaying, no lights]
[SFX: placeholder — cold wind, no ambient life sounds]

PROTAGONIST: "..."
PROTAGONIST: "This..."
PROTAGONIST: "...doesn't make any sense."

[VISUAL: Protagonist sprite — walking]
[SFX: placeholder — footsteps, echoing]

PROTAGONIST: "Hello...?"
PROTAGONIST: "Is anyone still here?"

[VISUAL: Beat — wide shot, only wind, no change]

[VISUAL: Phone close-up — reads "12:06 AM," "No Signal," "No Notifications"]

PROTAGONIST: "Oh great..."
PROTAGONIST: "Seriously...?"

[VISUAL: Protagonist portrait — brief nervous almost-smile, fades]

[VISUAL: Protagonist sprite — walking back toward Computer Laboratory building, now dark]
[VISUAL: Close-up — hand on door handle]
[SFX: placeholder — door handle click]

[VISUAL: Door does not open]
PROTAGONIST: "Huh...?"

[VISUAL: Protagonist sprite — trying handle again, harder]
[SFX: placeholder — click, click]

[VISUAL: Still locked]
PROTAGONIST: "What...? No, no..."
PROTAGONIST: "It was open just a second ago..."

[VISUAL: Protagonist sprite — knocking on door]
[SFX: placeholder — knocking]

PROTAGONIST: "Hello?!"
PROTAGONIST: "Is anyone inside?!"

[VISUAL: Beat — no answer, only wind]

[VISUAL: Protagonist sprite — turning around slowly, breathing heavier]

[VISUAL: CAMPUS MAP screen appears — three route choices in dialogue box:]
> Quadrangle
> New Building
> Court

[NARRATION LINE (gray/narrator color), appears just before/during the choice:]
"Meanwhile... a shadowy entity watches her from behind."
"Going into the {chosen route}..."
```

---

## QUADRANGLE ROUTE
**Theme:** Academic Burnout

### Exploration
**Background:** Quadrangle, night. Clickable objects: Exam papers, Coffee cups, Broken pencil, Library card, Homework, Pile of Papers, Bench.

```
[VISUAL: Wide shot — Quadrangle exploration view, clickable hotspots visible]

[ON CLICK: Coffee Cup]
[VISUAL: Coffee cup close-up insert]
PROTAGONIST: "Cold..."
PROTAGONIST: "How long has this been here?"

[ON CLICK: Pile of Papers]
[VISUAL: Papers close-up insert]
PROTAGONIST: "Submission..."
PROTAGONIST: "Late."

[ON CLICK: Bench]
[VISUAL: Bench close-up insert]
PROTAGONIST: "I used to eat lunch here."

[NOTE: tone across all exploration clicks — uneasy, not yet scary]
```

### First Entity — Burnout Appears
```
[VISUAL: Quadrangle background — screen darkens slightly]
[VISUAL: Silhouette sprite appears beneath a tree — no face, glowing eyes only. This is Burnout.]

[VISUAL: Beat — Burnout sprite, no line]
BURNOUT: "..."

[VISUAL: Protagonist sprite — walking closer]
BURNOUT: "You're still working."
PROTAGONIST: "...Who are you?"
BURNOUT: "You haven't slept."
PROTAGONIST: "I..."
BURNOUT: "It's okay."
BURNOUT: "Just one more assignment."

[VISUAL: Beat — silence]
[VISUAL: Burnout sprite disappears]
PROTAGONIST: "..."
```

### More Exploration — Memory Objects
**Clickable objects:** Notebook, Sticky Notes, Laptop, Planner

```
[ON CLICK: Notebook]
[VISUAL: Notebook close-up insert]
PROTAGONIST: "This handwriting..."
PROTAGONIST: "...it's mine."

[VISUAL: Notebook entry insert — text reads: "Monday / Quiz / Project / Assignment / Study / Sleep later."]

[VISUAL: Burnout sprite reappears]
BURNOUT: "You wrote that."
PROTAGONIST: "..."
BURNOUT: "You always say"
BURNOUT: "Sleep later."
```

### Mini-Game: Push Through
*(Handled by MiniGameScene — see MiniGameScene config, not dialogue data)*

### Post-Mini-Game Dialogue
```
BURNOUT: "See?"
BURNOUT: "You can keep going."

[VISUAL: Protagonist sprite — breathing heavily]
PROTAGONIST: "No..."

BURNOUT: "You're doing great."
BURNOUT: "Everyone else is surviving."
BURNOUT: "Why can't you?"
```

### Climax
```
[SFX: placeholder — wind grows stronger, static]
[VISUAL: Screen glitch effect]
[VISUAL: Burnout sprite — looking behind the protagonist]
BURNOUT: "...He's here."
[VISUAL: Lights cut out — screen goes dark briefly]
```

### Regret Appears
```
[VISUAL: Regret sprite appears — much taller than Burnout, face hidden]
[SFX: placeholder — echoing voice effect]

REGRET: "You remember."
PROTAGONIST: "...Who are you?"
REGRET: "You already know."

[VISUAL: Protagonist sprite — shaking]

REGRET: "You should've studied."
[VISUAL: FLASH — insert image/text: "Exam score: 52%"]
REGRET: "Maybe then..."

[VISUAL: FLASH — insert: "Missed deadline"]
REGRET: "Maybe then..."

[VISUAL: FLASH — insert: "Friend leaving"]
REGRET: "Maybe then..."

BURNOUT: "She was tired."
REGRET: "She was lazy."
BURNOUT: "She tried."
REGRET: "Not enough."

[VISUAL: Both entity sprites on screen — text boxes overlap visually if possible]
[SFX: placeholder — music distortion]

BURNOUT: "Keep working."
REGRET: "Too late."
BURNOUT: "Keep going."
REGRET: "You'll never catch up."

[VISUAL: Full screen glitch effect]
```

*(Proceeds to Final Chase — see Final Boss section below)*

---

## NEW BUILDING ROUTE
**Theme:** Fear of the Future
**Core emotion note (for tone reference, not a rendered line):** Not about failing — about not knowing if everything sacrificed will be worth it. Regret anchors her to the past; Lost forces her to face an uncertain future.

### Scene 1 — Entering the New Building
**Background:** New Building - Ground Floor (AVR)

```
[VISUAL: New Building Ground Floor background]
[SFX: placeholder — silence]

[NARRATION LINE (gray/narrator color)]
"The automatic glass doors stand slightly open. No security guard. No janitor. No voices. Only silence."
"The protagonist slowly steps inside. The doors close behind her with a soft click."
"She instinctively looks back. The doors remain shut."

PROTAGONIST: "..."
PROTAGONIST: "This place gives me the creeps."

[VISUAL: Protagonist sprite — nervous laugh]
PROTAGONIST: "Get it together..."
PROTAGONIST: "You're seriously letting an empty hallway scare you?"

[SFX: placeholder — slow footsteps]
[VISUAL: Beat — hallway lights flickering in rhythm]

PROTAGONIST: "..."
PROTAGONIST: "Weird."

[SFX: placeholder — footsteps stop, a second set of echoing footsteps heard]
[VISUAL: Protagonist sprite — frozen]

PROTAGONIST: "..."
[VISUAL: Protagonist sprite — turns around]
PROTAGONIST: "I really need more sleep."

[SFX: placeholder — footsteps follow her again, one step behind]
[VISUAL: Brief dark silhouette at end of corridor (Entity A glimpse)]
[VISUAL: Lights stabilize, nothing is there]

PROTAGONIST: "..."
PROTAGONIST: "Hello?"
```

*(Exploration Phase 0 - Clickable objects: Classroom Door, Bulletin Board, Classroom Window)*
```
[ON CLICK: Classroom Door]
[VISUAL: Classroom door insert]
PROTAGONIST: "Looks like everyone's already gone home..."
[VISUAL: Classroom insert — empty, one chair slowly slides backward]
PROTAGONIST: "..."
PROTAGONIST: "No."
PROTAGONIST: "I didn't see that."

[ON CLICK: Bulletin Board]
[VISUAL: Bulletin Board insert]
PROTAGONIST: "..."
PROTAGONIST: "I kept saying I'd join one someday."
PROTAGONIST: "Maybe next semester. There was always another deadline first."
[VISUAL: Insert text change — 'YOUR FUTURE STARTS HERE' falls and glitches]

[ON CLICK: Classroom Window]
[VISUAL: Window insert — shows endless identical hallway instead of outside]
PROTAGONIST: "Nope."
PROTAGONIST: "Definitely sleep deprivation."
```

### Transition — The Staircase
```
[VISUAL: Staircase background]

???: "Still running?"
[VISUAL: Protagonist sprite — frozen]
PROTAGONIST: "..."
???: "You always leave before finding the answer."
PROTAGONIST: "Who's there?"

[VISUAL: Staircase lights flicker]
???: "Keep climbing."
???: "Maybe this time..."
???: "You'll like what you find."

PROTAGONIST: "Who's there? Stop hiding!"
PROTAGONIST: "If someone's messing with me, this isn't funny!"

[NARRATION LINE]
"The protagonist turns around. She briskly walks back the way she came... but the hallway stretches on endlessly."

PROTAGONIST: "What?"
[VISUAL: Screen flashes dark]
[VISUAL: Staircase background reappears — she is back where she started]

PROTAGONIST: "That's... impossible."
???: "Running away again?"
???: "Some things..."
???: "always find their way back to you."
```

### Scene 2 — The Second Floor
**Background:** New Building - Staircase / Second Floor
```
[NARRATION LINE]
"The staircase groans beneath every step. The second floor feels colder. The hallway is empty. As though no one had ever been there."

PROTAGONIST: "..."
PROTAGONIST: "Why does it feel so cold up here?"

[SFX: placeholder — bulb popping/breaking glass]
PROTAGONIST: "Seriously?!"
```

*(Exploration Phase 1 - Clickable objects: Graduation Banner, Trophy Display, Classroom 204)*
```
[ON CLICK: Graduation Banner]
[VISUAL: Faded tarpaulin insert]
PROTAGONIST: "Graduation..."
PROTAGONIST: "I wonder... if I'll ever make it there."
???: "You asked yourself that before."
PROTAGONIST: "..."
???: "You never answered."

[ON CLICK: Trophy Display]
[VISUAL: Trophy case insert, empty space reads "Reserved"]
PROTAGONIST: "Reserved...?"
[VISUAL: Insert flashes protagonist's name, then disappears]
PROTAGONIST: "..."
PROTAGONIST: "No... I couldn't have—"
???: "You thought it'd be yours."
PROTAGONIST: "I never expected anything like that."
???: "Didn't you?"

[ON CLICK: Classroom 204]
[VISUAL: Notebook insert on empty desk]
[VISUAL: Notebook text — 'Not good enough. Over and over.']
PROTAGONIST: "..."
PROTAGONIST: "That's... my handwriting."
???: "You wrote that."
PROTAGONIST: "Stop..."
???: "Why? Because it's true?"
[VISUAL: Lights flicker violently]
PROTAGONIST: "Enough!"
```

*(Proceeds to Mini-Game: Hallway of Doors — handled by MiniGameScene config)*

### Scene 4 — The Library (Climax)
**Background:** New Building - Third Floor Library
**Characters:** Protagonist, Regret, Lost

```
[NARRATION LINE]
"The library is silent. Books are scattered across the floor as if someone searched desperately for an answer but never found one. Only one lamp remains lit. Beneath it... someone is waiting."

[VISUAL: Figure sitting at a study table]
PROTAGONIST: "..."
PROTAGONIST: "Hello?"
[VISUAL: Figure stands, face hidden beneath shadow (Regret)]
PROTAGONIST: "..."
PROTAGONIST: "You're the one... who's been following me."
REGRET: "Following? No."
REGRET: "I've always been here. You simply refused to look."
PROTAGONIST: "Who... are you?"
REGRET: "I am every answer... you wish you could change."

[SFX: placeholder — cold wind, lights flicker]
REGRET: "Every mistake replayed... before you fall asleep."
REGRET: "Every opportunity... you convinced yourself wasn't worth taking."
PROTAGONIST: "Stop..."
REGRET: "Why? Haven't you spent years listening to me?"

[VISUAL: A second figure appears (Lost)]
LOST: "That's enough."
PROTAGONIST: "...There's another one?"
LOST: "She already knows."
LOST: "You don't have to keep reminding her."
REGRET: "If she forgets... she'll make the same mistakes again."
LOST: "She's forgotten something far more important."
LOST: "Tell me. What do you want... after graduation?"

[VISUAL: Protagonist sprite — shocked/silent]
PROTAGONIST: "I... don't know."
LOST: "..."
LOST: "Thank you. For answering honestly."
LOST: "You've spent years surviving. Assignment after assignment. Exam after exam."
LOST: "But survival... isn't the same as living."
PROTAGONIST: "I... I just wanted... to graduate."

[SFX: placeholder — violent static/glitches begin]
[VISUAL: Books falling from shelves effect]
REGRET: "And what happens if you don't?"
REGRET: "What if you fail?"
REGRET: "What if nobody hires you?"
REGRET: "What if everyone else moves forward... without you?"
PROTAGONIST: "Stop!"
REGRET: "Those aren't my questions. They're yours."

[VISUAL: Dead silence beat]
LOST: "..."
LOST: "You've been carrying these thoughts... for so long... You don't even know which ones belong to you anymore."

[NARRATION LINE]
"The shadows no longer belong to the room. They move on their own. Swallowing every source of light."

LOST: "It's beginning."
REGRET: "..."
REGRET: "We've stayed too long."

[VISUAL: Books dissolve into black ash]
[SFX: placeholder — overlapping whispers]
[VISUAL: Huge entity shadow begins to rise (Entity E)]
```

*(Proceeds to Final Boss / ChaseScene)*

---

## COURT ROUTE
**Theme:** Losing Yourself

**Clickable objects:** Basketball, Club posters, Music performances (photos), Photos, Certificates

```
[VISUAL: Court background — exploration view, clickable hotspots visible]

[ON CLICK: any of the above objects]
[VISUAL: relevant object close-up insert]

[VISUAL: Lost sprite appears]
LOST: "Remember these?"
PROTAGONIST: "..."
LOST: "You quit."

[VISUAL: Later — scene transition beat]

[VISUAL: Deprivation sprite appears — calm, soft-voiced presentation distinct from other entities]
DEPRIVATION: "You used to draw."
[NOTE: hobby placeholder — replace "draw" with whatever hobby fits final protagonist backstory]
PROTAGONIST: "...I was busy."
DEPRIVATION: "Busy."

[VISUAL: Beat — silence]
DEPRIVATION: "Years."

[VISUAL: Another memory — insert/close-up, object TBD]
DEPRIVATION: "When was the last time..."
DEPRIVATION: "...you did something because it made you happy?"

[VISUAL: Beat — protagonist says nothing]
DEPRIVATION: "...I thought so."
```

### Climax
```
[VISUAL: Both Lost and Deprivation sprites on screen]
LOST: "She doesn't know who she is."
DEPRIVATION: "Because she forgot."
LOST: "She chased success."
DEPRIVATION: "...and left herself behind."
```

*(Proceeds to Mini-Game: Invitation Cards — see MiniGameScene config — then Final Chase.)*

---

## FINAL BOSS (all routes converge here)

**Design intent (reference, not rendered dialogue):** The final boss never speaks — its silence is the point, since every prior entity has already voiced every fear/doubt/regret. The player should understand what it represents without being told.

```
[VISUAL: Beat — full silence, everything stops]
[SFX: placeholder — footsteps approaching]
[VISUAL: Monstrous shadow sprite appears — placeholder asset acceptable for jam build]
[SFX: placeholder — breathing only, no dialogue, no music]

[TRANSITION: → ChaseScene (WASD guided-path chase, see ChaseScene spec)]
```

---

## GOOD ENDING
```
[VISUAL: Morning sunlight — Quadrangle background, students visible/active]

PROTAGONIST: "...It was just a dream."

[VISUAL: Protagonist sprite — noticing her planner, close-up insert]
[VISUAL: Planner insert — text originally read "Sleep Later," now shows "Rest First"]

[VISUAL: Protagonist portrait — smiling]
[VISUAL: FADE OUT]
```

## BAD ENDING
```
[VISUAL: Darkness — chase failed]

BURNOUT: "Don't stop."
REGRET: "You never did enough."

[VISUAL: Final Boss sprite — slowly reaching forward]
[VISUAL: BLACK SCREEN]
[SFX: placeholder — alarm ringing]

[VISUAL: Computer Laboratory — protagonist waking up, same as Prologue Scene 2 setup]
[VISUAL: Phone close-up — reads "12:04 AM"]

[NOTE: Loop implied — no explicit line needed, the repeated phone time and location communicates this visually]
```

---

## IMPLEMENTATION NOTES FOR ANTIGRAVITY

1. Every `[VISUAL: ...]` line is a distinct dialogue-data beat requiring its own click-to-advance step, even when no dialogue line accompanies it (e.g., "Beat — silence," "FLASH — insert text"). Do not collapse these into the surrounding dialogue lines.
2. `[SFX: placeholder ...]` tags should exist as a `sfx` field on each beat's data object, currently unassigned/no-op, so real audio can be dropped in later without restructuring the data.
3. Static "angle" changes (e.g., phone close-up, object close-up insert, portrait swap) should be implemented as swapping which image/sprite is displayed for that beat — no animation/pan required, per confirmed scope.
4. The Regret "Flash" sequence (exam score, missed deadline, friend leaving) should render each flashed image/text as its own beat, synced with its accompanying "Maybe then..." line, not all three flashes shown at once.
5. Mini-games (Push Through, Dismiss the Thoughts, Hallway of Doors, Invitation Cards) are NOT part of this dialogue data — they're handled by the existing `MiniGameScene` configs. This document only covers what happens immediately before/after each mini-game.
6. The Final Boss section intentionally has almost no dialogue — do not add filler lines to "fill space." The silence is the design intent per the source doc.
7. Court route's Deprivation hobby line ("You used to draw") has a bracket note in the source doc indicating it's a placeholder — flag this back to the writer/user rather than assuming a final hobby.
