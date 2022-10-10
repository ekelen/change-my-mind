import { getNode } from "./dialoguesApi";
import { dialogues } from "./dialoguesFlat";
import { CHOOSE_RESPONSE, RESTART } from "./gameActions";

export const maxScore = 6;

export const initialState = {
  dialogue: {
    ...dialogues["res-start"],
    options: dialogues["res-start"].options.map(getNode),
  },
  previousOptions: dialogues["res-start"].options.map(getNode),
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
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
      options: response.options?.map(getNode) ?? undefined,
    },
    previousOptions: options,
  };

  if (score < 0) {
    return {
      ...common,
      gameOver: true,
      finalText: response.text,
      dialogue: {},
      previousOptions: [],
    };
  }
  if (score > maxScore) {
    return {
      ...common,
      gameWon: true,
      dialogue: {},
      finalText: response.text,
      previousOptions: [],
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
