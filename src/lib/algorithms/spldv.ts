export interface SpldvResult {
  hasUniqueSolution: boolean;
  x?: number;
  y?: number;
  detMain: number;
  detX: number;
  detY: number;
  solutionType: 'unique' | 'infinite' | 'none';
  steps: string[];
  latexEq1: string;
  latexEq2: string;
}

/**
 * Solves System of Linear Equations 2 Variables:
 * a1*x + b1*y = c1
 * a2*x + b2*y = c2
 * using Cramer's Rule
 */
export function solveSpldv(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): SpldvResult {
  const steps: string[] = [];

  const latexEq1 = `${a1 !== 1 ? (a1 === -1 ? '-' : a1) : ''}x ${b1 >= 0 ? '+ ' + b1 : '- ' + Math.abs(b1)}y = ${c1}`;
  const latexEq2 = `${a2 !== 1 ? (a2 === -1 ? '-' : a2) : ''}x ${b2 >= 0 ? '+ ' + b2 : '- ' + Math.abs(b2)}y = ${c2}`;

  steps.push(`Persamaan 1: ${a1}x + ${b1}y = ${c1}`);
  steps.push(`Persamaan 2: ${a2}x + ${b2}y = ${c2}`);

  // Determinant D = a1*b2 - a2*b1
  const D = a1 * b2 - a2 * b1;
  // Determinant Dx = c1*b2 - c2*b1
  const Dx = c1 * b2 - c2 * b1;
  // Determinant Dy = a1*c2 - a2*c1
  const Dy = a1 * c2 - a2 * c1;

  steps.push(`Determinan Utama (D) = (${a1} × ${b2}) - (${a2} × ${b1}) = ${D}`);

  if (D === 0) {
    if (Dx === 0 && Dy === 0) {
      steps.push(`Karena D = 0 dan Dx = Dy = 0, sistem memiliki TAK HINGGA BANYAK SOLUSI (Garis Berimpit).`);
      return {
        hasUniqueSolution: false,
        detMain: D,
        detX: Dx,
        detY: Dy,
        solutionType: 'infinite',
        steps,
        latexEq1,
        latexEq2
      };
    } else {
      steps.push(`Karena D = 0 dan Dx/Dy ≠ 0, sistem TIDAK MEMILIKI SOLUSI (Garis Sejajar).`);
      return {
        hasUniqueSolution: false,
        detMain: D,
        detX: Dx,
        detY: Dy,
        solutionType: 'none',
        steps,
        latexEq1,
        latexEq2
      };
    }
  }

  const x = Dx / D;
  const y = Dy / D;

  const roundedX = Number(x.toFixed(4));
  const roundedY = Number(y.toFixed(4));

  steps.push(`Dx = (${c1} × ${b2}) - (${c2} × ${b1}) = ${Dx}`);
  steps.push(`Dy = (${a1} × ${c2}) - (${a2} × ${c1}) = ${Dy}`);
  steps.push(`Nilai x = Dx / D = ${Dx} / ${D} = ${roundedX}`);
  steps.push(`Nilai y = Dy / D = ${Dy} / ${D} = ${roundedY}`);
  steps.push(`Himpunan Penyelesaian HP = {(${roundedX}, ${roundedY})}`);

  return {
    hasUniqueSolution: true,
    x: roundedX,
    y: roundedY,
    detMain: D,
    detX: Dx,
    detY: Dy,
    solutionType: 'unique',
    steps,
    latexEq1,
    latexEq2
  };
}
