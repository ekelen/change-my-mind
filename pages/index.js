import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useGame from "../game/useGame";
import { maxScore } from "../game/gameReducer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMobileDetect from "../hooks/useMobileDetect";

const Options = ({ options, onChooseResponse }) => {
  return (
    <div className={styles.options}>
      {options.map((option, index) => (
        <button
          key={`${index}`}
          onClick={(e) => {
            e.stopPropagation();
            onChooseResponse(index);
          }}
          className={styles.optionButton}
          autoFocus={index === 0}
        >
          {option.text}
        </button>
      ))}
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

const Header = ({ handleRestart, gameOver, gameWon, isDesktop }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    if ((gameOver || gameWon) && buttonRef?.current) {
      buttonRef.current.focus();
    }
  }, [gameOver, gameWon]);
  return (
    <div style={{ width: "1000px", display: "flex", alignItems: "baseline" }}>
      <h1 style={{ marginRight: "auto" }}>I Will Eat You</h1>
      <button onClick={handleRestart} ref={buttonRef} disabled={!isDesktop}>
        Restart
      </button>
    </div>
  );
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
      e.preventDefault();
      if (e && (e.shiftKey || e.metaKey) && e.key === "Enter") {
        e.stopPropagation();
        setCurrentText(dialogueLines.length);
      } else if (e && e.key === "Enter") {
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
          // autoFocus={
          //   currentText < dialogueLines.length && !gameOver && !gameWon
          // }
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
        <Options options={options} onChooseResponse={onChooseResponse} />
      )}
    </div>
  );
};

export default function Home() {
  const [gameState, { chooseOption, restart }] = useGame();
  const isDesktop = useMobileDetect().isDesktop();

  const { dialogue, gameOver, gameWon, finalText, score } = gameState;

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

      <main className={styles.main}>
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
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
