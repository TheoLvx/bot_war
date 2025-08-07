// __tests__/botLogic.test.js
const { decideAction } = require('../app/botLogic');

describe('decideAction', () => {
  it('should collect if bot is on a point', () => {
    const state = {
      botPos: { x: 1, y: 1 },
      points: [{ x: 1, y: 1 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'STAY', action: 'COLLECT' });
  });

  it('should move RIGHT towards the nearest point', () => {
    const state = {
      botPos: { x: 0, y: 0 },
      points: [{ x: 2, y: 0 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'RIGHT', action: 'NONE' });
  });

  it('should move LEFT towards the nearest point', () => {
    const state = {
      botPos: { x: 2, y: 0 },
      points: [{ x: 0, y: 0 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'LEFT', action: 'NONE' });
  });

  it('should move UP towards the nearest point', () => {
    const state = {
      botPos: { x: 1, y: 2 },
      points: [{ x: 1, y: 0 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'UP', action: 'NONE' });
  });

  it('should move DOWN towards the nearest point', () => {
    const state = {
      botPos: { x: 1, y: 0 },
      points: [{ x: 1, y: 2 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'DOWN', action: 'NONE' });
  });

  it('should stay and do nothing if no points', () => {
    const state = {
      botPos: { x: 0, y: 0 },
      points: [],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'STAY', action: 'NONE' });
  });

  it('should choose the closest point among many', () => {
    const state = {
      botPos: { x: 0, y: 0 },
      points: [{ x: 5, y: 5 }, { x: 1, y: 0 }, { x: 3, y: 3 }],
    };
    const result = decideAction(state);
    expect(result).toEqual({ move: 'RIGHT', action: 'NONE' });
  });
});
