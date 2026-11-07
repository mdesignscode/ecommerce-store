<script lang="ts">
	import { Button, Input } from 'flowbite-svelte';
	import { CheckOutline, PenOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { SpinningLoader } from 'components';
	import { CategoriesSelect, editProductStore, type TProductKeys } from '.';

	interface Props {
		keyName: TProductKeys;
		isImageInput?: boolean;
		deletingImage?: boolean;
	}

	const { keyName, isImageInput, deletingImage }: Props = $props();

	console.log({ keyName });
	$inspect(editProductStore);
        let inputValue = $derived(
		editProductStore.editState[keyName] && keyName !== 'Images'
			? editProductStore.editState[keyName].text
			: ''
        )
	let isEditing = $derived(
		editProductStore.editState[keyName] && keyName !== 'Images'
			? editProductStore.editState[keyName].editing
			: false
	);

	async function handleFieldEdit() {
		if (editProductStore.editState[keyName] && keyName !== 'Images') {
			editProductStore.editState[keyName].editing = !editProductStore.editState[keyName].editing;
		}
	}
</script>

<p class="text-dark text-xl">Is editing: {isEditing}</p>

{#if keyName !== 'category'}
	<span class="flex gap-4 flex-col md:flex-row">
		{#if isEditing}
			<!-- display input for typing -->
			<Input
				class="bg-gray-200"
				autofocus={isEditing}
				placeholder={keyName === 'discountPercentage' ? 'Leave empty for no discount' : undefined}
				bind:value={inputValue}
			/>
		{:else}
			<!-- display default text -->
			<p class="flex-1 bg-gray-200 rounded-lg px-4 py-2 border-2 border-transparent">
				{editProductStore.editState[keyName]?.text}
			</p>
		{/if}

		<section class="flex gap-2">
			{#if !isImageInput}
				<Button
					id={keyName}
					onclick={handleFieldEdit}
					class="self-center text-dark"
					type={isEditing ? 'submit' : 'button'}
				>
					{#if isEditing && editProductStore.formState.loading}
						<SpinningLoader size="10" />
					{:else if isEditing}
						<CheckOutline class="size-10" />
					{:else}
						<PenOutline class="size-10" />
					{/if}
				</Button>
			{:else}
				<Button class="self-center text-dark">
					{#if deletingImage}
						<SpinningLoader size="8" />
					{:else}
						<TrashBinOutline class="size-10" />
					{/if}
				</Button>
			{/if}
		</section>

		<input type="hidden" name="productId" value={editProductStore.product?.id} />
	</span>
{:else}
	<CategoriesSelect />
{/if}

