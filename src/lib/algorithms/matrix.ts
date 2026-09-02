export type Matrix2x2 = [[number, number], [number, number]];
export type Matrix3x3 = [[number, number, number], [number, number, number], [number, number, number]];

export interface MatrixResult {
  det: number;
  inverse?: Matrix2x2;
  hasInverse: boolean;
  steps: string[];
}

export function calculateDeterminant2x2(m: Matrix2x2): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function calculateInverse2x2(m: Matrix2x2): MatrixResult {
  const det = calculateDeterminant2x2(m);
  const steps: string[] = [];

  steps.push(`Formulasi Determinan: det(A) = (a × d) - (b × c)`);
  steps.push(`det(A) = (${m[0][0]} × ${m[1][1]}) - (${m[0][1]} × ${m[1][0]}) = ${det}`);

  if (det === 0) {
    steps.push(`Karena det(A) = 0, matriks ini adalah matriks SINGULAR dan TIDAK MEMILIKI INVERS.`);
    return { det, hasInverse: false, steps };
  }

  const invDet = 1 / det;
  const adj: Matrix2x2 = [
    [m[1][1], -m[0][1]],
    [-m[1][0], m[0][0]]
  ];

  steps.push(`Adjoin A: [[${m[1][1]}, ${-m[0][1]}], [${-m[1][0]}, ${m[0][0]}]]`);
  steps.push(`Formula Invers: A⁻¹ = (1 / det(A)) × Adjoin(A)`);

  const inverse: Matrix2x2 = [
    [Number((adj[0][0] * invDet).toFixed(4)), Number((adj[0][1] * invDet).toFixed(4))],
    [Number((adj[1][0] * invDet).toFixed(4)), Number((adj[1][1] * invDet).toFixed(4))]
  ];

  steps.push(`Hasil A⁻¹: [[${inverse[0][0]}, ${inverse[0][1]}], [${inverse[1][0]}, ${inverse[1][1]}]]`);

  return { det, inverse, hasInverse: true, steps };
}

export function addMatrices2x2(m1: Matrix2x2, m2: Matrix2x2): Matrix2x2 {
  return [
    [m1[0][0] + m2[0][0], m1[0][1] + m2[0][1]],
    [m1[1][0] + m2[1][0], m1[1][1] + m2[1][1]]
  ];
}

export function multiplyMatrices2x2(m1: Matrix2x2, m2: Matrix2x2): Matrix2x2 {
  return [
    [
      m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0],
      m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1]
    ],
    [
      m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0],
      m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1]
    ]
  ];
}
