<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
</script>

{#snippet navItem()}
	<div class="flex flex-col gap-1 flex-1 items-center">
		<Skeleton class="rounded-lg" size="sm" />
		<Skeleton size="sm" />
	</div>
{/snippet}
<div
	class="flex fixed z-20 left-0 bottom-0 w-full bg-white items-center p-1 border-t-2 border-secondary shadow-lg shadow-dark justify-between"
>
	{@render navItem()}
	{@render navItem()}
	<span class="relative flex-1 self-end">
		<span
			class="animate-pulse bg-gray-200 rounded-full absolute w-12 md:w-16 h-12 md:h-16 bottom-4 md:bottom-2 -translate-x-1/2 left-1/2"
		></span>
	</span>
	{@render navItem()}
	{@render navItem()}
</div>
