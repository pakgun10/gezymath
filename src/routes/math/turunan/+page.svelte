<script lang="ts">
	import { onMount } from 'svelte';
	import { differentiatePolynomial } from '$lib/algorithms/calculus';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { LineChart } from 'lucide-svelte';

	let polyInput = $state('3x^2 + 2x - 5');
	let x0Input = $state(2);

	let result = $derived(differentiatePolynomial(polyInput || '0', Number(x0Input)));

	onMount(() => {
		recentStore.addRecent('turunan');
	});
</script>

<svelte:head>
	<title>Kalkulator Turunan (Differensial) | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator turunan fungsi polinomial f'(x), gradien garis singgung, dan persamaan garis singgung di titik x0."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
				<LineChart class="w-3.5 h-3.5" />
				<span>Kalkulus</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Turunan (Differensial)</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung turunan pertama f'(x) dari fungsi polinomial beserta gradien dan persamaan garis singgung di titik x₀.
			</p>
		</div>
		<ExportPrintButton title="Laporan Turunan Differensial GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Polinomial f(x)</h3>
				<MathInput label="Fungsi f(x)" bind:value={polyInput} placeholder="Misal: 3x^3 - 4x^2 + 5x - 7" />
				<MathInput label="Evaluasi di titik x₀" bind:value={x0Input} type="number" />

				<!-- Presets -->
				<div class="flex flex-wrap gap-1.5 pt-2">
					{#each ['3x^2 + 2x - 5', 'x^3 - 3x^2 + 4', '4x^4 - 2x^2 + 10'] as p}
						<button
							type="button"
							onclick={() => (polyInput = p)}
							class="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300"
						>
							{p}
						</button>
					{/each}
				</div>
			</div>

			<div class="space-y-3">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
					<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hasil Turunan f'(x)</span>
					<FormulaDisplay formula="f'(x) = {result.derivativeLatex}" />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Gradien m = f'(x₀)" value={result.gradientAtX0 ?? '-'} badge="Gradien di x0" accentColor="emerald" />
					<ResultCard title="Garis Singgung" value={result.tangentLineLatex ?? '-'} badge="Persamaan Garis" accentColor="indigo" />
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<CalculationSteps steps={result.steps} title="Langkah Perhitungan Turunan Lengkap" />
		</div>
	</div>
</div>
