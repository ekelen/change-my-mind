const { Citation } = require("./About");
import { NOT_OARS_EXPLANATION, OARS_EXPLANATION } from "../data/constants";
import styles from "../styles/Home.module.css";

const OptionHint = ({ onClose, showingHint }) => {
  console.log(`[=] showing hint`);
  return (
    <div className={styles.optionHint}>
      <button onClick={onClose} autoFocus={true} className={styles.closeX}>
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
  );
};

export default OptionHint;
