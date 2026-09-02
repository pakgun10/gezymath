<script lang="ts">
	import type { QuadraticResult } from '$lib/algorithms/quadratic';

	interface Props {
		data: QuadraticResult;
	}

	let { data }: Props = $props();

	// SVG viewport setup
	const width = 360;
	const height = 280;
	const centerX = width / 2;
	const centerY = height / 2;
	const scale = 20; // 20px per unit

	function toSvgX(x: number) {
		return centerX + x * scale;
	}

	function toSvgY(y: number) {
		return centerY - y * scale;
	}

	let pathD = $derived.by(() => {
		if (!data.graphPoints || data.graphPoints.length === 0) return '';
		return data.graphPoints
			.map((pt, i) => {
				const sx = toSvgX(pt.x);
				const sy = toSvgY(pt.y);
				return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
			})
			.join(' ');
	});
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2 flex items-center justify-between w-full">
		<span>Grafik Parabola y = {data.a}x² + {data.b}x + {data.c}</span>
		<span class="text-indigo-400 font-mono">D = {data.discriminant}</span>
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80">
		<!-- Grid lines -->
		<defs>
			<pattern id="cartesianGrid" width="{scale}" height="{scale}" patternUnits="userSpaceOnUse">
				<path d="M {scale} 0 L 0 0 0 {scale}" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#cartesianGrid)" />

		<!-- Axes -->
		<line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={centerX} y1="0" x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Axis Labels -->
		<text x={width - 15} y={centerY - 6} fill="#94a3b8" font-size="10" font-weight="bold">X</text>
		<text x={centerX + 6} y="15" fill="#94a3b8" font-size="10" font-weight="bold">Y</text>

		<!-- Axis of Symmetry line -->
		<line
			x1={toSvgX(data.axisOfSymmetry)}
			y1="0"
			x2={toSvgX(data.axisOfSymmetry)}
			y2={height}
			stroke="#f59e0b"
			stroke-width="1.5"
			stroke-dasharray="4 4"
		/>

		<!-- Parabola Curve -->
		<path d={pathD} fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

		<!-- Vertex Point -->
		<circle cx={toSvgX(data.vertex.x)} cy={toSvgY(data.vertex.y)} r="5" fill="#ec4899" stroke="#ffffff" stroke-width="2" />

		<!-- Real Roots Points if any -->
		{#if data.rootType === 'two-real' || data.rootType === 'one-real'}
			<circle cx={toSvgX(data.x1.re)} cy={toSvgY(0)} r="4" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
			{#if data.rootType === 'two-real'}
				<circle cx={toSvgX(data.x2.re)} cy={toSvgY(0)} r="4" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
			{/if}
		{/if}
	</svg>

	<div class="mt-3 flex items-center justify-between w-full text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800">
		<div>
			<span class="text-slate-500">Puncak:</span> P({data.vertex.x}, {data.vertex.y})
		</div>
		<div>
			<span class="text-slate-500">Sumbu Simetri:</span> x = {data.axisOfSymmetry}
		</div>
	</div>
</div>
