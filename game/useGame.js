import { useEffect, useReducer } from "react";
import gameReducer, { initializer, initialState } from "./gameReducer";
import * as gameActions from "./gameActions";

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localState = window.localStorage.getItem("gameState");
      // if (localState) {
      //   dispatch(gameActions.loadState(JSON.parse(localState)));
      // }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // if (JSON.stringify(state) !== JSON.stringify(initialState)) {
      window.localStorage.setItem("gameState", JSON.stringify(state));
      // }
    }
  }, [state]);

  const chooseOption = (optionIndex = 0) => {
    const option = state.dialogue.options[optionIndex];
    dispatch(gameActions.chooseOption(option, state.dialogue.options));
  };

  const restart = () => {
    dispatch(gameActions.restart());
  };

  const hideHint = (hint) => {
    dispatch(gameActions.hideHint(hint));
  };

  const loadState = (state) => {
    dispatch(gameActions.loadState(state));
  };

  const watchIntro = () => {
    dispatch(gameActions.watchIntro());
  };

  return [
    state,
    {
      chooseOption,
      hideHint,
      restart,
      watchIntro,
    },
  ];
};

export default useGame;
