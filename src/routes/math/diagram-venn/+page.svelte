<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateVenn2Sets } from '$lib/algorithms/venn';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import VennDiagramSVG from '$lib/components/visualizations/VennDiagramSVG.svelte';
	import { CircleDot } from 'lucide-svelte';

	let setAStr = $state('1, 2, 3, 4, 5');
	let setBStr = $state('4, 5, 6, 7, 8');

	let result = $derived(calculateVenn2Sets(setAStr, setBStr));

	onMount(() => {
		recentStore.addRecent('diagram-venn');
	});
</script>

<svelte:head>
	<title>Diagram Venn Interaktif — Irisan, Gabungan & Himpunan | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator diagram Venn 2 himpunan interaktif. Hitung irisan, gabungan, selisih himpunan dengan sorotan visual otomatis."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
			<CircleDot class="w-3.5 h-3.5" />
			<span>Himpunan</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Diagram Venn Interaktif</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Masukkan dua himpunan angka/kata untuk melihat diagram Venn interaktif beserta hasil operasi himpunannya.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Himpunan</h3>
				<MathInput label="Anggota Himpunan A (pisahkan koma/spasi)" bind:value={setAStr} type="text" />
				<MathInput label="Anggota Himpunan B (pisahkan koma/spasi)" bind:value={setBStr} type="text" />
			</div>

			<!-- Set Operations Summary -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Hasil Operasi Himpunan</h3>
				<div class="space-y-2 font-mono text-xs">
					<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
						<span class="text-indigo-400 font-bold block mb-1">Irisan (A ∩ B):</span>
						<span class="text-slate-200 font-bold font-mono">{`{ ${result.intersection.join(', ')} }`}</span>
					</div>
					<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
						<span class="text-indigo-400 font-bold block mb-1">Gabungan (A ∪ B):</span>
						<span class="text-slate-200 font-bold font-mono">{`{ ${result.union.join(', ')} }`}</span>
					</div>
					<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
						<span class="text-indigo-400 font-bold block mb-1">Selisih (A - B):</span>
						<span class="text-slate-200 font-bold font-mono">{`{ ${result.onlyA.join(', ')} }`}</span>
					</div>
					<div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
						<span class="text-indigo-400 font-bold block mb-1">Selisih (B - A):</span>
						<span class="text-slate-200 font-bold font-mono">{`{ ${result.onlyB.join(', ')} }`}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<VennDiagramSVG data={result} />
			<CalculationSteps steps={result.steps} title="Penjelasan Operasi Himpunan" />
		</div>
	</div>
</div>
