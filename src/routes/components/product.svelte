<script lang="ts">
	import { goto } from '$app/navigation';
	import { AddToUserList } from 'components';
	import { TagOutline } from 'flowbite-svelte-icons';
	import type { TProductState } from 'store';
	import { getDiscountPrice } from 'utils';

	interface Props {
		product: TProductState['Product'];
		styles?: string;
	}

	const { product, styles }: Props = $props();
</script>

<section
	class={[
		'bg-light flex flex-col w-60 md:w-72 hover:shadow-lg rounded-lg p-2 flex-none gap-2 transition-all hover:scale-105 m-3 cursor-pointer',
		styles
	]}
>
	<p class="text-ellipsis overflow-hidden">{product.title}</p>
	<a class="text-primary italic text-sm" href={`/products/${product.id}`}>View product</a>
	<div class="mb-auto relative aspect-video w-full h-auto">
		<img class="rounded-lg" src={product.Images[0].url} alt={`Preview of ${product.title}`} />
	</div>
	{#if product.discountPercentage}
		<em class="text-pink-800 flex gap-2 items-center">
			<span>{product.discountPercentage}%</span>
			<TagOutline class="size-6" />
		</em>
	{/if}

	<div class="flex gap-4 text-lg">
		<p>Price:</p>

		{#if product.discountPercentage}
			<p class="font-bold">
				${getDiscountPrice(product.Price.amount, product.discountPercentage)}
			</p>
			<p class="line-through font-bold text-red-600">
				${product.Price.amount}
			</p>
		{:else}
			<p class="font-bold">${product.Price.amount}</p>
		{/if}
	</div>
	<AddToUserList productId={product.id} />
</section>

