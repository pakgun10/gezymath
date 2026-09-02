<script lang="ts">
	import { onMount } from 'svelte';
	import { generateWorksheet, type WorksheetOptions } from '$lib/algorithms/worksheet';
	import { recentStore } from '$lib/stores/userTools';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { Printer, RefreshCw, FileText, CheckSquare } from 'lucide-svelte';

	let title = $state('LEMBAR KERJA MATEMATIKA');
	let schoolName = $state('SMP / SMA GEZYTECH');
	let teacherName = $state('Pak Gun');
	let date = $state(new Date().toISOString().split('T')[0]);
	let topic = $state('random');
	let level = $state<'SD' | 'SMP' | 'SMA'>('SMA');
	let count = $state(10);
	let includeAnswers = $state(true);

	let options = $derived<WorksheetOptions>({
		title,
		schoolName,
		teacherName,
		date,
		topic,
		level,
		count: Number(count) || 10,
		includeAnswers
	});

	let problems = $state(generateWorksheet({
		title: 'LEMBAR KERJA MATEMATIKA',
		schoolName: 'SMP / SMA GEZYTECH',
		teacherName: 'Pak Gun',
		date: new Date().toISOString().split('T')[0],
		topic: 'random',
		level: 'SMA',
		count: 10,
		includeAnswers: true
	}));

	function handleRegenerate() {
		problems = generateWorksheet(options);
	}

	function handlePrint() {
		window.print();
	}

	onMount(() => {
		recentStore.addRecent('worksheet');
	});
</script>

