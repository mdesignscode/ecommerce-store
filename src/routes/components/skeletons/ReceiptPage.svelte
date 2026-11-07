<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
	import ReceiptItemSkeleton from './ReceiptItem.svelte';
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-2">
		<Skeleton size="sm" class="mx-auto" />
		<Skeleton size="sm" class="mx-auto" />
	</div>
	<div class="bg-white border-2 border-dark p-2 md:min-w-80 min-w-60 flex flex-col gap-4">
		<ReceiptItemSkeleton />
		<ReceiptItemSkeleton />

		<div class="flex flex-col">
			<div class="flex justify-between border-y-2 border-dark">
				<Skeleton size="sm" />

				<Skeleton size="sm" />
			</div>

			<div class="flex justify-between">
				<Skeleton size="sm" />

				<Skeleton size="sm" />
			</div>
		</div>
	</div>
</div>

