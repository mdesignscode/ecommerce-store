<script lang="ts">
	import type { TProductState } from 'store';
	import { getDiscountPrice } from 'utils';

	interface Props {
		product: TProductState['Product'];
	}
	const { product }: Props = $props();
</script>

<a href={`/products/${product.id}`} class="group relative border rounded-sm bg-white">
	<div
		class="w-full absolute bottom-0 left-0 bg-black bg-opacity-80 text-white z-10 px-2 rounded-b-sm"
	>
		<p class="truncate">{product.title}</p>
	</div>
	<div class="relative aspect-video">
		<img
			alt={`${product.title} preview`}
			src={product.Images[0].url}
			class="rounded-sm group-hover:blur-[2px] transition-all"
		/>
	</div>

	<div
		class="invisible h-0 group-hover:h-full group-hover:visible transition-all absolute top-0 left-0 z-10 bg-black bg-opacity-80 w-full text-white rounded-sm p-1 lg:p-3"
	>
		<strong>{product.title}</strong>
		{#if product.discountPercentage}
			<p class="space-x-4">
				<span class="line-through">${product.Price.amount}</span>

				<span class="text-pink-600">
					${getDiscountPrice(product.Price.amount, product.discountPercentage)}
				</span>
			</p>
		{:else}
			<p>${product.Price.amount}</p>
		{/if}

		<div class="hidden lg:block w-full">
			<p class="my-2 truncate">{product.description}</p>

			<p>Items in stock: {product.stock}</p>
		</div>
	</div>
</a>

