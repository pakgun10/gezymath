import { describe, it, expect } from 'vitest';
import { calculateExponentRadical, calculateLogarithm, simplifyRadical } from '../src/lib/algorithms/exponentRadical';

describe('Exponent & Radical & Logarithm Algorithms', () => {
  it('simplifies radicals correctly', () => {
    // √72 = 6√2
    const res72 = simplifyRadical(72);
    expect(res72.coef).toBe(6);
    expect(res72.inside).toBe(2);
    expect(res72.formatted).toBe('6√2');

    // √25 = 5
    const res25 = simplifyRadical(25);
    expect(res25.formatted).toBe('5');
  });

  it('calculates logarithm correctly', () => {
    // log2(8) = 3
    const res = calculateLogarithm(2, 8);
    expect(res.logResult).toBe(3);
  });

  it('calculates powers and radicals', () => {
    const res = calculateExponentRadical(2, 5, 50);
    expect(res.powerResult).toBe(32);
    expect(res.simplifiedRadical).toBe('5√2');
  });
});
