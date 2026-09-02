export interface LogarithmResult {
  base: number;
  value: number;
  logResult: number;
  naturalLog: number;
  log10: number;
  propertiesSteps: string[];
}

export interface ExponentRadicalResult {
  base: number;
  exponent: number;
  powerResult: number;
  radicalNumber: number;
  simplifiedRadical: string;
  coefOutside: number;
  insideRadical: number;
  steps: string[];
}

export function simplifyRadical(num: number): { coef: number; inside: number; formatted: string } {
  if (num <= 0 || !Number.isInteger(num) || num > 1e12 || Number.isNaN(num)) {
    return { coef: 1, inside: num, formatted: `√${num}` };
  }

  let coef = 1;
  let inside = num;

  for (let i = Math.floor(Math.sqrt(num)); i >= 2; i--) {
    const sq = i * i;
    if (inside % sq === 0) {
      coef *= i;
      inside /= sq;
    }
  }

  let formatted = '';
  if (inside === 1) formatted = `${coef}`;
  else if (coef === 1) formatted = `√${inside}`;
  else formatted = `${coef}√${inside}`;

  return { coef, inside, formatted };
}

export function calculateLogarithm(base: number, value: number): LogarithmResult {
  const steps: string[] = [];
  steps.push(`Nilai Input: Basis a = ${base}, Numerus b = ${value}`);

  if (base <= 0 || base === 1 || value <= 0) {
    steps.push(`Syarat Logaritma: Basis a > 0, a ≠ 1, dan Numerus b > 0`);
    return {
      base,
      value,
      logResult: 0,
      naturalLog: 0,
      log10: 0,
      propertiesSteps: steps
    };
  }

  const logResult = Math.log(value) / Math.log(base);
  const naturalLog = Math.log(value);
  const log10 = Math.log10(value);

  steps.push(`Rumus Perubahan Basis: ᵃlog(b) = ln(b) / ln(a)`);
  steps.push(`ln(${value}) = ${naturalLog.toFixed(4)}`);
  steps.push(`ln(${base}) = ${Math.log(base).toFixed(4)}`);
  steps.push(`ᵃlog(b) = ${naturalLog.toFixed(4)} / ${Math.log(base).toFixed(4)} = ${logResult.toFixed(4)}`);

  // Properties demonstration
  steps.push(`Sifat 1: ᵃlog(1) = 0`);
  steps.push(`Sifat 2: ᵃlog(a) = 1 ⇒ ᵃlog(${base}) = 1`);
  steps.push(`Sifat 3: ᵃlog(b^c) = c · ᵃlog(b)`);

  return {
    base,
    value,
    logResult: Number(logResult.toFixed(4)),
    naturalLog: Number(naturalLog.toFixed(4)),
    log10: Number(log10.toFixed(4)),
    propertiesSteps: steps
  };
}

export function calculateExponentRadical(base: number, exponent: number, radicalNum: number): ExponentRadicalResult {
  const steps: string[] = [];
  steps.push(`Input Eksponen: ${base}^(${exponent})`);

  const powerResult = Math.pow(base, exponent);
  steps.push(`Hasil Perpangkatan: ${base}^${exponent} = ${powerResult}`);

  steps.push(`Input Bentuk Akar: √${radicalNum}`);
  const { coef, inside, formatted } = simplifyRadical(radicalNum);
  steps.push(`Penyederhanaan Akar: √${radicalNum} = √(${coef * coef} × ${inside}) = ${formatted}`);

  return {
    base,
    exponent,
    powerResult: Number(powerResult.toFixed(4)),
    radicalNumber: radicalNum,
    simplifiedRadical: formatted,
    coefOutside: coef,
    insideRadical: inside,
    steps
  };
}
