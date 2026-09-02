<script lang="ts">
	import { TOOLS } from '$lib/config/tools';
	import { CATEGORIES } from '$lib/config/categories';
	import { ArrowRight, Search, X } from 'lucide-svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	let searchQuery = $state('');

	let filteredTools = $derived.by(() => {
		if (!searchQuery.trim()) return TOOLS;
		const query = searchQuery.toLowerCase().trim();
		return TOOLS.filter(
			(t) =>
				t.title.toLowerCase().includes(query) ||
				t.description.toLowerCase().includes(query) ||
				t.keywords.some((k) => k.toLowerCase().includes(query)) ||
				t.category.toLowerCase().includes(query)
		);
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
		<div class="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
			<!-- Header Input -->
			<div class="p-4 border-b border-slate-800 flex items-center gap-3">
				<Search class="w-5 h-5 text-indigo-400 shrink-0" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari misal: 'pythagoras', 'fpb', 'persamaan kuadrat', 'venn'..."
					class="w-full bg-transparent text-slate-100 placeholder-slate-500 font-sans text-base focus:outline-none"
					autofocus
				/>
				{#if searchQuery}
					<button type="button" onclick={() => (searchQuery = '')} class="p-1 text-slate-400 hover:text-slate-200">
						<X class="w-4 h-4" />
					</button>
				{/if}
				<button type="button" onclick={onClose} class="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white">
					ESC
				</button>
			</div>

			<!-- Search Results -->
			<div class="max-h-[60vh] overflow-y-auto p-3 space-y-2">
				{#if filteredTools.length === 0}
					<div class="p-8 text-center text-slate-400 text-sm">
						Tidak ada alat matematika yang cocok dengan "<span class="text-indigo-400 font-semibold">{searchQuery}</span>"
					</div>
				{:else}
					{#each filteredTools as tool}
						<a
							href={tool.route}
							onclick={onClose}
							class="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition-all group"
						>
							<div>
								<div class="flex items-center gap-2 mb-1">
									<h4 class="font-heading font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
										{tool.title}
									</h4>
									<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
										{tool.category}
									</span>
								</div>
								<p class="text-xs text-slate-400 line-clamp-1">{tool.description}</p>
							</div>
							<ArrowRight class="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}
