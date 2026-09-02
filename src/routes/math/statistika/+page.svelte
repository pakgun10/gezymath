<script lang="ts">
	import { onMount } from 'svelte';
	import { calculateStatistics } from '$lib/algorithms/statistics';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import StatisticsChart from '$lib/components/visualizations/StatisticsChart.svelte';
	import { BarChart3 } from 'lucide-svelte';

	let rawDataInput = $state('10, 12, 14, 15, 18, 20, 15, 14, 15');

	let dataArray = $derived.by(() => {
		return rawDataInput
			.split(/[,;\s]+/)
			.map((s) => parseFloat(s.trim()))
			.filter((n) => !isNaN(n));
	});

	let result = $derived(calculateStatistics(dataArray));

	onMount(() => {
		recentStore.addRecent('statistika');
	});
</script>

<svelte:head>
	<title>Statistika Dasar — Mean, Median, Modus & Histogram | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator statistika deskriptif interaktif. Hitung rata-rata (mean), median, modus, varians, deviasi standar, kuartil, dan histogram frekuensi data."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
			<BarChart3 class="w-3.5 h-3.5" />
			<span>Statistika</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Statistika Dasar</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Tempel atau ketik sekumpulan data angka untuk menganalisis statistik deskriptif dan melihat diagram frekuensinya.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Input Data Angka</h3>

				<MathInput
					label="Data (dipisahkan koma atau spasi)"
					bind:value={rawDataInput}
					type="text"
					placeholder="Contoh: 10, 12, 14, 15, 18, 20"
				/>

				<div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
					<span>Total Sampel (N):</span>
					<span class="text-indigo-400 font-bold">{result.count} data</span>
				</div>
			</div>

			<!-- Summary Cards Grid -->
			<div class="grid grid-cols-2 gap-3">
				<ResultCard title="Mean (Rata-rata)" value={result.mean} badge="x̄" accentColor="indigo" />
				<ResultCard title="Median (Nilai Tengah)" value={result.median} badge="Q2" accentColor="emerald" />
				<ResultCard
					title="Modus"
					value={result.modes.length > 0 ? result.modes.join(', ') : 'Tidak ada'}
					badge="Paling Sering"
					accentColor="amber"
				/>
				<ResultCard title="Deviasi Standar (s)" value={result.stdDevSample} badge="Sampel" accentColor="rose" />
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<StatisticsChart data={result} />
			<CalculationSteps steps={result.steps} title="Langkah Perhitungan Statistika" />
		</div>
	</div>
</div>
