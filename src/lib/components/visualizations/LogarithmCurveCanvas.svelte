<script lang="ts">
	interface Props {
		base: number;
		value: number;
		logResult: number;
	}

	let { base, value, logResult }: Props = $props();

	const width = 320;
	const height = 200;
	const padding = 30;

	// X range 0.1 to 10
	function toSvgX(x: number): number {
		return padding + (x / 10) * (width - 2 * padding);
	}

	function evalLog(x: number): number {
		if (x <= 0 || base <= 0 || base === 1) return -5;
		return Math.log(x) / Math.log(base);
	}

	// Y range -3 to 4
	function toSvgY(y: number): number {
		return height - padding - ((y - (-3)) / (4 - (-3))) * (height - 2 * padding);
	}

	let curvePathD = $derived.by(() => {
		const pts: string[] = [];
		for (let x = 0.1; x <= 10; x += 0.2) {
			const y = evalLog(x);
			pts.push(`${pts.length === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`);
		}
		return pts.join(' ');
	});

	let px = $derived(toSvgX(value));
	let py = $derived(toSvgY(logResult));
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Kurva Logaritma f(x) = ᵃlog(x)
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-xs h-auto overflow-visible select-none rounded-xl bg-slate-950/60 border border-slate-800/80">
		<!-- Axes -->
		<line x1={padding} y1={toSvgY(0)} x2={width - padding} y2={toSvgY(0)} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={toSvgX(0)} y1={padding} x2={toSvgX(0)} y2={height - padding} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Log Curve -->
		<path d={curvePathD} fill="none" stroke="#38bdf8" stroke-width="2.5" />

		<!-- Point at (value, logResult) -->
		{#if value > 0 && value <= 10}
			<circle cx={px} cy={py} r="5" fill="#f43f5e" stroke="#ffffff" stroke-width="2" />
			<text x={px + 8} y={py - 6} fill="#f43f5e" font-size="10" font-weight="bold">
				({value}, {logResult})
			</text>
		{/if}
	</svg>

	<!-- Badge Legend -->
	<div class="mt-3 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
		{base}log({value}) = {logResult}
	</div>
</div>
