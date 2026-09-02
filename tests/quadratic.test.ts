import { describe, it, expect } from 'vitest';
import { solveQuadratic } from '../src/lib/algorithms/quadratic';

describe('Quadratic Equation Solver', () => {
  it('solves quadratic with two real roots', () => {
    // x^2 - 5x + 6 = 0 -> roots 2 and 3
    const res = solveQuadratic(1, -5, 6);
    expect(res.discriminant).toBe(1);
    expect(res.rootType).toBe('two-real');
    expect(res.x1.re).toBe(3);
    expect(res.x2.re).toBe(2);
    expect(res.vertex).toEqual({ x: 2.5, y: -0.25 });
  });

  it('solves quadratic with one double root', () => {
    // x^2 - 4x + 4 = 0 -> root 2
    const res = solveQuadratic(1, -4, 4);
    expect(res.discriminant).toBe(0);
    expect(res.rootType).toBe('one-real');
    expect(res.x1.re).toBe(2);
  });

  it('solves quadratic with complex roots', () => {
    // x^2 + 1 = 0 -> roots +/- i
    const res = solveQuadratic(1, 0, 1);
    expect(res.discriminant).toBe(-4);
    expect(res.rootType).toBe('complex');
    expect(res.x1.im).toBe(1);
    expect(res.x2.im).toBe(-1);
  });
});
