<script lang="ts">
	import { enhance } from '$app/forms';
	import Minus from '@lucide/svelte/icons/minus';
	import Plus from '@lucide/svelte/icons/plus';
	import X from '@lucide/svelte/icons/x';
	import { newFormState, submit } from '$lib/forms';
	import { finalPrice, money } from '$lib/pricing';
	import { notify, USER_PRODUCTS } from '$lib/shop.svelte';
	import type { TProductState } from '$lib/types';

	let { item, size = 'sm' }: { item: TProductState; size?: 'sm' | 'lg' } = $props();
	const product = $derived(item.Product);

	const qty = $state(newFormState());
	const remove = $state(newFormState());
	const busy = $derived(qty.pending || remove.pending);

	$effect(() => {
		const error = qty.error || remove.error;
		if (error) notify(error, 'error');
	});
</script>

<li class={['flex gap-4 py-4', busy && 'opacity-60']}>
	<a href="/products/{product.id}" class="shrink-0">
		<img
			src={product.Images[0]?.url}
			alt=""
			width="96"
			height="96"
			class={['rounded-xl bg-sand object-cover', size === 'lg' ? 'size-24 sm:size-28' : 'size-20']}
		/>
	</a>
	<div class="flex min-w-0 flex-1 flex-col">
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0">
				<a href="/products/{product.id}" class="line-clamp-2 font-medium hover:underline"
					>{product.title}</a
				>
				<p class="text-sm text-muted">{money(finalPrice(product))} each</p>
			</div>
			<p class="font-semibold tabular-nums">{money(finalPrice(product) * item.quantity)}</p>
		</div>

		<div class="mt-auto flex items-center justify-between pt-2">
			<form
				method="POST"
				action="/lists?/setQuantity"
				use:enhance={submit(qty, { invalidate: USER_PRODUCTS })}
				class="flex items-center rounded-full border border-line"
			>
				<input type="hidden" name="productId" value={product.id} />
				<button
					name="quantity"
					value={item.quantity - 1}
					class="btn-icon size-8"
					disabled={busy || item.quantity <= 1}
					aria-label="Decrease quantity"><Minus class="size-3.5" /></button
				>
				<output class="w-7 text-center text-sm tabular-nums" aria-label="Quantity"
					>{item.quantity}</output
				>
				<button
					name="quantity"
					value={item.quantity + 1}
					class="btn-icon size-8"
					disabled={busy || item.quantity >= product.stock}
					aria-label="Increase quantity"><Plus class="size-3.5" /></button
				>
			</form>

			<form
				method="POST"
				action="/lists?/toggle"
				use:enhance={submit(remove, { invalidate: USER_PRODUCTS })}
			>
				<input type="hidden" name="productId" value={product.id} />
				<input type="hidden" name="list" value="isInCart" />
				<button
					class="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
					disabled={busy}
				>
					<X class="size-3.5" /> Remove
				</button>
			</form>
		</div>
	</div>
</li>
