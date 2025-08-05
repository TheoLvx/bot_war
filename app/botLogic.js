const directions = [
  { dx: 0, dy: -1, move: "UP" },
  { dx: 0, dy: 1, move: "DOWN" },
  { dx: -1, dy: 0, move: "LEFT" },
  { dx: 1, dy: 0, move: "RIGHT" },
];

function decideAction(state) {
  const { grid, botPos, points } = state;
  if (!grid || !botPos) return { move: "STAY", action: "NONE" };

  const height = grid.length;
  const width = grid[0].length;

  // Collecter si on est sur un point
  if (points?.some(p => p.x === botPos.x && p.y === botPos.y)) {
    return { move: "STAY", action: "COLLECT" };
  }

  // BFS pour trouver le point le plus proche
  const visited = Array.from({ length: height }, () =>
    Array(width).fill(false)
  );
  const queue = [{ pos: botPos, path: [] }];
  visited[botPos.y][botPos.x] = true;

  while (queue.length) {
    const { pos, path } = queue.shift();

    for (const dir of directions) {
      const nx = pos.x + dir.dx;
      const ny = pos.y + dir.dy;

      if (
        nx >= 0 && nx < width &&
        ny >= 0 && ny < height &&
        !visited[ny][nx] &&
        grid[ny][nx] !== "WALL" &&
        grid[ny][nx] !== "BOMB"
      ) {
        const newPath = [...path, dir.move];

        // Si un point est trouvé
        if (points?.some(p => p.x === nx && p.y === ny)) {
          return { move: newPath[0], action: "NONE" };
        }

        visited[ny][nx] = true;
        queue.push({ pos: { x: nx, y: ny }, path: newPath });
      }
    }
  }

  return { move: "STAY", action: "NONE" }; // bloqué
}

module.exports = { decideAction };
