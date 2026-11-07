<script lang="ts">
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import CartLine from '$lib/components/CartLine.svelte';
	import CartSummary from '$lib/components/CartSummary.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { shop } from '$lib/shop.svelte';
</script>

<svelte:head><title>Cart · Common Goods</title></svelte:head>

<section class="container-page pt-10 sm:pt-14">
	<h1 class="text-5xl">Your cart</h1>

	<div class="mt-10">
		{#if !shop.user}
			<EmptyState icon={ShoppingBag} title="Sign in to see your cart">
				<a href="/sign-in?redirectTo=/cart" class="btn-primary mt-4">Sign in</a>
			</EmptyState>
		{:else if shop.cart.length === 0}
			<EmptyState icon={ShoppingBag} title="Your cart is empty">
				<p>Find something you like and it will show up here.</p>
				<a href="/categories/deals" class="btn-primary mt-5">Browse deals</a>
			</EmptyState>
		{:else}
			<div class="grid items-start gap-10 lg:grid-cols-[1fr_22rem]">
				<ul class="divide-y divide-line border-y border-line">
					{#each shop.cart as item (item.productId)}
						<CartLine {item} size="lg" />
					{/each}
				</ul>
				<aside class="card p-6 lg:sticky lg:top-36" aria-label="Order summary">
					<h2 class="mb-5 text-2xl">Summary</h2>
					<CartSummary />
				</aside>
			</div>
		{/if}
	</div>
</section>
