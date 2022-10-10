import { useReducer } from "react";
import gameReducer, { initialState } from "./gameReducer";
import * as gameActions from "./gameActions";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const chooseOption = (optionIndex = 0) => {
    const option = state.dialogue.options[optionIndex];
    dispatch(gameActions.chooseOption(option, state.dialogue.options));
  };

  const restart = () => {
    dispatch(gameActions.restart());
  };

  return [
    state,
    {
      chooseOption,
      restart,
    },
  ];
};

export default useGame;
