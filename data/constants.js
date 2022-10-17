const DARNCAT = {
  desire: "desire",
  ability: "ability",
  reason: "reason",
  need: "need",
  commitment: "commitment",
  activation: "activation",
  takingSteps: "takingSteps",
};

const OARS = {
  openEndedQuestion: "openEndedQuestion",
  affirm: "affirm",
  reflect: "reflect",
  summarize: "summarize",
};

const NOT_OARS = {
  iStatement: "iStatement",
  closedQuestion: "closedQuestion",
  flattery: "flattery",
  planTooEarly: "planTooEarly",
  judgment: "judgment",
  advice: "advice",
  expert: "expert",
  sustain: "sustain",
};

const NOT_OARS_EXPLANATION = {
  [NOT_OARS.iStatement]:
    "⚠️ It's not about you!\n\n\"I-statements\" don't honor the spirit of MI. They're about you, not the client.\n\nUnless you know the client, you can't know what effect your comment will have.",
  [NOT_OARS.closedQuestion]:
    "⚠️ Not an open-ended question!\n\nYes/no questions are not usually effective in the evocation stage of MI.\n\nThey do not invite reflection or further the conversation.",
  [NOT_OARS.flattery]:
    "⚠️ Flattery will get you nowhere!\n\nFlattery is not a skill of MI.\n\nWe can AFFIRM a client's strengths based on what they have told us, but we should not give them compliments whose source is unclear.",
  [NOT_OARS.planTooEarly]:
    "⚠️ We're not at the planning phase yet!\n\nThe planning phase is the last stage of MI. We should not be talking about it until we have evoked the client's motivation to change.",
  [NOT_OARS.judgment]:
    "⚠️ Judgment is not a skill of MI.\n\nBy judging a client's choices, we are showing them that we believe our perception of the situation is superior to theirs.",
  [NOT_OARS.advice]:
    "⚠️ Ahem, who asked you?\n\nAdvice is not a skill of MI. It violates the principles of Acceptance and Partnership.\n\nIn some cases it can be appropriate—e.g. if we're explicitly asked.",
  [NOT_OARS.expert]:
    "⚠️ Take off your lab coat!\n\nIn MI, it's important to view the client as the expert.\n\nTherefore, we don't want to use language that makes us sound like we think we have the intellectual upper hand.",
  [NOT_OARS.sustain]:
    '⚠️ Eliciting "Sustain talk"!\n\nEven though it shows you understand your client\'s position, questions and statements that reinforce SUSTAINING a behavior—rather than evoking motivation for making a CHANGE—can keep a client feeling stuck in old behavior.',
};

const OARS_EXPLANATION = {
  openEndedQuestion:
    '☑️ This is the OARS skill of asking OPEN-ENDED QUESTIONS: \n\n"MI makes particular use of open questions, those that invite the person to reflect and elaborate. \n\nClosed questions, in contrast, ask for specific information that can usually be offered as a short answer.\n\nIn MI, gathering information is not the most important function of questions. [...] Open questions [...] play a key role in evoking motivation and planning a course toward change."',
  affirm:
    '☑️ This is the OARS skill of AFFIRMATION: \n\n"Affirmation is both general and specific in MI.\n\nThe counselor in general respects and honors the client as a person of worth, with the capability for growth and change as well as volitional choice about whether to do so.\n\nThe interviewer also recognizes and comments on the client’s particular strengths, abilities, good intentions, and efforts."',
  reflect:
    '☑️ This is the OARS skill of REFLECTING:\n\n"Reflective statements that make a guess about the client’s meaning have the important function of deepening understanding by clarifying whether one’s guess is accurate. \n\nReflective statements also allow people to hear again the thoughts and feelings they are expressing, perhaps in different words, and ponder them."',
  summarize:
    '☑️ This is the OARS skill of SUMMARIZING:\n\n"Summaries are essentially reflections that collect what a person has been saying, offering it back as in a basket.\n\n[...] They may suggest links between present material and what has been discussed before.\n\n[...] In evoking, there are particular guidelines for what to include in a summary in order to collect change talk and move along the process of change."',
};

module.exports = {
  OARS,
  OARS_EXPLANATION,
  NOT_OARS,
  NOT_OARS_EXPLANATION,
  DARNCAT,
};
