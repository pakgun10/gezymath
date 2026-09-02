<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateTrigonometry, calculateCosineRule } from '$lib/algorithms/trigonometry';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import UnitCircleSVG from '$lib/components/visualizations/UnitCircleSVG.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Compass } from 'lucide-svelte';

	let activeMode = $state<'unit-circle' | 'cosine-rule'>('unit-circle');

	// Unit Circle Mode State
	let angleInput = $state(45);

	// Cosine Rule Mode State
	let sideA = $state(6);
	let sideB = $state(8);
	let angleC = $state(60);

	let trigResult = $derived(calculateTrigonometry(Number(angleInput) || 0));
	let cosRuleResult = $derived(calculateCosineRule(Number(sideA) || 1, Number(sideB) || 1, Number(angleC) || 1));

	onMount(() => {
		recentStore.addRecent('trigonometri');
	});
</script>

<svelte:head>
	<title>Kalkulator Trigonometri & Lingkaran Satuan | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator trigonometri interaktif. Hitung Sin, Cos, Tan, Csc, Sec, Cot, lingkaran satuan (unit circle), dan Aturan Kosinus segitiga."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
				<Compass class="w-3.5 h-3.5" />
				<span>Trigonometri</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator & Visualisator Trigonometri</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Eksplorasi fungsi trigonometri (Sin, Cos, Tan) dengan visualisasi Lingkaran Satuan dan Aturan Kosinus Segitiga.
			</p>
		</div>
		<ExportPrintButton title="Laporan Trigonometri GezyMath" />
	</div>

	<!-- Mode Tabs -->
	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => (activeMode = 'unit-circle')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeMode === 'unit-circle' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Lingkaran Satuan & Nilai Fungsi
		</button>
		<button
			type="button"
			onclick={() => (activeMode = 'cosine-rule')}
			class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border {activeMode === 'cosine-rule' ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800'}"
		>
			Aturan Kosinus Segitiga
		</button>
	</div>

	{#if activeMode === 'unit-circle'}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Input Sudut θ</h3>
					<MathInput label="Sudut (dalam Derajat °)" bind:value={angleInput} type="number" min={0} max={360} />

					<!-- Quick Special Angles -->
					<div class="flex flex-wrap gap-1.5 pt-2">
						{#each [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360] as sa}
							<button
								type="button"
								onclick={() => (angleInput = sa)}
								class="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300"
							>
								{sa}°
							</button>
						{/each}
					</div>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="sin(θ)" value={trigResult.sin} subtext={trigResult.exactSin ? `Persis: ${trigResult.exactSin}` : ''} badge="Sinus" accentColor="emerald" />
					<ResultCard title="cos(θ)" value={trigResult.cos} subtext={trigResult.exactCos ? `Persis: ${trigResult.exactCos}` : ''} badge="Kosinus" accentColor="indigo" />
					<ResultCard title="tan(θ)" value={trigResult.tan} subtext={trigResult.exactTan ? `Persis: ${trigResult.exactTan}` : ''} badge="Tangen" accentColor="rose" />
					<ResultCard title="Kuadran" value={`Kuadran ${trigResult.quadrant}`} badge="Posisi Sudut" accentColor="amber" />
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<UnitCircleSVG data={trigResult} angle={Number(angleInput) || 0} />
				<CalculationSteps steps={trigResult.steps} title="Langkah Analisis Trigonometri" />
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
			<div class="lg:col-span-5 space-y-6">
				<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
					<h3 class="font-heading font-bold text-base text-slate-200">Dimensi Segitiga</h3>
					<MathInput label="Sisi a" bind:value={sideA} min={1} />
					<MathInput label="Sisi b" bind:value={sideB} min={1} />
					<MathInput label="Sudut Apit C (°)" bind:value={angleC} min={1} max={179} />
				</div>

				<div class="grid grid-cols-2 gap-3">
					<ResultCard title="Sisi c (Hasil)" value={cosRuleResult.sideC} badge="c = √(a²+b²-2ab cos C)" accentColor="indigo" />
					<ResultCard title="Luas Segitiga" value={cosRuleResult.area} badge="½ a b sin C" accentColor="emerald" />
				</div>
			</div>

			<div class="lg:col-span-7 space-y-6">
				<CalculationSteps steps={cosRuleResult.steps} title="Langkah Penyelesaian Aturan Kosinus" />
			</div>
		</div>
	{/if}
</div>
