export interface CalculationResult {
  expression: string;
  result: number | string;
  latex: string;
  error?: string;
}

export function evaluateMathExpression(expr: string): CalculationResult {
  try {
    if (!expr || expr.trim() === '') {
      return { expression: '', result: 0, latex: '' };
    }

    let sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/\be\b/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/abs\(/g, 'Math.abs(')
      .replace(/\^/g, '**');

    // Safe Function evaluation
    const res = Function(`"use strict"; return (${sanitized})`)();

    if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
      return {
        expression: expr,
        result: 'Tidak terdefinisi',
        latex: expr,
        error: 'Ekspresi matematika tidak valid atau terjadi pembagian dengan nol.'
      };
    }

    const formattedResult = Number.isInteger(res) ? `${res}` : res.toFixed(6).replace(/\.?0+$/, '');

    // Format expression to LaTeX
    let latex = expr
      .replace(/\*/g, ' \\times ')
      .replace(/\//g, ' \\div ')
      .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
      .replace(/(\w+)\^(\d+)/g, '$1^{$2}');

    return {
      expression: expr,
      result: formattedResult,
      latex
    };
  } catch (err) {
    return {
      expression: expr,
      result: 'Error',
      latex: expr,
      error: 'Format perhitungan salah. Periksa kembali tanda kurung atau operator.'
    };
  }
}
