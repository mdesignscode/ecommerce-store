<script lang="ts">
	import {
		BookOpenOutline,
		HeartOutline,
		ShoppingBagOutline,
		CartOutline
	} from 'flowbite-svelte-icons';
	import { Tooltip } from 'flowbite-svelte';
	import Sidebar from './Sidebar.svelte';
	import { globalStore } from 'store';
	import { Badge } from 'components';

	let showSidebar = $state({ active: false });

	// get objects in history
	let shoppingCart = $derived(
		Object.values(globalStore.products).filter(({ isInCart }) => isInCart)
	);
	let history = $derived(
		Object.values(globalStore.products).filter(({ isPurchased }) => isPurchased)
	);
	const navItemStyles =
		'flex-1 text-center focus:outline-dark text-xs font-semibold md:text-sm text-dark';
</script>

{#snippet navlink({
	to,
	Icon,
	label,
	indicator,
	fill = 'hotpink'
}: {
	to: string;
	Icon: typeof BookOpenOutline;
	label: string;
	indicator: number;
	fill?: string;
})}
	<a href={to} class={navItemStyles}>
		<Badge {indicator} class="text-dark w-full">
			<span class="flex flex-col items-center">
				<Icon {fill} class={['w-7 md:w-8', `fill-${fill}`]} />
				{label}
			</span>
		</Badge>
	</a>
{/snippet}

<Sidebar {showSidebar} />
<nav
	id="root-navbar"
	class="flex fixed z-20 left-0 bottom-0 w-full bg-white text-dark items-center p-1 border-t-2 border-secondary shadow-lg shadow-dark"
>
	{@render navlink({
		to: '/checkout',
		indicator: shoppingCart.length,
		label: 'Checkout',
		Icon: ShoppingBagOutline
	})}

	{@render navlink({
		to: '/purchaseHistory',
		indicator: history.length,
		label: 'History',
		Icon: BookOpenOutline,
		fill: 'primary'
	})}

	<!-- <UserBtn isSignedIn={!!user} /> -->
	Foo

	<Badge
		class={['text-dark w-full', navItemStyles]}
		onclick={() => (showSidebar.active = true)}
		id="sidebarButton"
		aria-expanded={showSidebar.active}
		aria-controls="sidebar"
		aria-label="Show shopping cart items"
		indicator={shoppingCart.length}
	>
		<span class="flex flex-col items-center">
			<CartOutline class="fill-primary w-7 md:w-8" />
			My Cart
		</span>
	</Badge>
	<Tooltip>Show Shopping Cart</Tooltip>

	{@render navlink({
		to: '/wishList',
		indicator: history.length,
		label: 'Wish List',
		Icon: HeartOutline
	})}
</nav>
