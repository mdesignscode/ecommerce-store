<script lang="ts">
	import { page } from '$app/state';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let { children } = $props();
</script>

<div class="min-h-dvh bg-sand/40">
	<header class="border-b border-line bg-surface">
		<div class="container-page flex h-14 items-center gap-6 text-sm">
			<a href="/admin" class="font-display text-lg font-semibold"
				>Common Goods <span
					class="font-sans text-xs font-semibold tracking-widest text-accent uppercase">Admin</span
				></a
			>
			<nav class="mr-auto" aria-label="Admin">
				<a
					href="/admin"
					class={[
						'rounded-full px-3 py-1.5',
						page.url.pathname === '/admin' ? 'bg-sand font-semibold' : 'text-muted hover:text-ink'
					]}>Products</a
				>
			</nav>
			<a href="/" class="inline-flex items-center gap-1 text-muted hover:text-ink"
				>View store<ArrowRight class="size-3.5" /></a
			>
		</div>
	</header>
	<main id="main" class="container-page py-10">
		{@render children()}
	</main>
</div>
