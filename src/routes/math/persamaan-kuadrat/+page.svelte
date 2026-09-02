<script lang="ts">
	import { onMount } from 'svelte';
	import { solveQuadratic } from '$lib/algorithms/quadratic';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import ParabolaGraph from '$lib/components/visualizations/ParabolaGraph.svelte';
	import { Variable } from 'lucide-svelte';

	let valA = $state(1);
	let valB = $state(-5);
	let valC = $state(6);

	let inputError = $state<string | undefined>(undefined);

	let result = $derived.by(() => {
		try {
			const a = Number(valA);
			const b = Number(valB);
			const c = Number(valC);

			if (a === 0 || isNaN(a)) {
				inputError = 'Koefisien "a" tidak boleh 0 pada persamaan kuadrat.';
				return solveQuadratic(1, b || 0, c || 0);
			}
			inputError = undefined;
			return solveQuadratic(a, b || 0, c || 0);
		} catch (err: any) {
			inputError = err.message;
			return solveQuadratic(1, -5, 6);
		}
	});

	onMount(() => {
		recentStore.addRecent('persamaan-kuadrat');
	});
</script>

<svelte:head>
	<title>Persamaan Kuadrat — Akar, Diskriminan & Grafik Parabola | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator penyelesaian persamaan kuadrat ax² + bx + c = 0 lengkap dengan nilai diskriminan D, akar real/kompleks, titik puncak, dan grafik parabola interaktif."
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
			<Variable class="w-3.5 h-3.5" />
			<span>Aljabar</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Persamaan Kuadrat</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Selesaikan persamaan kuadrat dalam bentuk standar ax² + bx + c = 0 dan lihat visualisasi kurva parabolanya secara otomatis.
		</p>
	</div>

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<!-- Left Panel: Input & Equation Display -->
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Koefisien Persamaan</h3>

				<div class="grid grid-cols-3 gap-3">
					<MathInput label="Koefisien a" bind:value={valA} error={inputError} />
					<MathInput label="Koefisien b" bind:value={valB} />
					<MathInput label="Koefisien c" bind:value={valC} />
				</div>

				<div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-2">
					<span class="text-xs text-slate-400">Bentuk Persamaan:</span>
					<FormulaDisplay latex={result.latexEquation} />
				</div>
			</div>

			<!-- Result Cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<ResultCard
					title="Diskriminan (D)"
					value={result.discriminant}
					subtext={result.discriminant > 0 ? 'D > 0 (2 Akar Real)' : result.discriminant === 0 ? 'D = 0 (Akar Kembar)' : 'D < 0 (Akar Kompleks)'}
					badge="D = b² - 4ac"
					accentColor="amber"
				/>
				<ResultCard
					title="Titik Puncak (Vertex)"
					value={`(${result.vertex.x}, ${result.vertex.y})`}
					subtext={`Titik ${result.extremumType} parabola`}
					badge="Puncak"
					accentColor="cyan"
				/>
			</div>

			<!-- Roots Result Card -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Akar-Akar Persamaan (Roots)</h3>
				<div class="grid grid-cols-2 gap-3">
					<div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
						<span class="text-xs text-slate-400 block mb-1">x₁:</span>
						<span class="font-mono text-lg font-bold text-indigo-400">{result.x1.formatted}</span>
					</div>
					<div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
						<span class="text-xs text-slate-400 block mb-1">x₂:</span>
						<span class="font-mono text-lg font-bold text-indigo-400">{result.x2.formatted}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Panel: Parabola Graph & Steps -->
		<div class="lg:col-span-7 space-y-6">
			<ParabolaGraph data={result} />
			<CalculationSteps steps={result.steps} title="Langkah Penyelesaian Rumus ABC" />
		</div>
	</div>
</div>
