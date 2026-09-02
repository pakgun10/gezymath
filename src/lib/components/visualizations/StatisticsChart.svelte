<script lang="ts">
	import type { StatisticsResult } from '$lib/algorithms/statistics';

	interface Props {
		data: StatisticsResult;
	}

	let { data }: Props = $props();

	const maxFreq = $derived(Math.max(...data.frequencies.map((f) => f.frequency), 1));
	const chartHeight = 160;
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-3">
		Diagram Frekuensi Data (Histogram)
	</div>

	{#if data.frequencies.length === 0}
		<div class="text-xs text-slate-500 py-8">Tidak ada data untuk ditampilkan</div>
	{:else}
		<div class="w-full flex items-end justify-center gap-2 h-44 border-b border-l border-slate-700/80 p-2">
			{#each data.frequencies as item}
				{@const heightPercent = (item.frequency / maxFreq) * 100}
				<div class="flex flex-col items-center gap-1 flex-1 max-w-[40px] group relative">
					<!-- Tooltip -->
					<div class="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-8 bg-slate-800 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-500/30 transition-opacity z-10 whitespace-nowrap">
						Nilai {item.value}: {item.frequency}x
					</div>

					<div
						style="height: {heightPercent}%;"
						class="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md hover:from-indigo-500 hover:to-indigo-300 transition-all duration-300"
					></div>
					<span class="text-[10px] font-mono text-slate-400 truncate max-w-full">{item.value}</span>
				</div>
			{/each}
		</div>

		<div class="grid grid-cols-4 gap-2 w-full mt-4 text-center">
			<div class="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
				<div class="text-[10px] text-slate-400">Mean (x̄)</div>
				<div class="text-sm font-bold font-mono text-indigo-400">{data.mean}</div>
			</div>
			<div class="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
				<div class="text-[10px] text-slate-400">Median</div>
				<div class="text-sm font-bold font-mono text-emerald-400">{data.median}</div>
			</div>
			<div class="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
				<div class="text-[10px] text-slate-400">Q1</div>
				<div class="text-sm font-bold font-mono text-amber-400">{data.q1}</div>
			</div>
			<div class="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
				<div class="text-[10px] text-slate-400">Q3</div>
				<div class="text-sm font-bold font-mono text-rose-400">{data.q3}</div>
			</div>
		</div>
	{/if}
</div>
