<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
	import AddToUserListSkeleton from './AddToUserList.svelte';
	interface Props {
		bgColor?: string
	}
	let { bgColor }: Props = $props();
</script>

<div
	class={`bg-${bgColor || 'light'} flex flex-col flex-none m-2 w-60 md:w-72 rounded-lg p-4 gap-2`}
>
	<Skeleton size="sm" />

	<Skeleton class="rounded-lg w-full" size="sm" />

	<div class="flex gap-4">
		<Skeleton size="sm" />

		<Skeleton size="sm" />
	</div>

	<AddToUserListSkeleton />
</div>

