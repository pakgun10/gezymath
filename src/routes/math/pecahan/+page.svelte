<script lang="ts">
	import { onMount } from 'svelte';
	import { simplifyFraction, operateFractions } from '$lib/algorithms/fraction';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { Binary } from 'lucide-svelte';

	let n1 = $state(3);
	let d1 = $state(4);
	let op = $state<'+' | '-' | '*' | '/'>('+');
	let n2 = $state(1);
	let d2 = $state(2);

	let result = $derived.by(() => {
		try {
			return operateFractions(Number(n1) || 0, Number(d1) || 1, op, Number(n2) || 0, Number(d2) || 1);
		} catch (err: any) {
			return simplifyFraction(1, 1);
		}
	});

	onMount(() => {
		recentStore.addRecent('pecahan');
	});
</script>

<svelte:head>
	<title>Kalkulator Pecahan — Operasi & Penyederhanaan | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator operasi pecahan biasa, pecahan campuran, desimal, dan penyederhanaan otomatis."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
			<Binary class="w-3.5 h-3.5" />
			<span>Aritmetika</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Operasi Pecahan</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Hitung penjumlahan, pengurangan, perkalian, dan pembagian pecahan dengan penyederhanaan otomatis.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Pecahan</h3>

				<!-- Fraction 1 -->
				<div class="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
					<MathInput label="Pembilang 1" bind:value={n1} />
					<MathInput label="Penyebut 1" bind:value={d1} min={1} />
				</div>

				<!-- Operator Selection -->
				<div class="flex items-center justify-center gap-2 py-1">
					{#each ['+', '-', '*', '/'] as o}
						<button
							type="button"
							onclick={() => (op = o as any)}
							class="px-4 py-2 rounded-xl font-mono text-lg font-bold transition-all border {op === o ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-900 text-slate-400 border-slate-800'}"
						>
							{o === '*' ? '×' : o === '/' ? '÷' : o}
						</button>
					{/each}
				</div>

				<!-- Fraction 2 -->
				<div class="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
					<MathInput label="Pembilang 2" bind:value={n2} />
					<MathInput label="Penyebut 2" bind:value={d2} min={1} />
				</div>
			</div>

			<ResultCard
				title="Bentuk Desimal"
				value={result.decimal}
				subtext={`Pecahan Sederhana: ${result.simplifiedNum}/${result.simplifiedDen}`}
				badge="Desimal"
				accentColor="emerald"
			/>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Hasil Akhir Perhitungan</h3>
				<div class="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-center gap-4">
					<FormulaDisplay latex={result.latexForm} displayMode={true} />
				</div>
			</div>

			<CalculationSteps steps={result.steps} title="Langkah Penyederhanaan Pecahan" />
		</div>
	</div>
</div>
