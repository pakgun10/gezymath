import { describe, it, expect } from 'vitest';
import { solveSpldv } from '../src/lib/algorithms/spldv';

describe('SPLDV Algorithm', () => {
  it('solves linear system with unique solution', () => {
    // 2x + y = 5
    // x - y = 1
    // D = 2(-1) - 1(1) = -3
    // Dx = 5(-1) - 1(1) = -6 -> x = 2
    // Dy = 2(1) - 1(5) = -3 -> y = 1
    const res = solveSpldv(2, 1, 5, 1, -1, 1);
    expect(res.hasUniqueSolution).toBe(true);
    expect(res.x).toBe(2);
    expect(res.y).toBe(1);
  });
});
