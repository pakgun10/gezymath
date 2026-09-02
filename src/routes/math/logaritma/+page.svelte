<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateLogarithm } from '$lib/algorithms/exponentRadical';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import LogarithmCurveCanvas from '$lib/components/visualizations/LogarithmCurveCanvas.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Calculator } from 'lucide-svelte';

	let baseInput = $state(2);
	let valueInput = $state(8);

	let result = $derived(calculateLogarithm(Number(baseInput) || 2, Number(valueInput) || 1));

	onMount(() => {
		recentStore.addRecent('logaritma');
	});
</script>

<svelte:head>
	<title>Kalkulator Logaritma & Sifat-Sifat | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator logaritma basis a, logaritma natural ln(x), logaritma basis 10 log10(x), dan visualisasi kurva."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
				<Calculator class="w-3.5 h-3.5" />
				<span>Logaritma</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Logaritma</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung nilai logaritma $\log_a(b)$, logaritma natural $\ln(x)$, logaritma basis 10, dan sifat-sifat logaritma.
			</p>
		</div>
		<ExportPrintButton title="Laporan Logaritma GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Logaritma ᵃlog(b)</h3>
				<MathInput label="Basis a (a > 0, a ≠ 1)" bind:value={baseInput} type="number" min={0.1} step={0.1} />
				<MathInput label="Numerus b (b > 0)" bind:value={valueInput} type="number" min={0.1} step={0.1} />

				<!-- Presets -->
				<div class="flex flex-wrap gap-1.5 pt-2">
					{#each [{ a: 2, b: 8 }, { a: 2, b: 16 }, { a: 10, b: 100 }, { a: 3, b: 81 }] as p}
						<button
							type="button"
							onclick={() => {
								baseInput = p.a;
								valueInput = p.b;
							}}
							class="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300"
						>
							<sup>{p.a}</sup>log({p.b})
						</button>
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<ResultCard title="Hasil ᵃlog(b)" value={result.logResult} badge="Logaritma Basis a" accentColor="indigo" />
				<ResultCard title="ln(b) (Natural)" value={result.naturalLog} badge="Basis e" accentColor="emerald" />
				<ResultCard title="log₁₀(b)" value={result.log10} badge="Basis 10" accentColor="amber" />
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<LogarithmCurveCanvas base={Number(baseInput) || 2} value={Number(valueInput) || 1} logResult={result.logResult} />
			<CalculationSteps steps={result.propertiesSteps} title="Langkah & Sifat Logaritma" />
		</div>
	</div>
</div>
