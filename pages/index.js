import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FadeIn from "react-fade-in";
import useGame from "../game/useGame";
import { maxScore } from "../game/gameReducer";
import { useEffect, useMemo, useRef, useState } from "react";

const Options = ({ options, onChooseResponse }) => {
  return (
    <div className={styles.options}>
      {options.map((option, index) => (
        <button
          key={`${index}`}
          onClick={() => onChooseResponse(index)}
          className={styles.optionButton}
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1000px",
        position: "relative",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "rgb(252,211,77)",
        padding: "1rem 2rem",
      }}
    >
      {children}
    </div>
  );
};

const Header = ({ handleRestart }) => {
  return (
    <div style={{ width: "1000px", display: "flex", alignItems: "baseline" }}>
      <h1 style={{ marginRight: "auto" }}>I Will Eat You</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

const Dialogue = ({ dialogue, onRevealOptions }) => {
  const dialogueBottom = useRef(null);
  const [currentText, setCurrentText] = useState(0);
  const dialogueLines = useMemo(
    () =>
      dialogue.response.text
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => !!t) ?? [],
    [dialogue.response.text]
  );

  useEffect(() => {
    setCurrentText(0);
  }, [dialogueLines]);

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
  }, [currentText]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.shiftKey && e.key === "Enter") {
        e.stopPropagation();
        setCurrentText(dialogueLines.length);
      } else if (e && e.key === "Enter") {
        e.stopPropagation();
        setCurrentText(Math.min(currentText + 1, dialogueLines.length));
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogueLines, currentText]);

  return (
    <div className={styles.dialogue}>
      <div style={{ color: "rgb(255,251,235)", textAlign: "right" }}>
        {(dialogue.text ?? "").split("\n").map((text, index) => (
          <p key={`${index}`}>{text.trim()}</p>
        ))}
      </div>

      <div
        style={{
          color: "rgb(252,211,77)",
        }}
      >
        <div>
          {dialogueLines.slice(0, currentText + 1).map((text, index) => (
            <p key={`${index}`}>{text}</p>
          ))}
        </div>

        <div ref={dialogueBottom}></div>
      </div>
    </div>
  );
};

const TextContainer = ({ dialogue, options, onChooseResponse }) => {
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    setShowOptions(false);
  }, [dialogue]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        width: "1000px",
        justifyContent: "flex-end",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      }}
    >
      <Dialogue
        dialogue={dialogue}
        onRevealOptions={() => setShowOptions(true)}
      />
      {showOptions && (
        <Options options={options} onChooseResponse={onChooseResponse} />
      )}
    </div>
  );
};

export default function Home() {
  const [gameState, { chooseResponse, restart }] = useGame();

  const { dialogue, previousOptions, gameOver, gameWon, finalText, score } =
    gameState;

  const onChooseResponse = (optionIndex = 0) => {
    chooseResponse(optionIndex);
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
        <Header handleRestart={handleRestart} />
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
            options={
              dialogue.response.options?.length
                ? dialogue.response.options
                : previousOptions
            }
            onChooseResponse={onChooseResponse}
          />
        )}
      </main>
    </div>
  );
}
