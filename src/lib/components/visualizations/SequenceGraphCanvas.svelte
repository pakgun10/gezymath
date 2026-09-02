<script lang="ts">
	interface Props {
		terms: number[];
		type: 'arithmetic' | 'geometric';
	}

	let { terms, type }: Props = $props();

	const width = 340;
	const height = 200;
	const padding = 35;

	let yMin = $derived(Math.min(...terms, 0));
	let yMax = $derived(Math.max(...terms, 10));

	function toSvgX(i: number): number {
		return padding + (i / (terms.length - 1 || 1)) * (width - 2 * padding);
	}

	function toSvgY(y: number): number {
		return height - padding - ((y - yMin) / (yMax - yMin || 1)) * (height - 2 * padding);
	}

	let pathD = $derived.by(() => {
		return terms.map((t, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(i)} ${toSvgY(t)}`).join(' ');
	});
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Pertumbuhan Suku U_n ({type === 'arithmetic' ? 'Aritmetika' : 'Geometri'})
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-visible select-none rounded-xl bg-slate-950/60 border border-slate-800/80">
		<!-- Axis line -->
		<line x1={padding} y1={toSvgY(0)} x2={width - padding} y2={toSvgY(0)} stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />

		<!-- Connection line -->
		<path d={pathD} fill="none" stroke={type === 'arithmetic' ? '#38bdf8' : '#f43f5e'} stroke-width="2" stroke-dasharray="3 3" />

		<!-- Data Points -->
		{#each terms as t, i}
			<circle cx={toSvgX(i)} cy={toSvgY(t)} r="5" fill={type === 'arithmetic' ? '#38bdf8' : '#f43f5e'} stroke="#ffffff" stroke-width="2" />
			<text x={toSvgX(i)} y={toSvgY(t) - 8} text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">
				U{i + 1}={t}
			</text>
		{/each}
	</svg>
</div>
