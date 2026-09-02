<script lang="ts">
	import katex from 'katex';
	import { Check, Copy } from 'lucide-svelte';

	interface Props {
		latex: string;
		displayMode?: boolean;
		className?: string;
	}

	let { latex = '', displayMode = true, className = '' }: Props = $props();

	let copied = $state(false);

	let renderedHtml = $derived.by(() => {
		try {
			if (!latex) return '';
			return katex.renderToString(latex, {
				displayMode,
				throwOnError: false
			});
		} catch (err) {
			return latex;
		}
	});

	function handleCopy() {
		navigator.clipboard.writeText(latex);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="group relative inline-flex items-center gap-2 max-w-full overflow-x-auto p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 {className}">
	<div class="katex-wrapper overflow-x-auto py-1 px-2 font-mono">
		{@html renderedHtml}
	</div>
	<button
		type="button"
		onclick={handleCopy}
		aria-label="Salin Rumus"
		class="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white shrink-0"
		title="Salin Kode LaTeX"
	>
		{#if copied}
			<Check class="w-4 h-4 text-emerald-400" />
		{:else}
			<Copy class="w-4 h-4" />
		{/if}
	</button>
</div>

<style>
	.katex-wrapper :global(.katex-display) {
		margin: 0 !important;
	}
</style>
