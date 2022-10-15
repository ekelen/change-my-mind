const { getNode } = require("./dialoguesApi");
import { uniq } from "lodash";
import { START } from "../data/dialogue";
import dialogues from "./dialoguesFlat.json";

describe("thing", () => {
  it("get start ID", () => {
    // Arrange
    const expected = START.id;
    const actual = "opt-start";
    // Assert
    expect(actual).toBe(expected);
  });
  it("each opt has a response", () => {
    const optionIds = Object.keys(dialogues).filter(
      (key) => key.slice(0, 3) === "opt"
    );

    // Arrange
    const expected = true;
    const actual =
      optionIds.map(getNode).every((node) => node.response) &&
      Object.keys(dialogues).map(getNode).length > 1;

    // Assert
    expect(actual).toBe(expected);
  });
  it("each response has a path", () => {
    // Arrange

    const responseIds = Object.keys(dialogues).filter(
      (key) => key.slice(0, 3) === "res"
    );

    const ids = [];
    const walk = (optId) => {
      const node = getNode(optId);
      const responseId = node.response;
      ids.push(responseId);
      const responseNode = getNode(responseId);
      if (responseNode.options) {
        responseNode.options.forEach((option) => walk(option));
      }
    };
    walk(START.id);

    const expected = uniq(responseIds).sort();
    const actual = uniq(ids).sort();

    // Assert
    expect(actual).toEqual(expected);
  });
});
