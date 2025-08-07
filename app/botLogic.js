// app/botLogic.js

function decideAction(state) {
  const { botPos, points } = state;

  // Si le bot est sur un point à collecter
  if (points.some(p => p.x === botPos.x && p.y === botPos.y)) {
    return { move: "STAY", action: "COLLECT" };
  }

  // Aucun point → rester immobile
  if (points.length === 0) {
    return { move: "STAY", action: "NONE" };
  }

  // Trouver le point le plus proche (distance de Manhattan)
  const nearest = points.reduce((closest, point) => {
    const dist = Math.abs(point.x - botPos.x) + Math.abs(point.y - botPos.y);
    const closestDist = Math.abs(closest.x - botPos.x) + Math.abs(closest.y - botPos.y);
    return dist < closestDist ? point : closest;
  }, points[0]);

  // Aller vers ce point
  if (nearest.x > botPos.x) return { move: "RIGHT", action: "NONE" };
  if (nearest.x < botPos.x) return { move: "LEFT", action: "NONE" };
  if (nearest.y > botPos.y) return { move: "DOWN", action: "NONE" };
  if (nearest.y < botPos.y) return { move: "UP", action: "NONE" };

  // Juste au cas où
  return { move: "STAY", action: "NONE" };
}

module.exports = { decideAction };
