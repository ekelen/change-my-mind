import { useReducer } from "react";
import gameReducer, { initialState } from "./gameReducer";
import * as gameActions from "./gameActions";
import * as dialogueApi from "./dialogueApi";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const chooseResponse = (optionKey) => {
    const dialogue = dialogueApi.getDialogue(optionKey);
    dispatch(gameActions.chooseResponse(dialogue));
  };

  const next = (responseKey) => {
    const dialogue = dialogueApi.getDialogue(responseKey);
    dispatch(gameActions.chooseResponse(dialogue));
  };

  const restart = () => {
    dispatch(gameActions.restart());
  };

  return [
    state,
    {
      chooseResponse,
      restart,
      next,
    },
  ];
};

export default useGame;
