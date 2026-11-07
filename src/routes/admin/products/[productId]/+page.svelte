<script lang="ts">
	import { enhance } from '$app/forms';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import { newFormState, submit } from '$lib/forms';
	import { finalPrice, money } from '$lib/pricing';

	let { data } = $props();
	const product = $derived(data.product);
	const form = $state(newFormState());

	let price = $state(0);
	let discount = $state<number | null>(null);
	$effect.pre(() => {
		price = product.Price.amount;
		discount = product.discountPercentage;
	});
	const preview = $derived(
		finalPrice({ discountPercentage: discount || null, Price: { amount: price || 0 } })
	);
</script>

<svelte:head><title>Edit {product.title} · Admin</title></svelte:head>

<a href="/admin" class="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
	><ChevronLeft class="size-4" />All products</a
>

<div class="mt-4 grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
	<form
		method="POST"
		action="?/save"
		use:enhance={submit(form, { reset: false })}
		class="card grid gap-5 p-6 sm:p-8"
	>
		<h1 class="text-3xl">Edit product</h1>

		<div class="field">
			<label for="title">Title</label>
			<input id="title" name="title" value={product.title} required minlength="2" class="input" />
		</div>
		<div class="field">
			<label for="description">Description</label>
			<textarea id="description" name="description" required maxlength="255" rows="3" class="input"
				>{product.description}</textarea
			>
		</div>
		<div class="field">
			<label for="category">Category</label>
			<input
				id="category"
				name="category"
				value={product.category}
				list="categories"
				required
				class="input"
			/>
			<datalist id="categories">
				{#each data.categories as category (category)}<option value={category}></option>{/each}
			</datalist>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<div class="field">
				<label for="price">Price (USD, before discount)</label>
				<input
					id="price"
					name="price"
					type="number"
					min="1"
					step="1"
					bind:value={price}
					required
					class="input"
				/>
			</div>
			<div class="field">
				<label for="discount">Discount %</label>
				<input
					id="discount"
					name="discountPercentage"
					type="number"
					min="1"
					max="90"
					bind:value={discount}
					placeholder="None"
					class="input"
				/>
			</div>
			<div class="field">
				<label for="stock">Stock</label>
				<input
					id="stock"
					name="stock"
					type="number"
					min="0"
					step="1"
					value={product.stock}
					required
					class="input"
				/>
			</div>
			<div class="field">
				<label for="rating">Rating (1–5)</label>
				<input
					id="rating"
					name="rating"
					type="number"
					min="1"
					max="5"
					step="1"
					value={Math.min(5, product.rating)}
					required
					class="input"
				/>
			</div>
		</div>

		<FormMessage {form} />
		<div class="flex gap-3">
			<button class="btn-primary" disabled={form.pending}
				>{form.pending ? 'Saving…' : 'Save changes'}</button
			>
			<a href="/products/{product.id}" class="btn-outline">View in store</a>
		</div>
	</form>

	<aside class="card overflow-hidden">
		<img
			src={product.Images[0]?.url}
			alt=""
			width="512"
			height="512"
			class="aspect-square w-full bg-sand object-cover"
		/>
		<dl class="grid gap-2 p-5 text-sm">
			<div class="flex justify-between">
				<dt class="text-muted">Customer pays</dt>
				<dd class="font-semibold tabular-nums">{money(preview)}</dd>
			</div>
			<div class="flex justify-between">
				<dt class="text-muted">Images</dt>
				<dd>{product.Images.length}</dd>
			</div>
			<div class="flex justify-between gap-4">
				<dt class="text-muted">Stripe product</dt>
				<dd class="truncate font-mono text-xs">{product.id}</dd>
			</div>
		</dl>
	</aside>
</div>
