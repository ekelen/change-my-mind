export const RESTART = "RESTART";
export const CHOOSE_RESPONSE = "CHOOSE_RESPONSE";
export const HIDE_HINT = "HIDE_HINT";
export const LOAD_STATE = "LOAD_STATE";
export const WATCH_INTRO = "WATCH_INTRO";

export const chooseOption = (option, options) => {
  return {
    type: CHOOSE_RESPONSE,
    payload: {
      option,
      options,
    },
  };
};

export const hideHint = (hint) => {
  return {
    type: HIDE_HINT,
    payload: {
      hint,
    },
  };
};

export const restart = () => {
  return {
    type: RESTART,
  };
};

export const loadState = (state) => {
  return {
    type: LOAD_STATE,
    payload: { state },
  };
};

export const watchIntro = () => {
  return {
    type: WATCH_INTRO,
    payload: { watchedIntro: true },
  };
};
