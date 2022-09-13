import { useReducer } from "react";
import gameReducer, { initialState } from "./gameReducer";
import * as gameActions from "./gameActions";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const bearResponse = state.dialogue.response ?? {};
  const options =
    bearResponse.options ?? state.dialogue.options ?? state.previousOptions;

  const chooseResponse = (optionIndex = 0) => {
    if (options.length > 0) {
      const option = options[optionIndex];
      dispatch(gameActions.chooseResponse(option, options));
    }
  };

  const restart = () => {
    dispatch(gameActions.restart());
  };

  return [
    state,
    {
      chooseResponse,
      restart,
    },
  ];
};

export default useGame;
