export interface TrigonometryResult {
  angleDegrees: number;
  angleRadians: number;
  sin: number;
  cos: number;
  tan: number | 'Tak Hingga (Undefined)';
  csc: number | 'Tak Hingga (Undefined)';
  sec: number | 'Tak Hingga (Undefined)';
  cot: number | 'Tak Hingga (Undefined)';
  quadrant: number;
  exactSin?: string;
  exactCos?: string;
  exactTan?: string;
  steps: string[];
}

export interface TriangleRuleResult {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  angleA?: number;
  angleB?: number;
  angleC?: number;
  area: number;
  steps: string[];
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function calculateTrigonometry(deg: number): TrigonometryResult {
  const steps: string[] = [];
  const normalizedDeg = ((deg % 360) + 360) % 360;
  const rad = degToRad(normalizedDeg);

  steps.push(`Sudut Input: ${deg}° (Sudut Ter-normalisasi: ${normalizedDeg}°)`);
  steps.push(`Konversi ke Radian: ${normalizedDeg}° × (π / 180) = ${rad.toFixed(4)} rad`);

  // Quadrant determination
  let quadrant = 1;
  if (normalizedDeg > 90 && normalizedDeg <= 180) quadrant = 2;
  else if (normalizedDeg > 180 && normalizedDeg <= 270) quadrant = 3;
  else if (normalizedDeg > 270 && normalizedDeg < 360) quadrant = 4;

  steps.push(`Kuadran: Kuadran ${quadrant}`);

  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);

  const roundedSin = Number(sinVal.toFixed(4));
  const roundedCos = Number(cosVal.toFixed(4));

  let tanVal: number | 'Tak Hingga (Undefined)';
  if (Math.abs(cosVal) < 1e-9) {
    tanVal = 'Tak Hingga (Undefined)';
  } else {
    tanVal = Number((sinVal / cosVal).toFixed(4));
  }

  let cscVal: number | 'Tak Hingga (Undefined)';
  if (Math.abs(sinVal) < 1e-9) {
    cscVal = 'Tak Hingga (Undefined)';
  } else {
    cscVal = Number((1 / sinVal).toFixed(4));
  }

  let secVal: number | 'Tak Hingga (Undefined)';
  if (Math.abs(cosVal) < 1e-9) {
    secVal = 'Tak Hingga (Undefined)';
  } else {
    secVal = Number((1 / cosVal).toFixed(4));
  }

  let cotVal: number | 'Tak Hingga (Undefined)';
  if (typeof tanVal === 'string' || Math.abs(sinVal) < 1e-9) {
    cotVal = Math.abs(sinVal) < 1e-9 ? 'Tak Hingga (Undefined)' : 0;
  } else {
    cotVal = Number((cosVal / sinVal).toFixed(4));
  }

  // Exact special angle values
  let exactSin: string | undefined;
  let exactCos: string | undefined;
  let exactTan: string | undefined;

  if (normalizedDeg === 0) {
    exactSin = '0'; exactCos = '1'; exactTan = '0';
  } else if (normalizedDeg === 30) {
    exactSin = '1/2'; exactCos = '√3/2'; exactTan = '1/√3';
  } else if (normalizedDeg === 45) {
    exactSin = '√2/2'; exactCos = '√2/2'; exactTan = '1';
  } else if (normalizedDeg === 60) {
    exactSin = '√3/2'; exactCos = '1/2'; exactTan = '√3';
  } else if (normalizedDeg === 90) {
    exactSin = '1'; exactCos = '0'; exactTan = '∞';
  } else if (normalizedDeg === 180) {
    exactSin = '0'; exactCos = '-1'; exactTan = '0';
  } else if (normalizedDeg === 270) {
    exactSin = '-1'; exactCos = '0'; exactTan = '∞';
  }

  steps.push(`sin(${normalizedDeg}°) = ${roundedSin}${exactSin ? ` (Nilai Persis: ${exactSin})` : ''}`);
  steps.push(`cos(${normalizedDeg}°) = ${roundedCos}${exactCos ? ` (Nilai Persis: ${exactCos})` : ''}`);
  steps.push(`tan(${normalizedDeg}°) = ${tanVal}${exactTan ? ` (Nilai Persis: ${exactTan})` : ''}`);

  return {
    angleDegrees: deg,
    angleRadians: rad,
    sin: roundedSin,
    cos: roundedCos,
    tan: tanVal,
    csc: cscVal,
    sec: secVal,
    cot: cotVal,
    quadrant,
    exactSin,
    exactCos,
    exactTan,
    steps
  };
}

/**
 * Cosine Rule: c² = a² + b² - 2ab cos(C)
 */
export function calculateCosineRule(sideA: number, sideB: number, angleCDeg: number): TriangleRuleResult {
  const steps: string[] = [];
  const radC = degToRad(angleCDeg);

  steps.push(`Aturan Kosinus: c² = a² + b² - 2ab · cos(C)`);
  steps.push(`Substitusi: c² = ${sideA}² + ${sideB}² - 2(${sideA})(${sideB}) · cos(${angleCDeg}°)`);

  const cosC = Math.cos(radC);
  const cSq = sideA * sideA + sideB * sideB - 2 * sideA * sideB * cosC;
  const sideC = Math.sqrt(cSq);

  steps.push(`c² = ${sideA * sideA} + ${sideB * sideB} - ${2 * sideA * sideB * Number(cosC.toFixed(4))}`);
  steps.push(`c² = ${cSq.toFixed(4)} ⇒ c = √${cSq.toFixed(4)} = ${sideC.toFixed(4)}`);

  const area = 0.5 * sideA * sideB * Math.sin(radC);
  steps.push(`Luas Segitiga = ½ · a · b · sin(C) = ½ · ${sideA} · ${sideB} · sin(${angleCDeg}°) = ${area.toFixed(4)}`);

  return {
    sideA,
    sideB,
    sideC: Number(sideC.toFixed(4)),
    angleC: angleCDeg,
    area: Number(area.toFixed(4)),
    steps
  };
}
