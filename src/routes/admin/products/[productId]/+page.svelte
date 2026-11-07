<script lang="ts">
	import type { TAdminPageProduct } from './+page.server';
	import { ProductPage } from './components';

	interface Props {
		data: TAdminPageProduct;
	}
	const { data }: Props = $props();
	const { product, categories } = data;
</script>

{#if !product}
	<p>Product not found</p>
{:else}
	<ProductPage {categories} {product} />
{/if}

