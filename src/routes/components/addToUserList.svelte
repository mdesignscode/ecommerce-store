<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import {
		HeartOutline,
		HeartSolid,
		ShoppingBagOutline,
		ShoppingBagSolid
	} from 'flowbite-svelte-icons';
	import { globalStore } from 'store';
	import 'styles/heartbeat.css';
	import 'styles/moveCart.css';
	import 'styles/wobble.css';
	import { customEnhanceHandler } from 'utils';
	import type { TAddToListSuccess } from '../addToUserList/+page.server';
	import type { ActionData } from '../addToUserList/$types';
	import { enhance } from '$app/forms';
	import type { TProductAttributes } from 'models';
	import { goto } from '$app/navigation';

	type TFormState = { error: string; loading: boolean };
	interface Props {
		productId: TProductAttributes['id'];
	}

	const { productId }: Props = $props();

	let productState = $derived(globalStore.products[productId]);

	let cartState: TFormState = $state({ error: '', loading: false });
	let wishlistState: TFormState = $state({ error: '', loading: false });

	const toggleShoppingCart = (formState: TFormState, type: 'wishList' | 'shoppingCart') =>
		customEnhanceHandler<ActionData, TAddToListSuccess>(
			(data) => {
				const { productState: remoteState } = data;

				// replace current product state with updated state
				const updatedList =
					type === 'shoppingCart' ? globalStore.shoppingCart : globalStore.wishList;
				const filteredList = updatedList.filter((p) => p.productId !== productId);
				const listKey = type === 'shoppingCart' ? 'isInCart' : 'isWishlisted';
				if (remoteState[listKey]) filteredList.push(remoteState);

				globalStore[type] = filteredList;

				globalStore.products[productId] = remoteState;
				globalStore.addingToList = false;
			},
			formState,
			() => {
				if (!globalStore.user) {
					goto('/sign-in');
					return;
				}
				globalStore.addingToList = true;
			}
		);
</script>

<section class="flex justify-between">
	<form
		method="POST"
		use:enhance={toggleShoppingCart(cartState, 'shoppingCart')}
		action="/addToUserList?/addToList"
	>
		<Button
			type="submit"
			aria-label="Add to shopping cart"
			disabled={globalStore.addingToList}
			class={[
				{
					'cursor-not-allowed': globalStore.addingToList
				},
				'text-primary size-12'
			]}
		>
			{#if productState?.isInCart}
				<ShoppingBagSolid
					class={[
						{
							'animate-pulse': cartState.loading
						}
					]}
				/>
			{:else}
				<ShoppingBagOutline
					class={[
						{
							moveCart: cartState.loading
						}
					]}
				/>
			{/if}
		</Button>
		<input type="hidden" name="listKey" value="isInCart" />
		<input type="hidden" value={productId} name="productId" />
		<Tooltip>Add or remove from Shopping Cart</Tooltip>
	</form>

	<form
		method="POST"
		use:enhance={toggleShoppingCart(wishlistState, 'wishList')}
		action="/addToUserList?/addToList"
	>
		<Button
			type="submit"
			disabled={globalStore.addingToList}
			class={[{ 'cursor-not-allowed': globalStore.addingToList }, 'size-12']}
			aria-label="Add to wish list"
		>
			{#if productState?.isWishlisted}
				<HeartSolid
					color="hotpink"
					class={[
						{
							heartbeat: wishlistState.loading
						}
					]}
				/>
			{:else}
				<HeartOutline
					class={[
						{
							heartbeat: wishlistState.loading
						}
					]}
					color="hotpink"
				/>
			{/if}
		</Button>
		<input type="hidden" name="listKey" value="isWishlisted" />
		<input type="hidden" value={productId} name="productId" />
		<Tooltip>Add or remove from Wish List</Tooltip>
	</form>
</section>
