import { START } from "./dialogue";
import { getNode } from "./dialoguesApi";
import { dialogues } from "./dialoguesFlat";
import { CHOOSE_RESPONSE, RESTART } from "./gameActions";

export const maxScore = 6;

export const initialState = {
  dialogue: dialogues["res-start"],
  previousOptions: dialogues["res-start"].options.map(getNode),
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
};

const chooseResponse = (state, option, options) => {
  const _valence = option.valence ?? 0;
  const score = state.score + _valence;

  const common = {
    ...state,
    score,
    dialogue: option,
    previousOptions: options,
  };

  if (score < 0) {
    return {
      ...common,
      gameOver: true,
      finalText: option.response?.text,
      dialogue: {},
    };
  }
  if (score > maxScore) {
    return {
      ...common,
      gameWon: true,
      dialogue: {},
      finalText: option.response?.text,
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
    case RESTART: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
