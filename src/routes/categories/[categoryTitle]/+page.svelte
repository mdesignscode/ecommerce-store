<script lang="ts">
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import { titleCase } from '$lib/pricing';

	let { data } = $props();
	const title = $derived(data.isDeals ? 'Deals' : titleCase(data.category));
	const sorts = [
		['featured', 'Featured'],
		['discount', 'Biggest discount'],
		['price-asc', 'Price: low to high'],
		['price-desc', 'Price: high to low'],
		['rating', 'Top rated']
	] as const;
</script>

<svelte:head>
	<title>{title} · Common Goods</title>
	<meta name="description" content="Shop {data.products.length} products in {title}." />
</svelte:head>

<section class="container-page pt-10 pb-4 sm:pt-14">
	<p class="eyebrow">{data.isDeals ? 'On sale now' : 'Category'}</p>
	<div class="mt-3 flex flex-wrap items-end justify-between gap-6">
		<div>
			<h1 class="text-5xl sm:text-6xl">{title}</h1>
			<p class="mt-3 text-muted">
				{data.products.length}
				{data.products.length === 1 ? 'product' : 'products'}
			</p>
		</div>
		<form
			method="GET"
			class="flex items-center gap-2 text-sm"
			data-sveltekit-keepfocus
			data-sveltekit-noscroll
		>
			<label for="sort" class="text-muted">Sort by</label>
			<select
				id="sort"
				name="sort"
				class="input w-auto py-2 pr-8 text-sm"
				value={data.sort}
				onchange={(e) => e.currentTarget.form?.requestSubmit()}
			>
				{#each sorts as [value, label] (value)}
					<option {value}>{label}</option>
				{/each}
			</select>
			<noscript><button class="btn-outline py-2">Apply</button></noscript>
		</form>
	</div>
</section>

<section class="container-page pt-8">
	<ProductGrid products={data.products} eager={4} />
</section>
