<script lang="ts">
	import { ShoppingBagOutline, CartOutline } from 'flowbite-svelte-icons';

	interface Props {
		reason: 'no user' | 'cart empty';
	}
	let { reason }: Props = $props();
</script>

<div class="flex-1 grid place-items-center">
	<div class="m-auto text-center p-2">
		{#if reason === 'cart empty'}
			<CartOutline class="mx-auto w-16 md:w-20" />
			<span class="md:text-lg">Your shopping cart is empty.</span>
		{:else}
			<ShoppingBagOutline class="mx-auto w-16 md:w-20" />
			<span class="md:text-lg">
				<a href="/sign-in" class="text-primary hover:underline">Sign in</a> to add products to shopping
				cart.
			</span>
		{/if}
	</div>
</div>

