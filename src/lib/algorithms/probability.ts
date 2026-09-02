export interface PermutationCombinationResult {
  n: number;
  k: number;
  factorialN: number;
  permutation: number;
  combination: number;
  circularPermutation: number;
  steps: string[];
}

export interface ProbabilityEventResult {
  sampleSpaceN: number;
  eventN: number;
  probability: number;
  probabilityFraction: string;
  probabilityPercentage: number;
  complementProbability: number;
  steps: string[];
}

export function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

export function permutation(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  return factorial(n) / factorial(n - k);
}

export function combination(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function calculatePermutationCombination(n: number, k: number): PermutationCombinationResult {
  const steps: string[] = [];
  steps.push(`Nilai Input: n = ${n}, k = ${k}`);

  const factN = factorial(n);
  steps.push(`Faktorial n! = ${n}! = ${factN}`);

  const P = permutation(n, k);
  steps.push(`Permutasi P(${n}, ${k}) = ${n}! / (${n} - ${k})! = ${factN} / ${factorial(n - k)} = ${P}`);

  const C = combination(n, k);
  steps.push(`Kombinasi C(${n}, ${k}) = ${n}! / [${k}! × (${n} - ${k})!] = ${factN} / [${factorial(k)} × ${factorial(n - k)}] = ${C}`);

  const circP = factorial(n - 1);
  steps.push(`Permutasi Siklis (Melingkar) = (${n} - 1)! = ${n - 1}! = ${circP}`);

  return {
    n,
    k,
    factorialN: factN,
    permutation: P,
    combination: C,
    circularPermutation: circP,
    steps
  };
}

export function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export function calculateProbability(eventN: number, sampleSpaceN: number): ProbabilityEventResult {
  const steps: string[] = [];
  steps.push(`Banyaknya Kejadian A: n(A) = ${eventN}`);
  steps.push(`Banyaknya Ruang Sampel S: n(S) = ${sampleSpaceN}`);

  if (sampleSpaceN <= 0 || eventN < 0 || eventN > sampleSpaceN) {
    steps.push(`Nilai n(A) harus memenuhi 0 ≤ n(A) ≤ n(S)`);
    return {
      sampleSpaceN,
      eventN,
      probability: 0,
      probabilityFraction: '0',
      probabilityPercentage: 0,
      complementProbability: 1,
      steps
    };
  }

  const probVal = eventN / sampleSpaceN;
  const commonGcd = gcd(eventN, sampleSpaceN);
  const simpNum = eventN / commonGcd;
  const simpDen = sampleSpaceN / commonGcd;
  const probFrac = simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`;
  const pct = Number((probVal * 100).toFixed(2));
  const compProb = Number((1 - probVal).toFixed(4));

  steps.push(`Rumus Peluang: P(A) = n(A) / n(S) = ${eventN} / ${sampleSpaceN}`);
  steps.push(`Bentuk Pecahan Sederhana: P(A) = ${probFrac}`);
  steps.push(`Persentase Peluang: P(A) = ${pct}%`);
  steps.push(`Peluang Komplemen (Bukan A): P(A') = 1 - P(A) = 1 - ${probFrac} = ${compProb}`);

  return {
    sampleSpaceN,
    eventN,
    probability: Number(probVal.toFixed(4)),
    probabilityFraction: probFrac,
    probabilityPercentage: pct,
    complementProbability: compProb,
    steps
  };
}
