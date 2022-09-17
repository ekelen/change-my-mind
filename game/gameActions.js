export const RESTART = "RESTART";
export const CHOOSE_RESPONSE = "CHOOSE_RESPONSE";
export const CHANGE_DIALOGUE = "CHANGE_DIALOGUE";

export const chooseResponse = (option) => {
  return {
    type: CHOOSE_RESPONSE,
    payload: option,
  };
};

export const changeDialogue = (dialogue) => {
  return {
    type: CHANGE_DIALOGUE,
    payload: dialogue,
  };
};

export const restart = () => {
  return {
    type: RESTART,
  };
};
