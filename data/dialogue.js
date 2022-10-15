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
    "⚠️ Who asked you?\n\nAdvice is not a skill of MI. It violates the principles of Acceptance and Partnership.\n\nIn some cases it can be appropriate—e.g. if we're explicitly asked.",
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

const O_NEXTYEAR = {
  oars: OARS.openEndedQuestion,
  text: `If you made it through the winter, what could you do next year that's more aligned with your values?`,
  valence: 1,
  response: {
    text: `Next year... I could eat a LOT more humans. 
                      
                      I could show OTHER bears how to hunt humans, too.
                      
                      Us bears have been really pushed to the brink these last few decades, you know.`,
    options: [
      {
        text: `And catching fish sucks – could you invent a more interesting way to do it?`,
        oars: NOT_OARS.planTooEarly,
        valence: 0,
        response: {
          text: `No.`,
        },
      },
      {
        text: `I'm sorry that humans messed things up so badly.`,
        oars: NOT_OARS.iStatement,
        valence: -1,
        response: {
          text: `I'm not. It makes me feel better about eating you.`,
        },
      },
      {
        text: `You could pass forward not just the wisdom you've inherited, but the cunning you've developed.`,
        valence: 1,
        oars: OARS.summarize,
        response: {
          text: `Yeah. I guess so.`,
          options: [
            {
              text: `Given what you've told me, what do you think a next step might be?`,
              valence: 10,
              response: {
                text: `Time to make a plan, I guess.`,
              },
            },
          ],
        },
      },
    ],
  },
};

const R_TOY = {
  text: `You know what the best part of hunting humans is? Pretending to be some bumbling kid's toy. I'm like, "Oh bother, I'm so cute. I'm so cuddly. Take a selfie with me." 
      
      And then I eat them. 
      
      It's great.`,
  change: false,
  options: [
    {
      text: `That's pretty messed up, bear.`,

      oars: NOT_OARS.judgment,
      valence: -1,
      attemptChange: false,
      response: {
        text: `I know, right?`,
      },
    },
    {
      text: `What if you spent half your time catching fish, and the other half setting human-traps?`,

      oars: NOT_OARS.advice,
      valence: -1,
      attemptChange: true,
      response: {
        text: `It doesn't work like that. Hunting humans is a whole-ass kind of deal.`,
      },
    },
    {
      oars: OARS.affirm,
      text: `You've decided that you don't need to catch fish to live your best life.`,
      change: false,
      valence: 1,
      response: {
        darncat: DARNCAT.ability,
        text: `That's what I WANT to think.
        
        And it's what I DO think, when I'm caught up in the hunt.
        
        Thing is...
              
              Can this really be my best life, if I'm spending so much time setting human traps that I'm not getting fat?`,
        change: true,
        options: [
          {
            text: `You could just eat more fish.`,
            oars: NOT_OARS.advice,
            valence: -1,
            response: {
              text: `No. There's no *just* eating fish. It's super lame.`,
            },
          },
          {
            oars: OARS.openEndedQuestion,
            valence: 1,
            text: `How important is it that you get fat?`,
            attemptChange: true,
            response: {
              darncat: DARNCAT.need,
              text: `Well, it's pretty obvious, right? We have to turbo-charge for the winter, otherwise we... like, die, I guess.`,
              options: [
                {
                  text: `You have to have enough energy stored for your body to make it through the winter.`,
                  oars: OARS.reflect,
                  valence: 1,
                  attemptChange: false,
                  response: {
                    darncat: DARNCAT.desire,
                    text: `Yeah, I mean, I don't have INTERNET *eye roll*, but I'm pretty sure that's how it works.
                      
                      I'd be kinda sad not to make it through the winter...`,
                    change: true,
                    options: [
                      O_NEXTYEAR,
                      {
                        text: `How about we make a plan to get you through the winter?`,
                        oars: NOT_OARS.planTooEarly,
                        valence: -1,
                        response: {
                          text: `I'm not sure I'm ready to make a plan yet.`,
                        },
                      },
                      {
                        text: `I'd be pretty sad, too. I haven't known you for very long, but you are interesting, as far as bears go.`,
                        oars: NOT_OARS.iStatement,
                        valence: -1,
                        response: {
                          text: `Don't patronize me, human. It makes me hungry.`,
                        },
                      },
                    ],
                  },
                },
                {
                  text: `You should just go get some normal food, bear. This isn't the way.`,
                  valence: -1,
                  oars: NOT_OARS.judgment,
                  response: {
                    darncat: DARNCAT.activation,
                    text: `Right, kid.
                    
                    I don't think a human knows the way better than I do.`,
                  },
                },
                {
                  text: `Based on what you've said, it seems like not starving is maybe better, right?`,
                  valence: -1,
                  response: {
                    text: `Oh? What, just sit there and wait for them to swim by? I'm not your uncle Jimmy, starting on his second pack of Heineken on the dock before dinner on a Tuesday.
                      
                      I'm a PREDATOR.`,
                  },
                },
              ],
            },
          },
          {
            text: `Are you thinking you should just get out there and fish?`,
            oars: NOT_OARS.closedQuestion,
            valence: -1,
            response: {
              text: `Not really.`,
            },
          },
        ],
      },
    },
  ],
};

