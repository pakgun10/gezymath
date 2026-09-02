export interface PythagoreanTriple {
  a: number;
  b: number;
  c: number;
  isPrimitive: boolean;
  formula: string;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

export function isPrimitiveTriple(a: number, b: number, c: number): boolean {
  return gcd(a, gcd(b, c)) === 1;
}

/**
 * Generate Pythagorean triples (a, b, c) where c <= maxN
 */
export function generatePythagoreanTriples(maxN: number = 100, primitiveOnly: boolean = false): PythagoreanTriple[] {
  const triples: PythagoreanTriple[] = [];
  const limit = Math.max(5, Math.min(maxN, 2000)); // Cap limit for client performance

  // Generating triples using Euclid's formula (m > n > 0)
  const maxM = Math.ceil(Math.sqrt(limit));

  for (let m = 2; m <= maxM; m++) {
    for (let n = 1; n < m; n++) {
      if ((m - n) % 2 === 1 && gcd(m, n) === 1) {
        const a0 = m * m - n * n;
        const b0 = 2 * m * n;
        const c0 = m * m + n * n;

        let k = 1;
        while (k * c0 <= limit) {
          const a = Math.min(k * a0, k * b0);
          const b = Math.max(k * a0, k * b0);
          const c = k * c0;
          const isPrimitive = k === 1;

          if (!primitiveOnly || isPrimitive) {
            triples.push({
              a,
              b,
              c,
              isPrimitive,
              formula: `${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c} = ${c}^2`
            });
          }
          k++;
        }
      }
    }
  }

  // Deduplicate and sort by c, then a
  const uniqueMap = new Map<string, PythagoreanTriple>();
  for (const t of triples) {
    const key = `${t.a}-${t.b}-${t.c}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, t);
    }
  }

  return Array.from(uniqueMap.values()).sort((x, y) => x.c - y.c || x.a - y.a);
}

export function checkPythagoreanTriple(a: number, b: number, c: number): {
  isTriple: boolean;
  lhs: number;
  rhs: number;
  explanation: string;
} {
  const sides = [a, b, c].sort((x, y) => x - y);
  const [s1, s2, hyp] = sides;
  const lhs = s1 * s1 + s2 * s2;
  const rhs = hyp * hyp;
  const isTriple = lhs === rhs && s1 > 0;

  return {
    isTriple,
    lhs,
    rhs,
    explanation: isTriple
      ? `Terbukti! ${s1}² + ${s2}² = ${s1 * s1} + ${s2 * s2} = ${lhs} = ${hyp}² (${rhs}).`
      : `Bukan tripel Pythagoras karena ${s1}² + ${s2}² = ${lhs}, sedangkan ${hyp}² = ${rhs} (${lhs} ≠ ${rhs}).`
  };
}
