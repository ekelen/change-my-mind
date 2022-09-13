import { START } from "../pages/constants";
import { CHOOSE_RESPONSE, RESTART } from "./gameActions";

export const maxScore = 6;

export const initialState = {
  dialogue: START,
  previousOptions: START.response.options,
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
};

const chooseResponse = (state, option) => {
  const _valence = option.valence ?? 0;
  const score = state.score + _valence;
  if (score < 0) {
    return {
      ...state,
      gameOver: true,
      finalText: option.response?.text,
      dialogue: {},
      score,
    };
  }
  if (score > maxScore) {
    return {
      ...state,
      gameWon: true,
      dialogue: {},
      finalText: option.response?.text,
      score,
    };
  }
  return {
    ...state,
    score,
  };
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case CHOOSE_RESPONSE: {
      return chooseResponse(state, action.payload);
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
