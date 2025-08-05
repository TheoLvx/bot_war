const { decideAction } = require('../app/botLogic');

describe('decideAction', () => {
  it('should collect if bot is on a point', () => {
    const state = {
      grid: [
        ['EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY'],
      ],
      botPos: { x: 1, y: 1 },
      points: [{ x: 1, y: 1 }],
    };

    const result = decideAction(state);
    expect(result).toEqual({ move: 'STAY', action: 'COLLECT' });
  });

  it('should move towards the nearest point', () => {
    const state = {
      grid: [
        ['EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY'],
      ],
      botPos: { x: 0, y: 0 },
      points: [{ x: 1, y: 0 }],
    };

    const result = decideAction(state);
    expect(result.move).toBe('RIGHT');
    expect(result.action).toBe('NONE');
  });

  it('should stay and do nothing if no points', () => {
    const state = {
      grid: [
        ['EMPTY'],
      ],
      botPos: { x: 0, y: 0 },
      points: [],
    };

    const result = decideAction(state);
    expect(result).toEqual({ move: 'STAY', action: 'NONE' });
  });
});
