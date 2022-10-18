import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import About from "../components/About";
import Intro from "../components/intro/Intro";
import OptionHint from "../components/OptionHint";
import Story from "../components/Story";
import { maxScore } from "../game/gameReducer";
import useGame from "../game/useGame";
import styles from "../styles/Home.module.css";

const Options = ({ options, onChooseResponse, hideHint, availableHints }) => {
  const [showingHint, setShowingHint] = useState(null);

  const onClose = () => {
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
        <OptionHint onClose={onClose} showingHint={showingHint} />
      )}
    </div>
  );
};

const PostGame = ({ finalText, gameWon, children }) => {
  return (
    <div className={styles.postGame}>
      {finalText.split("\n").map((text, index) => (
        <p key={`${index}`}>{text.trim()}</p>
      ))}
      {gameWon ? (
        <>
          <Image
            src="/noun-grizzly-bear_stand.svg"
            height={200 * 0.8}
            width={200}
            alt="Bear"
          />
          <big>{`I think I might go try to get some food. 

                You can go home now.`}</big>
        </>
      ) : (
        <>
          <Image
            src="/noun-bear_scare.svg"
            height={200}
            width={200}
            alt="Attacking bear"
          />
          <big>*eats you*</big>
        </>
      )}
    </div>
  );
};

const Dialogue = ({
  dialogue,
  onRevealOptions,
  showOptions,
  gameOver,
  gameWon,
  showingIntro,
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
  showingIntro,
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
        showingIntro={showingIntro}
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
  const [gameState, { chooseOption, restart, hideHint, watchIntro }] =
    useGame();

  const {
    dialogue,
    gameOver,
    gameWon,
    finalText,
    score,
    availableHints,
    attack,
    watchedIntro,
  } = gameState;

  const options = dialogue.options ?? [];

  const onChooseResponse = (optionIndex = 0) => {
    chooseOption(optionIndex);
  };

  const handleRestart = () => {
    restart();
  };

  const handleWatchIntro = () => {
    watchIntro();
  };

  return (
    <FocusLock>
      {!watchedIntro ? (
        <Intro watchIntro={handleWatchIntro} />
      ) : (
        <div className={styles.container}>
          <Head>
            <title>I Will Eat You | Change My Mind</title>
          </Head>

          <main className={styles.main}>
            <Header
              handleRestart={handleRestart}
              gameOver={gameOver}
              gameWon={gameWon}
            />
            <>
              <Story score={score} maxScore={maxScore} attack={attack} />

              {gameWon || gameOver ? (
                <PostGame finalText={finalText} gameWon={gameWon} />
              ) : (
                <TextContainer
                  dialogue={dialogue}
                  options={options}
                  onChooseResponse={onChooseResponse}
                  gameOver={gameOver}
                  gameWon={gameWon}
                  availableHints={availableHints}
                  hideHint={hideHint}
                  showingIntro={!watchedIntro}
                />
              )}
            </>
            <div className={styles.footer}>
              <p style={{ marginRight: "5px" }}>by </p>
              <a
                href="https://github.com/ekelen"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/github.svg"
                  height={13}
                  width={13}
                  alt="Github logo"
                />
                <p style={{ marginLeft: "2px" }}>ekelen</p>
              </a>
            </div>
          </main>
        </div>
      )}
    </FocusLock>
  );
}
