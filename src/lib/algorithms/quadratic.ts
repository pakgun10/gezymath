export interface ComplexNumber {
  re: number;
  im: number;
  formatted: string;
}

export interface QuadraticResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  rootType: 'two-real' | 'one-real' | 'complex';
  x1: ComplexNumber;
  x2: ComplexNumber;
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
  extremumType: 'minimum' | 'maximum';
  extremumValue: number;
  yIntercept: number;
  steps: string[];
  latexEquation: string;
  graphPoints: { x: number; y: number }[];
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) {
    throw new Error('Koefisien "a" tidak boleh nol untuk persamaan kuadrat.');
  }

  const D = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = -D / (4 * a);
  const extremumType = a > 0 ? 'minimum' : 'maximum';

  let rootType: 'two-real' | 'one-real' | 'complex';
  let x1: ComplexNumber;
  let x2: ComplexNumber;
  const steps: string[] = [];

  const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
  const bStr = b > 0 ? `+ ${b === 1 ? '' : b}x` : b < 0 ? `- ${Math.abs(b) === 1 ? '' : Math.abs(b)}x` : '';
  const cStr = c > 0 ? `+ ${c}` : c < 0 ? `- ${Math.abs(c)}` : '';
  const latexEquation = `${aStr}x^2 ${bStr} ${cStr} = 0`.replace(/\s+/g, ' ');

  steps.push(`Persamaan: ${latexEquation}`);
  steps.push(`Koefisien: a = ${a}, b = ${b}, c = ${c}`);
  steps.push(`1. Hitung Diskriminan (D = b² - 4ac):`);
  steps.push(`   D = (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${D}`);

  if (D > 0) {
    rootType = 'two-real';
    const sqrtD = Math.sqrt(D);
    const r1 = (-b + sqrtD) / (2 * a);
    const r2 = (-b - sqrtD) / (2 * a);
    x1 = { re: r1, im: 0, formatted: Number.isInteger(r1) ? `${r1}` : r1.toFixed(4) };
    x2 = { re: r2, im: 0, formatted: Number.isInteger(r2) ? `${r2}` : r2.toFixed(4) };

    steps.push(`2. Karena D > 0, terdapat dua akar real berbeda:`);
    steps.push(`   x₁ = (-b + √D) / (2a) = (${-b} + √${D}) / (${2 * a}) = ${x1.formatted}`);
    steps.push(`   x₂ = (-b - √D) / (2a) = (${-b} - √${D}) / (${2 * a}) = ${x2.formatted}`);
  } else if (D === 0) {
    rootType = 'one-real';
    const r = -b / (2 * a);
    x1 = { re: r, im: 0, formatted: Number.isInteger(r) ? `${r}` : r.toFixed(4) };
    x2 = { re: r, im: 0, formatted: Number.isInteger(r) ? `${r}` : r.toFixed(4) };

    steps.push(`2. Karena D = 0, terdapat satu akar kembar:`);
    steps.push(`   x₁ = x₂ = -b / (2a) = ${-b} / ${2 * a} = ${x1.formatted}`);
  } else {
    rootType = 'complex';
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(Math.abs(D)) / (2 * a);

    const reStr = Number.isInteger(realPart) ? `${realPart}` : realPart.toFixed(4);
    const imStr = Number.isInteger(Math.abs(imagPart)) ? `${Math.abs(imagPart)}` : Math.abs(imagPart).toFixed(4);

    x1 = {
      re: realPart,
      im: Math.abs(imagPart),
      formatted: realPart === 0 ? `${imStr}i` : `${reStr} + ${imStr}i`
    };
    x2 = {
      re: realPart,
      im: -Math.abs(imagPart),
      formatted: realPart === 0 ? `-${imStr}i` : `${reStr} - ${imStr}i`
    };

    steps.push(`2. Karena D < 0, terdapat dua akar imajiner (kompleks):`);
    steps.push(`   x₁ = ${x1.formatted}`);
    steps.push(`   x₂ = ${x2.formatted}`);
  }

  steps.push(`3. Titik Puncak (Vertex):`);
  steps.push(`   x = -b / (2a) = ${vertexX.toFixed(2)}`);
  steps.push(`   y = -D / (4a) = ${vertexY.toFixed(2)}`);
  steps.push(`   Titik Puncak P(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`);

  // Generate 21 graph points centered around vertexX
  const graphPoints: { x: number; y: number }[] = [];
  const range = 5;
  const stepSize = range * 2 / 20;

  for (let i = 0; i <= 20; i++) {
    const xVal = (vertexX - range) + i * stepSize;
    const yVal = a * xVal * xVal + b * xVal + c;
    graphPoints.push({ x: Number(xVal.toFixed(3)), y: Number(yVal.toFixed(3)) });
  }

  return {
    a,
    b,
    c,
    discriminant: D,
    rootType,
    x1,
    x2,
    vertex: { x: Number(vertexX.toFixed(4)), y: Number(vertexY.toFixed(4)) },
    axisOfSymmetry: Number(vertexX.toFixed(4)),
    extremumType,
    extremumValue: Number(vertexY.toFixed(4)),
    yIntercept: c,
    steps,
    latexEquation,
    graphPoints
  };
}
