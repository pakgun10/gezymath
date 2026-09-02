import { describe, it, expect } from 'vitest';
import { calculatePermutationCombination, calculateProbability, factorial } from '../src/lib/algorithms/probability';

describe('Probability & Combinatorics Algorithms', () => {
  it('calculates factorials correctly', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(5)).toBe(120);
  });

  it('calculates permutation and combination', () => {
    const res = calculatePermutationCombination(5, 2);
    expect(res.permutation).toBe(20); // 5!/3! = 20
    expect(res.combination).toBe(10);  // 5!/(2!3!) = 10
    expect(res.circularPermutation).toBe(24); // 4! = 24
  });

  it('calculates event probability and simplify fraction', () => {
    const res = calculateProbability(2, 6);
    expect(res.probabilityFraction).toBe('1/3');
    expect(res.probabilityPercentage).toBe(33.33);
  });
});
