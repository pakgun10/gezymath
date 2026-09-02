import { describe, it, expect } from 'vitest';
import { simplifyFraction, operateFractions } from '../src/lib/algorithms/fraction';

describe('Fraction Algorithm', () => {
  it('simplifies fractions correctly', () => {
    const res = simplifyFraction(6, 8);
    expect(res.simplifiedNum).toBe(3);
    expect(res.simplifiedDen).toBe(4);
    expect(res.decimal).toBe(0.75);
  });

  it('performs fraction addition correctly', () => {
    // 1/2 + 1/3 = 5/6
    const res = operateFractions(1, 2, '+', 1, 3);
    expect(res.simplifiedNum).toBe(5);
    expect(res.simplifiedDen).toBe(6);
  });
});
