export const RESTART = "RESTART";
export const CHOOSE_RESPONSE = "CHOOSE_RESPONSE";
export const HIDE_HINT = "HIDE_HINT";

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
