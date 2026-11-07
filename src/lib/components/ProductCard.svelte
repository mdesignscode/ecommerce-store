<script lang="ts">
	import type { TProduct } from '$lib/types';
	import ListToggle from './ListToggle.svelte';
	import Price from './Price.svelte';

	let { product, eager = false }: { product: TProduct; eager?: boolean } = $props();
	const href = $derived(`/products/${product.id}`);
</script>

<article class="group relative flex flex-col">
	<div class="relative aspect-square overflow-hidden rounded-2xl bg-sand">
		<img
			src={product.Images[0]?.url}
			alt=""
			width="512"
			height="512"
			loading={eager ? 'eager' : 'lazy'}
			class="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
		/>
		{#if product.discountPercentage}
			<span
				class="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white"
			>
				−{product.discountPercentage}%
			</span>
		{/if}
		<div class="absolute top-2.5 right-2.5">
			<ListToggle productId={product.id} list="isWishlisted" variant="icon" />
		</div>
	</div>

	<div class="mt-3 flex items-start justify-between gap-3">
		<div class="min-w-0">
			<p class="eyebrow">{product.category}</p>
			<h3 class="mt-1 font-sans text-[0.95rem] leading-snug font-medium tracking-normal">
				<a {href} class="after:absolute after:inset-0 hover:underline">{product.title}</a>
			</h3>
			<div class="mt-1">
				<Price {product} />
			</div>
		</div>
		<ListToggle productId={product.id} list="isInCart" soldOut={product.stock === 0} />
	</div>
</article>
