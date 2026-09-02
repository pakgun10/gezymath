<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateExponentRadical } from '$lib/algorithms/exponentRadical';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Binary } from 'lucide-svelte';

	let baseInput = $state(2);
	let expInput = $state(5);
	let radicalInput = $state(72);

	let result = $derived(calculateExponentRadical(Number(baseInput) || 1, Number(expInput) || 1, Number(radicalInput) || 1));

	onMount(() => {
		recentStore.addRecent('pangkat-akar');
	});
</script>

<svelte:head>
	<title>Kalkulator Perpangkatan & Bentuk Akar | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator perpangkatan eksponen a^n dan penyederhanaan bentuk akar √N menjadi a√b secara otomatis."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
				<Binary class="w-3.5 h-3.5" />
				<span>Eksponen & Akar</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Perpangkatan & Bentuk Akar</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Hitung hasil eksponen perpangkatan $a^n$ dan sederhanakan bentuk akar $\sqrt{N} = a\sqrt{b}$.
			</p>
		</div>
		<ExportPrintButton title="Laporan Pangkat & Akar GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Perpangkatan aⁿ</h3>
				<MathInput label="Basis (a)" bind:value={baseInput} type="number" />
				<MathInput label="Pangkat (n)" bind:value={expInput} type="number" />
			</div>

			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Bentuk Akar √N</h3>
				<MathInput label="Bilangan di dalam Akar (N)" bind:value={radicalInput} type="number" min={1} />
			</div>

			<div class="grid grid-cols-2 gap-3">
				<ResultCard title="Hasil aⁿ" value={result.powerResult} badge="Perpangkatan" accentColor="indigo" />
				<ResultCard title="Hasil √N Sederhana" value={result.simplifiedRadical} badge="Penyederhanaan Akar" accentColor="emerald" />
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<CalculationSteps steps={result.steps} title="Langkah Penyelesaian Perpangkatan & Akar" />
		</div>
	</div>
</div>
