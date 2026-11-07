<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import {
		editProductStore,
		InputField,
		NumberInput,
		AddImage,
		ImageInput,
		type TProductKeys
	} from '.';
	import { capitalizeAndReplace, customEnhanceHandler } from 'utils';
	import type { ActionData } from '../../../editProduct/$types';
	import type { TEditProductSuccess } from 'admin/editProduct/+page.server';
	import { enhance } from '$app/forms';

	const handleEditProduct = (key: TProductKeys) =>
		customEnhanceHandler<ActionData, TEditProductSuccess>(
			(data) => {
				editProductStore.product = data.product;
				editProductStore.editState[key]!.editing = false;
			},
			editProductStore.formState,
			() => {
				editProductStore.editState[key]!.editing = true;
			}
		);

	interface IInputProps {
		label: string;
		defaultValue: number;
		maxValue: number | undefined;
		minValue: number | undefined;
		description: string;
	}

	const rawSnippet = (key: TProductKeys) => {
		// number input values
		const inputProps: IInputProps = {
			label: key,
			defaultValue: 0,
			maxValue: undefined,
			minValue: undefined,
			description: ''
		};
		let renderProps = inputProps as IInputProps | TProductKeys | never;
		let renderer = numberInput as typeof numberInput | typeof imagesInputs | typeof inputField;

		// process object key to create input
		switch (key) {
			// setup number inputs
			case 'rating':
				inputProps.defaultValue = editProductStore.product?.stock || 0;
				inputProps.label = 'rating';
				inputProps.minValue = 1;
				inputProps.description = 'Enter product rating between 1 and 5';
				inputProps.maxValue = 5;
				break;

			case 'discountPercentage':
				inputProps.defaultValue = editProductStore.product?.discountPercentage || 0;
				inputProps.label = 'discountPercentage';
				inputProps.minValue = 0;
				inputProps.maxValue = 100;
				break;

			case 'Price':
				inputProps.defaultValue = editProductStore.product?.Price.amount || 0;
				inputProps.label = 'price';
				inputProps.minValue = 1;
				break;

			case 'stock':
				inputProps.defaultValue = editProductStore.product?.stock || 0;
				inputProps.label = 'stock';
				inputProps.minValue = 0;
				inputProps.description = 'Enter number of items in stock';
				break;

			// create list of image inputs
			case 'Images':
				renderer = imagesInputs;
				break;

			// anything else is a normal text input
			default:
				renderer = inputField;
				renderProps = key;
				break;
		}

		return {
			renderer,
			renderProps
		};
	};
</script>

{#snippet numberInput(props: IInputProps)}
	<NumberInput {...props} />
{/snippet}

{#snippet inputField(key: TProductKeys)}
	<div class="bg-white rounded-md p-2">
		<Label class="text-lg">{capitalizeAndReplace(key)}</Label>
		<InputField keyName={key} />
		<!-- <FieldError /> -->
	</div>
{/snippet}

{#snippet imagesInputs()}
	<section class="mb-2">
		<strong>Images</strong>
		<div class="flex flex-col mt-2 gap-4">
			{#each editProductStore.product?.Images || [] as image, index}
				<ImageInput imageName={`Image ${index + 1}`} keyName={image.url} />
			{/each}
		</div>

		<AddImage />
	</section>
{/snippet}

<div class="flex flex-col gap-4">
	{#each Object.keys(editProductStore.editState) as key}
		{@const { renderer, renderProps } = rawSnippet(key as TProductKeys)}
		<form
			method="POST"
			use:enhance={handleEditProduct(key)}
			action="/admin/editProduct?/editProduct"
			class="bg-white rounded-md p-2"
		>
			{@render renderer(renderProps)}
		</form>
	{/each}
</div>

