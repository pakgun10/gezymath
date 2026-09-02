<script lang="ts">
	import { onMount } from 'svelte';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import FunctionGraphCanvas from '$lib/components/visualizations/FunctionGraphCanvas.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { LineChart } from 'lucide-svelte';

	let fnExpr = $state('x^2 - 4');

	const presets = [
		{ label: 'Parabola x²', expr: 'x^2' },
		{ label: 'Linier 2x + 1', expr: '2*x + 1' },
		{ label: 'Gelombang sin(x)', expr: 'sin(x)' },
		{ label: 'Gelombang cos(x)', expr: 'cos(x)' },
		{ label: 'Akar sqrt(x)', expr: 'sqrt(x)' }
	];

	onMount(() => {
		recentStore.addRecent('grafik-fungsi');
	});
</script>

<svelte:head>
	<title>Grafik Fungsi — Plotter Matematika Interaktif | GezyMath</title>
	<meta
		name="description"
		content="Plotter grafik fungsi matematika 2D interaktif. Plot persamaan y = f(x) dengan zoom, pan, dan kisi bidang Kartesius."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
			<LineChart class="w-3.5 h-3.5" />
			<span>Grafik & Visualisasi</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Plotter Grafik Fungsi Interaktif</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Masukkan fungsi matematika y = f(x) untuk memvisualisasikan grafik kurvanya pada bidang Kartesius.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Fungsi y = f(x)</h3>

				<MathInput
					label="Ekspresi f(x)"
					bind:value={fnExpr}
					type="text"
					placeholder="Contoh: x^2 - 4"
					helpText="Gunakan variabel x, misal: x^2, sin(x), sqrt(x)"
				/>

				<div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
					<span class="text-xs text-slate-400">Formula LaTeX:</span>
					<FormulaDisplay latex={`y = ${fnExpr}`} displayMode={false} />
				</div>
			</div>

			<!-- Presets -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Contoh Preset Fungsi</h3>
				<div class="flex flex-wrap gap-2">
					{#each presets as p}
						<button
							type="button"
							onclick={() => (fnExpr = p.expr)}
							class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-indigo-300 transition-colors"
						>
							{p.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<FunctionGraphCanvas expression={fnExpr} />
		</div>
	</div>
</div>
