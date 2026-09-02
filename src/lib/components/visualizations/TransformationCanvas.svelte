<script lang="ts">
	import type { TransformationResult } from '$lib/algorithms/transformation';

	interface Props {
		data: TransformationResult;
	}

	let { data }: Props = $props();

	const width = 340;
	const height = 260;
	const centerX = width / 2;
	const centerY = height / 2;
	const scale = 18;

	function toSvgX(x: number) {
		return centerX + x * scale;
	}
	function toSvgY(y: number) {
		return centerY - y * scale;
	}

	let origPointsStr = $derived(
		data.originalPoints.map((p) => `${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`).join(' ')
	);

	let transPointsStr = $derived(
		data.transformedPoints.map((p) => `${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`).join(' ')
	);
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2 flex items-center justify-between w-full">
		<span>Bidang Kartesius Transformasi ({data.type.toUpperCase()})</span>
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80">
		<defs>
			<pattern id="transGrid" width="{scale}" height="{scale}" patternUnits="userSpaceOnUse">
				<path d="M {scale} 0 L 0 0 0 {scale}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#transGrid)" />

		<!-- Axes -->
		<line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={centerX} y1="0" x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Original Polygon -->
		{#if data.originalPoints.length > 1}
			<polygon points={origPointsStr} fill="rgba(99, 102, 241, 0.2)" stroke="#818cf8" stroke-width="2" stroke-dasharray="3 3" />
		{/if}

		<!-- Transformed Polygon -->
		{#if data.transformedPoints.length > 1}
			<polygon points={transPointsStr} fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2.5" />
		{/if}

		<!-- Original Points -->
		{#each data.originalPoints as p}
			<circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="#818cf8" />
			<text x={toSvgX(p.x) + 6} y={toSvgY(p.y) - 6} fill="#a5b4fc" font-size="10" font-weight="bold">{p.label || ''}</text>
		{/each}

		<!-- Transformed Points -->
		{#each data.transformedPoints as p}
			<circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="#10b981" />
			<text x={toSvgX(p.x) + 6} y={toSvgY(p.y) - 6} fill="#6ee7b7" font-size="10" font-weight="bold">{p.label || ''}</text>
		{/each}
	</svg>

	<div class="mt-3 flex items-center justify-around w-full text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
			<span class="text-slate-300">Objek Asal</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
			<span class="text-slate-300">Hasil Transformasi</span>
		</div>
	</div>
</div>
