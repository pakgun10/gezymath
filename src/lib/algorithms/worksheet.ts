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
      const availableTopics = [
        'pythagoras', 'fpb-kpk', 'quadratic', 'fraction', 'trigonometry', 'calculus',
        'bilangan-bulat', 'pecahan-desimal', 'perbandingan', 'pangkat-akar',
        'aljabar-dasar', 'spldv', 'pola-barisan', 'fungsi-linear',
        'geometri-bidang', 'geometri-ruang', 'transformasi',
        'statistika', 'peluang', 'aritmetika-sosial',
        'notasi-ilmiah', 'bilangan-prima', 'bentuk-aljabar', 'deret',
        'koordinat', 'konversi-satuan', 'geometri-bidang-lanjut', 'geometri-ruang-lanjut',
        'peluang-lanjut', 'statistika-lanjut', 'aritmetika-lanjut',
        'relasi-domain', 'fungsi-nonlinear', 'sudut-garis', 'kesebangunan', 'komposisi-transformasi'
      ];
      currentTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
    }

    problems.push(generateSingleProblem(i, currentTopic));
  }

  return problems;
}

export function generateSingleProblem(id: number, topic: string): WorksheetProblem {
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

    case 'bilangan-bulat': {
      const ops = ['+', '-', '×', '÷'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      const a = Math.floor(Math.random() * 20) - 10 || 1;
      const b = op === '÷' ? ([-2,-1,1,2][Math.floor(Math.random()*4)]) : Math.floor(Math.random() * 20) - 10 || 1;
      let ans: number, latex: string;
      if (op === '+') { ans = a + b; latex = `${a} + (${b}) = ${ans}`; }
      else if (op === '-') { ans = a - b; latex = `${a} - (${b}) = ${ans}`; }
      else if (op === '×') { ans = a * b; latex = `${a} \\times (${b}) = ${ans}`; }
      else { ans = a / b; latex = `${a} \\div (${b}) = ${ans}`; }
      return { id, topic: 'Bilangan Bulat',
        questionText: `Hitunglah: ${a} ${op} (${b}) = ?`,
        questionLatex: `${a} ${op === '×' ? '\\times' : op === '÷' ? '\\div' : op} (${b}) = ?`,
        answerText: `${ans}`, answerLatex: latex,
        solutionSteps: [`${a} ${op} (${b}) = ${ans}`, op === '-' && b < 0 ? `Mengurangi bilangan negatif = menambah: ${a} + ${Math.abs(b)} = ${ans}` : `Hitung langsung sesuai aturan bilangan bulat`].filter(Boolean) as string[] };
    }

    case 'pecahan-desimal': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const n = Math.floor(Math.random() * 9) + 1;
        const d = [4,5,8,10,20,25,100][Math.floor(Math.random()*7)];
        const dec = (n/d).toFixed(d === 100 ? 2 : d === 8 ? 3 : 2);
        return { id, topic: 'Pecahan & Desimal',
          questionText: `Ubah pecahan ${n}/${d} ke bentuk desimal!`,
          questionLatex: `\\frac{${n}}{${d}} = \\ldots`,
          answerText: dec, answerLatex: `\\frac{${n}}{${d}} = ${dec}`,
          solutionSteps: [`${n} ÷ ${d} = ${dec}`] };
      } else if (type === 1) {
        const p = Math.floor(Math.random() * 90) + 10;
        return { id, topic: 'Pecahan & Desimal',
          questionText: `Ubah ${p}% ke bentuk pecahan paling sederhana!`,
          questionLatex: `${p}\\% = \\ldots`,
          answerText: `${p}/100`, answerLatex: `\\frac{${p}}{100}`,
          solutionSteps: [`${p}% = ${p}/100`, `Sederhanakan jika memungkinkan`] };
      } else {
        const d1 = parseFloat((Math.random()*5+0.1).toFixed(1));
        const d2 = parseFloat((Math.random()*5+0.1).toFixed(1));
        return { id, topic: 'Pecahan & Desimal',
          questionText: `Hitunglah ${d1} + ${d2}!`,
          questionLatex: `${d1} + ${d2} = ?`,
          answerText: `${(d1+d2).toFixed(1)}`, answerLatex: `${d1} + ${d2} = ${(d1+d2).toFixed(1)}`,
          solutionSteps: [`Samakan tempat desimal, lalu jumlahkan: ${d1} + ${d2} = ${(d1+d2).toFixed(1)}`] };
      }
    }

    case 'perbandingan': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const a = Math.floor(Math.random()*5)+2, b = Math.floor(Math.random()*5)+2;
        const total = (Math.floor(Math.random()*5)+3) * (a+b);
        const bagA = total * a / (a+b), bagB = total * b / (a+b);
        return { id, topic: 'Perbandingan',
          questionText: `Dua orang membagi uang Rp${total.toLocaleString()} dengan perbandingan ${a}:${b}. Berapa bagian masing-masing?`,
          questionLatex: `\\text{Total} = ${total},\\; ${a}:${b}`,
          answerText: `Rp${bagA.toLocaleString()} dan Rp${bagB.toLocaleString()}`,
          answerLatex: `\\frac{${a}}{${a+b}} \\times ${total} = ${bagA}`,
          solutionSteps: [`Total bagian: ${a}+${b} = ${a+b}`, `Orang 1: ${a}/${a+b} × ${total} = ${bagA}`, `Orang 2: ${b}/${a+b} × ${total} = ${bagB}`] };
      } else {
        const skala = [1000,2000,5000,10000,50000][Math.floor(Math.random()*5)];
        const jarakPeta = Math.floor(Math.random()*9)+2;
        const jarakSesungguhnya = jarakPeta * skala;
        return { id, topic: 'Perbandingan & Skala',
          questionText: `Peta memiliki skala 1:${skala.toLocaleString()}. Jika jarak di peta = ${jarakPeta} cm, berapa jarak sesungguhnya?`,
          questionLatex: `\\text{Skala } 1:${skala},\\; d_{peta}=${jarakPeta}\\text{ cm}`,
          answerText: `${jarakSesungguhnya.toLocaleString()} cm = ${(jarakSesungguhnya/100).toLocaleString()} m`,
          answerLatex: `${jarakPeta} \\times ${skala} = ${jarakSesungguhnya}\\text{ cm}`,
          solutionSteps: [`Jarak sesungguhnya = jarak peta × skala`, `= ${jarakPeta} × ${skala} = ${jarakSesungguhnya} cm = ${jarakSesungguhnya/100} m`] };
      }
    }

    case 'pangkat-akar': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const base = Math.floor(Math.random()*5)+2, exp = Math.floor(Math.random()*3)+2;
        const result = Math.pow(base, exp);
        return { id, topic: 'Bilangan Berpangkat',
          questionText: `Hitunglah nilai dari ${base}^${exp}!`,
          questionLatex: `${base}^{${exp}} = ?`,
          answerText: `${result}`,
          answerLatex: `${base}^{${exp}} = ${result}`,
          solutionSteps: [`${base}^${exp} = ${Array(exp).fill(base).join(' × ')} = ${result}`] };
      } else if (type === 1) {
        const perfects = [[4,2],[9,3],[16,4],[25,5],[36,6],[49,7],[64,8],[81,9],[100,10],[121,11],[144,12]];
        const [sq, rt] = perfects[Math.floor(Math.random()*perfects.length)];
        return { id, topic: 'Bentuk Akar',
          questionText: `Sederhanakan atau hitunglah nilai dari √${sq}!`,
          questionLatex: `\\sqrt{${sq}} = ?`,
          answerText: `${rt}`,
          answerLatex: `\\sqrt{${sq}} = ${rt}`,
          solutionSteps: [`${rt} × ${rt} = ${sq}`, `∴ √${sq} = ${rt}`] };
      } else {
        const a = Math.floor(Math.random()*4)+2, m = Math.floor(Math.random()*3)+1, n = m + Math.floor(Math.random()*2)+1;
        return { id, topic: 'Bilangan Berpangkat',
          questionText: `Sederhanakan: ${a}^${m} × ${a}^${n} = ?`,
          questionLatex: `${a}^{${m}} \\times ${a}^{${n}} = ?`,
          answerText: `${a}^${m+n} = ${Math.pow(a,m+n)}`,
          answerLatex: `${a}^{${m+n}} = ${Math.pow(a,m+n)}`,
          solutionSteps: [`Sifat: a^m × a^n = a^(m+n)`, `${a}^${m} × ${a}^${n} = ${a}^${m+n} = ${Math.pow(a,m+n)}`] };
      }
    }

    case 'aljabar-dasar': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const a = Math.floor(Math.random()*8)+2, b = Math.floor(Math.random()*20)+5;
        const ans = Math.floor(Math.random()*10)+1;
        const c = a * ans + b;
        return { id, topic: 'Aljabar (PLSV)',
          questionText: `Tentukan nilai x dari: ${a}x + ${b} = ${c}!`,
          questionLatex: `${a}x + ${b} = ${c}`,
          answerText: `x = ${ans}`,
          answerLatex: `x = ${ans}`,
          solutionSteps: [`${a}x = ${c} - ${b} = ${c-b}`, `x = ${c-b} ÷ ${a} = ${ans}`] };
      } else {
        const a = Math.floor(Math.random()*5)+2, b = Math.floor(Math.random()*10)+1;
        const ans = Math.floor(Math.random()*8)+2;
        const c = a * ans - b;
        return { id, topic: 'Pertidaksamaan (PtLSV)',
          questionText: `Tentukan nilai x dari: ${a}x - ${b} > ${c}!`,
          questionLatex: `${a}x - ${b} > ${c}`,
          answerText: `x > ${ans}`,
          answerLatex: `x > ${ans}`,
          solutionSteps: [`${a}x > ${c} + ${b} = ${c+b}`, `x > ${c+b} ÷ ${a} = ${ans}`] };
      }
    }

    case 'spldv': {
      const x = Math.floor(Math.random()*8)+1, y = Math.floor(Math.random()*8)+1;
      const a1 = Math.floor(Math.random()*4)+1, b1 = Math.floor(Math.random()*4)+1;
      const a2 = Math.floor(Math.random()*4)+1, b2 = Math.floor(Math.random()*4)+1;
      const c1 = a1*x + b1*y, c2 = a2*x + b2*y;
      return { id, topic: 'SPLDV',
        questionText: `Selesaikan sistem persamaan: ${a1}x + ${b1}y = ${c1} dan ${a2}x + ${b2}y = ${c2}!`,
        questionLatex: `\\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x + ${b2}y = ${c2} \\end{cases}`,
        answerText: `x = ${x}, y = ${y}`,
        answerLatex: `x = ${x},\\; y = ${y}`,
        solutionSteps: [
          `Dari pers. 1: ${a1}x + ${b1}y = ${c1}`,
          `Eliminasi salah satu variabel, substitusi ke persamaan lain`,
          `Diperoleh: x = ${x} dan y = ${y}`,
          `Cek: ${a1}(${x}) + ${b1}(${y}) = ${c1} ✓`
        ] };
    }

    case 'pola-barisan': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const a = Math.floor(Math.random()*10)+1, d = Math.floor(Math.random()*8)+1;
        const n = Math.floor(Math.random()*8)+5;
        const un = a + (n-1)*d;
        return { id, topic: 'Barisan Aritmetika',
          questionText: `Barisan aritmetika dengan suku pertama a = ${a} dan beda d = ${d}. Tentukan suku ke-${n}!`,
          questionLatex: `a = ${a},\\; d = ${d} \\implies U_{${n}} = ?`,
          answerText: `U_${n} = ${un}`,
          answerLatex: `U_{${n}} = ${un}`,
          solutionSteps: [`Rumus: U_n = a + (n-1)d`, `U_${n} = ${a} + (${n}-1) × ${d} = ${a} + ${(n-1)*d} = ${un}`] };
      } else {
        const a = Math.floor(Math.random()*5)+1, r = Math.floor(Math.random()*3)+2;
        const n = Math.floor(Math.random()*4)+3;
        const un = a * Math.pow(r, n-1);
        return { id, topic: 'Barisan Geometri',
          questionText: `Barisan geometri dengan suku pertama a = ${a} dan rasio r = ${r}. Tentukan suku ke-${n}!`,
          questionLatex: `a = ${a},\\; r = ${r} \\implies U_{${n}} = ?`,
          answerText: `U_${n} = ${un}`,
          answerLatex: `U_{${n}} = ${un}`,
          solutionSteps: [`Rumus: U_n = a × r^(n-1)`, `U_${n} = ${a} × ${r}^${n-1} = ${a} × ${Math.pow(r,n-1)} = ${un}`] };
      }
    }

    case 'fungsi-linear': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const m = Math.floor(Math.random()*6)-3 || 1, c = Math.floor(Math.random()*10)-5;
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return { id, topic: 'Fungsi Linear',
          questionText: `Tentukan gradien garis y = ${m}x ${cStr}!`,
          questionLatex: `y = ${m}x ${cStr}`,
          answerText: `m = ${m}`,
          answerLatex: `m = ${m}`,
          solutionSteps: [`Bentuk y = mx + c, gradien adalah koefisien x`, `m = ${m}`] };
      } else if (type === 1) {
        const m = Math.floor(Math.random()*4)+1, x1 = Math.floor(Math.random()*5)+1, y1 = Math.floor(Math.random()*5)+1;
        const c = y1 - m*x1;
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return { id, topic: 'Persamaan Garis Lurus',
          questionText: `Tentukan persamaan garis dengan gradien m = ${m} melalui titik (${x1}, ${y1})!`,
          questionLatex: `m = ${m},\\; (${x1}, ${y1})`,
          answerText: `y = ${m}x ${cStr}`,
          answerLatex: `y = ${m}x ${cStr}`,
          solutionSteps: [`y - y₁ = m(x - x₁)`, `y - ${y1} = ${m}(x - ${x1})`, `y = ${m}x ${cStr}`] };
      } else {
        const x1 = Math.floor(Math.random()*6)+1, y1 = Math.floor(Math.random()*6)+1;
        const x2 = x1 + Math.floor(Math.random()*4)+1, y2 = y1 + Math.floor(Math.random()*8)+1;
        const m = (y2-y1)/(x2-x1);
        return { id, topic: 'Gradien',
          questionText: `Tentukan gradien garis yang melalui titik (${x1}, ${y1}) dan (${x2}, ${y2})!`,
          questionLatex: `m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2}-${y1}}{${x2}-${x1}}`,
          answerText: `m = ${m}`,
          answerLatex: `m = ${m}`,
          solutionSteps: [`m = (y₂ - y₁) / (x₂ - x₁) = (${y2} - ${y1}) / (${x2} - ${x1}) = ${y2-y1}/${x2-x1} = ${m}`] };
      }
    }

    case 'geometri-bidang': {
      const shapes = ['segitiga', 'persegi', 'persegi-panjang', 'lingkaran', 'trapesium'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const calcType = Math.random() > 0.5 ? 'luas' : 'keliling';
      if (shape === 'segitiga') {
        const alas = Math.floor(Math.random()*15)+4, tinggi = Math.floor(Math.random()*12)+4;
        const sisi = [alas, tinggi + 1, Math.floor(Math.random()*8)+8];
        if (calcType === 'luas') {
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah luas segitiga dengan alas ${alas} cm dan tinggi ${tinggi} cm!`,
            questionLatex: `L = \\frac{1}{2} \\times ${alas} \\times ${tinggi}`,
            answerText: `${(alas*tinggi)/2} cm²`,
            answerLatex: `L = ${(alas*tinggi)/2} \\text{ cm}^2`,
            solutionSteps: [`L = ½ × alas × tinggi`, `L = ½ × ${alas} × ${tinggi} = ${(alas*tinggi)/2} cm²`] };
        } else {
          const kel = sisi[0] + sisi[1] + sisi[2];
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah keliling segitiga dengan sisi ${sisi[0]} cm, ${sisi[1]} cm, dan ${sisi[2]} cm!`,
            questionLatex: `K = ${sisi[0]} + ${sisi[1]} + ${sisi[2]}`,
            answerText: `${kel} cm`,
            answerLatex: `K = ${kel} \\text{ cm}`,
            solutionSteps: [`K = a + b + c = ${sisi[0]} + ${sisi[1]} + ${sisi[2]} = ${kel} cm`] };
        }
      } else if (shape === 'lingkaran') {
        const r = Math.floor(Math.random()*10)+3;
        if (calcType === 'luas') {
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah luas lingkaran dengan jari-jari r = ${r} cm! (π = 3,14)`,
            questionLatex: `L = \\pi r^2 = 3{,}14 \\times ${r}^2`,
            answerText: `${(3.14*r*r).toFixed(2)} cm²`,
            answerLatex: `L = ${(3.14*r*r).toFixed(2)} \\text{ cm}^2`,
            solutionSteps: [`L = πr² = 3,14 × ${r}² = 3,14 × ${r*r} = ${(3.14*r*r).toFixed(2)} cm²`] };
        } else {
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah keliling lingkaran dengan jari-jari r = ${r} cm! (π = 3,14)`,
            questionLatex: `K = 2\\pi r = 2 \\times 3{,}14 \\times ${r}`,
            answerText: `${(2*3.14*r).toFixed(2)} cm`,
            answerLatex: `K = ${(2*3.14*r).toFixed(2)} \\text{ cm}`,
            solutionSteps: [`K = 2πr = 2 × 3,14 × ${r} = ${(2*3.14*r).toFixed(2)} cm`] };
        }
      } else {
        const p = Math.floor(Math.random()*15)+5, l = Math.floor(Math.random()*10)+3;
        if (calcType === 'luas') {
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah luas persegi panjang dengan panjang ${p} cm dan lebar ${l} cm!`,
            questionLatex: `L = ${p} \\times ${l}`,
            answerText: `${p*l} cm²`,
            answerLatex: `L = ${p*l} \\text{ cm}^2`,
            solutionSteps: [`L = p × l = ${p} × ${l} = ${p*l} cm²`] };
        } else {
          return { id, topic: 'Geometri Bidang',
            questionText: `Hitunglah keliling persegi panjang dengan panjang ${p} cm dan lebar ${l} cm!`,
            questionLatex: `K = 2(${p} + ${l})`,
            answerText: `${2*(p+l)} cm`,
            answerLatex: `K = ${2*(p+l)} \\text{ cm}`,
            solutionSteps: [`K = 2(p + l) = 2(${p} + ${l}) = 2 × ${p+l} = ${2*(p+l)} cm`] };
        }
      }
    }

    case 'geometri-ruang': {
      const shapes = ['kubus', 'balok', 'tabung', 'kerucut', 'bola'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const calcType = Math.random() > 0.5 ? 'volume' : 'luas';
      if (shape === 'kubus') {
        const s = Math.floor(Math.random()*10)+3;
        if (calcType === 'volume') {
          return { id, topic: 'Geometri Ruang',
            questionText: `Hitunglah volume kubus dengan panjang rusuk s = ${s} cm!`,
            questionLatex: `V = s^3 = ${s}^3`,
            answerText: `${s**3} cm³`,
            answerLatex: `V = ${s**3} \\text{ cm}^3`,
            solutionSteps: [`V = s³ = ${s}³ = ${s**3} cm³`] };
        } else {
          return { id, topic: 'Geometri Ruang',
            questionText: `Hitunglah luas permukaan kubus dengan panjang rusuk s = ${s} cm!`,
            questionLatex: `L = 6s^2 = 6 \\times ${s}^2`,
            answerText: `${6*s*s} cm²`,
            answerLatex: `L = ${6*s*s} \\text{ cm}^2`,
            solutionSteps: [`L = 6s² = 6 × ${s}² = 6 × ${s*s} = ${6*s*s} cm²`] };
        }
      } else if (shape === 'balok') {
        const p = Math.floor(Math.random()*10)+5, l = Math.floor(Math.random()*6)+3, t = Math.floor(Math.random()*6)+2;
        if (calcType === 'volume') {
          return { id, topic: 'Geometri Ruang',
            questionText: `Hitunglah volume balok dengan p = ${p} cm, l = ${l} cm, t = ${t} cm!`,
            questionLatex: `V = ${p} \\times ${l} \\times ${t}`,
            answerText: `${p*l*t} cm³`,
            answerLatex: `V = ${p*l*t} \\text{ cm}^3`,
            solutionSteps: [`V = p × l × t = ${p} × ${l} × ${t} = ${p*l*t} cm³`] };
        } else {
          const lp = 2*(p*l + p*t + l*t);
          return { id, topic: 'Geometri Ruang',
            questionText: `Hitunglah luas permukaan balok dengan p = ${p} cm, l = ${l} cm, t = ${t} cm!`,
            questionLatex: `L = 2(pl + pt + lt)`,
            answerText: `${lp} cm²`,
            answerLatex: `L = ${lp} \\text{ cm}^2`,
            solutionSteps: [`L = 2(pl + pt + lt) = 2(${p*l} + ${p*t} + ${l*t}) = 2 × ${p*l+p*t+l*t} = ${lp} cm²`] };
        }
      } else {
        const r = Math.floor(Math.random()*7)+3, t = Math.floor(Math.random()*10)+5;
        const vol = parseFloat((3.14*r*r*t).toFixed(2));
        return { id, topic: 'Geometri Ruang',
          questionText: `Hitunglah volume tabung dengan jari-jari r = ${r} cm dan tinggi t = ${t} cm! (π = 3,14)`,
          questionLatex: `V = \\pi r^2 t = 3{,}14 \\times ${r}^2 \\times ${t}`,
          answerText: `${vol} cm³`,
          answerLatex: `V = ${vol} \\text{ cm}^3`,
          solutionSteps: [`V = πr²t = 3,14 × ${r}² × ${t} = 3,14 × ${r*r} × ${t} = ${vol} cm³`] };
      }
    }

    case 'transformasi': {
      const types = ['translasi', 'refleksi', 'rotasi', 'dilatasi'];
      const type = types[Math.floor(Math.random() * types.length)];
      const px = Math.floor(Math.random()*8)-4, py = Math.floor(Math.random()*8)-4;
      if (type === 'translasi') {
        const tx = Math.floor(Math.random()*6)-3, ty = Math.floor(Math.random()*6)-3;
        return { id, topic: 'Translasi',
          questionText: `Titik P(${px}, ${py}) ditranslasikan dengan vektor (${tx}, ${ty}). Tentukan koordinat hasil translasi!`,
          questionLatex: `P(${px}, ${py}) \\xrightarrow{T(${tx},${ty})} P'(?, ?)`,
          answerText: `P'(${px+tx}, ${py+ty})`,
          answerLatex: `P'(${px+tx}, ${py+ty})`,
          solutionSteps: [`P'(x + a, y + b) = P'(${px} + ${tx}, ${py} + ${ty})`, `P' = (${px+tx}, ${py+ty})`] };
      } else if (type === 'refleksi') {
        const axes = ['sumbu X', 'sumbu Y', 'garis y = x'];
        const axis = axes[Math.floor(Math.random() * axes.length)];
        let result = '';
        if (axis === 'sumbu X') result = `(${px}, ${-py})`;
        else if (axis === 'sumbu Y') result = `(${-px}, ${py})`;
        else result = `(${py}, ${px})`;
        return { id, topic: 'Refleksi',
          questionText: `Tentukan bayangan titik P(${px}, ${py}) jika dicerminkan terhadap ${axis}!`,
          questionLatex: `P(${px}, ${py}) \\to P'(?, ?)`,
          answerText: `P'${result}`,
          answerLatex: `P'${result}`,
          solutionSteps: [
            axis === 'sumbu X' ? `Refleksi thd sumbu X: (x, y) → (x, -y)` :
            axis === 'sumbu Y' ? `Refleksi thd sumbu Y: (x, y) → (-x, y)` :
            `Refleksi thd y = x: (x, y) → (y, x)`,
            `P'${result}`
          ] };
      } else if (type === 'rotasi') {
        const angles = [90, 180, 270];
        const ang = angles[Math.floor(Math.random() * angles.length)];
        let result = '';
        if (ang === 90) result = `(${-py}, ${px})`;
        else if (ang === 180) result = `(${-px}, ${-py})`;
        else result = `(${py}, ${-px})`;
        return { id, topic: 'Rotasi',
          questionText: `Titik P(${px}, ${py}) dirotasi ${ang}° berlawanan arah jarum jam terhadap O(0,0). Tentukan bayangan P!`,
          questionLatex: `R_{${ang}^\\circ}(${px}, ${py}) = ?`,
          answerText: `P'${result}`,
          answerLatex: `P'${result}`,
          solutionSteps: [`Rotasi ${ang}°: (x, y) → ${ang === 90 ? '(-y, x)' : ang === 180 ? '(-x, -y)' : '(y, -x)'}`, `P' = ${result}`] };
      } else {
        const k = [2, 3, 4][Math.floor(Math.random() * 3)];
        return { id, topic: 'Dilatasi',
          questionText: `Titik P(${px}, ${py}) didilatasi dengan faktor skala k = ${k} terhadap pusat O(0,0). Tentukan bayangan P!`,
          questionLatex: `D_{k=${k}}(${px}, ${py}) = ?`,
          answerText: `P'(${px*k}, ${py*k})`,
          answerLatex: `P'(${px*k}, ${py*k})`,
          solutionSteps: [`Dilatasi: (x, y) → (kx, ky)`, `P' = (${k} × ${px}, ${k} × ${py}) = (${px*k}, ${py*k})`] };
      }
    }

    case 'statistika': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const n = Math.floor(Math.random() * 4) + 5;
        const data = Array.from({ length: n }, () => Math.floor(Math.random() * 20) + 1).sort((a, b) => a - b);
        const mean = (data.reduce((s, v) => s + v, 0) / n).toFixed(1);
        return {
          id, topic: 'Statistika (Mean)',
          questionText: `Hitunglah rata-rata (mean) dari data berikut: ${data.join(', ')}!`,
          questionLatex: `\\bar{x} = \\frac{${data.join('+')}}{${n}}`,
          answerText: `Mean = ${mean}`,
          answerLatex: `\\bar{x} = ${mean}`,
          solutionSteps: [`Jumlah semua data: ${data.reduce((s, v) => s + v, 0)}`, `Mean = ${data.reduce((s, v) => s + v, 0)} ÷ ${n} = ${mean}`]
        };
      } else if (type === 1) {
        const data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 15) + 1).sort((a, b) => a - b);
        const median = data[3];
        return {
          id, topic: 'Statistika (Median)',
          questionText: `Tentukan median dari data: ${data.join(', ')}!`,
          questionLatex: `\\text{Data: } ${data.join(', ')}`,
          answerText: `Median = ${median}`,
          answerLatex: `\\text{Median} = ${median}`,
          solutionSteps: [`Data sudah urut: ${data.join(', ')}`, `Jumlah data = 7 (ganjil), median = data ke-4 = ${median}`]
        };
      } else {
        const base = [3, 5, 7, 8, 10];
        const modus = base[Math.floor(Math.random() * base.length)];
        const data = [modus, modus, modus, ...Array.from({ length: 4 }, () => { let v = Math.floor(Math.random() * 12) + 1; return v === modus ? v + 1 : v; })].sort((a, b) => a - b);
        return {
          id, topic: 'Statistika (Modus)',
          questionText: `Tentukan modus dari data: ${data.join(', ')}!`,
          questionLatex: `\\text{Data: } ${data.join(', ')}`,
          answerText: `Modus = ${modus}`,
          answerLatex: `\\text{Modus} = ${modus}`,
          solutionSteps: [`Hitung frekuensi tiap nilai`, `Nilai ${modus} muncul paling sering (3 kali)`, `Modus = ${modus}`]
        };
      }
    }

    case 'peluang': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const total = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
        const event = Math.floor(Math.random() * (total / 2)) + 1;
        return {
          id, topic: 'Peluang',
          questionText: `Sebuah kantong berisi ${total} bola bernomor 1 sampai ${total}. Jika diambil 1 bola secara acak, berapa peluang terambilnya bola bernomor ≤ ${event}?`,
          questionLatex: `P(X \\leq ${event}) = \\frac{${event}}{${total}}`,
          answerText: `P = ${event}/${total}`,
          answerLatex: `P = \\frac{${event}}{${total}}`,
          solutionSteps: [`Ruang sampel: S = {1, 2, ..., ${total}}, n(S) = ${total}`, `Kejadian A = bola ≤ ${event}: n(A) = ${event}`, `P(A) = ${event}/${total}`]
        };
      } else if (type === 1) {
        const merah = Math.floor(Math.random() * 5) + 2;
        const biru = Math.floor(Math.random() * 5) + 2;
        const total = merah + biru;
        return {
          id, topic: 'Peluang',
          questionText: `Dalam kotak terdapat ${merah} kelereng merah dan ${biru} kelereng biru. Berapa peluang terambil kelereng merah?`,
          questionLatex: `P(\\text{merah}) = \\frac{${merah}}{${total}}`,
          answerText: `P = ${merah}/${total}`,
          answerLatex: `P = \\frac{${merah}}{${total}}`,
          solutionSteps: [`Total kelereng: ${merah} + ${biru} = ${total}`, `P(merah) = ${merah}/${total}`]
        };
      } else {
        const n = [20, 30, 40, 50][Math.floor(Math.random() * 4)];
        const p = [1, 2, 3][Math.floor(Math.random() * 3)];
        const q = [4, 5, 6][Math.floor(Math.random() * 3)];
        const fh = parseFloat((n * p / q).toFixed(1));
        return {
          id, topic: 'Frekuensi Harapan',
          questionText: `Sebuah dadu dilempar ${n} kali. Berapa frekuensi harapan munculnya mata dadu ${p}?`,
          questionLatex: `f_h = n \\times P = ${n} \\times \\frac{1}{6}`,
          answerText: `f_h = ${(n / 6).toFixed(1)} kali`,
          answerLatex: `f_h = ${(n / 6).toFixed(1)}`,
          solutionSteps: [`P(mata ${p}) = 1/6`, `f_h = n × P = ${n} × 1/6 = ${(n / 6).toFixed(1)} kali`]
        };
      }
    }

    case 'aritmetika-sosial': {
      const type = Math.floor(Math.random() * 4);
      if (type === 0) {
        const hb = (Math.floor(Math.random() * 15) + 5) * 1000;
        const untungPct = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
        const hj = hb + (hb * untungPct / 100);
        return {
          id, topic: 'Aritmetika Sosial',
          questionText: `Seorang pedagang membeli barang seharga Rp${hb.toLocaleString('id-ID')} dan dijual dengan keuntungan ${untungPct}%. Berapakah harga jualnya?`,
          questionLatex: `\\text{HJ} = \\text{HB} + \\text{Untung} = ${hb} + ${untungPct}\\%`,
          answerText: `Rp${hj.toLocaleString('id-ID')}`,
          answerLatex: `\\text{HJ} = Rp${hj.toLocaleString('id-ID')}`,
          solutionSteps: [`Untung = ${untungPct}% × ${hb.toLocaleString('id-ID')} = Rp${(hb * untungPct / 100).toLocaleString('id-ID')}`, `HJ = ${hb.toLocaleString('id-ID')} + ${(hb * untungPct / 100).toLocaleString('id-ID')} = Rp${hj.toLocaleString('id-ID')}`]
        };
      } else if (type === 1) {
        const harga = (Math.floor(Math.random() * 20) + 10) * 10000;
        const diskon = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
        const bayar = harga - (harga * diskon / 100);
        return {
          id, topic: 'Diskon',
          questionText: `Harga baju Rp${harga.toLocaleString('id-ID')} mendapat diskon ${diskon}%. Berapa harga yang harus dibayar?`,
          questionLatex: `\\text{Bayar} = ${harga} \\times (1 - ${diskon}\\%)`,
          answerText: `Rp${bayar.toLocaleString('id-ID')}`,
          answerLatex: `\\text{Bayar} = Rp${bayar.toLocaleString('id-ID')}`,
          solutionSteps: [`Diskon = ${diskon}% × Rp${harga.toLocaleString('id-ID')} = Rp${(harga * diskon / 100).toLocaleString('id-ID')}`, `Bayar = Rp${harga.toLocaleString('id-ID')} - Rp${(harga * diskon / 100).toLocaleString('id-ID')} = Rp${bayar.toLocaleString('id-ID')}`]
        };
      } else if (type === 2) {
        const modal = (Math.floor(Math.random() * 10) + 5) * 1000000;
        const bunga = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
        const waktu = Math.floor(Math.random() * 3) + 1;
        const totalBunga = modal * bunga / 100 * waktu;
        return {
          id, topic: 'Bunga Tunggal',
          questionText: `Modal Rp${modal.toLocaleString('id-ID')} ditabung dengan bunga tunggal ${bunga}%/tahun selama ${waktu} tahun. Hitung total bunga!`,
          questionLatex: `I = M \\times r \\times t = ${(modal/1000000).toFixed(0)}jt \\times ${bunga}\\% \\times ${waktu}`,
          answerText: `Rp${totalBunga.toLocaleString('id-ID')}`,
          answerLatex: `I = Rp${totalBunga.toLocaleString('id-ID')}`,
          solutionSteps: [`I = Modal × Bunga × Waktu`, `I = Rp${modal.toLocaleString('id-ID')} × ${bunga}/100 × ${waktu} = Rp${totalBunga.toLocaleString('id-ID')}`]
        };
      } else {
        const kecepatan = [40, 50, 60, 80, 100][Math.floor(Math.random() * 5)];
        const waktu = Math.floor(Math.random() * 4) + 1;
        const jarak = kecepatan * waktu;
        return {
          id, topic: 'Kecepatan, Jarak & Waktu',
          questionText: `Sebuah mobil melaju dengan kecepatan ${kecepatan} km/jam selama ${waktu} jam. Berapa jarak yang ditempuh?`,
          questionLatex: `s = v \\times t = ${kecepatan} \\times ${waktu}`,
          answerText: `${jarak} km`,
          answerLatex: `s = ${jarak} \\text{ km}`,
          solutionSteps: [`s = v × t`, `s = ${kecepatan} × ${waktu} = ${jarak} km`]
        };
      }
    }

    case 'notasi-ilmiah': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const mantissa = parseFloat((Math.random() * 9 + 1).toFixed(2));
        const exp = Math.floor(Math.random() * 8) + 2;
        const full = mantissa * Math.pow(10, exp);
        return {
          id, topic: 'Notasi Ilmiah',
          questionText: `Nyatakan ${full.toLocaleString('id-ID')} dalam notasi ilmiah!`,
          questionLatex: `${full.toLocaleString('id-ID')} = a \\times 10^n`,
          answerText: `${mantissa} × 10^${exp}`,
          answerLatex: `${mantissa} \\times 10^{${exp}}`,
          solutionSteps: [`Geser titik desimal hingga 1 ≤ a < 10`, `${full.toLocaleString('id-ID')} = ${mantissa} × 10^${exp}`]
        };
      } else {
        const mantissa = parseFloat((Math.random() * 9 + 1).toFixed(2));
        const exp = Math.floor(Math.random() * 5) + 1;
        const result = parseFloat((mantissa * Math.pow(10, -exp)).toFixed(exp + 2));
        return {
          id, topic: 'Notasi Ilmiah',
          questionText: `Ubah ${mantissa} × 10^-${exp} ke bentuk desimal biasa!`,
          questionLatex: `${mantissa} \\times 10^{-${exp}} = ?`,
          answerText: `${result}`,
          answerLatex: `${result}`,
          solutionSteps: [`Geser titik desimal ke kiri sebanyak ${exp} digit`, `= ${result}`]
        };
      }
    }

    case 'bilangan-prima': {
      const type = Math.floor(Math.random() * 2);
      const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
      if (type === 0) {
        const n = Math.floor(Math.random() * 40) + 10;
        const isPrime = primes.includes(n);
        return {
          id, topic: 'Bilangan Prima',
          questionText: `Apakah ${n} merupakan bilangan prima? Berikan alasannya!`,
          questionLatex: `${n} \\text{ prima?}`,
          answerText: isPrime ? `Ya, ${n} adalah bilangan prima` : `Tidak, ${n} bukan bilangan prima`,
          answerLatex: isPrime ? `\\text{Prima} \\checkmark` : `\\text{Bukan prima} \\times`,
          solutionSteps: isPrime
            ? [`${n} hanya habis dibagi 1 dan ${n} sendiri`, `∴ ${n} adalah bilangan prima`]
            : [`Cek faktor: ${n} habis dibagi oleh bilangan selain 1 dan ${n}`, `∴ ${n} bukan bilangan prima`]
        };
      } else {
        const count = Math.floor(Math.random() * 3) + 3;
        const selected = primes.slice(0, count + 3).filter(p => p <= 30);
        return {
          id, topic: 'Bilangan Prima',
          questionText: `Sebutkan semua bilangan prima antara 1 dan 30!`,
          questionLatex: `P = \\{p \\mid 1 < p \\leq 30, p \\text{ prima}\\}`,
          answerText: `2, 3, 5, 7, 11, 13, 17, 19, 23, 29`,
          answerLatex: `P = \\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\\}`,
          solutionSteps: [`Gunakan saringan Eratosthenes`, `Bilangan prima ≤ 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29`]
        };
      }
    }

    case 'bentuk-aljabar': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const a = Math.floor(Math.random()*5)+2, b = Math.floor(Math.random()*4)+1;
        const c = Math.floor(Math.random()*5)+2, d = Math.floor(Math.random()*4)+1;
        const koefX = a + c, koefY = b + d;
        return {
          id, topic: 'Bentuk Aljabar',
          questionText: `Sederhanakan: (${a}x + ${b}y) + (${c}x + ${d}y)!`,
          questionLatex: `(${a}x + ${b}y) + (${c}x + ${d}y)`,
          answerText: `${koefX}x + ${koefY}y`,
          answerLatex: `${koefX}x + ${koefY}y`,
          solutionSteps: [`Kelompokkan suku sejenis`, `(${a}+${c})x + (${b}+${d})y = ${koefX}x + ${koefY}y`]
        };
      } else if (type === 1) {
        const a = Math.floor(Math.random()*4)+2, b = Math.floor(Math.random()*3)+1;
        const c = Math.floor(Math.random()*3)+2;
        return {
          id, topic: 'Operasi Bentuk Aljabar',
          questionText: `Jabarkan: ${a}(${b}x + ${c})!`,
          questionLatex: `${a}(${b}x + ${c})`,
          answerText: `${a*b}x + ${a*c}`,
          answerLatex: `${a*b}x + ${a*c}`,
          solutionSteps: [`Distribusikan: ${a} × ${b}x + ${a} × ${c}`, `= ${a*b}x + ${a*c}`]
        };
      } else {
        const a = Math.floor(Math.random()*4)+2, b = Math.floor(Math.random()*3)+1;
        const c = Math.floor(Math.random()*4)+2, d = Math.floor(Math.random()*3)+1;
        const ac = a*c, ad = a*d, bc = b*c, bd = b*d;
        return {
          id, topic: 'Operasi Bentuk Aljabar',
          questionText: `Jabarkan: (${a}x + ${b})(${c}x + ${d})!`,
          questionLatex: `(${a}x + ${b})(${c}x + ${d})`,
          answerText: `${ac}x² + ${ad+bc}x + ${bd}`,
          answerLatex: `${ac}x^2 + ${ad+bc}x + ${bd}`,
          solutionSteps: [
            `Gunakan FOIL: (${a}x)(${c}x) + (${a}x)(${d}) + (${b})(${c}x) + (${b})(${d})`,
            `= ${ac}x² + ${ad}x + ${bc}x + ${bd}`,
            `= ${ac}x² + ${ad+bc}x + ${bd}`
          ]
        };
      }
    }

    case 'deret': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const a = Math.floor(Math.random()*8)+1, d = Math.floor(Math.random()*6)+1;
        const n = Math.floor(Math.random()*5)+5;
        const sn = n/2 * (2*a + (n-1)*d);
        return {
          id, topic: 'Deret Aritmetika',
          questionText: `Hitunglah jumlah ${n} suku pertama deret aritmetika dengan a = ${a} dan d = ${d}!`,
          questionLatex: `S_n = \\frac{n}{2}(2a + (n-1)d),\\; n=${n}`,
          answerText: `S_${n} = ${sn}`,
          answerLatex: `S_{${n}} = ${sn}`,
          solutionSteps: [`S_n = n/2 × (2a + (n-1)d)`, `S_${n} = ${n}/2 × (2×${a} + (${n}-1)×${d})`, `= ${n/2} × (${2*a} + ${(n-1)*d}) = ${n/2} × ${2*a+(n-1)*d} = ${sn}`]
        };
      } else {
        const a = Math.floor(Math.random()*4)+1, r = Math.floor(Math.random()*2)+2;
        const n = Math.floor(Math.random()*3)+3;
        const sn = a * (Math.pow(r,n) - 1) / (r - 1);
        return {
          id, topic: 'Deret Geometri',
          questionText: `Hitunglah jumlah ${n} suku pertama deret geometri dengan a = ${a} dan r = ${r}!`,
          questionLatex: `S_n = \\frac{a(r^n - 1)}{r-1},\\; n=${n}`,
          answerText: `S_${n} = ${sn}`,
          answerLatex: `S_{${n}} = ${sn}`,
          solutionSteps: [`S_n = a(r^n - 1)/(r - 1)`, `S_${n} = ${a}(${r}^${n} - 1)/(${r} - 1) = ${a}×${Math.pow(r,n)-1}/${r-1} = ${sn}`]
        };
      }
    }

    case 'koordinat': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const x1 = Math.floor(Math.random()*8)-4, y1 = Math.floor(Math.random()*8)-4;
        const x2 = Math.floor(Math.random()*8)-4, y2 = Math.floor(Math.random()*8)-4;
        const dist = parseFloat(Math.sqrt((x2-x1)**2 + (y2-y1)**2).toFixed(2));
        return {
          id, topic: 'Koordinat Kartesius',
          questionText: `Tentukan jarak antara titik A(${x1}, ${y1}) dan B(${x2}, ${y2})!`,
          questionLatex: `d = \\sqrt{(${x2}-${x1})^2 + (${y2}-${y1})^2}`,
          answerText: `d = ${dist} satuan`,
          answerLatex: `d = ${dist} \\text{ satuan}`,
          solutionSteps: [
            `d = √((x₂-x₁)² + (y₂-y₁)²)`,
            `d = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${(x2-x1)**2} + ${(y2-y1)**2}) = √${(x2-x1)**2+(y2-y1)**2} = ${dist}`
          ]
        };
      } else if (type === 1) {
        const kuadran = Math.floor(Math.random()*4)+1;
        const x = kuadran === 1 || kuadran === 4 ? Math.floor(Math.random()*6)+1 : -(Math.floor(Math.random()*6)+1);
        const y = kuadran === 1 || kuadran === 2 ? Math.floor(Math.random()*6)+1 : -(Math.floor(Math.random()*6)+1);
        const namaKuadran = y > 0 ? (x > 0 ? 'I' : 'II') : (x < 0 ? 'III' : 'IV');
        return {
          id, topic: 'Koordinat Kartesius',
          questionText: `Titik P(${x}, ${y}) berada di kuadran berapa?`,
          questionLatex: `P(${x}, ${y})`,
          answerText: `Kuadran ${namaKuadran}`,
          answerLatex: `\\text{Kuadran } ${namaKuadran}`,
          solutionSteps: [
            `x = ${x} (${x > 0 ? 'positif' : 'negatif'}), y = ${y} (${y > 0 ? 'positif' : 'negatif'})`,
            `x ${x>0?'>':'<'} 0 dan y ${y>0?'>':'<'} 0 → Kuadran ${namaKuadran}`
          ]
        };
      } else {
        const x1 = Math.floor(Math.random()*6)-2, y1 = Math.floor(Math.random()*6)-2;
        const x2 = Math.floor(Math.random()*6)-2, y2 = Math.floor(Math.random()*6)-2;
        const mx = (x1+x2)/2, my = (y1+y2)/2;
        return {
          id, topic: 'Koordinat Kartesius',
          questionText: `Tentukan titik tengah (midpoint) dari A(${x1}, ${y1}) dan B(${x2}, ${y2})!`,
          questionLatex: `M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)`,
          answerText: `M(${mx}, ${my})`,
          answerLatex: `M(${mx}, ${my})`,
          solutionSteps: [`M = ((${x1}+${x2})/2, (${y1}+${y2})/2)`, `M = (${x1+x2}/2, ${y1+y2}/2) = (${mx}, ${my})`]
        };
      }
    }

    case 'konversi-satuan': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const units = [['km','m',1000],['m','cm',100],['cm','mm',10],['km','cm',100000]] as [string,string,number][];
        const [from, to, factor] = units[Math.floor(Math.random()*units.length)];
        const val = Math.floor(Math.random()*20)+1;
        return {
          id, topic: 'Konversi Satuan Panjang',
          questionText: `Ubah ${val} ${from} ke dalam satuan ${to}!`,
          questionLatex: `${val} \\text{ ${from}} = \\ldots \\text{ ${to}}`,
          answerText: `${val * factor} ${to}`,
          answerLatex: `${val * factor} \\text{ ${to}}`,
          solutionSteps: [`1 ${from} = ${factor} ${to}`, `${val} ${from} = ${val} × ${factor} = ${val * factor} ${to}`]
        };
      } else if (type === 1) {
        const units = [['kg','g',1000],['g','mg',1000],['ton','kg',1000],['kwintal','kg',100]] as [string,string,number][];
        const [from, to, factor] = units[Math.floor(Math.random()*units.length)];
        const val = Math.floor(Math.random()*15)+1;
        return {
          id, topic: 'Konversi Satuan Massa',
          questionText: `Ubah ${val} ${from} ke dalam satuan ${to}!`,
          questionLatex: `${val} \\text{ ${from}} = \\ldots \\text{ ${to}}`,
          answerText: `${val * factor} ${to}`,
          answerLatex: `${val * factor} \\text{ ${to}}`,
          solutionSteps: [`1 ${from} = ${factor} ${to}`, `${val} ${from} = ${val} × ${factor} = ${val * factor} ${to}`]
        };
      } else {
        const units = [['jam','menit',60],['menit','detik',60],['jam','detik',3600],['hari','jam',24]] as [string,string,number][];
        const [from, to, factor] = units[Math.floor(Math.random()*units.length)];
        const val = Math.floor(Math.random()*10)+1;
        return {
          id, topic: 'Konversi Satuan Waktu',
          questionText: `Ubah ${val} ${from} ke dalam satuan ${to}!`,
          questionLatex: `${val} \\text{ ${from}} = \\ldots \\text{ ${to}}`,
          answerText: `${val * factor} ${to}`,
          answerLatex: `${val * factor} \\text{ ${to}}`,
          solutionSteps: [`1 ${from} = ${factor} ${to}`, `${val} ${from} = ${val} × ${factor} = ${val * factor} ${to}`]
        };
      }
    }

    case 'geometri-bidang-lanjut': {
      const shapes = ['trapesium', 'belah-ketupat', 'layang-layang', 'jajargenjang'];
      const shape = shapes[Math.floor(Math.random()*shapes.length)];
      if (shape === 'trapesium') {
        const a = Math.floor(Math.random()*10)+6, b = Math.floor(Math.random()*6)+3, t = Math.floor(Math.random()*8)+4;
        const luas = (a+b)*t/2;
        return {
          id, topic: 'Trapesium',
          questionText: `Hitunglah luas trapesium dengan sisi sejajar ${a} cm dan ${b} cm, tinggi ${t} cm!`,
          questionLatex: `L = \\frac{(a+b)}{2} \\times t = \\frac{(${a}+${b})}{2} \\times ${t}`,
          answerText: `${luas} cm²`,
          answerLatex: `L = ${luas} \\text{ cm}^2`,
          solutionSteps: [`L = ½ × (a+b) × t`, `L = ½ × (${a}+${b}) × ${t} = ½ × ${a+b} × ${t} = ${luas} cm²`]
        };
      } else if (shape === 'belah-ketupat') {
        const d1 = (Math.floor(Math.random()*6)+2)*2, d2 = (Math.floor(Math.random()*5)+2)*2;
        const luas = d1*d2/2;
        return {
          id, topic: 'Belah Ketupat',
          questionText: `Hitunglah luas belah ketupat dengan diagonal d₁ = ${d1} cm dan d₂ = ${d2} cm!`,
          questionLatex: `L = \\frac{d_1 \\times d_2}{2} = \\frac{${d1} \\times ${d2}}{2}`,
          answerText: `${luas} cm²`,
          answerLatex: `L = ${luas} \\text{ cm}^2`,
          solutionSteps: [`L = (d₁ × d₂) / 2`, `L = (${d1} × ${d2}) / 2 = ${d1*d2} / 2 = ${luas} cm²`]
        };
      } else if (shape === 'layang-layang') {
        const d1 = (Math.floor(Math.random()*6)+2)*2, d2 = (Math.floor(Math.random()*5)+2)*2;
        const luas = d1*d2/2;
        return {
          id, topic: 'Layang-layang',
          questionText: `Hitunglah luas layang-layang dengan diagonal d₁ = ${d1} cm dan d₂ = ${d2} cm!`,
          questionLatex: `L = \\frac{d_1 \\times d_2}{2} = \\frac{${d1} \\times ${d2}}{2}`,
          answerText: `${luas} cm²`,
          answerLatex: `L = ${luas} \\text{ cm}^2`,
          solutionSteps: [`L = (d₁ × d₂) / 2`, `L = (${d1} × ${d2}) / 2 = ${luas} cm²`]
        };
      } else {
        const a = Math.floor(Math.random()*12)+5, t = Math.floor(Math.random()*8)+4;
        const luas = a*t;
        return {
          id, topic: 'Jajargenjang',
          questionText: `Hitunglah luas jajargenjang dengan alas ${a} cm dan tinggi ${t} cm!`,
          questionLatex: `L = a \\times t = ${a} \\times ${t}`,
          answerText: `${luas} cm²`,
          answerLatex: `L = ${luas} \\text{ cm}^2`,
          solutionSteps: [`L = alas × tinggi = ${a} × ${t} = ${luas} cm²`]
        };
      }
    }

    case 'geometri-ruang-lanjut': {
      const shapes = ['limas', 'kerucut', 'bola', 'prisma'];
      const shape = shapes[Math.floor(Math.random()*shapes.length)];
      const calcType = Math.random() > 0.5 ? 'volume' : 'luas';
      if (shape === 'limas') {
        const s = Math.floor(Math.random()*8)+4, t = Math.floor(Math.random()*10)+5;
        if (calcType === 'volume') {
          const vol = parseFloat((s*s*t/3).toFixed(2));
          return {
            id, topic: 'Limas Segiempat',
            questionText: `Hitunglah volume limas segiempat beraturan dengan sisi alas ${s} cm dan tinggi ${t} cm!`,
            questionLatex: `V = \\frac{1}{3} \\times s^2 \\times t`,
            answerText: `${vol} cm³`,
            answerLatex: `V = ${vol} \\text{ cm}^3`,
            solutionSteps: [`V = ⅓ × luas alas × tinggi`, `V = ⅓ × ${s}² × ${t} = ⅓ × ${s*s} × ${t} = ${vol} cm³`]
          };
        } else {
          const lp = parseFloat((s*s + 4*(s*t/2)).toFixed(2));
          return {
            id, topic: 'Limas Segiempat',
            questionText: `Hitunglah luas permukaan limas segiempat beraturan dengan sisi alas ${s} cm dan tinggi sisi tegak ${t} cm!`,
            questionLatex: `L = s^2 + 4 \\times \\frac{1}{2} \\times s \\times t`,
            answerText: `${lp} cm²`,
            answerLatex: `L = ${lp} \\text{ cm}^2`,
            solutionSteps: [`L = luas alas + 4 × luas segitiga`, `L = ${s}² + 4 × ½ × ${s} × ${t} = ${s*s} + ${2*s*t} = ${lp} cm²`]
          };
        }
      } else if (shape === 'kerucut') {
        const r = Math.floor(Math.random()*7)+3, t = Math.floor(Math.random()*10)+5;
        const vol = parseFloat((3.14*r*r*t/3).toFixed(2));
        return {
          id, topic: 'Kerucut',
          questionText: `Hitunglah volume kerucut dengan jari-jari ${r} cm dan tinggi ${t} cm! (π = 3,14)`,
          questionLatex: `V = \\frac{1}{3}\\pi r^2 t = \\frac{1}{3} \\times 3{,}14 \\times ${r}^2 \\times ${t}`,
          answerText: `${vol} cm³`,
          answerLatex: `V = ${vol} \\text{ cm}^3`,
          solutionSteps: [`V = ⅓πr²t`, `V = ⅓ × 3,14 × ${r}² × ${t} = ⅓ × 3,14 × ${r*r} × ${t} = ${vol} cm³`]
        };
      } else if (shape === 'bola') {
        const r = Math.floor(Math.random()*6)+3;
        if (calcType === 'volume') {
          const vol = parseFloat((4/3*3.14*r*r*r).toFixed(2));
          return {
            id, topic: 'Bola',
            questionText: `Hitunglah volume bola dengan jari-jari ${r} cm! (π = 3,14)`,
            questionLatex: `V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\times 3{,}14 \\times ${r}^3`,
            answerText: `${vol} cm³`,
            answerLatex: `V = ${vol} \\text{ cm}^3`,
            solutionSteps: [`V = 4/3πr³`, `V = 4/3 × 3,14 × ${r}³ = 4/3 × 3,14 × ${r**3} = ${vol} cm³`]
          };
        } else {
          const lp = parseFloat((4*3.14*r*r).toFixed(2));
          return {
            id, topic: 'Bola',
            questionText: `Hitunglah luas permukaan bola dengan jari-jari ${r} cm! (π = 3,14)`,
            questionLatex: `L = 4\\pi r^2 = 4 \\times 3{,}14 \\times ${r}^2`,
            answerText: `${lp} cm²`,
            answerLatex: `L = ${lp} \\text{ cm}^2`,
            solutionSteps: [`L = 4πr²`, `L = 4 × 3,14 × ${r}² = 4 × 3,14 × ${r*r} = ${lp} cm²`]
          };
        }
      } else {
        const a = Math.floor(Math.random()*8)+4, b = Math.floor(Math.random()*6)+3, t = Math.floor(Math.random()*10)+5;
        const vol = a*b*t;
        return {
          id, topic: 'Prisma Segitiga',
          questionText: `Hitunglah volume prisma segitiga siku-siku dengan alas ${a} cm, tinggi alas ${b} cm, dan tinggi prisma ${t} cm!`,
          questionLatex: `V = \\frac{1}{2} \\times a \\times b \\times t`,
          answerText: `${a*b*t/2} cm³`,
          answerLatex: `V = ${a*b*t/2} \\text{ cm}^3`,
          solutionSteps: [`V = luas alas × tinggi = ½ × ${a} × ${b} × ${t}`, `V = ½ × ${a*b} × ${t} = ${a*b*t/2} cm³`]
        };
      }
    }

    case 'peluang-lanjut': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const p1n = Math.floor(Math.random()*4)+1, p1d = Math.floor(Math.random()*4)+p1n+1;
        const p2n = Math.floor(Math.random()*4)+1, p2d = p1d;
        const pn = p1n + p2n;
        return {
          id, topic: 'Peluang Kejadian Saling Lepas',
          questionText: `Dalam sebuah kotak terdapat ${p1d} bola. P(A) = ${p1n}/${p1d} dan P(B) = ${p2n}/${p2d}, A dan B saling lepas. Tentukan P(A ∪ B)!`,
          questionLatex: `P(A \\cup B) = P(A) + P(B) = \\frac{${p1n}}{${p1d}} + \\frac{${p2n}}{${p2d}}`,
          answerText: `P(A ∪ B) = ${pn}/${p1d}`,
          answerLatex: `P(A \\cup B) = \\frac{${pn}}{${p1d}}`,
          solutionSteps: [`Jika A dan B saling lepas: P(A ∪ B) = P(A) + P(B)`, `= ${p1n}/${p1d} + ${p2n}/${p2d} = ${pn}/${p1d}`]
        };
      } else if (type === 1) {
        const n = Math.floor(Math.random()*4)+4;
        const r = Math.floor(Math.random()*3)+2;
        const perm = Array.from({length: r}, (_, i) => n - i).reduce((a, b) => a * b, 1);
        return {
          id, topic: 'Kaidah Pencacahan',
          questionText: `Dari ${n} orang akan dipilih ${r} orang untuk menempati posisi berbeda. Berapa banyak susunan yang mungkin?`,
          questionLatex: `P(${n}, ${r}) = \\frac{${n}!}{(${n}-${r})!}`,
          answerText: `${perm} susunan`,
          answerLatex: `P(${n},${r}) = ${perm}`,
          solutionSteps: [
            `P(n,r) = n × (n-1) × ... × (n-r+1)`,
            `P(${n},${r}) = ${Array.from({length: r}, (_, i) => n - i).join(' × ')} = ${perm}`
          ]
        };
      } else {
        const merah = Math.floor(Math.random()*4)+2, biru = Math.floor(Math.random()*4)+2;
        const total = merah + biru;
        const p2merah = merah * (merah - 1), p2total = total * (total - 1);
        return {
          id, topic: 'Peluang Kejadian Saling Bebas',
          questionText: `Kotak berisi ${merah} bola merah dan ${biru} bola biru. Diambil 2 bola satu per satu tanpa pengembalian. Berapa P(keduanya merah)?`,
          questionLatex: `P = \\frac{${merah}}{${total}} \\times \\frac{${merah-1}}{${total-1}}`,
          answerText: `P = ${p2merah}/${p2total}`,
          answerLatex: `P = \\frac{${p2merah}}{${p2total}}`,
          solutionSteps: [
            `P(merah pertama) = ${merah}/${total}`,
            `P(merah kedua | merah pertama) = ${merah-1}/${total-1}`,
            `P(keduanya merah) = ${merah}/${total} × ${merah-1}/${total-1} = ${p2merah}/${p2total}`
          ]
        };
      }
    }

    case 'statistika-lanjut': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const data = Array.from({length: 8}, () => Math.floor(Math.random()*20)+1).sort((a,b) => a-b);
        const q1 = (data[1] + data[2]) / 2;
        const q3 = (data[5] + data[6]) / 2;
        const iqr = q3 - q1;
        return {
          id, topic: 'Kuartil & Jangkauan',
          questionText: `Data: ${data.join(', ')}. Tentukan Q1, Q3, dan Jangkauan Interkuartil (IQR)!`,
          questionLatex: `Q_1, Q_3, \\text{IQR} = Q_3 - Q_1`,
          answerText: `Q1 = ${q1}, Q3 = ${q3}, IQR = ${iqr}`,
          answerLatex: `Q_1 = ${q1},\\; Q_3 = ${q3},\\; \\text{IQR} = ${iqr}`,
          solutionSteps: [
            `Data terurut: ${data.join(', ')}`,
            `Q1 = median bagian bawah = (${data[1]} + ${data[2]})/2 = ${q1}`,
            `Q3 = median bagian atas = (${data[5]} + ${data[6]})/2 = ${q3}`,
            `IQR = Q3 - Q1 = ${q3} - ${q1} = ${iqr}`
          ]
        };
      } else {
        const data = Array.from({length: 7}, () => Math.floor(Math.random()*15)+5).sort((a,b) => a-b);
        const range = data[data.length-1] - data[0];
        const mean = parseFloat((data.reduce((s,v) => s+v, 0) / data.length).toFixed(1));
        return {
          id, topic: 'Jangkauan & Rata-rata',
          questionText: `Data: ${data.join(', ')}. Tentukan jangkauan (range) dan rata-rata data!`,
          questionLatex: `R = x_{\\max} - x_{\\min},\\; \\bar{x} = \\frac{\\sum x}{n}`,
          answerText: `Jangkauan = ${range}, Mean = ${mean}`,
          answerLatex: `R = ${range},\\; \\bar{x} = ${mean}`,
          solutionSteps: [
            `Jangkauan = x_max - x_min = ${data[data.length-1]} - ${data[0]} = ${range}`,
            `Mean = (${data.join('+')})/7 = ${data.reduce((s,v)=>s+v,0)}/7 = ${mean}`
          ]
        };
      }
    }

    case 'aritmetika-lanjut': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const harga = (Math.floor(Math.random()*20)+5) * 10000;
        const pajakPct = [10, 11, 12][Math.floor(Math.random()*3)];
        const pajak = harga * pajakPct / 100;
        const total = harga + pajak;
        return {
          id, topic: 'Pajak (PPN)',
          questionText: `Harga barang sebelum pajak Rp${harga.toLocaleString('id-ID')}. Jika dikenakan PPN ${pajakPct}%, berapa harga akhir yang dibayar?`,
          questionLatex: `\\text{Total} = \\text{Harga} \\times (1 + ${pajakPct}\\%)`,
          answerText: `Rp${total.toLocaleString('id-ID')}`,
          answerLatex: `\\text{Total} = Rp${total.toLocaleString('id-ID')}`,
          solutionSteps: [
            `PPN = ${pajakPct}% × Rp${harga.toLocaleString('id-ID')} = Rp${pajak.toLocaleString('id-ID')}`,
            `Total = Rp${harga.toLocaleString('id-ID')} + Rp${pajak.toLocaleString('id-ID')} = Rp${total.toLocaleString('id-ID')}`
          ]
        };
      } else if (type === 1) {
        const bruto = (Math.floor(Math.random()*20)+10) * 5;
        const tara = Math.floor(Math.random()*5)+1;
        const neto = bruto - tara;
        return {
          id, topic: 'Bruto, Neto & Tara',
          questionText: `Sebuah karung beras memiliki bruto ${bruto} kg dan tara ${tara} kg. Berapa neto-nya?`,
          questionLatex: `\\text{Neto} = \\text{Bruto} - \\text{Tara} = ${bruto} - ${tara}`,
          answerText: `Neto = ${neto} kg`,
          answerLatex: `\\text{Neto} = ${neto} \\text{ kg}`,
          solutionSteps: [
            `Neto = Bruto - Tara`,
            `Neto = ${bruto} - ${tara} = ${neto} kg`
          ]
        };
      } else {
        const hb = (Math.floor(Math.random()*10)+5) * 10000;
        const hj = hb - (Math.floor(Math.random()*3)+1) * 5000;
        const rugi = hb - hj;
        const rugiPct = parseFloat((rugi/hb*100).toFixed(1));
        return {
          id, topic: 'Persentase Rugi',
          questionText: `Pedagang membeli barang Rp${hb.toLocaleString('id-ID')} dan menjual Rp${hj.toLocaleString('id-ID')}. Berapa persentase kerugiannya?`,
          questionLatex: `\\%\\text{Rugi} = \\frac{\\text{HB}-\\text{HJ}}{\\text{HB}} \\times 100\\%`,
          answerText: `Rugi ${rugiPct}%`,
          answerLatex: `\\%\\text{Rugi} = ${rugiPct}\\%`,
          solutionSteps: [
            `Rugi = HB - HJ = Rp${hb.toLocaleString('id-ID')} - Rp${hj.toLocaleString('id-ID')} = Rp${rugi.toLocaleString('id-ID')}`,
            `% Rugi = ${rugi}/${hb} × 100% = ${rugiPct}%`
          ]
        };
      }
    }

    case 'relasi-domain': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const domain = [1, 2, 3, 4, 5].slice(0, Math.floor(Math.random()*2)+3);
        const a = Math.floor(Math.random()*3)+1, b = Math.floor(Math.random()*4)+1;
        const range = domain.map(x => a*x + b);
        const kodomain = [...new Set([...range, ...range.map(r => r + Math.floor(Math.random()*3)+1)])].sort((x,y)=>x-y);
        return {
          id, topic: 'Relasi & Fungsi',
          questionText: `Diketahui fungsi f(x) = ${a}x + ${b} dengan domain D = {${domain.join(', ')}}. Tentukan range (daerah hasil) dari fungsi tersebut!`,
          questionLatex: `f(x) = ${a}x + ${b},\\; D = \\{${domain.join(', ')}\\}`,
          answerText: `Range = {${range.join(', ')}}`,
          answerLatex: `R_f = \\{${range.join(', ')}\\}`,
          solutionSteps: [
            `Hitung f(x) untuk setiap x di domain:`,
            ...domain.map((x, i) => `f(${x}) = ${a}(${x}) + ${b} = ${range[i]}`),
            `Range = {${range.join(', ')}}`
          ]
        };
      } else if (type === 1) {
        const domain = [1, 2, 3, 4, 5];
        const a = Math.floor(Math.random()*3)+1, b = Math.floor(Math.random()*5)+1;
        const x0 = domain[Math.floor(Math.random()*domain.length)];
        const result = a * x0 + b;
        return {
          id, topic: 'Domain & Kodomain',
          questionText: `Fungsi f: A → B didefinisikan sebagai f(x) = ${a}x + ${b}. Jika domain A = {${domain.join(', ')}}, tentukan nilai f(${x0})!`,
          questionLatex: `f(x) = ${a}x + ${b},\\; x = ${x0}`,
          answerText: `f(${x0}) = ${result}`,
          answerLatex: `f(${x0}) = ${result}`,
          solutionSteps: [`f(x) = ${a}x + ${b}`, `f(${x0}) = ${a}(${x0}) + ${b} = ${a*x0} + ${b} = ${result}`]
        };
      } else {
        const pairs = [[1,2],[2,4],[3,6],[4,8]].slice(0, Math.floor(Math.random()*2)+2);
        const domain = pairs.map(p => p[0]);
        const range = pairs.map(p => p[1]);
        return {
          id, topic: 'Penyajian Fungsi',
          questionText: `Relasi berikut dinyatakan dalam himpunan pasangan berurutan: {${pairs.map(p=>`(${p[0]},${p[1]})`).join(', ')}}. Apakah ini merupakan suatu fungsi?`,
          questionLatex: `\\{${pairs.map(p=>`(${p[0]},${p[1]})`).join(', ')}\\}`,
          answerText: `Ya, ini adalah fungsi karena setiap anggota domain dipasangkan tepat satu ke kodomain.`,
          answerLatex: `\\text{Fungsi} \\checkmark`,
          solutionSteps: [
            `Domain = {${domain.join(', ')}}, Range = {${range.join(', ')}}`,
            `Setiap elemen domain (${domain.join(', ')}) muncul tepat satu kali`,
            `∴ Relasi ini adalah fungsi`
          ]
        };
      }
    }

    case 'fungsi-nonlinear': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const a = Math.floor(Math.random()*3)+1;
        const b = (Math.floor(Math.random()*6)-3) * 2;
        const c = Math.floor(Math.random()*10)-5;
        const xp = -b / (2*a);
        const yp = c - b*b/(4*a);
        const bStr = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
        const cStr = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        return {
          id, topic: 'Fungsi Kuadrat',
          questionText: `Tentukan titik puncak (vertex) dari parabola f(x) = ${a}x² ${bStr} ${cStr}!`,
          questionLatex: `f(x) = ${a}x^2 ${bStr} ${cStr}`,
          answerText: `Titik puncak: (${xp}, ${yp})`,
          answerLatex: `\\left(${xp}, ${yp}\\right)`,
          solutionSteps: [
            `x_p = -b/(2a) = -(${b})/(2×${a}) = ${xp}`,
            `y_p = f(${xp}) = ${a}(${xp})² ${bStr.replace('x',`(${xp})`)} ${cStr} = ${yp}`,
            `Titik puncak = (${xp}, ${yp})`
          ]
        };
      } else if (type === 1) {
        const a = Math.floor(Math.random()*3)+1, b = Math.floor(Math.random()*5)+1;
        const x0 = Math.floor(Math.random()*4)+1;
        const result = a * x0 * x0 + b;
        return {
          id, topic: 'Fungsi Kuadrat',
          questionText: `Diketahui f(x) = ${a}x² + ${b}. Hitunglah nilai f(${x0})!`,
          questionLatex: `f(x) = ${a}x^2 + ${b},\\; f(${x0}) = ?`,
          answerText: `f(${x0}) = ${result}`,
          answerLatex: `f(${x0}) = ${result}`,
          solutionSteps: [`f(x) = ${a}x² + ${b}`, `f(${x0}) = ${a}(${x0})² + ${b} = ${a*x0*x0} + ${b} = ${result}`]
        };
      } else {
        const a = Math.floor(Math.random()*2)+1;
        const p = Math.floor(Math.random()*4)-2, q = Math.floor(Math.random()*10)-5;
        const pStr = p >= 0 ? `- ${p}` : `+ ${Math.abs(p)}`;
        return {
          id, topic: 'Fungsi Nonlinear',
          questionText: `Fungsi f(x) = ${a}(x ${pStr})² + ${q} memiliki sumbu simetri x = ?`,
          questionLatex: `f(x) = ${a}(x ${pStr})^2 + ${q}`,
          answerText: `Sumbu simetri: x = ${p}`,
          answerLatex: `x = ${p}`,
          solutionSteps: [
            `Bentuk f(x) = a(x - p)² + q, sumbu simetri di x = p`,
            `f(x) = ${a}(x ${pStr})² + ${q} → p = ${p}`,
            `Sumbu simetri: x = ${p}`
          ]
        };
      }
    }

    case 'sudut-garis': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        const sudut = Math.floor(Math.random()*80)+10;
        const pelurus = 180 - sudut;
        return {
          id, topic: 'Hubungan Antar Sudut',
          questionText: `Dua sudut berpelurus. Jika salah satu sudutnya ${sudut}°, berapakah sudut yang lain?`,
          questionLatex: `\\alpha + \\beta = 180°,\\; \\alpha = ${sudut}°`,
          answerText: `${pelurus}°`,
          answerLatex: `\\beta = ${pelurus}°`,
          solutionSteps: [
            `Sudut berpelurus: α + β = 180°`,
            `β = 180° - ${sudut}° = ${pelurus}°`
          ]
        };
      } else if (type === 1) {
        const sudut = Math.floor(Math.random()*80)+10;
        const penyiku = 90 - sudut;
        return {
          id, topic: 'Hubungan Antar Sudut',
          questionText: `Dua sudut berpenyiku (komplemen). Jika salah satu sudutnya ${sudut}°, berapakah sudut yang lain?`,
          questionLatex: `\\alpha + \\beta = 90°,\\; \\alpha = ${sudut}°`,
          answerText: `${penyiku}°`,
          answerLatex: `\\beta = ${penyiku}°`,
          solutionSteps: [
            `Sudut berpenyiku (komplemen): α + β = 90°`,
            `β = 90° - ${sudut}° = ${penyiku}°`
          ]
        };
      } else {
        const sudutA = Math.floor(Math.random()*60)+30;
        const jenisGaris = ['sehadap', 'bersebrangan', 'dalam bersebrangan'][Math.floor(Math.random()*3)];
        let sudutB: number, penjelasan: string;
        if (jenisGaris === 'sehadap') { sudutB = sudutA; penjelasan = 'Sudut sehadap sama besar'; }
        else if (jenisGaris === 'bersebrangan') { sudutB = sudutA; penjelasan = 'Sudut bertolak belakang sama besar'; }
        else { sudutB = 180 - sudutA; penjelasan = 'Sudut dalam sepihak berjumlah 180°'; }
        return {
          id, topic: 'Garis Sejajar',
          questionText: `Dua garis sejajar dipotong sebuah garis transversal. Jika sudut A = ${sudutA}°, tentukan sudut ${jenisGaris}-nya!`,
          questionLatex: `\\angle A = ${sudutA}°,\\; \\text{cari } \\angle B (\\text{${jenisGaris}})`,
          answerText: `∠B = ${sudutB}°`,
          answerLatex: `\\angle B = ${sudutB}°`,
          solutionSteps: [penjelasan, `∠B = ${sudutB}°`]
        };
      }
    }

    case 'kesebangunan': {
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const k = [2, 3, 4][Math.floor(Math.random()*3)];
        const a = Math.floor(Math.random()*6)+3, b = Math.floor(Math.random()*5)+4;
        const c = Math.floor(Math.random()*4)+3;
        const a2 = a*k, b2 = b*k, c2 = c*k;
        return {
          id, topic: 'Kesebangunan',
          questionText: `Dua segitiga sebangun. Segitiga I memiliki sisi ${a} cm, ${b} cm, ${c} cm. Jika sisi terpanjang segitiga II = ${b2} cm, tentukan sisi lainnya!`,
          questionLatex: `\\frac{a_2}{a_1} = \\frac{b_2}{b_1} = \\frac{c_2}{c_1} = k`,
          answerText: `Sisi lain: ${a2} cm dan ${c2} cm (faktor skala k = ${k})`,
          answerLatex: `k = ${k},\\; \\text{sisi} = ${a2} \\text{ cm dan } ${c2} \\text{ cm}`,
          solutionSteps: [
            `Faktor skala k = ${b2}/${b} = ${k}`,
            `Sisi ${a} cm → ${a} × ${k} = ${a2} cm`,
            `Sisi ${c} cm → ${c} × ${k} = ${c2} cm`
          ]
        };
      } else {
        const sisiA = Math.floor(Math.random()*8)+4, sisiB = Math.floor(Math.random()*6)+3;
        const k = Math.floor(Math.random()*3)+2;
        const bayangan = sisiA * k;
        return {
          id, topic: 'Kekongruenan & Kesebangunan',
          questionText: `Sebuah foto berukuran ${sisiA} cm × ${sisiB} cm diperbesar dengan faktor skala ${k}. Berapakah ukuran foto setelah diperbesar?`,
          questionLatex: `${sisiA} \\times ${k} = ?,\\; ${sisiB} \\times ${k} = ?`,
          answerText: `${sisiA*k} cm × ${sisiB*k} cm`,
          answerLatex: `${sisiA*k} \\text{ cm} \\times ${sisiB*k} \\text{ cm}`,
          solutionSteps: [
            `Panjang baru = ${sisiA} × ${k} = ${sisiA*k} cm`,
            `Lebar baru = ${sisiB} × ${k} = ${sisiB*k} cm`,
            `Ukuran foto: ${sisiA*k} cm × ${sisiB*k} cm`
          ]
        };
      }
    }

    case 'komposisi-transformasi': {
      const px = Math.floor(Math.random()*6)-3, py = Math.floor(Math.random()*6)-3;
      const type = Math.floor(Math.random() * 2);
      if (type === 0) {
        const tx1 = Math.floor(Math.random()*5)-2, ty1 = Math.floor(Math.random()*5)-2;
        const tx2 = Math.floor(Math.random()*5)-2, ty2 = Math.floor(Math.random()*5)-2;
        const px1 = px+tx1, py1 = py+ty1;
        const px2 = px1+tx2, py2 = py1+ty2;
        return {
          id, topic: 'Komposisi Transformasi',
          questionText: `Titik P(${px}, ${py}) ditranslasikan oleh T₁(${tx1}, ${ty1}) kemudian T₂(${tx2}, ${ty2}). Tentukan bayangan akhir P!`,
          questionLatex: `P(${px}, ${py}) \\xrightarrow{T_1} P'(?,?) \\xrightarrow{T_2} P''(?,?)`,
          answerText: `P'' = (${px2}, ${py2})`,
          answerLatex: `P''(${px2}, ${py2})`,
          solutionSteps: [
            `T₁: P(${px}, ${py}) → P'(${px}+${tx1}, ${py}+${ty1}) = P'(${px1}, ${py1})`,
            `T₂: P'(${px1}, ${py1}) → P''(${px1}+${tx2}, ${py1}+${ty2}) = P''(${px2}, ${py2})`
          ]
        };
      } else {
        const tx = Math.floor(Math.random()*6)-3, ty = Math.floor(Math.random()*6)-3;
        const pxAfterT = px+tx, pyAfterT = py+ty;
        const pxAfterRef = -pxAfterT, pyAfterRef = pyAfterT;
        return {
          id, topic: 'Komposisi Transformasi',
          questionText: `Titik P(${px}, ${py}) ditranslasikan dengan T(${tx}, ${ty}), lalu dicerminkan terhadap sumbu Y. Tentukan bayangan akhir!`,
          questionLatex: `P(${px}, ${py}) \\xrightarrow{T} P' \\xrightarrow{\\text{ref Y}} P''`,
          answerText: `P'' = (${pxAfterRef}, ${pyAfterRef})`,
          answerLatex: `P''(${pxAfterRef}, ${pyAfterRef})`,
          solutionSteps: [
            `Translasi: P(${px}, ${py}) → P'(${px}+${tx}, ${py}+${ty}) = P'(${pxAfterT}, ${pyAfterT})`,
            `Refleksi sumbu Y: (x, y) → (-x, y)`,
            `P'(${pxAfterT}, ${pyAfterT}) → P''(${pxAfterRef}, ${pyAfterRef})`
          ]
        };
      }
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
