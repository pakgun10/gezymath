<script lang="ts">
	import { TOOLS } from '$lib/config/tools';
	import { CATEGORIES } from '$lib/config/categories';
	import ToolCard from '$lib/components/ui/ToolCard.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import { evaluateMathExpression } from '$lib/algorithms/calculator';
	import { favoritesStore, recentStore } from '$lib/stores/userTools';
	import { Calculator, Sparkles, Search, Star, History, ArrowRight, Zap } from 'lucide-svelte';

	let searchQuery = $state('');
	let selectedCategory = $state<string | null>(null);

	let favorites = $state<string[]>([]);
	let recents = $state<string[]>([]);

	$effect(() => {
		const unSubFav = favoritesStore.subscribe((val) => (favorites = val));
		const unSubRec = recentStore.subscribe((val) => (recents = val));
		return () => {
			unSubFav();
			unSubRec();
		};
	});

	// Quick Calculator State
	let calcExpr = $state('2^3 + sqrt(16)');
	let calcRes = $derived(evaluateMathExpression(calcExpr));

	let popularTools = $derived(TOOLS.filter((t) => t.popular));
	let recentToolsList = $derived(TOOLS.filter((t) => recents.includes(t.id)));

	let filteredTools = $derived.by(() => {
		let list = TOOLS;
		if (selectedCategory) {
			list = list.filter((t) => t.category === selectedCategory);
		}
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter(
				(t) =>
					t.title.toLowerCase().includes(q) ||
					t.description.toLowerCase().includes(q) ||
					t.keywords.some((k) => k.toLowerCase().includes(q))
			);
		}
		return list;
	});
</script>

<svelte:head>
	<title>GezyMath — Laboratorium & Alat Matematika Interaktif</title>
	<meta
		name="description"
		content="Platform laboratorium matematika interaktif modern untuk siswa & guru. Dilengkapi kalkulator tripel Pythagoras, persamaan kuadrat, FPB KPK, diagram Venn, dan grafik fungsi."
	/>
</svelte:head>

<div class="space-y-10">
	<!-- Hero Section -->
	<section class="glass-panel p-6 md:p-10 rounded-3xl border border-indigo-500/20 relative overflow-hidden bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950">
		<div class="absolute -right-20 -top-20 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
		<div class="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

		<div class="relative z-10 max-w-3xl space-y-4">
			<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
				<Sparkles class="w-4 h-4" />
				<span>Laboratorium Matematika Interaktif Siswa & Guru</span>
			</div>

			<h1 class="text-3xl md:text-5xl font-extrabold font-heading text-slate-100 tracking-tight leading-tight">
				Eksplorasi & Hitung Matematika dengan <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hero-title-gradient">Visualisasi Real-Time</span>
			</h1>

			<p class="text-slate-400 text-base md:text-lg leading-relaxed">
				Koleksi alat matematika modern tanpa perantara server. Semua perhitungan dan grafik diproses secara instan di peramban Anda.
			</p>

			<!-- Quick Search Bar -->
			<div class="pt-2">
				<div class="relative flex items-center max-w-xl">
					<Search class="w-5 h-5 absolute left-4 text-slate-400" />
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Cari alat (contoh: Pythagoras, FPB KPK, Kuadrat, Venn)..."
						class="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-slate-100 placeholder-slate-500 font-sans text-sm md:text-base outline-none shadow-xl transition-all"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Calculator Widget -->
	<section class="glass-card p-5 rounded-2xl border border-slate-800">
		<div class="flex items-center justify-between mb-3">
			<div class="flex items-center gap-2">
				<div class="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
					<Zap class="w-4 h-4" />
				</div>
				<h3 class="font-heading font-bold text-sm text-slate-200">Kalkulator Cepat Beranda</h3>
			</div>
			<a href="/math/kalkulator" class="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1">
				Buka Kalkulator Ilmiah Lengkap <ArrowRight class="w-3 h-3" />
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
			<div>
				<input
					type="text"
					bind:value={calcExpr}
					placeholder="Tulis misal: 2^3 + sqrt(16)"
					class="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
				/>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm font-semibold text-slate-400">=</span>
				<div class="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-lg font-bold">
					{calcRes.result}
				</div>
				{#if calcRes.latex}
					<FormulaDisplay latex={calcRes.latex} displayMode={false} className="py-1" />
				{/if}
			</div>
		</div>
	</section>

	<!-- Recently Used Section -->
	{#if recentToolsList.length > 0}
		<section class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold font-heading text-slate-100 flex items-center gap-2">
					<History class="w-5 h-5 text-indigo-400" />
					<span>Baru Saja Digunakan</span>
				</h2>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each recentToolsList as tool}
					<ToolCard {tool} />
				{/each}
			</div>
		</section>
	{/if}

	<!-- Categories Bar -->
	<section id="kategori" class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold font-heading text-slate-100">Kategori Alat Matematika</h2>
			{#if selectedCategory}
				<button
					type="button"
					onclick={() => (selectedCategory = null)}
					class="text-xs text-indigo-400 hover:underline font-semibold"
				>
					Tampilkan Semua Kategori
				</button>
			{/if}
		</div>

		<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
			<button
				type="button"
				onclick={() => (selectedCategory = null)}
				class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border {selectedCategory === null ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'}"
			>
				Semua Alat ({TOOLS.length})
			</button>
			{#each CATEGORIES as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat.id)}
					class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border {selectedCategory === cat.id ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'}"
				>
					{cat.name}
				</button>
			{/each}
		</div>
	</section>

	<!-- Tools Grid -->
	<section class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold font-heading text-slate-100 flex items-center gap-2">
				<Sparkles class="w-5 h-5 text-indigo-400" />
				<span>{selectedCategory ? `Kategori: ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}` : 'Semua Alat Matematika (MVP)'}</span>
			</h2>
			<span class="text-xs text-slate-500 font-mono">Ditemukan: {filteredTools.length} alat</span>
		</div>

		{#if filteredTools.length === 0}
			<div class="p-12 text-center glass-panel rounded-2xl text-slate-400 space-y-2">
				<p class="text-base">Tidak ada alat matematika yang cocok dengan pencarian Anda.</p>
				<button
					type="button"
					onclick={() => {
						searchQuery = '';
						selectedCategory = null;
					}}
					class="text-xs font-semibold text-indigo-400 hover:underline"
				>
					Reset Filter & Pencarian
				</button>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each filteredTools as tool}
					<ToolCard {tool} />
				{/each}
			</div>
		{/if}
	</section>
</div>
