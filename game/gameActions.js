export const RESTART = "RESTART";
export const CHOOSE_RESPONSE = "CHOOSE_RESPONSE";

export const chooseResponse = (option, options) => {
  return {
    type: CHOOSE_RESPONSE,
    payload: {
      option,
      options,
    },
  };
};

export const restart = () => {
  return {
    type: RESTART,
  };
};
