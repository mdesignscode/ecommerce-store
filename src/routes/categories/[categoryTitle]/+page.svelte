<script lang="ts">
	import { capitalizeAndReplace } from 'utils';
	import type { TCategoryProducts } from './+page.server';
	import { Product } from 'components';

	interface Props {
		data: TCategoryProducts;
	}

	const { data }: Props = $props();
	const { isDiscountedProducts, category, categoryProducts } = data;
</script>

<svelte:head>
	<title>{capitalizeAndReplace(category)}</title>
	<meta name="description" content={`Products in ${category}`} />
</svelte:head>

<main class="flex flex-col items-center p-4 gap-2">
	<h1 class="text-xl font-bold md:text-2xl">
		All{' '}
		{#if isDiscountedProducts}
			Discounted
		{:else}
			{capitalizeAndReplace(category)}
		{/if}
		{' '}Products
	</h1>
	<section class="md:flex md:w-5/6 flex-wrap justify-center">
		{#each categoryProducts as product}
			<Product styles="border-dark border-2" {product} />
		{/each}
	</section>
</main>

