import { describe, it, expect } from 'vitest';
import { calculateArithmeticSequence, calculateGeometricSequence } from '../src/lib/algorithms/sequenceSeries';

describe('Sequence & Series Algorithms', () => {
  it('calculates arithmetic sequence and sum', () => {
    // a = 2, b = 3, n = 5 -> Un = 2 + 4(3) = 14. Sn = 5/2 * (2 + 14) = 40
    const res = calculateArithmeticSequence(2, 3, 5);
    expect(res.Un).toBe(14);
    expect(res.Sn).toBe(40);
    expect(res.terms).toEqual([2, 5, 8, 11, 14]);
  });

  it('calculates geometric sequence and infinite sum', () => {
    // a = 16, r = 0.5, n = 4 -> Un = 16 * (0.5)^3 = 2. Sn = 16(1-0.0625)/0.5 = 30. S_inf = 16 / 0.5 = 32
    const res = calculateGeometricSequence(16, 0.5, 4);
    expect(res.Un).toBe(2);
    expect(res.Sn).toBe(30);
    expect(res.SInfinity).toBe(32);
  });
});
