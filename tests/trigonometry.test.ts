import { describe, it, expect } from 'vitest';
import { calculateTrigonometry, calculateCosineRule } from '../src/lib/algorithms/trigonometry';

describe('Trigonometry Algorithm', () => {
  it('calculates special angles correctly', () => {
    const res30 = calculateTrigonometry(30);
    expect(res30.sin).toBe(0.5);
    expect(res30.cos).toBe(0.866);
    expect(res30.quadrant).toBe(1);

    const res90 = calculateTrigonometry(90);
    expect(res90.sin).toBe(1);
    expect(res90.cos).toBe(0);
    expect(res90.tan).toBe('Tak Hingga (Undefined)');
  });

  it('calculates Cosine Rule correctly', () => {
    // a=3, b=4, C=90deg -> c=5, area=6
    const res = calculateCosineRule(3, 4, 90);
    expect(res.sideC).toBe(5);
    expect(res.area).toBe(6);
  });
});
