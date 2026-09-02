# Implementation Plan - GezyMath: Modern Interactive Mathematics Tools Platform

Dibuat berdasarkan spesifikasi pada [`00-PROMPT.md`](./00-PROMPT.md).

## 1. Arsitektur & Teknologi Stack

- **Framework Frontend**: SvelteKit + TypeScript + Vite
- **Styling**: Tailwind CSS (Sleek dark/light mode, typography modern, glassmorphism UI)
- **Mathematical Notation**: KaTeX (`katex`)
- **Icon Library**: Lucide Icons (`lucide-svelte`)
- **Testing Engine**: Vitest (`vitest`) untuk unit testing algoritma matematika
- **Deployment**: Static Site Generation (`@sveltejs/adapter-static`) untuk SPA/SSG di client-side tanpa backend database.

---

## 2. Struktur Folder & Kode

```
gezymath/
├── src/
│   ├── lib/
│   │   ├── algorithms/       # Algoritma matematika murni (100% testable)
│   │   │   ├── pythagoras.ts
│   │   │   ├── fpbKpk.ts
│   │   │   ├── quadratic.ts
│   │   │   ├── factorization.ts
│   │   │   ├── statistics.ts
│   │   │   ├── geometry.ts
│   │   │   ├── transformation.ts
│   │   │   ├── venn.ts
│   │   │   └── calculator.ts
│   │   ├── components/       # Komponen UI & Visualisasi terpisah
│   │   │   ├── ui/           # Layout, Header, Sidebar, BottomNav, Card, Modal, ThemeToggle
│   │   │   ├── math/         # FormulaDisplay (KaTeX), MathInput, MatrixInput, Steps
│   │   │   └── visualizations/# Canvas/SVG Interaktif (Grafik, Parabola, Venn, Geometri, Transformasi)
│   │   ├── config/           # Central Tool Registry
│   │   │   ├── tools.ts      # Metadata semua alat matematika (ID, nama, kategori, ikon, keywords, dsb)
│   │   │   └── categories.ts # Daftar 12 kategori utama matematika
│   │   ├── stores/           # Store state & localStorage (theme, favorit, recently used, search)
│   │   └── types/            # TypeScript Interface & Type Definition
│   ├── routes/
│   │   ├── +layout.svelte    # Container Layout utama (Sidebar + Navigation + Dark mode context)
│   │   ├── math/
│   │   │   ├── +page.svelte  # Dashboard Utama / Homepage Alat Matematika
│   │   │   ├── tripel-pythagoras/+page.svelte
│   │   │   ├── fpb-kpk/+page.svelte
│   │   │   ├── persamaan-kuadrat/+page.svelte
│   │   │   ├── faktorisasi/+page.svelte
│   │   │   ├── kalkulator/+page.svelte
│   │   │   ├── grafik-fungsi/+page.svelte
│   │   │   ├── transformasi/+page.svelte
│   │   │   ├── diagram-venn/+page.svelte
│   │   │   ├── geometri/+page.svelte
│   │   │   └── statistika/+page.svelte
│   └── app.html
├── tests/                    # Unit testing algoritma matematika murni
│   ├── pythagoras.test.ts
│   ├── fpbKpk.test.ts
│   ├── quadratic.test.ts
│   ├── statistics.test.ts
│   └── geometry.test.ts
├── svelte.config.js
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 3. Tahapan Eksekusi (Implementation Steps)

### Tahap 1: Inisialisasi Fondasi Project & Konfigurasi
1. Inisialisasi SvelteKit + TypeScript dalam folder `gezymath`.
2. Pasang Tailwind CSS & konfigurasikan tema visual (Dark/Light mode, font Inter/Outfit, glassmorphism, shadow halus).
3. Install package utama: `lucide-svelte`, `katex`, `@sveltejs/adapter-static`, `vitest`.
4. Buat type interface metadata alat (`Tool`, `ToolCategory`, `CalculationResult`, `Step`).

### Tahap 2: Algoritma Matematika Murni (`src/lib/algorithms`) & Unit Tests
Implementasikan modul algoritma matematika yang dapat diuji independen dari UI:
1. **Tripel Pythagoras**: Algoritma pembentuk tripel $(a, b, c)$ hingga batas $N$, filter tripel primitif.
2. **FPB & KPK**: Algoritma Euklides, faktorisasi prima, dan generator langkah penyelesaian.
3. **Persamaan Kuadrat**: Perhitungan diskriminan $D = b^2 - 4ac$, akar-akar (real/imajiner), titik puncak $(h, k)$, sumbu simetri.
4. **Faktorisasi**: Faktorisasi prima (pohon faktor) & faktor bilangan bulat.
5. **Statistika**: Rata-rata (mean), median, modus, jangkauan (range), varians, deviasi standar, kuartil ($Q_1, Q_2, Q_3$).
6. **Geometri**: Luas, keliling, volume, dan luas permukaan bangun datar (2D) & bangun ruang (3D).
7. **Transformasi Geometri**: Translasi, Refleksi, Rotasi, dan Dilatasi koordinat 2D.
8. **Diagram Venn**: Operasi 2 & 3 himpunan ($\cap, \cup, -, A^c$).
9. **Kalkulator Ilmiah**: Evaluator ekspresi matematika ilmiah dengan histori.

### Tahap 3: Central Tool Registry & State Management
1. `src/lib/config/tools.ts`: Buat registry terpusat berisi metadata semua alat matematika (id, title, description, category, route, icon, keywords, popular, level).
2. Store LocalStorage: Manajemen tema (`theme`), alat favorit (`favorites`), dan alat yang baru dilihat (`recentTools`).
3. Store Pencarian Global: Pencarian cepat client-side berdasarkan judul, kata kunci Indonesia, dan kategori.

### Tahap 4: Komponen Reusable UI & Visualisasi
1. **KaTeX Formula Display (`FormulaDisplay.svelte`)**: Komponen penampil rumus matematika rapi dengan tombol salin (Copy LaTeX).
2. **Langkah Perhitungan (`CalculationSteps.svelte`)**: Panel akordeon interaktif penjelas langkah-langkah penyelesaian matematika.
3. **Input Interaktif**: `MathInput.svelte`, `NumberInput.svelte`, `MatrixInput.svelte`, `SetInput.svelte`.
4. **Visualisasi Interaktif (Canvas/SVG)**:
   - `RightTriangleCanvas.svelte` (Visual Segitiga Pythagoras)
   - `ParabolaGraph.svelte` (Grafik Parabola Persamaan Kuadrat)
   - `FunctionGraphCanvas.svelte` (Grafik Multi-Fungsi dengan Pan & Zoom)
   - `VennDiagramSVG.svelte` (Diagram Venn interaktif yang menyorot wilayah saat diklik)
   - `TransformationCanvas.svelte` (Bidang Kartesius untuk Objek Asal & Hasil Transformasi)
   - `GeometryDiagram.svelte` (Diagram bangun datar/ruang interaktif dengan slider dimensi)
   - `StatisticsChart.svelte` (Diagram Batang, Histogram, & Box Plot)

### Tahap 5: Responsive Shell & Dashboard `/math`
1. Layout (`+layout.svelte`): Sidebar desktop, header dengan modal pencarian global ($Cmd+K$), bottom nav mobile, toggle dark mode.
2. Dashboard (`/math/+page.svelte`):
   - Hero section dengan input pencarian cepat.
   - Filter kategori interaktif.
   - Section Alat Populer & Baru Saja Digunakan.
   - Grid Card Alat Matematika responsif.
   - Widget kalkulator cepat.

### Tahap 6: Implementasi 10 Halaman Alat MVP
Implementasikan tata letak 4 panel (Input Panel | Result Panel | Visualisation Panel | Educational Explanation) untuk:
1. `/math/tripel-pythagoras`
2. `/math/fpb-kpk`
3. `/math/persamaan-kuadrat`
4. `/math/faktorisasi`
5. `/math/kalkulator`
6. `/math/grafik-fungsi`
7. `/math/transformasi`
8. `/math/diagram-venn`
9. `/math/geometri`
10. `/math/statistika`

---

## 4. Rencana Verifikasi & Pengujian

### Pengujian Otomatis (Unit Tests)
- Jalankan `npm run test` via Vitest untuk menguji seluruh fungsi algoritma matematika (`src/lib/algorithms/*`).

### Pengujian Manual & UI
- Verifikasi tampilan responsif di layar Mobile (375px), Tablet (768px), dan Desktop (1440px).
- Verifikasi rendering rumus KaTeX dan fungsionalitas Dark Mode.
- Uji navigasi keyboard ($Tab$, $Enter$, $Cmd+K$).
