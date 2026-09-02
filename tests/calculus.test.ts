import { describe, it, expect } from 'vitest';
import { differentiatePolynomial, integratePolynomial, parsePolynomial } from '../src/lib/algorithms/calculus';

describe('Calculus Algorithms', () => {
  it('parses polynomial terms correctly', () => {
    const terms = parsePolynomial('3x^3 - 4x^2 + 5x - 7');
    expect(terms.length).toBe(4);
    expect(terms[0]).toEqual({ coef: 3, exp: 3 });
    expect(terms[3]).toEqual({ coef: -7, exp: 0 });
  });

  it('differentiates polynomial and calculates tangent gradient', () => {
    const res = differentiatePolynomial('3x^2 + 2x - 5', 2);
    expect(res.derivativeLatex).toBe('6x + 2');
    expect(res.gradientAtX0).toBe(14); // 6(2) + 2 = 14
  });

  it('calculates definite integral area', () => {
    // ∫_0^2 (3x^2) dx = [x^3]_0^2 = 8 - 0 = 8
    const res = integratePolynomial('3x^2', 0, 2);
    expect(res.areaValue).toBe(8);
  });
});
