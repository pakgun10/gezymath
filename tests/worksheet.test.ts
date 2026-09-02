import { describe, it, expect } from 'vitest';
import { generateWorksheet } from '../src/lib/algorithms/worksheet';

describe('Worksheet Generator Algorithm', () => {
  it('generates the requested number of problems for a topic', () => {
    const problems = generateWorksheet({
      title: 'Ujian Matematika',
      schoolName: 'SMA GezyTech',
      teacherName: 'Pak Gun',
      date: '2026-09-02',
      topic: 'pythagoras',
      level: 'SMA',
      count: 5,
      includeAnswers: true
    });

    expect(problems.length).toBe(5);
    expect(problems[0].topic).toBe('Tripel Pythagoras');
    expect(problems[0].questionText).toBeDefined();
    expect(problems[0].answerText).toBeDefined();
  });

  it('generates random mixed problems correctly', () => {
    const problems = generateWorksheet({
      title: 'Latihan Acak',
      schoolName: 'SMP Gezy',
      teacherName: 'Pak Gun',
      date: '2026-09-02',
      topic: 'random',
      level: 'SMP',
      count: 10,
      includeAnswers: false
    });

    expect(problems.length).toBe(10);
    expect(problems[0].id).toBe(1);
    expect(problems[9].id).toBe(10);
  });
});
