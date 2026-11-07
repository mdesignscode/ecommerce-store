<script lang="ts">
	import { enhance } from '$app/forms';
	import Pencil from '@lucide/svelte/icons/pencil';
	import Trash from '@lucide/svelte/icons/trash-2';
	import Search from '@lucide/svelte/icons/search';
	import { newFormState, submit } from '$lib/forms';
	import { finalPrice, money } from '$lib/pricing';
	import { notify } from '$lib/shop.svelte';
	import type { TProduct } from '$lib/types';

	let { data } = $props();
	let query = $state('');
	let pendingDelete = $state<TProduct | null>(null);
	let dialog: HTMLDialogElement;
	const del = $state(newFormState());

	const products = $derived(
		data.products.filter((p) =>
			`${p.title} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
	const lowStock = $derived(data.products.filter((p) => p.stock <= 10).length);

	function askDelete(product: TProduct) {
		pendingDelete = product;
		dialog.showModal();
	}
</script>

<svelte:head><title>Products · Admin</title></svelte:head>

<div class="flex flex-wrap items-end justify-between gap-4">
	<div>
		<h1 class="text-4xl">Products</h1>
		<p class="mt-1 text-sm text-muted">{data.products.length} products · {lowStock} low on stock</p>
	</div>
	<label class="relative w-full sm:w-72">
		<span class="sr-only">Search products</span>
		<Search
			class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
		/>
		<input
			bind:value={query}
			type="search"
			placeholder="Search by title or category"
			class="input pl-10"
		/>
	</label>
</div>

<div class="card mt-8 overflow-x-auto">
	<table class="w-full min-w-[40rem] text-left text-sm">
		<thead class="border-b border-line text-xs tracking-wide text-muted uppercase">
			<tr>
				<th class="px-5 py-3 font-semibold">Product</th>
				<th class="px-5 py-3 font-semibold">Category</th>
				<th class="px-5 py-3 text-right font-semibold">Price</th>
				<th class="px-5 py-3 text-right font-semibold">Stock</th>
				<th class="px-5 py-3"><span class="sr-only">Actions</span></th>
			</tr>
		</thead>
		<tbody class="divide-y divide-line">
			{#each products as product (product.id)}
				<tr class="hover:bg-paper">
					<td class="px-5 py-3">
						<div class="flex items-center gap-3">
							<img
								src={product.Images[0]?.url}
								alt=""
								width="40"
								height="40"
								class="size-10 rounded-lg bg-sand object-cover"
							/>
							<a href="/admin/products/{product.id}" class="font-medium hover:underline"
								>{product.title}</a
							>
						</div>
					</td>
					<td class="px-5 py-3 text-muted">{product.category}</td>
					<td class="px-5 py-3 text-right tabular-nums">
						{money(finalPrice(product))}
						{#if product.discountPercentage}<span class="ml-1 text-xs text-accent"
								>−{product.discountPercentage}%</span
							>{/if}
					</td>
					<td
						class={[
							'px-5 py-3 text-right tabular-nums',
							product.stock <= 10 && 'font-semibold text-accent'
						]}>{product.stock}</td
					>
					<td class="px-5 py-3">
						<div class="flex justify-end gap-1">
							<a
								href="/admin/products/{product.id}"
								class="btn-icon size-9"
								aria-label="Edit {product.title}"><Pencil class="size-4" /></a
							>
							<button
								class="btn-icon size-9 hover:text-danger"
								aria-label="Delete {product.title}"
								onclick={() => askDelete(product)}><Trash class="size-4" /></button
							>
						</div>
					</td>
				</tr>
			{:else}
				<tr
					><td colspan="5" class="px-5 py-12 text-center text-muted"
						>No products match “{query}”.</td
					></tr
				>
			{/each}
		</tbody>
	</table>
</div>

<dialog
	bind:this={dialog}
	aria-labelledby="del-title"
	onclose={() => (pendingDelete = null)}
	class="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-surface p-6 text-ink backdrop:bg-ink/40"
>
	<h2 id="del-title" class="text-2xl">Delete product?</h2>
	<p class="mt-2 text-muted">
		“{pendingDelete?.title}” will be removed from the store and from every cart and wishlist. This
		can’t be undone.
	</p>
	<form
		method="POST"
		action="?/delete"
		use:enhance={submit(del, {
			onSuccess: () => {
				dialog.close();
				notify('Product deleted');
			}
		})}
		class="mt-6 flex justify-end gap-3"
	>
		<input type="hidden" name="productId" value={pendingDelete?.id ?? ''} />
		<button type="button" class="btn-outline" onclick={() => dialog.close()}>Cancel</button>
		<button class="btn-danger" disabled={del.pending}>Delete</button>
	</form>
	<p class="mt-3 text-sm text-danger" aria-live="polite">{del.error}</p>
</dialog>
