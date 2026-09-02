<script lang="ts">
	import { CATEGORIES } from '$lib/config/categories';
	import { TOOLS } from '$lib/config/tools';
	import { page } from '$app/state';
	import { Home, Sparkles, Star } from 'lucide-svelte';

	let currentPath = $derived(page.url.pathname);
</script>

<aside class="w-64 h-[calc(100vh-61px)] sticky top-[61px] glass-panel border-r border-slate-800/80 p-4 hidden lg:flex flex-col justify-between overflow-y-auto">
	<div class="space-y-6">
		<!-- Main Navigation -->
		<div class="space-y-1">
			<a
				href="/math"
				class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors {currentPath === '/math' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'}"
			>
				<Home class="w-4 h-4" />
				<span>Beranda Math Tools</span>
			</a>
		</div>

		<!-- MVP Core Tools -->
		<div>
			<div class="px-3 mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
				<span>Alat Utama (MVP)</span>
				<Sparkles class="w-3.5 h-3.5 text-indigo-400" />
			</div>
			<div class="space-y-1">
				{#each TOOLS as tool}
					<a
						href={tool.route}
						class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors {currentPath === tool.route ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}"
					>
						<span class="w-1.5 h-1.5 rounded-full {currentPath === tool.route ? 'bg-white' : 'bg-indigo-500/50'}"></span>
						<span class="truncate">{tool.title}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Categories -->
		<div>
			<div class="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
				Kategori
			</div>
			<div class="space-y-1">
				{#each CATEGORIES as cat}
					<a
						href="/math#kategori"
						class="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 transition-colors"
					>
						<span>{cat.name}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="pt-4 border-t border-slate-800/60 text-[11px] text-slate-500 text-center font-mono">
		GezyMath Tools v1.0.0 • Offline Ready
	</div>
</aside>
