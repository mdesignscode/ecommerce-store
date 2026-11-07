<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import Toast from '$lib/components/Toast.svelte';

	let { children, data } = $props();
	const isAdmin = $derived(page.route.id?.startsWith('/admin') ?? false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
	>Skip to content</a
>

{#if isAdmin}
	{@render children()}
{:else}
	<div class="flex min-h-dvh flex-col">
		<Header categories={data.categories} />
		<main id="main" class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
	<CartDrawer />
{/if}
<Toast />
