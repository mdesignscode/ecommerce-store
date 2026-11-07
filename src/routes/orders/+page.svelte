<script lang="ts">
	import Package from '@lucide/svelte/icons/package';
	import Check from '@lucide/svelte/icons/check';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Price from '$lib/components/Price.svelte';
	import { shop } from '$lib/shop.svelte';

	let { data } = $props();
</script>

<svelte:head><title>Orders · Common Goods</title></svelte:head>

<section class="container-page pt-10 sm:pt-14">
	<h1 class="text-5xl">Orders</h1>

	{#if data.justCheckedOut}
		<p
			class="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-success"
			role="status"
		>
			<Check class="size-5" />
			Thanks for your order! Items appear here once payment is confirmed.
		</p>
	{/if}

	<div class="mt-10">
		{#if shop.orders.length === 0}
			<EmptyState icon={Package} title="No orders yet">
				<p>When you check out, your purchases will show up here.</p>
				<a href="/" class="btn-primary mt-5">Start shopping</a>
			</EmptyState>
		{:else}
			<ul class="divide-y divide-line border-y border-line">
				{#each shop.orders as order (order.productId)}
					<li class="flex items-center gap-4 py-4">
						<img
							src={order.Product.Images[0]?.url}
							alt=""
							width="64"
							height="64"
							class="size-16 rounded-xl bg-sand object-cover"
						/>
						<div class="min-w-0 flex-1">
							<a href="/products/{order.productId}" class="font-medium hover:underline"
								>{order.Product.title}</a
							>
							<Price product={order.Product} />
						</div>
						<a href="/products/{order.productId}" class="btn-outline hidden sm:inline-flex"
							>Buy again</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>
