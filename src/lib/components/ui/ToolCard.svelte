<script lang="ts">
	import type { Tool } from '$lib/types/tool';
	import { CATEGORIES } from '$lib/config/categories';
	import { favoritesStore } from '$lib/stores/userTools';
	import { ArrowRight, Star } from 'lucide-svelte';

	interface Props {
		tool: Tool;
	}

	let { tool }: Props = $props();

	let favorites = $state<string[]>([]);
	$effect(() => {
		const unsubscribe = favoritesStore.subscribe((value) => {
			favorites = value;
		});
		return unsubscribe;
	});

	let category = $derived(CATEGORIES.find((c) => c.id === tool.category));
	let isFav = $derived(favorites.includes(tool.id));

	function toggleFav(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		favoritesStore.toggleFavorite(tool.id);
	}
</script>

<a
	href={tool.route}
	class="glass-card p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden h-full border hover:border-indigo-500/40 transition-all duration-300"
>
	<div>
		<div class="flex items-start justify-between mb-3">
			<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border {category?.badgeColor || 'bg-slate-800 text-slate-300'}">
				{category?.name || tool.category}
			</span>

			<button
				type="button"
				onclick={toggleFav}
				class="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
				aria-label="Favoritkan Alat"
			>
				<Star class="w-4 h-4 {isFav ? 'fill-amber-400 text-amber-400' : ''}" />
			</button>
		</div>

		<h3 class="text-lg font-bold font-heading text-slate-100 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
			{tool.title}
		</h3>

		<p class="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
			{tool.description}
		</p>
	</div>

	<div class="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
		<span class="text-xs font-medium text-slate-500">Tingkat: {tool.educationalLevel}</span>
		<div class="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform duration-200">
			<span>Buka Alat</span>
			<ArrowRight class="w-3.5 h-3.5" />
		</div>
	</div>
</a>
