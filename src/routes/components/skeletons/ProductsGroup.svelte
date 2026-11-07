<script lang="ts">
	import ProductSkeleton from './Product.svelte';
</script>

<div class="w-full flex overflow-x-auto">
	{#each Array.from({ length: 5 }) as _}
		<ProductSkeleton />
	{/each}
</div>
