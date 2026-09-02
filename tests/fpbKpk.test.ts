import { describe, it, expect } from 'vitest';
import { calculateFpbKpk, gcdTwo, lcmTwo, getPrimeFactors } from '../src/lib/algorithms/fpbKpk';

describe('FPB & KPK Algorithm', () => {
  it('calculates GCD and LCM for two numbers', () => {
    expect(gcdTwo(12, 18)).toBe(6);
    expect(lcmTwo(12, 18)).toBe(36);
  });

  it('generates prime factors', () => {
    const factors = getPrimeFactors(12);
    // 12 = 2^2 * 3^1
    expect(factors).toEqual([
      { prime: 2, exponent: 2 },
      { prime: 3, exponent: 1 }
    ]);
  });

  it('calculates FPB and KPK for multiple numbers', () => {
    const result = calculateFpbKpk([12, 18, 24]);
    expect(result.fpb).toBe(6);
    expect(result.kpk).toBe(72);
  });
});
