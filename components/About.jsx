import Image from "next/image";
import styles from "../styles/Home.module.css";

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
        You can click the <button className={styles.optionHintButton}>?</button>{" "}
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
      <p>
        The only informational source used for this game is the OG textbook:
      </p>
      <p>
        {" "}
        <Citation />
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export const Citation = () => {
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

export default About;
