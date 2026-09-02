<script lang="ts">
	import { onMount } from 'svelte';
	import { generateQuizQuestions, type QuizQuestion } from '$lib/algorithms/quiz';
	import { recentStore } from '$lib/stores/userTools';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy } from 'lucide-svelte';

	let questions = $state<QuizQuestion[]>([]);
	let currentIndex = $state(0);
	let selectedOption = $state<string | null>(null);
	let isSubmitted = $state(false);
	let score = $state(0);
	let quizFinished = $state(false);

	onMount(() => {
		questions = generateQuizQuestions();
		recentStore.addRecent('kuis-latihan');
	});

	let currentQ = $derived(questions[currentIndex]);

	function handleSelect(opt: string) {
		if (isSubmitted) return;
		selectedOption = opt;
	}

	function handleSubmit() {
		if (!selectedOption) return;
		isSubmitted = true;
		if (selectedOption === currentQ.correctAnswer) {
			score += 20;
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
		questions = generateQuizQuestions();
		currentIndex = 0;
		selectedOption = null;
		isSubmitted = false;
		score = 0;
		quizFinished = false;
	}
</script>

<svelte:head>
	<title>Kuis & Latihan Matematika Interaktif | GezyMath</title>
	<meta
		name="description"
		content="Uji pemahaman matematika Anda dengan kuis interaktif acak. Uji konsep Pythagoras, FPB KPK, Persamaan Kuadrat, Geometri, dan Statistika."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
			<Sparkles class="w-3.5 h-3.5" />
			<span>Latihan Interaktif</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kuis & Latihan Matematika</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Uji tingkat pemahaman Anda dengan menjawab pertanyaan matematika pilihan ganda yang disertai penjelasan lengkap.
		</p>
	</div>

	{#if quizFinished}
		<div class="glass-panel p-8 rounded-3xl border border-indigo-500/30 text-center max-w-xl mx-auto space-y-6">
			<div class="p-4 rounded-full bg-indigo-500/10 text-indigo-400 w-16 h-16 mx-auto flex items-center justify-center">
				<Trophy class="w-8 h-8 text-amber-400" />
			</div>
			<h2 class="text-2xl font-bold font-heading text-slate-100">Kuis Selesai!</h2>
			<div class="text-5xl font-extrabold font-mono text-indigo-400">{score} / 100</div>
			<p class="text-slate-400 text-sm">
				{score >= 80 ? 'Luar biasa! Pemahaman konsep matematika Anda sangat solid.' : 'Bagus! Terus berlatih menggunakan alat-alat di GezyMath.'}
			</p>
			<button
				type="button"
				onclick={handleRestart}
				class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 mx-auto"
			>
				<RotateCcw class="w-4 h-4" />
				<span>Ulangi Kuis</span>
			</button>
		</div>
	{:else if currentQ}
		<div class="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 max-w-3xl">
			<!-- Header Progress -->
			<div class="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3">
				<span>Soal {currentIndex + 1} dari {questions.length}</span>
				<span class="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{currentQ.category}</span>
				<span>Skor Saat Ini: {score}</span>
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
							<CheckCircle2 class="w-5 h-5 text-emerald-400" />
						{:else if isWrong}
							<XCircle class="w-5 h-5 text-rose-400" />
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
