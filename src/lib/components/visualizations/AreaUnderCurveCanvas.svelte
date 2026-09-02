<script lang="ts">
	import { parsePolynomial } from '$lib/algorithms/calculus';

	interface Props {
		polyStr: string;
		lowerLimit: number;
		upperLimit: number;
		areaValue: number;
	}

	let { polyStr, lowerLimit, upperLimit, areaValue }: Props = $props();

	const width = 340;
	const height = 240;
	const padding = 35;

	function evalPoly(x: number): number {
		const terms = parsePolynomial(polyStr);
		let y = 0;
		terms.forEach((t) => {
			y += t.coef * Math.pow(x, t.exp);
		});
		return y;
	}

	// Calculate bounds
	let xMin = $derived(Math.min(lowerLimit - 2, -5));
	let xMax = $derived(Math.max(upperLimit + 2, 5));

	let samples = $derived.by(() => {
		const pts: { x: number; y: number }[] = [];
		const step = (xMax - xMin) / 100;
		for (let x = xMin; x <= xMax; x += step) {
			pts.push({ x, y: evalPoly(x) });
		}
		return pts;
	});

	let yMin = $derived(Math.min(...samples.map((s) => s.y), -2));
	let yMax = $derived(Math.max(...samples.map((s) => s.y), 10));

	function toSvgX(x: number): number {
		return padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
	}

	function toSvgY(y: number): number {
		return height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
	}

	let curvePathD = $derived.by(() => {
		return samples.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(' ');
	});

	let areaPathD = $derived.by(() => {
		const areaPts: string[] = [];
		const step = (upperLimit - lowerLimit) / 50;
		areaPts.push(`M ${toSvgX(lowerLimit)} ${toSvgY(0)}`);
		for (let x = lowerLimit; x <= upperLimit; x += step) {
			areaPts.push(`L ${toSvgX(x)} ${toSvgY(evalPoly(x))}`);
		}
		areaPts.push(`L ${toSvgX(upperLimit)} ${toSvgY(0)} Z`);
		return areaPts.join(' ');
	});
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Luas Daerah di Bawah Kurva
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-sm h-auto overflow-visible select-none rounded-xl bg-slate-950/60 border border-slate-800/80">
		<!-- Shaded Area Under Curve -->
		<path d={areaPathD} fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 2" />

		<!-- X and Y Axes -->
		<line x1={padding} y1={toSvgY(0)} x2={width - padding} y2={toSvgY(0)} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={toSvgX(0)} y1={padding} x2={toSvgX(0)} y2={height - padding} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Curve f(x) -->
		<path d={curvePathD} fill="none" stroke="#6366f1" stroke-width="2.5" />

		<!-- Limit Lines a and b -->
		<line x1={toSvgX(lowerLimit)} y1={toSvgY(0)} x2={toSvgX(lowerLimit)} y2={toSvgY(evalPoly(lowerLimit))} stroke="#f59e0b" stroke-width="2" />
		<line x1={toSvgX(upperLimit)} y1={toSvgY(0)} x2={toSvgX(upperLimit)} y2={toSvgY(evalPoly(upperLimit))} stroke="#f59e0b" stroke-width="2" />

		<!-- Limit Labels -->
		<text x={toSvgX(lowerLimit)} y={toSvgY(0) + 14} text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">a={lowerLimit}</text>
		<text x={toSvgX(upperLimit)} y={toSvgY(0) + 14} text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">b={upperLimit}</text>
	</svg>

	<!-- Badge Legend -->
	<div class="mt-3 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
		Luas Daerah ∫ = {areaValue}
	</div>
</div>
