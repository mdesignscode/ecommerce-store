<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
</script>

<div class="overflow-x-auto flex gap-2 p-2 bg-secondary-dark whitespace-nowrap">
	{#each Array.from({ length: 10 }) as _}
		<Skeleton class="rounded-lg" size="sm" />
	{/each}
</div>
