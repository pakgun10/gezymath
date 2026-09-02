import type { Tool } from '../types/tool';

export const TOOLS: Tool[] = [
  {
    id: 'tripel-pythagoras',
    title: 'Tripel Pythagoras',
    description: 'Kalkulator & generator tripel Pythagoras interaktif dengan visualisasi segitiga siku-siku.',
    category: 'geometri',
    route: '/math/tripel-pythagoras',
    icon: 'Triangle',
    keywords: ['pythagoras', 'segitiga', 'siku-siku', 'sisi miring', 'hipotenusa', 'tripel'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: true
  },
  {
    id: 'fpb-kpk',
    title: 'FPB & KPK',
    description: 'Hitung Faktor Persekutuan Terbesar & Kelipatan Persekutuan Terkecil dengan pohon faktor prima.',
    category: 'aritmetika',
    route: '/math/fpb-kpk',
    icon: 'Calculator',
    keywords: ['fpb', 'kpk', 'faktor', 'kelipatan', 'prima', 'pembagi'],
    popular: true,
    educationalLevel: 'SD',
    isMVP: true
  },
  {
    id: 'persamaan-kuadrat',
    title: 'Persamaan Kuadrat',
    description: 'Solusi ax² + bx + c = 0, diskriminan D, akar real/kompleks, titik puncak, dan grafik parabola.',
    category: 'aljabar',
    route: '/math/persamaan-kuadrat',
    icon: 'Variable',
    keywords: ['kuadrat', 'parabola', 'diskriminan', 'akar', 'puncak', 'simetri'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: true
  },
  {
    id: 'matriks',
    title: 'Kalkulator Matriks',
    description: 'Operasi matriks 2x2: Penjumlahan, perkalian, determinan det(A), dan invers matriks A⁻¹.',
    category: 'matriks',
    route: '/math/matriks',
    icon: 'Grid',
    keywords: ['matriks', 'determinan', 'invers', 'ordo', 'penjumlahan', 'perkalian'],
    popular: true,
    educationalLevel: 'SMA',
    isMVP: false
  },
  {
    id: 'spldv',
    title: 'Sistem Linear (SPLDV)',
    description: 'Penyelesaian Sistem Persamaan Linear Dua Variabel dengan Metode Aturan Cramer & grafik persilangan.',
    category: 'aljabar',
    route: '/math/spldv',
    icon: 'Variable',
    keywords: ['spldv', 'linear', 'sistem', 'variabel', 'cramer', 'eliminasi', 'substitusi'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: false
  },
  {
    id: 'pecahan',
    title: 'Operasi Pecahan',
    description: 'Kalkulator pecahan biasa, campuran, desimal, dan penyederhanaan otomatis.',
    category: 'aritmetika',
    route: '/math/pecahan',
    icon: 'Binary',
    keywords: ['pecahan', 'fraction', 'pembilang', 'penyebut', 'desimal', 'campuran'],
    popular: true,
    educationalLevel: 'SD',
    isMVP: false
  },
  {
    id: 'kuis-latihan',
    title: 'Kuis & Latihan Interaktif',
    description: 'Uji pemahaman matematika dengan kuis acak interaktif dan penjelasan solusi otomatis.',
    category: 'kalkulator',
    route: '/math/kuis-latihan',
    icon: 'Sparkles',
    keywords: ['kuis', 'latihan', 'soal', 'ujian', 'praktik', 'jawaban'],
    popular: true,
    educationalLevel: 'Umum',
    isMVP: false
  },
  {
    id: 'faktorisasi',
    title: 'Faktorisasi Bilangan',
    description: 'Faktorisasi prima, daftar semua faktor pembagi, dan pasangan faktor perkalian.',
    category: 'aritmetika',
    route: '/math/faktorisasi',
    icon: 'Binary',
    keywords: ['faktorisasi', 'faktor', 'prima', 'komposit', 'pembagi'],
    popular: false,
    educationalLevel: 'SD',
    isMVP: true
  },
  {
    id: 'kalkulator',
    title: 'Kalkulator Ilmiah',
    description: 'Kalkulator matematika interaktif dengan dukungan rumus LaTeX, fungsi trigonometri, dan riwayat.',
    category: 'kalkulator',
    route: '/math/kalkulator',
    icon: 'Calculator',
    keywords: ['kalkulator', 'hitung', 'ilmiah', 'scientific', 'riwayat'],
    popular: true,
    educationalLevel: 'Umum',
    isMVP: true
  },
  {
    id: 'grafik-fungsi',
    title: 'Grafik Fungsi',
    description: 'Plotter grafik fungsi matematika interaktif dengan dukungan multi-fungsi, pan, dan zoom.',
    category: 'grafik',
    route: '/math/grafik-fungsi',
    icon: 'LineChart',
    keywords: ['grafik', 'plot', 'fungsi', 'kartesius', 'kurva', 'domain', 'range'],
    popular: true,
    educationalLevel: 'SMA',
    isMVP: true
  },
  {
    id: 'transformasi',
    title: 'Transformasi Geometri',
    description: 'Simulasi interaktif translasi, refleksi, rotasi, dan dilatasi pada bidang Kartesius.',
    category: 'transformasi',
    route: '/math/transformasi',
    icon: 'Move',
    keywords: ['transformasi', 'translasi', 'refleksi', 'pencerminan', 'rotasi', 'dilatasi'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: true
  },
  {
    id: 'diagram-venn',
    title: 'Diagram Venn Interaktif',
    description: 'Visualisasi diagram Venn 2 & 3 himpunan dengan sorotan daerah irisan, gabungan, dan selisih.',
    category: 'himpunan',
    route: '/math/diagram-venn',
    icon: 'CircleDot',
    keywords: ['venn', 'himpunan', 'irisan', 'gabungan', 'selisih', 'komplemen', 'set'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: true
  },
  {
    id: 'geometri',
    title: 'Kalkulator Geometri',
    description: 'Kalkulator luas, keliling, volume, dan luas permukaan untuk bangun datar (2D) & ruang (3D).',
    category: 'geometri',
    route: '/math/geometri',
    icon: 'Shapes',
    keywords: ['geometri', 'luas', 'keliling', 'volume', 'persegi', 'lingkaran', 'kubus', 'tabung', 'bola'],
    popular: true,
    educationalLevel: 'SD',
    isMVP: true
  },
  {
    id: 'statistika',
    title: 'Statistika Dasar',
    description: 'Hitung mean, median, modus, varians, deviasi standar, kuartil, serta grafik diagram data.',
    category: 'statistika',
    route: '/math/statistika',
    icon: 'BarChart3',
    keywords: ['statistika', 'mean', 'rata-rata', 'median', 'modus', 'varians', 'kuartil', 'histogram'],
    popular: true,
    educationalLevel: 'SMP',
    isMVP: true
  }
];

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}
