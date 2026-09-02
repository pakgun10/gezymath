<script lang="ts">
	interface Props {
		a: number;
		b: number;
		c: number;
	}

	let { a = 3, b = 4, c = 5 }: Props = $props();

	// SVG scaling calculations
	const maxSide = $derived(Math.max(a, b, 1));
	const scale = $derived(180 / maxSide);
	const scaledA = $derived(Math.max(40, a * scale));
	const scaledB = $derived(Math.max(40, b * scale));

	const originX = 50;
	const originY = 230;
	const pointC = $derived({ x: originX, y: originY });
	const pointA = $derived({ x: originX + scaledA, y: originY });
	const pointB = $derived({ x: originX, y: originY - scaledB });
</script>

<div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[280px] overflow-hidden">
	<div class="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start mb-2">
		Visualisasi Segitiga Siku-Siku
	</div>

	<svg viewBox="0 0 320 270" class="w-full max-w-xs h-auto overflow-visible">
		<!-- Grid background pattern -->
		<defs>
			<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
				<path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />

		<!-- Triangle Fill & Stroke -->
		<polygon
			points="{pointC.x},{pointC.y} {pointA.x},{pointA.y} {pointB.x},{pointB.y}"
			fill="rgba(99, 102, 241, 0.12)"
			stroke="#6366f1"
			stroke-width="3"
			stroke-linejoin="round"
			class="transition-all duration-300"
		/>

		<!-- Right Angle Indicator -->
		<path
			d="M {originX} {originY - 15} L {originX + 15} {originY - 15} L {originX + 15} {originY}"
			fill="none"
			stroke="#818cf8"
			stroke-width="2"
		/>

		<!-- Side Labels -->
		<!-- Side a (base) -->
		<text x={(pointC.x + pointA.x) / 2} y={pointC.y + 20} fill="#a5b4fc" font-size="13" font-weight="bold" text-anchor="middle">
			a = {a}
		</text>

		<!-- Side b (height) -->
		<text x={pointC.x - 25} y={(pointC.y + pointB.y) / 2} fill="#a5b4fc" font-size="13" font-weight="bold" text-anchor="middle">
			b = {b}
		</text>

		<!-- Hypotenuse c -->
		<text x={(pointA.x + pointB.x) / 2 + 15} y={(pointA.y + pointB.y) / 2 - 10} fill="#38bdf8" font-size="14" font-weight="extrabold" text-anchor="middle">
			c = {c}
		</text>
	</svg>

	<div class="mt-3 text-xs font-mono px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-center">
		{a}² + {b}² = {a * a} + {b * b} = {c * c} ({c}²)
	</div>
</div>
