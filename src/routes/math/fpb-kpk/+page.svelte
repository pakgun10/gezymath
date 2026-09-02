<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateFpbKpk } from '$lib/algorithms/fpbKpk';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { Calculator } from 'lucide-svelte';

	let rawInput = $state('12, 18, 24');

	let numbersList = $derived.by(() => {
		return rawInput
			.split(/[,;\s]+/)
			.map((s) => parseInt(s.trim(), 10))
			.filter((n) => !isNaN(n) && n > 0);
	});

	let result = $derived(calculateFpbKpk(numbersList));

	onMount(() => {
		recentStore.addRecent('fpb-kpk');
	});
</script>

<svelte:head>
	<title>Kalkulator FPB & KPK — Pohon Faktor Prima | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator FPB (Faktor Persekutuan Terbesar) & KPK (Kelipatan Persekutuan Terkecil) dengan faktorisasi prima dan langkah-langkah penyelesaian."
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
			<Calculator class="w-3.5 h-3.5" />
			<span>Aritmetika Dasar</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator FPB & KPK</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Hitung Faktor Persekutuan Terbesar (FPB) dan Kelipatan Persekutuan Terkecil (KPK) untuk dua atau lebih bilangan bulat positif.
		</p>
	</div>

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<!-- Left Input Panel -->
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Bilangan</h3>

				<MathInput
					label="Masukkan Bilangan (dipisahkan koma atau spasi)"
					bind:value={rawInput}
					type="text"
					placeholder="Contoh: 12, 18, 24"
					helpText="Masukkan dua atau lebih bilangan positif."
				/>

				<div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
					<span>Bilangan Terdeteksi:</span>
					<span class="text-indigo-400 font-bold">[ {numbersList.join(', ')} ]</span>
				</div>
			</div>

			<!-- Prime Factorization Box -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Faktorisasi Prima</h3>
				<div class="space-y-2">
					{#each result.factorizations as item}
						<div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
							<span class="font-mono text-sm font-bold text-slate-200">{item.number} =</span>
							<FormulaDisplay latex={item.expression} displayMode={false} />
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Results Panel -->
		<div class="lg:col-span-7 space-y-6">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<ResultCard
					title="FPB (Faktor Persekutuan Terbesar)"
					value={result.fpb}
					subtext="Bagi bilangan terbesar yang dapat membagi habis semua masukan."
					badge="GCD"
					accentColor="emerald"
				/>
				<ResultCard
					title="KPK (Kelipatan Persekutuan Terkecil)"
					value={result.kpk}
					subtext="Kelipatan terkecil yang habis dibagi oleh semua masukan."
					badge="LCM"
					accentColor="indigo"
				/>
			</div>

			<!-- Step-by-Step Breakdown -->
			<CalculationSteps steps={result.fpbSteps} title="Langkah Penyelesaian FPB" />
			<CalculationSteps steps={result.kpkSteps} title="Langkah Penyelesaian KPK" />
		</div>
	</div>
</div>
