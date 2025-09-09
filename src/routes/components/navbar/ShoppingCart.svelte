<script lang="ts">
	import { ShoppingBagOutline, XSolid } from 'flowbite-svelte-icons';
	import { Button, Tooltip } from 'flowbite-svelte';
	import ShoppingCartUnavailable from './ShoppingCartUnavailable.svelte';
	import { globalStore } from 'store';
	import { getDiscountPrice } from 'utils';

	let shoppingCart = $derived(
		Object.values(globalStore.products).filter(({ isInCart }) => isInCart)
	);

	let removingCartItem = $derived(
		Object.fromEntries(shoppingCart.map((item) => [item.id, false]) || [])
	);
	const handleRemoveCartItem = async () => {
		//removingCartItem((state) => ({
		//...state,
		//[item.id]: true
		//}));
		//                  await updateShoppingCart(item);
		//              setCurrentUser(currentUser, {
		//                shoppingCart: shoppingCart?.filter(
		//                (product) => item?.id !== product?.id
		//            ),
		//        });
	};
</script>

{#if !globalStore.user}
	<ShoppingCartUnavailable reason="no user" />
{:else if !shoppingCart || !shoppingCart.length}
	<ShoppingCartUnavailable reason="cart empty" />
{:else}
	<section class="flex flex-col gap-2 p-2 flex-1 overflow-y-auto">
		{#each shoppingCart as item}
			<div class="rounded-lg p-4 relative border-2 flex flex-col gap-2 border-dark">
				<div class="flex gap-4">
					<img
						src={item?.Images[0].url || ''}
						class="rounded-lg w-14 md:w-16 h-auto"
						alt="Product Preview"
						width={56}
						height={56}
					/>

					<strong class={item?.discountPercentage ? 'text-pink-400' : 'text-secondary-dark'}>
						${''}
						{item?.discountPercentage
							? getDiscountPrice(item?.Price.amount, item?.discountPercentage)
							: item?.Price.amount}
					</strong>
				</div>

				<p>{item?.title}</p>

				<Button
					disabled={removingCartItem[item.id]}
					class={[
						'absolute -top-2 -right-2 rounded-full',
						{
							'animate-spin': removingCartItem[item.id]
						}
					]}
					onclick={handleRemoveCartItem}
				>
					<XSolid width={30} />
				</Button>

				<Tooltip>Remove from Shopping Cart</Tooltip>
			</div>
		{/each}

		<a href="/checkout" class="mt-auto mx-auto">
			<Button color="primary" class="flex gap-4">
				<span>Checkout</span>
				<ShoppingBagOutline width={25} />
			</Button>
		</a>
	</section>
{/if}

