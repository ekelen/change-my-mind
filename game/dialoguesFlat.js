const dialogues = {
  "opt-479": {
    text: "Well then. Sounds like catching fish is just what you have to do.",
    valence: -1,
    oars: "notOars",
    response: "res-480",
    id: "opt-479",
  },
  "res-480": {
    text:
      "I know. But the thing is, it's boring.\n" +
      "          \n" +
      "          Stripping the flesh from your torso, not so much.\n" +
      "          \n" +
      "          Nice talking to you, human.",
    change: false,
    darncat: "desire",
    id: "res-480",
  },
  "opt-481": {
    text:
      "When I was a kid, I used to catch fish with a stick.\n" +
      "\n" +
      "        I never caught any.\n" +
      "        \n" +
      "        But it was fun.",
    oars: "notOars",
    valence: -1,
    response: "res-482",
    id: "opt-481",
  },
  "res-482": {
    text: "That's nice, human. I'm sure you were a very tasty kid.",
    change: false,
    darncat: "desire",
    advance: true,
    id: "res-482",
  },
  "opt-485": {
    text: "What's wrong with glass peanut butter jars?",
    oars: "notOars",
    valence: 0,
    response: "res-486",
    id: "opt-485",
  },
  "res-486": {
    text: "I mean, just think about it for like 5 more seconds.",
    id: "res-486",
  },
  "opt-487": {
    text: "So, hunting humans is a rewarding challenge, but friends are putting heat on you to catch fish.",
    oars: "summarize",
    change: true,
    valence: 0,
    response: "res-488",
    id: "opt-487",
  },
  "res-488": {
    text: "Yeah. They say that if I don't catch fish, I'll starve. But it's only October. I can catch fish later.",
    darncat: "reason",
    change: false,
    id: "res-488",
  },
  "opt-491": {
    text: "That's pretty messed up, bear.",
    oars: "notOars",
    valence: -1,
    attemptChange: false,
    response: "res-492",
    id: "opt-491",
  },
  "res-492": { text: "I know, right?", id: "res-492" },
  "opt-493": {
    text: "What if you spent half your time catching fish, and the other half setting human-traps?",
    oars: "notOars",
    valence: -1,
    attemptChange: true,
    response: "res-494",
    id: "opt-493",
  },
  "res-494": {
    text: "It doesn't work like that. Hunting humans is a whole-ass kind of deal.",
    id: "res-494",
  },
  "opt-503": {
    text: "And catching fish sucks – could you invent a more interesting way to do it?",
    oars: "notOars",
    valence: 0,
    response: "res-504",
    id: "opt-503",
  },
  "res-504": { text: "No.", id: "res-504" },
  "opt-505": {
    oars: "notOars",
    text: "I'm sorry that humans messed things up so badly.",
    valence: -1,
    response: "res-506",
    id: "opt-505",
  },
  "res-506": {
    text: "I'm not. It makes me feel better about eating you.",
    id: "res-506",
  },
  "opt-509": {
    text: "Given what you've told me, what do you think a next step might be?",
    valence: 100,
    response: "res-510",
    id: "opt-509",
  },
  "res-510": { text: "Time to make a plan, I guess.", id: "res-510" },
  "opt-507": {
    text: "You could pass forward not just the wisdom you've inherited, but the cunning you've developed.",
    valence: 1,
    oars: "summarize",
    response: "res-508",
    id: "opt-507",
  },
  "res-508": { text: "Yeah. I guess so.", options: ["opt-509"], id: "res-508" },
  "opt-501": {
    oars: "openEndedQuestion",
    text: "If you made it through the winter, what could you do next year that's more aligned with your values?",
    valence: 1,
    response: "res-502",
    id: "opt-501",
  },
  "res-502": {
    text:
      "Next year... I could eat a LOT more humans. \n" +
      "                      \n" +
      "                      I could show OTHER bears how to hunt humans, too.\n" +
      "                      \n" +
      "                      Us bears have been really pushed to the brink these last few decades, you know.",
    options: ["opt-503", "opt-505", "opt-507"],
    id: "res-502",
  },
  "opt-511": {
    oars: "notOars",
    text: "How about we make a plan to get you through the winter?",
    valence: -1,
    response: "res-512",
    id: "opt-511",
  },
  "res-512": {
    text: "I'm not sure I'm ready to make a plan yet.",
    id: "res-512",
  },
  "opt-513": {
    oars: "notOars",
    text: "I'd be pretty sad, too. I haven't known you for very long, but you are interesting, as far as bears go.",
    valence: -1,
    response: "res-514",
    id: "opt-513",
  },
  "res-514": {
    text: "Don't patronize me, human. It makes me hungry.",
    id: "res-514",
  },
  "opt-499": {
    text: "You have to have enough energy stored for your body to make it through the winter.",
    oars: "reflect",
    valence: 1,
    attemptChange: false,
    response: "res-500",
    id: "opt-499",
  },
  "res-500": {
    darncat: "desire",
    text:
      "Yeah, I mean, I don't have INTERNET *eye roll*, but I'm pretty sure that's how it works.\n" +
      "                      \n" +
      "                      I'd be kinda sad not to make it through the winter...",
    change: true,
    options: ["opt-501", "opt-511", "opt-513"],
    id: "res-500",
  },
  "opt-515": {
    oars: "notOars",
    text: "You're not getting fat, so you're going to die.",
    valence: -1,
    response: "res-516",
    id: "opt-515",
  },
  "res-516": {
    darncat: "activation",
    text:
      "You know what? You're right. \n" +
      "                      \n" +
      "                      I'm gonna die, you're gonna die. \n" +
      "                      \n" +
      "                      I might as well go out in style, you know? \n" +
      "                      \n" +
      "                      Doing what I love. Eating humans.",
    id: "res-516",
  },
  "opt-517": {
    oars: "notOars",
    text: "Based on what you've said, it seems like not starving is maybe better, right?",
    valence: -1,
    response: "res-518",
    id: "opt-517",
  },
  "res-518": {
    text:
      "Oh? What, just sit there and wait for them to swim by? I'm not your uncle Jimmy, starting on his second pack of Heineken on the dock before dinner on a Tuesday.\n" +
      "                      \n" +
      "                      I'm a PREDATOR.",
    id: "res-518",
  },
  "opt-497": {
    oars: "openEndedQuestion",
    text: "How important is it that you get fat?",
    attemptChange: true,
    valence: 0,
    response: "res-498",
    id: "opt-497",
  },
  "res-498": {
    darncat: "need",
    text: "Well, it's pretty obvious, right? We have to turbo-charge for the winter, otherwise we... like, die, I guess.",
    options: ["opt-499", "opt-515", "opt-517"],
    id: "res-498",
  },
  "opt-495": {
    oars: "affirm",
    text: "You've decided that you don't need to catch fish to live your best life.",
    change: false,
    valence: 1,
    response: "res-496",
    id: "opt-495",
  },
  "res-496": {
    darncat: "ability",
    text:
      "That's what I WANT to think.\n" +
      "        \n" +
      "        And it's what I DO think, when I'm caught up in the hunt.\n" +
      "        \n" +
      "        Thing is...\n" +
      "              \n" +
      "              Can this really be my best life, if I'm spending so much time setting human traps that I'm not getting fat?",
    change: true,
    options: ["opt-497"],
    id: "res-496",
  },
  "opt-489": {
    text: "So, your friends are putting heat on you to catch fish, but hunting humans is a rewarding challenge.",
    oars: "summarize",
    change: false,
    valence: -1,
    response: "res-490",
    id: "opt-489",
  },
  "res-490": {
    text:
      `You know what the best part of hunting humans is? Pretending to be some bumbling kid's toy. I'm like,
        "Oh bother, I'm so cute. I'm so cuddly. Take a selfie with me." \n` +
      "      \n" +
      "      And then I eat them. \n" +
      "      \n" +
      "      It's great.",
    change: false,
    options: ["opt-491", "opt-493", "opt-495"],
    id: "res-490",
  },
  "opt-483": {
    text: "Uh... Tell me about hunting humans.",
    oars: "openEndedQuestion",
    change: false,
    advance: true,
    response: "res-484",
    id: "opt-483",
  },
  "res-484": {
    requiredLevel: 0,
    text:
      "So, it's like this.\n" +
      "  \n" +
      "  Humans are just CLEVER – yeah, yeah, don't let it go to your head. \n" +
      "  \n" +
      "  Have you ever seen a bear-proof garbage bin? Well, I have, and if there's one thing I hate MORE than glass peanut butter jars, it's a bear-proof garbage bin.\n" +
      "\n" +
      "  A mark of your species' ingenuity.\n" +
      "\n" +
      "  But there are no bear-proof humans.\n" +
      "          \n" +
      "      ...Hey, do you have any peanut butter on you?",
    darncat: "desire",
    change: false,
    options: ["opt-485", "opt-487", "opt-489"],
    id: "res-484",
  },
  undefined: { response: "res-478" },
  "res-478": {
    required_level: 0,
    text:
      "Oh, human. \n" +
      "    \n" +
      "    This must be, like, your worst nightmare.\n" +
      "  \n" +
      "  I'm a bear, and I LIVE for HUMAN-HUNTING!\n" +
      "  \n" +
      "  Winter is coming, though, and everyone's all up in my muzzle, telling me I have to catch fish and fatten up.\n" +
      "  \n" +
      "  You see, fish are FAT and SLOW this time of year, and us bears gotta bulk.\n" +
      "  \n" +
      "  Thing is...\n" +
      "  \n" +
      "  Fish are too easy. I'd rather catch humans.",
    options: ["opt-479", "opt-481", "opt-483"],
    id: "res-478",
  },
};
