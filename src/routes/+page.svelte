<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/math');
	});
</script>

<div class="min-h-screen flex items-center justify-center text-slate-400 font-mono text-sm">
	Mengarahkan ke /math...
</div>
