import { cloneDeep } from "lodash";
import { OARS, NOT_OARS } from "../data/dialogue";
import { getNode } from "./dialoguesApi";
import dialogues from "./dialoguesFlat.json";
import { CHOOSE_RESPONSE, RESTART, HIDE_HINT } from "./gameActions";

export const maxScore = 10;

export const initialState = {
  dialogue: {
    ...dialogues["res-start"],
    options: dialogues["res-start"].options.map(getNode),
  },
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
  availableHints: [...Object.values(OARS), ...Object.values(NOT_OARS)],
  attack: true,
};

const chooseResponse = (state, option, options) => {
  const _valence = option.valence ?? 0;
  const score = Math.min(state.score + _valence, maxScore);

  const attack =
    score > state.score ? false : score < state.score ? true : state.attack;
  const response = getNode(option.response);

  const common = {
    ...state,
    score,
    attack,
    dialogue: {
      ...response,
      options: response.options?.map(getNode) ?? options,
    },
  };

  if (score === 0) {
    return {
      ...common,
      gameOver: true,
      finalText: response.text,
      dialogue: {},
    };
  }
  if (score >= maxScore) {
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
