<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import { InputField } from '.';

	interface Props {
		imageName: string;
		keyName: string;
	}

	const { imageName, keyName }: Props = $props();
	let imageDeleted = $state(false);
	let deletingImage = $state(false);
</script>

{#if !imageDeleted}
	<div class="flex flex-col md:flex-row gap-4 items-center">
		<img
			src={keyName}
			alt="Product preview"
			width={100}
			height={100}
			class="h-auto rounded-lg mx-auto self-center"
		/>
		<div class="flex-1">
			<Label>{imageName}</Label>

			<InputField
				{deletingImage}
				isImageInput={true}
				{keyName}
			/>

			<!-- <FieldError /> -->
		</div>
	</div>
{/if}

