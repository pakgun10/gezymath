<script lang="ts">
	import { onMount } from 'svelte';
	import { solveSpldv } from '$lib/algorithms/spldv';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import SpldvGraphCanvas from '$lib/components/visualizations/SpldvGraphCanvas.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Variable } from 'lucide-svelte';

	let a1 = $state(2);
	let b1 = $state(1);
	let c1 = $state(5);

	let a2 = $state(1);
	let b2 = $state(-1);
	let c2 = $state(1);

	let result = $derived(solveSpldv(Number(a1) || 0, Number(b1) || 0, Number(c1) || 0, Number(a2) || 0, Number(b2) || 0, Number(c2) || 0));

	onMount(() => {
		recentStore.addRecent('spldv');
	});
</script>

<svelte:head>
	<title>Sistem Persamaan Linear Dua Variabel (SPLDV) | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator SPLDV Aturan Cramer. Cari himpunan penyelesaian HP = (x, y) dan grafik persilangan garis lurus."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
				<Variable class="w-3.5 h-3.5" />
				<span>Aljabar Linear</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator SPLDV</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Selesaikan sistem dua persamaan linear ax + by = c dan temukan titik potong garisnya.
			</p>
		</div>
		<ExportPrintButton title="Laporan SPLDV GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Persamaan 1: a₁x + b₁y = c₁</h3>
				<div class="grid grid-cols-3 gap-2">
					<MathInput label="a₁" bind:value={a1} />
					<MathInput label="b₁" bind:value={b1} />
					<MathInput label="c₁" bind:value={c1} />
				</div>

				<h3 class="font-heading font-bold text-base text-slate-200 pt-2">Persamaan 2: a₂x + b₂y = c₂</h3>
				<div class="grid grid-cols-3 gap-2">
					<MathInput label="a₂" bind:value={a2} />
					<MathInput label="b₂" bind:value={b2} />
					<MathInput label="c₂" bind:value={c2} />
				</div>
			</div>

			<ResultCard
				title="Himpunan Penyelesaian HP"
				value={result.hasUniqueSolution ? `HP = {(${result.x}, ${result.y})}` : 'Tidak Ada Solusi Tunggal'}
				subtext={result.hasUniqueSolution ? 'Titik potong unik dua garis.' : result.solutionType === 'infinite' ? 'Tak Hingga Solusi (Garis Berimpit)' : 'Tanpa Solusi (Garis Sejajar)'}
				badge="Aturan Cramer"
				accentColor={result.hasUniqueSolution ? 'emerald' : 'rose'}
			/>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<SpldvGraphCanvas data={result} a1={Number(a1)||1} b1={Number(b1)||1} c1={Number(c1)||0} a2={Number(a2)||1} b2={Number(b2)||1} c2={Number(c2)||0} />
			<CalculationSteps steps={result.steps} title="Langkah Penyelesaian Aturan Cramer" />
		</div>
	</div>
</div>
