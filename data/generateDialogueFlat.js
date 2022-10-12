// $ node ./data/generateDialogueFlat.js
const fs = require("fs");
const dialogue = require("./dialogue.js");
const lodash = require("lodash");

const _flatten = (dialogueTree) => {
  const flat = {};
  const addIds = (node) => {
    if (node.response) {
      node.response.id = node.response.id ?? lodash.uniqueId("res-");
    }
    if (node.response.options) {
      node.response.options.forEach((option, i) => {
        option.id = option.id ?? lodash.uniqueId("opt-");
        addIds(option);
      });
    }
  };

  const mapIds = (el) => {
    if (el.response?.options) {
      el.response.options.forEach((option) => {
        mapIds(option);
      });
    }
    if (el.response) {
      flat[el.id] = { ...el, response: el.response.id };
      flat[el.response.id] = { ...el.response };
      if (el.response.options) {
        flat[el.response.id].options = el.response.options.map(
          (option) => option.id
        );
      }
    }
  };

  addIds(dialogueTree);
  mapIds(dialogueTree);

  const tidyText = (items) => {
    Object.values(items).forEach((item) => {
      if (item.text) {
        item.text = item.text
          .split("\n")
          .map((t) => t.trim())
          .join("\n");
      }
    });
    return items;
  };
  return tidyText(flat);
};

const flat = _flatten(dialogue.START);

const jsonContent = JSON.stringify(flat, null, 2);

fs.writeFile("game/dialoguesFlat.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("fs.writeFile error");
    return console.log(err);
  }

  console.log("📁 File saved.");
});
