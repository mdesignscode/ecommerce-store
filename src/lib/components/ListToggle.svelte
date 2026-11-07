<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Heart from '@lucide/svelte/icons/heart';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import Check from '@lucide/svelte/icons/check';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import { newFormState, submit } from '$lib/forms';
	import { notify, shop, ui, USER_PRODUCTS } from '$lib/shop.svelte';

	type Props = {
		productId: string;
		list: 'isInCart' | 'isWishlisted';
		/** icon: round overlay button · compact: small icon button · wide: full-width button */
		variant?: 'icon' | 'compact' | 'wide';
		soldOut?: boolean;
	};
	let { productId, list, variant = 'compact', soldOut = false }: Props = $props();

	const form = $state(newFormState());
	const isCart = $derived(list === 'isInCart');
	const active = $derived(Boolean(shop.stateOf(productId)?.[list]));
	const label = $derived(
		isCart
			? active
				? 'Remove from cart'
				: soldOut
					? 'Sold out'
					: 'Add to cart'
			: active
				? 'Remove from wishlist'
				: 'Save to wishlist'
	);
	const Icon = $derived(isCart ? (active ? Check : ShoppingBag) : Heart);

	const styles = $derived(
		{
			icon: [
				'btn-icon bg-surface/90 shadow-sm backdrop-blur hover:bg-surface',
				active && 'text-accent'
			],
			compact: [
				'btn-icon border border-line',
				active && 'border-ink bg-ink text-paper hover:bg-ink'
			],
			wide: [isCart && !active ? 'btn-primary' : 'btn-outline', 'w-full py-3.5 text-base']
		}[variant]
	);

	const signInHref = $derived(`/sign-in?redirectTo=${encodeURIComponent(page.url.pathname)}`);

	const handler = submit(form, {
		invalidate: USER_PRODUCTS,
		onSuccess: () => {
			const nowActive = Boolean(shop.stateOf(productId)?.[list]);
			if (isCart && nowActive) ui.cartOpen = true;
			else
				notify(
					nowActive ? 'Saved to your wishlist' : `Removed from your ${isCart ? 'cart' : 'wishlist'}`
				);
		}
	});
	$effect(() => {
		if (form.error) notify(form.error, 'error');
	});
</script>

{#snippet content()}
	{#if form.pending}
		<LoaderCircle aria-hidden="true" class="size-5 animate-spin" />
	{:else}
		<Icon aria-hidden="true" class={['size-5', !isCart && active && 'fill-current']} />
	{/if}
	{#if variant === 'wide'}
		<span>{isCart || !active ? label : 'Saved'}</span>
	{/if}
{/snippet}

{#if !shop.user}
	<a
		href={signInHref}
		class={['relative z-10', styles]}
		aria-label={variant === 'wide' ? undefined : label}
		title={label}
	>
		{@render content()}
	</a>
{:else}
	<form method="POST" action="/lists?/toggle" use:enhance={handler} class="contents">
		<input type="hidden" name="productId" value={productId} />
		<input type="hidden" name="list" value={list} />
		<button
			class={['relative z-10', styles]}
			disabled={form.pending || (isCart && soldOut && !active)}
			aria-pressed={active}
			aria-label={variant === 'wide' ? undefined : label}
			title={label}
		>
			{@render content()}
		</button>
	</form>
{/if}
