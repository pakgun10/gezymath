<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import Sidebar from '$lib/components/ui/Sidebar.svelte';
	import BottomNav from '$lib/components/ui/BottomNav.svelte';
	import SearchModal from '$lib/components/ui/SearchModal.svelte';
	import { themeStore } from '$lib/stores/theme';

	let { children } = $props();

	let isSearchOpen = $state(false);

	onMount(() => {
		themeStore.initTheme();

		function handleKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				isSearchOpen = !isSearchOpen;
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="app-container min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
	<Header onOpenSearch={() => (isSearchOpen = true)} />

	<div class="flex flex-1 w-full max-w-7xl mx-auto">
		<Sidebar />
		<main class="flex-1 p-4 md:p-6 lg:p-8 mb-16 lg:mb-0 w-full overflow-x-hidden">
			{@render children()}
		</main>
	</div>

	<BottomNav onOpenSearch={() => (isSearchOpen = true)} />
	<SearchModal isOpen={isSearchOpen} onClose={() => (isSearchOpen = false)} />
</div>
