export interface PrimeFactor {
  prime: number;
  exponent: number;
}

export interface FactorizationStep {
  number: number;
  factors: PrimeFactor[];
  expression: string;
}

export interface FpbKpkResult {
  numbers: number[];
  fpb: number;
  kpk: number;
  factorizations: FactorizationStep[];
  fpbSteps: string[];
  kpkSteps: string[];
}

export function gcdTwo(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

export function lcmTwo(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcdTwo(a, b);
}

export function getPrimeFactors(n: number): PrimeFactor[] {
  let num = Math.abs(n);
  if (num <= 1) return [];

  const factorsMap = new Map<number, number>();

  let divisor = 2;
  while (divisor * divisor <= num) {
    while (num % divisor === 0) {
      factorsMap.set(divisor, (factorsMap.get(divisor) || 0) + 1);
      num /= divisor;
    }
    divisor = divisor === 2 ? 3 : divisor + 2;
  }
  if (num > 1) {
    factorsMap.set(num, (factorsMap.get(num) || 0) + 1);
  }

  return Array.from(factorsMap.entries()).map(([prime, exponent]) => ({ prime, exponent }));
}

export function formatFactorizationExpression(factors: PrimeFactor[]): string {
  if (factors.length === 0) return '1';
  return factors.map((f) => (f.exponent > 1 ? `${f.prime}^${f.exponent}` : `${f.prime}`)).join(' \\times ');
}

export function calculateFpbKpk(numbers: number[]): FpbKpkResult {
  const cleanNumbers = numbers.filter((n) => Number.isInteger(n) && n > 0);

  if (cleanNumbers.length === 0) {
    return {
      numbers: [],
      fpb: 0,
      kpk: 0,
      factorizations: [],
      fpbSteps: ['Masukkan setidaknya dua bilangan bulat positif.'],
      kpkSteps: []
    };
  }

  if (cleanNumbers.length === 1) {
    const num = cleanNumbers[0];
    const factors = getPrimeFactors(num);
    return {
      numbers: cleanNumbers,
      fpb: num,
      kpk: num,
      factorizations: [{ number: num, factors, expression: formatFactorizationExpression(factors) }],
      fpbSteps: [`FPB dari ${num} adalah ${num}`],
      kpkSteps: [`KPK dari ${num} adalah ${num}`]
    };
  }

  const factorizations: FactorizationStep[] = cleanNumbers.map((num) => {
    const factors = getPrimeFactors(num);
    return {
      number: num,
      factors,
      expression: formatFactorizationExpression(factors)
    };
  });

  // Calculate FPB (GCD of all numbers)
  let fpb = cleanNumbers[0];
  for (let i = 1; i < cleanNumbers.length; i++) {
    fpb = gcdTwo(fpb, cleanNumbers[i]);
  }

  // Calculate KPK (LCM of all numbers)
  let kpk = cleanNumbers[0];
  for (let i = 1; i < cleanNumbers.length; i++) {
    kpk = lcmTwo(kpk, cleanNumbers[i]);
  }

  // Generate steps using prime factorization method
  const fpbSteps: string[] = [
    `1. Faktorisasi prima masing-masing bilangan:`,
    ...factorizations.map((f) => `   • ${f.number} = ${f.expression}`),
    `2. Untuk FPB, ambil faktor prima yang sama dengan pangkat terkecil:`,
  ];

  // Find min exponent for common primes
  const allPrimes = new Set<number>();
  factorizations.forEach((f) => f.factors.forEach((pf) => allPrimes.add(pf.prime)));

  const commonPrimes: { prime: number; minExp: number }[] = [];
  allPrimes.forEach((p) => {
    let isCommon = true;
    let minExp = Infinity;
    for (const f of factorizations) {
      const match = f.factors.find((pf) => pf.prime === p);
      if (!match) {
        isCommon = false;
        break;
      }
      minExp = Math.min(minExp, match.exponent);
    }
    if (isCommon && minExp > 0 && minExp !== Infinity) {
      commonPrimes.push({ prime: p, minExp });
    }
  });

  if (commonPrimes.length === 0) {
    fpbSteps.push(`   • Tidak ada faktor prima yang sama, maka FPB = 1`);
  } else {
    const fpbExpr = commonPrimes.map((cp) => (cp.minExp > 1 ? `${cp.prime}^${cp.minExp}` : `${cp.prime}`)).join(' × ');
    fpbSteps.push(`   • FPB = ${fpbExpr} = ${fpb}`);
  }

  // Generate KPK steps
  const maxPrimesMap = new Map<number, number>();
  factorizations.forEach((f) => {
    f.factors.forEach((pf) => {
      maxPrimesMap.set(pf.prime, Math.max(maxPrimesMap.get(pf.prime) || 0, pf.exponent));
    });
  });

  const kpkSteps: string[] = [
    `1. Untuk KPK, ambil seluruh faktor prima yang ada dengan pangkat terbesar:`,
  ];
  const kpkParts: string[] = [];
  maxPrimesMap.forEach((maxExp, prime) => {
    kpkParts.push(maxExp > 1 ? `${prime}^${maxExp}` : `${prime}`);
  });

  kpkSteps.push(`   • KPK = ${kpkParts.join(' × ')} = ${kpk}`);

  return {
    numbers: cleanNumbers,
    fpb,
    kpk,
    factorizations,
    fpbSteps,
    kpkSteps
  };
}
