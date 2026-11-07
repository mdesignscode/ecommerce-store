<script lang="ts">
	import { enhance } from '$app/forms';
	import Lock from '@lucide/svelte/icons/lock';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { newFormState, submit } from '$lib/forms';
	import { finalPrice, money } from '$lib/pricing';
	import { shop } from '$lib/shop.svelte';
	import FormMessage from './FormMessage.svelte';

	const checkout = $state(newFormState());
	const subtotal = $derived(
		shop.cart.reduce((sum, s) => sum + finalPrice(s.Product) * s.quantity, 0)
	);
	const savings = $derived(
		shop.cart.reduce(
			(sum, s) => sum + (s.Product.Price.amount - finalPrice(s.Product)) * s.quantity,
			0
		)
	);
</script>

<div class="space-y-4">
	<dl class="space-y-2 text-sm">
		{#if savings > 0}
			<div class="flex justify-between text-accent">
				<dt>You save</dt>
				<dd class="tabular-nums">{money(savings)}</dd>
			</div>
		{/if}
		<div class="flex justify-between text-muted">
			<dt>Shipping</dt>
			<dd>Free</dd>
		</div>
		<div class="flex justify-between border-t border-line pt-3 text-base font-semibold">
			<dt>Subtotal</dt>
			<dd class="tabular-nums">{money(subtotal)}</dd>
		</div>
	</dl>

	<form method="POST" action="/cart?/checkout" use:enhance={submit(checkout)}>
		<button class="btn-primary w-full py-3.5 text-base" disabled={checkout.pending}>
			{#if checkout.pending}
				<LoaderCircle class="size-4 animate-spin" /> Redirecting…
			{:else}
				<Lock class="size-4" /> Checkout
			{/if}
		</button>
	</form>
	<FormMessage form={checkout} />
	<p class="text-center text-xs text-muted">Secure payment by Stripe.</p>
</div>
