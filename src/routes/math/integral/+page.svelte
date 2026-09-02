<script lang="ts">
	import { onMount } from 'svelte';
	import { integratePolynomial } from '$lib/algorithms/calculus';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import AreaUnderCurveCanvas from '$lib/components/visualizations/AreaUnderCurveCanvas.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Sigma } from 'lucide-svelte';

	let polyInput = $state('3x^2');
	let lowerLimit = $state(0);
	let upperLimit = $state(2);

	let result = $derived(integratePolynomial(polyInput || '0', Number(lowerLimit), Number(upperLimit)));

	onMount(() => {
		recentStore.addRecent('integral');
	});
</script>

<svelte:head>
	<title>Kalkulator Integral Tentu & Tak Tentu | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator integral tentu dan tak tentu polinomial dengan visualisasi luas daerah di bawah kurva."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
				<Sigma class="w-3.5 h-3.5" />
				<span>Kalkulus</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Integral Tentu & Tak Tentu</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung anti-turunan $F(x) + C$ dan nilai integral tentu $\int_a^b f(x) dx$ beserta visualisasi luas daerah.
			</p>
		</div>
		<ExportPrintButton title="Laporan Integral GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Polinomial f(x)</h3>
				<MathInput label="Fungsi f(x)" bind:value={polyInput} placeholder="Misal: 3x^2 + 2x" />
				<div class="grid grid-cols-2 gap-3">
					<MathInput label="Batas Bawah (a)" bind:value={lowerLimit} type="number" />
					<MathInput label="Batas Atas (b)" bind:value={upperLimit} type="number" />
				</div>

				<!-- Presets -->
				<div class="flex flex-wrap gap-1.5 pt-2">
					{#each ['3x^2', '2x + 1', 'x^3 - 4x'] as p}
						<button
							type="button"
							onclick={() => (polyInput = p)}
							class="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-300"
						>
							{p}
						</button>
					{/each}
				</div>
			</div>

			<div class="space-y-3">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
					<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Anti-Turunan ∫ f(x) dx</span>
					<FormulaDisplay formula="F(x) = {result.antiderivativeLatex}" />
				</div>

				<ResultCard title="Nilai Integral Tentu (Luas)" value={result.areaValue} badge="∫_a^b f(x) dx" accentColor="emerald" />
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<AreaUnderCurveCanvas polyStr={polyInput} lowerLimit={Number(lowerLimit)} upperLimit={Number(upperLimit)} areaValue={result.areaValue} />
			<CalculationSteps steps={result.steps} title="Langkah Perhitungan Integral Lengkap" />
		</div>
	</div>
</div>
