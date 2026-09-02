import { describe, it, expect } from 'vitest';
import { calculateDeterminant2x2, calculateInverse2x2, addMatrices2x2 } from '../src/lib/algorithms/matrix';

describe('Matrix Algorithm', () => {
  it('calculates 2x2 determinant correctly', () => {
    // [[4, 7], [2, 6]] -> 4*6 - 7*2 = 24 - 14 = 10
    expect(calculateDeterminant2x2([[4, 7], [2, 6]])).toBe(10);
  });

  it('calculates 2x2 inverse correctly', () => {
    // [[4, 7], [2, 6]] -> det 10
    const inv = calculateInverse2x2([[4, 7], [2, 6]]);
    expect(inv.hasInverse).toBe(true);
    expect(inv.det).toBe(10);
    expect(inv.inverse![0][0]).toBe(0.6);
  });

  it('adds 2x2 matrices correctly', () => {
    const res = addMatrices2x2([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
    expect(res).toEqual([[6, 8], [10, 12]]);
  });
});
