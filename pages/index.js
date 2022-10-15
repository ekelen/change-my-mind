import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useGame from "../game/useGame";
import { maxScore } from "../game/gameReducer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import { NOT_OARS_EXPLANATION, OARS_EXPLANATION } from "../data/dialogue";

const Citation = () => {
  return (
    <>
      Miller, W. R., & Rollnick, S. (2013).
      <span style={{ fontStyle: "italic" }}>
        {" "}
        Motivational interviewing: Helping people change
      </span>{" "}
      (3rd ed.). Guilford Press.
    </>
  );
};

const Options = ({ options, onChooseResponse, hideHint, availableHints }) => {
  const [showingHint, setShowingHint] = useState(null);

  const close = () => {
    setShowingHint(null);
  };

  return (
    <div className={styles.options}>
      {options.map((option, index) => (
        <div key={`${index}`} className={styles.optionButtonWrapper}>
          {option.oars && availableHints.includes(option.oars) && (
            <button
              className={styles.optionHintButton}
              onClick={(e) => {
                setShowingHint(option.oars);
                hideHint(option.oars);
              }}
            >
              ?
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChooseResponse(index);
            }}
            className={styles.optionButton}
            autoFocus={index === 0}
          >
            {option.text}
          </button>
        </div>
      ))}
      {showingHint && (
        <div className={styles.optionHint}>
          <button onClick={close} autoFocus={true} className={styles.closeX}>
            <span>x</span>
          </button>
          <div className={styles.optionHintText}>
            {OARS_EXPLANATION[showingHint] ?? NOT_OARS_EXPLANATION[showingHint]}
          </div>
          <div>
            <p
              style={{
                fontSize: "smaller",
                paddingTop: "5rem",
                textAlign: "right",
              }}
            >
              All quotations are from <Citation />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Story = ({ score, maxScore, attack }) => {
  return (
    // background
    <div className={styles.background}>
      {/* human */}
      <div
        className={styles.human}
        style={{
          opacity: score === 0 ? 0.3 : 1,
        }}
      />
      {/* fish bone */}
      <div
        className={styles.fishBone}
        style={{
          opacity: score > maxScore ? 0.3 : 1,
        }}
      />

      <div
        style={{
          width: "100%",
          marginRight: "5vw",
          marginLeft: "5vw",
          position: "relative",
        }}
      >
        {/* bear */}
        <div
          className={`${styles.bear} ${attack ? styles.attack : ""}`}
          style={{
            left: `calc((100% / ${maxScore}) * ${Math.min(
              Math.max(0, score),
              maxScore
            )})`,
            opacity: score <= 0 || score >= maxScore ? 0.3 : 1,
          }}
        />

        {/* path points */}
        {Array.from(Array(maxScore + 1).keys()).map((index) => (
          <div
            key={index}
            className={styles.circle}
            style={{
              left: `calc((100% / ${maxScore}) * ${index})`,
              backgroundColor:
                index === 0 ? "red" : index === maxScore ? "green" : "gray",
            }}
          />
        ))}
        <div className={styles.score}>
          motivation to change diet:{" "}
          <span style={{ color: "white" }}>{(score / maxScore) * 100}%</span>
        </div>
      </div>
    </div>
  );
};

const PostGame = ({ children }) => {
  return <div className={styles.postGame}>{children}</div>;
};

const Dialogue = ({
  dialogue,
  onRevealOptions,
  showOptions,
  gameOver,
  gameWon,
}) => {
  const dialogueBottom = useRef(null);
  const dialogueButton = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const dialogueLines = useMemo(
    () => dialogue.text.split("\n").filter((t) => !!t) ?? [],
    [dialogue]
  );

  useEffect(() => {
    setCurrentLine(0);
  }, [dialogueLines]);

  useEffect(() => {
    if (dialogueButton?.current && currentLine < dialogueLines.length) {
      dialogueButton.current.focus();
    }
  }, [currentLine, dialogueLines]);

  useEffect(() => {
    if (currentLine === dialogueLines.length) {
      onRevealOptions();
    }
  }, [currentLine, dialogueLines]);

  useEffect(() => {
    if (dialogueBottom.current) {
      dialogueBottom.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentLine, showOptions]);

  const onNext = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentLine(Math.min(currentLine + 1, dialogueLines.length));
    },
    [dialogueLines, currentLine]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e && (e.shiftKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        setCurrentLine(dialogueLines.length);
      } else if (e && e.key === "Enter") {
        e.preventDefault();
        setCurrentLine(Math.min(currentLine + 1, dialogueLines.length));
      }
    },
    [dialogueLines, currentLine]
  );

  return (
    <div className={styles.dialogue}>
      <div className={styles.yellow}>
        <div>
          {dialogueLines.slice(0, currentLine + 1).map((text, index) => (
            <p key={`${index}`}>{text}</p>
          ))}
        </div>
        <button
          ref={dialogueButton}
          onClick={onNext}
          onKeyDown={handleKeyDown}
          style={{
            visibility:
              currentLine === dialogueLines.length ? "hidden" : "visible",
          }}
        >
          [...]
        </button>

        <div ref={dialogueBottom}></div>
      </div>
    </div>
  );
};

const TextContainer = ({
  dialogue,
  options,
  onChooseResponse,
  gameOver,
  gameWon,
  availableHints,
  hideHint,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    setShowOptions(false);
  }, [dialogue]);
  return (
    <div className={styles.dialogueAndOptionsContainer}>
      <Dialogue
        dialogue={dialogue}
        onRevealOptions={(show = true) => setShowOptions(show)}
        showOptions={showOptions}
        gameOver={gameOver}
        gameWon={gameWon}
      />
      {showOptions && (
        <Options
          options={options}
          onChooseResponse={onChooseResponse}
          hideHint={hideHint}
          availableHints={availableHints}
        />
      )}
    </div>
  );
};

const About = ({ onClose }) => {
  return (
    <div className={styles.about}>
      <button onClick={onClose} autoFocus={true} className={styles.closeX}>
        <span>x</span>
      </button>
      <h1>About</h1>
      <p>
        This short text adventure is designed to illustrate some of the
        principles of Motivational Interviewing, a style of communication
        intended to help people (or bears—I&rsquo;ll call them <em>clients</em>{" "}
        here) move towards a change they&rsquo;re ambivalent about making – if,
        and how, they want to.
      </p>
      <p>
        The goal is to elicit &quot;change talk&quot; from Bear—to encourage him
        to explore and strengthen his motivation to stop eating humans.
      </p>
      <p>
        Though some options may seem very similar, think about how the wording
        could affect how likely bear is to talk about <em>not</em> eating you.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src="/noun-bear_sit.svg" height={130} width={130} alt="Bear" />
      </div>
      <p>You do not need to read further to start playing.</p>
      <p>
        Just keep in mind the &quot;Spirit of MI&quot;:{" "}
        <strong>Partnership</strong>, <strong>Evocation</strong>,{" "}
        <strong>Acceptance</strong>, and <strong>Compassion</strong>.
      </p>

      <p>
        You can click the{" "}
        <button disabled={true} className={styles.optionHintButton}>
          ?
        </button>{" "}
        buttons that appear next to some options for tips.
      </p>
      <button onClick={onClose}>Close</button>
      <h3>A little more...</h3>
      <p>
        Depending on a client&rsquo;s readiness to change, there are various
        stages of communication in MI; in this game, we are in the{" "}
        <em>evocation phase</em>, where we want to use our OARS:
      </p>
      <ul>
        <li>
          <strong>O</strong>pen-Ended Questions: <em>Open-ended questions</em>{" "}
          to help the client explore their own thoughts and feelings.
        </li>
        <li>
          <strong>A</strong>ffirmations: <em>Affirming</em> the client&rsquo;s
          strengths, abilities, and efforts.
        </li>
        <li>
          <strong>R</strong>eflections: <em>Reflecting</em> back to the client
          what they have said, to allow both you and the client to hear what
          they&rsquo;ve said in new words.
        </li>
        <li>
          <strong>S</strong>ummaries: <em>Summarising</em> what the client has
          shared with us, to link their ideas and confirm a shared
          bigger-picture understanding of what we have learned from them.
        </li>
      </ul>
      <p>
        Please visit{" "}
        <a
          href="https://motivationalinterviewing.org/understanding-motivational-interviewing"
          target="_blank"
          rel="noreferrer"
        >
          https://motivationalinterviewing.org/understanding-motivational-interviewing
        </a>{" "}
        to learn more about MI.
      </p>
      <p>The only source used for this game is the OG textbook:</p>
      <p>
        {" "}
        <Citation />
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Header = ({ handleRestart, gameOver, gameWon }) => {
  const buttonRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);
  useEffect(() => {
    if ((gameOver || gameWon) && buttonRef?.current) {
      buttonRef.current.focus();
    }
  }, [gameOver, gameWon]);
  return (
    <div style={{ width: "100%", display: "flex", alignItems: "baseline" }}>
      <h1 style={{ marginRight: "auto" }}>I Will Eat You - Change My Mind</h1>
      <button
        onClick={() => setShowAbout(true)}
        disabled={showAbout}
        style={{ marginRight: "1rem" }}
      >
        About
      </button>
      <button onClick={handleRestart} ref={buttonRef}>
        Restart
      </button>
      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </div>
  );
};

export default function Home() {
  const [gameState, { chooseOption, restart, hideHint }] = useGame();

  const {
    dialogue,
    gameOver,
    gameWon,
    finalText,
    score,
    availableHints,
    attack,
  } = gameState;

  const options = dialogue.options ?? [];

  const onChooseResponse = (optionIndex = 0) => {
    chooseOption(optionIndex);
  };

  const handleRestart = () => {
    restart();
  };

  return (
    <FocusLock>
      <div className={styles.container}>
        <Head>
          <title>I Will Eat You | Change My Mind</title>
        </Head>

        <main className={styles.main}>
          {/* <FocusLock> */}
          <Header
            handleRestart={handleRestart}
            gameOver={gameOver}
            gameWon={gameWon}
          />
          {
            <>
              <Story score={score} maxScore={maxScore} attack={attack} />

              {gameWon ? (
                <PostGame>
                  <div>
                    {finalText.split("\n").map((text, index) => (
                      <p key={`${index}`}>{text.trim()}</p>
                    ))}
                  </div>
                  <Image
                    src="/noun-grizzly-bear_stand.svg"
                    height={200}
                    width={200}
                    alt="Bear"
                  />
                  <big>{`I think I might go try to get some food. 

                You can go home now.`}</big>
                </PostGame>
              ) : gameOver ? (
                <PostGame>
                  <div>
                    {finalText.split("\n").map((text, index) => (
                      <p key={`${index}`}>{text.trim()}</p>
                    ))}
                  </div>
                  <Image
                    src="/noun-bear_scare.svg"
                    height={200}
                    width={200}
                    alt="Attacking bear"
                  />
                  <big>*eats you*</big>
                </PostGame>
              ) : (
                <TextContainer
                  dialogue={dialogue}
                  options={options}
                  onChooseResponse={onChooseResponse}
                  gameOver={gameOver}
                  gameWon={gameWon}
                  availableHints={availableHints}
                  hideHint={hideHint}
                />
              )}
            </>
          }
          {/* </FocusLock> */}
        </main>
      </div>
    </FocusLock>
  );
}
