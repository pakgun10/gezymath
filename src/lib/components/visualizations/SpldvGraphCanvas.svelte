<script lang="ts">
	import type { SpldvResult } from '$lib/algorithms/spldv';

	interface Props {
		data: SpldvResult;
		a1: number;
		b1: number;
		c1: number;
		a2: number;
		b2: number;
		c2: number;
	}

	let { data, a1, b1, c1, a2, b2, c2 }: Props = $props();

	const width = 360;
	const height = 260;
	const centerX = width / 2;
	const centerY = height / 2;
	const scale = 20;

	function toSvgX(x: number) {
		return centerX + x * scale;
	}
	function toSvgY(y: number) {
		return centerY - y * scale;
	}

	// Calculate 2 points for Line 1 (a1*x + b1*y = c1)
	let line1Points = $derived.by(() => {
		if (b1 !== 0) {
			const yLeft = (c1 - a1 * -10) / b1;
			const yRight = (c1 - a1 * 10) / b1;
			return { x1: toSvgX(-10), y1: toSvgY(yLeft), x2: toSvgX(10), y2: toSvgY(yRight) };
		} else {
			const xVal = c1 / a1;
			return { x1: toSvgX(xVal), y1: 0, x2: toSvgX(xVal), y2: height };
		}
	});

	// Calculate 2 points for Line 2 (a2*x + b2*y = c2)
	let line2Points = $derived.by(() => {
		if (b2 !== 0) {
			const yLeft = (c2 - a2 * -10) / b2;
			const yRight = (c2 - a2 * 10) / b2;
			return { x1: toSvgX(-10), y1: toSvgY(yLeft), x2: toSvgX(10), y2: toSvgY(yRight) };
		} else {
			const xVal = c2 / a2;
			return { x1: toSvgX(xVal), y1: 0, x2: toSvgX(xVal), y2: height };
		}
	});
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Grafik Persilangan Garis SPLDV
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80">
		<defs>
			<pattern id="spldvGrid" width="{scale}" height="{scale}" patternUnits="userSpaceOnUse">
				<path d="M {scale} 0 L 0 0 0 {scale}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#spldvGrid)" />

		<!-- Axes -->
		<line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={centerX} y1="0" x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Line 1 -->
		<line x1={line1Points.x1} y1={line1Points.y1} x2={line1Points.x2} y2={line1Points.y2} stroke="#818cf8" stroke-width="2.5" />

		<!-- Line 2 -->
		<line x1={line2Points.x1} y1={line2Points.y1} x2={line2Points.x2} y2={line2Points.y2} stroke="#f43f5e" stroke-width="2.5" />

		<!-- Intersection Point -->
		{#if data.hasUniqueSolution && data.x !== undefined && data.y !== undefined}
			<circle cx={toSvgX(data.x)} cy={toSvgY(data.y)} r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" />
			<text x={toSvgX(data.x) + 8} y={toSvgY(data.y) - 8} fill="#34d399" font-size="11" font-weight="extrabold" font-family="monospace">
				P({data.x}, {data.y})
			</text>
		{/if}
	</svg>

	<div class="mt-3 flex items-center justify-around w-full text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
			<span class="text-slate-300">Garis 1</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
			<span class="text-slate-300">Garis 2</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
			<span class="text-slate-300">Titik Potong</span>
		</div>
	</div>
</div>
