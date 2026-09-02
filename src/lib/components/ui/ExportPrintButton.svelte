<script lang="ts">
	import { Printer, Download } from 'lucide-svelte';

	interface Props {
		title?: string;
	}

	let { title = 'GezyMath Report' }: Props = $props();

	function handlePrint() {
		window.print();
	}
</script>

<div class="flex items-center gap-2 print:hidden">
	<button
		type="button"
		onclick={handlePrint}
		class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
		title="Cetak atau Simpan sebagai PDF"
	>
		<Printer class="w-4 h-4 text-indigo-400" />
		<span>Cetak / Simpan PDF</span>
	</button>
</div>
