<script lang="ts">
	import { onMount } from 'svelte';
	import { factorizeInteger } from '$lib/algorithms/factorization';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { Binary } from 'lucide-svelte';

	let inputNum = $state(60);

	let result = $derived(factorizeInteger(Number(inputNum) || 1));

	onMount(() => {
		recentStore.addRecent('faktorisasi');
	});
</script>

<svelte:head>
	<title>Faktorisasi Bilangan — Pohon Faktor Prima | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator faktorisasi prima dan pembagi bilangan bulat. Temukan pasangan faktor perkalian dan pengujian bilangan prima secara instan."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
			<Binary class="w-3.5 h-3.5" />
			<span>Aritmetika</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Faktorisasi Bilangan</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Dapatkan faktorisasi prima, daftar semua faktor pembagi, serta pasangan faktor perkalian untuk sebarang bilangan bulat.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Bilangan</h3>
				<MathInput label="Bilangan Bulat Positive (N)" bind:value={inputNum} type="number" min={1} max={1000000} />
			</div>

			<ResultCard
				title="Status Prima / Komposit"
				value={result.isPrime ? 'Bilangan PRIMA' : 'Bilangan KOMPOSIT'}
				subtext={result.isPrime ? 'Hanya habis dibagi 1 dan dirinya sendiri.' : `Memiliki ${result.allFactors.length} faktor pembagi.`}
				badge={result.isPrime ? 'Prima' : 'Komposit'}
				accentColor={result.isPrime ? 'emerald' : 'indigo'}
			/>

			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Faktorisasi Prima</h3>
				<div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
					<span class="font-mono text-sm font-bold text-slate-200">{result.number} =</span>
					<FormulaDisplay latex={result.primeExpression} displayMode={false} />
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<!-- All Factors List -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">
					Semua Faktor Pembagi ({result.allFactors.length})
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each result.allFactors as factor}
						<span class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300 font-mono text-sm font-bold">
							{factor}
						</span>
					{/each}
				</div>
			</div>

			<!-- Factor Pairs -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Pasangan Faktor Perkalian</h3>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
					{#each result.factorPairs as pair}
						<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-center text-slate-300">
							{pair.f1} × {pair.f2} = <span class="text-indigo-400 font-bold">{result.number}</span>
						</div>
					{/each}
				</div>
			</div>

			<CalculationSteps steps={result.steps} title="Langkah Perhitungan Faktorisasi" />
		</div>
	</div>
</div>
