import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { IntroStep, MAX_STEPS } from "./Steps";

const Intro = ({ watchIntro }) => {
  const buttonRef = useRef(null);
  const [introStep, setIntroStep] = useState(0);

  const isEnd = introStep === MAX_STEPS;

  useEffect(() => {
    if (introStep === 0 && buttonRef?.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.intro}>
      <button
        autoFocus={true}
        className={styles.closeX}
        onClick={() => watchIntro()}
        style={{ backgroundColor: "white", color: "black" }}
      >
        <span>x</span>
      </button>
      <h1 style={{ marginBottom: 0 }}>I Will Eat You - Change My Mind</h1>
      <div className={styles.stepFrame}>
        <IntroStep step={introStep} />
      </div>
      <div className={styles.stepButtonWrapper}>
        <button
          onClick={() => {
            setIntroStep(introStep - 1);
          }}
          disabled={introStep === 0}
        >
          Back
        </button>
        <button
          onClick={() => {
            if (isEnd) {
              watchIntro();
            } else {
              setIntroStep(introStep + 1);
            }
          }}
          autoFocus={true}
          ref={buttonRef}
        >
          {isEnd ? "Close" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Intro;
