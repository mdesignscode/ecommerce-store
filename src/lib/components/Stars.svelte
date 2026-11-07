<script lang="ts">
	import Star from '@lucide/svelte/icons/star';

	let { rating }: { rating: number } = $props();
	const value = $derived(Math.max(0, Math.min(5, Math.round(rating))));
</script>

<span class="inline-flex items-center gap-0.5" role="img" aria-label="Rated {value} out of 5">
	{#each { length: 5 }, i (i)}
		<Star
			aria-hidden="true"
			class={['size-4', i < value ? 'fill-amber-500 text-amber-500' : 'text-line']}
		/>
	{/each}
</span>
