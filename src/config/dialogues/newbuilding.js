// ── Scene 1 - Intro ────────────────────────────────────────────────────────
export const newbuilding_intro = [
  { id: 'nb_in_01', speaker: null, text: 'The automatic glass doors stand slightly open. No security guard. No janitor. No voices. Only silence.', portrait: null, background: 'bg_newbuilding' },
  { id: 'nb_in_02', speaker: null, text: 'The protagonist slowly steps inside. The doors close behind her with a soft click.', portrait: null, background: null },
  { id: 'nb_in_03', speaker: null, text: 'She instinctively looks back. The doors remain shut.', portrait: null, background: null },
  { id: 'nb_in_04', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_05', speaker: 'Protagonist', text: 'This place gives me the creeps.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_06', speaker: null, text: 'She laughs softly. A laugh meant only to calm herself.', portrait: null, background: null },
  { id: 'nb_in_07', speaker: 'Protagonist', text: "Get it together... You're seriously letting an empty hallway scare you?", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_08', speaker: null, text: 'She takes another step. ... Another. ... Another.', portrait: null, background: null },
  { id: 'nb_in_09', speaker: null, text: 'Rows of classrooms stretch along both sides. Each door is identical. Each window reflects only darkness.', portrait: null, background: null },
  { id: 'nb_in_10', speaker: null, text: 'The fluorescent lights flicker one by one. Not randomly. Almost... In rhythm.', portrait: null, background: null },
  { id: 'nb_in_11', speaker: null, text: 'The protagonist glances toward the end of the hallway. It feels farther away than it should.', portrait: null, background: null },
  { id: 'nb_in_12', speaker: null, text: 'She blinks. The hallway returns to normal.', portrait: null, background: null },
  { id: 'nb_in_13', speaker: 'Protagonist', text: '... Weird.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_14', speaker: null, text: 'She keeps walking. Step... ... Step... ... Step...', portrait: null, background: null },
  { id: 'nb_in_15', speaker: null, text: 'Another footstep echoes. One beat behind hers.', portrait: null, background: null },
  { id: 'nb_in_16', speaker: null, text: 'Step... ... Step... ... Step...', portrait: null, background: null },
  { id: 'nb_in_17', speaker: null, text: 'The protagonist immediately freezes. Silence. The second footsteps stop as well.', portrait: null, background: null },
  { id: 'nb_in_18', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_19', speaker: null, text: 'She slowly turns around. Nothing. Just empty hallways.', portrait: null, background: null },
  { id: 'nb_in_20', speaker: null, text: 'She sighs.', portrait: null, background: null },
  { id: 'nb_in_21', speaker: 'Protagonist', text: 'I really need more sleep.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_22', speaker: null, text: 'She starts walking again. The second footsteps return. Always one step behind. Never catching up. Never falling behind.', portrait: null, background: null },
  { id: 'nb_in_23', speaker: null, text: 'Something follows her. Patiently. Quietly. Waiting.', portrait: null, background: null },
  { id: 'nb_in_24', speaker: null, text: 'The hallway lights suddenly flicker. For less than a second... A dark silhouette appears at the very end of the corridor.', portrait: null, background: null },
  { id: 'nb_in_25', speaker: null, text: 'Standing perfectly still. Watching. The lights stabilize. Nothing is there.', portrait: null, background: null },
  { id: 'nb_in_26', speaker: 'Protagonist', text: '... Hello?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_in_27', speaker: null, text: 'Silence. Only the buzzing lights respond.', portrait: null, background: null },
];

// ── Scene 1 Transition to Scene 2 ──────────────────────────────────────────
export const newbuilding_regret_1 = [
  { id: 'nb_r1_01', speaker: null, text: 'She reaches the end of the Ground Floor hallway. The staircase leading upward comes into view.', portrait: null, background: 'bg_newbuilding' },
  { id: 'nb_r1_02', speaker: null, text: 'Just as she places a foot on the first step— A voice quietly speaks. Not behind her. Not in front of her. Inside her thoughts.', portrait: null, background: null },
  { id: 'nb_r1_03', speaker: '???', text: 'Still running?', portrait: null, background: null },
  { id: 'nb_r1_04', speaker: null, text: 'The protagonist freezes.', portrait: null, background: null },
  { id: 'nb_r1_05', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_06', speaker: null, text: 'She looks around. Nothing.', portrait: null, background: null },
  { id: 'nb_r1_07', speaker: '???', text: 'You always leave before finding the answer.', portrait: null, background: null },
  { id: 'nb_r1_08', speaker: 'Protagonist', text: "Who's there?", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_09', speaker: null, text: 'Silence. The staircase lights flicker.', portrait: null, background: null },
  { id: 'nb_r1_10', speaker: '???', text: 'Keep climbing. Maybe this time... You\'ll like what you find.', portrait: null, background: null },
  { id: 'nb_r1_11', speaker: null, text: 'The voice disappears. The protagonist remains frozen for a moment.', portrait: null, background: null,
    choices: [
      { text: "Who's there? Show yourself!", nextKey: "newbuilding_regret_1_confront" },
      { text: "...I'm leaving.", nextKey: "newbuilding_regret_1_loop" }
    ]
  }
];

const newbuilding_regret_1_shared_end = [
  { id: 'nb_r1_28', speaker: null, text: 'The staircase groans beneath every step. Each floor creaks as though the building itself is breathing. The farther she climbs... The quieter the world becomes.', portrait: null, background: null },
  { id: 'nb_r1_29', speaker: null, text: 'The protagonist reaches the second floor. The hallway is empty. Not abandoned. Empty. As though no one had ever been there.', portrait: null, background: null },
  { id: 'nb_r1_30', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_31', speaker: 'Protagonist', text: 'Why does it feel so cold up here?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_32', speaker: null, text: 'She rubs her arms. The air feels heavier than before. Almost difficult to breathe.', portrait: null, background: null },
  { id: 'nb_r1_33', speaker: null, text: 'The fluorescent lights buzz overhead. One suddenly bursts. POP! Glass scatters across the floor.', portrait: null, background: null },
  { id: 'nb_r1_34', speaker: null, text: 'The protagonist flinches.', portrait: null, background: null },
  { id: 'nb_r1_35', speaker: 'Protagonist', text: 'Seriously?!', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_36', speaker: null, text: 'She exhales. Trying to steady herself. The silence returns. Almost immediately.', portrait: null, background: null },
];

export const newbuilding_regret_1_confront = [
  { id: 'nb_r1_c_01', speaker: 'Protagonist', text: "Who's there? Show yourself! If someone's messing with me, this isn't funny!", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_c_02', speaker: null, text: 'Only silence answers. The protagonist lets out a shaky breath. The only path left... Leads upward.', portrait: null, background: null },
  { id: 'nb_r1_c_03', speaker: null, text: '[ End of Scene 1 ]', portrait: null, background: null },
  ...newbuilding_regret_1_shared_end
];

export const newbuilding_regret_1_loop = [
  { id: 'nb_r1_14', speaker: 'Protagonist', text: "No... I'm done. Whatever this is, I'm not staying here.", portrait: 'portrait_protagonist', background: 'bg_newbuilding' },
  { id: 'nb_r1_15', speaker: null, text: 'She briskly walks back the way she came. Her footsteps grow quicker. Almost a run.', portrait: null, background: null },
  { id: 'nb_r1_16', speaker: null, text: 'The hallway seems unusually longer than before. The lights continue flickering overhead. One after another.', portrait: null, background: null },
  { id: 'nb_r1_17', speaker: null, text: 'She keeps walking....and walking….and walking... The exit never comes into view. The protagonist slows to a stop. She looks around.', portrait: null, background: null },
  { id: 'nb_r1_18', speaker: 'Protagonist', text: 'What?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_19', speaker: null, text: 'She turns back toward the hallway. The staircase is still there. Exactly where she had left it. Only a few meters away. As if she had never walked away at all.', portrait: null, background: null },
  { id: 'nb_r1_20', speaker: 'Protagonist', text: "That's...impossible.", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_r1_21', speaker: null, text: 'She looks behind her once more. Nothing but the endless corridor. No entrance. No way out. Only rows of silent classrooms.', portrait: null, background: null },
  { id: 'nb_r1_22', speaker: null, text: 'She takes a hesitant step backward. The fluorescent lights buzz loudly above her. For a brief moment... Everything goes dark.', portrait: null, background: null },
  { id: 'nb_r1_23', speaker: null, text: 'When the lights return... She is standing at the foot of the staircase again. A quiet voice whispers inside her mind. Not threatening. Almost amused.', portrait: null, background: null },
  { id: 'nb_r1_24', speaker: '???', text: 'Running away again?', portrait: null, background: null },
  { id: 'nb_r1_25', speaker: null, text: 'Silence.', portrait: null, background: null },
  { id: 'nb_r1_26', speaker: '???', text: 'Some things... always find their way back to you.', portrait: null, background: null },
  { id: 'nb_r1_27', speaker: null, text: 'The voice fades. The protagonist swallows hard. Whether she moves forward... Or tries to leave... She always ends up in the same place. The only path left... Leads upward.', portrait: null, background: null },
  { id: 'nb_r1_28', speaker: null, text: '[ End of Scene 1 ]', portrait: null, background: null },
  ...newbuilding_regret_1_shared_end
];

// ── Scene 2 Transition to Minigame ─────────────────────────────────────────
export const newbuilding_transition_2 = [
  { id: 'nb_t2_01', speaker: null, text: 'The player continues exploring. As the final clue is collected... A distorted school bell rings.', portrait: null, background: 'bg_newbuilding' },
  { id: 'nb_t2_02', speaker: null, text: 'Ding... ... Ding... ... Ding...', portrait: null, background: null },
  { id: 'nb_t2_03', speaker: null, text: 'The sound doesn\'t stop. It stretches unnaturally. Almost like it\'s slowing down.', portrait: null, background: null },
  { id: 'nb_t2_04', speaker: null, text: 'The lights dim. The hallway begins changing. The classroom doors slowly disappear into darkness. Their walls distort. Stretching farther apart.', portrait: null, background: null },
  { id: 'nb_t2_05', speaker: null, text: 'At the end of the corridor... Eight identical doors gradually emerge. Each with the same brass handle. Each perfectly identical.', portrait: null, background: null },
  { id: 'nb_t2_06', speaker: null, text: 'The protagonist slowly steps back.', portrait: null, background: null },
  { id: 'nb_t2_07', speaker: 'Protagonist', text: '... Those... weren\'t here before.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_t2_08', speaker: null, text: 'The mysterious voice speaks once more. This time... Clearer than ever.', portrait: null, background: null },
  { id: 'nb_t2_09', speaker: '???', text: 'Every choice... leaves a door behind.', portrait: null, background: null },
  { id: 'nb_t2_10', speaker: null, text: 'A pause.', portrait: null, background: null },
  { id: 'nb_t2_11', speaker: '???', text: 'Some you opened.', portrait: null, background: null },
  { id: 'nb_t2_12', speaker: null, text: 'Another pause.', portrait: null, background: null },
  { id: 'nb_t2_13', speaker: '???', text: 'Some you were too afraid to.', portrait: null, background: null },
  { id: 'nb_t2_14', speaker: null, text: 'The lights go out. Complete darkness. When they return... The hallway behind her is gone.', portrait: null, background: null },
  { id: 'nb_t2_15', speaker: null, text: 'Only the eight doors remain. There is no turning back. Only memories waiting to be opened.', portrait: null, background: null },
  { id: 'nb_t2_16', speaker: null, text: 'The hallway no longer resembles the New Building. The ceiling stretches into darkness. The walls seem farther apart than before.', portrait: null, background: null },
  { id: 'nb_t2_17', speaker: null, text: 'Only eight doors remain. Perfectly aligned. Perfectly still. Each door bears no classroom number. Only a tarnished brass handle.', portrait: null, background: null },
  { id: 'nb_t2_18', speaker: null, text: 'The protagonist slowly approaches the first one.', portrait: null, background: null },
  { id: 'nb_t2_19', speaker: 'Protagonist', text: '... What is this place...?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_t2_20', speaker: null, text: 'Silence. A familiar voice answers. Calm. Almost comforting.', portrait: null, background: null },
  { id: 'nb_t2_21', speaker: '???', text: 'You\'ve walked these halls before.', portrait: null, background: null },
  { id: 'nb_t2_22', speaker: null, text: 'The protagonist stiffens.', portrait: null, background: null },
  { id: 'nb_t2_23', speaker: 'Protagonist', text: 'You again.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_t2_24', speaker: '???', text: 'No. You\'ve always been talking to me.', portrait: null, background: null },
  { id: 'nb_t2_25', speaker: null, text: 'A long pause.', portrait: null, background: null },
  { id: 'nb_t2_26', speaker: '???', text: 'You just never noticed.', portrait: null, background: null },
  { id: 'nb_t2_27', speaker: null, text: 'The protagonist clenches her fists.', portrait: null, background: null },
  { id: 'nb_t2_28', speaker: 'Protagonist', text: 'Who are you?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_t2_29', speaker: null, text: 'The voice chuckles softly. Not mockingly. Sadly.', portrait: null, background: null },
  { id: 'nb_t2_30', speaker: '???', text: 'A better question... is who you\'ve become.', portrait: null, background: null },
  { id: 'nb_t2_31', speaker: null, text: 'The hallway grows quieter. The first door slowly unlocks by itself. Click. The handle turns.', portrait: null, background: null },
  { id: 'nb_t2_32', speaker: '???', text: 'Every door hides something you\'ve buried. You have two choices. Open it... Or keep pretending it never happened.', portrait: null, background: null }
];

const climax_base = [
  { id: 'nb_cl_01', speaker: null, text: 'When the darkness fades... The protagonist finds herself standing in front of a pair of large wooden doors. Above them hangs a faded sign. LIBRARY', portrait: null, background: 'bg_newbuilding' },
  { id: 'nb_cl_02', speaker: null, text: 'The doors slowly creak open on their own. A faint light spills out from within.', portrait: null, background: null },
  { id: 'nb_cl_03', speaker: null, text: 'For the first time since entering the New Building... She knows exactly where she\'s being led. And for the first time... She isn\'t alone anymore.', portrait: null, background: null },
  { id: 'nb_cl_04', speaker: null, text: 'The library is silent. Not the comforting silence of studying. Not the peaceful silence of reading.', portrait: null, background: null },
  { id: 'nb_cl_05', speaker: null, text: 'A silence that feels... Wrong. Heavy. As though every word spoken here had been swallowed.', portrait: null, background: null },
  { id: 'nb_cl_06', speaker: null, text: 'The protagonist steps forward. Her footsteps are muffled by the carpet. The deeper she walks... The darker the room becomes.', portrait: null, background: null },
  { id: 'nb_cl_07', speaker: null, text: 'At the center of the library... A lone figure sits at a study table. Head lowered. Hands resting calmly on an open book.', portrait: null, background: null },
  { id: 'nb_cl_08', speaker: null, text: 'It does not move.', portrait: null, background: null },
  { id: 'nb_cl_09', speaker: 'Protagonist', text: '... Hello?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_10', speaker: null, text: 'No response. She slowly takes another step.', portrait: null, background: null },
  { id: 'nb_cl_11', speaker: null, text: 'The figure closes the book. Without making a sound. It stands.', portrait: null, background: null },
  { id: 'nb_cl_12', speaker: null, text: 'Its face remains hidden beneath shadow. Only its eyes are visible. Watching her.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_13', speaker: 'Protagonist', text: '... You\'re the one... who\'s been following me.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_14', speaker: null, text: 'The figure tilts its head.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_15', speaker: '???', text: 'Following? No. I\'ve always been here. You simply refused to look.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_16', speaker: null, text: 'Silence fills the room. The protagonist clenches her fists.', portrait: null, background: null },
  { id: 'nb_cl_17', speaker: 'Protagonist', text: 'Who...are you?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_18', speaker: null, text: 'The figure slowly takes a step forward.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_19', speaker: 'Regret', text: 'I am every answer... you wish you could change.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_20', speaker: null, text: 'The room suddenly grows colder. The overhead lamp flickers.', portrait: null, background: null },
  { id: 'nb_cl_21', speaker: 'Regret', text: 'Every mistake replayed...before you fall asleep.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_22', speaker: null, text: 'Another step.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_23', speaker: 'Regret', text: 'Every opportunity... you convinced yourself wasn\'t worth taking.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_24', speaker: null, text: 'The protagonist slowly backs away.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_25', speaker: 'Protagonist', text: 'Stop...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_26', speaker: 'Regret', text: 'Why? Haven\'t you spent years listening to me?', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_27', speaker: null, text: 'The room falls silent. Then... A second voice. Soft. Almost tired.', portrait: null, background: null },
  { id: 'nb_cl_28', speaker: '???', text: 'That\'s enough.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_29', speaker: null, text: 'The protagonist quickly turns. Another figure stands between two bookshelves. Unlike the first... Its posture is slouched. Its eyes seem empty. Not angry. Simply...Lost.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_30', speaker: 'Protagonist', text: '...There\'s another one?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_31', speaker: null, text: 'The second figure slowly walks forward. Its footsteps make no sound.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_32', speaker: 'Lost', text: 'She already knows.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_33', speaker: null, text: 'It looks toward Regret.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_34', speaker: 'Lost', text: 'You don\'t have to keep reminding her.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_35', speaker: null, text: 'Regret doesn\'t look away from the protagonist.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_36', speaker: 'Regret', text: 'If she forgets... she\'ll make the same mistakes again.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_37', speaker: null, text: 'Lost quietly shakes its head.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_38', speaker: 'Lost', text: 'She\'s forgotten something far more important.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_39', speaker: null, text: 'It finally looks at the protagonist.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_40', speaker: 'Lost', text: 'Tell me. What do you want... after graduation?', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_41', speaker: null, text: 'The protagonist opens her mouth. Nothing comes out.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_42', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null,
    choices: [
      {
        text: "I want a stable job.",
        nextSteps: [
          { speaker: 'Lost', text: 'A stable job. Then what?', portrait: 'portrait_lost' },
          { speaker: null, text: 'Silence.' }
        ]
      },
      {
        text: "I... don't know.",
        nextSteps: [
          { speaker: 'Lost', text: '... Thank you.', portrait: 'portrait_lost' },
          { speaker: null, text: 'The protagonist looks confused.', portrait: 'portrait_protagonist' },
          { speaker: 'Protagonist', text: 'For what?', portrait: 'portrait_protagonist' },
          { speaker: 'Lost', text: 'For answering honestly.', portrait: 'portrait_lost' }
        ]
      },
      {
        text: "I haven't thought that far.",
        nextSteps: [
          { speaker: 'Lost', text: '... That\'s what frightens you most. Isn\'t it?', portrait: 'portrait_lost' },
          { speaker: null, text: 'The protagonist lowers her head.', portrait: 'portrait_protagonist' }
        ]
      }
    ]
  },
  { id: 'nb_cl_50', speaker: 'Protagonist', text: '...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_51', speaker: null, text: 'Lost slowly walks closer. Not threatening. Almost sympathetic.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_52', speaker: 'Lost', text: 'You\'ve spent years surviving. Assignment after assignment. Exam after exam. Deadline after deadline. But survival...isn\'t the same as living.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_53', speaker: null, text: 'The protagonist\'s eyes begin to water.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_54', speaker: 'Protagonist', text: 'I... I just wanted...to graduate.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_55', speaker: null, text: 'Regret suddenly interrupts. Its voice is louder now. Sharper.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_56', speaker: 'Regret', text: 'And what happens if you don\'t?', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_57', speaker: null, text: 'The lights violently flicker. Books begin falling from the shelves. One after another.', portrait: null, background: null },
  { id: 'nb_cl_58', speaker: 'Regret', text: 'What if you fail?', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_59', speaker: null, text: 'Another shelf collapses.', portrait: null, background: null },
  { id: 'nb_cl_60', speaker: 'Regret', text: 'What if nobody hires you?', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_61', speaker: null, text: 'The room shakes.', portrait: null, background: null },
  { id: 'nb_cl_62', speaker: 'Regret', text: 'What if everyone else moves forward... ...without you?', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_63', speaker: null, text: 'The protagonist covers her ears.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_64', speaker: 'Protagonist', text: 'Stop!', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_65', speaker: 'Regret', text: 'Those aren\'t my questions. They\'re yours.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_66', speaker: null, text: 'Silence. Lost looks down. Almost saddened.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_67', speaker: 'Lost', text: '... You\'ve been carrying these thoughts...for so long... You don\'t even know which ones belong to you anymore.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_68', speaker: null, text: 'The library falls silent. No footsteps. No wind. Not even the buzzing of the fluorescent lights. Only silence. An uncomfortable... Absolute silence.', portrait: null, background: null },
  { id: 'nb_cl_69', speaker: null, text: 'The protagonist slowly lowers her hands.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_70', speaker: 'Protagonist', text: '... What... what\'s happening?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_71', speaker: null, text: 'Regret\'s gaze shifts past her. Not toward something. Toward everything. For the first time... Its voice falters.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_72', speaker: 'Regret', text: '... We\'ve stayed too long.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_73', speaker: null, text: 'Lost quietly looks toward the darkness spreading between the bookshelves.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_74', speaker: null, text: 'The shadows no longer belong to the room. They move on their own. Crawling across the floor. Climbing the shelves. Swallowing every source of light.', portrait: null, background: null },
  { id: 'nb_cl_75', speaker: 'Lost', text: 'It\'s beginning.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_76', speaker: null, text: 'The library trembles. Books fall from the shelves without touching the ground. Instead... They dissolve into black ash. Their pages scatter through the air like dying memories.', portrait: null, background: null },
  { id: 'nb_cl_77', speaker: null, text: 'The darkness slowly gathers at the center of the library. Not taking the shape of a person. Not taking the shape of a monster. Only countless shadows twisting together.', portrait: null, background: null },
  { id: 'nb_cl_78', speaker: null, text: 'Whispers begin filling the room. At first... Only one voice.', portrait: null, background: null },
  { id: 'nb_cl_79', speaker: 'Whispers', text: '"You weren\'t good enough..."', portrait: null, background: null },
  { id: 'nb_cl_80', speaker: null, text: 'Then another.', portrait: null, background: null },
  { id: 'nb_cl_81', speaker: 'Whispers', text: '"You don\'t know where you\'re going..."', portrait: null, background: null },
  { id: 'nb_cl_82', speaker: null, text: 'Another.', portrait: null, background: null },
  { id: 'nb_cl_83', speaker: 'Whispers', text: '"Keep working..."', portrait: null, background: null },
  { id: 'nb_cl_84', speaker: null, text: 'Another.', portrait: null, background: null },
  { id: 'nb_cl_85', speaker: 'Whispers', text: '"Remember everything you gave up..."', portrait: null, background: null },
  { id: 'nb_cl_86', speaker: null, text: 'The voices overlap. Again. And again. And again. Until they become impossible to distinguish.', portrait: null, background: null },
  { id: 'nb_cl_87', speaker: null, text: 'The protagonist covers her ears.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_88', speaker: 'Protagonist', text: 'Stop... Please...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_89', speaker: null, text: 'The whispers only grow louder. Until... One enormous silhouette slowly rises from the sea of shadows. Its body constantly shifts. Faces emerge... Only to disappear. Hands reach outward... Before melting back into darkness. Its form never remains the same. As though countless emotions are fighting to become whole.', portrait: 'portrait_despair', background: null },
  { id: 'nb_cl_90', speaker: null, text: 'Regret quietly lowers its head.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_91', speaker: 'Regret', text: 'Every doubt.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_92', speaker: null, text: 'Lost follows.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_93', speaker: 'Lost', text: 'Every fear.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_94', speaker: null, text: 'Their voices overlap. For the first time... Speaking together.', portrait: null, background: null },
  { id: 'nb_cl_95', speaker: 'Regret & Lost', text: 'Every burden you refused to face...', portrait: null, background: null },
  { id: 'nb_cl_96', speaker: null, text: 'A long silence. The shifting mass lets out a deep, hollow groan. Not like an animal. Not like a person. But like hundreds of voices crying out at once.', portrait: 'portrait_despair', background: null },
  { id: 'nb_cl_97', speaker: 'Regret', text: 'When every wound speaks at once...', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_98', speaker: 'Lost', text: '...it becomes something else.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_99', speaker: null, text: 'The protagonist stares at the towering mass before her. Barely able to breathe.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_100', speaker: 'Protagonist', text: '... What... is that...?', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_101', speaker: null, text: 'Regret looks at her one last time. Its expression unreadable.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_102', speaker: 'Regret', text: 'The end of every road we lead to.', portrait: 'portrait_regret', background: null },
  { id: 'nb_cl_103', speaker: null, text: 'Lost finishes the sentence.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_104', speaker: 'Lost', text: 'Despair.', portrait: 'portrait_lost', background: null },
  { id: 'nb_cl_105', speaker: null, text: 'The creature slowly leans forward. It has no eyes. No mouth. Yet the darkness surrounding it reaches toward the protagonist like countless grasping hands. Not to kill her. Not to tear her apart. To consume her. To make her another voice inside itself.', portrait: 'portrait_despair', background: null },
  { id: 'nb_cl_106', speaker: null, text: 'It is not a monster. It is every fear... Every regret... Every sacrifice... Every uncertainty... That has grown louder than the person carrying them. And if it reaches her... There will be nothing left of her own voice.', portrait: null, background: null },
  { id: 'nb_cl_107', speaker: null, text: 'A blinding light suddenly pierces through the library windows. Far in the distance... Beyond the collapsing shelves... The campus entrance glows. A single path remains open. The only way out.', portrait: null, background: null },
  { id: 'nb_cl_108', speaker: null, text: 'The library collapses behind her. The light is still there. Far away. Waiting.', portrait: null, background: null },
  { id: 'nb_cl_109', speaker: 'Protagonist', text: 'Run...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_cl_110', speaker: null, text: 'Despair lets out a deafening roar. The chase begins.', portrait: 'portrait_despair', background: null },
];

const final_door_base = [
  { id: 'nb_fd_01', speaker: null, text: "The eighth door is different. Its wood is darker. Its handle colder.", portrait: null, background: null },
  { id: 'nb_fd_02', speaker: null, text: "The protagonist hesitates. She considers walking away.", portrait: null, background: null },
  { id: 'nb_fd_03', speaker: null, text: "But when she turns around... The hallway behind her has disappeared. Nothing but darkness.", portrait: null, background: null },
  { id: 'nb_fd_04', speaker: null, text: "Some questions... demand an answer.", portrait: null, background: null },
  { id: 'nb_fd_05', speaker: null, text: "She slowly reaches for the handle. Her hand trembles.", portrait: null, background: null },
  { id: 'nb_fd_06', speaker: 'Protagonist', text: "… Whatever's inside… I'm done running.", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_fd_07', speaker: null, text: "The door opens. Instead of another memory... There is only darkness. The lights suddenly go out.", portrait: null, background: null },
  { id: 'nb_fd_08', speaker: null, text: "Every door slams shut. BANG! BANG! BANG! One after another. The hallway shakes violently.", portrait: null, background: null },
  { id: 'nb_fd_09', speaker: null, text: "The voice returns. Closer than ever.", portrait: null, background: null },
  { id: 'nb_fd_10', speaker: '???', text: "Good. Now... Look at me.", portrait: null, background: null },
  { id: 'nb_fd_11', speaker: null, text: "For the first time... The protagonist hears footsteps approaching. Not behind her. Not ahead of her. Everywhere.", portrait: null, background: null },
  { id: 'nb_fd_12', speaker: null, text: "A shadow slowly forms at the end of the corridor. Its shape is human. Its face hidden. It doesn't move. It simply stands there. Watching.", portrait: null, background: null },
  { id: 'nb_fd_13', speaker: 'Protagonist', text: "... You're...", portrait: 'portrait_protagonist', background: null },
  { id: 'nb_fd_14', speaker: null, text: "The figure takes one step forward.", portrait: null, background: null },
  { id: 'nb_fd_15', speaker: '???', text: "I've always been here.", portrait: null, background: null },
  { id: 'nb_fd_16', speaker: null, text: "The lights burst. Darkness.", portrait: null, background: null },
];

export const newbuilding_climax_excellent = [
  ...final_door_base,
  { id: 'nb_pf_e_01', speaker: 'Protagonist', text: "... I can't change those memories. But... I don't have to keep living inside them.", portrait: 'portrait_protagonist', background: 'bg_newbuilding' },
  { id: 'nb_pf_e_02', speaker: 'Regret', text: "... Then perhaps... you've finally learned something.", portrait: 'portrait_regret', background: null },
  ...climax_base
];

export const newbuilding_climax_good = [
  ...final_door_base,
  { id: 'nb_pf_g_01', speaker: 'Protagonist', text: "I still have doubts... But I can keep moving.", portrait: 'portrait_protagonist', background: 'bg_newbuilding' },
  { id: 'nb_pf_g_02', speaker: 'Regret', text: "Even if you don't know where you're going?", portrait: 'portrait_regret', background: null },
  { id: 'nb_pf_g_03', speaker: 'Protagonist', text: "... Even then.", portrait: 'portrait_protagonist', background: null },
  ...climax_base
];

export const newbuilding_climax_barely = [
  ...final_door_base,
  { id: 'nb_pf_b_01', speaker: 'Protagonist', text: "... Why is it so hard... to forgive myself?", portrait: 'portrait_protagonist', background: 'bg_newbuilding' },
  { id: 'nb_pf_b_02', speaker: 'Regret', text: "Because you've spent so long convincing yourself... that you don't deserve to.", portrait: 'portrait_regret', background: null },
  ...climax_base
];

export const newbuilding_climax_failed = [
  ...final_door_base,
  { id: 'nb_pf_f_01', speaker: null, text: 'The Certainty Bar shatters. The hallway cracks apart. The protagonist collapses to her knees.', portrait: null, background: 'bg_newbuilding' },
  { id: 'nb_pf_f_02', speaker: 'Protagonist', text: 'Please... Make it stop...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_pf_f_03', speaker: null, text: 'The voice speaks one final time.', portrait: null, background: null },
  { id: 'nb_pf_f_04', speaker: '???', text: 'I never started this. You did.', portrait: null, background: null },
  { id: 'nb_pf_f_05', speaker: null, text: 'Everything goes black.', portrait: null, background: null },
  ...climax_base
];

export const newbuilding_chase_checkpoint_1 = [
  { id: 'nb_ch1_01', speaker: null, text: 'The light grows closer.', portrait: null, background: 'bg_chase' }
];

export const newbuilding_chase_checkpoint_2 = [
  { id: 'nb_ch2_01', speaker: null, text: 'Despair follows.', portrait: null, background: 'bg_chase' }
];

export const newbuilding_chase_checkpoint_3 = [
  { id: 'nb_ch3_01', speaker: null, text: 'It never slows down.', portrait: null, background: 'bg_chase' }
];

export const newbuilding_chase_resolution_good = [
  { id: 'nb_chr_g_01', speaker: null, text: 'The protagonist stumbles toward the light. She reaches out.', portrait: null, background: 'bg_chase' },
  { id: 'nb_chr_g_02', speaker: 'Protagonist', text: 'I... I\'m not done yet.', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_chr_g_03', speaker: null, text: 'She steps into the light. Everything fades to white.', portrait: null, background: null },
];

export const newbuilding_chase_resolution_bad = [
  { id: 'nb_chr_b_01', speaker: null, text: 'Dark hands wrap around the protagonist. She struggles.', portrait: null, background: 'bg_chase' },
  { id: 'nb_chr_b_02', speaker: 'Protagonist', text: 'No...', portrait: 'portrait_protagonist', background: null },
  { id: 'nb_chr_b_03', speaker: null, text: 'The whispers become one voice.', portrait: null, background: null },
  { id: 'nb_chr_b_04', speaker: 'Despair', text: 'Stay.', portrait: 'portrait_despair', background: null },
  { id: 'nb_chr_b_05', speaker: null, text: 'Everything goes black.', portrait: null, background: null },
];
