<script lang="ts">
	import { finalPrice, money } from '$lib/pricing';
	import type { TProduct } from '$lib/types';

	let { product, size = 'md' }: { product: TProduct; size?: 'md' | 'lg' } = $props();
	const price = $derived(finalPrice(product));
</script>

<p class={['flex flex-wrap items-baseline gap-x-2', size === 'lg' ? 'text-2xl' : 'text-[0.95rem]']}>
	<span class={['font-semibold tabular-nums', product.discountPercentage && 'text-accent']}>
		{money(price)}
	</span>
	{#if product.discountPercentage}
		<s class="text-[0.8em] text-muted tabular-nums" aria-label="Was {money(product.Price.amount)}">
			{money(product.Price.amount)}
		</s>
	{/if}
</p>
