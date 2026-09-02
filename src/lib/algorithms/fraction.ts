import { gcd } from './pythagoras';

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  numerator: number;
  denominator: number;
  simplifiedNum: number;
  simplifiedDen: number;
  isNegative: boolean;
  mixedWhole: number;
  mixedRemainder: number;
  decimal: number;
  latexForm: string;
  mixedForm: string;
  steps: string[];
}

export function simplifyFraction(num: number, den: number): FractionResult {
  const steps: string[] = [];

  if (den === 0) {
    throw new Error('Penyebut tidak boleh 0');
  }

  const sign = (num < 0) !== (den < 0) ? -1 : 1;
  const absNum = Math.abs(num);
  const absDen = Math.abs(den);

  const g = gcd(absNum, absDen);
  const simNum = (absNum / g) * sign;
  const simDen = absDen / g;

  steps.push(`Penyederhanaan Pecahan ${num}/${den}:`);
  steps.push(`Cari FPB(${absNum}, ${absDen}) = ${g}`);
  steps.push(`Bagi pembagi & penyebut dengan ${g}: ${absNum / g} / ${absDen / g}`);

  const whole = Math.floor(Math.abs(simNum) / simDen) * Math.sign(simNum);
  const remainder = Math.abs(simNum) % simDen;

  const decimal = Number((simNum / simDen).toFixed(4));
  const latexForm = `\\frac{${simNum}}{${simDen}}`;

  let mixedForm = `${simNum}/${simDen}`;
  if (Math.abs(simNum) >= simDen && simDen !== 1) {
    mixedForm = `${whole} \\frac{${remainder}}{${simDen}}`;
  }

  return {
    numerator: num,
    denominator: den,
    simplifiedNum: simNum,
    simplifiedDen: simDen,
    isNegative: sign < 0,
    mixedWhole: whole,
    mixedRemainder: remainder,
    decimal,
    latexForm,
    mixedForm,
    steps
  };
}

export function operateFractions(
  n1: number,
  d1: number,
  op: '+' | '-' | '*' | '/',
  n2: number,
  d2: number
): FractionResult {
  let resultNum = 0;
  let resultDen = 1;

  if (op === '+') {
    resultNum = n1 * d2 + n2 * d1;
    resultDen = d1 * d2;
  } else if (op === '-') {
    resultNum = n1 * d2 - n2 * d1;
    resultDen = d1 * d2;
  } else if (op === '*') {
    resultNum = n1 * n2;
    resultDen = d1 * d2;
  } else if (op === '/') {
    resultNum = n1 * d2;
    resultDen = d1 * n2;
  }

  return simplifyFraction(resultNum, resultDen);
}
