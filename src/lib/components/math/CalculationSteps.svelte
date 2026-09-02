<script lang="ts">
	import { ChevronDown, ListOrdered } from 'lucide-svelte';

	interface Props {
		steps: string[];
		title?: string;
		defaultOpen?: boolean;
	}

	let { steps = [], title = 'Langkah Perhitungan Lengkap', defaultOpen = true }: Props = $props();

	let isOpen = $state(defaultOpen);
</script>

{#if steps.length > 0}
	<div class="rounded-xl border border-indigo-500/20 bg-slate-900/60 overflow-hidden backdrop-blur-sm transition-all duration-300">
		<button
			type="button"
			onclick={() => (isOpen = !isOpen)}
			class="w-full flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800/70 text-left transition-colors font-medium text-slate-200"
		>
			<div class="flex items-center gap-2.5">
				<div class="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
					<ListOrdered class="w-5 h-5" />
				</div>
				<span class="font-heading font-semibold text-slate-100">{title}</span>
			</div>
			<ChevronDown class="w-5 h-5 text-slate-400 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}" />
		</button>

		{#if isOpen}
			<div class="p-4 space-y-2.5 border-t border-slate-800/60 text-sm font-mono text-slate-300 leading-relaxed bg-slate-950/40">
				{#each steps as step, i}
					<div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/50 flex items-start gap-3 hover:border-indigo-500/30 transition-colors">
						<span class="inline-flex items-center justify-center min-w-6 h-6 rounded-md bg-indigo-500/15 text-indigo-400 text-xs font-semibold shrink-0">
							{i + 1}
						</span>
						<div class="break-words w-full overflow-x-auto whitespace-pre-wrap">{step}</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
