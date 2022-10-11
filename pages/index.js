import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useGame from "../game/useGame";
import { maxScore } from "../game/gameReducer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMobileDetect from "../hooks/useMobileDetect";
import FocusLock from "react-focus-lock";
import { NOT_OARS_EXPLANATION, OARS, OARS_EXPLANATION } from "../data/dialogue";

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

const Story = ({ score, maxScore }) => {
  return (
    // background
    <div
      style={{
        position: "relative",
        height: "100px",
        flexShrink: 0,
        width: "1000px",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(21,116,90,1) 47%, rgba(3,100,111,1) 100%)",
        borderBottom: "10px solid rgb(15,23,42)",
      }}
    >
      {/* human */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: `-10px`,
          zIndex: 10,
          opacity: score < 0 ? 0.3 : 1,
          transition: "all 2s",
        }}
      >
        <Image src="/noun-hiking.svg" alt="Hiker" width={50} height={50} />
      </div>
      {/* fish bone */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: `-10px`,
          zIndex: 10,
          opacity: score > maxScore ? 0.3 : 1,
          transition: "all 2s",
        }}
      >
        <Image src="/noun-fish-bone.svg" alt="Hiker" width={50} height={50} />
      </div>
      {/* path */}
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          left: "50px",
          height: "0px",
          width: "900px",
          borderTop: "3px dotted rgba(255,255,0,0.5)",
        }}
      />

      {/* bear */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: `calc(-30px + (900px / 6) * ${Math.min(
            Math.max(0, score),
            maxScore
          )})`,
          zIndex: 10,
          opacity: score < 0 || score > maxScore ? 0.3 : 1,
          transition: "all 2s",
        }}
      >
        <Image src="/noun-bear.svg" alt="Bear" width={160} height={160} />
      </div>

      {/* path points */}
      {Array.from(Array(maxScore + 1).keys()).map((index) => (
        <div
          key={index}
          className={styles.circle}
          style={{
            left: `calc(35px + (900px / 6) * ${index})`,
          }}
        />
      ))}
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
  const [currentText, setCurrentText] = useState(0);
  const dialogueLines = useMemo(
    () =>
      dialogue.text
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => !!t) ?? [],
    [dialogue]
  );

  useEffect(() => {
    setCurrentText(0);
  }, [dialogueLines]);

  useEffect(() => {
    if (
      dialogueButton?.current &&
      currentText < dialogueLines.length &&
      !showOptions &&
      !gameOver &&
      !gameWon
    ) {
      dialogueButton.current.focus();
    }
  }, [currentText, showOptions, dialogueLines, gameOver, gameWon]);

  useEffect(() => {
    if (currentText === dialogueLines.length) {
      onRevealOptions();
    }
  }, [currentText, dialogueLines]);

  useEffect(() => {
    if (dialogueBottom.current) {
      dialogueBottom.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentText, showOptions]);

  const onNext = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentText(Math.min(currentText + 1, dialogueLines.length));
    },
    [dialogueLines, currentText]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e && (e.shiftKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        setCurrentText(dialogueLines.length);
      } else if (e && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        setCurrentText(Math.min(currentText + 1, dialogueLines.length));
      }
    },
    [dialogueLines, currentText]
  );

  return (
    <div className={styles.dialogue}>
      <div className={styles.yellow}>
        <div>
          {dialogueLines.slice(0, currentText + 1).map((text, index) => (
            <p key={`${index}`}>{text}</p>
          ))}
        </div>
        <button
          ref={dialogueButton}
          onClick={onNext}
          onKeyDown={handleKeyDown}
          style={{
            visibility:
              currentText === dialogueLines.length ? "hidden" : "visible",
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

const Header = ({ handleRestart, gameOver, gameWon, isDesktop }) => {
  const buttonRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);
  useEffect(() => {
    if ((gameOver || gameWon) && buttonRef?.current) {
      buttonRef.current.focus();
    }
  }, [gameOver, gameWon]);
  return (
    <div style={{ width: "1000px", display: "flex", alignItems: "baseline" }}>
      <h1 style={{ marginRight: "auto" }}>I Will Eat You - Change My Mind</h1>
      <button
        onClick={() => setShowAbout(true)}
        disabled={showAbout}
        style={{ marginRight: "1rem" }}
      >
        About
      </button>
      <button onClick={handleRestart} ref={buttonRef} disabled={!isDesktop}>
        Restart
      </button>
      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </div>
  );
};

export default function Home() {
  const [gameState, { chooseOption, restart, hideHint }] = useGame();
  const isDesktop = useMobileDetect().isDesktop();

  const { dialogue, gameOver, gameWon, finalText, score, availableHints } =
    gameState;

  const options = dialogue.options ?? [];

  const onChooseResponse = (optionIndex = 0) => {
    chooseOption(optionIndex);
  };

  const handleRestart = () => {
    restart();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>I Will Eat You | Change My Mind</title>
      </Head>

      <FocusLock>
        <main className={styles.main}>
          {/* <FocusLock> */}
          <Header
            handleRestart={handleRestart}
            gameOver={gameOver}
            gameWon={gameWon}
            isDesktop={isDesktop}
          />
          {!isDesktop ? (
            <>Not available on mobile</>
          ) : (
            <>
              <Story score={score} maxScore={maxScore} />

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
          )}
          {/* </FocusLock> */}
        </main>
      </FocusLock>
    </div>
  );
}
