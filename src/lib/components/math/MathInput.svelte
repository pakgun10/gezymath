<script lang="ts">
	import { X } from 'lucide-svelte';

	interface Props {
		label: string;
		value: string | number;
		placeholder?: string;
		type?: 'text' | 'number';
		step?: string;
		min?: number;
		max?: number;
		helpText?: string;
		error?: string;
		onchange?: (val: string) => void;
		oninput?: (val: string) => void;
	}

	let {
		label,
		value = $bindable(),
		placeholder = '',
		type = 'number',
		step = 'any',
		min,
		max,
		helpText,
		error,
		onchange,
		oninput
	}: Props = $props();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		oninput?.(target.value);
	}

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		onchange?.(target.value);
	}

	function handleClear() {
		value = '';
		oninput?.('');
	}
</script>

<div class="flex flex-col gap-1.5 w-full">
	<label class="text-sm font-semibold text-slate-300 flex justify-between items-center">
		<span>{label}</span>
		{#if error}
			<span class="text-xs text-rose-400 font-normal">{error}</span>
		{/if}
	</label>

	<div class="relative flex items-center">
		<input
			{type}
			{step}
			{min}
			{max}
			{placeholder}
			value={value}
			oninput={handleInput}
			onchange={handleChange}
			class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border {error ? 'border-rose-500/80 focus:ring-rose-500/30' : 'border-slate-700/80 focus:border-indigo-500 focus:ring-indigo-500/20'} text-slate-100 placeholder-slate-500 font-mono text-base focus:outline-none focus:ring-4 transition-all duration-200"
		/>

		{#if value !== '' && value !== null && value !== undefined}
			<button
				type="button"
				onclick={handleClear}
				class="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
				aria-label="Bersihkan Input"
			>
				<X class="w-4 h-4" />
			</button>
		{/if}
	</div>

	{#if helpText && !error}
		<span class="text-xs text-slate-400">{helpText}</span>
	{/if}
</div>
