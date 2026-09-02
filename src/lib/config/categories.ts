import type { ToolCategory } from '../types/tool';

export const CATEGORIES: ToolCategory[] = [
  {
    id: 'aritmetika',
    name: 'Aritmetika',
    description: 'FPB, KPK, faktorisasi prima, pecahan, dan operasi dasar.',
    icon: 'Calculator',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'aljabar',
    name: 'Aljabar',
    description: 'Persamaan kuadrat, faktorisasi polinomial, dan penyederhanaan aljabar.',
    icon: 'Variable',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  },
  {
    id: 'geometri',
    name: 'Geometri',
    description: 'Kalkulator bangun datar 2D, bangun ruang 3D, dan tripel Pythagoras.',
    icon: 'Shapes',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: 'grafik',
    name: 'Grafik & Visualisasi',
    description: 'Plot grafik fungsi matematika, koordinat, dan analisis kurva.',
    icon: 'LineChart',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    id: 'transformasi',
    name: 'Transformasi',
    description: 'Translasi, refleksi, rotasi, dan dilatasi koordinat 2D.',
    icon: 'Move',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'
  },
  {
    id: 'himpunan',
    name: 'Himpunan',
    description: 'Diagram Venn interaktif, irisan, gabungan, dan selisih himpunan.',
    icon: 'CircleDot',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  },
  {
    id: 'statistika',
    name: 'Statistika',
    description: 'Mean, median, modus, varians, deviasi standar, dan diagram data.',
    icon: 'BarChart3',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  },
  {
    id: 'trigonometri',
    name: 'Trigonometri',
    description: 'Lingkaran satuan interaktif, sinus, kosinus, tangen, dan aturan segitiga.',
    icon: 'Compass',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  {
    id: 'kalkulus',
    name: 'Kalkulus',
    description: 'Limit fungsi, turunan, integral, dan garis singgung kurva.',
    icon: 'TrendingUp',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
  },
  {
    id: 'matriks',
    name: 'Matriks',
    description: 'Penjumlahan, perkalian, determinan, dan invers matriks.',
    icon: 'Grid',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  },
  {
    id: 'probabilitas',
    name: 'Probabilitas',
    description: 'Permutasi, kombinasi, distribusi binomial, dan simulasi dadu.',
    icon: 'Dices',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
  },
  {
    id: 'kalkulator',
    name: 'Kalkulator',
    description: 'Kalkulator ilmiah interaktif dengan riwayat perhitungan.',
    icon: 'Binary',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  }
];
