<script lang="ts">
	import { onMount } from 'svelte';
	import { generateQuizQuestions, type QuizQuestion } from '$lib/algorithms/quiz';
	import { recentStore } from '$lib/stores/userTools';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy, RefreshCw, Layers } from 'lucide-svelte';

	let topic = $state('random');
	let count = $state(5);

	let questions = $state<QuizQuestion[]>([]);
	let currentIndex = $state(0);
	let selectedOption = $state<string | null>(null);
	let isSubmitted = $state(false);
	let correctCount = $state(0);
	let quizFinished = $state(false);

	function startQuiz() {
		questions = generateQuizQuestions({ topic, count: Number(count) });
		currentIndex = 0;
		selectedOption = null;
		isSubmitted = false;
		correctCount = 0;
		quizFinished = false;
	}

	onMount(() => {
		startQuiz();
		recentStore.addRecent('kuis-latihan');
	});

	let currentQ = $derived(questions[currentIndex]);
	let score = $derived(questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0);

	function handleSelect(opt: string) {
		if (isSubmitted) return;
		selectedOption = opt;
	}

	function handleSubmit() {
		if (!selectedOption) return;
		isSubmitted = true;
		if (selectedOption === currentQ.correctAnswer) {
			correctCount++;
		}
	}

	function handleNext() {
		if (currentIndex < questions.length - 1) {
			currentIndex++;
			selectedOption = null;
			isSubmitted = false;
		} else {
			quizFinished = true;
		}
	}

	function handleRestart() {
		startQuiz();
	}
</script>

<svelte:head>
	<title>Kuis & Latihan Matematika Interaktif | GezyMath</title>
	<meta
		name="description"
		content="Uji pemahaman matematika Anda dengan kuis interaktif acak. Pilih topik materi lengkap seperti Bilangan, Aljabar, Geometri, Trigonometri, dan Statistika."
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
				<Sparkles class="w-3.5 h-3.5" />
				<span>Latihan Interaktif Multi-Topik</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kuis & Latihan Matematika</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Pilih topik materi yang ingin Anda latih atau uji tingkat pemahaman Anda dengan soal pilihan ganda interaktif beserta pembahasan lengkap.
			</p>
		</div>

		<button
			type="button"
			onclick={startQuiz}
			class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all shrink-0 self-start md:self-auto"
		>
			<RefreshCw class="w-4 h-4" />
			<span>Mulai Kuis Baru</span>
		</button>
	</div>

	<!-- Configuration Controls (Topic & Question Count Selection) -->
	<div class="glass-panel p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
		<div class="md:col-span-2 space-y-1.5">
			<label class="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
				<Layers class="w-3.5 h-3.5 text-indigo-400" />
				<span>Pilih Topik Materi Matematika</span>
			</label>
			<select bind:value={topic} onchange={startQuiz} class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
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
			<label class="text-xs font-semibold text-slate-400">Jumlah Soal Kuis</label>
			<select bind:value={count} onchange={startQuiz} class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
				<option value={5}>5 Soal</option>
				<option value={10}>10 Soal</option>
				<option value={15}>15 Soal</option>
				<option value={20}>20 Soal</option>
			</select>
		</div>
	</div>

	<!-- Quiz Main Content -->
	{#if quizFinished}
		<div class="glass-panel p-8 rounded-3xl border border-indigo-500/30 text-center max-w-xl mx-auto space-y-6">
			<div class="p-4 rounded-full bg-indigo-500/10 text-indigo-400 w-16 h-16 mx-auto flex items-center justify-center">
				<Trophy class="w-8 h-8 text-amber-400" />
			</div>
			<div class="space-y-2">
				<h2 class="text-2xl font-bold font-heading text-slate-100">Kuis Selesai!</h2>
				<p class="text-slate-400 text-xs font-mono">
					Jawaban Benar: {correctCount} dari {questions.length} Soal
				</p>
			</div>
			<div class="text-5xl font-extrabold font-mono text-indigo-400">{score} / 100</div>
			<p class="text-slate-300 text-sm">
				{score >= 80 ? 'Luar biasa! Pemahaman konsep Anda untuk materi ini sangat solid.' : score >= 60 ? 'Bagus! Anda sudah cukup memahami materi ini, terus berlatih!' : 'Terus semangat! Cobalah pelajari teori dan latih kembali soal-soal ini.'}
			</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
				<button
					type="button"
					onclick={handleRestart}
					class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
				>
					<RotateCcw class="w-4 h-4" />
					<span>Ulangi Kuis Topik Ini</span>
				</button>
			</div>
		</div>
	{:else if currentQ}
		<div class="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 max-w-3xl mx-auto">
			<!-- Header Progress -->
			<div class="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3">
				<span>Soal {currentIndex + 1} dari {questions.length}</span>
				<span class="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{currentQ.category}</span>
				<span>Benar: {correctCount} / {questions.length}</span>
			</div>

			<!-- Question Text -->
			<div class="space-y-3">
				<h3 class="text-lg font-bold text-slate-100 leading-relaxed">{currentQ.question}</h3>
				{#if currentQ.latexQuestion}
					<FormulaDisplay latex={currentQ.latexQuestion} displayMode={true} />
				{/if}
			</div>

			<!-- Options Grid -->
			<div class="space-y-3">
				{#each currentQ.options as opt}
					{@const isSelected = selectedOption === opt}
					{@const isCorrect = isSubmitted && opt === currentQ.correctAnswer}
					{@const isWrong = isSubmitted && isSelected && opt !== currentQ.correctAnswer}

					<button
						type="button"
						onclick={() => handleSelect(opt)}
						disabled={isSubmitted}
						class="w-full text-left p-4 rounded-2xl border transition-all font-mono text-sm flex items-center justify-between {isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : isWrong ? 'bg-rose-500/20 border-rose-500 text-rose-300' : isSelected ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800'}"
					>
						<span>{opt}</span>
						{#if isCorrect}
							<CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
						{:else if isWrong}
							<XCircle class="w-5 h-5 text-rose-400 shrink-0" />
						{/if}
					</button>
				{/each}
			</div>

			<!-- Actions & Explanation -->
			{#if !isSubmitted}
				<button
					type="button"
					onclick={handleSubmit}
					disabled={!selectedOption}
					class="w-full py-3.5 rounded-2xl bg-indigo-600 disabled:opacity-50 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
				>
					Jawab Soal Ini
				</button>
			{:else}
				<div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
					<div class="text-xs font-bold uppercase tracking-wider text-indigo-400">Penjelasan & Solusi:</div>
					<p class="text-xs text-slate-300 leading-relaxed font-sans">{currentQ.explanation}</p>
				</div>

				<button
					type="button"
					onclick={handleNext}
					class="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
				>
					{currentIndex < questions.length - 1 ? 'Lanjut ke Soal Berikutnya →' : 'Lihat Hasil Akhir'}
				</button>
			{/if}
		</div>
	{/if}
</div>
