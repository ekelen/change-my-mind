import styles from "../styles/Home.module.css";

const Story = ({ score, maxScore, attack }) => {
  return (
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
              backgroundColor: "gray",
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

export default Story;
