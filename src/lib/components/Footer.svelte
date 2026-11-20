<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state('system');

	onMount(() => {
		theme = document.documentElement.dataset.theme ?? 'system';
	});

	function changeTheme(event: Event) {
		theme = (event.currentTarget as HTMLSelectElement).value;
		if (theme === 'system') delete document.documentElement.dataset.theme;
		else document.documentElement.dataset.theme = theme;

		try {
			if (theme === 'system') localStorage.removeItem('store-theme');
			else localStorage.setItem('store-theme', theme);
		} catch {
			// The selection still applies for this visit.
		}
	}
</script>

<footer class="mt-24 border-t border-line">
	<div class="container-page grid gap-8 py-12 text-sm sm:grid-cols-3">
		<div class="space-y-2">
			<p class="font-display text-xl font-semibold">Common Goods</p>
			<p class="max-w-xs text-muted">
				Everyday things, fairly priced. Free shipping on every order.
			</p>
		</div>
		<nav class="grid content-start gap-2" aria-label="Shop">
			<p class="eyebrow mb-1">Shop</p>
			<a href="/categories/deals" class="hover:underline">Deals</a>
			<a href="/wishlist" class="hover:underline">Wishlist</a>
			<a href="/cart" class="hover:underline">Cart</a>
		</nav>
		<nav class="grid content-start gap-2" aria-label="Account">
			<p class="eyebrow mb-1">Account</p>
			<a href="/orders" class="hover:underline">Orders</a>
			<a href="/settings" class="hover:underline">Settings</a>
		</nav>
	</div>
	<div
		class="container-page flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-muted"
	>
		<span
			>© {new Date().getFullYear()} Common Goods. A demo store — no real orders are shipped.</span
		>
		<div class="flex items-center gap-2">
			<label for="store-theme">Theme</label>
			<select
				id="store-theme"
				value={theme}
				onchange={changeTheme}
				class="rounded-lg border border-line bg-surface px-2 py-1.5 text-sm text-ink"
			>
				<option value="system">System</option>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</select>
		</div>
	</div>
</footer>
