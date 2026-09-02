<script lang="ts">
	import { onMount } from 'svelte';
	import {
		calculateSquare,
		calculateRectangle,
		calculateCircle,
		calculateCube,
		calculateCuboid,
		calculateCylinder,
		calculateSphere
	} from '$lib/algorithms/geometry';
	import { recentStore } from '$lib/stores/userTools';
	import MathInput from '$lib/components/math/MathInput.svelte';
	import ResultCard from '$lib/components/ui/ResultCard.svelte';
	import CalculationSteps from '$lib/components/math/CalculationSteps.svelte';
	import GeometryDiagram from '$lib/components/visualizations/GeometryDiagram.svelte';
	import { Shapes } from 'lucide-svelte';

	let activeShape = $state('persegi');

	// Inputs
	let side = $state(10);
	let length = $state(12);
	let width = $state(8);
	let height = $state(6);
	let radius = $state(7);

	let result = $derived.by(() => {
		switch (activeShape) {
			case 'persegi':
				return calculateSquare(Number(side) || 1);
			case 'persegi-panjang':
				return calculateRectangle(Number(length) || 1, Number(width) || 1);
			case 'lingkaran':
				return calculateCircle(Number(radius) || 1);
			case 'kubus':
				return calculateCube(Number(side) || 1);
			case 'balok':
				return calculateCuboid(Number(length) || 1, Number(width) || 1, Number(height) || 1);
			case 'tabung':
				return calculateCylinder(Number(radius) || 1, Number(height) || 1);
			case 'bola':
				return calculateSphere(Number(radius) || 1);
			default:
				return calculateSquare(10);
		}
	});

	onMount(() => {
		recentStore.addRecent('geometri');
	});
</script>

<svelte:head>
	<title>Kalkulator Geometri 2D & 3D — Luas, Keliling & Volume | GezyMath</title>
	<meta
		name="description"
		content="Kalkulator geometri interaktif untuk bangun datar (2D) & bangun ruang (3D). Hitung luas, keliling, volume, dan luas permukaan dengan diagram visual."
	/>
</svelte:head>

<div class="space-y-8">
	<div class="space-y-2">
		<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
			<Shapes class="w-3.5 h-3.5" />
			<span>Geometri</span>
		</div>
		<h1 class="text-3xl font-extrabold font-heading text-slate-100">Kalkulator Geometri 2D & 3D</h1>
		<p class="text-slate-400 text-sm max-w-2xl">
			Pilih bangun datar atau bangun ruang untuk menghitung Luas, Keliling, Volume, dan Luas Permukaan secara instan.
		</p>
	</div>

	<!-- Shape Selector Tabs -->
	<div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
		{#each [
			{ id: 'persegi', label: 'Persegi (2D)' },
			{ id: 'persegi-panjang', label: 'Persegi Panjang (2D)' },
			{ id: 'lingkaran', label: 'Lingkaran (2D)' },
			{ id: 'kubus', label: 'Kubus (3D)' },
			{ id: 'balok', label: 'Balok (3D)' },
			{ id: 'tabung', label: 'Tabung (3D)' },
			{ id: 'bola', label: 'Bola (3D)' }
		] as shape}
			<button
				type="button"
				onclick={() => (activeShape = shape.id)}
				class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border {activeShape === shape.id ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'}"
			>
				{shape.label}
			</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
		<div class="lg:col-span-5 space-y-6">
			<div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
				<h3 class="font-heading font-bold text-base text-slate-200">Dimensi {result.shapeName}</h3>

				{#if activeShape === 'persegi' || activeShape === 'kubus'}
					<MathInput label="Panjang Sisi / Rusuk (s)" bind:value={side} type="number" min={1} />
				{:else if activeShape === 'persegi-panjang'}
					<MathInput label="Panjang (p)" bind:value={length} type="number" min={1} />
					<MathInput label="Lebar (l)" bind:value={width} type="number" min={1} />
				{:else if activeShape === 'balok'}
					<MathInput label="Panjang (p)" bind:value={length} type="number" min={1} />
					<MathInput label="Lebar (l)" bind:value={width} type="number" min={1} />
					<MathInput label="Tinggi (t)" bind:value={height} type="number" min={1} />
				{:else if activeShape === 'lingkaran' || activeShape === 'bola'}
					<MathInput label="Jari-jari (r)" bind:value={radius} type="number" min={1} />
				{:else if activeShape === 'tabung'}
					<MathInput label="Jari-jari (r)" bind:value={radius} type="number" min={1} />
					<MathInput label="Tinggi (t)" bind:value={height} type="number" min={1} />
				{/if}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#if result.area !== undefined}
					<ResultCard title="Luas" value={result.area} badge="2D" accentColor="indigo" />
				{/if}
				{#if result.perimeter !== undefined}
					<ResultCard title="Keliling" value={result.perimeter} badge="2D" accentColor="emerald" />
				{/if}
				{#if result.volume !== undefined}
					<ResultCard title="Volume" value={result.volume} badge="3D" accentColor="amber" />
				{/if}
				{#if result.surfaceArea !== undefined}
					<ResultCard title="Luas Permukaan" value={result.surfaceArea} badge="3D" accentColor="rose" />
				{/if}
			</div>
		</div>

		<div class="lg:col-span-7 space-y-6">
			<GeometryDiagram shapeId={activeShape} params={{ side: Number(side), length: Number(length), width: Number(width), height: Number(height), radius: Number(radius) }} />
			<CalculationSteps steps={result.steps} title="Langkah Rumus Perhitungan" />
		</div>
	</div>
</div>
