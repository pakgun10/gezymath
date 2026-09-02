export interface Point2D {
  x: number;
  y: number;
  label?: string;
}

export type ReflectionAxis = 'x-axis' | 'y-axis' | 'origin' | 'line-y=x' | 'line-y=-x' | 'line-x=h' | 'line-y=k';

export interface TransformationResult {
  type: 'translation' | 'reflection' | 'rotation' | 'dilation';
  originalPoints: Point2D[];
  transformedPoints: Point2D[];
  matrixRepresentation?: string;
  steps: string[];
}

export function translatePoints(points: Point2D[], dx: number, dy: number): TransformationResult {
  const transformedPoints: Point2D[] = points.map((p) => ({
    x: Number((p.x + dx).toFixed(4)),
    y: Number((p.y + dy).toFixed(4)),
    label: p.label ? `${p.label}'` : undefined
  }));

  const steps = [
    `Translasi T(${dx}, ${dy}):`,
    `Rumus: (x', y') = (x + dx, y + dy)`,
    ...points.map(
      (p, i) => `• ${p.label || `P${i + 1}`}(${p.x}, ${p.y}) → ${transformedPoints[i].label || `P${i + 1}'`}(${p.x} + ${dx}, ${p.y} + ${dy}) = (${transformedPoints[i].x}, ${transformedPoints[i].y})`
    )
  ];

  return {
    type: 'translation',
    originalPoints: points,
    transformedPoints,
    steps
  };
}

export function reflectPoints(points: Point2D[], axis: ReflectionAxis, hOrK: number = 0): TransformationResult {
  const transformedPoints: Point2D[] = points.map((p) => {
    let nx = p.x;
    let ny = p.y;

    switch (axis) {
      case 'x-axis':
        ny = -p.y;
        break;
      case 'y-axis':
        nx = -p.x;
        break;
      case 'origin':
        nx = -p.x;
        ny = -p.y;
        break;
      case 'line-y=x':
        nx = p.y;
        ny = p.x;
        break;
      case 'line-y=-x':
        nx = -p.y;
        ny = -p.x;
        break;
      case 'line-x=h':
        nx = 2 * hOrK - p.x;
        break;
      case 'line-y=k':
        ny = 2 * hOrK - p.y;
        break;
    }

    return {
      x: Number(nx.toFixed(4)),
      y: Number(ny.toFixed(4)),
      label: p.label ? `${p.label}'` : undefined
    };
  });

  const steps = [
    `Refleksi terhadap ${axis}${axis.includes('line-x=') ? ` (h=${hOrK})` : axis.includes('line-y=') ? ` (k=${hOrK})` : ''}:`,
    ...points.map(
      (p, i) => `• ${p.label || `P${i + 1}`}(${p.x}, ${p.y}) → ${transformedPoints[i].label || `P${i + 1}'`}(${transformedPoints[i].x}, ${transformedPoints[i].y})`
    )
  ];

  return {
    type: 'reflection',
    originalPoints: points,
    transformedPoints,
    steps
  };
}

export function rotatePoints(points: Point2D[], angleDegree: number, center: Point2D = { x: 0, y: 0 }): TransformationResult {
  const rad = (angleDegree * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const transformedPoints: Point2D[] = points.map((p) => {
    const dx = p.x - center.x;
    const dy = p.y - center.y;
    const nx = center.x + (dx * cos - dy * sin);
    const ny = center.y + (dx * sin + dy * cos);

    return {
      x: Number(nx.toFixed(4)),
      y: Number(ny.toFixed(4)),
      label: p.label ? `${p.label}'` : undefined
    };
  });

  const steps = [
    `Rotasi sebesar ${angleDegree}° terhadap titik pusat P(${center.x}, ${center.y}):`,
    `Rumus: x' = x₀ + (x - x₀)cosθ - (y - y₀)sinθ`,
    `       y' = y₀ + (x - x₀)sinθ + (y - y₀)cosθ`,
    ...points.map(
      (p, i) => `• ${p.label || `P${i + 1}`}(${p.x}, ${p.y}) → ${transformedPoints[i].label || `P${i + 1}'`}(${transformedPoints[i].x}, ${transformedPoints[i].y})`
    )
  ];

  return {
    type: 'rotation',
    originalPoints: points,
    transformedPoints,
    steps
  };
}

export function dilatePoints(points: Point2D[], scaleK: number, center: Point2D = { x: 0, y: 0 }): TransformationResult {
  const transformedPoints: Point2D[] = points.map((p) => {
    const nx = center.x + scaleK * (p.x - center.x);
    const ny = center.y + scaleK * (p.y - center.y);

    return {
      x: Number(nx.toFixed(4)),
      y: Number(ny.toFixed(4)),
      label: p.label ? `${p.label}'` : undefined
    };
  });

  const steps = [
    `Dilatasi dengan faktor skala k = ${scaleK} terhadap pusat P(${center.x}, ${center.y}):`,
    `Rumus: (x', y') = (x₀ + k(x - x₀), y₀ + k(y - y₀))`,
    ...points.map(
      (p, i) => `• ${p.label || `P${i + 1}`}(${p.x}, ${p.y}) → ${transformedPoints[i].label || `P${i + 1}'`}(${transformedPoints[i].x}, ${transformedPoints[i].y})`
    )
  ];

  return {
    type: 'dilation',
    originalPoints: points,
    transformedPoints,
    steps
  };
}
