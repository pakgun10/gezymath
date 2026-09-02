export interface ShapeCalculationResult {
  shapeId: string;
  shapeName: string;
  category: '2D' | '3D';
  area?: number;
  perimeter?: number;
  volume?: number;
  surfaceArea?: number;
  formulas: { [key: string]: string };
  steps: string[];
}

export function calculateSquare(side: number): ShapeCalculationResult {
  const s = Math.abs(side);
  const area = s * s;
  const perimeter = 4 * s;

  return {
    shapeId: 'persegi',
    shapeName: 'Persegi (Square)',
    category: '2D',
    area,
    perimeter,
    formulas: {
      Luas: 'L = s \\times s = s^2',
      Keliling: 'K = 4 \\times s'
    },
    steps: [
      `Input Sisi (s) = ${s}`,
      `1. Hitung Luas: L = ${s} × ${s} = ${area}`,
      `2. Hitung Keliling: K = 4 × ${s} = ${perimeter}`
    ]
  };
}

export function calculateRectangle(length: number, width: number): ShapeCalculationResult {
  const p = Math.abs(length);
  const l = Math.abs(width);
  const area = p * l;
  const perimeter = 2 * (p + l);

  return {
    shapeId: 'persegi-panjang',
    shapeName: 'Persegi Panjang (Rectangle)',
    category: '2D',
    area,
    perimeter,
    formulas: {
      Luas: 'L = p \\times l',
      Keliling: 'K = 2 \\times (p + l)'
    },
    steps: [
      `Input Panjang (p) = ${p}, Lebar (l) = ${l}`,
      `1. Hitung Luas: L = ${p} × ${l} = ${area}`,
      `2. Hitung Keliling: K = 2 × (${p} + ${l}) = ${perimeter}`
    ]
  };
}

export function calculateTriangle(base: number, height: number, sideA?: number, sideC?: number): ShapeCalculationResult {
  const b = Math.abs(base);
  const h = Math.abs(height);
  const area = 0.5 * b * h;
  const a = sideA ?? Math.sqrt((b / 2) ** 2 + h ** 2);
  const c = sideC ?? a;
  const perimeter = a + b + c;

  return {
    shapeId: 'segitiga',
    shapeName: 'Segitiga (Triangle)',
    category: '2D',
    area,
    perimeter: Number(perimeter.toFixed(4)),
    formulas: {
      Luas: 'L = \\frac{1}{2} \\times a \\times t',
      Keliling: 'K = s_1 + s_2 + s_3'
    },
    steps: [
      `Input Alas (a) = ${b}, Tinggi (t) = ${h}`,
      `1. Hitung Luas: L = ½ × ${b} × ${h} = ${area}`,
      `2. Hitung Keliling: K = ${a.toFixed(2)} + ${b} + ${c.toFixed(2)} = ${perimeter.toFixed(2)}`
    ]
  };
}

export function calculateCircle(radius: number): ShapeCalculationResult {
  const r = Math.abs(radius);
  const area = Math.PI * r * r;
  const perimeter = 2 * Math.PI * r;

  return {
    shapeId: 'lingkaran',
    shapeName: 'Lingkaran (Circle)',
    category: '2D',
    area: Number(area.toFixed(4)),
    perimeter: Number(perimeter.toFixed(4)),
    formulas: {
      Luas: 'L = \\pi \\times r^2',
      Keliling: 'K = 2 \\times \\pi \\times r'
    },
    steps: [
      `Input Jari-jari (r) = ${r}`,
      `1. Hitung Luas: L = π × ${r}² = ${area.toFixed(4)}`,
      `2. Hitung Keliling: K = 2 × π × ${r} = ${perimeter.toFixed(4)}`
    ]
  };
}

export function calculateCube(side: number): ShapeCalculationResult {
  const s = Math.abs(side);
  const volume = s * s * s;
  const surfaceArea = 6 * s * s;

  return {
    shapeId: 'kubus',
    shapeName: 'Kubus (Cube)',
    category: '3D',
    volume,
    surfaceArea,
    formulas: {
      Volume: 'V = s^3',
      LuasPermukaan: 'L_p = 6 \\times s^2'
    },
    steps: [
      `Input Rusuk (s) = ${s}`,
      `1. Hitung Volume: V = ${s}³ = ${volume}`,
      `2. Hitung Luas Permukaan: Lp = 6 × ${s}² = ${surfaceArea}`
    ]
  };
}

export function calculateCuboid(length: number, width: number, height: number): ShapeCalculationResult {
  const p = Math.abs(length);
  const l = Math.abs(width);
  const t = Math.abs(height);
  const volume = p * l * t;
  const surfaceArea = 2 * (p * l + p * t + l * t);

  return {
    shapeId: 'balok',
    shapeName: 'Balok (Cuboid)',
    category: '3D',
    volume,
    surfaceArea,
    formulas: {
      Volume: 'V = p \\times l \\times t',
      LuasPermukaan: 'L_p = 2 \\times (p\\cdot l + p\\cdot t + l\\cdot t)'
    },
    steps: [
      `Input p = ${p}, l = ${l}, t = ${t}`,
      `1. Hitung Volume: V = ${p} × ${l} × ${t} = ${volume}`,
      `2. Hitung Luas Permukaan: Lp = 2 × (${p * l} + ${p * t} + ${l * t}) = ${surfaceArea}`
    ]
  };
}

export function calculateCylinder(radius: number, height: number): ShapeCalculationResult {
  const r = Math.abs(radius);
  const t = Math.abs(height);
  const volume = Math.PI * r * r * t;
  const surfaceArea = 2 * Math.PI * r * (r + t);

  return {
    shapeId: 'tabung',
    shapeName: 'Tabung (Cylinder)',
    category: '3D',
    volume: Number(volume.toFixed(4)),
    surfaceArea: Number(surfaceArea.toFixed(4)),
    formulas: {
      Volume: 'V = \\pi \\times r^2 \\times t',
      LuasPermukaan: 'L_p = 2 \\times \\pi \\times r \\times (r + t)'
    },
    steps: [
      `Input Jari-jari (r) = ${r}, Tinggi (t) = ${t}`,
      `1. Hitung Volume: V = π × ${r}² × ${t} = ${volume.toFixed(4)}`,
      `2. Hitung Luas Permukaan: Lp = 2 × π × ${r} × (${r} + ${t}) = ${surfaceArea.toFixed(4)}`
    ]
  };
}

export function calculateSphere(radius: number): ShapeCalculationResult {
  const r = Math.abs(radius);
  const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
  const surfaceArea = 4 * Math.PI * r * r;

  return {
    shapeId: 'bola',
    shapeName: 'Bola (Sphere)',
    category: '3D',
    volume: Number(volume.toFixed(4)),
    surfaceArea: Number(surfaceArea.toFixed(4)),
    formulas: {
      Volume: 'V = \\frac{4}{3} \\times \\pi \\times r^3',
      LuasPermukaan: 'L_p = 4 \\times \\pi \\times r^2'
    },
    steps: [
      `Input Jari-jari (r) = ${r}`,
      `1. Hitung Volume: V = (4/3) × π × ${r}³ = ${volume.toFixed(4)}`,
      `2. Hitung Luas Permukaan: Lp = 4 × π × ${r}² = ${surfaceArea.toFixed(4)}`
    ]
  };
}
