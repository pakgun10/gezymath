export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  latexQuestion?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function generateQuizQuestions(): QuizQuestion[] {
  return [
    {
      id: 'q1',
      category: 'Pythagoras',
      question: 'Manakah dari kelompok tiga bilangan berikut yang merupakan Tripel Pythagoras?',
      options: ['3, 4, 6', '5, 12, 13', '6, 8, 11', '7, 24, 26'],
      correctAnswer: '5, 12, 13',
      explanation: '5² + 12² = 25 + 144 = 169 = 13². Memenuhi a² + b² = c².'
    },
    {
      id: 'q2',
      category: 'FPB & KPK',
      question: 'Berapakah Nilai Faktor Persekutuan Terbesar (FPB) dari 24 dan 36?',
      options: ['6', '8', '12', '24'],
      correctAnswer: '12',
      explanation: 'Faktor 24 = {1,2,3,4,6,8,12,24}, Faktor 36 = {1,2,3,4,6,9,12,18,36}. FPB nya adalah 12.'
    },
    {
      id: 'q3',
      category: 'Persamaan Kuadrat',
      question: 'Berapa nilai diskriminan D dari persamaan kuadrat x² - 5x + 6 = 0?',
      latexQuestion: 'x^2 - 5x + 6 = 0',
      options: ['0', '1', '25', '-1'],
      correctAnswer: '1',
      explanation: 'D = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1.'
    },
    {
      id: 'q4',
      category: 'Geometri',
      question: 'Berapakah luas lingkaran dengan jari-jari r = 7 cm (gunakan π = 22/7)?',
      options: ['154 cm²', '44 cm²', '308 cm²', '49 cm²'],
      correctAnswer: '154 cm²',
      explanation: 'Luas = π × r² = (22/7) × 7 × 7 = 154 cm².'
    },
    {
      id: 'q5',
      category: 'Statistika',
      question: 'Berapakah nilai rata-rata (mean) dari data [4, 6, 8, 10, 12]?',
      options: ['6', '8', '10', '40'],
      correctAnswer: '8',
      explanation: 'Jumlah data = 4 + 6 + 8 + 10 + 12 = 40. Mean = 40 / 5 = 8.'
    }
  ];
}
