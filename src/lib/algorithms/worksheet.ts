export interface WorksheetProblem {
  id: number;
  topic: string;
  questionText: string;
  questionLatex?: string;
  answerText: string;
  answerLatex?: string;
  solutionSteps: string[];
}

export interface WorksheetOptions {
  title: string;
  schoolName: string;
  teacherName: string;
  date: string;
  topic: string; // 'pythagoras' | 'fpb-kpk' | 'quadratic' | 'fraction' | 'trigonometry' | 'calculus' | 'random'
  level: 'SD' | 'SMP' | 'SMA';
  count: number;
  includeAnswers: boolean;
}

export function generateWorksheet(options: WorksheetOptions): WorksheetProblem[] {
  const problems: WorksheetProblem[] = [];
  const { topic, count } = options;

  for (let i = 1; i <= count; i++) {
    let currentTopic = topic;
    if (topic === 'random') {
      const availableTopics = ['pythagoras', 'fpb-kpk', 'quadratic', 'fraction', 'trigonometry', 'calculus'];
      currentTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
    }

    problems.push(generateSingleProblem(i, currentTopic));
  }

  return problems;
}

function generateSingleProblem(id: number, topic: string): WorksheetProblem {
  switch (topic) {
    case 'pythagoras': {
      // Pick a random Pythagorean triple multiplier
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25]
      ];
      const triple = triples[Math.floor(Math.random() * triples.length)];
      const mult = Math.floor(Math.random() * 3) + 1;
      const a = triple[0] * mult;
      const b = triple[1] * mult;
      const c = triple[2] * mult;

      const missingType = Math.floor(Math.random() * 2); // 0 for hypotenuse c, 1 for leg a
      if (missingType === 0) {
        return {
          id,
          topic: 'Tripel Pythagoras',
          questionText: `Pada segitiga siku-siku, jika panjang sisi alas a = ${a} cm dan sisi tegak b = ${b} cm, berapakah panjang sisi miring c?`,
          questionLatex: `a = ${a}, b = ${b} \\implies c = ?`,
          answerText: `${c} cm`,
          answerLatex: `c = ${c} \\text{ cm}`,
          solutionSteps: [
            `Gunakan Rumus Pythagoras: c = √(a² + b²)`,
            `c = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${c * c} = ${c} cm`
          ]
        };
      } else {
        return {
          id,
          topic: 'Tripel Pythagoras',
          questionText: `Pada segitiga siku-siku, jika panjang sisi miring c = ${c} cm dan sisi b = ${b} cm, berapakah panjang sisi alas a?`,
          questionLatex: `c = ${c}, b = ${b} \\implies a = ?`,
          answerText: `${a} cm`,
          answerLatex: `a = ${a} \\text{ cm}`,
          solutionSteps: [
            `Gunakan Rumus Pythagoras: a = √(c² - b²)`,
            `a = √(${c}² - ${b}²) = √(${c * c} - ${b * b}) = √${a * a} = ${a} cm`
          ]
        };
      }
    }

    case 'fpb-kpk': {
      const num1 = (Math.floor(Math.random() * 10) + 2) * 6;
      const num2 = (Math.floor(Math.random() * 10) + 2) * 4;

      function gcd(x: number, y: number): number {
        return y === 0 ? x : gcd(y, x % y);
      }
      const g = gcd(num1, num2);
      const l = (num1 * num2) / g;

      const isFPB = Math.random() > 0.5;
      if (isFPB) {
        return {
          id,
          topic: 'FPB & KPK',
          questionText: `Tentukan Faktor Persekutuan Terbesar (FPB) dari bilangan ${num1} dan ${num2}!`,
          questionLatex: `\\text{FPB}(${num1}, ${num2}) = ?`,
          answerText: `${g}`,
          answerLatex: `\\text{FPB} = ${g}`,
          solutionSteps: [
            `Faktorkan kedua bilangan ke dalam bentuk faktor prima.`,
            `Ambil faktor prima yang sama dengan pangkat terkecil: FPB = ${g}`
          ]
        };
      } else {
        return {
          id,
          topic: 'FPB & KPK',
          questionText: `Tentukan Kelipatan Persekutuan Terkecil (KPK) dari bilangan ${num1} dan ${num2}!`,
          questionLatex: `\\text{KPK}(${num1}, ${num2}) = ?`,
          answerText: `${l}`,
          answerLatex: `\\text{KPK} = ${l}`,
          solutionSteps: [
            `Faktorkan kedua bilangan ke dalam bentuk faktor prima.`,
            `Ambil semua faktor dengan pangkat terbesar: KPK = ${l}`
          ]
        };
      }
    }

    case 'quadratic': {
      const x1 = Math.floor(Math.random() * 10) - 5 || 2;
      const x2 = Math.floor(Math.random() * 10) - 5 || -3;
      const b = -(x1 + x2);
      const c = x1 * x2;
      const bStr = b > 0 ? `+ ${b}x` : b < 0 ? `- ${Math.abs(b)}x` : '';
      const cStr = c > 0 ? `+ ${c}` : c < 0 ? `- ${Math.abs(c)}` : '';

      return {
        id,
        topic: 'Persamaan Kuadrat',
        questionText: `Tentukan akar-akar penyelesaian dari persamaan kuadrat x² ${bStr} ${cStr} = 0!`,
        questionLatex: `x^2 ${bStr} ${cStr} = 0`,
        answerText: `x₁ = ${x1}, x₂ = ${x2}`,
        answerLatex: `x_1 = ${x1}, x_2 = ${x2}`,
        solutionSteps: [
          `Faktorkan persamaan: (x - ${x1})(x - ${x2}) = 0`,
          `Maka akar-akarnya adalah x₁ = ${x1} dan x₂ = ${x2}`
        ]
      };
    }

    case 'fraction': {
      const n1 = Math.floor(Math.random() * 5) + 1;
      const d1 = Math.floor(Math.random() * 5) + 2;
      const n2 = Math.floor(Math.random() * 5) + 1;
      const d2 = d1; // Same denominator for simplicity

      return {
        id,
        topic: 'Pecahan',
        questionText: `Hitunglah hasil penjumlahan pecahan: ${n1}/${d1} + ${n2}/${d2}!`,
        questionLatex: `\\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}} = ?`,
        answerText: `${n1 + n2}/${d1}`,
        answerLatex: `\\frac{${n1 + n2}}{${d1}}`,
        solutionSteps: [
          `Karena penyebut sudah sama (${d1}), jumlahkan pembilangnya: ${n1} + ${n2} = ${n1 + n2}`,
          `Hasil akhir: ${n1 + n2}/${d1}`
        ]
      };
    }

    case 'trigonometri': {
      const angles = [30, 45, 60, 90, 180];
      const ang = angles[Math.floor(Math.random() * angles.length)];
      const funcs = ['sin', 'cos', 'tan'];
      const fn = funcs[Math.floor(Math.random() * funcs.length)];

      let ans = '';
      if (fn === 'sin') {
        if (ang === 30) ans = '1/2';
        else if (ang === 45) ans = '1/2 √2';
        else if (ang === 60) ans = '1/2 √3';
        else if (ang === 90) ans = '1';
        else if (ang === 180) ans = '0';
      } else if (fn === 'cos') {
        if (ang === 30) ans = '1/2 √3';
        else if (ang === 45) ans = '1/2 √2';
        else if (ang === 60) ans = '1/2';
        else if (ang === 90) ans = '0';
        else if (ang === 180) ans = '-1';
      } else {
        if (ang === 30) ans = '1/3 √3';
        else if (ang === 45) ans = '1';
        else if (ang === 60) ans = '√3';
        else if (ang === 90) ans = 'Tidak terdefinisi';
        else if (ang === 180) ans = '0';
      }

      return {
        id,
        topic: 'Trigonometri',
        questionText: `Tentukan nilai dari ${fn}(${ang}°)!`,
        questionLatex: `\\${fn}(${ang}^\\circ) = ?`,
        answerText: ans,
        answerLatex: `\\${fn}(${ang}^\\circ) = ${ans}`,
        solutionSteps: [`Gunakan tabel sudut istimewa trigonometri: ${fn}(${ang}°) = ${ans}`]
      };
    }

    case 'calculus': {
      const n = Math.floor(Math.random() * 4) + 2;
      const a = Math.floor(Math.random() * 5) + 1;
      const derivCoef = a * n;
      const derivExp = n - 1;

      return {
        id,
        topic: 'Kalkulus (Turunan)',
        questionText: `Tentukan turunan pertama f'(x) dari fungsi f(x) = ${a}x^${n}!`,
        questionLatex: `f(x) = ${a}x^{${n}} \\implies f'(x) = ?`,
        answerText: `${derivCoef}x^${derivExp}`,
        answerLatex: `f'(x) = ${derivCoef}x^{${derivExp}}`,
        solutionSteps: [
          `Gunakan aturan pangkat turunan: d/dx (a · xⁿ) = a · n · xⁿ⁻¹`,
          `f'(x) = (${a} × ${n}) x^{${n}-1} = ${derivCoef}x^{${derivExp}}`
        ]
      };
    }

    default:
      return {
        id,
        topic: 'Matematika Dasar',
        questionText: `Hitunglah hasil dari 12 + 15!`,
        questionLatex: `12 + 15 = ?`,
        answerText: `27`,
        answerLatex: `27`,
        solutionSteps: [`12 + 15 = 27`]
      };
  }
}
