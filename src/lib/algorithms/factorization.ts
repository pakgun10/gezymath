import { getPrimeFactors, formatFactorizationExpression, type PrimeFactor } from './fpbKpk';

export interface FactorPair {
  f1: number;
  f2: number;
}

export interface FactorizationResult {
  number: number;
  isPrime: boolean;
  allFactors: number[];
  factorPairs: FactorPair[];
  primeFactors: PrimeFactor[];
  primeExpression: string;
  steps: string[];
}

export function isPrimeNumber(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function factorizeInteger(n: number): FactorizationResult {
  const num = Math.abs(Math.round(n));

  if (num === 0) {
    return {
      number: 0,
      isPrime: false,
      allFactors: [],
      factorPairs: [],
      primeFactors: [],
      primeExpression: '0',
      steps: ['Bilangan 0 memiliki tak hingga faktor.']
    };
  }

  const isPrime = isPrimeNumber(num);
  const allFactorsSet = new Set<number>();
  const factorPairs: FactorPair[] = [];

  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      const companion = num / i;
      allFactorsSet.add(i);
      allFactorsSet.add(companion);
      factorPairs.push({ f1: i, f2: companion });
    }
  }

  const allFactors = Array.from(allFactorsSet).sort((a, b) => a - b);
  const primeFactors = getPrimeFactors(num);
  const primeExpression = formatFactorizationExpression(primeFactors);

  const steps: string[] = [
    `1. Menentukan jenis bilangan:`,
    `   ${num} ${isPrime ? 'adalah bilangan PRIMA (hanya habis dibagi 1 dan dirinya sendiri).' : 'adalah bilangan KOMPOSIT.'}`,
    `2. Semua faktor dari ${num}:`,
    `   Faktor = { ${allFactors.join(', ')} } (Total ${allFactors.length} faktor)`,
    `3. Pasangan faktor perkalian (${num}):`,
    ...factorPairs.map((p) => `   • ${p.f1} × ${p.f2} = ${num}`),
    `4. Faktorisasi prima:`,
    `   ${num} = ${primeExpression}`
  ];

  return {
    number: num,
    isPrime,
    allFactors,
    factorPairs,
    primeFactors,
    primeExpression,
    steps
  };
}
