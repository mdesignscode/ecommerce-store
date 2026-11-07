<script lang="ts">
	import Heart from '@lucide/svelte/icons/heart';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import { shop } from '$lib/shop.svelte';
</script>

<svelte:head><title>Wishlist · Common Goods</title></svelte:head>

<section class="container-page pt-10 sm:pt-14">
	<h1 class="text-5xl">Wishlist</h1>
	<p class="mt-3 text-muted">Things you’ve saved for later.</p>

	<div class="mt-10">
		{#if !shop.user}
			<EmptyState icon={Heart} title="Sign in to see your wishlist">
				<a href="/sign-in?redirectTo=/wishlist" class="btn-primary mt-4">Sign in</a>
			</EmptyState>
		{:else if shop.wishlist.length === 0}
			<EmptyState icon={Heart} title="Nothing saved yet">
				<p>Tap the heart on any product to save it here.</p>
				<a href="/" class="btn-primary mt-5">Start browsing</a>
			</EmptyState>
		{:else}
			<ProductGrid products={shop.wishlist.map((s) => s.Product)} />
		{/if}
	</div>
</section>
