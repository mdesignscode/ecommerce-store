<script lang="ts">
	import type { TProductState } from 'store';
	import ImageThumbnails from './components/ImageThumbnails.svelte';
	import { capitalizeAndReplace, getDiscountPrice } from 'utils';
	import { AddToUserList } from 'components';
	import { ChevronRightOutline, HomeSolid } from 'flowbite-svelte-icons';

	interface Props {
		data: {
			product: TProductState['Product'] | undefined;
		};
	}
	const { data }: Props = $props();
	const { product } = data;
</script>

{#snippet breadcrumbItem(title: string = 'Home', link: string | null = '/')}
	<li class="flex gap-1 items-center">
		{#if link !== '/'}
			<ChevronRightOutline class="size-8" />
		{:else}
			<HomeSolid class="size-6" />
		{/if}
		{#if link}
			<a class="underline truncate" href={link}>{title}</a>
		{:else}
			<span class="truncate">{title}</span>
		{/if}
	</li>
{/snippet}

{#if !product}
	<p>Product not found</p>
{:else}
	<section class="py-4 size-full px-6">
		<div class="col mx-auto size-full overflow-y-hidden md:w-4/6">
			<nav class="flex items-center gap-2 self-start w-full overflow-hidden">
				{@render breadcrumbItem()}
				{@render breadcrumbItem(
					capitalizeAndReplace(product.category),
					`/categories/${product.category}`
				)}
				{@render breadcrumbItem(capitalizeAndReplace(product.title), null)}
			</nav>

			<article class="flex flex-col gap-2 p-2 w-full overflow-y-auto">
				<ImageThumbnails images={product.Images} />
				<div class="flex text-lg justify-between">
					{#if product.discountPercentage}
						<div class="flex gap-4">
							<p class="font-bold">
								${getDiscountPrice(product.Price.amount, product.discountPercentage)}
							</p>
							<p class="line-through font-bold text-red-600">
								${product.Price.amount}
							</p>
						</div>
					{:else}
						<p class="font-bold">${product.Price.amount}</p>
					{/if}
					<span class="text-lg md:text-xl">
						{#each Array.from({ length: product.rating }, () => '⭐') as rating}
							<span>{rating}</span>
						{/each}
					</span>
				</div>

				<h1 class="md:text-lg">{product.title}</h1>
				<p class="text-sm text-gray-600 md:text-base">
					{product.description}
				</p>

				<p class=" md:text-lg">Items left in stock: {product.stock}</p>

				<AddToUserList productId={product.id} />
			</article>
		</div>
	</section>
{/if}

