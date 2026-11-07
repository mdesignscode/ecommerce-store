<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { TProductState } from 'store';
	import { OptionsPopover } from '.';

	interface Props {
		product: TProductState['Product'];
	}
	const { product }: Props = $props();
	let deleteStatus = $state<{ state: 'default' | 'deleting' | 'removed' }>({
		state: 'default'
	});
</script>

{#if deleteStatus.state !== 'removed'}
	<div
		transition:fade
		class="bg-secondary flex gap-4 rounded-lg p-2 items-center shadow-dark shadow-sm relative"
	>
		<img
			class="rounded-lg"
			src={product.Images[0].url || ''}
			width={100}
			height={100}
			alt="Product preview"
		/>
		<div class="flex flex-col flex-1">
			<p>{product.title}</p>
			<p class="border-white border-b-2 border-t-2">
				Stock count: {product.stock}
			</p>
			<p>${product.Price.amount}</p>
		</div>
                <OptionsPopover {deleteStatus} {product} />
	</div>
{/if}

