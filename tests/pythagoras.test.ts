import { describe, it, expect } from 'vitest';
import { generatePythagoreanTriples, checkPythagoreanTriple, isPrimitiveTriple, gcd } from '../src/lib/algorithms/pythagoras';

describe('Pythagoras Algorithm', () => {
  it('calculates GCD correctly', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(7, 13)).toBe(1);
  });

  it('identifies primitive triples correctly', () => {
    expect(isPrimitiveTriple(3, 4, 5)).toBe(true);
    expect(isPrimitiveTriple(6, 8, 10)).toBe(false);
    expect(isPrimitiveTriple(5, 12, 13)).toBe(true);
  });

  it('generates Pythagorean triples up to N', () => {
    const triples = generatePythagoreanTriples(20);
    const has345 = triples.some((t) => t.a === 3 && t.b === 4 && t.c === 5);
    const has51213 = triples.some((t) => t.a === 5 && t.b === 12 && t.c === 13);
    const has81517 = triples.some((t) => t.a === 8 && t.b === 15 && t.c === 17);

    expect(has345).toBe(true);
    expect(has51213).toBe(true);
    expect(has81517).toBe(true);
  });

  it('validates triples correctly', () => {
    const check1 = checkPythagoreanTriple(3, 4, 5);
    expect(check1.isTriple).toBe(true);

    const check2 = checkPythagoreanTriple(3, 4, 6);
    expect(check2.isTriple).toBe(false);
  });
});
