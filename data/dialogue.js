const {
  NOT_OARS,
  OARS,
  DARNCAT,
  OARS_EXPLANATION,
  NOT_OARS_EXPLANATION,
} = require("./constants");

const O_MAKEPLAN = {
  id: "opt-end",
  text: `Given what you've told me, what do you think a next step might be?`,
  valence: 10,
  response: {
    id: "res-end",
    text: `Time to make a plan, I guess.`,
  },
};

const R_THINKABOUT = {
  text: `This has given me a lot to think about.`,
  options: [O_MAKEPLAN],
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
        text: `And foraging sucks – what would be a more interesting way to do it?`,
        oars: NOT_OARS.planTooEarly,
        valence: 0,
        response: {
          text: `I don't think I'm ready to make a plan yet.`,
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
        response: R_THINKABOUT,
      },
    ],
  },
};

const R_TOY = {
  text: `You know what the best part of hunting humans is? Pretending to be some bumbling kid's toy. 
  
  I'm like, "Oh bother, I'm so cute. I'm so cuddly. Take a selfie with me." 
      
      And then I eat them.`,
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
      text: `What if you spent half your time foraging, and the other half setting human-traps?`,

      oars: NOT_OARS.advice,
      valence: -1,
      attemptChange: true,
      response: {
        text: `It doesn't work like that. Hunting humans is a whole-ass kind of deal.`,
      },
    },
    {
      oars: OARS.affirm,
      text: `For now, you've decided that you don't need to forage to live your best life.`,
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
            text: `You could just eat more vegetation.`,
            oars: NOT_OARS.advice,
            valence: -1,
            response: {
              text: `No. There's no *just* eating vegetation. It's super lame.`,
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
                  text: `So, you have to have enough energy stored for your body to make it through the winter.`,
                  oars: OARS.reflect,
                  valence: 1,
                  attemptChange: false,
                  response: {
                    darncat: DARNCAT.desire,
                    text: `I'd be kinda sad not to make it through the winter...`,
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
                    text: `What, go poking around for nuts and berries like an ecotourist?
                      
                      I'm a PREDATOR.`,
                  },
                },
              ],
            },
          },
          {
            text: `Are you thinking you should just get out there and forage?`,
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
        text: `No. I'm scary. *roars*
        
        And... super hungry.`,
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
              text: `And if I'm dead because I didn't haul ass and go forage, no one's gonna be too impressed.`,
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
        
        Surviving the winter is a big part of those teachings.`,
  valence: 2,
  attemptChange: true,
  response: {
    change: true,
    text: `And... I'd like to live long enough to pass on some of my knowledge to my own cubs.
            
            I don't think bear dads are, like, *involved*.
            
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
          text: `Right. Plus... this will sound cocky...
          
          I just feel to smart to die.
                        
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
      text: `So, hunting humans is a rewarding challenge, but friends are putting heat on you to forage.`,
      oars: OARS.summarize,
      change: true,
      valence: 1,
      response: {
        text: `Yeah. They say that if I don't go all-in on vegetation, I'll starve. But it's only October. I can berry-pick later.`,
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
            text: `It's only October - you have a couple of months to find enough to eat.`,
            oars: OARS.reflect,
            valence: 1,
            attemptChange: false,
            response: {
              text: `That's right.
                
                Well, um, I mean, I'm kind of marching to the beat of my own drum here. 
                
                Most of my friends are actually hibernating already. 
                
                But they're just softies who are scared of having to punch through a little ice.`,
              change: true,
              darncat: DARNCAT.desire,
              options: [
                {
                  oars: OARS.reflect,
                  text: `From what you've seen, your friends aren't as tough as you are.`,
                  valence: 1,
                  attemptChange: false,
                  response: {
                    text: `Nope. I mean, maybe they did the air-quotes *sensible* thing, and caught dumb animals and raided squirrel stores, but I can be an ice-fishing bear.
                          
                          I'm pretty smart. I can figure it out.
                          
                          In the meantime, the leaves are about to change, and do you know what that means?
                          
                          Pumpkin spice lattes... coursing through human flesh. Mmmm...`,
                    change: true,
                    options: [
                      {
                        oars: OARS.reflect,
                        valence: 2,
                        text: `Er, seasonal tastiness of my species aside, you've got some unusual skills. And you refuse to follow the herd.`,
                        response: {
                          change: true,
                          text: `It's actually a SLEUTH of bears, not a "herd." Just FYI.
                          
                          But yeah, when it comes to hunting humans, I'm a bit of a loner.
                          
                          I usually kinda take pride in it, but there's a little part of me that's worried.
                          
                          And like, maybe I should have listened to my elders – their wisdom.
                          
                          Maybe I should have listened. I coulda gone fishing. Berry-picking. Got fat. Hibernated on time.`,
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
                                    text: `So, you're teaching other bears to starve by modelling mastery of human-stalking. Not very cool.`,
                                    oars: NOT_OARS.sustain,
                                    valence: -1,
                                    response: {
                                      text: `Well, maybe it's okay to die in pursuit of disruptive innovation.`,
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
                      {
                        oars: NOT_OARS.judgment,
                        text: `Maybe you could learn a little about the perils of hubris.`,
                        valence: -1,
                        response: {
                          text: `And you could learn a little about the perils of moralizing to a hungry bear.`,
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
                    text: `They're lazy?`,
                  },
                },
                {
                  text: `Tell me about what it would be like to be the first ice-fishing bear of your species.`,
                  oars: NOT_OARS.sustain,
                  valence: -1,
                  response: {
                    text: `I'd be a GREAT ice-fisher. Hunkered down, watching the ice, waiting for the perfect moment to strike.
                    
                    In fact, now I have a plan. Ice-fishing on weekdays. Kick back with some human-hunting on weekends. This winter will be epic!`,
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
                  oars: NOT_OARS.flattery,
                  text: `You've been pretty clever so far.`,
                  response: {
                    text: `How would you know? Would a clever bear be this gangly?`,
                  },
                },
                {
                  oars: NOT_OARS.sustain,
                  text: `You've been pretty clever so far. Your rampage has been all over the news.`,
                  valence: -1,
                  response: {
                    text: `I don't do this for fame. 
                    
                    Well, maybe a little... 
                    
                    Wanna come closer and take a selfie?`,
                  },
                },
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
                                              
                                              I think my insecurity keeps me locked into this cycle of human-stalking instead.
                                              
                                              It's a great distraction.
                                              
                                              It makes me feel like I'm doing something, even though I'm not, caloric-surplus-wise.`,
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
                                    oars: NOT_OARS.advice,
                                    valence: -1,
                                    text: `Yanno, I've been on reddit. You might be interested in learning about macros.`,
                                    response: {
                                      text: `Unsolicited nutrition advice?
                                      
                                      Has that worked on anyone?`,
                                    },
                                  },
                                  {
                                    oars: NOT_OARS.sustain,
                                    valence: -1,
                                    text: `But you've made it this long. Maybe you should just listen to your gut and keep stalking humans! 
                                    
                                    Uh, after you let me go.`,
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
    text: `Hello, human. 
    
    Guess what?
  
  I'm a bear, and I LIVE for HUMAN-HUNTING!
  
  Winter is coming, though, and everyone's all up in my muzzle, telling me I have find some nuts, berries, tubers and the like.
  
  But... nuts? YAWN. I'd rather catch humans.`,
    options: [
      {
        text: "Well then. Sounds like foraging is just what you have to do.",
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
        text: `When I was a kid, I used to catch fish with a stick. It was fun, but I would have starved if it were my only food source.`,
        oars: NOT_OARS.iStatement,
        valence: -1,
        response: {
          text: `That's nice, human. I'm sure you were a very tasty kid.`,

          change: false,
          darncat: DARNCAT.desire,
        },
      },
      {
        text: "Uh... Tell me about hunting humans.",
        oars: OARS.openEndedQuestion,
        valence: 1,
        change: false,
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
