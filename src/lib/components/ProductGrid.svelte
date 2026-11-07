<script lang="ts">
	import type { TProduct } from '$lib/types';
	import ProductCard from './ProductCard.svelte';

	let { products, eager = 0 }: { products: TProduct[]; eager?: number } = $props();
</script>

<div class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
	{#each products as product, i (product.id)}
		<ProductCard {product} eager={i < eager} />
	{/each}
</div>
