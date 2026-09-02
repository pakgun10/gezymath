<script lang="ts">
	import { onMount } from 'svelte';
	import { generatePythagoreanTriples, checkPythagoreanTriple, type PythagoreanTriple } from '$lib/algorithms/pythagoras';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import RightTriangleCanvas from '$lib/components/visualizations/RightTriangleCanvas.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import { Copy, Check, Filter, Shapes } from 'lucide-svelte';

	let maxN = $state(50);
	let primitiveOnly = $state(true);

	// Custom triple test
	let testA = $state(3);
	let testB = $state(4);
	let testC = $state(5);

	let triples = $derived(generatePythagoreanTriples(Number(maxN) || 50, primitiveOnly));
	let testResult = $derived(checkPythagoreanTriple(Number(testA) || 0, Number(testB) || 0, Number(testC) || 0));

	let copiedIndex = $state<number | null>(null);

	onMount(() => {
		recentStore.addRecent('tripel-pythagoras');
	});

	function copyTriple(t: PythagoreanTriple, index: number) {
		navigator.clipboard.writeText(`${t.a}, ${t.b}, ${t.c}`);
		copiedIndex = index;
		setTimeout(() => (copiedIndex = null), 2000);
	}
</script>

<svelte:head>
	<title>Tripel Pythagoras — Kalkulator & Visualisasi Interaktif | GezyMath</title>
	<meta
		name="description"
		content="Temukan dan uji tripel Pythagoras dengan kalkulator interaktif, penyaring tripel primitif, serta diagram visual segitiga siku-siku."
	/>
</svelte:head>

<div class="space-y-8">
	<!-- Page Title Header -->
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
			<Shapes class="w-3.5 h-3.5" />
			<span>Geometri Dasar</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator & Generator Tripel Pythagoras</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Hasilkan kombinasi tiga bilangan bulat positif (a, b, c) yang memenuhi persamaan kuadrat Pythagoras a² + b² = c².
		</p>
	</div>

	<!-- Interactive Panels Layout -->
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<!-- Left Panel: Inputs & Testing -->
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Generator Tripel Pythagoras</h3>

				<MathInput
					label="Batas Maksimum Hipotenusa (c ≤ N)"
					bind:value={maxN}
					type="number"
					min={5}
					max={1000}
					helpText="Masukkan batas nilai c (maksimum 1000)"
				/>

				<div class="flex items-center gap-2 pt-1">
					<input
						type="checkbox"
						id="primitiveCheck"
						bind:checked={primitiveOnly}
						class="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
					/>
					<label for="primitiveCheck" class="text-sm font-medium text-slate-300 cursor-pointer select-none">
						Hanya tampilkan Tripel Primitif (FPB(a,b,c) = 1)
					</label>
				</div>
			</div>

			<!-- Test Custom Triple -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Uji Tiga Bilangan (a, b, c)</h3>
				<div class="grid grid-cols-3 gap-3">
					<MathInput label="Sisi a" bind:value={testA} />
					<MathInput label="Sisi b" bind:value={testB} />
					<MathInput label="Sisi c" bind:value={testC} />
				</div>

				<ResultCard
					title="Hasil Pengujian Tripel"
					value={testResult.isTriple ? 'Segitiga Siku-Siku' : 'Bukan Pythagoras'}
					subtext={testResult.explanation}
					badge={testResult.isTriple ? 'Tripel Valid' : 'Invalid'}
					accentColor={testResult.isTriple ? 'emerald' : 'rose'}
				/>
			</div>
		</div>

		<!-- Right Panel: Visualization & Generated Triples Table -->
		<div class="lg:col-span-7 space-y-6">
			<!-- Canvas Visualization -->
			<RightTriangleCanvas a={Number(testA) || 3} b={Number(testB) || 4} c={Number(testC) || 5} />

			<!-- Generated Results Table -->
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="font-heading font-bold text-base text-slate-200">
						Daftar Tripel (Total: {triples.length})
					</h3>
					<FormulaDisplay latex="a^2 + b^2 = c^2" displayMode={false} />
				</div>

				<div class="max-h-72 overflow-y-auto border border-slate-800 rounded-xl">
					<table class="w-full text-left text-sm text-slate-300">
						<thead class="bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider sticky top-0">
							<tr>
								<th class="p-3">a</th>
								<th class="p-3">b</th>
								<th class="p-3">c</th>
								<th class="p-3">Jenis</th>
								<th class="p-3 text-right">Aksi</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-800/60 font-mono text-xs">
							{#each triples as t, i}
								<tr class="hover:bg-slate-800/40 transition-colors">
									<td class="p-3 text-indigo-400 font-bold">{t.a}</td>
									<td class="p-3 text-indigo-400 font-bold">{t.b}</td>
									<td class="p-3 text-sky-400 font-bold">{t.c}</td>
									<td class="p-3">
										<span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase {t.isPrimitive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}">
											{t.isPrimitive ? 'Primitif' : 'Kelipatan'}
										</span>
									</td>
									<td class="p-3 text-right">
										<button
											type="button"
											onclick={() => copyTriple(t, i)}
											class="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
											title="Salin Tripel"
										>
											{#if copiedIndex === i}
												<Check class="w-3.5 h-3.5 text-emerald-400" />
											{:else}
												<Copy class="w-3.5 h-3.5" />
											{/if}
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- Educational Explanation Panel -->
	<section class="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
		<h2 class="text-xl font-bold font-heading text-slate-100">Penjelasan & Materi Pembelajaran</h2>
		<div class="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-3">
			<h3 class="text-base font-bold text-indigo-400">Apa itu Tripel Pythagoras?</h3>
			<p>
				Tripel Pythagoras adalah tiga bilangan bulat positif <em>a</em>, <em>b</em>, dan <em>c</em> yang memenuhi teorema Pythagoras:
			</p>

			<FormulaDisplay latex="a^2 + b^2 = c^2" />

			<h3 class="text-base font-bold text-indigo-400">Perbedaan Tripel Primitif dan Kelipatan</h3>
			<ul class="list-disc pl-5 space-y-1">
				<li><strong>Tripel Primitif:</strong> Tiga bilangan yang tidak memiliki faktor persekutuan selain 1 (FPB(a, b, c) = 1). Contoh: (3, 4, 5), (5, 12, 13).</li>
				<li><strong>Tripel Kelipatan:</strong> Hasil perkalian tripel primitif dengan sebuah konstanta k > 1. Contoh: (6, 8, 10) adalah kelipatan 2 dari (3, 4, 5).</li>
			</ul>
		</div>
	</section>
</div>
