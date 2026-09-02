<script lang="ts">
	import { onMount } from 'svelte';
	import { calculatePermutationCombination, calculateProbability } from '$lib/algorithms/probability';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import ProbabilityDiagramCanvas from '$lib/components/visualizations/ProbabilityDiagramCanvas.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Dices } from 'lucide-svelte';

	let activeTab = $state<'perm-comb' | 'event-prob'>('perm-comb');

	// Permutation & Combination inputs
	let nInput = $state(5);
	let kInput = $state(2);

	// Event probability inputs
	let eventNInput = $state(3);
	let sampleSpaceInput = $state(6);

	let permCombResult = $derived(calculatePermutationCombination(Number(nInput) || 0, Number(kInput) || 0));
	let probResult = $derived(calculateProbability(Number(eventNInput) || 0, Number(sampleSpaceInput) || 1));

	onMount(() => {
		recentStore.addRecent('probabilitas');
	});
</script>

<svelte:head>
	<title>Kalkulator Probabilitas & Kombinatorika | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator Permutasi P(n,k), Kombinasi C(n,k), Faktorial n!, dan Peluang Kejadian P(A) = n(A)/n(S)."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
				<Dices class="w-3.5 h-3.5" />
				<span>Probabilitas & Kombinatorika</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Probabilitas & Kombinatorika</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung Faktorial (n!), Permutasi P(n,k), Kombinasi C(n,k), serta Peluang Kejadian P(A) = n(A)/n(S).
			</p>
		</div>
		<ExportPrintButton title="Laporan Probabilitas GezyMath" />
	</div>

	<!-- Mode Tabs -->
	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => (activeTab = 'perm-comb')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeTab === 'perm-comb' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Permutasi & Kombinasi (n, k)
		</button>
		<button
			type="button"
			onclick={() => (activeTab = 'event-prob')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeTab === 'event-prob' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Peluang Kejadian P(A)
		</button>
	</div>

	{#if activeTab === 'perm-comb'}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Input n dan k</h3>
					<MathInput label="Total Objek (n)" bind:value={nInput} type="number" min={0} />
					<MathInput label="Objek Dipilih (k)" bind:value={kInput} type="number" min={0} />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Permutasi P(n, k)" value={permCombResult.permutation} badge="Memperhatikan Urutan" accentColor="indigo" />
					<ResultCard title="Kombinasi C(n, k)" value={permCombResult.combination} badge="Abaikan Urutan" accentColor="emerald" />
					<ResultCard title="Faktorial n!" value={permCombResult.factorialN} badge="n!" accentColor="rose" />
					<ResultCard title="Permutasi Siklis" value={permCombResult.circularPermutation} badge="(n-1)!" accentColor="amber" />
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<CalculationSteps steps={permCombResult.steps} title="Langkah Perhitungan Kombinatorika" />
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Kejadian & Ruang Sampel</h3>
					<MathInput label="Banyak Kejadian A: n(A)" bind:value={eventNInput} type="number" min={0} />
					<MathInput label="Banyak Ruang Sampel: n(S)" bind:value={sampleSpaceInput} type="number" min={1} />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Peluang P(A)" value={probResult.probabilityFraction} subtext={`${probResult.probabilityPercentage}%`} badge="n(A)/n(S)" accentColor="indigo" />
					<ResultCard title="Peluang Komplemen P(A')" value={probResult.complementProbability} badge="1 - P(A)" accentColor="amber" />
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<ProbabilityDiagramCanvas eventN={Number(eventNInput) || 0} sampleSpaceN={Number(sampleSpaceInput) || 1} probabilityFraction={probResult.probabilityFraction} percentage={probResult.probabilityPercentage} />
				<CalculationSteps steps={probResult.steps} title="Langkah Analisis Peluang" />
			</div>
		</div>
	{/if}
</div>
