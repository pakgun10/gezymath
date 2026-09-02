<script lang="ts">
	import type { VennResult } from '$lib/algorithms/venn';

	interface Props {
		data: VennResult;
	}

	let { data }: Props = $props();

	let selectedRegion = $state<string | null>(null);

	const nameA = $derived(data.sets[0]?.name || 'A');
	const nameB = $derived(data.sets[1]?.name || 'B');
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Diagram Venn 2 Himpunan
	</div>

	<svg viewBox="0 0 340 220" class="w-full max-w-sm h-auto overflow-visible select-none">
		<!-- Set A Circle -->
		<circle
			cx="125"
			cy="110"
			r="75"
			fill={selectedRegion === 'onlyA' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.18)'}
			stroke="#6366f1"
			stroke-width="2.5"
			class="cursor-pointer transition-colors duration-200"
			onclick={() => (selectedRegion = selectedRegion === 'onlyA' ? null : 'onlyA')}
		/>

		<!-- Set B Circle -->
		<circle
			cx="215"
			cy="110"
			r="75"
			fill={selectedRegion === 'onlyB' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(236, 72, 153, 0.18)'}
			stroke="#ec4899"
			stroke-width="2.5"
			class="cursor-pointer transition-colors duration-200"
			onclick={() => (selectedRegion = selectedRegion === 'onlyB' ? null : 'onlyB')}
		/>

		<!-- Set Labels -->
		<text x="85" y="60" fill="#a5b4fc" font-size="16" font-weight="extrabold">{nameA}</text>
		<text x="245" y="60" fill="#fbcfe8" font-size="16" font-weight="extrabold">{nameB}</text>

		<!-- Elements inside Only A -->
		<text x="100" y="115" fill="#e0e7ff" font-size="12" font-weight="bold" text-anchor="middle">
			{data.onlyA.slice(0, 4).join(', ')}{data.onlyA.length > 4 ? '...' : ''}
		</text>

		<!-- Elements inside Intersection (A ∩ B) -->
		<text x="170" y="115" fill="#f8fafc" font-size="13" font-weight="extrabold" text-anchor="middle">
			{data.intersection.slice(0, 3).join(', ')}{data.intersection.length > 3 ? '...' : ''}
		</text>

		<!-- Elements inside Only B -->
		<text x="240" y="115" fill="#fce7f3" font-size="12" font-weight="bold" text-anchor="middle">
			{data.onlyB.slice(0, 4).join(', ')}{data.onlyB.length > 4 ? '...' : ''}
		</text>
	</svg>

	<!-- Subset Info Cards -->
	<div class="grid grid-cols-3 gap-2 w-full mt-3 text-center">
		<div class="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
			<div class="text-[10px] font-semibold uppercase">{nameA} - {nameB}</div>
			<div class="text-sm font-bold font-mono">{data.onlyA.length} anggota</div>
		</div>
		<div class="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
			<div class="text-[10px] font-semibold uppercase">{nameA} ∩ {nameB}</div>
			<div class="text-sm font-bold font-mono">{data.intersection.length} anggota</div>
		</div>
		<div class="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300">
			<div class="text-[10px] font-semibold uppercase">{nameB} - {nameA}</div>
			<div class="text-sm font-bold font-mono">{data.onlyB.length} anggota</div>
		</div>
	</div>
</div>
