<script lang="ts">
	import { degToRad, type TrigonometryResult } from '$lib/algorithms/trigonometry';

	interface Props {
		data: TrigonometryResult;
		angle: number;
	}

	let { data, angle }: Props = $props();

	const width = 320;
	const height = 320;
	const cx = width / 2;
	const cy = height / 2;
	const R = 110;

	let rad = $derived(degToRad(((angle % 360) + 360) % 360));
	let px = $derived(cx + R * Math.cos(rad));
	let py = $derived(cy - R * Math.sin(rad));

	// Arc path for angle
	let arcD = $derived.by(() => {
		const arcR = 30;
		const endX = cx + arcR * Math.cos(rad);
		const endY = cy - arcR * Math.sin(rad);
		const largeArc = angle > 180 ? 1 : 0;
		return `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${endX} ${endY}`;
	});
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Lingkaran Satuan (Unit Circle)
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-xs h-auto overflow-visible select-none rounded-xl bg-slate-950/60 border border-slate-800/80">
		<defs>
			<pattern id="ucGrid" width="20" height="20" patternUnits="userSpaceOnUse">
				<path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#ucGrid)" />

		<!-- Unit Circle -->
		<circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="4 4" />

		<!-- X and Y Axes -->
		<line x1="20" y1={cy} x2={width - 20} y2={cy} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
		<line x1={cx} y1="20" x2={cx} y2={height - 20} stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

		<!-- Angle Arc -->
		{#if angle > 0}
			<path d={arcD} fill="none" stroke="#f59e0b" stroke-width="2" />
		{/if}

		<!-- Radius Vector (Hypotenuse) -->
		<line x1={cx} y1={cy} x2={px} y2={py} stroke="#818cf8" stroke-width="2.5" />

		<!-- Cosine Line (X projection) -->
		<line x1={cx} y1={cy} x2={px} y2={cy} stroke="#60a5fa" stroke-width="3" />

		<!-- Sine Line (Y projection) -->
		<line x1={px} y1={cy} x2={px} y2={py} stroke="#34d399" stroke-width="3" />

		<!-- Point P -->
		<circle cx={px} cy={py} r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="2" />

		<!-- Point Label -->
		<text x={px + 8} y={py - 8} fill="#f43f5e" font-size="11" font-weight="extrabold" font-family="monospace">
			P({data.cos}, {data.sin})
		</text>
	</svg>

	<!-- Legend -->
	<div class="mt-3 flex items-center justify-around w-full text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
			<span class="text-slate-300">cos(θ)</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
			<span class="text-slate-300">sin(θ)</span>
		</div>
		<div class="flex items-center gap-1.5">
			<span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
			<span class="text-slate-300">r = 1</span>
		</div>
	</div>
</div>
