import flatDialogues from "./dialogues-flat.json";
import { CHANGE_DIALOGUE, CHOOSE_RESPONSE, RESTART } from "./gameActions";
import * as dialogueApi from "./dialogueApi";

export const maxScore = 6;

export const initialState = {
  dialogue: flatDialogues.start,
  gameOver: false,
  gameWon: false,
  finalText: "",
  score: 2,
  options: [],
};

const chooseResponse = (state, dialogue) => {
  const _valence = dialogue.valence ?? 0;
  const score = state.score + _valence;

  const options = dialogue.options
    ? dialogue.options.map(dialogueApi.getDialogue)
    : state.options;

  const common = {
    ...state,
    options,
    score,
  };

  if (score < 0) {
    return {
      ...common,
      gameOver: true,
      finalText: dialogue.response?.text,
      dialogue: {},
    };
  }
  if (score > maxScore) {
    return {
      ...common,
      gameWon: true,
      dialogue: {},
      finalText: dialogue.response?.text,
    };
  }
  return {
    ...common,
    dialogue,
  };
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case CHOOSE_RESPONSE: {
      return chooseResponse(state, action.payload);
    }
    case CHANGE_DIALOGUE: {
      return {
        ...state,
        dialogue: action.payload,
      };
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
