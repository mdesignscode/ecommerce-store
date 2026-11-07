<script lang="ts">
	import type { TProductState } from 'store';
	import { EditProduct, editProductStore } from '.';

	interface Props {
		product: TProductState['Product'];
		categories: string[];
	}
	const { product, categories }: Props = $props();

	const stateKeys = [
		'title',
		'description',
		'category',
		'rating',
		'discountPercentage',
		'stock',
		'Images',
		'Price'
	] as const;

	editProductStore.categories = categories;
	editProductStore.product = product;
	editProductStore.editState = Object.fromEntries(
		// each attribute has an edit state and a value
		stateKeys.map((key) => [
			[key],
			key === 'Images'
				? Object.fromEntries(
						product?.Images.map((image) => [image.url, { text: image.url, editing: false }]) || []
					)
				: {
						text: key === 'Price' ? product?.Price.amount : product[key],
						editing: false
					}
		])
	);
</script>

<main class="flex flex-col gap-4 items-center h-full p-4 overflow-y-auto">
	<h1 class="text-center text-lg font-bold">Edit {editProductStore.product?.title}</h1>

	<EditProduct />
</main>