<svelte:head>
	<title>Generator Lembar Kerja Soal & PDF | GezyMath</title>
	<meta
		name="description"
		content="Generator lembar kerja soal matematika otomatis dan kunci jawaban siap cetak ke PDF untuk pengajar dan siswa."
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Top Controls (Hidden during print) -->
	<div class="print:hidden space-y-6">
		<div class="flex items-center justify-between">
			<div class="space-y-2">
				<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
					<FileText class="w-3.5 h-3.5" />
					<span>Generator Lembar Kerja</span>
				</div>
				<h1 class="text-3xl font-extrabold font-heading text-slate-100">Generator Soal & PDF Siap Cetak</h1>
				<p class="text-slate-400 text-sm max-w-2xl">
					Buat lembar kerja latihan soal matematika otomatis beserta kunci jawaban & pembahasan yang siap di-print/disimpan ke PDF.
				</p>
			</div>

			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={handleRegenerate}
					class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
				>
					<RefreshCw class="w-4 h-4" />
					<span>Acak Soal Baru</span>
				</button>
				<button
					type="button"
					onclick={handlePrint}
					class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
				>
					<Printer class="w-4 h-4" />
					<span>Cetak / Simpan PDF</span>
				</button>
			</div>
		</div>

		<!-- Configuration Card -->
		<div class="glass-panel p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="space-y-1.5">
				<label class="text-xs font-semibold text-slate-400">Judul Lembar Kerja</label>
				<input bind:value={title} type="text" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
			</div>

			<div class="space-y-1.5">
				<label class="text-xs font-semibold text-slate-400">Nama Sekolah / Instansi</label>
				<input bind:value={schoolName} type="text" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
			</div>

			<div class="space-y-1.5">
				<label class="text-xs font-semibold text-slate-400">Topik Matematika</label>
				<select bind:value={topic} onchange={handleRegenerate} class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
					<option value="random">🌟 Acak Semua Topik</option>
					<optgroup label="── Bilangan ──">
						<option value="bilangan-bulat">Bilangan Bulat</option>
						<option value="bilangan-prima">Bilangan Prima</option>
						<option value="pecahan-desimal">Pecahan & Desimal</option>
						<option value="perbandingan">Perbandingan & Skala</option>
						<option value="pangkat-akar">Bilangan Berpangkat & Akar</option>
						<option value="notasi-ilmiah">Notasi Ilmiah</option>
						<option value="konversi-satuan">Konversi Satuan</option>
						<option value="fpb-kpk">FPB & KPK</option>
					</optgroup>
					<optgroup label="── Aljabar ──">
						<option value="bentuk-aljabar">Bentuk & Operasi Aljabar</option>
						<option value="aljabar-dasar">Persamaan Linear (PLSV / PtLSV)</option>
						<option value="spldv">SPLDV</option>
						<option value="quadratic">Persamaan Kuadrat</option>
						<option value="pola-barisan">Pola & Barisan Bilangan</option>
						<option value="deret">Deret Aritmetika & Geometri</option>
					</optgroup>
					<optgroup label="── Relasi & Fungsi ──">
						<option value="relasi-domain">Relasi, Domain & Range</option>
						<option value="fungsi-linear">Fungsi & Persamaan Garis Lurus</option>
						<option value="fungsi-nonlinear">Fungsi Nonlinear / Kuadrat</option>
					</optgroup>
					<optgroup label="── Geometri Bidang ──">
						<option value="geometri-bidang">Geometri Bidang (Segitiga, Persegi, Lingkaran)</option>
						<option value="geometri-bidang-lanjut">Geometri Bidang Lanjut (Trapesium, Belah Ketupat, dll)</option>
						<option value="sudut-garis">Hubungan Antar Sudut & Garis Sejajar</option>
						<option value="kesebangunan">Kesebangunan & Kekongruenan</option>
						<option value="pythagoras">Tripel Pythagoras</option>
					</optgroup>
					<optgroup label="── Geometri Ruang ──">
						<option value="geometri-ruang">Geometri Ruang (Kubus, Balok, Tabung)</option>
						<option value="geometri-ruang-lanjut">Geometri Ruang Lanjut (Limas, Kerucut, Bola)</option>
					</optgroup>
					<optgroup label="── Transformasi & Koordinat ──">
						<option value="transformasi">Transformasi Geometri Dasar</option>
						<option value="komposisi-transformasi">Komposisi Transformasi</option>
						<option value="koordinat">Koordinat Kartesius</option>
					</optgroup>
					<optgroup label="── Statistika ──">
						<option value="statistika">Statistika (Mean, Median, Modus)</option>
						<option value="statistika-lanjut">Statistika Lanjut (Kuartil, Jangkauan)</option>
					</optgroup>
					<optgroup label="── Peluang ──">
						<option value="peluang">Peluang Dasar</option>
						<option value="peluang-lanjut">Peluang Lanjut & Kaidah Pencacahan</option>
					</optgroup>
					<optgroup label="── Matematika Terapan ──">
						<option value="aritmetika-sosial">Aritmetika Sosial (Untung/Rugi, Diskon, Bunga)</option>
						<option value="aritmetika-lanjut">Aritmetika Terapan (Pajak, Bruto/Neto)</option>
						<option value="fraction">Pecahan (Operasi Dasar)</option>
					</optgroup>
					<optgroup label="── Lanjutan ──">
						<option value="trigonometri">Trigonometri</option>
						<option value="calculus">Kalkulus (Turunan)</option>
					</optgroup>
				</select>
			</div>

			<div class="space-y-1.5">
				<label class="text-xs font-semibold text-slate-400">Jumlah Soal</label>
				<select bind:value={count} onchange={handleRegenerate} class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
					<option value={5}>5 Soal</option>
					<option value={10}>10 Soal</option>
					<option value={15}>15 Soal</option>
					<option value={20}>20 Soal</option>
				</select>
			</div>

			<div class="col-span-full flex items-center justify-between pt-2 border-t border-slate-800/80">
				<label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
					<input type="checkbox" bind:checked={includeAnswers} class="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500" />
					<span>Sertakan Kunci Jawaban & Pembahasan Lengkap di Halaman Akhir</span>
				</label>
			</div>
		</div>
	</div>

	<!-- Printable Worksheet Area -->
	<div class="bg-slate-950 text-slate-100 print:bg-white print:text-slate-950 p-8 rounded-2xl border border-slate-800 print:border-none shadow-2xl print:shadow-none space-y-8">
		<!-- Header Paper -->
		<div class="border-b-2 border-slate-700 print:border-slate-900 pb-6 text-center space-y-2">
			<h2 class="text-2xl font-extrabold uppercase tracking-wide font-heading">{title}</h2>
			<div class="text-sm font-medium text-slate-400 print:text-slate-700 flex items-center justify-center gap-6">
				<span>Sekolah: <strong>{schoolName}</strong></span>
				<span>Pengajar: <strong>{teacherName}</strong></span>
				<span>Tanggal: <strong>{date}</strong></span>
			</div>

			<!-- Student info fields -->
			<div class="pt-4 grid grid-cols-2 gap-4 text-xs font-mono border-t border-dashed border-slate-800 print:border-slate-300">
				<div class="text-left">Nama Siswa: ___________________________</div>
				<div class="text-right">Kelas / No. Absen: _______________</div>
			</div>
		</div>

		<!-- Questions List -->
		<div class="space-y-6">
			<div class="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 border-b border-slate-800 print:border-slate-300 pb-2">
				Petunjuk: Jawablah pertanyaan di bawah ini dengan tepat dan tunjukkan langkah penyelesaiannya!
			</div>

			<div class="grid grid-cols-1 gap-6">
				{#each problems as p (p.id)}
					<div class="space-y-2 text-sm border-b border-slate-900 print:border-slate-200 pb-4">
						<div class="font-bold flex items-start gap-2">
							<span class="px-2 py-0.5 rounded bg-slate-800 print:bg-slate-200 text-indigo-400 print:text-slate-900 text-xs font-mono">{p.id}.</span>
							<span class="text-slate-200 print:text-slate-900">{p.questionText}</span>
						</div>

						{#if p.questionLatex}
							<div class="pl-7 py-1">
								<FormulaDisplay latex={p.questionLatex} displayMode={true} />
							</div>
						{/if}

						<!-- Answer space area for paper print -->
						<div class="pl-7 pt-4 text-xs text-slate-600 print:text-slate-400 font-mono italic">
							Jawaban / Catatan: __________________________________________________________________
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Answer Key Section (If toggled) -->
		{#if includeAnswers}
			<div class="pt-12 border-t-2 border-dashed border-slate-700 print:border-slate-900 space-y-6 page-break-before">
				<div class="text-center space-y-1">
					<h3 class="text-xl font-bold uppercase font-heading text-emerald-400 print:text-slate-950">KUNCI JAWABAN & PEMBAHASAN LENGKAP</h3>
					<p class="text-xs text-slate-400 print:text-slate-600">Dokumen Pegangan Pengajar — GezyMath Platform</p>
				</div>

				<div class="grid grid-cols-1 gap-4">
					{#each problems as p}
						<div class="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2 text-xs">
							<div class="font-bold text-slate-200 print:text-slate-900 flex items-center justify-between">
								<span>Soal No. {p.id} ({p.topic})</span>
								<span class="text-emerald-400 print:text-emerald-700 font-mono">Kunci: {p.answerText}</span>
							</div>

							<div class="space-y-1 text-slate-400 print:text-slate-700 font-mono pl-3 border-l-2 border-emerald-500">
								{#each p.solutionSteps as step}
									<div>• {step}</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@media print {
		:global(body) {
			background: white !important;
			color: black !important;
		}
		.page-break-before {
			page-break-before: always;
		}
	}
</style>
