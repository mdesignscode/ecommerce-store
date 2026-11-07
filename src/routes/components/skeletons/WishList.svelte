<script lang="ts">
	import ProductSkeleton from './Product.svelte';
	import { Skeleton } from 'flowbite-svelte';
</script>

<div class="flex flex-col items-center p-4 gap-2">
	<Skeleton size="sm" />

	<section class="md:flex md:w-5/6 flex-wrap justify-center items-center gap-2">
		{#each Array.from({ length: 5 }) as _}
			<div class="relative">
				<ProductSkeleton bgColor="secondary" />

				<Skeleton size="sm" class="absolute -top-2 -right-2" />
			</div>
		{/each}
	</section>
</div>
