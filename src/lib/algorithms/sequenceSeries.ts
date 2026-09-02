export interface ArithmeticSequenceResult {
  a: number;
  b: number;
  n: number;
  Un: number;
  Sn: number;
  terms: number[];
  steps: string[];
}

export interface GeometricSequenceResult {
  a: number;
  r: number;
  n: number;
  Un: number;
  Sn: number;
  SInfinity?: number;
  terms: number[];
  steps: string[];
}

export function calculateArithmeticSequence(a: number, b: number, n: number): ArithmeticSequenceResult {
  const steps: string[] = [];
  steps.push(`Input: Suku pertama (a) = ${a}, Beda (b) = ${b}, Banyak suku (n) = ${n}`);

  const Un = a + (n - 1) * b;
  steps.push(`Rumus Suku ke-n: U_n = a + (n - 1)b`);
  steps.push(`U_${n} = ${a} + (${n} - 1) × ${b} = ${a} + ${n - 1} × ${b} = ${Un}`);

  const Sn = (n / 2) * (2 * a + (n - 1) * b);
  steps.push(`Rumus Jumlah n Suku Pertama: S_n = (n / 2) × (a + U_n)`);
  steps.push(`S_${n} = (${n} / 2) × (${a} + ${Un}) = ${n / 2} × ${a + Un} = ${Sn}`);

  const terms: number[] = [];
  for (let i = 1; i <= Math.min(n, 10); i++) {
    terms.push(a + (i - 1) * b);
  }
  steps.push(`10 Suku Pertama: [${terms.join(', ')}${n > 10 ? ', ...' : ''}]`);

  return { a, b, n, Un, Sn, terms, steps };
}

export function calculateGeometricSequence(a: number, r: number, n: number): GeometricSequenceResult {
  const steps: string[] = [];
  steps.push(`Input: Suku pertama (a) = ${a}, Rasio (r) = ${r}, Banyak suku (n) = ${n}`);

  const Un = a * Math.pow(r, n - 1);
  steps.push(`Rumus Suku ke-n: U_n = a · r^(n-1)`);
  steps.push(`U_${n} = ${a} × ${r}^(${n}-1) = ${a} × ${Math.pow(r, n - 1)} = ${Un}`);

  let Sn = 0;
  if (r === 1) {
    Sn = a * n;
    steps.push(`Rasio r = 1 ⇒ S_n = n × a = ${n} × ${a} = ${Sn}`);
  } else if (r > 1) {
    Sn = (a * (Math.pow(r, n) - 1)) / (r - 1);
    steps.push(`Rumus S_n (r > 1): S_n = a(r^n - 1) / (r - 1)`);
    steps.push(`S_${n} = ${a} × (${Math.pow(r, n)} - 1) / (${r} - 1) = ${Sn}`);
  } else {
    Sn = (a * (1 - Math.pow(r, n))) / (1 - r);
    steps.push(`Rumus S_n (r < 1): S_n = a(1 - r^n) / (1 - r)`);
    steps.push(`S_${n} = ${a} × (1 - ${Math.pow(r, n)}) / (1 - ${r}) = ${Sn}`);
  }

  let SInfinity: number | undefined;
  if (Math.abs(r) < 1) {
    SInfinity = Number((a / (1 - r)).toFixed(4));
    steps.push(`Deret Geometri Tak Hingga (|r| < 1): S_∞ = a / (1 - r) = ${a} / (1 - ${r}) = ${SInfinity}`);
  }

  const terms: number[] = [];
  for (let i = 1; i <= Math.min(n, 10); i++) {
    terms.push(Number((a * Math.pow(r, i - 1)).toFixed(4)));
  }
  steps.push(`10 Suku Pertama: [${terms.join(', ')}${n > 10 ? ', ...' : ''}]`);

  return { a, r, n, Un, Sn, SInfinity, terms, steps };
}
