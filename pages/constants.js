import FadeIn from "react-fade-in";

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
  notOars: "notOars",
};

const O_NEXTYEAR = {
  oars: OARS.openEndedQuestion,
  text: `If you made it through the winter, what could you do next year that's more aligned with your values?`,
  valence: 1,
  response: {
    text: `Next year... I could eat a LOT more humans. 
            
            This year was just a warm-up, if I'm being honest.
                      
                      I could show OTHER bears how to hunt humans, too.
                      
                      Us bears have been really pushed to the brink these last few decades, you know.`,
    options: [
      {
        text: `You could pass forward not just the wisdom you've inherited, but the cunning you've developed.`,
        valence: 1,
        response: {
          text: `Yeah. I guess so.`,
          options: [
            {
              text: `Given what you've told me, what do you think a next step might be?`,
              valence: 100,
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

export const R_TOY = {
  text: `You know what the best part of hunting humans is? Pretending to be some bumbling kid's toy. That's how I get them. I'm like, "Oh bother, I'm so cute. I'm so cuddly. Take a selfie with me." 
      
      And then I eat them. 
      
      It's great.`,
  change: false,
  options: [
    {
      text: `That's pretty messed up, bear.`,
      oars: OARS.notOars,
      valence: -1,
      attemptChange: false,
      response: {
        text: `I know, right?`,
      },
    },
    {
      text: `What if you spent half your time catching fish, and the other half setting human-traps?`,
      oars: OARS.notOars,
      valence: -1,
      attemptChange: true,
      response: {
        text: `It doesn't work like that. Hunting humans is a whole-ass kind of deal.`,
      },
    },
    {
      oars: OARS.affirm,
      text: `You don't need to catch fish to live your best life.`,
      change: false,
      valence: 1,
      response: {
        darncat: DARNCAT.ability,
        text: `That's what I told my buddies. Thing is...
              
              Thing is, I'm not getting fat off humans. I'm not getting fat off fish... 
              
              I'm not getting fat at all.`,
        change: true,
        options: [
          {
            oars: OARS.openEndedQuestion,
            text: `How important is it that you get fat?`,
            attemptChange: true,
            valence: 0,
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
                    options: [O_NEXTYEAR],
                  },
                },
                {
                  oars: OARS.notOars,
                  text: `You're not getting fat, so you're going to die.`,
                  valence: -1,
                  response: {
                    darncat: DARNCAT.activation,
                    text: `You know what? You're right. 
                      
                      I'm gonna die, you're gonna die. 
                      
                      I might as well go out in style, you know? 
                      
                      Doing what I love. Eating humans.`,
                  },
                },
                {
                  oars: OARS.notOars,
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
            oars: OARS.notOars,
            valence: 0,
            response: {
              text: `Thanks, I guess...`,
            },
          },
          {
            text: "*wait*",
            valence: 1,
            response: {
              text: `*pause*
                      
                      But like, I guess if I'm dead because I didn't haul ass and go fishing, no one's gonna be too impressed.`,
              options: [O_NEXTYEAR],
            },
          },
        ],
      },
    },
  ],
};

const O_SUMM = {
  oars: OARS.summarize,
  text: `You've got a hobby that you're passionate about, and that you're good at.
        
        Hunting humans brings meaning to your life. 
        
        But you also have found meaning in listening to the wisdom of your fellow bears.
        
        And you want to survive the winter and live another summer to... well, to catch more humans.
        
        Have I got that right?`,
  valence: 1,
  attemptChange: true,
  response: {
    change: true,
    text: `Yeah. Well, like, also maybe even long enough to pass on some of my knowledge to my own cubs.
            
            I don't know if I'm cut out to be a dad, but I don't think bear dads are, like, involved.
            
            But I'd teach them some bear stuff for sure.`,
    options: [
      {
        oars: OARS.reflect,
        text: `You've been given wisdom, and you don't want it to be lost with you.`,
        valence: 1,
        response: {
          text: `Yeah, that's right.
                        
                        I'm also pretty smart, like, bear-wise.
                        
                        Like, there's this grocery store.
                        
                        They always throws away totally fine chickens into a totally not bear-proof dumpster.
                        
                        I usually consider myself above dumpster diving, but I've scoped it out. I wonder if I could loot it and catch up on fat stores real quick.`,
          darncat: DARNCAT.takingSteps,
          options: [
            {
              oars: OARS.reflect,
              text: `So there might be a way to make it through the winter.`,
              valence: 0,
              attemptChange: true,
              response: R_PRIDE,
            },
          ],
        },
      },
    ],
  },
};

const R_CLEVER = {
  requiredLevel: 0,
  text: `So, it's like this.
  
  Humans are just CLEVER – yeah, yeah, don't let it go to your head. 
  
  Have you ever seen a bear-proof garbage bin? Well, I have, and if there's one thing I hate MORE than glass peanut butter jars, it's a bear-proof garbage bin.

  But there are no bear-proof humans.
          
      ...Hey, do you have any peanut butter on you?`,
  darncat: DARNCAT.desire,
  change: false,
  options: [
    {
      text: `What's wrong with glass peanut butter jars?`,
      oars: OARS.notOars,
      valence: 0,
      response: {
        text: `I mean, just think about it for like 5 more seconds.`,
      },
    },
    {
      text: `So, hunting humans is fun because of the challenge, but friends are putting heat on you to catch fish.`,
      oars: OARS.summarize,
      change: true,
      valence: 0,
      response: {
        text: `Yeah. They say that if I don't catch fish, I'll starve. But it's only October. I can catch fish later.`,
        darncat: DARNCAT.reason,
        change: false,
      },
      options: [
        {
          text: `I could be wrong, but don't bears hibernate in, like, September?`,
          oars: OARS.notOars,
          valence: -1,
          attemptChange: true,
          response: {
            text: `Most of them. I'm not like the rest.`,
          },
        },
        {
          text: `It's only October - you have a couple of months to get enough fish.`,
          oars: OARS.reflect,
          valence: 0,
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
                valence: 0,
                attemptChange: false,
                response: {
                  text: `Nope. I mean, maybe they did the air-quotes "SENSIBLE" thing and caught fish, but I can be an ice-fishing bear.
                        
                        I'm pretty smart. I can figure it out.
                        
                        In the meantime, the leaves are about to change, and do you know what that means?
                        
                        Pumpkin spice lattes... coursing through human flesh. 
                        
                        You gotta understand, this is open season. I've got some pretty great schemes. I'm not gonna tell you what they are, but they're pretty great.`,
                  change: true,
                  options: [
                    {
                      oars: OARS.reflect,
                      valence: 1,
                      text: `You've got some unusual skills. And you refuse to follow the herd.`,
                      response: {
                        change: true,
                        text: `It's actually a SLEUTH of bears, not a "herd."
                        
                        Just FYI.
                        
                        But yeah, when it comes to hunting humans, I'm a bit of a loner.
                        
                        Like, I usually kinda take pride in it, but there's a little part of me that's worried. I've gotten a lot of wisdom from my elders.
                        
                        Like, maybe I should have listened to them. Maybe I should have hibernated. Maybe I should have caught fish. Maybe I should have done what everyone else was doing.`,
                        options: [
                          O_SUMM,
                          {
                            text: `Do you think you'll be an elder someday?`,
                            oars: OARS.notOars,
                            response: {
                              text: "Doubt it.",
                            },
                          },
                          {
                            text: `Tell me about the elders.`,
                            oars: OARS.openEndedQuestion,
                            response: {
                              text: `Bears aren't exactly... family-oriented. But they teach each other by action, by doing.`,
                              options: [O_SUMM],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            // todo: "But"
          },
        },
        {
          text: `You've thought ahead. Being clever is important to you.`,
          oars: OARS.affirm,
          valence: 1,
          change: false,
          response: {
            text: `Yeah, I guess. I think that's why I like hunting humans. They're so clever, and I'm so clever, and it's a challenge to outsmart them. I'm good at it. 
              
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
                      oars: OARS.reflect,
                      text: `Humans are hoarders. Your species has preserved an ancient dialogue with nature.`,
                      attemptChange: true,
                      valence: 0,
                      response: {
                        change: false,
                        text: `Yeah. I mean, look at you — no offense, but "clothes" look like garbage bags.`,
                        options: [
                          {
                            oars: OARS.affirm,
                            text: `You're proud of your BEAR-itage.
                            
                            Sorry sorry!! ...Heritage.
                            
                            Your kind has discovered how to survive without taking what it doesn't need.`,
                            valence: -1,
                            response: {
                              change: true,
                              darncat: DARNCAT.need,
                              text: `I mean, my friends have been saying that I'm way out of line with the way of things. Sometimes I wonder if they're right.
                                
                                On the other hand – this will make me sound kinda self-important – but they aren't super smart.`,
                              options: [
                                {
                                  oars: OARS.openEndedQuestion,
                                  text: `What parts do you think they might be right about?`,
                                  valence: 0,
                                  attemptChange: true,
                                  response: {
                                    text: `Well, let's be real here. They're pretty much all in hibernation now, and I'm still out here catching humans.
                                            
                                            And uh... I guess I'm scared. I'm scared my time has run out, like there's just no way I can eat enough to survive the winter.
                                            
                                            I think the fear just keeps me locked into this cycle of catching humans and eating them.
                                            
                                            It's a great distraction.
                                            
                                            It makes me feel like I'm doing something, even though I'm not... you know?`,
                                    change: true,
                                    darncat: DARNCAT.desire,
                                    options: [
                                      {
                                        text: `You're right. You're not doing anything. You're just eating humans.`,
                                        oars: OARS.notOars,
                                        valence: -1,
                                        attemptChange: false,
                                        response: {
                                          text: `It's what I do.`,
                                        },
                                      },
                                      {
                                        text: `Is it too late?`,
                                        oars: OARS.notOars,
                                        valence: -1,
                                        attemptChange: false,
                                        response: {
                                          text: `Yes. It's OCTOBER. Who am I kidding? There's no way. 

                                          I'm gonna die.
                                          
                                          I'm gonna die and some park ranger is gonna give my carcass to the locals for a basement throw rug.`,
                                        },
                                      },
                                      O_SUMM,
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            oars: OARS.notOars,
                            text: `Actually, humans are a tropical species.`,
                            valence: -1,
                            response: {
                              text: `Well, you sure look goofy.
                                
                                Also, I don't really love eating polyester. And I've had some issues with jewelry in, uh, transit.
                                
                                But that's part of the fun - you all come with different accessories. 
                                
                                I have quite the stash, to be honest with you.`,
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
    {
      text: `So, your friends are putting heat on you to catch fish, but hunting humans is fun because of the challenge.`,
      oars: OARS.summarize,
      change: false,
      valence: -1,
      response: R_TOY,
    },
  ],
};

export const START = {
  response: {
    required_level: 0,
    text: `Oh, human. This must be, like, your worst nightmare.
  
  So here's the thing... I'm a bear, and I really like hunting humans. Winter is coming, though, and everyone's all up in my muzzle, telling me I have to get down to catching fish.
  
  You see, fish are FAT and SLOW this time of year, and us bears gotta bulk.
  
  Thing is...
  
  Fish are too easy. I'd rather catch humans.`,
    options: [
      {
        text: "Well then. Sounds like catching fish is just what you have to do.",
        valence: -1,
        oars: OARS.notOars,
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

        I never caught any.
        
        But it was fun.`,
        oars: OARS.notOars,
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
        change: false,
        advance: true,
        response: R_CLEVER,
      },
    ],
  },
};

const PlaceholderComponent = () => {
  return <></>;
};

export default PlaceholderComponent;
