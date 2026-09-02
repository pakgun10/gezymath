<script lang="ts">
	interface Props {
		shapeId: string;
		params: { [key: string]: number };
	}

	let { shapeId, params }: Props = $props();
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Diagram Interaktif Bangun {shapeId.toUpperCase()}
	</div>

	<svg viewBox="0 0 260 200" class="w-full max-w-xs h-auto overflow-visible select-none">
		{#if shapeId === 'persegi' || shapeId === 'persegi-panjang'}
			<rect x="50" y="40" width="160" height={shapeId === 'persegi' ? '120' : '90'} fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" stroke-width="2.5" rx="4" />
			<text x="130" y="30" fill="#a5b4fc" font-size="12" font-weight="bold" text-anchor="middle">
				{params.length || params.side || 10}
			</text>
			<text x="220" y="100" fill="#a5b4fc" font-size="12" font-weight="bold" text-anchor="middle">
				{params.width || params.side || 10}
			</text>
		{:else if shapeId === 'lingkaran'}
			<circle cx="130" cy="100" r="65" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2.5" />
			<line x1="130" y1="100" x2="195" y2="100" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3" />
			<circle cx="130" cy="100" r="4" fill="#10b981" />
			<text x="162" y="93" fill="#6ee7b7" font-size="12" font-weight="bold">r = {params.radius || 7}</text>
		{:else if shapeId === 'kubus' || shapeId === 'balok'}
			<!-- 3D Box wireframe -->
			<path d="M 50 70 L 150 70 L 150 160 L 50 160 Z" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="2" />
			<path d="M 90 30 L 190 30 L 190 120 L 90 120 Z" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
			<line x1="50" y1="70" x2="90" y2="30" stroke="#f59e0b" stroke-width="2" />
			<line x1="150" y1="70" x2="190" y2="30" stroke="#f59e0b" stroke-width="2" />
			<line x1="150" y1="160" x2="190" y2="120" stroke="#f59e0b" stroke-width="2" />
			<line x1="50" y1="160" x2="90" y2="120" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
		{:else}
			<polygon points="50,150 130,40 210,150" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" stroke-width="2.5" />
		{/if}
	</svg>
</div>
