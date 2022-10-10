import { cloneDeep } from "lodash";
import { OARS } from "../data/dialogue";
import { getNode } from "./dialoguesApi";
import dialogues from "./dialoguesFlat.json";
import { CHOOSE_RESPONSE, RESTART, HIDE_HINT } from "./gameActions";

export const maxScore = 6;

export const initialState = {
  dialogue: {
    ...dialogues["res-start"],
    options: dialogues["res-start"].options.map(getNode),
  },
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
  availableHints: [...Object.keys(OARS)],
};

const chooseResponse = (state, option, options) => {
  const _valence = option.valence ?? 0;
  const score = state.score + _valence;

  const response = getNode(option.response);

  const common = {
    ...state,
    score,
    dialogue: {
      ...response,
      options: response.options?.map(getNode) ?? options,
    },
  };

  if (score < 0) {
    return {
      ...common,
      gameOver: true,
      finalText: response.text,
      dialogue: {},
    };
  }
  if (score > maxScore) {
    return {
      ...common,
      gameWon: true,
      dialogue: {},
      finalText: response.text,
    };
  }
  return common;
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case CHOOSE_RESPONSE: {
      return chooseResponse(
        state,
        action.payload.option,
        action.payload.options
      );
    }
    case HIDE_HINT: {
      return {
        ...state,
        availableHints: state.availableHints.filter(
          (hint) => hint !== action.payload.hint
        ),
      };
    }
    case RESTART: {
      return cloneDeep(initialState);
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
