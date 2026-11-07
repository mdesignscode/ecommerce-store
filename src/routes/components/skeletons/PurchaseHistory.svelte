<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
</script>

{#snippet timeline()}
	<div>
		<div class="flex gap-2 items-center">
			<Skeleton size="sm" />
			<Skeleton size="sm" />
			<Skeleton size="sm" />
		</div>

		&nbsp;
	</div>
{/snippet}

<div class="flex flex-col items-center p-4 gap-4">
	<Skeleton size="sm" />

	<div class="flex flex-col gap-4 w-full relative overflow-y-hidden">
		<Skeleton size="sm" class="absolute left-[6px] top-2" />
		{timeline}
		{timeline}
		{timeline}
	</div>
</div>
