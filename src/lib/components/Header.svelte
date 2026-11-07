<script lang="ts">
	import { page } from '$app/state';
	import Heart from '@lucide/svelte/icons/heart';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import Package from '@lucide/svelte/icons/package';
	import Settings from '@lucide/svelte/icons/settings';
	import Shield from '@lucide/svelte/icons/shield';
	import LogOut from '@lucide/svelte/icons/log-out';
	import { shop, ui } from '$lib/shop.svelte';
	import { titleCase } from '$lib/pricing';

	let { categories }: { categories: string[] } = $props();
	let menu = $state<HTMLElement>();

	const current = $derived(page.params.categoryTitle);
	const chip = (active: boolean) => [
		'shrink-0 rounded-full px-3.5 py-1.5 transition-colors',
		active ? 'bg-ink text-paper' : 'text-muted hover:bg-sand hover:text-ink'
	];
</script>

{#snippet count(n: number)}
	{#if n > 0}
		<span
			class="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.7rem] leading-5 font-semibold text-white tabular-nums"
			aria-hidden="true">{n}</span
		>
	{/if}
{/snippet}

<header class="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
	<div class="container-page flex h-16 items-center gap-2">
		<a href="/" class="mr-auto font-display text-xl font-semibold tracking-tight sm:text-2xl">
			Common Goods
		</a>

		<a
			href="/wishlist"
			class="btn-icon relative"
			aria-label="Wishlist, {shop.wishlist.length} items"
		>
			<Heart class="size-5" />
			{@render count(shop.wishlist.length)}
		</a>

		{#if shop.user}
			<button
				class="btn-icon overflow-hidden"
				popovertarget="account-menu"
				aria-label="Account menu"
			>
				<img src={shop.user.avatar} alt="" class="size-8 rounded-full bg-sand object-cover" />
			</button>
			<div
				bind:this={menu}
				id="account-menu"
				popover
				onclick={(e) => (e.target as HTMLElement).closest('a,button') && menu?.hidePopover()}
				role="presentation"
				class="fixed inset-auto top-16 right-4 m-0 w-64 rounded-2xl border border-line bg-surface p-2 text-sm text-ink shadow-xl sm:right-8"
			>
				<div class="border-b border-line px-3 pt-2 pb-3">
					<p class="font-semibold">{shop.user.username}</p>
					<p class="truncate text-muted">{shop.user.email}</p>
				</div>
				<nav class="grid py-1" aria-label="Account">
					{#each [{ href: '/orders', label: 'Orders', icon: Package }, { href: '/wishlist', label: 'Wishlist', icon: Heart }, { href: '/settings', label: 'Settings', icon: Settings }] as link (link.href)}
						<a href={link.href} class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-sand">
							<link.icon class="size-4 text-muted" />{link.label}
						</a>
					{/each}
					{#if shop.user.role === 'admin'}
						<a href="/admin" class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-sand">
							<Shield class="size-4 text-muted" />Admin
						</a>
					{/if}
				</nav>
				<form method="POST" action="/sign-out" class="border-t border-line pt-1">
					<button class="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-sand">
						<LogOut class="size-4 text-muted" />Sign out
					</button>
				</form>
			</div>
		{:else}
			<a href="/sign-in" class="btn px-3 hover:bg-sand">Sign in</a>
		{/if}

		<button
			class="btn-icon relative"
			aria-label="Open cart, {shop.cartCount} items"
			aria-haspopup="dialog"
			onclick={() => (ui.cartOpen = true)}
		>
			<ShoppingBag class="size-5" />
			{@render count(shop.cartCount)}
		</button>
	</div>

	<nav
		class="container-page no-scrollbar flex gap-1 overflow-x-auto pb-2.5 text-sm"
		aria-label="Categories"
	>
		<a
			href="/categories/deals"
			class={[chip(current === 'deals'), current !== 'deals' && 'text-accent']}
			aria-current={current === 'deals' ? 'page' : undefined}
		>
			Deals
		</a>
		{#each categories as category (category)}
			<a
				href="/categories/{encodeURIComponent(category)}"
				class={chip(current === category)}
				aria-current={current === category ? 'page' : undefined}
			>
				{titleCase(category)}
			</a>
		{/each}
	</nav>
</header>
