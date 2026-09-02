<script lang="ts">
	import { Check, Copy, Share2, Sparkles } from 'lucide-svelte';

	interface Props {
		title?: string;
		value: string | number;
		subtext?: string;
		badge?: string;
		accentColor?: 'indigo' | 'emerald' | 'cyan' | 'amber' | 'rose';
	}

	let { title = 'Hasil Perhitungan', value, subtext, badge, accentColor = 'indigo' }: Props = $props();

	let copied = $state(false);

	const accentStyles = {
		indigo: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
		emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
		cyan: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
		amber: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
		rose: 'border-rose-500/30 bg-rose-500/5 text-rose-400'
	};

	function handleCopy() {
		navigator.clipboard.writeText(String(value));
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="glass-panel p-5 rounded-2xl border flex flex-col justify-between relative overflow-hidden group {accentStyles[accentColor]}">
	<div class="flex items-start justify-between gap-3 mb-2">
		<div class="flex items-center gap-2">
			<Sparkles class="w-4 h-4" />
			<h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
		</div>
		{#if badge}
			<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-indigo-300 border border-indigo-500/20">
				{badge}
			</span>
		{/if}
	</div>

	<div class="my-2">
		<div class="text-3xl md:text-4xl font-bold font-heading text-slate-100 tracking-tight break-all">
			{value}
		</div>
		{#if subtext}
			<p class="text-sm text-slate-400 mt-1">{subtext}</p>
		{/if}
	</div>

	<div class="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-800/60">
		<button
			type="button"
			onclick={handleCopy}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
		>
			{#if copied}
				<Check class="w-3.5 h-3.5 text-emerald-400" />
				<span class="text-emerald-400">Tersalin</span>
			{:else}
				<Copy class="w-3.5 h-3.5" />
				<span>Salin Hasil</span>
			{/if}
		</button>
	</div>
</div>
