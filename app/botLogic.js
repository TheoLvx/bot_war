const directions = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
const actions = ["NONE", "COLLECT"]; // on évite BOMB qui fait perdre des points

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function decideAction() {
  return {
    move: getRandomItem(directions),
    action: getRandomItem(actions),
  };
}

module.exports = { decideAction };