const R_PRIDE = {
  change: true,
  darncat: DARNCAT.reason,
  text: `Yeah, I really think so.
                          
                          I'm just kind of proud, you know? Like, I kind of regret not just catching those swole sockeye when I had the chance.
                          
                          I'm gonna end up on TikTok as the world's hugest trash panda.`,
  options: [
    {
      oars: OARS.reflect,
      valence: 0,
      text: `Dumpster diving wouldn't be in line with your vision of yourself.`,
      attemptChange: false,
      response: {
        change: true,
        text: `Nooooooooo. Naw. Nuh-uh.`,
        options: [
          {
            text: `I think you're a pretty cool bear, for what it's worth.`,
            oars: NOT_OARS.flattery,
            valence: -1,
            response: {
              text: `Thanks, I guess...`,
            },
          },
          {
            text: `You'd still get to terrify humans if you root around in their dumpsters.`,
            oars: NOT_OARS.advice,
            valence: -2,
            response: {
              text: `It's not the same. I don't get to outsmart them.`,
            },
          },
          {
            text: "Being a master of your craft matters to you. It's something other bears take note of.",
            valence: 1,
            oars: OARS.affirm,
            response: {
              text: `I guess if I'm dead because I didn't haul ass and go fishing, no one's gonna be too impressed.`,
              options: [
                O_NEXTYEAR,
                {
                  text: `Well, you'd leave behind a legacy of fear and loathing among humans. That's something.`,
                  oars: NOT_OARS.sustain,
                  valence: 0,
                  response: {
                    text: `Heck yeah I would.
                  
                  Payback for glass peanut butter jars. Fair's fair.`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      text: `You have a high kill count. Maybe word has gotten around.`,
      oars: NOT_OARS.sustain,
      valence: -1,
      response: {
        text: `Yeah, you know, I bet it has. And it'll be even higher if they catch me gnawing on your bones.`,
      },
    },
  ],
};

const O_SUMM = {
  oars: OARS.summarize,
  text: `Hunting humans brings purpose and accomplishment to your life. 
        
        But you also have found meaning in listening to the wisdom of your fellow bears.
        
        And you want to survive the winter.
        
        Have I got that right?`,
  valence: 2,
  attemptChange: true,
  response: {
    change: true,
    text: `Yeah. Well, also maybe even long enough to pass on some of my knowledge to my own cubs.
            
            I don't know if I'm cut out to be a dad, but I don't think bear dads are, like, *involved*.
            
            But I'd teach them some bear stuff for sure.`,
    options: [
      {
        text: `Pretty sure dad-bears eat bear cubs...`,
        oars: NOT_OARS.expert,
        valence: -1,
        response: {
          text: `Well, I don't want to eat bear cubs. I want to eat humans. Especially if there's no point in my even TRYING to be a dad.`,
        },
      },
      {
        oars: OARS.reflect,
        text: `You've been given wisdom, and you don't want it to be lost with you.`,
        valence: 1,
        response: {
          text: `Right.
                        
                        And like, I'm also pretty smart, bear-wise.
                        
                        Like, there's this grocery store.
                        
                        With a totally NOT bear-proof dumpster.
                        
                        I usually consider myself above dumpster diving, but I've scoped it out. 
                        
                        I wonder if I could loot it and catch up on fat stores real quick.`,
          darncat: DARNCAT.takingSteps,
          options: [
            {
              oars: OARS.reflect,
              text: `Dumpsters might be a way to make it through the winter.`,
              valence: 1,
              attemptChange: true,
              response: R_PRIDE,
            },
            {
              text: `Dumpster-chickens wouldn't be as fun as hunting humans, though.`,
              oars: OARS.reflect,
              valence: -2,
              response: {
                text: `Correctamundo! Have you ever had a game to play that made the real world just not matter anymore?
                
                That's how awesome human-catching is.`,
              },
            },
            {
              text: `It wouldn't be as fun as catching humans, but you have a possible strategy to get enough food to survive.`,
              valence: 1,
              attemptChange: true,
              response: R_PRIDE,
              oars: OARS.reflect,
            },
          ],
        },
      },
    ],
  },
};

const R_CLEVER = {
  requiredLevel: 0,
  text: `Humans are just CLEVER – yeah, yeah, don't let it go to your head.
  
  That's what makes it fun.
  
  Have you ever seen a bear-proof garbage bin? 
  
  Well, I have, and if there's one thing I hate MORE than glass peanut butter jars... 
  
  It's a bear-proof garbage bin.

  A mark of your species' ingenuity... But there are no bear-proof humans.
          
      ...Hey, do you have any peanut butter on you?`,
  darncat: DARNCAT.desire,
  change: false,
  options: [
    {
      text: `What's wrong with glass peanut butter jars?`,

      valence: 0,
      response: {
        text: `I mean, just think about it for like 5 more seconds.`,
      },
    },
    {
      text: `So, hunting humans is a rewarding challenge, but friends are putting heat on you to catch fish.`,
      oars: OARS.summarize,
      change: true,
      valence: 1,
      response: {
        text: `Yeah. They say that if I don't catch fish, I'll starve. But it's only October. I can catch fish later.`,
        darncat: DARNCAT.reason,
        change: false,
        options: [
          {
            text: `I could be wrong, but don't bears hibernate in, like, September?`,

            oars: NOT_OARS.expert,
            valence: -1,
            attemptChange: true,
            response: {
              text: `Most of them. I'm not like the rest.`,
            },
          },
          {
            text: `It's only October - you have a couple of months to get enough fish.`,
            oars: OARS.reflect,
            valence: 1,
            attemptChange: false,
            response: {
              text: `That's right.
                
                *pause*
                
                I mean, I'm kind of marching to the beat of my own drum here. 
                
                Most of my friends are actually hibernating already. 
                
                But they're just softies who are scared of having to punch through a little ice.`,
              change: true,
              darncat: DARNCAT.desire,
              options: [
                {
                  oars: OARS.reflect,
                  text: `Your friends aren't as tough as you are.`,
                  valence: 1,
                  attemptChange: false,
                  response: {
                    text: `Nope. I mean, maybe they did the air-quotes "SENSIBLE" thing and caught fish, but I can be an ice-fishing bear.
                          
                          I'm pretty smart. I can figure it out.
                          
                          In the meantime, the leaves are about to change, and do you know what that means?
                          
                          Pumpkin spice lattes... coursing through human flesh. Mmmm...`,
                    change: true,
                    options: [
                      {
                        oars: OARS.reflect,
                        valence: 2,
                        text: `You've got some unusual skills. And you refuse to follow the herd.`,
                        response: {
                          change: true,
                          text: `It's actually a SLEUTH of bears, not a "herd." Just FYI.
                          
                          But yeah, when it comes to hunting humans, I'm a bit of a loner.
                          
                          I usually kinda take pride in it, but there's a little part of me that's worried.
                          
                          And like, maybe I should have listened to my elders – their wisdom.
                          
                          Maybe I should have listened. I coulda gone fishing. Got fat. Hibernated on time.`,
                          options: [
                            O_SUMM,
                            {
                              text: `Do you think you'll be an elder someday?`,

                              oars: NOT_OARS.closedQuestion,
                              valence: 0,
                              response: {
                                text: "Doubt it.",
                              },
                            },
                            {
                              text: `Tell me about the elders.`,
                              oars: OARS.openEndedQuestion,
                              valence: 1,
                              response: {
                                text: `Bears aren't exactly... family-oriented. But they teach each other by action, by doing.`,
                                options: [
                                  O_SUMM,
                                  {
                                    text: `If you die this winter, what will you teach other bears?`,
                                    valence: 0,
                                    response: {
                                      text: `That it's chill to die doing what you love.`,
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              text: `I mean, if I had stuck with my crowd, I'd be drinking a chocolate old fashioned at the lodge right now.`,
                              valence: -1,
                              oars: NOT_OARS.iStatement,
                              response: {
                                text: `That sounds disgusting. I only like chocolate melted in the pockets of my prey.`,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  text: `I reeeeally think you should be focusing on easier prey right now.`,
                  oars: NOT_OARS.advice,
                  valence: -1,
                  response: {
                    text: `Like you? *licks chops*`,
                  },
                },
                {
                  text: `Is it possible most bears don't like ice-fishing for a reason?`,
                  oars: NOT_OARS.judgment,
                  valence: -1,
                  response: {
                    text: `Like being lazy? *licks chops*`,
                  },
                },
                {
                  text: `Tell me about what it would be like to be the first ice-fishing bear of your species.`,
                  oars: NOT_OARS.sustain,
                  valence: -1,
                  response: {
                    text: `Like being lazy? *licks chops*
                    
                    I'd be a GREAT ice-fisher. Hunkered down, watching the ice, waiting for the perfect moment to strike.`,
                  },
                },
              ],
            },
          },
          {
            text: `You've thought ahead. Being clever is important to you.`,
            oars: OARS.affirm,
            valence: 1,
            change: false,
            response: {
              text: `That's why I like hunting humans. It's a challenge to outsmart them. 
                
                Thing is... 
                
                If I were better at planning ahead, I would have caught more humans this summer. 
                
                I am clever, but I could have been a little more efficient.`,
              change: true,
              darncat: DARNCAT.ability,
              options: [
                {
                  oars: OARS.openEndedQuestion,
                  text: `How could you have been more efficient?`,
                  attemptChange: true,
                  valence: 0,
                  response: {
                    change: false,
                    darncat: DARNCAT.ability,
                    text: `I could have been more efficient by catching more humans.
                          
                          There are legends told in these parts, of bears who caught MORE than enough humans to sustain them... but excess is a human feature.`,
                    options: [
                      {
                        oars: NOT_OARS.flattery,
                        text: `Bears are more reasonable than humans.`,
                        valence: -1,
                        response: {
                          text: `You're just saying that to not get eaten.`,
                        },
                      },
                      {
                        oars: NOT_OARS.closedQuestion,
                        text: `Could you have caught enough humans?`,
                        response: {
                          text: `Probably not.`,
                        },
                      },
                      {
                        oars: OARS.reflect,
                        text: `Humans are hoarders. Your species has preserved an ancient dialogue with nature.`,
                        attemptChange: true,
                        valence: 1,
                        response: {
                          change: false,
                          text: `Yeah. I mean, look at you — no offense, but "clothes" look like garbage bags.`,
                          options: [
                            {
                              oars: OARS.affirm,
                              text: `Your kind has discovered how to survive without taking what it doesn't need.`,
                              valence: 1,
                              response: {
                                change: true,
                                darncat: DARNCAT.need,
                                text: `I dunno. Most bears are pretty dumb. I'm not even sure if they have object permanence.
                                
                                But sometimes I think they might be right about some stuff.
                                
                                Like, you're really not the most calorically dense of foodstuffs.`,
                                options: [
                                  {
                                    oars: OARS.openEndedQuestion,
                                    text: `What parts do you think they might be right about?`,
                                    valence: 0,
                                    attemptChange: true,
                                    response: {
                                      text: `Hibernating earlier. Eating more. Not being so damn picky.
                                              
                                              I'm scared my time has run out to catch up, caloric-surplus-wise.
                                              
                                              The fear just keeps me locked into this cycle of human-stalking instead.
                                              
                                              It's a great distraction.
                                              
                                              It makes me feel like I'm doing something, even though I'm not.`,
                                      change: true,
                                      darncat: DARNCAT.desire,
                                      options: [
                                        {
                                          text: `You're right. You're not doing anything. You're just eating humans.`,

                                          valence: -1,
                                          attemptChange: false,
                                          response: {
                                            text: `It's what I do.`,
                                          },
                                        },
                                        {
                                          text: `Is it too late?`,

                                          valence: -1,
                                          attemptChange: false,
                                          response: {
                                            text: `Yes. It's OCTOBER. Who am I kidding? There's no way. 
  
                                            I'm gonna die.
                                            
                                            I'm gonna die and some park ranger is gonna give my carcass to the locals for a basement throw rug.`,
                                          },
                                        },
                                        O_SUMM,
                                        {
                                          text: `Yeah, I do. Procrastination is a human thing, too.`,
                                          oars: NOT_OARS.iStatement,
                                          response: {
                                            text: `Humans are poor arbiters of their time.
                                            
                                            It is known.`,
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    oars: NOT_OARS.flattery,
                                    valence: -1,
                                    text: `You're a really smart bear.`,
                                    response: {
                                      text: `You're just saying that to not get eaten.`,
                                    },
                                  },
                                  {
                                    oars: NOT_OARS.expert,
                                    valence: -1,
                                    text: `Yanno, I've been on reddit. You might be interested in learning about macros.`,
                                    response: {
                                      text: `Um... sure...`,
                                    },
                                  },
                                  {
                                    oars: NOT_OARS.sustain,
                                    valence: -1,
                                    text: `But you've made it this long. Maybe you should just listen to your gut. Uh, after you let me go.`,
                                    response: {
                                      text: `My gut tells me to eat you.`,
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              text: `Actually, humans are a tropical species.`,
                              oars: NOT_OARS.expert,
                              valence: -1,
                              response: {
                                change: 0,
                                text: `Well, you sure look goofy.`,
                              },
                            },
                            {
                              text: `I bet you have a pretty great clothes collection, from all the humans you've eaten.`,
                              valence: -1,
                              oars: NOT_OARS.sustain,
                              response: {
                                text: `Yes, and it THRILLS me to add to it!`,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      text: `Hunting humans is a rewarding challenge.`,
      oars: NOT_OARS.sustain,
      change: false,
      valence: 0,
      response: R_TOY,
    },
  ],
};

const START = {
  id: "opt-start",
  response: {
    id: "res-start",
    required_level: 0,
    text: `Oh, human. 
    
    This must be, like, your worst nightmare.
  
  I'm a bear, and I LIVE for HUMAN-HUNTING!
  
  Winter is coming, though, and everyone's all up in my muzzle, telling me I have find some squirrel caches or catch fish and fatten up.
  
  But nuts and fish? YAWN. I'd rather catch humans.`,
    options: [
      {
        text: "Well then. Sounds like catching fish is just what you have to do.",
        valence: -1,
        oars: NOT_OARS.advice,
        response: {
          text: `I know. But the thing is, it's boring.
          
          Stripping the flesh from your torso, not so much.
          
          Nice talking to you, human.`,

          change: false,
          darncat: DARNCAT.desire,
        },
      },
      {
        text: `When I was a kid, I used to catch fish with a stick.

        I never caught any.`,
        oars: NOT_OARS.iStatement,
        valence: -1,
        response: {
          text: `That's nice, human. I'm sure you were a very tasty kid.`,

          change: false,
          darncat: DARNCAT.desire,
          advance: true,
        },
      },
      {
        text: "Uh... Tell me about hunting humans.",
        oars: OARS.openEndedQuestion,
        valence: 1,
        change: false,
        advance: true,
        response: R_CLEVER,
      },
    ],
  },
};

module.exports = {
  START,
  DARNCAT,
  OARS,
  OARS_EXPLANATION,
  NOT_OARS,
  NOT_OARS_EXPLANATION,
};
