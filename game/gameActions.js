export const RESTART = "RESTART";
export const CHOOSE_RESPONSE = "CHOOSE_RESPONSE";

export const chooseResponse = (option) => {
  return {
    type: CHOOSE_RESPONSE,
    payload: option,
  };
};

export const restart = () => {
  return {
    type: RESTART,
  };
};
