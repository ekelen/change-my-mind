import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FadeIn from "react-fade-in";
import useGame from "../game/useGame";
import { maxScore } from "../game/gameReducer";

const Options = ({ options, onChooseResponse }) => {
  return (
    <ul
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        listStyle: "none",
        justifyContent: "space-between",
        color: "rgb(255,251,235)",
      }}
    >
      {options.map((option, index) => (
        <li
          key={`${index}`}
          onClick={() => onChooseResponse(index)}
          className={styles.option}
        >
          {option.text}
        </li>
      ))}
    </ul>
  );
};

const Story = ({ score, maxScore }) => {
  return (
    // background
    <div
      style={{
        position: "relative",
        height: "150px",
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
        <div
          style={{ width: "1000px", display: "flex", alignItems: "baseline" }}
        >
          <h1 style={{ marginRight: "auto" }}>I Will Eat You</h1>{" "}
          <button onClick={handleRestart}>Restart</button>
        </div>

        <Story score={score} maxScore={maxScore} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1000px",

            // backgroundColor: "lightblue",
            position: "relative",
            color: "black",
            justifyContent: "center",
            alignItems: "center",
            color: "rgb(252,211,77)",
          }}
        >
          {gameWon ? (
            <>
              <div>
                {finalText.split("\n").map((text, index) => (
                  <p key={`${index}`}>{text.trim()}</p>
                ))}
              </div>
              <Image
                src="/noun-grizzly-bear_stand.svg"
                height={400}
                width={400}
                alt="Bear"
              />
              <big>{`I think I might go try to get some food. 

                You can go home now.`}</big>
            </>
          ) : gameOver ? (
            <>
              <div>
                {finalText.split("\n").map((text, index) => (
                  <p key={`${index}`}>{text.trim()}</p>
                ))}
              </div>
              <Image
                src="/noun-bear_scare.svg"
                height={400}
                width={400}
                alt="Attacking bear"
              />
              <big>*eats you*</big>
            </>
          ) : (
            <>
              <div
                style={{
                  // position: "absolute",
                  height: "500px",
                  width: "1000px",
                  // backgroundColor: "pink",
                  color: "rgb(252,211,77)",
                }}
              >
                <div style={{ color: "rgb(255,251,235)", textAlign: "right" }}>
                  <FadeIn>
                    {(dialogue.text ?? "").split("\n").map((text, index) => (
                      <p key={`${index}`}>{text.trim()}</p>
                    ))}
                  </FadeIn>
                </div>

                <div
                  style={{
                    backgroundColor: "transparent",
                    color: "rgb(252,211,77)",
                  }}
                >
                  <FadeIn>
                    {dialogue.response.text.split("\n").map((text, index) => (
                      <p key={`${index}`}>{text}</p>
                    ))}
                  </FadeIn>
                </div>

                <Options
                  options={
                    dialogue.response.options?.length
                      ? dialogue.response.options
                      : previousOptions
                  }
                  onChooseResponse={onChooseResponse}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
