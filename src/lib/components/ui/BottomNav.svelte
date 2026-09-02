<script lang="ts">
	import { Calculator, Home, Search, Shapes, Variable } from 'lucide-svelte';
	import { page } from '$app/state';

	interface Props {
		onOpenSearch: () => void;
	}

	let { onOpenSearch }: Props = $props();

	let currentPath = $derived(page.url.pathname);
</script>

<nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/80 px-4 py-2 flex items-center justify-around">
	<a
		href="/math"
		class="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors {currentPath === '/math' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}"
	>
		<Home class="w-5 h-5" />
		<span>Beranda</span>
	</a>

	<a
		href="/math/tripel-pythagoras"
		class="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors {currentPath.includes('pythagoras') ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}"
	>
		<Shapes class="w-5 h-5" />
		<span>Pythagoras</span>
	</a>

	<button
		type="button"
		onclick={onOpenSearch}
		class="flex flex-col items-center gap-1 text-[10px] font-semibold text-indigo-400 -mt-5 p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
	>
		<Search class="w-5 h-5 text-white" />
	</button>

	<a
		href="/math/persamaan-kuadrat"
		class="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors {currentPath.includes('kuadrat') ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}"
	>
		<Variable class="w-5 h-5" />
		<span>Kuadrat</span>
	</a>

	<a
		href="/math/kalkulator"
		class="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors {currentPath.includes('kalkulator') ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}"
	>
		<Calculator class="w-5 h-5" />
		<span>Hitung</span>
	</a>
</nav>
