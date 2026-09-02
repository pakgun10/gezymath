<script lang="ts">
	interface Props {
		eventN: number;
		sampleSpaceN: number;
		probabilityFraction: string;
		percentage: number;
	}

	let { eventN, sampleSpaceN, probabilityFraction, percentage }: Props = $props();

	const width = 320;
	const height = 200;
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Ruang Sampel S & Kejadian A
	</div>

	<svg viewBox="0 0 {width} {height}" class="w-full max-w-xs h-auto overflow-visible select-none rounded-xl bg-slate-950/60 border border-slate-800/80">
		<!-- Sample Space Rectangle (S) -->
		<rect x="20" y="20" width={width - 40} height={height - 40} rx="12" fill="rgba(30, 41, 59, 0.5)" stroke="#64748b" stroke-width="2" />
		<text x="35" y="42" fill="#94a3b8" font-size="12" font-weight="bold">S (n={sampleSpaceN})</text>

		<!-- Event Circle A -->
		<circle cx={width / 2} cy={height / 2 + 5} r="55" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" stroke-width="2.5" />
		<text x={width / 2} y={height / 2 - 5} text-anchor="middle" fill="#818cf8" font-size="13" font-weight="bold">A (n={eventN})</text>
		<text x={width / 2} y={height / 2 + 15} text-anchor="middle" fill="#38bdf8" font-size="12" font-family="monospace" font-weight="bold">P(A) = {probabilityFraction}</text>
	</svg>

	<!-- Badge Legend -->
	<div class="mt-3 flex items-center justify-between w-full text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
		<span class="text-slate-300">Peluang P(A): <strong class="text-indigo-400">{probabilityFraction}</strong></span>
		<span class="text-emerald-400 font-bold">{percentage}%</span>
	</div>
</div>
