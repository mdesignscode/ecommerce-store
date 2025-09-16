<script lang="ts">
	import {
		BookOpenOutline,
		HeartOutline,
		ShoppingBagOutline,
		CartOutline
	} from 'flowbite-svelte-icons';
	import Sidebar from './Sidebar.svelte';
	import { globalStore } from 'store';
	import { Badge, UserButton } from 'components';

	let showSidebar = $state({ active: false });

	const navItemStyles =
		'text-center focus:outline-dark text-xs font-semibold md:text-sm text-dark flex-1';
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
		<Badge {indicator} class="text-dark w-fit">
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
	class="flex md:gap-2 w-full text-dark items-center border-t-2 border-secondary shadow-lg shadow-dark bg-light"
>
	{@render navlink({
		to: '/checkout',
		indicator: globalStore.shoppingCart.length,
		label: 'Checkout',
		Icon: ShoppingBagOutline
	})}

	{@render navlink({
		to: '/purchaseHistory',
		indicator: globalStore.history.length,
		label: 'History',
		Icon: BookOpenOutline,
		fill: 'primary'
	})}

	<div class={[navItemStyles, 'relative']}>
		<div class="-translate-y-4">
			<UserButton />
		</div>
	</div>

	<div class={[navItemStyles, 'grid place-content-center']}>
		<Badge
			tooltipLabel="Show Shopping Cart"
			class={['text-dark w-fit']}
			onclick={() => (showSidebar.active = true)}
			id="sidebarButton"
			aria-expanded={showSidebar.active}
			aria-controls="sidebar"
			aria-label="Show shopping cart items"
			indicator={globalStore.shoppingCart.length}
		>
			<span class="col items-center">
				<CartOutline class="fill-primary w-7 md:w-8" />
				My Cart
			</span>
		</Badge>
	</div>

	{@render navlink({
		to: '/wishList',
		indicator: globalStore.wishList.length,
		label: 'Wish List',
		Icon: HeartOutline
	})}
</nav>

