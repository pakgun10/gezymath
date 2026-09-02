<script lang="ts">
	import { evaluateMathExpression } from '$lib/algorithms/calculator';
	import { Plus, Minus, RotateCcw } from 'lucide-svelte';

	interface Props {
		expression: string;
	}

	let { expression = 'x^2' }: Props = $props();

	let zoom = $state(20); // pixels per unit
	let offsetX = $state(0);
	let offsetY = $state(0);

	const width = 360;
	const height = 280;
	const centerX = $derived(width / 2 + offsetX);
	const centerY = $derived(height / 2 + offsetY);

	function toSvgX(x: number) {
		return centerX + x * zoom;
	}
	function toSvgY(y: number) {
		return centerY - y * zoom;
	}

	let pathPoints = $derived.by(() => {
		const points: string[] = [];
		const step = 0.1;
		const minX = -15;
		const maxX = 15;

		for (let x = minX; x <= maxX; x += step) {
			const exprWithX = expression.replace(/x/g, `(${x.toFixed(2)})`);
			const evalResult = evaluateMathExpression(exprWithX);
			if (typeof evalResult.result === 'number' || !isNaN(Number(evalResult.result))) {
				const y = Number(evalResult.result);
				if (isFinite(y) && Math.abs(y) < 100) {
					const sx = toSvgX(x);
					const sy = toSvgY(y);
					points.push(`${points.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
				}
			}
		}
		return points.join(' ');
	});

	function handleZoomIn() {
		zoom = Math.min(60, zoom + 5);
	}
	function handleZoomOut() {
		zoom = Math.max(8, zoom - 5);
	}
	function handleReset() {
		zoom = 20;
		offsetX = 0;
		offsetY = 0;
	}
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2 flex items-center justify-between w-full">
		<span>Plotter Grafik y = {expression}</span>
		<div class="flex items-center gap-1">
			<button type="button" onclick={handleZoomOut} class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
				<Minus class="w-3.5 h-3.5" />
			</button>
			<button type="button" onclick={handleZoomIn} class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
				<Plus class="w-3.5 h-3.5" />
			</button>
			<button type="button" onclick={handleReset} class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" title="Reset Zoom">
				<RotateCcw class="w-3.5 h-3.5" />
			</button>
		</div>
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-hidden rounded-xl bg-slate-950/60 border border-slate-800/80">
		<defs>
			<pattern id="fnGrid" width="{zoom}" height="{zoom}" patternUnits="userSpaceOnUse">
				<path d="M {zoom} 0 L 0 0 0 {zoom}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#fnGrid)" />

		<!-- Axes -->
		<line x1="0" y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={centerX} y1="0" x2={centerX} y2={height} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Function Plot Line -->
		{#if pathPoints}
			<path d={pathPoints} fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
		{/if}
	</svg>
</div>
