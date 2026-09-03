# GezyMath — Modern Interactive Mathematics Tools Platform

![SvelteKit](https://img.shields.io/badge/SvelteKit-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![KaTeX](https://img.shields.io/badge/KaTeX-LaTeX-11AA00?style=for-the-badge&logo=katex&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

**GezyMath** adalah platform web modern interaktif berbasis SvelteKit yang dirancang khusus untuk pembelajaran, visualisasi, dan perhitungan matematika bagi siswa SD, SMP, SMA, maupun pengajar.

---

## 🌟 Fitur Utama

- 🛠️ **22 Modul & Alat Matematika Interaktif**: Menjangkau Aritmetika, Aljabar, Geometri Bidang & Ruang, Trigonometri, Kalkulus (Turunan & Integral), Statistika, Probabilitas, SPLDV, Matriks, hingga Diagram Venn.
- 📄 **Generator Lembar Kerja Soal & PDF (`/math/worksheet`)**: Generator otomatis lembar kerja latihan matematika 80+ subtopik dilengkapi kunci jawaban & pembahasan lengkap yang siap di-print/disimpan ke PDF.
- 🎯 **Kuis & Latihan Interaktif Multi-Topik (`/math/kuis-latihan`)**: Latihan soal pilihan ganda dinamis dengan pilihan 35+ materi matematika, pengatur jumlah soal (5–20 soal), skor otomatis berskala 100, dan pembahasan rinci per soal.
- 📐 **Visualisasi Interaktif & Rumus KaTeX**: Grafik Parabola, Multi-Function Graphing, Diagram Venn interaktif, Visualisasi Transformasi Geometri, Luas Daerah di Bawah Kurva Integral, dan Notasi Matematika KaTeX presisi tinggi.
- 🌓 **Dukungan Dark & Light Mode**: Desain modern berbasis glassmorphism dengan kontras tinggi yang nyaman di mata pada mode terang (*light theme*) maupun mode gelap (*dark theme*).
- 🚀 **Performa Tinggi Client-Side (SPA/SSG)**: 100% berjalan lancar di browser tanpa perlu server database backend.

---

## 📚 Daftar 22 Modul Matematika

| Modul / Alat | Rute | Kategori | Tingkat |
|:---|:---|:---|:---|
| **Generator Lembar Kerja & PDF** | `/math/worksheet` | Kalkulator / Tools | SD / SMP / SMA |
| **Kuis & Latihan Interaktif** | `/math/kuis-latihan` | Latihan / Tools | SD / SMP / SMA |
| **Tripel Pythagoras** | `/math/tripel-pythagoras` | Geometri | SMP |
| **FPB & KPK** | `/math/fpb-kpk` | Aritmetika | SD |
| **Persamaan Kuadrat** | `/math/persamaan-kuadrat` | Aljabar | SMP |
| **Sistem Linear (SPLDV)** | `/math/spldv` | Aljabar | SMP |
| **Kalkulator Matriks (2x2)** | `/math/matriks` | Aljabar / Matriks | SMA |
| **Barisan & Deret** | `/math/barisan-deret` | Aljabar | SMA |
| **Kalkulator Logaritma** | `/math/logaritma` | Aljabar | SMA |
| **Perpangkatan & Akar** | `/math/pangkat-akar` | Aritmetika | SMP |
| **Probabilitas & Kombinatorika** | `/math/probabilitas` | Peluang | SMA |
| **Kalkulator Trigonometri** | `/math/trigonometri` | Trigonometri | SMA |
| **Turunan (Diferensial)** | `/math/turunan` | Kalkulus | SMA |
| **Integral Tentu & Tak Tentu** | `/math/integral` | Kalkulus | SMA |
| **Faktorisasi Bilangan** | `/math/faktorisasi` | Aritmetika | SD |
| **Operasi Pecahan** | `/math/pecahan` | Aritmetika | SD |
| **Kalkulator Ilmiah** | `/math/kalkulator` | Kalkulator | Umum |
| **Grafik Fungsi** | `/math/grafik-fungsi` | Grafik | SMA |
| **Transformasi Geometri** | `/math/transformasi` | Geometri / Transformasi | SMP |
| **Diagram Venn Interaktif** | `/math/diagram-venn` | Himpunan | SMP |
| **Kalkulator Geometri 2D & 3D** | `/math/geometri` | Geometri | SD / SMP |
| **Statistika Dasar** | `/math/statistika` | Statistika | SMP / SMA |

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: [SvelteKit 5](https://kit.svelte.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Glassmorphism
- **Notasi Matematika**: [KaTeX](https://katex.org/)
- **Ikon**: [Lucide Svelte](https://lucide.dev/)
- **Unit Testing**: [Vitest](https://vitest.dev/)
- **Adapter**: `@sveltejs/adapter-static` (Single Page Application / Static Site Generation)

---

## 🚀 Cara Menjalankan Projek secara Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan) dan `npm`.

### 2. Kloning Repository & Install Dependensi
```bash
git clone https://github.com/pakgun10/gezymath.git
cd gezymath
npm install
```

### 3. Menjalankan Mode Pengembang (Development Server)
```bash
npm run dev
```
Buka browser dan akses alamat `http://localhost:5173/math`.

### 4. Menjalankan Unit Testing Algoritma
```bash
npm run test
```

### 5. Pengecekan Type & Linting
```bash
npm run check
```

### 6. Build Produk & Preview Production
```bash
npm run build
npm run preview
```

---

## 📄 Lisensi & Hak Cipta

© 2026 **GezyMath Platform** by Pak Gun. All rights reserved.
