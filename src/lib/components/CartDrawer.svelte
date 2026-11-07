<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import X from '@lucide/svelte/icons/x';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import { shop, ui } from '$lib/shop.svelte';
	import CartLine from './CartLine.svelte';
	import CartSummary from './CartSummary.svelte';

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (ui.cartOpen && !dialog.open) dialog.showModal();
		else if (!ui.cartOpen && dialog.open) dialog.close();
	});
	afterNavigate(() => (ui.cartOpen = false));
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="cart-title"
	onclose={() => (ui.cartOpen = false)}
	onclick={(e) => e.target === dialog && (ui.cartOpen = false)}
	class="drawer m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-paper text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-[2px] open:flex open:flex-col"
>
	<header class="flex items-center justify-between border-b border-line px-5 py-4">
		<h2 id="cart-title" class="text-2xl">Your cart</h2>
		<button class="btn-icon" aria-label="Close cart" onclick={() => (ui.cartOpen = false)}>
			<X class="size-5" />
		</button>
	</header>

	{#if !shop.user}
		<div class="grid flex-1 place-content-center gap-3 p-8 text-center">
			<p class="text-muted">Sign in to start a cart.</p>
			<a href="/sign-in" class="btn-primary">Sign in</a>
		</div>
	{:else if shop.cart.length === 0}
		<div class="grid flex-1 place-content-center justify-items-center gap-3 p-8 text-center">
			<ShoppingBag class="size-8 text-muted" />
			<p class="text-muted">Your cart is empty.</p>
			<a href="/categories/deals" class="btn-outline">Browse deals</a>
		</div>
	{:else}
		<ul class="flex-1 divide-y divide-line overflow-y-auto px-5">
			{#each shop.cart as item (item.productId)}
				<CartLine {item} />
			{/each}
		</ul>
		<footer class="space-y-3 border-t border-line px-5 py-5">
			<CartSummary />
			<a href="/cart" class="block text-center text-sm underline underline-offset-4"
				>View full cart</a
			>
		</footer>
	{/if}
</dialog>
