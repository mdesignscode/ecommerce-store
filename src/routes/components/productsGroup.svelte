<script lang="ts">
	import { ProductGroupContent } from 'components';
	import type { TProductState } from 'store';

	interface Props {
		products: TProductState['Product'][];
		groupTitle: string;
		groupUrl: string;
		category: string;
	}

	const { products, groupUrl, groupTitle, category }: Props = $props();
</script>

<section
	class="w-full space-y-2 md:flex justify-center gap-8 items-center border rounded-sm py-1 px-2 md:py-3 bg-secondary"
>
	<h2 class="font-bold md:text-lg md:[writing-mode:vertical-lr] md:rotate-180">
		{groupTitle}
	</h2>

	<section class="grid grid-cols-2 grid-rows-2 gap-2 md:gap-6 md:w-[45%]">
		{#each products as product}
			<ProductGroupContent {product} />
		{/each}
	</section>

	<a
		href={'/categories/' + groupUrl}
		class="text-primary no-underline hover:underline underline-offset-2 md:text-base md:[writing-mode:vertical-lr]"
	>
		View all {category}
	</a>
</section>

