<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Truck from '@lucide/svelte/icons/truck';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import Lock from '@lucide/svelte/icons/lock';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import { finalPrice, money, titleCase } from '$lib/pricing';

	let { data } = $props();
	const [lead, ...rest] = $derived(data.deals);
	const productCount = $derived(data.categories.reduce((sum, c) => sum + c.count, 0));
</script>

<svelte:head>
	<title>Common Goods — everyday things, fairly priced</title>
	<meta
		name="description"
		content="Shop {productCount} everyday products across {data.categories
			.length} categories, with free shipping on every order."
	/>
</svelte:head>

{#snippet sectionHead(title: string, href: string, cta: string)}
	<div class="mb-8 flex items-end justify-between gap-4">
		<h2 class="text-3xl sm:text-4xl">{title}</h2>
		<a {href} class="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold">
			{cta}<ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>
{/snippet}

<section
	class="container-page grid items-center gap-10 pt-10 pb-16 lg:grid-cols-12 lg:pt-16 lg:pb-24"
>
	<div class="lg:col-span-6">
		<p class="eyebrow text-accent">Free shipping on every order</p>
		<h1 class="mt-4 text-5xl leading-[1.02] sm:text-6xl xl:text-7xl">
			Good things for <em class="font-normal text-accent italic">every</em> day.
		</h1>
		<p class="mt-6 max-w-md text-lg text-muted">
			{productCount} carefully priced products across {data.categories.length} categories — from the kitchen
			drawer to the garden shed.
		</p>
		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/categories/deals" class="btn-primary px-6 py-3 text-base">
				Shop deals<ArrowRight class="size-4" />
			</a>
			<a href="#categories" class="btn-outline px-6 py-3 text-base">Browse categories</a>
		</div>
	</div>

	{#if lead}
		<div class="grid grid-cols-5 grid-rows-2 gap-3 lg:col-span-6 lg:gap-4">
			<a
				href="/products/{lead.id}"
				class="group relative col-span-3 row-span-2 overflow-hidden rounded-3xl bg-sand"
			>
				<img
					src={lead.Images[0]?.url}
					alt={lead.title}
					width="512"
					height="512"
					class="size-full object-cover transition duration-700 group-hover:scale-[1.03]"
				/>
				<span
					class="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-surface/95 px-4 py-3 text-sm shadow-sm backdrop-blur"
				>
					<span class="truncate font-medium">{lead.title}</span>
					<span class="shrink-0 font-semibold text-accent">{money(finalPrice(lead))}</span>
				</span>
			</a>
			{#each rest.slice(0, 2) as product (product.id)}
				<a
					href="/products/{product.id}"
					class="group col-span-2 overflow-hidden rounded-3xl bg-sand"
				>
					<img
						src={product.Images[0]?.url}
						alt={product.title}
						width="512"
						height="512"
						class="aspect-square size-full object-cover transition duration-700 group-hover:scale-[1.04]"
					/>
				</a>
			{/each}
		</div>
	{/if}
</section>

<section class="border-y border-line bg-sand/60">
	<ul class="container-page grid gap-4 py-5 text-sm sm:grid-cols-3">
		<li class="flex items-center gap-3">
			<Truck class="size-5 text-accent" />Free shipping, no minimum
		</li>
		<li class="flex items-center gap-3">
			<RotateCcw class="size-5 text-accent" />30-day easy returns
		</li>
		<li class="flex items-center gap-3">
			<Lock class="size-5 text-accent" />Secure checkout with Stripe
		</li>
	</ul>
</section>

{#if data.deals.length}
	<section class="container-page pt-20">
		{@render sectionHead('This week’s best deals', '/categories/deals', 'All deals')}
		<ProductGrid products={data.deals} />
	</section>
{/if}

<section id="categories" class="container-page scroll-mt-32 pt-24">
	<h2 class="mb-8 text-3xl sm:text-4xl">Shop by category</h2>
	<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
		{#each data.categories as category (category.name)}
			<li>
				<a href="/categories/{encodeURIComponent(category.name)}" class="group block">
					<div class="aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
						<img
							src={category.cover.Images[0]?.url}
							alt=""
							loading="lazy"
							width="512"
							height="512"
							class="size-full object-cover transition duration-500 group-hover:scale-[1.05]"
						/>
					</div>
					<p class="mt-2.5 font-medium group-hover:underline">{titleCase(category.name)}</p>
					<p class="text-sm text-muted">
						{category.count}
						{category.count === 1 ? 'item' : 'items'}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

{#each data.featured as group (group.name)}
	<section class="container-page pt-24">
		{@render sectionHead(
			`Popular in ${titleCase(group.name)}`,
			`/categories/${encodeURIComponent(group.name)}`,
			'See all'
		)}
		<ProductGrid products={group.items} />
	</section>
{/each}
