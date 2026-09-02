<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateDeterminant2x2, calculateInverse2x2, addMatrices2x2, multiplyMatrices2x2, type Matrix2x2 } from '$lib/algorithms/matrix';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import ExportPrintButton from '$lib/components/ui/ExportPrintButton.svelte';
	import { Grid } from 'lucide-svelte';

	let a11 = $state(4);
	let a12 = $state(7);
	let a21 = $state(2);
	let a22 = $state(6);

	let matrixA = $derived<Matrix2x2>([
		[Number(a11) || 0, Number(a12) || 0],
		[Number(a21) || 0, Number(a22) || 0]
	]);

	let invResult = $derived(calculateInverse2x2(matrixA));

	onMount(() => {
		recentStore.addRecent('matriks');
	});
</script>

<svelte:head>
	<title>Kalkulator Matriks 2x2 — Determinan & Invers | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator matriks 2x2 interaktif. Hitung determinan det(A), adjoin, dan invers matriks A⁻¹ dengan langkah lengkap."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
				<Grid class="w-3.5 h-3.5" />
				<span>Matriks</span>
			</div>
			<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Matriks 2x2</h1>
			<p class="text-slate-400 text-sm max-w-2xl">
				Masukkan elemen matriks A berordo 2x2 untuk menghitung nilai determinan det(A) dan matriks invers A⁻¹.
			</p>
		</div>
		<ExportPrintButton title="Laporan Matriks GezyMath" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Elemen Matriks A (2x2)</h3>

				<div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
					<div class="grid grid-cols-2 gap-3">
						<MathInput label="a₁₁" bind:value={a11} />
						<MathInput label="a₁₂" bind:value={a12} />
					</div>
					<div class="grid grid-cols-2 gap-3">
						<MathInput label="a₂₁" bind:value={a21} />
						<MathInput label="a₂₂" bind:value={a22} />
					</div>
				</div>
			</div>

			<ResultCard
				title="Determinan det(A)"
				value={invResult.det}
				subtext={invResult.det === 0 ? 'Matriks Singular (Tidak ada invers)' : 'Matriks Non-Singular'}
				badge="det(A)"
				accentColor={invResult.det === 0 ? 'rose' : 'teal'}
			/>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<!-- Inverse Matrix Result Box -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<h3 class="font-heading font-bold text-base text-slate-200">Hasil Invers Matriks A⁻¹</h3>

				{#if !invResult.hasInverse || !invResult.inverse}
					<div class="p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
						Matriks A tidak memiliki invers karena determinannya nol (det(A) = 0).
					</div>
				{:else}
					<div class="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-center gap-4">
						<span class="font-mono text-xl font-bold text-slate-400">A⁻¹ =</span>
						<div class="inline-flex border-l-2 border-r-2 border-slate-400 px-3 py-2 font-mono text-lg font-bold text-indigo-400 gap-6">
							<div class="space-y-2 text-center">
								<div>{invResult.inverse[0][0]}</div>
								<div>{invResult.inverse[1][0]}</div>
							</div>
							<div class="space-y-2 text-center">
								<div>{invResult.inverse[0][1]}</div>
								<div>{invResult.inverse[1][1]}</div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<CalculationSteps steps={invResult.steps} title="Langkah Perhitungan Invers Matriks" />
		</div>
	</div>
</div>
