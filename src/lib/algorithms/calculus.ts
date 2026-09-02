export interface DerivativeResult {
  functionStr: string;
  derivativeLatex: string;
  gradientAtX0?: number;
  tangentLineLatex?: string;
  steps: string[];
}

export interface DefiniteIntegralResult {
  functionStr: string;
  antiderivativeLatex: string;
  lowerLimit: number;
  upperLimit: number;
  areaValue: number;
  steps: string[];
}

export interface PolynomialTerm {
  coef: number;
  exp: number;
}

/**
 * Parses polynomial string like "3x^3 - 4x^2 + 5x - 7"
 */
export function parsePolynomial(polyStr: string): PolynomialTerm[] {
  const clean = polyStr.replace(/\s+/g, '').replace(/-/g, '+-');
  const termsRaw = clean.split('+').filter((t) => t.length > 0);
  const terms: PolynomialTerm[] = [];

  for (const raw of termsRaw) {
    if (!raw.includes('x')) {
      const coef = parseFloat(raw);
      if (!isNaN(coef)) terms.push({ coef, exp: 0 });
    } else {
      const parts = raw.split('x');
      let coef = 1;
      if (parts[0] === '-') coef = -1;
      else if (parts[0] !== '') coef = parseFloat(parts[0]);

      let exp = 1;
      if (parts[1] && parts[1].startsWith('^')) {
        exp = parseFloat(parts[1].substring(1));
      }
      if (!isNaN(coef) && !isNaN(exp)) {
        terms.push({ coef, exp });
      }
    }
  }

  return terms;
}

export function formatPolynomialLatex(terms: PolynomialTerm[], addC = false): string {
  if (terms.length === 0) return addC ? 'C' : '0';

  let res = '';
  terms.forEach((t, i) => {
    if (t.coef === 0) return;
    const sign = t.coef > 0 ? (i === 0 ? '' : ' + ') : (i === 0 ? '-' : ' - ');
    const absCoef = Math.abs(t.coef);
    const formattedCoef = absCoef === 1 && t.exp !== 0 ? '' : Number(absCoef.toFixed(4));

    let termStr = '';
    if (t.exp === 0) termStr = `${absCoef}`;
    else if (t.exp === 1) termStr = `${formattedCoef}x`;
    else termStr = `${formattedCoef}x^{${t.exp}}`;

    res += `${sign}${termStr}`;
  });

  if (!res) res = '0';
  if (addC) res += ' + C';
  return res;
}

export function differentiatePolynomial(polyStr: string, x0?: number): DerivativeResult {
  const steps: string[] = [];
  steps.push(`Fungsi Input: f(x) = ${polyStr}`);

  const terms = parsePolynomial(polyStr);
  const diffTerms: PolynomialTerm[] = [];

  steps.push(`Aturan Pangkat Turunan: d/dx (a · xⁿ) = a · n · xⁿ⁻¹`);

  terms.forEach((t) => {
    if (t.exp === 0) {
      steps.push(`Turunan konstanta ${t.coef} adalah 0`);
    } else {
      const newCoef = t.coef * t.exp;
      const newExp = t.exp - 1;
      diffTerms.push({ coef: newCoef, exp: newExp });
      steps.push(`d/dx (${t.coef}x^${t.exp}) = (${t.coef} × ${t.exp}) x^${newExp} = ${newCoef}x^${newExp}`);
    }
  });

  const derivativeLatex = formatPolynomialLatex(diffTerms);
  steps.push(`Hasil Turunan Pertama f'(x) = ${derivativeLatex}`);

  let gradientAtX0: number | undefined;
  let tangentLineLatex: string | undefined;

  if (x0 !== undefined && !isNaN(x0)) {
    let grad = 0;
    diffTerms.forEach((t) => {
      grad += t.coef * Math.pow(x0, t.exp);
    });
    gradientAtX0 = Number(grad.toFixed(4));

    let y0 = 0;
    terms.forEach((t) => {
      y0 += t.coef * Math.pow(x0, t.exp);
    });

    steps.push(`Gradien di titik x = ${x0}: m = f'(${x0}) = ${gradientAtX0}`);
    steps.push(`Nilai f(${x0}) = ${Number(y0.toFixed(4))}`);

    const cLine = Number((y0 - grad * x0).toFixed(4));
    tangentLineLatex = `y = ${grad !== 1 ? grad : ''}x ${cLine >= 0 ? '+ ' + cLine : '- ' + Math.abs(cLine)}`;
    steps.push(`Persamaan Garis Singgung: y - y₀ = m(x - x₀) ⇒ ${tangentLineLatex}`);
  }

  return {
    functionStr: polyStr,
    derivativeLatex,
    gradientAtX0,
    tangentLineLatex,
    steps
  };
}

export function integratePolynomial(polyStr: string, a: number, b: number): DefiniteIntegralResult {
  const steps: string[] = [];
  steps.push(`Fungsi Input: f(x) = ${polyStr}`);
  steps.push(`Batas Batas Integral: a = ${a}, b = ${b}`);

  const terms = parsePolynomial(polyStr);
  const intTerms: PolynomialTerm[] = [];

  steps.push(`Aturan Integral Tak Tentu: ∫ (a · xⁿ) dx = [a / (n + 1)] · xⁿ⁺¹ + C`);

  terms.forEach((t) => {
    const newExp = t.exp + 1;
    const newCoef = t.coef / newExp;
    intTerms.push({ coef: newCoef, exp: newExp });
    steps.push(`∫ (${t.coef}x^${t.exp}) dx = (${t.coef} / ${newExp}) x^${newExp} = ${Number(newCoef.toFixed(4))}x^${newExp}`);
  });

  const antiderivativeLatex = formatPolynomialLatex(intTerms, true);
  steps.push(`Anti-Turunan (Integral Tak Tentu): F(x) = ${antiderivativeLatex}`);

  function evalAntiderivative(val: number): number {
    let res = 0;
    intTerms.forEach((t) => {
      res += t.coef * Math.pow(val, t.exp);
    });
    return res;
  }

  const Fb = evalAntiderivative(b);
  const Fa = evalAntiderivative(a);
  const areaValue = Number((Fb - Fa).toFixed(4));

  steps.push(`Evaluasi F(b) = F(${b}) = ${Number(Fb.toFixed(4))}`);
  steps.push(`Evaluasi F(a) = F(${a}) = ${Number(Fa.toFixed(4))}`);
  steps.push(`Nilai Integral Tentu ∫_{${a}}^{${b}} f(x) dx = F(${b}) - F(${a}) = ${Number(Fb.toFixed(4))} - ${Number(Fa.toFixed(4))} = ${areaValue}`);

  return {
    functionStr: polyStr,
    antiderivativeLatex,
    lowerLimit: a,
    upperLimit: b,
    areaValue,
    steps
  };
}
