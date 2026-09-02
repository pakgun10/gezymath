<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateArithmeticSequence, calculateGeometricSequence } from '$lib/algorithms/sequenceSeries';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import SequenceGraphCanvas from '$lib/components/visualizations/SequenceGraphCanvas.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { LineChart } from 'lucide-svelte';

	let activeType = $state<'arithmetic' | 'geometric'>('arithmetic');

	// Arithmetic inputs
	let aArith = $state(2);
	let bArith = $state(3);
	let nArith = $state(5);

	// Geometric inputs
	let aGeom = $state(16);
	let rGeom = $state(0.5);
	let nGeom = $state(4);

	let arithResult = $derived(calculateArithmeticSequence(Number(aArith) || 0, Number(bArith) || 0, Number(nArith) || 1));
	let geomResult = $derived(calculateGeometricSequence(Number(aGeom) || 0, Number(rGeom) || 1, Number(nGeom) || 1));

	onMount(() => {
		recentStore.addRecent('barisan-deret');
	});
</script>

<svelte:head>
	<title>Kalkulator Barisan & Deret | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator barisan dan deret Aritmetika & Geometri suku ke-n (Un), jumlah n suku (Sn), dan geometri tak hingga."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
				<LineChart class="w-3.5 h-3.5" />
				<span>Poliklinik Matematika</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Barisan & Deret</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung Suku ke-$n$ ($U_n$), Jumlah $n$ Suku ($S_n$), dan Deret Geometri Tak Hingga ($S_\infty$).
			</p>
		</div>
		<ExportPrintButton title="Laporan Barisan & Deret GezyMath" />
	</div>

	<!-- Mode Tabs -->
	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => (activeType = 'arithmetic')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'arithmetic' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Barisan & Deret Aritmetika
		</button>
		<button
			type="button"
			onclick={() => (activeType = 'geometric')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'geometric' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Barisan & Deret Geometri
		</button>
	</div>

	{#if activeType === 'arithmetic'}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Input Aritmetika</h3>
					<MathInput label="Suku Pertama (a)" bind:value={aArith} type="number" />
					<MathInput label="Beda (b)" bind:value={bArith} type="number" />
					<MathInput label="Banyak Suku (n)" bind:value={nArith} type="number" min={1} />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Suku ke-n (Uₙ)" value={arithResult.Un} badge="U_n" accentColor="indigo" />
					<ResultCard title="Jumlah n Suku (Sₙ)" value={arithResult.Sn} badge="S_n" accentColor="emerald" />
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<SequenceGraphCanvas terms={arithResult.terms} type="arithmetic" />
				<CalculationSteps steps={arithResult.steps} title="Langkah Perhitungan Aritmetika" />
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Input Geometri</h3>
					<MathInput label="Suku Pertama (a)" bind:value={aGeom} type="number" />
					<MathInput label="Rasio (r)" bind:value={rGeom} type="number" step={0.1} />
					<MathInput label="Banyak Suku (n)" bind:value={nGeom} type="number" min={1} />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Suku ke-n (Uₙ)" value={geomResult.Un} badge="U_n" accentColor="rose" />
					<ResultCard title="Jumlah n Suku (Sₙ)" value={geomResult.Sn} badge="S_n" accentColor="amber" />
					{#if geomResult.SInfinity !== undefined}
						<ResultCard title="Geometri Tak Hingga" value={geomResult.SInfinity} badge="S_∞" accentColor="emerald" />
					{/if}
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<SequenceGraphCanvas terms={geomResult.terms} type="geometric" />
				<CalculationSteps steps={geomResult.steps} title="Langkah Perhitungan Geometri" />
			</div>
		</div>
	{/if}
</div>
