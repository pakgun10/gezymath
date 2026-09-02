import { describe, it, expect } from 'vitest';
import { calculateStatistics } from '../src/lib/algorithms/statistics';

describe('Statistics Algorithm', () => {
  it('calculates statistics accurately', () => {
    const data = [10, 12, 14, 15, 18, 20];
    const stats = calculateStatistics(data);

    expect(stats.count).toBe(6);
    expect(stats.sum).toBe(89);
    expect(stats.mean).toBeCloseTo(14.8333, 3);
    expect(stats.median).toBe(14.5);
    expect(stats.min).toBe(10);
    expect(stats.max).toBe(20);
    expect(stats.range).toBe(10);
  });
});
