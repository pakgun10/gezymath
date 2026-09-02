<script lang="ts">
	import { onMount } from 'svelte';
	import { translatePoints, reflectPoints, rotatePoints, dilatePoints, type Point2D } from '$lib/algorithms/transformation';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import TransformationCanvas from '$lib/components/visualizations/TransformationCanvas.svelte';
	import { Move } from 'lucide-svelte';

	let activeType = $state<'translation' | 'reflection' | 'rotation' | 'dilation'>('translation');

	// Inputs
	let dx = $state(3);
	let dy = $state(2);
	let reflectAxis = $state<'x-axis' | 'y-axis' | 'origin'>('x-axis');
	let rotateAngle = $state(90);
	let scaleK = $state(2);

	const initialPoints: Point2D[] = [
		{ x: 1, y: 1, label: 'A' },
		{ x: 4, y: 1, label: 'B' },
		{ x: 2, y: 4, label: 'C' }
	];

	let result = $derived.by(() => {
		switch (activeType) {
			case 'translation':
				return translatePoints(initialPoints, Number(dx) || 0, Number(dy) || 0);
			case 'reflection':
				return reflectPoints(initialPoints, reflectAxis);
			case 'rotation':
				return rotatePoints(initialPoints, Number(rotateAngle) || 0);
			case 'dilation':
				return dilatePoints(initialPoints, Number(scaleK) || 1);
		}
	});

	onMount(() => {
		recentStore.addRecent('transformasi');
	});
</script>

<svelte:head>
	<title>Transformasi Geometri — Translasi, Refleksi, Rotasi & Dilatasi | GezyMath</title>
	<meta
		name="description"
		content="Simulasi interaktif transformasi geometri 2D. Hitung pergeseran (translasi), pencerminan (refleksi), perputaran (rotasi), dan perkalian (dilatasi) pada bidang Kartesius."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-semibold">
			<Move class="w-3.5 h-3.5" />
			<span>Transformasi</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Transformasi Geometri</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Simulasikan empat jenis transformasi 2D pada objek segitiga ABC pada bidang koordinat Kartesius.
		</p>
	</div>

	<!-- Mode Tabs -->
	<div class="flex items-center gap-2 border-b border-slate-800 pb-3">
		<button
			type="button"
			onclick={() => (activeType = 'translation')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'translation' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Translasi (Pergeseran)
		</button>
		<button
			type="button"
			onclick={() => (activeType = 'reflection')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'reflection' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Refleksi (Pencerminan)
		</button>
		<button
			type="button"
			onclick={() => (activeType = 'rotation')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'rotation' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Rotasi (Perputaran)
		</button>
		<button
			type="button"
			onclick={() => (activeType = 'dilation')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeType === 'dilation' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Dilatasi (Perkalian)
		</button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Parameter Transformasi</h3>

				{#if activeType === 'translation'}
					<div class="grid grid-cols-2 gap-3">
						<MathInput label="Geser X (dx)" bind:value={dx} />
						<MathInput label="Geser Y (dy)" bind:value={dy} />
					</div>
				{:else if activeType === 'reflection'}
					<div class="space-y-2">
						<label class="text-sm font-semibold text-slate-300">Sumbu Pencerminan</label>
						<select
							bind:value={reflectAxis}
							class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none"
						>
							<option value="x-axis">Sumbu X (y = 0)</option>
							<option value="y-axis">Sumbu Y (x = 0)</option>
							<option value="origin">Titik Pusat O(0,0)</option>
						</select>
					</div>
				{:else if activeType === 'rotation'}
					<MathInput label="Sudut Rotasi θ (Derajat)" bind:value={rotateAngle} type="number" step="15" />
				{:else if activeType === 'dilation'}
					<MathInput label="Faktor Skala (k)" bind:value={scaleK} type="number" step="0.5" />
				{/if}
			</div>

			<!-- Points Result List -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Koordinat Hasil</h3>
				<div class="space-y-2 font-mono text-xs">
					{#each result.transformedPoints as p, i}
						<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
							<span class="text-indigo-400 font-bold">{initialPoints[i].label}({initialPoints[i].x}, {initialPoints[i].y})</span>
							<span class="text-slate-400">→</span>
							<span class="text-emerald-400 font-bold">{p.label}({p.x}, {p.y})</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<TransformationCanvas data={result} />
			<CalculationSteps steps={result.steps} title="Langkah Perhitungan Transformasi" />
		</div>
	</div>
</div>
