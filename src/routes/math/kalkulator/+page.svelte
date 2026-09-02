<script lang="ts">
	import { onMount } from 'svelte';
	import { evaluateMathExpression } from '$lib/algorithms/calculator';
	import { recentStore } from '$lib/stores/userTools';
	import FormulaDisplay from '$lib/components/math/FormulaDisplay.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import { Calculator, Delete, History } from 'lucide-svelte';

	let displayExpr = $state('2 * (3 + 4)^2 - sqrt(25)');
	let history = $state<{ expr: string; res: string }[]>([]);

	let evalResult = $derived(evaluateMathExpression(displayExpr));

	onMount(() => {
		recentStore.addRecent('kalkulator');
	});

	function appendInput(val: string) {
		displayExpr += val;
	}

	function handleClear() {
		displayExpr = '';
	}

	function handleBackspace() {
		displayExpr = displayExpr.slice(0, -1);
	}

	function handleCalculate() {
		if (evalResult.result !== 'Error' && evalResult.result !== 'Tidak terdefinisi') {
			history = [{ expr: displayExpr, res: String(evalResult.result) }, ...history.slice(0, 9)];
		}
	}

	const btnClass = "p-3 md:p-4 rounded-xl font-mono text-base font-bold transition-all active:scale-95 flex items-center justify-center ";
</script>

<svelte:head>
	<title>Kalkulator Ilmiah Interaktif — LaTeX Preview | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator matematika ilmiah interaktif dengan dukungan ekspresi kompleks, fungsi trigonometri, akar, logaritma, dan preview rumus LaTeX."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
			<Calculator class="w-3.5 h-3.5" />
			<span>Kalkulator</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Ilmiah Interaktif</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Hitung ekspresi matematika ilmiah dengan pratinjau rumus LaTeX yang indah dan riwayat perhitungan otomatis.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<!-- Main Calculator Interface -->
		<div class="lg:col-span-7 space-y-4">
			<div class="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
				<!-- Display Screen -->
				<div class="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col items-end gap-2 min-h-[100px] justify-between">
					<input
						type="text"
						bind:value={displayExpr}
						placeholder="0"
						class="w-full bg-transparent text-right font-mono text-xl md:text-2xl text-slate-100 focus:outline-none placeholder-slate-600"
					/>
					<div class="flex items-center justify-between w-full">
						<FormulaDisplay latex={evalResult.latex || '0'} displayMode={false} />
						<div class="text-2xl md:text-3xl font-bold font-mono text-indigo-400">
							= {evalResult.result}
						</div>
					</div>
				</div>

				<!-- Keypad Grid -->
				<div class="grid grid-cols-4 gap-2 pt-2">
					<button type="button" onclick={handleClear} class="{btnClass} bg-rose-500/20 text-rose-300 hover:bg-rose-500/30">C</button>
					<button type="button" onclick={() => appendInput('(')} class="{btnClass} bg-slate-800 text-slate-200 hover:bg-slate-700">(</button>
					<button type="button" onclick={() => appendInput(')')} class="{btnClass} bg-slate-800 text-slate-200 hover:bg-slate-700">)</button>
					<button type="button" onclick={handleBackspace} class="{btnClass} bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">
						<Delete class="w-5 h-5" />
					</button>

					<button type="button" onclick={() => appendInput('sin(')} class="{btnClass} bg-slate-800/80 text-indigo-300 hover:bg-slate-700 text-xs">sin</button>
					<button type="button" onclick={() => appendInput('cos(')} class="{btnClass} bg-slate-800/80 text-indigo-300 hover:bg-slate-700 text-xs">cos</button>
					<button type="button" onclick={() => appendInput('tan(')} class="{btnClass} bg-slate-800/80 text-indigo-300 hover:bg-slate-700 text-xs">tan</button>
					<button type="button" onclick={() => appendInput('/')} class="{btnClass} bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40">÷</button>

					<button type="button" onclick={() => appendInput('sqrt(')} class="{btnClass} bg-slate-800/80 text-indigo-300 hover:bg-slate-700 text-xs">√</button>
					<button type="button" onclick={() => appendInput('7')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">7</button>
					<button type="button" onclick={() => appendInput('8')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">8</button>
					<button type="button" onclick={() => appendInput('9')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">9</button>

					<button type="button" onclick={() => appendInput('*')} class="{btnClass} bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40">×</button>
					<button type="button" onclick={() => appendInput('4')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">4</button>
					<button type="button" onclick={() => appendInput('5')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">5</button>
					<button type="button" onclick={() => appendInput('6')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">6</button>

					<button type="button" onclick={() => appendInput('-')} class="{btnClass} bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40">-</button>
					<button type="button" onclick={() => appendInput('1')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">1</button>
					<button type="button" onclick={() => appendInput('2')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">2</button>
					<button type="button" onclick={() => appendInput('3')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">3</button>

					<button type="button" onclick={() => appendInput('+')} class="{btnClass} bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40">+</button>
					<button type="button" onclick={() => appendInput('0')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">0</button>
					<button type="button" onclick={() => appendInput('.')} class="{btnClass} bg-slate-900 text-slate-100 hover:bg-slate-800">.</button>
					<button type="button" onclick={() => appendInput('^')} class="{btnClass} bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/40">x^y</button>
				</div>
			</div>
		</div>

		<!-- History Panel -->
		<div class="lg:col-span-5 space-y-4">
			<div class="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
				<div class="flex items-center justify-between">
					<h3 class="font-heading font-bold text-base text-slate-200 flex items-center gap-2">
						<History class="w-4 h-4 text-indigo-400" />
						<span>Riwayat Perhitungan</span>
					</h3>
					{#if history.length > 0}
						<button type="button" onclick={() => (history = [])} class="text-xs text-rose-400 hover:underline">Hapus</button>
					{/if}
				</div>

				{#if history.length === 0}
					<div class="p-6 text-center text-xs text-slate-500">Belum ada riwayat perhitungan.</div>
				{:else}
					<div class="space-y-2 max-h-96 overflow-y-auto">
						{#each history as h}
							<button
								type="button"
								onclick={() => (displayExpr = h.expr)}
								class="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
							>
								<div class="text-xs text-slate-400 font-mono truncate">{h.expr}</div>
								<div class="text-sm font-bold font-mono text-indigo-400 text-right">= {h.res}</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
