<script lang="ts">
	import type { TProductState } from 'store';
	import { Product } from './components';

	interface Props {
		data: {
			products: TProductState['Product'][];
		};
	}
	const { data }: Props = $props();
	const { products } = data;
</script>

<svelte:head>
	<title>Admin Dashboard</title>
	<meta name="description" content="Admin home page" />
</svelte:head>

<div class="flex-1 overflow-y-auto pb-4">
	<h1 class="text-lg font-bold text-center my-2">All Products</h1>

	<div class="w-10/12 flex flex-col gap-2 mx-auto">
		{#each products as product}
			<Product {product} />
		{/each}
	</div>
</div>
