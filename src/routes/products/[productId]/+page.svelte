<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Truck from '@lucide/svelte/icons/truck';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import ListToggle from '$lib/components/ListToggle.svelte';
	import Price from '$lib/components/Price.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import Stars from '$lib/components/Stars.svelte';
	import { titleCase } from '$lib/pricing';

	let { data } = $props();
	const product = $derived(data.product);
	let selected = $state(0);
	$effect.pre(() => {
		void product.id;
		selected = 0;
	});
	const image = $derived(product.Images[selected] ?? product.Images[0]);
	const lowStock = $derived(product.stock > 0 && product.stock <= 10);
</script>

<svelte:head>
	<title>{product.title} · Common Goods</title>
	<meta name="description" content={product.description} />
</svelte:head>

<div class="container-page pt-6">
	<nav aria-label="Breadcrumb">
		<ol class="flex items-center gap-1.5 text-sm text-muted">
			<li><a href="/" class="hover:text-ink">Home</a></li>
			<li aria-hidden="true"><ChevronRight class="size-3.5" /></li>
			<li>
				<a href="/categories/{encodeURIComponent(product.category)}" class="hover:text-ink"
					>{titleCase(product.category)}</a
				>
			</li>
			<li aria-hidden="true"><ChevronRight class="size-3.5" /></li>
			<li class="truncate text-ink" aria-current="page">{product.title}</li>
		</ol>
	</nav>

	<article class="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
		<section aria-label="Product images" class="flex flex-col-reverse gap-3 sm:flex-row">
			{#if product.Images.length > 1}
				<div class="no-scrollbar flex gap-3 overflow-x-auto sm:flex-col">
					{#each product.Images as img, i (img.id)}
						<button
							class={[
								'size-16 shrink-0 overflow-hidden rounded-xl border-2 sm:size-20',
								i === selected ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'
							]}
							aria-label="Show image {i + 1} of {product.Images.length}"
							aria-pressed={i === selected}
							onclick={() => (selected = i)}
						>
							<img src={img.url} alt="" width="80" height="80" class="size-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
			<div class="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-sand">
				<img
					src={image?.url}
					alt={product.title}
					width="512"
					height="512"
					class="size-full object-cover"
				/>
				{#if product.discountPercentage}
					<span
						class="absolute top-4 left-4 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-white"
					>
						Save {product.discountPercentage}%
					</span>
				{/if}
			</div>
		</section>

		<section class="lg:py-4">
			<a href="/categories/{encodeURIComponent(product.category)}" class="eyebrow hover:text-ink"
				>{product.category}</a
			>
			<h1 class="mt-3 text-4xl sm:text-5xl">{product.title}</h1>
			<div class="mt-4 flex items-center gap-3 text-sm text-muted">
				<Stars rating={product.rating} />
				<span>{Math.min(5, product.rating)}.0 rating</span>
			</div>

			<div class="mt-6"><Price {product} size="lg" /></div>

			<p class="mt-6 max-w-prose leading-relaxed text-muted">{product.description}</p>

			<p
				class={[
					'mt-6 text-sm font-medium',
					product.stock === 0 ? 'text-danger' : lowStock ? 'text-accent' : 'text-success'
				]}
			>
				{product.stock === 0
					? 'Sold out'
					: lowStock
						? `Only ${product.stock} left`
						: 'In stock, ready to ship'}
			</p>

			<div class="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
				<ListToggle
					productId={product.id}
					list="isInCart"
					variant="wide"
					soldOut={product.stock === 0}
				/>
				<ListToggle productId={product.id} list="isWishlisted" variant="wide" />
			</div>

			<ul class="mt-8 space-y-3 border-t border-line pt-6 text-sm">
				<li class="flex items-center gap-3">
					<Truck class="size-4 text-muted" />Free shipping, delivered in 3–5 business days
				</li>
				<li class="flex items-center gap-3">
					<RotateCcw class="size-4 text-muted" />Free returns within 30 days
				</li>
			</ul>
		</section>
	</article>

	{#if data.related.length}
		<section class="pt-24">
			<h2 class="mb-8 text-3xl sm:text-4xl">More in {titleCase(product.category)}</h2>
			<ProductGrid products={data.related} />
		</section>
	{/if}
</div>
