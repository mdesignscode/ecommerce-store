<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import type { TImageAttributes } from 'models';

	interface Props {
		images: TImageAttributes[];
	}
	const { images }: Props = $props();
	let activeImage = $state<string | null>(null);
</script>

<section class="flex overflow-x-auto w-full">
	{#each images as image, index}
		<Button onclick={() => (activeImage = image.url)} class="m-2">
			<img
				src={image.url}
				alt={`Thumbnail ${index + 1}`}
				width={150}
				height={150}
				class="rounded-lg transition-all hover:scale-105 flex-none"
			/>
		</Button>
	{/each}

	{#if activeImage}
		<div class="h-screen w-screen top-0 left-0 bg-dark opacity-80 absolute"></div>
		<div class="z-10">
			<Button class="absolute top-4 left-4" onclick={() => (activeImage = null)}>
				<CloseCircleSolid color="#fff" width={50} height={50} />
			</Button>
			<img
				src={activeImage}
				alt={`Active thumbnail`}
				width={150}
				height={150}
				class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 rounded-lg w-1/2"
			/>
		</div>
	{/if}
</section>
