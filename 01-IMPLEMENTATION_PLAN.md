# Implementation Plan - GezyMath: Modern Interactive Mathematics Tools Platform

Dibuat berdasarkan spesifikasi pada [`00-PROMPT.md`](./00-PROMPT.md) dan diperbarui hingga tahap ekspansi penuh 22 modul interaktif.

## 1. Arsitektur & Teknologi Stack

- **Framework Frontend**: SvelteKit 5 + TypeScript + Vite
- **Styling**: Tailwind CSS + Vanilla CSS (Sleek dark/light mode, typography Inter/Outfit, glassmorphism UI, high-contrast light mode overrides)
- **Mathematical Notation**: KaTeX (`katex`) & KaTeX Auto-render
- **Icon Library**: Lucide Icons (`lucide-svelte`)
- **Testing Engine**: Vitest (`vitest`) untuk unit testing algoritma matematika
- **Deployment**: Static Site Generation (`@sveltejs/adapter-static`) untuk SPA/SSG client-side tanpa dependensi database server.

---

## 2. Struktur Folder & Kode Projek

```
gezymath/
├── src/
│   ├── lib/
│   │   ├── algorithms/       # Algoritma matematika murni (100% unit-tested)
│   │   │   ├── pythagoras.ts
│   │   │   ├── fpbKpk.ts
│   │   │   ├── quadratic.ts
│   │   │   ├── factorization.ts
│   │   │   ├── statistics.ts
│   │   │   ├── geometry.ts
│   │   │   ├── transformation.ts
│   │   │   ├── venn.ts
│   │   │   ├── calculator.ts
│   │   │   ├── matrix.ts
│   │   │   ├── spldv.ts
│   │   │   ├── sequences.ts
│   │   │   ├── calculus.ts
│   │   │   ├── probability.ts
│   │   │   ├── quiz.ts       # Generator kuis pilihan ganda & distraksi dinamis
│   │   │   └── worksheet.ts  # Generator lembar kerja 80+ subtopik & kunci jawaban
│   │   ├── components/       # Komponen UI & Visualisasi
│   │   │   ├── ui/           # Layout, Header, Sidebar, BottomNav, Card, Modal, ThemeToggle
│   │   │   ├── math/         # FormulaDisplay (KaTeX), MathInput, MatrixInput, CalculationSteps
│   │   │   └── visualizations/# Canvas/SVG Interaktif (Parabola, Venn, Geometri, Transformasi, Area Under Curve)
│   │   ├── config/           # Central Tool Registry
│   │   │   ├── tools.ts      # Registry 22 Alat Matematika (ID, nama, deskripsi, rute, ikon, kata kunci)
│   │   │   └── categories.ts # Daftar 12 Kategori Utama Matematika
│   │   ├── stores/           # Store state & localStorage (theme, favorit, recently used, search)
│   │   └── types/            # TypeScript Interface & Type Definition
│   ├── routes/
│   │   ├── +layout.svelte    # Container Layout utama (Sidebar + Header + Dark mode context)
│   │   ├── math/
│   │   │   ├── +page.svelte  # Dashboard Utama / Katalog 22 Alat Matematika
│   │   │   ├── worksheet/+page.svelte          # Generator Lembar Kerja Soal & PDF
│   │   │   ├── kuis-latihan/+page.svelte       # Kuis & Latihan Interaktif Multi-Topik
│   │   │   ├── tripel-pythagoras/+page.svelte
│   │   │   ├── fpb-kpk/+page.svelte
│   │   │   ├── persamaan-kuadrat/+page.svelte
│   │   │   ├── faktorisasi/+page.svelte
│   │   │   ├── kalkulator/+page.svelte
│   │   │   ├── grafik-fungsi/+page.svelte
│   │   │   ├── transformasi/+page.svelte
│   │   │   ├── diagram-venn/+page.svelte
│   │   │   ├── geometri/+page.svelte
│   │   │   ├── statistika/+page.svelte
│   │   │   ├── matriks/+page.svelte
│   │   │   ├── spldv/+page.svelte
│   │   │   ├── barisan-deret/+page.svelte
│   │   │   ├── logaritma/+page.svelte
│   │   │   ├── pangkat-akar/+page.svelte
│   │   │   ├── probabilitas/+page.svelte
│   │   │   ├── trigonometri/+page.svelte
│   │   │   ├── turunan/+page.svelte
│   │   │   ├── integral/+page.svelte
│   │   │   └── pecahan/+page.svelte
│   │   └── app.html
├── tests/                    # Unit testing algoritma matematika murni
│   ├── pythagoras.test.ts
│   ├── fpbKpk.test.ts
│   ├── quadratic.test.ts
│   ├── statistics.test.ts
│   ├── geometry.test.ts
│   └── matrix.test.ts
├── svelte.config.js
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 3. Daftar 22 Modul & Fitur Terimplementasi

| No | Modul / Alat | Rute | Deskripsi Singkat |
|:--:|:---|:---|:---|
| 1 | **Generator Lembar Kerja Soal & PDF** | `/math/worksheet` | Membuat PDF lembar kerja latihan soal 80+ subtopik beserta kunci jawaban & pembahasan siap cetak. |
| 2 | **Kuis & Latihan Interaktif Multi-Topik** | `/math/kuis-latihan` | Kuis acak interaktif dengan pilihan 35+ topik materi, pengatur jumlah soal (5-20), dan pembahasan otomatis. |
| 3 | **Tripel Pythagoras** | `/math/tripel-pythagoras` | Generator tripel Pythagoras dan kalkulator segitiga siku-siku interaktif. |
| 4 | **FPB & KPK** | `/math/fpb-kpk` | Perhitungan FPB/KPK dengan pohon faktor prima dan langkah Euklides. |
| 5 | **Persamaan Kuadrat** | `/math/persamaan-kuadrat` | Solusi $ax^2 + bx + c = 0$, diskriminan, titik puncak, dan grafik parabola. |
| 6 | **Sistem Linear (SPLDV)** | `/math/spldv` | Solusi SPLDV dengan Aturan Cramer & grafik titik potong garis. |
| 7 | **Kalkulator Matriks** | `/math/matriks` | Operasi matriks $2 \times 2$: Penjumlahan, Perkalian, Determinan $\det(A)$, dan Invers $A^{-1}$. |
| 8 | **Barisan & Deret** | `/math/barisan-deret` | Perhitungan suku $U_n$, jumlah $S_n$ Aritmetika & Geometri, serta deret tak hingga. |
| 9 | **Kalkulator Logaritma** | `/math/logaritma` | Hitung logaritma basis $a$, logaritma natural $\ln(x)$, dan analisis sifat logaritma. |
| 10 | **Perpangkatan & Akar** | `/math/pangkat-akar` | Perhitungan eksponen $a^n$ dan penyederhanaan bentuk radikal $\sqrt{N}$. |
| 11 | **Probabilitas & Kombinatorika** | `/math/probabilitas` | Permutasi $P(n,k)$, Kombinasi $C(n,k)$, Faktorial $n!$, dan Peluang $P(A)$. |
| 12 | **Kalkulator Trigonometri** | `/math/trigonometri` | Fungsi $\sin, \cos, \tan$, lingkaran satuan (*Unit Circle*), dan Aturan Kosinus. |
| 13 | **Turunan (Diferensial)** | `/math/turunan` | Hitung turunan $f'(x)$, gradien garis singgung, dan persamaan garis singgung. |
| 14 | **Integral Tentu & Tak Tentu** | `/math/integral` | Anti-turunan $F(x) + C$ dan luas daerah di bawah kurva dengan visualisasi interaktif. |
| 15 | **Faktorisasi Bilangan** | `/math/faktorisasi` | Faktorisasi prima, daftar semua faktor pembagi, dan pasangan faktor perkalian. |
| 16 | **Operasi Pecahan** | `/math/pecahan` | Perhitungan pecahan biasa, campuran, desimal, dan penyederhanaan otomatis. |
| 17 | **Kalkulator Ilmiah** | `/math/kalkulator` | Kalkulator ilmiah interaktif dengan dukungan LaTeX dan riwayat riwayat hitung. |
| 18 | **Grafik Fungsi** | `/math/grafik-fungsi` | Plotter grafik multi-fungsi interaktif dengan kontrol pan dan zoom. |
| 19 | **Transformasi Geometri** | `/math/transformasi` | Simulasi translasi, refleksi, rotasi, dan dilatasi pada bidang Kartesius. |
| 20 | **Diagram Venn Interaktif** | `/math/diagram-venn` | Visualisasi 2 & 3 himpunan dengan sorotan irisan, gabungan, dan selisih. |
| 21 | **Kalkulator Geometri** | `/math/geometri` | Hitung luas, keliling, volume, dan luas permukaan bangun 2D & 3D. |
| 22 | **Statistika Dasar** | `/math/statistika` | Perhitungan mean, median, modus, kuartil, varians, deviasi standar, & histogram. |

---

## 4. Tahapan Eksekusi yang Telah Diselesaikan

- [x] **Tahap 1: Fondasi Project & Konfigurasi** (SvelteKit 5, TypeScript, Tailwind CSS, Lucide Icons, KaTeX).
- [x] **Tahap 2: Algoritma Matematika Murni** (`src/lib/algorithms/*` + Unit Testing Vitest).
- [x] **Tahap 3: Central Tool Registry & State Store** (`tools.ts`, `categories.ts`, `userTools.ts` favorit/history/pencarian).
- [x] **Tahap 4: Komponen Reusable UI & Visualisasi** (`FormulaDisplay`, `CalculationSteps`, `ParabolaGraph`, `VennDiagramSVG`, `TransformationCanvas`, `AreaUnderCurveCanvas`).
- [x] **Tahap 5: Responsive Shell & Dashboard** (`+layout.svelte`, Modal Pencarian $Cmd+K$, Sidebar, Header).
- [x] **Tahap 6: Ekosistem 22 Modul Lengkap** (Termasuk Worksheet PDF Generator & Interactive Quiz Multi-Topik).
- [x] **Tahap 7: Optimasi Kontras Tema Terang (Light Mode)** (Penyempurnaan CSS global agar keterbacaan teks 100% jelas pada tema terang dan gelap).
