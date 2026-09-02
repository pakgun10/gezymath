<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { Calculator, Moon, Search, Sun } from 'lucide-svelte';

	interface Props {
		onOpenSearch: () => void;
	}

	let { onOpenSearch }: Props = $props();

	let currentTheme = $state('dark');
	$effect(() => {
		const unsubscribe = themeStore.subscribe((val) => (currentTheme = val));
		return unsubscribe;
	});

	function toggleTheme() {
		const next = currentTheme === 'dark' ? 'light' : 'dark';
		themeStore.setTheme(next);
	}
</script>

<header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
	<div class="flex items-center gap-3">
		<a href="/math" class="flex items-center gap-2.5 group">
			<div class="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
				<Calculator class="w-5 h-5" />
			</div>
			<div>
				<span class="text-lg font-extrabold font-heading tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
					GezyMath
				</span>
				<span class="text-[10px] font-semibold tracking-wider text-indigo-400 block -mt-1 uppercase">
					Math Tools Lab
				</span>
			</div>
		</a>
	</div>

	<!-- Quick Search Bar Trigger -->
	<button
		type="button"
		onclick={onOpenSearch}
		class="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-slate-200 text-sm transition-all w-64 lg:w-96 justify-between group"
	>
		<div class="flex items-center gap-2">
			<Search class="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
			<span>Cari alat matematika...</span>
		</div>
		<kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
	</button>

	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={onOpenSearch}
			class="md:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
			aria-label="Cari Alat"
		>
			<Search class="w-5 h-5" />
		</button>

		<button
			type="button"
			onclick={toggleTheme}
			class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
			aria-label="Ganti Tema"
			title="Ganti Tema Mode Gelap/Terang"
		>
			{#if currentTheme === 'dark'}
				<Sun class="w-5 h-5" />
			{:else}
				<Moon class="w-5 h-5" />
			{/if}
		</button>
	</div>
</header>
